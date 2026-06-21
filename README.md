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

## Design System Framework

The shared `design-system.css` layer provides Tailwind-style utility and
component classes without requiring a new build step. It defines a 4-point
spacing scale (`--edu-space-*`), accessible navy/teal/amber color tokens in HEX
and RGB variable form, semantic colors, and a reusable `--edu-hero-gradient`
for subtle hero depth. Typography tokens use the recommended Google-font
pairing `Fraunces` for headings and `Inter` for body text, with safe local
fallbacks when those fonts are not self-hosted. It also provides heading helpers
(`.edu-h1` through `.edu-h6`), layout helpers (`.edu-stack`, `.edu-cluster`,
`.edu-grid`), dashboard grid helpers (`.edu-dashboard-grid`,
`.edu-dashboard-sidebar`, `.edu-dashboard-cards`), button styles (`.edu-button-primary`,
`.edu-button-secondary`, `.edu-button-tertiary`), and form helpers
(`.edu-field`, `.edu-input`, `.edu-help`). All entry pages load this layer so
new UI work can use one consistent foundation across the website and portals.

Portal feature icons live in `assets/portal-icons.svg` as minimalist SVG
symbols for grades, attendance, homework, announcements, fees, bus details,
registration, class overview, dashboard overview, and logout.

## Tailwind CSS

Tailwind CSS is available as an additive utility layer for the React homepage.
The setup uses Tailwind v4's official CLI package and writes the compiled
output to `school-tailwind.css`, which is loaded by `index.html` after the
site's existing CSS. The Tailwind input file imports only `theme.css` and
`utilities.css`, omitting Preflight so Tailwind does not reset the current
school website and portal styles.

- `tailwind.config.js` keeps the requested JavaScript theme extension for the
  school colors, fonts, radius, and shadow.
- `src/site/styles/tailwind.css` defines the same school tokens using v4
  `@theme` variables and declares the source files Tailwind should scan.
- `src/site/components/examples/TailwindCard.jsx` shows a modern minimalist
  card styled with Tailwind utility classes such as `rounded-school`,
  `shadow-school`, `font-heading`, and `bg-school-teal`.

Build the Tailwind layer with:

```powershell
npm run build:tailwind
```

## UI Inspiration Translation

The student dashboard includes a Stripe-inspired interaction pass translated
into the Success Story School brand: frosted card surfaces, dense metric cards,
soft gradient depth, clear hierarchy, and subtle hover/focus lifts. The
implementation is scoped to `.student-dashboard-shell` in `portal.css` so the
teacher and administrator workspaces keep their current layouts. A matching
React/Tailwind structure is available in
`src/site/components/examples/InspiredStudentDashboardCards.jsx` for a future
React portal migration.

## Motion System

Animation is intentionally restrained. The hero renders instantly, and there
are no decorative loops, particles, bounces, or animated backgrounds. Motion is
limited to purposeful interface feedback:

- Buttons and navigation links use a subtle hover/focus lift with a slight
  scale-up, color change, and shadow transition through `design-system.css`.
- One-time feature-card opacity reveals on scroll, lasting 200ms with a 100ms
  stagger and no transform movement.
- Homepage dashboard widgets use the shared `AnimatedDashboardWidget` React
  primitive powered by `motion/react` for a fade-in and slide-up entrance.

Reduced-motion users receive the card and dashboard content instantly, and
hover transforms are disabled.

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
- Public administrator setup requires `ADMIN_SETUP_SECRET` in addition to the
  administrator password, so an empty database cannot be claimed publicly.
- POST endpoints require JSON object bodies and validate server-side before
  business logic runs.
- Full student reset requires the signed-in administrator to re-enter their
  current password.
- All responses include HSTS with a 1-year max age, subdomains, and preload,
  plus a strict Content Security Policy that keeps scripts and images on
  `self`.
- Optional SMS MFA is available through Twilio Verify. When enabled, a correct
  password creates a short-lived MFA challenge instead of a session; the session
  cookie is issued only after Twilio approves the 6-digit SMS code.
- User-facing navigation uses clean routes: `/student`, `/teacher`, and `/office-access`.

Local development uses SQLite by default. For public deployment on Render, connect
Supabase Postgres by adding a `DATABASE_URL` environment variable. Use the
Supabase pooler connection string with SSL enabled, for example:

```text
DATABASE_URL=postgresql://postgres.PROJECT_REF:PASSWORD@POOLER_HOST:5432/postgres?sslmode=require
ADMIN_SETUP_SECRET=choose-a-long-private-one-time-secret
HOST=0.0.0.0
```

Render also needs to build the React/Vite homepage bundle before the Python
server starts. The committed `render.yaml` uses this setup:

```text
Build command: npm ci && npm run build && python -m pip install -r requirements.txt
Start command: python server.py
```

Set `SSS_REQUIRE_ADMIN_SETUP_SECRET=1` and keep `ADMIN_SETUP_SECRET` and
`DATABASE_URL` as secret environment variables in Render. The server will
create the needed Supabase tables automatically on first start. Production
session cookies become HTTPS-only when `DATABASE_URL` is set.

Administrator setup requires the private setup secret whenever the app is using
Postgres, running on Vercel, listening on a non-loopback host such as
`0.0.0.0`, or when `SSS_REQUIRE_ADMIN_SETUP_SECRET=1` is set. Local loopback
SQLite development can still run without the setup secret.

Rate limits use the direct client address by default and ignore
`X-Forwarded-For`, because that header can be spoofed when a proxy does not
overwrite it. Set `SSS_TRUST_PROXY_HEADERS=1` only when the public deployment is
behind a trusted proxy that replaces client-supplied forwarded headers.

## Twilio Verify MFA

MFA is disabled by default only for local development. On production-style
deployments, including Render, Vercel, public hosts, or any deployment using
Postgres/Neon through `DATABASE_URL`, the server enables MFA unless
`SSS_MFA_ENABLED=0` explicitly disables it. This prevents a missing environment
variable from silently falling back to password-only login. Student phone
numbers are collected on signup, normalized to Jordanian E.164 format, and
stored in the `students.phone_number` column. Before deploying that config,
configure Twilio Verify and add these secret environment variables in Render:

```text
SSS_MFA_ENABLED=1
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_VERIFY_SERVICE_SID=VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SSS_MFA_PHONE_NUMBERS={"ADM-0001":"+962700000000","TCH-001":"+962700000001"}
```

Student signup accepts Jordanian mobile numbers such as `0791234567`,
`+962791234567`, or `00962791234567` and stores them as `+962...`.
When MFA is enabled, signup also checks the normalized number with Twilio Lookup
and rejects numbers Twilio does not mark as valid Jordanian mobile numbers. The
admin verification path repeats that lookup before it sends the approval SMS,
so older saved numbers are checked too. Twilio's basic validation confirms the
number format/country validity; deeper reachability or line-status checks
require Twilio's paid Lookup packages.

Administrator and teacher phone numbers still come from `SSS_MFA_PHONE_NUMBERS`
until staff account phone fields are added. If MFA is enabled and an account
does not have a valid phone number, the server refuses the login instead of
falling back to password-only access.

Important: once this is deployed in production with MFA enabled, student,
teacher, and administrator logins will not finish unless the Twilio credentials
are valid and each account has a valid saved or configured phone number.

The MFA flow is:

1. The user submits their ID and password to the existing login endpoint.
2. After the password matches, the server calls Twilio Verify to send an SMS
   code to the saved student number or configured staff number, then stores a
   temporary `mfa_challenges` row.
3. The server returns `mfaRequired`, `challengeId`, `expiresInSeconds`, and a
   masked `phoneHint`; no session cookie is issued yet.
4. The student portal shows an in-page verification form for the 6-digit code,
   then posts it to `/api/auth/mfa`. Teacher and admin logins post to
   `/api/teacher/mfa` and `/api/admin/mfa`.
5. Only after Twilio returns `approved` does the server create the real
   student, teacher, or administrator session cookie.

Challenges expire after 5 minutes and lock after 5 invalid verification
attempts.

When an administrator verifies a pending student into a class, the server also
sends a Twilio Verify SMS code to that student's saved phone number.

## Build Tools and Deployment

The homepage React source is bundled with Vite from local npm dependencies. The
browser no longer loads React or ReactDOM from a CDN; `src/site/index.jsx`
imports `react-dom/client`. `scripts/build-site.mjs` runs Vite with
`vite.config.mjs`, builds into `dist-site`, and copies the production bundle
back to `school-app.js` so the existing Python static server and Vercel setup
keep the same public asset path.

Use the standard npm pipeline:

```powershell
npm ci
npm run build
npm test
```

`vercel.json` runs `npm run build` during Vercel deployment. `render.yaml`
defines the matching Render web service, pins the Node and Python versions with
`.node-version` and `.python-version`, and enables Render auto-deploys on
commits.

The GitHub Actions workflow in `.github/workflows/vercel.yml` builds, checks,
and tests every pull request and push to `main`. Pushes to `main` also deploy
to Vercel. The Render service deploys from GitHub commits through
`render.yaml`. Add these repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Frontend Architecture

The public homepage is no longer maintained as a hand-edited monolith. Its source now lives in a modular React tree under `src/site/`:

- `App.jsx` composes the homepage from section components.
- `components/layout/` contains the announcement bar, header, and footer.
- `components/sections/` contains focused page sections such as hero, portals, FAQ, gallery, admissions, and contact.
- `hooks/useSchoolSiteState.js` owns language, menu, reveal-state, and inquiry form behavior.
- `services/api.js` isolates the inquiry composer logic from the JSX tree.
- `data/homepage-content.js` stores the copy and section configuration.
- `icons/index.jsx` stores the shared icon set instead of redefining icons inside the main app file.
- `scripts/build-site.mjs` invokes Vite using `vite.config.mjs` and writes the deployed `school-app.js` asset.

Rebuild the homepage bundle with:

```powershell
npm run build:site
```

Rebuild all generated frontend assets with:

```powershell
npm run build
```

Files under `src/` are source files only. The browser loads the generated
bundles (`school-app.js`, `school-carousel.js`, and `school-tailwind.css`), so
changes in `src/site` or `src/carousel` appear on the website only after the
build scripts run. Components in `src/site/components/examples` are reference
examples and do not render unless they are imported into the homepage or portal
entry point.

The photo carousel source lives in `src/carousel` and is imported directly by
the homepage gallery section, so rebuilding `school-app.js` is enough for the
carousel to appear on the website. `school-carousel.js` can still be generated
for standalone carousel work, but `index.html` does not depend on it.

## Error Handling and UX

The React homepage entry is wrapped in a global error boundary that displays a
branded fallback if a component fails to render. The Python static handler also
returns branded 404 and 500 pages for normal page requests, while API routes
continue to receive JSON errors.

The student portal shows a dashboard skeleton while `/api/portal` loads and
uses polite toast notifications for sign-in, registration, profile save,
logout, and recoverable API failures. The fetch helper tolerates non-JSON error
responses so students see clear copy instead of silent console failures.
## Quality Checks

Run these before deploying:

```powershell
npm run build
python -m py_compile server.py api/index.py
node --check portal.js
npm test
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

