const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const root = process.cwd();
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const html = fs.readFileSync(path.join(root, "portal.html"), "utf8");
const teacherHtml = fs.readFileSync(path.join(root, "teacher.html"), "utf8");
const adminHtml = fs.readFileSync(path.join(root, "admin.html"), "utf8");
const js = fs.readFileSync(path.join(root, "portal.js"), "utf8");
const css = fs.readFileSync(path.join(root, "portal.css"), "utf8");
const teacherJs = fs.readFileSync(path.join(root, "teacher.js"), "utf8");
const teacherCss = fs.readFileSync(path.join(root, "teacher.css"), "utf8");
const adminJs = fs.readFileSync(path.join(root, "admin.js"), "utf8");
const adminCss = fs.readFileSync(path.join(root, "admin.css"), "utf8");
const homepageJs = fs.readFileSync(path.join(root, "school-app.js"), "utf8");
const homepageCss = fs.readFileSync(path.join(root, "school-react.css"), "utf8");
const designSystemCss = fs.readFileSync(path.join(root, "design-system.css"), "utf8");
const tailwindCss = fs.readFileSync(path.join(root, "school-tailwind.css"), "utf8");
const tailwindInputCss = fs.readFileSync(path.join(root, "src", "site", "styles", "tailwind.css"), "utf8");
const tailwindConfig = fs.readFileSync(path.join(root, "tailwind.config.js"), "utf8");
const tailwindCardSource = fs.readFileSync(path.join(root, "src", "site", "components", "examples", "TailwindCard.jsx"), "utf8");
const inspiredDashboardSource = fs.readFileSync(path.join(root, "src", "site", "components", "examples", "InspiredStudentDashboardCards.jsx"), "utf8");
const portalIcons = fs.readFileSync(path.join(root, "assets", "portal-icons.svg"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
const server = fs.readFileSync(path.join(root, "server.py"), "utf8");

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function freePort() {
  return new Promise((resolve, reject) => {
    const listener = net.createServer();
    listener.on("error", reject);
    listener.listen(0, "127.0.0.1", () => {
      const { port } = listener.address();
      listener.close(() => resolve(port));
    });
  });
}

async function waitForServer(baseUrl, child) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`Server exited early with code ${child.exitCode}`);
    }
    try {
      const response = await fetch(`${baseUrl}/api/admin/setup-status`);
      if (response.ok) {
        return;
      }
    } catch {
      await delay(100);
    }
  }
  throw new Error("Timed out waiting for the test server.");
}

async function postJson(baseUrl, pathname, body, cookie) {
  const headers = { "Content-Type": "application/json" };
  if (cookie) {
    headers.Cookie = cookie;
  }
  const response = await fetch(`${baseUrl}${pathname}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  return {
    response,
    payload,
    cookie: response.headers.get("set-cookie")?.split(";", 1)[0] || "",
  };
}

test("overview metrics expose status hooks instead of permanent Not posted text", () => {
  assert.match(html, /data-metric-status="attendance"/);
  assert.match(html, /data-metric-status="average"/);
  assert.match(html, /data-metric-status="fees"/);
  assert.match(js, /function updateMetric\(name, value\)/);
  assert.match(js, /status\.hidden = hasValue/);
  assert.match(js, /card\.dataset\.state = hasValue \? "ready" : "empty"/);
});

test("overview cards switch from empty copy to live school content", () => {
  assert.match(html, /data-overview-card="announcements"/);
  assert.match(html, /data-overview-card="homework"/);
  assert.match(html, /data-overview-announcement-detail/);
  assert.match(html, /data-overview-homework-detail/);
  assert.match(js, /function renderOverviewCards/);
  assert.match(js, /latestAnnouncement\.details/);
  assert.match(js, /latestHomework\.details/);
});

test("student posts can be dismissed through the real portal API", () => {
  assert.match(js, /function dismissPost\(type, post\)/);
  assert.match(js, /"\/api\/portal\/dismiss"/);
  assert.match(js, /postId: post\.id/);
  assert.match(js, /function addDismissButton\(item, type, post\)/);
  assert.match(js, /text\("markRead"\)/);
});

test("student registration is pending until school approval", () => {
  assert.match(server, /requested_class_id/);
  assert.match(server, /is_approved/);
  assert.match(server, /VALUES \(\?, \?, \?, \?, \?, NULL, \?, \?\)/);
  assert.match(server, /\(student_id, name, salt, hashed, grade, class_row\["id"\], False\)/);
  assert.match(server, /if is_approved and student\["class_id"\]:/);
  const portalRecordsBlock = server.slice(
    server.indexOf("def portal_records"),
    server.indexOf("def do_GET")
  );
  assert.doesNotMatch(portalRecordsBlock, /"members"/);
  assert.match(server, /"code": "pending_approval"/);
  assert.match(server, /Waiting for admin permission\./);
  assert.match(js, /pending_approval: "waitingPermission"/);
  assert.match(js, /Waiting for admin permission\./);
  assert.match(html, /Class placement/);
  assert.match(js, /Pending school approval/);
  assert.match(adminJs, /pendingApproval/);
  assert.match(adminHtml, /data-decline-student/);
  assert.match(adminJs, /Student verification/);
  assert.match(adminJs, /Verify/);
  assert.match(adminJs, /Decline/);
  assert.match(adminJs, /"\/api\/admin\/student-decline"/);
  assert.match(server, /def handle_student_decline/);
});

test("production admin setup requires private setup secret", () => {
  assert.match(server, /ADMIN_SETUP_SECRET = os\.environ\.get\("ADMIN_SETUP_SECRET"/);
  assert.match(server, /ADMIN_SETUP_SECRET_REQUIRED = \(/);
  assert.match(server, /SSS_REQUIRE_ADMIN_SETUP_SECRET/);
  assert.match(server, /HOST not in LOCAL_HOSTS/);
  assert.match(server, /ADMIN_SETUP_SECRET_REQUIRED and \(/);
  assert.match(server, /setup_secret_required/);
  assert.match(adminHtml, /name="setupSecret"/);
  assert.match(adminJs, /setupSecret: values\.get\("setupSecret"\)/);
});

test("destructive student reset requires current admin password", () => {
  assert.match(server, /def admin_password_matches\(self, connection, admin_id, password\):/);
  const resetBlock = server.slice(
    server.indexOf("def handle_admin_students_reset"),
    server.indexOf("def handle_class_assignment")
  );
  assert.match(resetBlock, /admin = self\.require_admin\(\)/);
  assert.match(resetBlock, /body\.get\("currentPassword"/);
  assert.match(resetBlock, /self\.admin_password_matches\(connection, admin\["admin_id"\], current_password\)/);
  assert.match(resetBlock, /"code": "invalid_current_password"/);
  assert.match(resetBlock, /DELETE FROM students/);
});

test("password hashing has a secure fallback when scrypt is unavailable", () => {
  const passwordHashStart = server.indexOf("def password_hash");
  const passwordHashBlock = server.slice(
    passwordHashStart,
    server.indexOf("DUMMY_PASSWORD_HASH", passwordHashStart)
  );
  assert.match(passwordHashBlock, /hasattr\(hashlib, "scrypt"\)/);
  assert.match(passwordHashBlock, /hashlib\.pbkdf2_hmac/);
  assert.match(passwordHashBlock, /310_000/);
  assert.match(passwordHashBlock, /hashlib\.scrypt/);
});

test("POST bodies are validated as JSON objects before routing", () => {
  assert.match(server, /class RequestValidationError\(ValueError\):/);
  const readJsonBlock = server.slice(
    server.indexOf("def read_json"),
    server.indexOf("def request_origin_allowed")
  );
  assert.match(readJsonBlock, /Content-Type/);
  assert.match(readJsonBlock, /application\/json/);
  assert.match(readJsonBlock, /isinstance\(payload, dict\)/);
  assert.match(readJsonBlock, /request_too_large/);
  assert.match(server, /except RequestValidationError as error:/);
});

test("backend enforces setup secret, JSON validation, and reset re-auth", async (t) => {
  assert.equal(typeof fetch, "function");
  let port;
  try {
    port = await freePort();
  } catch (error) {
    if (error.code === "EPERM") {
      t.skip("local HTTP listeners are blocked in this sandbox");
      return;
    }
    throw error;
  }
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "sss-api-"));
  const child = spawn("python3", ["server.py"], {
    cwd: root,
    env: {
      ...process.env,
      SSS_DATA_DIR: dataDir,
      SSS_REQUIRE_ADMIN_SETUP_SECRET: "1",
      ADMIN_SETUP_SECRET: "setup-token",
      HOST: "127.0.0.1",
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stderr = "";
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    await waitForServer(baseUrl, child);

    const badJson = await fetch(`${baseUrl}/api/admin/setup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(["not", "an", "object"]),
    });
    assert.equal(badJson.status, 400);
    assert.equal((await badJson.json()).code, "bad_request");

    const setupWithoutSecret = await postJson(baseUrl, "/api/admin/setup", {
      adminId: "ADM-0001",
      name: "Office Admin",
      password: "Adminpass1!",
    });
    assert.equal(setupWithoutSecret.response.status, 403);
    assert.equal(setupWithoutSecret.payload.code, "setup_secret_required");

    const setup = await postJson(baseUrl, "/api/admin/setup", {
      adminId: "ADM-0001",
      name: "Office Admin",
      password: "Adminpass1!",
      setupSecret: "setup-token",
    });
    assert.equal(setup.response.status, 201);

    const login = await postJson(baseUrl, "/api/admin/login", {
      adminId: "ADM-0001",
      password: "Adminpass1!",
    });
    assert.equal(login.response.status, 200);
    assert.match(login.cookie, /^sss_admin_session=/);

    const register = await postJson(baseUrl, "/api/auth/register", {
      name: "Pending Student",
      classCode: "8-A",
      password: "Studentpass1",
    });
    assert.equal(register.response.status, 201);
    assert.equal(register.payload.studentId, "SSS-001");

    const resetWithoutPassword = await postJson(baseUrl, "/api/admin/reset-students", {
      confirm: "RESET STUDENTS",
    }, login.cookie);
    assert.equal(resetWithoutPassword.response.status, 401);
    assert.equal(resetWithoutPassword.payload.code, "invalid_current_password");

    const reset = await postJson(baseUrl, "/api/admin/reset-students", {
      confirm: "RESET STUDENTS",
      currentPassword: "Adminpass1!",
    }, login.cookie);
    assert.equal(reset.response.status, 200);
    assert.equal(reset.payload.deletedStudents, 1);
  } finally {
    child.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => child.once("exit", resolve)),
      delay(1000),
    ]);
    fs.rmSync(dataDir, { recursive: true, force: true });
  }

  assert.equal(stderr, "");
});

test("rate limits ignore spoofable forwarded headers by default", () => {
  assert.match(server, /import ipaddress/);
  assert.match(server, /def env_flag\(name\):/);
  assert.match(server, /TRUST_PROXY_HEADERS = env_flag\("SSS_TRUST_PROXY_HEADERS"\)/);
  const requestIpBlock = server.slice(
    server.indexOf("def request_ip"),
    server.indexOf("@staticmethod", server.indexOf("def request_ip"))
  );
  assert.match(requestIpBlock, /if TRUST_PROXY_HEADERS:/);
  assert.match(requestIpBlock, /X-Forwarded-For/);
  assert.match(requestIpBlock, /ipaddress\.ip_address\(candidate\)/);
  assert.match(requestIpBlock, /return self\.client_address\[0\]/);
  assert.doesNotMatch(requestIpBlock, /forwarded or self\.client_address/);
});

test("account navigation uses clean routes instead of file names", () => {
  assert.match(server, /CLEAN_ROUTES = \{/);
  assert.match(server, /"\/student": "\/portal\.html"/);
  assert.match(server, /"\/teacher": "\/teacher\.html"/);
  assert.match(server, /"\/office-access": "\/admin\.html"/);
  assert.doesNotMatch(server, /"\/admin": "\/admin\.html"/);
  const navSurface = `${indexHtml}\n${html}\n${teacherHtml}\n${adminHtml}\n${homepageJs}`;
  assert.doesNotMatch(navSurface, /href="(?:portal|teacher|admin|index)\.html"/);
  assert.doesNotMatch(navSurface, /href: "(?:portal|teacher|admin)\.html"/);
  assert.doesNotMatch(navSurface, /href="\/admin"/);
  assert.match(navSurface, /href="\/student"|href: "\/student"/);
  assert.match(navSurface, /href="\/teacher"|href: "\/teacher"/);
  assert.match(server, /"\/admin\.html": "\/office-access"/);
});

test("administration login is quiet and does not reveal a default account", () => {
  assert.match(adminHtml, /Administration Login/);
  assert.match(adminHtml, /For authorized school staff only/);
  assert.match(adminHtml, /placeholder="Administrator ID"/);
  assert.match(adminHtml, /pattern="ADM-\[0-9\]\{4,8\}"/);
  assert.match(adminCss, /\.admin-login-shell/);
  assert.match(adminCss, /backdrop-filter: none/);
  assert.match(server, /"setupRequired": setup_required/);
  assert.match(server, /valid_setup_admin_id\(admin_id\)/);
  assert.match(adminJs, /adminId: values\.get\("adminId"\)/);
  const publicAdminSurface = `${adminHtml}\n${adminJs}`;
  assert.doesNotMatch(publicAdminSurface, /value="ADM-1"|placeholder="ADM-1"|Create ADM-1 account|Manage real student records|real student records|records and classrooms/);
});

test("student overview has premium responsive visual states", () => {
  assert.match(html, /student-command-center/);
  assert.match(html, /student-dashboard-shell/);
  assert.match(html, /data-inspiration="stripe-clean"/);
  assert.match(html, /account-path/);
  assert.match(js, /data-summary-updates/);
  assert.match(js, /data-summary-transport/);
  assert.match(css, /\.overview-snapshot/);
  assert.match(css, /\.overview-quick/);
  assert.match(css, /\.command-center/);
  assert.match(css, /\.account-path/);
  assert.match(css, /\.metrics article\[data-state="ready"\]/);
  assert.match(css, /\.content-card\[data-state="ready"\]/);
  assert.match(css, /Stripe-inspired student dashboard refinements/);
  assert.match(css, /\.student-dashboard-shell \.metrics article:hover/);
  assert.match(css, /backdrop-filter: blur\(22px\) saturate\(145%\)/);
  assert.match(css, /\.student-dashboard-shell \.content-card\[data-state="ready"\]/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.student-dashboard-shell/);
  assert.match(css, /@media \(max-width: 700px\)/);
});

test("teacher and administration dashboards expose live command centers", () => {
  assert.match(teacherHtml, /teacher-command-center/);
  assert.match(teacherHtml, /data-teacher-assignment-count/);
  assert.match(teacherHtml, /data-teacher-current-subject/);
  assert.match(teacherJs, /function updateTeacherSummary/);
  assert.match(teacherJs, /data-teacher-class-size/);
  assert.match(teacherCss, /\.teacher-command-center/);
  assert.match(teacherCss, /\.workspace-header/);

  assert.match(adminHtml, /admin-command-center/);
  assert.match(adminHtml, /data-admin-total-students/);
  assert.match(adminHtml, /data-admin-total-admins/);
  assert.match(adminJs, /function updateAdminSummary/);
  assert.match(adminJs, /data-admin-total-teachers/);
  assert.match(adminCss, /\.admin-command-center/);
  assert.match(adminCss, /\.admin-workspace/);
});

test("palette is role-based and context-aware", () => {
  const paletteCss = `${css}\n${homepageCss}`;
  assert.match(indexHtml, /<link rel="stylesheet" href="school-react\.css(?:\?v=[^\"]+)?">/);
  assert.match(indexHtml, /<meta name="theme-color" content="#12324A">/);
  assert.match(html, /<meta name="theme-color" content="#12324A">/);
  assert.match(teacherHtml, /<meta name="theme-color" content="#12324A">/);
  assert.match(adminHtml, /<meta name="theme-color" content="#12324A">/);
  assert.match(css, /--primary: #0f766e/);
  assert.match(css, /--neutral: #f4f8f7/);
  assert.match(css, /--accent: #d59a2b/);
  assert.match(css, /--ink: #1e293b/);
  assert.match(css, /--navy: #12324a/);
  assert.match(css, /--line: #d8e3e0/);
  assert.match(homepageCss, /--primary: #0f766e/);
  assert.match(homepageCss, /--neutral: #f4f8f7/);
  assert.match(homepageCss, /--accent: #d59a2b/);
  assert.match(homepageCss, /--ink: #1e293b/);
  assert.match(homepageCss, /--navy: #12324a/);
  assert.match(homepageCss, /--line: #d8e3e0/);
  assert.match(paletteCss, /teal/i);
  assert.doesNotMatch(paletteCss, /purple|indigo|violet|plum/i);
  assert.doesNotMatch(paletteCss, /#(?:4f46e5|6366f1|7c3aed|8b5cf6|a855f7|9333ea|6c3f85|1e1b4b)/i);
  assert.match(css, /\.module-tabs button\[data-tab="announcements"\]/);
  assert.match(css, /\.metrics article\[data-metric-card="attendance"\]/);
  assert.match(css, /\.content-card\[data-overview-card="homework"\]/);
  assert.match(css, /\.post-item\[data-kind="announcement"\]/);
  assert.match(js, /item\.dataset\.kind = "homework"/);
  assert.match(js, /item\.dataset\.kind = "announcement"/);
  assert.match(homepageCss, /background: var\(--primary\)/);
  assert.doesNotMatch(homepageCss, /\.action-link\.primary,[\s\S]*?linear-gradient\(135deg, var\(--teal\), var\(--accent\)\)/);
  assert.doesNotMatch(homepageCss, /\.portal-preview-section[\s\S]*?linear-gradient\(135deg, var\(--navy\) 0%, var\(--accent\) 54%, var\(--teal\) 100%\)/);
  assert.doesNotMatch(homepageCss, /\.portal-hub[\s\S]*?color-mix\(in srgb, var\(--accent\) 12%, white\)/);
  assert.match(readme, /premium teal-led\s+academic palette/);
  assert.match(readme, /Buttons use solid teal/);
  assert.match(readme, /no purple,\s+indigo, or violet accents/);
});

test("design system provides accessible hierarchy and 4-point framework utilities", () => {
  const designLinks = `${indexHtml}\n${html}\n${teacherHtml}\n${adminHtml}`;
  assert.match(designLinks, /href="design-system\.css\?v=20260620-ui-system"/);
  assert.match(server, /"\/design-system\.css"/);
  assert.match(designSystemCss, /--edu-space-1: 4px/);
  assert.match(designSystemCss, /--edu-space-2: 8px/);
  assert.match(designSystemCss, /--edu-space-4: 16px/);
  assert.match(designSystemCss, /--edu-color-navy-800: #12324a/i);
  assert.match(designSystemCss, /--edu-color-teal-700: #0f766e/i);
  assert.match(designSystemCss, /--edu-rgb-navy-800: 18 50 74/);
  assert.match(designSystemCss, /--edu-rgb-teal-700: 15 118 110/);
  assert.match(designSystemCss, /--edu-rgb-danger: 180 35 24/);
  assert.match(designSystemCss, /--edu-hero-gradient: linear-gradient/);
  assert.match(designSystemCss, /:where\(:focus-visible\)/);
  assert.match(designSystemCss, /outline-offset: 3px/);
  assert.match(designSystemCss, /--edu-font-heading: "Fraunces"/);
  assert.match(designSystemCss, /--edu-font-body: "Inter"/);
  assert.match(designSystemCss, /h1,\n\.edu-h1/);
  assert.match(designSystemCss, /h6,\n\.edu-h6/);
  assert.match(designSystemCss, /\.edu-lead/);
  assert.match(designSystemCss, /\.edu-grid/);
  assert.match(designSystemCss, /\.edu-dashboard-grid/);
  assert.match(designSystemCss, /grid-template-columns: minmax\(220px, 280px\) minmax\(0, 1fr\)/);
  assert.match(designSystemCss, /repeat\(auto-fit, minmax\(min\(100%, 260px\), 1fr\)\)/);
  assert.match(designSystemCss, /\.edu-dashboard-sidebar/);
  assert.match(designSystemCss, /\.edu-button-primary/);
  assert.match(designSystemCss, /\.edu-button-secondary/);
  assert.match(designSystemCss, /\.edu-button-tertiary/);
  assert.match(designSystemCss, /:where\(\.edu-input, \.form-input, input, select, textarea\)/);
  assert.match(designSystemCss, /prefers-reduced-motion: reduce/);
  assert.match(html, /dashboard-grid edu-dashboard-grid/);
  assert.match(html, /portal-sidebar edu-dashboard-sidebar/);
});

test("Tailwind CSS is integrated as a utility-only React build layer", () => {
  const packageJson = fs.readFileSync(path.join(root, "package.json"), "utf8");

  assert.match(packageJson, /"tailwindcss": "\^4\./);
  assert.match(packageJson, /"@tailwindcss\/cli": "\^4\./);
  assert.match(packageJson, /"build:tailwind": "npx @tailwindcss\/cli -i \.\/src\/site\/styles\/tailwind\.css -o \.\/school-tailwind\.css --minify"/);
  assert.match(packageJson, /"build": "npm run build:site && npm run build:carousel && npm run build:tailwind"/);
  assert.match(indexHtml, /href="school-tailwind\.css\?v=20260620-tailwind"/);
  assert.match(server, /"\/school-tailwind\.css"/);
  assert.match(tailwindConfig, /content: \[/);
  assert.match(tailwindConfig, /"\.\/src\/site\/\*\*\/\*\.\{js,jsx\}"/);
  assert.match(tailwindConfig, /theme: \{[\s\S]*extend: \{/);
  assert.match(tailwindConfig, /school: \{[\s\S]*navy: "#12324a"[\s\S]*teal: "#0f766e"[\s\S]*amber: "#d59a2b"/);
  assert.match(tailwindConfig, /fontFamily: \{[\s\S]*heading:/);
  assert.match(tailwindInputCss, /@config "\.\.\/\.\.\/\.\.\/tailwind\.config\.js";/);
  assert.match(tailwindInputCss, /@source "\.\.\/\.\.\/\.\.\/index\.html";/);
  assert.match(tailwindInputCss, /@import "tailwindcss\/theme\.css" layer\(theme\);/);
  assert.match(tailwindInputCss, /@import "tailwindcss\/utilities\.css" layer\(utilities\);/);
  assert.doesNotMatch(tailwindInputCss, /preflight\.css|@import "tailwindcss";/);
  assert.match(tailwindInputCss, /--color-school-navy: #12324a/i);
  assert.match(tailwindInputCss, /--font-heading: "Fraunces"/);
  assert.match(tailwindCardSource, /export function TailwindCard/);
  assert.match(tailwindCardSource, /rounded-school border border-school-line bg-white p-6 shadow-school/);
  assert.match(tailwindCardSource, /font-heading text-2xl leading-tight text-school-navy/);
  assert.match(inspiredDashboardSource, /export function InspiredStudentDashboardCards/);
  assert.match(inspiredDashboardSource, /grid gap-4 md:grid-cols-3/);
  assert.match(inspiredDashboardSource, /bg-white\/75 p-5 shadow-school backdrop-blur-xl/);
  assert.match(inspiredDashboardSource, /hover:-translate-y-1 hover:shadow-lg/);
  assert.match(tailwindCss, /tailwindcss v4\./);
  assert.match(tailwindCss, /\.rounded-school/);
  assert.match(tailwindCss, /\.bg-school-teal/);
  assert.match(tailwindCss, /\.font-heading/);
  assert.match(tailwindCss, /\.shadow-school/);
  assert.match(tailwindCss, /backdrop-blur-xl/);
  assert.match(tailwindCss, /md\\:grid-cols-3/);
  assert.match(tailwindCss, /bg-white\\\/75/);
  assert.doesNotMatch(tailwindCss, /h1,h2,h3,h4,h5,h6\{font-size:inherit;font-weight:inherit\}/);
});

test("student portal uses a consistent SVG icon set for key modules", () => {
  const expectedIcons = [
    "grades",
    "attendance",
    "homework",
    "announcements",
    "bus",
    "registration",
    "logout",
  ];
  expectedIcons.forEach((name) => {
    assert.match(portalIcons, new RegExp(`<symbol id="icon-${name}"`));
    assert.match(html, new RegExp(`/assets/portal-icons\\.svg#icon-${name}`));
  });
  assert.match(server, /"\/assets\/portal-icons\.svg"/);
  assert.match(server, /"\.svg": "image\/svg\+xml; charset=utf-8"/);
  assert.match(css, /\.portal-icon/);
  assert.match(css, /\.module-tabs \.portal-icon/);
});

test("motion is subtle, accessible, and uses animated dashboard widgets", () => {
  const motionCss = `${css}\n${teacherCss}\n${adminCss}\n${homepageCss}\n${designSystemCss}`;
  const primitivesSource = fs.readFileSync(path.join(root, "src", "site", "components", "primitives.jsx"), "utf8");
  const portalPreviewSource = fs.readFileSync(path.join(root, "src", "site", "components", "sections", "PortalPreviewSection.jsx"), "utf8");

  assert.doesNotMatch(motionCss, /@keyframes/);
  assert.doesNotMatch(motionCss, /animation\s*:/);
  assert.doesNotMatch(motionCss, /scroll-behavior:\s*smooth/);
  assert.match(designSystemCss, /--edu-motion-fast: 160ms/);
  assert.match(designSystemCss, /transform var\(--edu-motion-fast\) var\(--edu-motion-ease\)/);
  assert.match(designSystemCss, /scale\(1\.015\)/);
  assert.match(designSystemCss, /prefers-reduced-motion: reduce/);
  assert.match(designSystemCss, /transform: none !important/);
  assert.match(designSystemCss, /\.dashboard-preview-widget/);
  assert.match(homepageCss, /\[data-reveal-card\]\s*\{[\s\S]*?transition: opacity 200ms ease/);
  assert.match(homepageCss, /\.action-link\.primary,[\s\S]*?\.form-submit[\s\S]*?transition: background 180ms ease, box-shadow 180ms ease/);
  assert.match(homepageCss, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(homepageJs, /IntersectionObserver/);
  assert.match(homepageJs, /"data-reveal-card": true/);
  assert.match(primitivesSource, /motion\/react/);
  assert.match(primitivesSource, /useReducedMotion/);
  assert.match(primitivesSource, /export function AnimatedDashboardWidget/);
  assert.match(portalPreviewSource, /AnimatedDashboardWidget/);
  assert.match(homepageJs, /AnimatedDashboardWidget/);
  assert.match(homepageJs, /dashboard-preview-widget/);
});

test("homepage uses production school content instead of demo or coding language", () => {
  assert.doesNotMatch(homepageJs, /Why families trust us/);
  assert.doesNotMatch(homepageJs, /\["previewRoster",\s*"28"/);
  assert.doesNotMatch(homepageJs, /\["previewAverage",\s*"88%"/);
  assert.doesNotMatch(homepageJs, /\["previewAttendance",\s*"96%"/);
  assert.doesNotMatch(homepageJs, /Beta feedback|What early users are saying|fake demo|Technical transparency|HTML, CSS|JavaScript|React UI|Python backend|SQLite local|Supabase Postgres|DATABASE_URL|HTTP-only|scrypt/);
  assert.match(homepageJs, /feedbackEyebrow: "School feedback"/);
  assert.match(homepageJs, /feedbackTitle: "Feedback from the school community"/);
  assert.match(homepageJs, /Published feedback will appear here after Success Story School approves real comments/);
  assert.match(homepageJs, /howWorksTitle: "A clear path from inquiry to school account\."/);
  assert.match(homepageJs, /trustEyebrow: "Family support"/);
  assert.match(homepageJs, /trustTitle: "Helpful school information in one place\."/);
  assert.match(homepageJs, /trustBadgeStack: "Admissions inquiry"/);
  assert.match(homepageJs, /trustBadgeBackend: "Campus directions"/);
  assert.match(homepageJs, /trustBadgeHonest: "School-approved feedback"/);
  assert.match(homepageJs, /faqThreeQ: "Does the portal invent academic results\?"/);
  assert.match(homepageCss, /\.feedback-slot/);
  assert.match(homepageCss, /\.skeleton-line/);
  assert.match(homepageCss, /\.trust-badge/);
  assert.match(homepageCss, /\.faq-card/);
  assert.match(readme, /## Content Integrity/);
  assert.match(readme, /admissions inquiry, campus directions, grade information/);
});

test("homepage gallery bundles the Watermelon-inspired carousel directly", () => {
  const carouselBundle = fs.readFileSync(path.join(root, "school-carousel.js"), "utf8");
  const navigatorSource = fs.readFileSync(path.join(root, "src", "carousel", "CarouselNavigator.jsx"), "utf8");
  const carouselSource = fs.readFileSync(path.join(root, "src", "carousel", "SchoolPhotoCarousel.jsx"), "utf8");
  const gallerySource = fs.readFileSync(path.join(root, "src", "site", "components", "sections", "GallerySection.jsx"), "utf8");
  const slideSource = fs.readFileSync(path.join(root, "src", "carousel", "school-gallery-slides.js"), "utf8");
  const packageJson = fs.readFileSync(path.join(root, "package.json"), "utf8");

  assert.match(indexHtml, /<script defer src="school-app\.js\?v=20260620-react-src"><\/script>/);
  assert.doesNotMatch(indexHtml, /school-carousel\.js/);
  assert.match(packageJson, /"build:carousel": "node scripts[\\\\/]build-carousel\.mjs"/);
  assert.match(packageJson, /"motion":/);
  assert.match(packageJson, /"lucide-react":/);
  assert.match(homepageJs, /SchoolPhotoCarousel/);
  assert.match(homepageJs, /gallery-section/);
  assert.match(homepageJs, /school-gallery-slides\.js/);
  assert.match(homepageCss, /\.school-photo-carousel/);
  assert.match(homepageCss, /\.wm-carousel-nav/);
  assert.match(navigatorSource, /motion\/react/);
  assert.match(navigatorSource, /lucide-react/);
  assert.match(carouselSource, /AnimatePresence/);
  assert.match(gallerySource, /import \{ SchoolPhotoCarousel \} from "\.\.\/\.\.\/\.\.\/carousel\/SchoolPhotoCarousel\.jsx"/);
  assert.doesNotMatch(gallerySource, /window\.SuccessStoryCarousel|success-story-carousel-ready/);
  assert.match(slideSource, /gallery-campus-4k\.jpg/);
  assert.match(slideSource, /gallery-activity-4k\.jpg/);
  assert.match(slideSource, /gallery-classroom-4k\.jpg/);
  assert.match(carouselBundle, /SchoolPhotoCarousel/);
});


test("homepage source is componentized into modular React files", () => {
  const packageJson = fs.readFileSync(path.join(root, "package.json"), "utf8");
  const appSource = fs.readFileSync(path.join(root, "src", "site", "App.jsx"), "utf8");
  const headerSource = fs.readFileSync(path.join(root, "src", "site", "components", "layout", "SiteHeader.jsx"), "utf8");
  const heroSource = fs.readFileSync(path.join(root, "src", "site", "components", "sections", "HeroSection.jsx"), "utf8");
  const contactSource = fs.readFileSync(path.join(root, "src", "site", "components", "sections", "ContactSection.jsx"), "utf8");
  const hookSource = fs.readFileSync(path.join(root, "src", "site", "hooks", "useSchoolSiteState.js"), "utf8");
  const apiSource = fs.readFileSync(path.join(root, "src", "site", "services", "api.js"), "utf8");
  const dataSource = fs.readFileSync(path.join(root, "src", "site", "data", "homepage-content.js"), "utf8");
  const iconSource = fs.readFileSync(path.join(root, "src", "site", "icons", "index.jsx"), "utf8");
  const primitivesSource = fs.readFileSync(path.join(root, "src", "site", "components", "primitives.jsx"), "utf8");
  const buildSource = fs.readFileSync(path.join(root, "scripts", "build-site.mjs"), "utf8");

  assert.match(packageJson, /"build:site": "node scripts[\\/]build-site\.mjs"/);
  assert.match(packageJson, /"build": "npm run build:site && npm run build:carousel && npm run build:tailwind"/);
  assert.doesNotMatch(appSource, /AnnouncementBar/);
  assert.match(appSource, /SiteHeader/);
  assert.match(appSource, /PortalHubSection/);
  assert.match(appSource, /GallerySection/);
  assert.match(headerSource, /export function SiteHeader/);
  assert.match(heroSource, /export function HeroSection/);
  assert.match(contactSource, /export function ContactSection/);
  assert.match(hookSource, /export function useSchoolSiteState/);
  assert.match(hookSource, /IntersectionObserver/);
  assert.match(apiSource, /export function openInquiryComposer/);
  assert.match(apiSource, /buildInquiryDraft/);
  assert.match(dataSource, /export const copy =/);
  assert.match(dataSource, /export const portals =/);
  assert.match(iconSource, /export const ArrowRight =/);
  assert.match(iconSource, /export const GraduationCap =/);
  assert.match(primitivesSource, /export function AnimatedDashboardWidget/);
  assert.match(buildSource, /outfile: path\.join\(root, "school-app\.js"\)/);
  assert.match(homepageJs, /src\/site\/hooks\/useSchoolSiteState\.js/);
});
