const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = process.cwd();
const mainActivity = fs.readFileSync(
  path.join(root, "SSSAndroid", "app", "src", "main", "java", "com", "successstoryschool", "app", "MainActivity.kt"),
  "utf8"
);
const portalApi = fs.readFileSync(
  path.join(root, "SSSAndroid", "app", "src", "main", "java", "com", "successstoryschool", "app", "PortalApi.kt"),
  "utf8"
);

function functionBlock(name, nextName) {
  const start = mainActivity.indexOf(`private fun ${name}`);
  assert.notEqual(start, -1, `${name} should exist`);
  if (!nextName) {
    return mainActivity.slice(start);
  }
  const end = mainActivity.indexOf(`private fun ${nextName}`, start + 1);
  assert.notEqual(end, -1, `${nextName} should exist after ${name}`);
  return mainActivity.slice(start, end);
}

test("Android student route uses a separate screenshot-style dashboard on phone and tablet", () => {
  assert.match(mainActivity, /if \(session\.role == PortalRole\.Student\) \{\s*StudentScreenshotDashboard\(session, payload, onLogout = logoutAction\)/);
  [
    "StudentScreenshotDashboard",
    "StudentDashboardTopBar",
    "StudentMetricGrid",
    "StudentMetricTile",
    "StudentGradesPreview",
    "StudentAttendanceSummaryCard",
    "StudentAttendanceDonut",
    "StudentRecentAttendanceCard",
    "StudentHomeworkPreview",
    "StudentNoticesPreview",
    "StudentFeesPreview",
  ].forEach((name) => assert.match(mainActivity, new RegExp(`private fun ${name}\\(`)));

  assert.match(mainActivity, /private object SSSStudentColors/);
  assert.match(mainActivity, /Color\(0xFF1A2B4D\)/);
  assert.match(mainActivity, /Color\(0xFF7D2A40\)/);
  assert.match(mainActivity, /Icons\.Outlined\.Notifications/);
  assert.match(mainActivity, /Icons\.Outlined\.Menu/);
  assert.match(mainActivity, /StudentMetric\("Status"/);
  assert.match(mainActivity, /StudentMetric\("Class"/);
  assert.match(mainActivity, /StudentMetric\("Updates"/);
  assert.match(mainActivity, /StudentMetric\("Bus"/);
  assert.match(mainActivity, /val tabletMode = maxWidth >= 700\.dp/);
  assert.match(mainActivity, /StudentScreenshotContent\(payload\.data, tabletMode\)/);
  assert.match(mainActivity, /StudentMetricGrid\(metrics, columns = if \(tabletMode\) 4 else 2\)/);
  assert.match(mainActivity, /Row\(Modifier\.fillMaxWidth\(\), horizontalArrangement = Arrangement\.spacedBy\(24\.dp\)\)/);
});

test("Android student dashboard keeps the existing portal backend contract", () => {
  assert.match(mainActivity, /PortalRole\.Student -> DashboardPayload\.Student\(PortalApi\.get\("\/api\/portal"\)\)/);
  assert.match(portalApi, /BASE_URL = "https:\/\/successsstoryschool\.mooo\.com"/);

  const contentBlock = functionBlock("StudentScreenshotContent", "StudentMetricGrid");
  assert.match(contentBlock, /payload\.optJSONObject\("user"\)/);
  assert.match(contentBlock, /payload\.optJSONObject\("records"\)/);
  assert.match(contentBlock, /records\.optJSONArray\("grades"\)/);
  assert.match(contentBlock, /records\.optJSONArray\("attendance"\)/);
  assert.match(contentBlock, /records\.optJSONArray\("homework"\)/);
  assert.match(contentBlock, /records\.optJSONArray\("announcements"\)/);
  assert.match(contentBlock, /records\.optJSONArray\("fees"\)/);
  assert.doesNotMatch(contentBlock, /PortalApi\.(?:get|post)/);
  assert.doesNotMatch(contentBlock, /Omar Al-Rashidi|SSS-001/);
});

test("Android student dashboard formats live record data for the requested cards", () => {
  assert.match(mainActivity, /private data class AttendanceBreakdown/);
  assert.match(mainActivity, /private fun attendanceBreakdown\(records: JSONArray\)/);
  assert.match(mainActivity, /drawArc\(/);
  assert.match(mainActivity, /Stroke\(width = strokeWidth, cap = StrokeCap\.Butt\)/);
  assert.match(mainActivity, /private fun gradeDisplayScore\(grade: JSONObject\)/);
  assert.match(mainActivity, /private fun gradeDetail\(grade: JSONObject\)/);
  assert.match(mainActivity, /private fun formatSchoolDate\(value: String\)/);
  assert.match(mainActivity, /DateTimeFormatter\.ofPattern\("MMM dd, yyyy", Locale\.US\)/);
  assert.match(mainActivity, /private fun homeworkDueLabel\(item: JSONObject\)/);
  assert.match(mainActivity, /private fun noticeCategory\(notice: JSONObject\)/);
  assert.match(mainActivity, /private fun formatFeeAmount\(value: Double\)/);
});
