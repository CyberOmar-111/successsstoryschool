# Success Story School Website

A new responsive landing page for Success Story School. The site includes academics,
student life, admissions steps, events, a testimonial, and an inquiry form interaction.
It also includes bilingual student, teacher, and administrator portals with
server-backed accounts, classroom rosters, grades, attendance, homework,
announcements, fees, bus information, and registration screens.

## Preview

From this folder, start the secure local portal server:

```powershell
python server.py
```

Then open `http://localhost:4173/`.

Student portal: `http://localhost:4173/portal.html`

Students enter their name and create a password. The server issues a unique student
ID such as `SSS-001`, which is required together with the password for future logins.
New accounts begin with empty academic records until school staff enter real data.

Administrator portal: `http://localhost:4173/admin.html`

The first visit creates the fixed administrator ID `ADM-1` through a one-time setup
screen. Choose a private strong password there; do not use a shared or predictable
password. Once signed in, an administrator can issue separate protected accounts
`ADM-2`, `ADM-3`, through `ADM-20` and beyond for additional staff. Administrators
can place students in fixed classroom groups such as `Grade 8 B`, add student
records, post homework or announcements once for a whole class, add or remove
students from that homeroom without deleting their accounts, and reset a student
password without viewing the previous password. A signed-in administrator can
change their own password; administrator passwords must be at least 8 characters
with a letter, number, and symbol.

Teacher portal: `http://localhost:4173/teacher.html`

Administrators issue protected `TCH-###` teacher accounts and assign each teacher
one or more classroom-and-subject teaching assignments. In the teacher portal, a
teacher chooses one of those assigned class subjects, records attendance for the
whole class, posts homework and announcements, and enters grades. Homework and
grade subjects are locked to the selected teaching assignment on the server.

Students choose their homeroom while creating an account. Available portal homerooms
are fixed to `Grade 10 A` boys, `Grade 10 B` girls, `Grade 9 A/B` boys,
`Grade 9 C` girls, `Grade 8 A/B` boys, and `Grade 8 C/D` girls.

## Portal Security

- SQLite data is stored in the private ignored path `.data/portal.db`.
- Passwords are stored as salted `scrypt` hashes, never plaintext.
- Authentication uses HTTP-only session cookies.
- Five failed login attempts lock that student, teacher, or administrator ID/device combination
  for 15 minutes.
- Student ID creation is rate-limited and assigns sequential `SSS-###` values.

For public deployment on Vercel, connect a Neon Postgres database with a
`DATABASE_URL` environment variable. The `api/index.py` Vercel Function uses the
hosted database for portal accounts and records, while local previews continue to
use the ignored SQLite database. Production session cookies are HTTPS-only.

## Files

- `index.html` - page structure and content
- `styles.css` - responsive design system and illustrations
- `script.js` - mobile navigation, scroll effects, and inquiry feedback
- `portal.html` - student registration, login, and dashboard interface
- `portal.css` - responsive portal interface
- `portal.js` - bilingual authenticated portal interface
- `admin.html` - administrator setup, login, classroom, and records interface
- `admin.css` - responsive administrator workspace styles
- `admin.js` - bilingual administrator actions and classroom publishing
- `teacher.html` - teacher sign-in and assigned-class workspace
- `teacher.css` - responsive teacher workspace styles
- `teacher.js` - bilingual teacher attendance, homework, grade, and announcement actions
- `server.py` - SQLite-backed account and protected portal API server
- `assets/success-story-logo.jpg` - supplied Success Story School reference logo
- `assets/success-story-mark.png` - icon-only logo used alongside the live wordmark
