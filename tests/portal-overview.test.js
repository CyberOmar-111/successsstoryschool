const assert = require("node:assert/strict");
const fs = require("node:fs");
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
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
const server = fs.readFileSync(path.join(root, "server.py"), "utf8");

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
  assert.match(server, /IS_POSTGRES and \(not ADMIN_SETUP_SECRET or not hmac\.compare_digest\(setup_secret, ADMIN_SETUP_SECRET\)\)/);
  assert.match(server, /setup_secret_required/);
  assert.match(adminHtml, /name="setupSecret"/);
  assert.match(adminJs, /setupSecret: values\.get\("setupSecret"\)/);
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
  assert.match(html, /account-path/);
  assert.match(js, /data-summary-updates/);
  assert.match(js, /data-summary-transport/);
  assert.match(css, /\.overview-snapshot/);
  assert.match(css, /\.overview-quick/);
  assert.match(css, /\.command-center/);
  assert.match(css, /\.account-path/);
  assert.match(css, /\.metrics article\[data-state="ready"\]/);
  assert.match(css, /\.content-card\[data-state="ready"\]/);
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

test("motion is bounded to CTA hover and one-shot feature-card opacity", () => {
  const motionCss = `${css}\n${teacherCss}\n${adminCss}\n${homepageCss}`;
  assert.doesNotMatch(motionCss, /@keyframes/);
  assert.doesNotMatch(motionCss, /animation\s*:/);
  assert.doesNotMatch(motionCss, /scroll-behavior:\s*smooth/);
  assert.doesNotMatch(motionCss, /transition:\s*[^;]*transform/);
  assert.match(homepageCss, /\[data-reveal-card\]\s*\{[\s\S]*?transition: opacity 200ms ease/);
  assert.match(homepageCss, /\.action-link\.primary,[\s\S]*?\.form-submit[\s\S]*?transition: background 180ms ease, box-shadow 180ms ease/);
  assert.match(homepageCss, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(homepageJs, /IntersectionObserver/);
  assert.match(homepageJs, /"data-reveal-card": true/);
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

test("homepage gallery uses separate Watermelon-inspired carousel files", () => {
  const carouselBundle = fs.readFileSync(path.join(root, "school-carousel.js"), "utf8");
  const navigatorSource = fs.readFileSync(path.join(root, "src", "carousel", "CarouselNavigator.jsx"), "utf8");
  const carouselSource = fs.readFileSync(path.join(root, "src", "carousel", "SchoolPhotoCarousel.jsx"), "utf8");
  const slideSource = fs.readFileSync(path.join(root, "src", "carousel", "school-gallery-slides.js"), "utf8");
  const packageJson = fs.readFileSync(path.join(root, "package.json"), "utf8");

  assert.match(indexHtml, /<script defer src="school-carousel\.js(?:\?v=[^\"]+)?"><\/script>/);
  assert.match(packageJson, /"build:carousel": "node scripts[\\\\/]build-carousel\.mjs"/);
  assert.match(packageJson, /"motion":/);
  assert.match(packageJson, /"lucide-react":/);
  assert.match(homepageJs, /SchoolPhotoCarousel/);
  assert.match(homepageJs, /gallery-section/);
  assert.match(homepageCss, /\.school-photo-carousel/);
  assert.match(homepageCss, /\.wm-carousel-nav/);
  assert.match(navigatorSource, /motion\/react/);
  assert.match(navigatorSource, /lucide-react/);
  assert.match(carouselSource, /AnimatePresence/);
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
  const buildSource = fs.readFileSync(path.join(root, "scripts", "build-site.mjs"), "utf8");

  assert.match(packageJson, /"build:site": "node scripts[\\/]build-site\.mjs"/);
  assert.match(packageJson, /"build": "npm run build:site && npm run build:carousel"/);
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
  assert.match(buildSource, /outfile: path\.join\(root, "school-app\.js"\)/);
  assert.match(homepageJs, /src\/site\/hooks\/useSchoolSiteState\.js/);
});
