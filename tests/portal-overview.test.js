const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = process.cwd();
const html = fs.readFileSync(path.join(root, "portal.html"), "utf8");
const js = fs.readFileSync(path.join(root, "portal.js"), "utf8");
const css = fs.readFileSync(path.join(root, "portal.css"), "utf8");
const homepageJs = fs.readFileSync(path.join(root, "school-app.js"), "utf8");
const homepageCss = fs.readFileSync(path.join(root, "school-react.css"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");

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

test("student overview has premium responsive visual states", () => {
  assert.match(css, /\.overview-snapshot/);
  assert.match(css, /\.overview-quick/);
  assert.match(css, /\.metrics article\[data-state="ready"\]/);
  assert.match(css, /\.content-card\[data-state="ready"\]/);
  assert.match(css, /@media \(max-width: 700px\)/);
});

test("palette is role-based and context-aware", () => {
  const paletteCss = `${css}\n${homepageCss}`;
  assert.match(css, /--primary: #1f5a44/);
  assert.match(css, /--neutral: #f7f1e6/);
  assert.match(css, /--accent: #d59a2b/);
  assert.match(homepageCss, /--primary: #1f5a44/);
  assert.match(homepageCss, /--neutral: #f7f1e6/);
  assert.match(homepageCss, /--accent: #d59a2b/);
  assert.doesNotMatch(paletteCss, /purple|indigo|violet|plum/i);
  assert.doesNotMatch(paletteCss, /#(?:4f46e5|6366f1|7c3aed|8b5cf6|a855f7|9333ea|6c3f85)/i);
  assert.match(css, /\.module-tabs button\[data-tab="announcements"\]/);
  assert.match(css, /\.metrics article\[data-metric-card="attendance"\]/);
  assert.match(css, /\.content-card\[data-overview-card="homework"\]/);
  assert.match(css, /\.post-item\[data-kind="announcement"\]/);
  assert.match(js, /item\.dataset\.kind = "homework"/);
  assert.match(js, /item\.dataset\.kind = "announcement"/);
  assert.match(homepageCss, /linear-gradient\(90deg, var\(--primary\), var\(--accent\)\)/);
});

test("motion is bounded to CTA hover and one-shot feature-card opacity", () => {
  const motionCss = `${css}\n${homepageCss}`;
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
  assert.match(homepageJs, /trustBadgeHonest: "School-approved feedback only"/);
  assert.match(homepageJs, /faqThreeQ: "Does the portal invent academic results\?"/);
  assert.match(homepageCss, /\.feedback-slot/);
  assert.match(homepageCss, /\.skeleton-line/);
  assert.match(homepageCss, /\.trust-badge/);
  assert.match(homepageCss, /\.faq-card/);
  assert.match(readme, /## Content Integrity/);
  assert.match(readme, /protected accounts, staff-posted records/);
});
