const languageToggle = document.querySelector("[data-language-toggle]");
const authView = document.querySelector("[data-auth-view]");
const dashboard = document.querySelector("[data-dashboard]");
const loginForm = document.querySelector("[data-login-form]");
const loginStatus = document.querySelector("[data-login-status]");
const attendanceDate = document.querySelector("[data-attendance-date]");

const translations = {
  en: {
    pageTitle: "Success Story School | Teacher Portal",
    brandPortal: "Teacher Portal",
    studentPortal: "Student portal",
    adminPortal: "Administration",
    eyebrow: "Teacher Portal",
    title: "Teach your assigned classes securely.",
    intro: "Use your school-issued teacher ID. Assignments and grades can be entered only for the classes and subjects assigned to you.",
    attendance: "Class attendance",
    homework: "Homework",
    grades: "Grades",
    announcements: "Announcements",
    secureAccount: "Protected teacher account",
    signInTitle: "Teacher sign in",
    signInText: "Enter the teacher ID and password provided by administration.",
    teacherId: "Teacher ID",
    password: "Password",
    rateLimit: "Five failed attempts lock sign-in for 15 minutes.",
    signIn: "Sign in",
    secureBanner: "Teacher area. You can update only your assigned classes and subjects.",
    assignments: "Teaching assignments",
    workspace: "Class workspace",
    welcome: "Welcome,",
    logout: "Log out",
    chooseAssignment: "Choose an assigned class and subject.",
    assignedSubject: "Assigned subject:",
    attendanceDate: "Attendance date",
    attendanceSheet: "Class attendance sheet",
    attendanceNote: "Mark every student before saving the day's attendance.",
    student: "Student",
    status: "Status",
    noStudents: "There are no students in this class.",
    saveAttendance: "Save attendance",
    postHomework: "Post homework",
    subject: "Subject",
    details: "Details",
    dueDate: "Due date",
    publish: "Publish to class",
    addGrades: "Add grades",
    termOne: "Term 1",
    termTwo: "Term 2",
    saveGrade: "Save grade",
    postAnnouncement: "Post announcement",
    announcementTitle: "Title",
    recentPosts: "Recent posts for this assignment",
    noAssignments: "No teaching assignments have been assigned to this account.",
    noPosts: "No posts have been published yet.",
    present: "Present",
    absent: "Absent",
    late: "Late",
    saved: "Saved.",
    invalidLogin: "Teacher ID or password is incorrect.",
    loginLocked: "Too many attempts. Sign-in is locked for 15 minutes.",
    invalidRecord: "Check the information entered and try again.",
    assignmentRequired: "This class and subject is not assigned to your account.",
    genericError: "Something went wrong. Please try again.",
    homeworkPost: "Homework",
    announcementPost: "Announcement",
    class10ABoys: "Grade 10 A - Boys",
    class10BGirls: "Grade 10 B - Girls",
    class9ABoys: "Grade 9 A - Boys",
    class9BBoys: "Grade 9 B - Boys",
    class9CGirls: "Grade 9 C - Girls",
    class8ABoys: "Grade 8 A - Boys",
    class8BBoys: "Grade 8 B - Boys",
    class8CGirls: "Grade 8 C - Girls",
    class8DGirls: "Grade 8 D - Girls"
  },
  ar: {
    pageTitle: "مدرسة قصة نجاح | بوابة المعلم",
    brandPortal: "بوابة المعلم",
    studentPortal: "بوابة الطالب",
    adminPortal: "الإدارة",
    eyebrow: "بوابة المعلم",
    title: "درّس الشعب المعيّنة لك بأمان.",
    intro: "استخدم رقم المعلم الصادر عن المدرسة. يمكنك إدخال الواجبات والعلامات فقط للشعب والمواد المعيّنة لك.",
    attendance: "حضور الصف",
    homework: "الواجبات",
    grades: "العلامات",
    announcements: "الإعلانات",
    secureAccount: "حساب معلم محمي",
    signInTitle: "دخول المعلم",
    signInText: "أدخل رقم المعلم وكلمة المرور اللذين زودتك بهما الإدارة.",
    teacherId: "رقم المعلم",
    password: "كلمة المرور",
    rateLimit: "بعد خمس محاولات خاطئة يتوقف الدخول لمدة 15 دقيقة.",
    signIn: "تسجيل الدخول",
    secureBanner: "منطقة المعلم. يمكنك تحديث الشعب والمواد المعيّنة لك فقط.",
    assignments: "تعيينات التدريس",
    workspace: "مساحة الصف",
    welcome: "مرحباً،",
    logout: "تسجيل الخروج",
    chooseAssignment: "اختر الشعبة والمادة المعيّنة لك.",
    assignedSubject: "المادة المعيّنة:",
    attendanceDate: "تاريخ الحضور",
    attendanceSheet: "كشف حضور الصف",
    attendanceNote: "حدد حالة كل طالب قبل حفظ حضور اليوم.",
    student: "الطالب",
    status: "الحالة",
    noStudents: "لا يوجد طلاب في هذه الشعبة.",
    saveAttendance: "حفظ الحضور",
    postHomework: "نشر واجب",
    subject: "المادة",
    details: "التفاصيل",
    dueDate: "تاريخ التسليم",
    publish: "نشر للصف",
    addGrades: "إضافة علامات",
    termOne: "الفصل الأول",
    termTwo: "الفصل الثاني",
    saveGrade: "حفظ العلامة",
    postAnnouncement: "نشر إعلان",
    announcementTitle: "العنوان",
    recentPosts: "المنشورات الأخيرة لهذا التعيين",
    noAssignments: "لم يتم تعيين شعب ومواد لهذا الحساب بعد.",
    noPosts: "لم يتم نشر أي محتوى بعد.",
    present: "حاضر",
    absent: "غائب",
    late: "متأخر",
    saved: "تم الحفظ.",
    invalidLogin: "رقم المعلم أو كلمة المرور غير صحيحة.",
    loginLocked: "محاولات كثيرة. توقف الدخول لمدة 15 دقيقة.",
    invalidRecord: "تحقق من المعلومات المدخلة وحاول مرة أخرى.",
    assignmentRequired: "هذه الشعبة والمادة غير معيّنة لحسابك.",
    genericError: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    homeworkPost: "واجب",
    announcementPost: "إعلان",
    class10ABoys: "الصف العاشر أ - بنين",
    class10BGirls: "الصف العاشر ب - بنات",
    class9ABoys: "الصف التاسع أ - بنين",
    class9BBoys: "الصف التاسع ب - بنين",
    class9CGirls: "الصف التاسع ج - بنات",
    class8ABoys: "الصف الثامن أ - بنين",
    class8BBoys: "الصف الثامن ب - بنين",
    class8CGirls: "الصف الثامن ج - بنات",
    class8DGirls: "الصف الثامن د - بنات"
  }
};

let language = "en";
let teacher = null;
let assignments = [];
let selectedAssignmentId = null;
let classroom = null;

const text = (key) => translations[language][key] || translations.en[key] || key;

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  const body = await response.json();
  if (!response.ok) {
    const error = new Error(body.error || "Request failed.");
    error.code = body.code;
    throw error;
  }
  return body;
}

function errorText(error) {
  const messages = {
    invalid_login: "invalidLogin",
    login_locked: "loginLocked",
    invalid_record: "invalidRecord",
    invalid_date: "invalidRecord",
    assignment_required: "assignmentRequired"
  };
  return text(messages[error.code] || "genericError");
}

function className(value) {
  const key = `class${value.grade}${value.section}${value.group === "girls" ? "Girls" : "Boys"}`;
  return text(key);
}

function localDate() {
  const now = new Date();
  const offsetDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

function clearStatuses() {
  document.querySelectorAll(".form-status").forEach((status) => {
    status.textContent = "";
  });
}

function applyLanguage(nextLanguage) {
  language = nextLanguage === "ar" ? "ar" : "en";
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.title = text("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = text(element.dataset.i18n);
  });
  languageToggle.textContent = language === "ar" ? "English" : "العربية";
  renderAssignments();
  if (classroom) {
    renderClassroom();
  }
  try {
    localStorage.setItem("sss-language", language);
  } catch {
    // The current view can still be translated when storage is unavailable.
  }
}

function displayDashboard() {
  authView.hidden = true;
  dashboard.hidden = false;
  document.querySelector("[data-teacher-name]").textContent = teacher.name;
  document.querySelector("[data-teacher-id]").textContent = teacher.teacherId;
  document.querySelector("[data-welcome-name]").textContent = teacher.name;
}

function renderAssignments() {
  const list = document.querySelector("[data-assignment-list]");
  list.replaceChildren();
  if (!assignments.length) {
    const empty = document.createElement("p");
    empty.textContent = text("noAssignments");
    list.appendChild(empty);
    return;
  }
  assignments.forEach((assignment) => {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.toggle("active", assignment.id === selectedAssignmentId);
    const name = document.createElement("strong");
    const subject = document.createElement("small");
    name.textContent = className(assignment.class);
    subject.textContent = assignment.subject;
    button.append(name, subject);
    button.addEventListener("click", () => loadClassroom(assignment.id));
    list.appendChild(button);
  });
}

function statusSelect(student) {
  const select = document.createElement("select");
  select.dataset.studentId = student.studentId;
  ["present", "absent", "late"].forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = text(status);
    select.appendChild(option);
  });
  select.value = student.attendanceStatus;
  return select;
}

function addPost(container, heading, details) {
  const article = document.createElement("article");
  const title = document.createElement("strong");
  const content = document.createElement("p");
  title.textContent = heading;
  content.textContent = details;
  article.append(title, content);
  container.appendChild(article);
}

function renderClassroom() {
  if (!classroom) {
    return;
  }
  const assignment = classroom.assignment;
  document.querySelector("[data-select-assignment]").hidden = true;
  document.querySelector("[data-classroom]").hidden = false;
  document.querySelector("[data-class-title]").textContent = className(assignment.class);
  document.querySelector("[data-class-subject]").textContent = assignment.subject;
  document.querySelector("[data-homework-subject]").textContent = assignment.subject;
  document.querySelector("[data-grade-subject]").textContent = assignment.subject;

  const body = document.querySelector("[data-attendance-body]");
  const empty = document.querySelector("[data-no-students]");
  body.replaceChildren();
  classroom.students.forEach((student) => {
    const row = document.createElement("tr");
    const name = document.createElement("td");
    const status = document.createElement("td");
    name.textContent = `${student.name} (${student.studentId})`;
    status.appendChild(statusSelect(student));
    row.append(name, status);
    body.appendChild(row);
  });
  empty.hidden = Boolean(classroom.students.length);
  document.querySelector("[data-attendance-form] button[type=submit]").disabled = !classroom.students.length;

  const choices = document.querySelector("[data-grade-form] select[name=studentId]");
  choices.replaceChildren();
  classroom.students.forEach((student) => {
    const option = document.createElement("option");
    option.value = student.studentId;
    option.textContent = `${student.name} (${student.studentId})`;
    choices.appendChild(option);
  });
  document.querySelector("[data-grade-form] button[type=submit]").disabled = !classroom.students.length;

  const posts = document.querySelector("[data-recent-posts]");
  posts.replaceChildren();
  classroom.homework.forEach((entry) => {
    const date = entry.due_date ? ` - ${entry.due_date}` : "";
    addPost(posts, `${text("homeworkPost")}: ${entry.subject}`, `${entry.details}${date}`);
  });
  classroom.announcements.forEach((entry) => {
    addPost(posts, `${text("announcementPost")}: ${entry.title}`, entry.details);
  });
  if (!posts.childNodes.length) {
    posts.textContent = text("noPosts");
  }
  renderAssignments();
}

async function loadAssignments() {
  const result = await api("/api/teacher/assignments");
  assignments = result.assignments;
  renderAssignments();
  if (assignments.length) {
    await loadClassroom(assignments[0].id);
  }
}

async function loadClassroom(assignmentId) {
  selectedAssignmentId = assignmentId;
  const date = attendanceDate.value || localDate();
  attendanceDate.value = date;
  classroom = await api(`/api/teacher/class?assignmentId=${encodeURIComponent(assignmentId)}&schoolDate=${encodeURIComponent(date)}`);
  clearStatuses();
  renderClassroom();
}

async function openDashboard() {
  displayDashboard();
  attendanceDate.value = localDate();
  await loadAssignments();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginStatus.textContent = "";
  const values = new FormData(loginForm);
  try {
    const result = await api("/api/teacher/login", {
      method: "POST",
      body: JSON.stringify({ teacherId: values.get("teacherId"), password: values.get("password") })
    });
    teacher = result.teacher;
    loginForm.reset();
    await openDashboard();
  } catch (error) {
    loginStatus.textContent = errorText(error);
  }
});

attendanceDate.addEventListener("change", async () => {
  if (selectedAssignmentId) {
    try {
      await loadClassroom(selectedAssignmentId);
    } catch (error) {
      document.querySelector("[data-attendance-status]").textContent = errorText(error);
    }
  }
});

document.querySelector("[data-attendance-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = document.querySelector("[data-attendance-status]");
  const records = Array.from(document.querySelectorAll("[data-attendance-body] select")).map((select) => ({
    studentId: select.dataset.studentId,
    status: select.value
  }));
  try {
    await api("/api/teacher/attendance", {
      method: "POST",
      body: JSON.stringify({ assignmentId: selectedAssignmentId, schoolDate: attendanceDate.value, records })
    });
    status.textContent = text("saved");
    await loadClassroom(selectedAssignmentId);
    document.querySelector("[data-attendance-status]").textContent = text("saved");
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-homework-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("[data-homework-status]");
  const values = new FormData(form);
  try {
    await api("/api/teacher/homework", {
      method: "POST",
      body: JSON.stringify({
        assignmentId: selectedAssignmentId,
        details: values.get("details"),
        dueDate: values.get("dueDate")
      })
    });
    form.reset();
    await loadClassroom(selectedAssignmentId);
    document.querySelector("[data-homework-status]").textContent = text("saved");
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-grade-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("[data-grade-status]");
  const values = new FormData(form);
  try {
    await api("/api/teacher/grades", {
      method: "POST",
      body: JSON.stringify({
        assignmentId: selectedAssignmentId,
        studentId: values.get("studentId"),
        termOne: values.get("termOne"),
        termTwo: values.get("termTwo")
      })
    });
    form.elements.termOne.value = "";
    form.elements.termTwo.value = "";
    status.textContent = text("saved");
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-announcement-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("[data-announcement-status]");
  const values = new FormData(form);
  try {
    await api("/api/teacher/announcement", {
      method: "POST",
      body: JSON.stringify({
        assignmentId: selectedAssignmentId,
        title: values.get("title"),
        details: values.get("details")
      })
    });
    form.reset();
    await loadClassroom(selectedAssignmentId);
    document.querySelector("[data-announcement-status]").textContent = text("saved");
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-logout]").addEventListener("click", async () => {
  await api("/api/teacher/logout", { method: "POST", body: "{}" });
  teacher = null;
  assignments = [];
  selectedAssignmentId = null;
  classroom = null;
  dashboard.hidden = true;
  authView.hidden = false;
  clearStatuses();
});

languageToggle.addEventListener("click", () => applyLanguage(language === "en" ? "ar" : "en"));

try {
  language = localStorage.getItem("sss-language") === "ar" ? "ar" : "en";
} catch {
  language = "en";
}
applyLanguage(language);

api("/api/teacher/session")
  .then(async (session) => {
    if (session.authenticated) {
      teacher = session.teacher;
      await openDashboard();
    }
  })
  .catch(() => {
    loginStatus.textContent = text("genericError");
  });
