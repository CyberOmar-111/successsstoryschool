# Success Story School Website

A new responsive landing page for Success Story School. The site includes academics,
student life, admissions steps, school-approved feedback slots, a school system story,
family support points, FAQ content, and an inquiry form interaction.
It also includes bilingual student, teacher, and administrator portals with
server-backed accounts, classroom rosters, grades, attendance, homework,
announcements, fees, bus information, and registration screens.

## Local Run

From this folder, start the secure local portal server:

```powershell
python server.py
```

Then open `http://localhost:4173/`.

Student account: `http://localhost:4173/student`

Students enter their name, request a homeroom, and create a password. The server
issues a unique student ID such as `SSS-001`, which is required together with the
password for future logins. New public registrations stay pending until school
staff verify the account; pending accounts cannot sign in and receive a
"Waiting for admin permission" message.

Staff administration account: `http://localhost:4173/office-access`

The first setup screen requires a private administrator ID, a strong password,
and, in production, the `ADMIN_SETUP_SECRET` environment variable. Do not use a
shared, default, or predictable administrator ID. Once signed in, an
administrator can issue separate protected accounts for additional staff,
verify or decline pending student accounts into fixed classroom groups such as
`Grade 8 B`, add student records, post homework or announcements once for a
whole class, remove students from live class access without deleting their
accounts, and reset a student password without viewing the previous password. A
signed-in administrator can change their own password; administrator passwords
must be at least 8 characters with a letter, number, and symbol.

Teacher account: `http://localhost:4173/teacher`

Administrators issue protected `TCH-###` teacher accounts and assign each teacher
one or more classroom-and-subject teaching assignments. In the teacher portal, a
teacher chooses one of those assigned class subjects, records attendance for the
whole class, posts homework and announcements, and enters grades. Homework and
grade subjects are locked to the selected teaching assignment on the server.

Students request their homeroom while creating an account. Available account
requests are fixed to `Grade 10 A` boys, `Grade 10 B` girls, `Grade 9 A/B`
boys, `Grade 9 C` girls, `Grade 8 A/B` boys, and `Grade 8 C/D` girls.

## Student Overview

The student overview is data-aware. Empty metrics show `Not posted`, but that
label disappears automatically once attendance, grades, or fees are entered.
The overview also shows the latest homework and announcement, live
counts, and lets students mark posts as read so old items leave their account
without deleting the original school record.

## Role Dashboards

Student, teacher, and administrator accounts now share a school-ready command
center pattern. Student accounts show account status, homeroom, school updates,
and transportation request status. Teacher accounts show teaching load, current
class, class size, and selected subject. Administrator accounts show live counts
for students, classes, teachers, and administrators. These summaries are driven
by the same portal data used by the record forms and lists.

## Color System

The public website and all school account pages use a premium teal-led
academic palette with no purple, indigo, or violet accents.

- Primary: `#0f766e` - confident teal for account actions, active states,
  secure panels, and school-service highlights.
- Neutral: `#f4f8f7` - calm institutional blue-white for page backgrounds,
  quiet cards, empty states, and readable surface contrast.
- Accent: `#d59a2b` - reserved for small admission and institutional emphasis,
  not for primary buttons or large section backgrounds.

Buttons use solid teal for primary action and contrast. Backgrounds use
neutral surfaces with deep slate structure and teal highlights. Headings use
deep academic navy, body text uses slate ink, and cards use neutral backgrounds
with restrained teal detailing and only small warm accents where needed.

## Motion System

Animation is intentionally restrained. The hero renders instantly, cards do not
lift or slide, and there are no decorative loops, particles, bounces, or animated
backgrounds. Motion is limited to:

- Primary CTA hover feedback through a subtle color and shadow transition.
- One-time feature-card opacity reveals on scroll, lasting 200ms with a 100ms
  stagger and no transform movement.

Reduced-motion users receive the card content instantly.

## Content Integrity

The homepage avoids fake social proof. It does not publish invented testimonials,
fake user quotes, unsupported statistics, or empty values that look like real
school results. The `School feedback` section stays empty until the school
approves real feedback, and the trust section uses school-facing signals:
admissions inquiry, campus directions, grade information, school updates, and clear
waiting states for student records.

## Portal Security

- SQLite data is stored in the private ignored path `.data/portal.db`.
- Passwords are stored as salted `scrypt` hashes, never plaintext.
- Authentication uses HTTP-only session cookies.
- Five failed login attempts lock that student, teacher, or administrator ID/device combination
  for 15 minutes.
- Student ID creation is rate-limited and assigns sequential `SSS-###` values.
- Student self-registration creates pending accounts only; students cannot sign
  in until an administrator verifies the account. Administrators can also
  decline account requests.
- Production administrator setup requires `ADMIN_SETUP_SECRET` in addition to
  the administrator password, so an empty database cannot be claimed publicly.
- User-facing navigation uses clean routes: `/student`, `/teacher`, and `/office-access`.

Local development uses SQLite by default. For public deployment on Render, connect
Supabase Postgres by adding a `DATABASE_URL` environment variable. Use the
Supabase pooler connection string with SSL enabled, for example:

```text
DATABASE_URL=postgresql://postgres.PROJECT_REF:PASSWORD@POOLER_HOST:5432/postgres?sslmode=require
ADMIN_SETUP_SECRET=choose-a-long-private-one-time-secret
HOST=0.0.0.0
```

Keep the Render build command as `pip install -r requirements.txt` and use
`python server.py` as the start command. The server will create the needed
Supabase tables automatically on first start. Production session cookies become
HTTPS-only when `DATABASE_URL` is set.

## Frontend Architecture

The public homepage is no longer maintained as a hand-edited monolith. Its source now lives in a modular React tree under `src/site/`:

- `App.jsx` composes the homepage from section components.
- `components/layout/` contains the announcement bar, header, and footer.
- `components/sections/` contains focused page sections such as hero, portals, FAQ, gallery, admissions, and contact.
- `hooks/useSchoolSiteState.js` owns language, menu, reveal-state, and inquiry form behavior.
- `services/api.js` isolates the inquiry composer logic from the JSX tree.
- `data/homepage-content.js` stores the copy and section configuration.
- `icons/index.jsx` stores the shared icon set instead of redefining icons inside the main app file.
- `scripts/build-site.mjs` bundles the modular source back into the deployed `school-app.js` asset.

Rebuild the homepage bundle with:

```powershell
npm run build:site
```
## Quality Checks

Run these before deploying:

```powershell
python -m py_compile server.py
node --check portal.js
Get-Content -Raw .\tests\portal-overview.test.js | node
```

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
- `server.py` - SQLite or Supabase Postgres-backed account and protected portal API server
- `assets/success-story-logo.jpg` - supplied Success Story School reference logo
- `assets/success-story-mark.png` - icon-only logo used alongside the live wordmark

