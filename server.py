import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import time
from http import cookies
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse


ROOT = Path(__file__).resolve().parent
DATA_DIR = Path(os.environ.get("SSS_DATA_DIR", str(ROOT / ".data")))
DB_PATH = DATA_DIR / "portal.db"
DATABASE_URL = os.environ.get("DATABASE_URL", "").strip()
IS_POSTGRES = bool(DATABASE_URL)
HOST = os.environ.get("HOST", "127.0.0.1")
PORT = int(os.environ.get("PORT", "4173"))
SESSION_TTL_SECONDS = 8 * 60 * 60
LOGIN_WINDOW_SECONDS = 15 * 60
LOGIN_BLOCK_SECONDS = 15 * 60
LOGIN_MAX_FAILURES = 5
REGISTER_WINDOW_SECONDS = 60 * 60
REGISTER_MAX_ATTEMPTS = 30
AVAILABLE_HOMEROOMS = (
    (10, "A", "boys"),
    (10, "B", "girls"),
    (9, "A", "boys"),
    (9, "B", "boys"),
    (9, "C", "girls"),
    (8, "A", "boys"),
    (8, "B", "boys"),
    (8, "C", "girls"),
    (8, "D", "girls"),
)
STATIC_FILES = {
    "/index.html",
    "/styles.css",
    "/script.js",
    "/portal.html",
    "/portal.css",
    "/portal.js",
    "/admin.html",
    "/admin.css",
    "/admin.js",
    "/teacher.html",
    "/teacher.css",
    "/teacher.js",
    "/favicon.ico",
    "/assets/success-story-logo.jpg",
    "/assets/success-story-mark.png",
    "/assets/success-story-campus.jpg",
}
CONTENT_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
}
DUMMY_SALT = b"\x00" * 16
DUMMY_PASSWORD_HASH = None
POSTGRES_POOL = None
POST_DISMISSALS_READY = False


class PostgresConnection:
    def __init__(self):
        global POSTGRES_POOL
        if POSTGRES_POOL is None:
            from psycopg.rows import dict_row
            from psycopg_pool import ConnectionPool

            POSTGRES_POOL = ConnectionPool(
                DATABASE_URL,
                min_size=0,
                max_size=4,
                timeout=8,
                kwargs={"row_factory": dict_row, "prepare_threshold": None},
                open=True,
            )
        self.lease = POSTGRES_POOL.connection()
        self.connection = self.lease.__enter__()

    @staticmethod
    def query(sql):
        if sql.strip().upper() == "BEGIN IMMEDIATE":
            return None
        return sql.replace("?", "%s")

    def execute(self, sql, params=()):
        query = self.query(sql)
        if query is None:
            return self.connection.execute("SELECT 1")
        return self.connection.execute(query, params)

    def executemany(self, sql, params):
        cursor = self.connection.cursor()
        return cursor.executemany(self.query(sql), params)

    def commit(self):
        self.connection.commit()

    def rollback(self):
        self.connection.rollback()

    def __enter__(self):
        return self

    def __exit__(self, exception_type, exception, traceback):
        return self.lease.__exit__(exception_type, exception, traceback)


def db_connection():
    if IS_POSTGRES:
        return PostgresConnection()
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def initialize_sqlite_database():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with db_connection() as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS sequences (
                name TEXT PRIMARY KEY,
                value INTEGER NOT NULL
            );

            INSERT OR IGNORE INTO sequences (name, value) VALUES ('student_id', 0);
            INSERT OR IGNORE INTO sequences (name, value) VALUES ('admin_id', 0);
            INSERT OR IGNORE INTO sequences (name, value) VALUES ('teacher_id', 0);

            CREATE TABLE IF NOT EXISTS classes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 10),
                section TEXT NOT NULL,
                UNIQUE (grade, section)
            );

            CREATE TABLE IF NOT EXISTS students (
                student_id TEXT PRIMARY KEY,
                full_name TEXT NOT NULL,
                password_salt BLOB NOT NULL,
                password_hash BLOB NOT NULL,
                grade INTEGER CHECK (grade BETWEEN 1 AND 10),
                transport TEXT CHECK (transport IN ('bus', 'none') OR transport IS NULL),
                class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS sessions (
                token_hash TEXT PRIMARY KEY,
                student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
                expires_at INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS login_attempts (
                attempt_key TEXT PRIMARY KEY,
                failure_count INTEGER NOT NULL,
                window_started INTEGER NOT NULL,
                blocked_until INTEGER NOT NULL DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS registration_attempts (
                ip_address TEXT PRIMARY KEY,
                attempt_count INTEGER NOT NULL,
                window_started INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS administrators (
                admin_id TEXT PRIMARY KEY,
                full_name TEXT NOT NULL,
                password_salt BLOB NOT NULL,
                password_hash BLOB NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS admin_sessions (
                token_hash TEXT PRIMARY KEY,
                admin_id TEXT NOT NULL REFERENCES administrators(admin_id) ON DELETE CASCADE,
                expires_at INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS teachers (
                teacher_id TEXT PRIMARY KEY,
                full_name TEXT NOT NULL,
                password_salt BLOB NOT NULL,
                password_hash BLOB NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS teacher_sessions (
                token_hash TEXT PRIMARY KEY,
                teacher_id TEXT NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
                expires_at INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS teacher_assignments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                teacher_id TEXT NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
                class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
                subject TEXT NOT NULL,
                UNIQUE (teacher_id, class_id, subject)
            );

            CREATE TABLE IF NOT EXISTS grades (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
                subject TEXT NOT NULL,
                term_one REAL,
                term_two REAL
            );

            CREATE TABLE IF NOT EXISTS attendance (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
                school_date TEXT NOT NULL,
                status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late'))
            );

            CREATE TABLE IF NOT EXISTS homework (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
                subject TEXT NOT NULL,
                details TEXT NOT NULL,
                due_date TEXT
            );

            CREATE TABLE IF NOT EXISTS announcements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
                title TEXT NOT NULL,
                details TEXT NOT NULL,
                posted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS fees (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
                label TEXT NOT NULL,
                amount REAL NOT NULL,
                status TEXT NOT NULL CHECK (status IN ('due', 'paid'))
            );

            CREATE TABLE IF NOT EXISTS class_homework (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
                subject TEXT NOT NULL,
                details TEXT NOT NULL,
                due_date TEXT,
                posted_by_teacher_id TEXT REFERENCES teachers(teacher_id) ON DELETE SET NULL,
                posted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS class_announcements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
                title TEXT NOT NULL,
                details TEXT NOT NULL,
                posted_by_teacher_id TEXT REFERENCES teachers(teacher_id) ON DELETE SET NULL,
                posted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS dismissed_posts (
                student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
                post_type TEXT NOT NULL CHECK (post_type IN ('homework', 'announcement')),
                audience TEXT NOT NULL CHECK (audience IN ('student', 'class')),
                post_id INTEGER NOT NULL,
                dismissed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (student_id, post_type, audience, post_id)
            );
            """
        )
        student_columns = {
            row["name"] for row in connection.execute("PRAGMA table_info(students)").fetchall()
        }
        if "class_id" not in student_columns:
            connection.execute(
                "ALTER TABLE students ADD COLUMN class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL"
            )
        homework_columns = {
            row["name"] for row in connection.execute("PRAGMA table_info(class_homework)").fetchall()
        }
        if "posted_by_teacher_id" not in homework_columns:
            connection.execute(
                "ALTER TABLE class_homework ADD COLUMN posted_by_teacher_id TEXT REFERENCES teachers(teacher_id) ON DELETE SET NULL"
            )
        announcement_columns = {
            row["name"] for row in connection.execute("PRAGMA table_info(class_announcements)").fetchall()
        }
        if "posted_by_teacher_id" not in announcement_columns:
            connection.execute(
                "ALTER TABLE class_announcements ADD COLUMN posted_by_teacher_id TEXT REFERENCES teachers(teacher_id) ON DELETE SET NULL"
            )
        connection.executemany(
            "INSERT OR IGNORE INTO classes (grade, section) VALUES (?, ?)",
            [(grade, section) for grade, section, _group in AVAILABLE_HOMEROOMS],
        )
        connection.execute(
            """
            UPDATE sequences
            SET value = MAX(
                value,
                COALESCE(
                    (SELECT MAX(CAST(SUBSTR(admin_id, 5) AS INTEGER))
                     FROM administrators WHERE admin_id GLOB 'ADM-[0-9]*'),
                    0
                )
            )
            WHERE name = 'admin_id'
            """
        )
        connection.execute(
            """
            UPDATE sequences
            SET value = MAX(
                value,
                COALESCE(
                    (SELECT MAX(CAST(SUBSTR(teacher_id, 5) AS INTEGER))
                     FROM teachers WHERE teacher_id GLOB 'TCH-[0-9]*'),
                    0
                )
            )
            WHERE name = 'teacher_id'
            """
        )
        connection.execute("DELETE FROM sessions WHERE expires_at <= ?", (int(time.time()),))
        connection.execute("DELETE FROM admin_sessions WHERE expires_at <= ?", (int(time.time()),))
        connection.execute("DELETE FROM teacher_sessions WHERE expires_at <= ?", (int(time.time()),))


def initialize_postgres_database():
    schema = (
        """
        CREATE TABLE IF NOT EXISTS sequences (
            name TEXT PRIMARY KEY,
            value INTEGER NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 10),
            section TEXT NOT NULL,
            UNIQUE (grade, section)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS students (
            student_id TEXT PRIMARY KEY,
            full_name TEXT NOT NULL,
            password_salt BYTEA NOT NULL,
            password_hash BYTEA NOT NULL,
            grade INTEGER CHECK (grade BETWEEN 1 AND 10),
            transport TEXT CHECK (transport IN ('bus', 'none') OR transport IS NULL),
            class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL,
            created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP::TEXT)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS sessions (
            token_hash TEXT PRIMARY KEY,
            student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
            expires_at INTEGER NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS login_attempts (
            attempt_key TEXT PRIMARY KEY,
            failure_count INTEGER NOT NULL,
            window_started INTEGER NOT NULL,
            blocked_until INTEGER NOT NULL DEFAULT 0
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS registration_attempts (
            ip_address TEXT PRIMARY KEY,
            attempt_count INTEGER NOT NULL,
            window_started INTEGER NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS administrators (
            admin_id TEXT PRIMARY KEY,
            full_name TEXT NOT NULL,
            password_salt BYTEA NOT NULL,
            password_hash BYTEA NOT NULL,
            created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP::TEXT)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS admin_sessions (
            token_hash TEXT PRIMARY KEY,
            admin_id TEXT NOT NULL REFERENCES administrators(admin_id) ON DELETE CASCADE,
            expires_at INTEGER NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS teachers (
            teacher_id TEXT PRIMARY KEY,
            full_name TEXT NOT NULL,
            password_salt BYTEA NOT NULL,
            password_hash BYTEA NOT NULL,
            created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP::TEXT)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS teacher_sessions (
            token_hash TEXT PRIMARY KEY,
            teacher_id TEXT NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
            expires_at INTEGER NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS teacher_assignments (
            id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            teacher_id TEXT NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
            class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
            subject TEXT NOT NULL,
            UNIQUE (teacher_id, class_id, subject)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS grades (
            id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
            subject TEXT NOT NULL,
            term_one DOUBLE PRECISION,
            term_two DOUBLE PRECISION
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
            school_date TEXT NOT NULL,
            status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late'))
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS homework (
            id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
            subject TEXT NOT NULL,
            details TEXT NOT NULL,
            due_date TEXT
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            details TEXT NOT NULL,
            posted_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP::TEXT)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS fees (
            id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
            label TEXT NOT NULL,
            amount DOUBLE PRECISION NOT NULL,
            status TEXT NOT NULL CHECK (status IN ('due', 'paid'))
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS class_homework (
            id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
            subject TEXT NOT NULL,
            details TEXT NOT NULL,
            due_date TEXT,
            posted_by_teacher_id TEXT REFERENCES teachers(teacher_id) ON DELETE SET NULL,
            posted_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP::TEXT)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS class_announcements (
            id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            details TEXT NOT NULL,
            posted_by_teacher_id TEXT REFERENCES teachers(teacher_id) ON DELETE SET NULL,
            posted_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP::TEXT)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS dismissed_posts (
            student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
            post_type TEXT NOT NULL CHECK (post_type IN ('homework', 'announcement')),
            audience TEXT NOT NULL CHECK (audience IN ('student', 'class')),
            post_id INTEGER NOT NULL,
            dismissed_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP::TEXT),
            PRIMARY KEY (student_id, post_type, audience, post_id)
        )
        """,
    )
    with db_connection() as connection:
        for statement in schema:
            connection.execute(statement)
        connection.execute(
            "INSERT INTO sequences (name, value) VALUES ('student_id', 0), ('admin_id', 0), ('teacher_id', 0) "
            "ON CONFLICT (name) DO NOTHING"
        )
        connection.executemany(
            "INSERT INTO classes (grade, section) VALUES (?, ?) ON CONFLICT (grade, section) DO NOTHING",
            [(grade, section) for grade, section, _group in AVAILABLE_HOMEROOMS],
        )
        connection.execute("DELETE FROM sessions WHERE expires_at <= ?", (int(time.time()),))
        connection.execute("DELETE FROM admin_sessions WHERE expires_at <= ?", (int(time.time()),))
        connection.execute("DELETE FROM teacher_sessions WHERE expires_at <= ?", (int(time.time()),))


def ensure_post_dismissals_table(connection):
    global POST_DISMISSALS_READY
    if POST_DISMISSALS_READY:
        return
    if IS_POSTGRES:
        statement = """
        CREATE TABLE IF NOT EXISTS dismissed_posts (
            student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
            post_type TEXT NOT NULL CHECK (post_type IN ('homework', 'announcement')),
            audience TEXT NOT NULL CHECK (audience IN ('student', 'class')),
            post_id INTEGER NOT NULL,
            dismissed_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP::TEXT),
            PRIMARY KEY (student_id, post_type, audience, post_id)
        )
        """
    else:
        statement = """
        CREATE TABLE IF NOT EXISTS dismissed_posts (
            student_id TEXT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
            post_type TEXT NOT NULL CHECK (post_type IN ('homework', 'announcement')),
            audience TEXT NOT NULL CHECK (audience IN ('student', 'class')),
            post_id INTEGER NOT NULL,
            dismissed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (student_id, post_type, audience, post_id)
        )
        """
    connection.execute(statement)
    POST_DISMISSALS_READY = True


def initialize_database():
    if IS_POSTGRES:
        with db_connection() as connection:
            ready = connection.execute(
                "SELECT to_regclass('public.sequences') AS relation"
            ).fetchone()["relation"]
        if ready:
            return
        initialize_postgres_database()
    else:
        initialize_sqlite_database()


def claim_sequence_number(connection, name):
    if IS_POSTGRES:
        return connection.execute(
            "UPDATE sequences SET value = value + 1 WHERE name = ? RETURNING value",
            (name,),
        ).fetchone()["value"]
    sequence = connection.execute(
        "SELECT value FROM sequences WHERE name = ?",
        (name,),
    ).fetchone()["value"]
    next_number = sequence + 1
    connection.execute("UPDATE sequences SET value = ? WHERE name = ?", (next_number, name))
    return next_number


def password_hash(password, salt):
    return hashlib.scrypt(
        password.encode("utf-8"),
        salt=salt,
        n=2**14,
        r=8,
        p=1,
        dklen=64,
    )


DUMMY_PASSWORD_HASH = password_hash("unused-password-000", DUMMY_SALT)


def clean_text(value, maximum=80):
    return " ".join(str(value or "").strip().split())[:maximum]


def valid_password(password, minimum=8):
    return (
        minimum <= len(password) <= 128
        and any(character.isalpha() for character in password)
        and any(character.isdigit() for character in password)
    )


def valid_admin_password(password):
    return valid_password(password, 8) and any(not character.isalnum() for character in password)


def homeroom_group(grade, section):
    for allowed_grade, allowed_section, group in AVAILABLE_HOMEROOMS:
        if grade == allowed_grade and section == allowed_section:
            return group
    return None


def parse_homeroom_code(value):
    match = re.fullmatch(r"(8|9|10)-([A-D])", clean_text(value, 5).upper())
    if not match:
        return None
    grade = int(match.group(1))
    section = match.group(2)
    return (grade, section) if homeroom_group(grade, section) else None


def public_student(row):
    class_name = None
    class_id = row["class_id"] if "class_id" in row.keys() else None
    if class_id and "class_grade" in row.keys() and row["class_grade"]:
        class_name = f"Grade {row['class_grade']} {row['class_section']}"
    return {
        "studentId": row["student_id"],
        "name": row["full_name"],
        "grade": row["grade"],
        "transport": row["transport"],
        "classId": class_id,
        "className": class_name,
        "createdAt": row["created_at"],
    }


def public_class(row):
    return {
        "id": row["id"],
        "grade": row["grade"],
        "section": row["section"],
        "group": homeroom_group(row["grade"], row["section"]),
        "name": f"Grade {row['grade']} {row['section']}",
    }


def public_admin(row):
    return {
        "adminId": row["admin_id"],
        "name": row["full_name"],
        "createdAt": row["created_at"],
    }


def public_teacher(row):
    return {
        "teacherId": row["teacher_id"],
        "name": row["full_name"],
        "createdAt": row["created_at"],
    }


def public_teacher_assignment(row):
    return {
        "id": row["id"],
        "teacherId": row["teacher_id"],
        "subject": row["subject"],
        "class": {
            "id": row["class_id"],
            "grade": row["grade"],
            "section": row["section"],
            "group": homeroom_group(row["grade"], row["section"]),
            "name": f"Grade {row['grade']} {row['section']}",
        },
    }


STUDENT_WITH_CLASS_SQL = """
    SELECT students.*, classes.grade AS class_grade, classes.section AS class_section
    FROM students
    LEFT JOIN classes ON classes.id = students.class_id
"""


class SchoolPortalHandler(BaseHTTPRequestHandler):
    server_version = "SuccessStoryPortal/1.0"

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "same-origin")
        self.send_header(
            "Content-Security-Policy",
            "default-src 'self'; img-src 'self' data:; style-src 'self'; "
            "script-src 'self'; connect-src 'self'; form-action 'self'; "
            "base-uri 'none'; frame-ancestors 'none'",
        )
        super().end_headers()

    def send_json(self, status, payload, extra_headers=None):
        content = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.send_header("Cache-Control", "no-store")
        for header, value in (extra_headers or {}).items():
            self.send_header(header, value)
        self.end_headers()
        self.wfile.write(content)

    def read_json(self):
        length = int(self.headers.get("Content-Length", "0"))
        if length > 20_000:
            raise ValueError("Request is too large.")
        raw = self.rfile.read(length)
        return json.loads(raw.decode("utf-8")) if raw else {}

    def request_origin_allowed(self):
        origin = self.headers.get("Origin")
        if not origin:
            return True
        return urlparse(origin).netloc == self.headers.get("Host")

    def cookie_token(self, name):
        cookie_header = self.headers.get("Cookie", "")
        parsed = cookies.SimpleCookie()
        parsed.load(cookie_header)
        token = parsed.get(name)
        return token.value if token else None

    def api_path(self):
        parsed_path = urlparse(self.path)
        request_path = parsed_path.path
        if request_path in {"/api", "/api/index.py"}:
            routed_path = parse_qs(parsed_path.query).get("_route", [""])[0].strip("/")
            if routed_path:
                request_path = f"/api/{routed_path}"
        return parsed_path, request_path

    def request_ip(self):
        forwarded = self.headers.get("X-Forwarded-For", "").split(",", 1)[0].strip()
        return forwarded or self.client_address[0]

    @staticmethod
    def session_cookie(name, value, max_age):
        secure = "; Secure" if IS_POSTGRES or os.environ.get("VERCEL") else ""
        return f"{name}={value}; HttpOnly; SameSite=Strict; Path=/; Max-Age={max_age}{secure}"

    def session_token(self):
        return self.cookie_token("sss_session")

    def authenticated_student(self):
        token = self.session_token()
        if not token:
            return None
        token_hash = hashlib.sha256(token.encode("ascii")).hexdigest()
        now = int(time.time())
        with db_connection() as connection:
            connection.execute("DELETE FROM sessions WHERE expires_at <= ?", (now,))
            return connection.execute(
                STUDENT_WITH_CLASS_SQL
                + """
                JOIN sessions ON sessions.student_id = students.student_id
                WHERE sessions.token_hash = ? AND sessions.expires_at > ?
                """,
                (token_hash, now),
            ).fetchone()

    def authenticated_admin(self):
        token = self.cookie_token("sss_admin_session")
        if not token:
            return None
        token_hash = hashlib.sha256(token.encode("ascii")).hexdigest()
        now = int(time.time())
        with db_connection() as connection:
            connection.execute("DELETE FROM admin_sessions WHERE expires_at <= ?", (now,))
            return connection.execute(
                """
                SELECT administrators.admin_id, administrators.full_name
                FROM admin_sessions
                JOIN administrators ON administrators.admin_id = admin_sessions.admin_id
                WHERE admin_sessions.token_hash = ? AND admin_sessions.expires_at > ?
                """,
                (token_hash, now),
            ).fetchone()

    def authenticated_teacher(self):
        token = self.cookie_token("sss_teacher_session")
        if not token:
            return None
        token_hash = hashlib.sha256(token.encode("ascii")).hexdigest()
        now = int(time.time())
        with db_connection() as connection:
            connection.execute("DELETE FROM teacher_sessions WHERE expires_at <= ?", (now,))
            return connection.execute(
                """
                SELECT teachers.teacher_id, teachers.full_name, teachers.created_at
                FROM teacher_sessions
                JOIN teachers ON teachers.teacher_id = teacher_sessions.teacher_id
                WHERE teacher_sessions.token_hash = ? AND teacher_sessions.expires_at > ?
                """,
                (token_hash, now),
            ).fetchone()

    def require_admin(self):
        admin = self.authenticated_admin()
        if not admin:
            self.send_json(401, {"code": "auth_required", "error": "Administrator authentication required."})
        return admin

    def require_teacher(self):
        teacher = self.authenticated_teacher()
        if not teacher:
            self.send_json(401, {"code": "auth_required", "error": "Teacher authentication required."})
        return teacher

    def teacher_assignment(self, connection, teacher_id, assignment_id):
        return connection.execute(
            """
            SELECT teacher_assignments.id, teacher_assignments.teacher_id, teacher_assignments.subject,
                   classes.id AS class_id, classes.grade, classes.section
            FROM teacher_assignments
            JOIN classes ON classes.id = teacher_assignments.class_id
            WHERE teacher_assignments.id = ? AND teacher_assignments.teacher_id = ?
            """,
            (assignment_id, teacher_id),
        ).fetchone()

    def portal_records(self, connection, student, hide_dismissed=True):
        dismissed = set()
        if hide_dismissed:
            ensure_post_dismissals_table(connection)
            dismissed = {
                (row["post_type"], row["audience"], row["post_id"])
                for row in connection.execute(
                    "SELECT post_type, audience, post_id FROM dismissed_posts WHERE student_id = ?",
                    (student["student_id"],),
                ).fetchall()
            }
        records = {
            "grades": [dict(row) for row in connection.execute(
                "SELECT subject, term_one, term_two FROM grades WHERE student_id = ? ORDER BY id",
                (student["student_id"],),
            )],
            "attendance": [dict(row) for row in connection.execute(
                "SELECT school_date, status FROM attendance WHERE student_id = ? ORDER BY school_date DESC",
                (student["student_id"],),
            )],
            "homework": [dict(row) for row in connection.execute(
                "SELECT id, subject, details, due_date, 'student' AS audience FROM homework WHERE student_id = ? ORDER BY id DESC",
                (student["student_id"],),
            )],
            "announcements": [dict(row) for row in connection.execute(
                "SELECT id, title, details, posted_at, 'student' AS audience FROM announcements WHERE student_id = ? ORDER BY id DESC",
                (student["student_id"],),
            )],
            "fees": [dict(row) for row in connection.execute(
                "SELECT label, amount, status FROM fees WHERE student_id = ? ORDER BY id DESC",
                (student["student_id"],),
            )],
        }
        class_data = None
        if student["class_id"]:
            class_row = connection.execute(
                "SELECT id, grade, section FROM classes WHERE id = ?",
                (student["class_id"],),
            ).fetchone()
            if class_row:
                records["homework"] = [
                    dict(row) for row in connection.execute(
                        """
                        SELECT id, subject, details, due_date, 'class' AS audience
                        FROM class_homework WHERE class_id = ? ORDER BY id DESC
                        """,
                        (student["class_id"],),
                    )
                ] + records["homework"]
                records["announcements"] = [
                    dict(row) for row in connection.execute(
                        """
                        SELECT id, title, details, posted_at, 'class' AS audience
                        FROM class_announcements WHERE class_id = ? ORDER BY id DESC
                        """,
                        (student["class_id"],),
                    )
                ] + records["announcements"]
                members = connection.execute(
                    "SELECT full_name FROM students WHERE class_id = ? ORDER BY full_name",
                    (student["class_id"],),
                ).fetchall()
                class_data = {
                    **public_class(class_row),
                    "members": [{"name": member["full_name"]} for member in members],
                }
        if hide_dismissed:
            records["homework"] = [
                entry for entry in records["homework"]
                if ("homework", entry["audience"], entry["id"]) not in dismissed
            ]
            records["announcements"] = [
                entry for entry in records["announcements"]
                if ("announcement", entry["audience"], entry["id"]) not in dismissed
            ]
        return records, class_data

    def do_GET(self):
        parsed_path, request_path = self.api_path()
        if request_path == "/api/auth/session":
            student = self.authenticated_student()
            self.send_json(
                200,
                {"authenticated": bool(student), "user": public_student(student) if student else None},
            )
            return
        if request_path == "/api/portal":
            student = self.authenticated_student()
            if not student:
                self.send_json(401, {"code": "auth_required", "error": "Authentication required."})
                return
            with db_connection() as connection:
                records, class_data = self.portal_records(connection, student)
            self.send_json(200, {"user": public_student(student), "records": records, "class": class_data})
            return
        if request_path == "/api/admin/setup-status":
            initialize_database()
            with db_connection() as connection:
                setup_required = connection.execute(
                    "SELECT COUNT(*) AS total FROM administrators"
                ).fetchone()["total"] == 0
            self.send_json(200, {"adminId": "ADM-1", "setupRequired": setup_required})
            return
        if request_path == "/api/admin/session":
            admin = self.authenticated_admin()
            payload = None if not admin else {"adminId": admin["admin_id"], "name": admin["full_name"]}
            self.send_json(200, {"authenticated": bool(admin), "admin": payload})
            return
        if request_path == "/api/admin/dashboard":
            if not self.require_admin():
                return
            with db_connection() as connection:
                students = connection.execute(
                    STUDENT_WITH_CLASS_SQL + " ORDER BY students.student_id"
                ).fetchall()
                classes = connection.execute(
                    """
                    SELECT classes.id, classes.grade, classes.section, COUNT(students.student_id) AS member_count
                    FROM classes
                    LEFT JOIN students ON students.class_id = classes.id
                    GROUP BY classes.id
                    ORDER BY classes.grade DESC, classes.section
                    """
                ).fetchall()
                administrators = connection.execute(
                    "SELECT admin_id, full_name, created_at FROM administrators ORDER BY CAST(SUBSTR(admin_id, 5) AS INTEGER)"
                ).fetchall()
                teachers = connection.execute(
                    "SELECT teacher_id, full_name, created_at FROM teachers ORDER BY CAST(SUBSTR(teacher_id, 5) AS INTEGER)"
                ).fetchall()
                assignments = connection.execute(
                    """
                    SELECT teacher_assignments.id, teacher_assignments.teacher_id, teacher_assignments.subject,
                           classes.id AS class_id, classes.grade, classes.section
                    FROM teacher_assignments
                    JOIN classes ON classes.id = teacher_assignments.class_id
                    ORDER BY teacher_assignments.teacher_id, classes.grade DESC, classes.section, teacher_assignments.subject
                    """
                ).fetchall()
            by_teacher = {}
            for assignment in assignments:
                by_teacher.setdefault(assignment["teacher_id"], []).append(public_teacher_assignment(assignment))
            self.send_json(200, {
                "students": [public_student(student) for student in students],
                "classes": [
                    {**public_class(class_row), "memberCount": class_row["member_count"]}
                    for class_row in classes
                    if homeroom_group(class_row["grade"], class_row["section"])
                ],
                "administrators": [public_admin(account) for account in administrators],
                "teachers": [
                    {**public_teacher(teacher), "assignments": by_teacher.get(teacher["teacher_id"], [])}
                    for teacher in teachers
                ],
            })
            return
        if request_path == "/api/admin/students":
            if not self.require_admin():
                return
            with db_connection() as connection:
                students = connection.execute(
                    STUDENT_WITH_CLASS_SQL + " ORDER BY students.student_id"
                ).fetchall()
            self.send_json(200, {"students": [public_student(student) for student in students]})
            return
        if request_path == "/api/admin/accounts":
            if not self.require_admin():
                return
            with db_connection() as connection:
                administrators = connection.execute(
                    "SELECT admin_id, full_name, created_at FROM administrators ORDER BY CAST(SUBSTR(admin_id, 5) AS INTEGER)"
                ).fetchall()
            self.send_json(200, {"administrators": [public_admin(account) for account in administrators]})
            return
        if request_path == "/api/admin/teachers":
            if not self.require_admin():
                return
            with db_connection() as connection:
                teachers = connection.execute(
                    "SELECT teacher_id, full_name, created_at FROM teachers ORDER BY CAST(SUBSTR(teacher_id, 5) AS INTEGER)"
                ).fetchall()
                assignments = connection.execute(
                    """
                    SELECT teacher_assignments.id, teacher_assignments.teacher_id, teacher_assignments.subject,
                           classes.id AS class_id, classes.grade, classes.section
                    FROM teacher_assignments
                    JOIN classes ON classes.id = teacher_assignments.class_id
                    ORDER BY teacher_assignments.teacher_id, classes.grade DESC, classes.section, teacher_assignments.subject
                    """
                ).fetchall()
            by_teacher = {}
            for assignment in assignments:
                by_teacher.setdefault(assignment["teacher_id"], []).append(public_teacher_assignment(assignment))
            self.send_json(200, {"teachers": [
                {**public_teacher(teacher), "assignments": by_teacher.get(teacher["teacher_id"], [])}
                for teacher in teachers
            ]})
            return
        if request_path == "/api/admin/classes":
            if not self.require_admin():
                return
            with db_connection() as connection:
                classes = connection.execute(
                    """
                    SELECT classes.id, classes.grade, classes.section, COUNT(students.student_id) AS member_count
                    FROM classes
                    LEFT JOIN students ON students.class_id = classes.id
                    GROUP BY classes.id
                    ORDER BY classes.grade DESC, classes.section
                    """
                ).fetchall()
            self.send_json(200, {"classes": [
                {**public_class(class_row), "memberCount": class_row["member_count"]}
                for class_row in classes
                if homeroom_group(class_row["grade"], class_row["section"])
            ]})
            return
        if request_path == "/api/admin/student":
            if not self.require_admin():
                return
            student_id = clean_text(parse_qs(parsed_path.query).get("studentId", [""])[0], 20).upper()
            with db_connection() as connection:
                student = connection.execute(
                    STUDENT_WITH_CLASS_SQL + " WHERE students.student_id = ?",
                    (student_id,),
                ).fetchone()
                if not student:
                    self.send_json(404, {"code": "student_not_found", "error": "Student not found."})
                    return
                records, class_data = self.portal_records(connection, student, hide_dismissed=False)
            self.send_json(200, {"student": public_student(student), "records": records, "class": class_data})
            return
        if request_path == "/api/admin/class":
            if not self.require_admin():
                return
            try:
                class_id = int(parse_qs(parsed_path.query).get("classId", [""])[0])
            except ValueError:
                class_id = 0
            with db_connection() as connection:
                class_row = connection.execute(
                    "SELECT id, grade, section FROM classes WHERE id = ?",
                    (class_id,),
                ).fetchone()
                if not class_row:
                    self.send_json(404, {"code": "class_not_found", "error": "Class not found."})
                    return
                if not homeroom_group(class_row["grade"], class_row["section"]):
                    self.send_json(404, {"code": "class_not_found", "error": "Class not found."})
                    return
                members = connection.execute(
                    STUDENT_WITH_CLASS_SQL + " WHERE students.class_id = ? ORDER BY students.full_name",
                    (class_id,),
                ).fetchall()
                homework = connection.execute(
                    "SELECT id, subject, details, due_date, posted_at FROM class_homework WHERE class_id = ? ORDER BY id DESC",
                    (class_id,),
                ).fetchall()
                announcements = connection.execute(
                    "SELECT id, title, details, posted_at FROM class_announcements WHERE class_id = ? ORDER BY id DESC",
                    (class_id,),
                ).fetchall()
            self.send_json(200, {
                "class": {**public_class(class_row), "members": [public_student(member) for member in members]},
                "homework": [dict(row) for row in homework],
                "announcements": [dict(row) for row in announcements],
            })
            return
        if request_path == "/api/teacher/session":
            teacher = self.authenticated_teacher()
            self.send_json(
                200,
                {"authenticated": bool(teacher), "teacher": public_teacher(teacher) if teacher else None},
            )
            return
        if request_path == "/api/teacher/assignments":
            teacher = self.require_teacher()
            if not teacher:
                return
            with db_connection() as connection:
                assignments = connection.execute(
                    """
                    SELECT teacher_assignments.id, teacher_assignments.teacher_id, teacher_assignments.subject,
                           classes.id AS class_id, classes.grade, classes.section
                    FROM teacher_assignments
                    JOIN classes ON classes.id = teacher_assignments.class_id
                    WHERE teacher_assignments.teacher_id = ?
                    ORDER BY classes.grade DESC, classes.section, teacher_assignments.subject
                    """,
                    (teacher["teacher_id"],),
                ).fetchall()
            self.send_json(200, {"assignments": [public_teacher_assignment(row) for row in assignments]})
            return
        if request_path == "/api/teacher/class":
            teacher = self.require_teacher()
            if not teacher:
                return
            query = parse_qs(parsed_path.query)
            try:
                assignment_id = int(query.get("assignmentId", [""])[0])
            except ValueError:
                assignment_id = 0
            school_date = clean_text(query.get("schoolDate", [""])[0], 10)
            if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", school_date):
                self.send_json(400, {"code": "invalid_date", "error": "Choose an attendance date."})
                return
            with db_connection() as connection:
                assignment = self.teacher_assignment(connection, teacher["teacher_id"], assignment_id)
                if not assignment:
                    self.send_json(403, {"code": "assignment_required", "error": "Teaching assignment required."})
                    return
                members = connection.execute(
                    """
                    SELECT students.student_id, students.full_name, students.created_at,
                           students.grade, students.transport, students.class_id,
                           classes.grade AS class_grade, classes.section AS class_section,
                           (SELECT status FROM attendance
                            WHERE attendance.student_id = students.student_id AND attendance.school_date = ?
                            ORDER BY attendance.id DESC LIMIT 1) AS attendance_status
                    FROM students
                    JOIN classes ON classes.id = students.class_id
                    WHERE students.class_id = ?
                    ORDER BY students.full_name
                    """,
                    (school_date, assignment["class_id"]),
                ).fetchall()
                homework = connection.execute(
                    """
                    SELECT id, subject, details, due_date, posted_by_teacher_id, posted_at
                    FROM class_homework
                    WHERE class_id = ? AND subject = ?
                    ORDER BY id DESC
                    """,
                    (assignment["class_id"], assignment["subject"]),
                ).fetchall()
                announcements = connection.execute(
                    """
                    SELECT id, title, details, posted_at
                    FROM class_announcements
                    WHERE class_id = ? AND posted_by_teacher_id = ?
                    ORDER BY id DESC
                    """,
                    (assignment["class_id"], teacher["teacher_id"]),
                ).fetchall()
            self.send_json(200, {
                "assignment": public_teacher_assignment(assignment),
                "students": [
                    {**public_student(member), "attendanceStatus": member["attendance_status"] or "present"}
                    for member in members
                ],
                "homework": [{**dict(row), "canDelete": True} for row in homework],
                "announcements": [{**dict(row), "canDelete": True} for row in announcements],
                "schoolDate": school_date,
            })
            return
        self.serve_static(request_path)

    def do_POST(self):
        _parsed_path, request_path = self.api_path()
        if not self.request_origin_allowed():
            self.send_json(403, {"code": "origin_rejected", "error": "Request origin rejected."})
            return
        try:
            body = self.read_json()
        except (ValueError, json.JSONDecodeError):
            self.send_json(400, {"code": "bad_request", "error": "Invalid request."})
            return

        if request_path in {"/api/auth/register", "/api/admin/setup"}:
            initialize_database()

        if request_path == "/api/auth/register":
            self.handle_register(body)
        elif request_path == "/api/auth/login":
            self.handle_login(body)
        elif request_path == "/api/auth/logout":
            self.handle_logout()
        elif request_path == "/api/portal/profile":
            self.handle_profile(body)
        elif request_path == "/api/portal/dismiss":
            self.handle_post_dismissal(body)
        elif request_path == "/api/admin/setup":
            self.handle_admin_setup(body)
        elif request_path == "/api/admin/login":
            self.handle_admin_login(body)
        elif request_path == "/api/admin/logout":
            self.handle_admin_logout()
        elif request_path == "/api/admin/accounts":
            self.handle_admin_account_create(body)
        elif request_path == "/api/admin/change-password":
            self.handle_admin_password_change(body)
        elif request_path == "/api/admin/teachers":
            self.handle_teacher_account_create(body)
        elif request_path == "/api/admin/record":
            self.handle_admin_record(body)
        elif request_path == "/api/admin/reset-password":
            self.handle_admin_password_reset(body)
        elif request_path == "/api/admin/reset-students":
            self.handle_admin_students_reset(body)
        elif request_path == "/api/admin/class-assignment":
            self.handle_class_assignment(body)
        elif request_path == "/api/admin/class-removal":
            self.handle_class_removal(body)
        elif request_path == "/api/admin/class-record":
            self.handle_class_record(body)
        elif request_path == "/api/admin/class-record-delete":
            self.handle_class_record_delete(body)
        elif request_path == "/api/teacher/login":
            self.handle_teacher_login(body)
        elif request_path == "/api/teacher/logout":
            self.handle_teacher_logout()
        elif request_path == "/api/teacher/homework":
            self.handle_teacher_homework(body)
        elif request_path == "/api/teacher/announcement":
            self.handle_teacher_announcement(body)
        elif request_path == "/api/teacher/post-delete":
            self.handle_teacher_post_delete(body)
        elif request_path == "/api/teacher/grades":
            self.handle_teacher_grades(body)
        elif request_path == "/api/teacher/attendance":
            self.handle_teacher_attendance(body)
        else:
            self.send_json(404, {"code": "not_found", "error": "Not found."})

    def registration_allowed(self):
        now = int(time.time())
        ip_address = self.request_ip()
        with db_connection() as connection:
            row = connection.execute(
                "SELECT attempt_count, window_started FROM registration_attempts WHERE ip_address = ?",
                (ip_address,),
            ).fetchone()
            if not row or now - row["window_started"] >= REGISTER_WINDOW_SECONDS:
                connection.execute(
                    """
                    INSERT INTO registration_attempts (ip_address, attempt_count, window_started)
                    VALUES (?, 1, ?)
                    ON CONFLICT(ip_address) DO UPDATE SET attempt_count = 1, window_started = excluded.window_started
                    """,
                    (ip_address, now),
                )
                return True
            if row["attempt_count"] >= REGISTER_MAX_ATTEMPTS:
                return False
            connection.execute(
                "UPDATE registration_attempts SET attempt_count = attempt_count + 1 WHERE ip_address = ?",
                (ip_address,),
            )
            return True

    def handle_register(self, body):
        name = clean_text(body.get("name"))
        password = str(body.get("password", ""))
        homeroom = parse_homeroom_code(body.get("classCode"))
        if len(name) < 2:
            self.send_json(400, {"code": "name_required", "error": "Enter the student's full name."})
            return
        if not valid_password(password):
            self.send_json(
                400,
                {"code": "password_rule", "error": "Password must be 8-128 characters and include a letter and a number."},
            )
            return
        if not homeroom:
            self.send_json(400, {"code": "invalid_class", "error": "Choose an available class."})
            return
        if not self.registration_allowed():
            self.send_json(
                429,
                {"code": "register_limited", "error": "Too many account requests. Please try again later."},
            )
            return

        salt = secrets.token_bytes(16)
        hashed = password_hash(password, salt)
        with db_connection() as connection:
            connection.execute("BEGIN IMMEDIATE")
            grade, section = homeroom
            class_row = connection.execute(
                "SELECT id FROM classes WHERE grade = ? AND section = ?",
                (grade, section),
            ).fetchone()
            if not class_row:
                connection.rollback()
                self.send_json(400, {"code": "invalid_class", "error": "Choose an available class."})
                return
            next_number = claim_sequence_number(connection, "student_id")
            if next_number > 999:
                connection.rollback()
                self.send_json(503, {"code": "id_capacity", "error": "Student ID capacity reached."})
                return
            student_id = f"SSS-{next_number:03d}"
            connection.execute(
                """
                INSERT INTO students (student_id, full_name, password_salt, password_hash, grade, class_id)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (student_id, name, salt, hashed, grade, class_row["id"]),
            )
            connection.commit()
        self.send_json(201, {"studentId": student_id})

    def login_rate_status(self, attempt_key):
        now = int(time.time())
        with db_connection() as connection:
            row = connection.execute(
                "SELECT failure_count, window_started, blocked_until FROM login_attempts WHERE attempt_key = ?",
                (attempt_key,),
            ).fetchone()
            if row and row["blocked_until"] > now:
                return row["blocked_until"] - now
            if row and now - row["window_started"] >= LOGIN_WINDOW_SECONDS:
                connection.execute("DELETE FROM login_attempts WHERE attempt_key = ?", (attempt_key,))
            return 0

    def record_failed_login(self, attempt_key):
        now = int(time.time())
        with db_connection() as connection:
            row = connection.execute(
                "SELECT failure_count, window_started FROM login_attempts WHERE attempt_key = ?",
                (attempt_key,),
            ).fetchone()
            if not row or now - row["window_started"] >= LOGIN_WINDOW_SECONDS:
                failures = 1
                started = now
            else:
                failures = row["failure_count"] + 1
                started = row["window_started"]
            blocked_until = now + LOGIN_BLOCK_SECONDS if failures >= LOGIN_MAX_FAILURES else 0
            connection.execute(
                """
                INSERT INTO login_attempts (attempt_key, failure_count, window_started, blocked_until)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(attempt_key) DO UPDATE SET
                  failure_count = excluded.failure_count,
                  window_started = excluded.window_started,
                  blocked_until = excluded.blocked_until
                """,
                (attempt_key, failures, started, blocked_until),
            )
        return blocked_until

    def handle_login(self, body):
        student_id = clean_text(body.get("studentId"), 20).upper()
        password = str(body.get("password", ""))
        attempt_key = f"{self.request_ip()}|{student_id}"
        retry_after = self.login_rate_status(attempt_key)
        if retry_after:
            self.send_json(
                429,
                {"code": "login_locked", "error": "Too many failed attempts.", "retryAfterSeconds": retry_after},
                {"Retry-After": str(retry_after)},
            )
            return
        with db_connection() as connection:
            student = connection.execute(
                "SELECT * FROM students WHERE student_id = ?",
                (student_id,),
            ).fetchone()
        salt = student["password_salt"] if student else DUMMY_SALT
        expected_hash = student["password_hash"] if student else DUMMY_PASSWORD_HASH
        password_matches = bool(student) and hmac.compare_digest(password_hash(password, salt), expected_hash)
        if not re.fullmatch(r"SSS-\d{3}", student_id) or not password_matches:
            blocked_until = self.record_failed_login(attempt_key)
            code = "login_locked" if blocked_until else "invalid_login"
            status = 429 if blocked_until else 401
            self.send_json(status, {"code": code, "error": "Invalid student ID or password."})
            return

        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode("ascii")).hexdigest()
        expires_at = int(time.time()) + SESSION_TTL_SECONDS
        with db_connection() as connection:
            connection.execute("DELETE FROM login_attempts WHERE attempt_key = ?", (attempt_key,))
            connection.execute(
                "INSERT INTO sessions (token_hash, student_id, expires_at) VALUES (?, ?, ?)",
                (token_hash, student_id, expires_at),
            )
        cookie = self.session_cookie("sss_session", token, SESSION_TTL_SECONDS)
        self.send_json(200, {"user": public_student(student)}, {"Set-Cookie": cookie})

    def handle_logout(self):
        token = self.session_token()
        if token:
            with db_connection() as connection:
                connection.execute(
                    "DELETE FROM sessions WHERE token_hash = ?",
                    (hashlib.sha256(token.encode("ascii")).hexdigest(),),
                )
        self.send_json(
            200,
            {"ok": True},
            {"Set-Cookie": self.session_cookie("sss_session", "", 0)},
        )

    def handle_admin_setup(self, body):
        name = clean_text(body.get("name"), 80) or "School Administrator"
        password = str(body.get("password", ""))
        if not valid_admin_password(password):
            self.send_json(
                400,
                {
                    "code": "admin_password_rule",
                    "error": "Administrator password must be 8-128 characters with a letter, number, and symbol.",
                },
            )
            return
        salt = secrets.token_bytes(16)
        hashed = password_hash(password, salt)
        with db_connection() as connection:
            connection.execute("BEGIN IMMEDIATE")
            if connection.execute("SELECT 1 FROM administrators LIMIT 1").fetchone():
                connection.rollback()
                self.send_json(409, {"code": "setup_complete", "error": "Administrator setup is already complete."})
                return
            connection.execute(
                """
                INSERT INTO administrators (admin_id, full_name, password_salt, password_hash)
                VALUES ('ADM-1', ?, ?, ?)
                """,
                (name, salt, hashed),
            )
            connection.execute("UPDATE sequences SET value = 1 WHERE name = 'admin_id'")
            connection.commit()
        self.send_json(201, {"adminId": "ADM-1"})

    def handle_admin_login(self, body):
        admin_id = clean_text(body.get("adminId"), 20).upper()
        password = str(body.get("password", ""))
        attempt_key = f"admin|{self.request_ip()}|{admin_id}"
        retry_after = self.login_rate_status(attempt_key)
        if retry_after:
            self.send_json(
                429,
                {"code": "login_locked", "error": "Too many failed attempts.", "retryAfterSeconds": retry_after},
                {"Retry-After": str(retry_after)},
            )
            return
        with db_connection() as connection:
            admin = connection.execute(
                "SELECT * FROM administrators WHERE admin_id = ?",
                (admin_id,),
            ).fetchone()
        salt = admin["password_salt"] if admin else DUMMY_SALT
        expected_hash = admin["password_hash"] if admin else DUMMY_PASSWORD_HASH
        password_matches = bool(admin) and hmac.compare_digest(password_hash(password, salt), expected_hash)
        if not re.fullmatch(r"ADM-\d+", admin_id) or not password_matches:
            blocked_until = self.record_failed_login(attempt_key)
            code = "login_locked" if blocked_until else "invalid_login"
            status = 429 if blocked_until else 401
            self.send_json(status, {"code": code, "error": "Invalid administrator ID or password."})
            return
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode("ascii")).hexdigest()
        expires_at = int(time.time()) + SESSION_TTL_SECONDS
        with db_connection() as connection:
            connection.execute("DELETE FROM login_attempts WHERE attempt_key = ?", (attempt_key,))
            connection.execute(
                "INSERT INTO admin_sessions (token_hash, admin_id, expires_at) VALUES (?, ?, ?)",
                (token_hash, admin_id, expires_at),
            )
        cookie = self.session_cookie("sss_admin_session", token, SESSION_TTL_SECONDS)
        self.send_json(
            200,
            {"admin": {"adminId": admin["admin_id"], "name": admin["full_name"]}},
            {"Set-Cookie": cookie},
        )

    def handle_admin_logout(self):
        token = self.cookie_token("sss_admin_session")
        if token:
            with db_connection() as connection:
                connection.execute(
                    "DELETE FROM admin_sessions WHERE token_hash = ?",
                    (hashlib.sha256(token.encode("ascii")).hexdigest(),),
                )
        self.send_json(
            200,
            {"ok": True},
            {"Set-Cookie": self.session_cookie("sss_admin_session", "", 0)},
        )

    def handle_admin_account_create(self, body):
        if not self.require_admin():
            return
        name = clean_text(body.get("name"), 80)
        password = str(body.get("password", ""))
        if len(name) < 2:
            self.send_json(400, {"code": "name_required", "error": "Enter the administrator's full name."})
            return
        if not valid_admin_password(password):
            self.send_json(
                400,
                {
                    "code": "admin_password_rule",
                    "error": "Administrator password must be 8-128 characters with a letter, number, and symbol.",
                },
            )
            return
        salt = secrets.token_bytes(16)
        hashed = password_hash(password, salt)
        with db_connection() as connection:
            connection.execute("BEGIN IMMEDIATE")
            next_number = max(2, claim_sequence_number(connection, "admin_id"))
            admin_id = f"ADM-{next_number}"
            connection.execute("UPDATE sequences SET value = ? WHERE name = 'admin_id'", (next_number,))
            connection.execute(
                """
                INSERT INTO administrators (admin_id, full_name, password_salt, password_hash)
                VALUES (?, ?, ?, ?)
                """,
                (admin_id, name, salt, hashed),
            )
            connection.commit()
        self.send_json(201, {"administrator": {"adminId": admin_id, "name": name}})

    def handle_teacher_account_create(self, body):
        if not self.require_admin():
            return
        name = clean_text(body.get("name"), 80)
        password = str(body.get("password", ""))
        provided_assignments = body.get("assignments", [])
        if len(name) < 2:
            self.send_json(400, {"code": "name_required", "error": "Enter the teacher's full name."})
            return
        if not valid_admin_password(password):
            self.send_json(
                400,
                {"code": "teacher_password_rule", "error": "Teacher password must be 8-128 characters with a letter, number, and symbol."},
            )
            return
        if not isinstance(provided_assignments, list) or not provided_assignments or len(provided_assignments) > 30:
            self.send_json(400, {"code": "assignment_required", "error": "Choose at least one teaching assignment."})
            return
        assignments = []
        seen = set()
        for item in provided_assignments:
            if not isinstance(item, dict):
                self.send_json(400, {"code": "assignment_required", "error": "Choose valid teaching assignments."})
                return
            homeroom = parse_homeroom_code(item.get("classCode"))
            subject = clean_text(item.get("subject"), 80)
            if not homeroom or len(subject) < 2:
                self.send_json(400, {"code": "assignment_required", "error": "Choose a class and subject for each teaching assignment."})
                return
            key = (homeroom[0], homeroom[1], subject.casefold())
            if key in seen:
                continue
            seen.add(key)
            assignments.append((homeroom[0], homeroom[1], subject))
        salt = secrets.token_bytes(16)
        hashed = password_hash(password, salt)
        with db_connection() as connection:
            connection.execute("BEGIN IMMEDIATE")
            next_number = claim_sequence_number(connection, "teacher_id")
            if next_number > 999:
                connection.rollback()
                self.send_json(503, {"code": "id_capacity", "error": "Teacher ID capacity reached."})
                return
            teacher_id = f"TCH-{next_number:03d}"
            connection.execute(
                """
                INSERT INTO teachers (teacher_id, full_name, password_salt, password_hash)
                VALUES (?, ?, ?, ?)
                """,
                (teacher_id, name, salt, hashed),
            )
            for grade, section, subject in assignments:
                class_row = connection.execute(
                    "SELECT id FROM classes WHERE grade = ? AND section = ?",
                    (grade, section),
                ).fetchone()
                connection.execute(
                    "INSERT INTO teacher_assignments (teacher_id, class_id, subject) VALUES (?, ?, ?)",
                    (teacher_id, class_row["id"], subject),
                )
            connection.commit()
        self.send_json(201, {"teacher": {"teacherId": teacher_id, "name": name}})

    def handle_admin_password_change(self, body):
        admin = self.require_admin()
        if not admin:
            return
        current_password = str(body.get("currentPassword", ""))
        new_password = str(body.get("newPassword", ""))
        if not valid_admin_password(new_password):
            self.send_json(
                400,
                {
                    "code": "admin_password_rule",
                    "error": "Administrator password must be 8-128 characters with a letter, number, and symbol.",
                },
            )
            return
        with db_connection() as connection:
            stored = connection.execute(
                "SELECT password_salt, password_hash FROM administrators WHERE admin_id = ?",
                (admin["admin_id"],),
            ).fetchone()
            if not stored or not hmac.compare_digest(
                password_hash(current_password, stored["password_salt"]),
                stored["password_hash"],
            ):
                self.send_json(401, {"code": "invalid_current_password", "error": "Current password is incorrect."})
                return
            salt = secrets.token_bytes(16)
            hashed = password_hash(new_password, salt)
            connection.execute(
                "UPDATE administrators SET password_salt = ?, password_hash = ? WHERE admin_id = ?",
                (salt, hashed, admin["admin_id"]),
            )
            connection.execute("DELETE FROM admin_sessions WHERE admin_id = ?", (admin["admin_id"],))
        self.send_json(
            200,
            {"ok": True},
            {"Set-Cookie": self.session_cookie("sss_admin_session", "", 0)},
        )

    def admin_student_exists(self, connection, student_id):
        return connection.execute(
            "SELECT 1 FROM students WHERE student_id = ?",
            (student_id,),
        ).fetchone() is not None

    def score_value(self, value):
        if value in (None, ""):
            return None
        try:
            score = float(value)
        except (TypeError, ValueError):
            return None
        return score if 0 <= score <= 100 else None

    def handle_teacher_login(self, body):
        teacher_id = clean_text(body.get("teacherId"), 20).upper()
        password = str(body.get("password", ""))
        attempt_key = f"teacher|{self.request_ip()}|{teacher_id}"
        retry_after = self.login_rate_status(attempt_key)
        if retry_after:
            self.send_json(
                429,
                {"code": "login_locked", "error": "Too many failed attempts.", "retryAfterSeconds": retry_after},
                {"Retry-After": str(retry_after)},
            )
            return
        with db_connection() as connection:
            teacher = connection.execute(
                "SELECT * FROM teachers WHERE teacher_id = ?",
                (teacher_id,),
            ).fetchone()
        salt = teacher["password_salt"] if teacher else DUMMY_SALT
        expected_hash = teacher["password_hash"] if teacher else DUMMY_PASSWORD_HASH
        password_matches = bool(teacher) and hmac.compare_digest(password_hash(password, salt), expected_hash)
        if not re.fullmatch(r"TCH-\d{3}", teacher_id) or not password_matches:
            blocked_until = self.record_failed_login(attempt_key)
            code = "login_locked" if blocked_until else "invalid_login"
            status = 429 if blocked_until else 401
            self.send_json(status, {"code": code, "error": "Invalid teacher ID or password."})
            return
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode("ascii")).hexdigest()
        expires_at = int(time.time()) + SESSION_TTL_SECONDS
        with db_connection() as connection:
            connection.execute("DELETE FROM login_attempts WHERE attempt_key = ?", (attempt_key,))
            connection.execute(
                "INSERT INTO teacher_sessions (token_hash, teacher_id, expires_at) VALUES (?, ?, ?)",
                (token_hash, teacher_id, expires_at),
            )
        cookie = self.session_cookie("sss_teacher_session", token, SESSION_TTL_SECONDS)
        self.send_json(200, {"teacher": public_teacher(teacher)}, {"Set-Cookie": cookie})

    def handle_teacher_logout(self):
        token = self.cookie_token("sss_teacher_session")
        if token:
            with db_connection() as connection:
                connection.execute(
                    "DELETE FROM teacher_sessions WHERE token_hash = ?",
                    (hashlib.sha256(token.encode("ascii")).hexdigest(),),
                )
        self.send_json(
            200,
            {"ok": True},
            {"Set-Cookie": self.session_cookie("sss_teacher_session", "", 0)},
        )

    def required_teacher_assignment(self, body):
        teacher = self.require_teacher()
        if not teacher:
            return None, None
        try:
            assignment_id = int(body.get("assignmentId"))
        except (TypeError, ValueError):
            assignment_id = 0
        with db_connection() as connection:
            assignment = self.teacher_assignment(connection, teacher["teacher_id"], assignment_id)
        if not assignment:
            self.send_json(403, {"code": "assignment_required", "error": "Teaching assignment required."})
            return None, None
        return teacher, assignment

    def handle_teacher_homework(self, body):
        teacher, assignment = self.required_teacher_assignment(body)
        if not assignment:
            return
        details = clean_text(body.get("details"), 500)
        due_date = clean_text(body.get("dueDate"), 10) or None
        if not details or (due_date and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", due_date)):
            self.send_json(400, {"code": "invalid_record", "error": "Enter valid homework details."})
            return
        with db_connection() as connection:
            connection.execute(
                """
                INSERT INTO class_homework (class_id, subject, details, due_date, posted_by_teacher_id)
                VALUES (?, ?, ?, ?, ?)
                """,
                (assignment["class_id"], assignment["subject"], details, due_date, teacher["teacher_id"]),
            )
        self.send_json(201, {"ok": True})

    def handle_teacher_announcement(self, body):
        teacher, assignment = self.required_teacher_assignment(body)
        if not assignment:
            return
        title = clean_text(body.get("title"), 100)
        details = clean_text(body.get("details"), 500)
        if not title or not details:
            self.send_json(400, {"code": "invalid_record", "error": "Enter announcement details."})
            return
        with db_connection() as connection:
            connection.execute(
                """
                INSERT INTO class_announcements (class_id, title, details, posted_by_teacher_id)
                VALUES (?, ?, ?, ?)
                """,
                (assignment["class_id"], title, details, teacher["teacher_id"]),
            )
        self.send_json(201, {"ok": True})

    def handle_teacher_post_delete(self, body):
        teacher, assignment = self.required_teacher_assignment(body)
        if not assignment:
            return
        post_type = clean_text(body.get("type"), 20)
        try:
            post_id = int(body.get("postId"))
        except (TypeError, ValueError):
            post_id = 0
        if post_type not in {"homework", "announcement"} or post_id < 1:
            self.send_json(400, {"code": "invalid_record", "error": "Choose a post to delete."})
            return
        with db_connection() as connection:
            if post_type == "homework":
                deleted = connection.execute(
                    """
                    DELETE FROM class_homework
                    WHERE id = ? AND class_id = ? AND subject = ?
                    """,
                    (post_id, assignment["class_id"], assignment["subject"]),
                ).rowcount
            else:
                deleted = connection.execute(
                    """
                    DELETE FROM class_announcements
                    WHERE id = ? AND class_id = ? AND posted_by_teacher_id = ?
                    """,
                    (post_id, assignment["class_id"], teacher["teacher_id"]),
                ).rowcount
            if not deleted:
                self.send_json(404, {"code": "post_not_found", "error": "Post not found or cannot be deleted."})
                return
            ensure_post_dismissals_table(connection)
            connection.execute(
                "DELETE FROM dismissed_posts WHERE post_type = ? AND audience = 'class' AND post_id = ?",
                (post_type, post_id),
            )
        self.send_json(200, {"ok": True})

    def handle_teacher_grades(self, body):
        _teacher, assignment = self.required_teacher_assignment(body)
        if not assignment:
            return
        student_id = clean_text(body.get("studentId"), 20).upper()
        term_one = self.score_value(body.get("termOne"))
        term_two = self.score_value(body.get("termTwo"))
        if term_one is None and term_two is None:
            self.send_json(400, {"code": "invalid_record", "error": "Enter at least one grade from 0 to 100."})
            return
        with db_connection() as connection:
            student = connection.execute(
                "SELECT 1 FROM students WHERE student_id = ? AND class_id = ?",
                (student_id, assignment["class_id"]),
            ).fetchone()
            if not student:
                self.send_json(403, {"code": "assignment_required", "error": "Student is outside your assigned class."})
                return
            connection.execute(
                "INSERT INTO grades (student_id, subject, term_one, term_two) VALUES (?, ?, ?, ?)",
                (student_id, assignment["subject"], term_one, term_two),
            )
        self.send_json(201, {"ok": True})

    def handle_teacher_attendance(self, body):
        _teacher, assignment = self.required_teacher_assignment(body)
        if not assignment:
            return
        school_date = clean_text(body.get("schoolDate"), 10)
        records = body.get("records", [])
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", school_date) or not isinstance(records, list):
            self.send_json(400, {"code": "invalid_record", "error": "Enter a valid attendance sheet."})
            return
        with db_connection() as connection:
            members = connection.execute(
                "SELECT student_id FROM students WHERE class_id = ? ORDER BY student_id",
                (assignment["class_id"],),
            ).fetchall()
            member_ids = {member["student_id"] for member in members}
            submitted = {}
            for record in records:
                if not isinstance(record, dict):
                    self.send_json(400, {"code": "invalid_record", "error": "Enter a valid attendance sheet."})
                    return
                student_id = clean_text(record.get("studentId"), 20).upper()
                status = clean_text(record.get("status"), 10)
                if student_id in submitted or student_id not in member_ids or status not in {"present", "absent", "late"}:
                    self.send_json(400, {"code": "invalid_record", "error": "Enter attendance for current class members only."})
                    return
                submitted[student_id] = status
            if set(submitted) != member_ids:
                self.send_json(400, {"code": "invalid_record", "error": "Mark attendance for every student in the class."})
                return
            connection.execute("BEGIN IMMEDIATE")
            for student_id, status in submitted.items():
                connection.execute(
                    "DELETE FROM attendance WHERE student_id = ? AND school_date = ?",
                    (student_id, school_date),
                )
                connection.execute(
                    "INSERT INTO attendance (student_id, school_date, status) VALUES (?, ?, ?)",
                    (student_id, school_date, status),
                )
            connection.commit()
        self.send_json(200, {"ok": True})

    def handle_admin_record(self, body):
        if not self.require_admin():
            return
        student_id = clean_text(body.get("studentId"), 20).upper()
        record_type = clean_text(body.get("type"), 20)
        with db_connection() as connection:
            if not self.admin_student_exists(connection, student_id):
                self.send_json(404, {"code": "student_not_found", "error": "Student not found."})
                return
            if record_type == "grade":
                subject = clean_text(body.get("subject"), 80)
                term_one = self.score_value(body.get("termOne"))
                term_two = self.score_value(body.get("termTwo"))
                if not subject or (term_one is None and term_two is None):
                    self.send_json(400, {"code": "invalid_record", "error": "Enter a subject and at least one grade from 0 to 100."})
                    return
                connection.execute(
                    "INSERT INTO grades (student_id, subject, term_one, term_two) VALUES (?, ?, ?, ?)",
                    (student_id, subject, term_one, term_two),
                )
            elif record_type == "attendance":
                school_date = clean_text(body.get("schoolDate"), 10)
                status = clean_text(body.get("status"), 10)
                if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", school_date) or status not in {"present", "absent", "late"}:
                    self.send_json(400, {"code": "invalid_record", "error": "Enter an attendance date and valid status."})
                    return
                connection.execute(
                    "INSERT INTO attendance (student_id, school_date, status) VALUES (?, ?, ?)",
                    (student_id, school_date, status),
                )
            elif record_type == "homework":
                subject = clean_text(body.get("subject"), 80)
                details = clean_text(body.get("details"), 500)
                due_date = clean_text(body.get("dueDate"), 10) or None
                if not subject or not details or (due_date and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", due_date)):
                    self.send_json(400, {"code": "invalid_record", "error": "Enter valid homework details."})
                    return
                connection.execute(
                    "INSERT INTO homework (student_id, subject, details, due_date) VALUES (?, ?, ?, ?)",
                    (student_id, subject, details, due_date),
                )
            elif record_type == "announcement":
                title = clean_text(body.get("title"), 100)
                details = clean_text(body.get("details"), 500)
                if not title or not details:
                    self.send_json(400, {"code": "invalid_record", "error": "Enter announcement details."})
                    return
                connection.execute(
                    "INSERT INTO announcements (student_id, title, details) VALUES (?, ?, ?)",
                    (student_id, title, details),
                )
            elif record_type == "fee":
                label = clean_text(body.get("label"), 100)
                status = clean_text(body.get("status"), 10)
                try:
                    amount = float(body.get("amount"))
                except (TypeError, ValueError):
                    amount = -1
                if not label or amount < 0 or status not in {"due", "paid"}:
                    self.send_json(400, {"code": "invalid_record", "error": "Enter valid fee details."})
                    return
                connection.execute(
                    "INSERT INTO fees (student_id, label, amount, status) VALUES (?, ?, ?, ?)",
                    (student_id, label, amount, status),
                )
            else:
                self.send_json(400, {"code": "invalid_record", "error": "Record type is not supported."})
                return
        self.send_json(201, {"ok": True})

    def handle_admin_password_reset(self, body):
        if not self.require_admin():
            return
        student_id = clean_text(body.get("studentId"), 20).upper()
        password = str(body.get("newPassword", ""))
        if not valid_password(password):
            self.send_json(
                400,
                {"code": "password_rule", "error": "Password must be 8-128 characters and include a letter and a number."},
            )
            return
        salt = secrets.token_bytes(16)
        hashed = password_hash(password, salt)
        with db_connection() as connection:
            if not self.admin_student_exists(connection, student_id):
                self.send_json(404, {"code": "student_not_found", "error": "Student not found."})
                return
            connection.execute(
                "UPDATE students SET password_salt = ?, password_hash = ? WHERE student_id = ?",
                (salt, hashed, student_id),
            )
            connection.execute("DELETE FROM sessions WHERE student_id = ?", (student_id,))
        self.send_json(200, {"ok": True})

    def handle_admin_students_reset(self, body):
        if not self.require_admin():
            return
        if str(body.get("confirm", "")) != "RESET STUDENTS":
            self.send_json(400, {"code": "confirmation_required", "error": "Student reset confirmation required."})
            return
        with db_connection() as connection:
            connection.execute("BEGIN IMMEDIATE")
            total = connection.execute("SELECT COUNT(*) AS total FROM students").fetchone()["total"]
            connection.execute("DELETE FROM students")
            connection.execute("UPDATE sequences SET value = 0 WHERE name = 'student_id'")
            connection.execute("DELETE FROM registration_attempts")
            connection.execute(
                "DELETE FROM login_attempts "
                "WHERE attempt_key NOT LIKE 'admin|%' AND attempt_key NOT LIKE 'teacher|%'"
            )
            connection.commit()
        self.send_json(200, {"ok": True, "deletedStudents": total})

    def handle_class_assignment(self, body):
        if not self.require_admin():
            return
        student_id = clean_text(body.get("studentId"), 20).upper()
        homeroom = parse_homeroom_code(body.get("classCode"))
        if not homeroom:
            self.send_json(400, {"code": "invalid_class", "error": "Choose an available class."})
            return
        grade, section = homeroom
        with db_connection() as connection:
            if not self.admin_student_exists(connection, student_id):
                self.send_json(404, {"code": "student_not_found", "error": "Student not found."})
                return
            connection.execute(
                "INSERT INTO classes (grade, section) VALUES (?, ?) ON CONFLICT (grade, section) DO NOTHING",
                (grade, section),
            )
            class_row = connection.execute(
                "SELECT id, grade, section FROM classes WHERE grade = ? AND section = ?",
                (grade, section),
            ).fetchone()
            connection.execute(
                "UPDATE students SET class_id = ?, grade = ? WHERE student_id = ?",
                (class_row["id"], grade, student_id),
            )
        self.send_json(200, {"class": public_class(class_row)})

    def handle_class_removal(self, body):
        if not self.require_admin():
            return
        student_id = clean_text(body.get("studentId"), 20).upper()
        try:
            class_id = int(body.get("classId"))
        except (TypeError, ValueError):
            class_id = 0
        with db_connection() as connection:
            student = connection.execute(
                "SELECT class_id FROM students WHERE student_id = ?",
                (student_id,),
            ).fetchone()
            if not student:
                self.send_json(404, {"code": "student_not_found", "error": "Student not found."})
                return
            if not class_id or student["class_id"] != class_id:
                self.send_json(409, {"code": "not_in_class", "error": "Student is not in this class."})
                return
            connection.execute(
                "UPDATE students SET class_id = NULL WHERE student_id = ?",
                (student_id,),
            )
        self.send_json(200, {"ok": True})

    def handle_class_record(self, body):
        if not self.require_admin():
            return
        try:
            class_id = int(body.get("classId"))
        except (TypeError, ValueError):
            class_id = 0
        record_type = clean_text(body.get("type"), 20)
        with db_connection() as connection:
            if not connection.execute("SELECT 1 FROM classes WHERE id = ?", (class_id,)).fetchone():
                self.send_json(404, {"code": "class_not_found", "error": "Class not found."})
                return
            if record_type == "homework":
                subject = clean_text(body.get("subject"), 80)
                details = clean_text(body.get("details"), 500)
                due_date = clean_text(body.get("dueDate"), 10) or None
                if not subject or not details or (due_date and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", due_date)):
                    self.send_json(400, {"code": "invalid_record", "error": "Enter valid homework details."})
                    return
                connection.execute(
                    "INSERT INTO class_homework (class_id, subject, details, due_date) VALUES (?, ?, ?, ?)",
                    (class_id, subject, details, due_date),
                )
            elif record_type == "announcement":
                title = clean_text(body.get("title"), 100)
                details = clean_text(body.get("details"), 500)
                if not title or not details:
                    self.send_json(400, {"code": "invalid_record", "error": "Enter announcement details."})
                    return
                connection.execute(
                    "INSERT INTO class_announcements (class_id, title, details) VALUES (?, ?, ?)",
                    (class_id, title, details),
                )
            else:
                self.send_json(400, {"code": "invalid_record", "error": "Only class homework and announcements are supported."})
                return
        self.send_json(201, {"ok": True})

    def handle_class_record_delete(self, body):
        if not self.require_admin():
            return
        post_type = clean_text(body.get("type"), 20)
        try:
            class_id = int(body.get("classId"))
            post_id = int(body.get("postId"))
        except (TypeError, ValueError):
            class_id = 0
            post_id = 0
        if post_type not in {"homework", "announcement"} or class_id < 1 or post_id < 1:
            self.send_json(400, {"code": "invalid_record", "error": "Choose a class post to delete."})
            return
        with db_connection() as connection:
            if post_type == "homework":
                deleted = connection.execute(
                    "DELETE FROM class_homework WHERE id = ? AND class_id = ?",
                    (post_id, class_id),
                ).rowcount
            else:
                deleted = connection.execute(
                    "DELETE FROM class_announcements WHERE id = ? AND class_id = ?",
                    (post_id, class_id),
                ).rowcount
            if not deleted:
                self.send_json(404, {"code": "post_not_found", "error": "Class post not found."})
                return
            ensure_post_dismissals_table(connection)
            connection.execute(
                "DELETE FROM dismissed_posts WHERE post_type = ? AND audience = 'class' AND post_id = ?",
                (post_type, post_id),
            )
        self.send_json(200, {"ok": True})

    def handle_post_dismissal(self, body):
        student = self.authenticated_student()
        if not student:
            self.send_json(401, {"code": "auth_required", "error": "Authentication required."})
            return
        post_type = clean_text(body.get("type"), 20)
        audience = clean_text(body.get("audience"), 20)
        try:
            post_id = int(body.get("postId"))
        except (TypeError, ValueError):
            post_id = 0
        queries = {
            ("homework", "student"): "SELECT 1 FROM homework WHERE id = ? AND student_id = ?",
            ("announcement", "student"): "SELECT 1 FROM announcements WHERE id = ? AND student_id = ?",
            ("homework", "class"): "SELECT 1 FROM class_homework WHERE id = ? AND class_id = ?",
            ("announcement", "class"): "SELECT 1 FROM class_announcements WHERE id = ? AND class_id = ?",
        }
        query = queries.get((post_type, audience))
        owner_id = student["student_id"] if audience == "student" else student["class_id"]
        if not query or post_id < 1 or not owner_id:
            self.send_json(400, {"code": "invalid_record", "error": "Choose a post to dismiss."})
            return
        with db_connection() as connection:
            accessible = connection.execute(
                query,
                (post_id, owner_id),
            ).fetchone()
            if not accessible:
                self.send_json(404, {"code": "post_not_found", "error": "Post not found."})
                return
            ensure_post_dismissals_table(connection)
            connection.execute(
                """
                INSERT INTO dismissed_posts (student_id, post_type, audience, post_id)
                VALUES (?, ?, ?, ?)
                ON CONFLICT (student_id, post_type, audience, post_id) DO NOTHING
                """,
                (student["student_id"], post_type, audience, post_id),
            )
        self.send_json(200, {"ok": True})

    def handle_profile(self, body):
        student = self.authenticated_student()
        if not student:
            self.send_json(401, {"code": "auth_required", "error": "Authentication required."})
            return
        transport = str(body.get("transport", ""))
        if transport not in {"bus", "none"}:
            self.send_json(400, {"code": "invalid_transport", "error": "Choose transportation."})
            return
        with db_connection() as connection:
            connection.execute(
                "UPDATE students SET transport = ? WHERE student_id = ?",
                (transport, student["student_id"]),
            )
            updated = connection.execute(
                STUDENT_WITH_CLASS_SQL + " WHERE students.student_id = ?",
                (student["student_id"],),
            ).fetchone()
        self.send_json(200, {"user": public_student(updated)})

    def serve_static(self, request_path):
        pathname = "/index.html" if request_path == "/" else request_path
        if pathname not in STATIC_FILES:
            self.send_error(404, "Not found")
            return
        file_path = ROOT / "assets" / "success-story-mark.png" if pathname == "/favicon.ico" else ROOT / pathname.lstrip("/")
        content = file_path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", CONTENT_TYPES.get(file_path.suffix, "application/octet-stream"))
        self.send_header("Content-Length", str(len(content)))
        self.send_header("Cache-Control", "no-cache" if file_path.suffix == ".html" else "public, max-age=300")
        self.end_headers()
        self.wfile.write(content)

    def log_message(self, message, *args):
        print(f"[portal] {self.address_string()} - {message % args}")


if __name__ == "__main__":
    initialize_database()
    server = ThreadingHTTPServer((HOST, PORT), SchoolPortalHandler)
    print(f"Success Story School server listening on http://{HOST}:{PORT}")
    server.serve_forever()
