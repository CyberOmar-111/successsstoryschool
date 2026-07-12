const languageToggle = document.querySelector("[data-language-toggle]");
const authView = document.querySelector("[data-auth-view]");
const dashboard = document.querySelector("[data-dashboard]");
const loginForm = document.querySelector("[data-login-form]");
const loginStatus = document.querySelector("[data-login-status]");
const attendanceDate = document.querySelector("[data-attendance-date]");

const translations = {
  en: {
    pageTitle: "Success Story School | Teacher Account",
    brandPortal: "Teacher Account",
    studentPortal: "Student Account",
    backWebsite: "Back to website",
    eyebrow: "Teacher Account",
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
    working: "Working...",
    secureBanner: "Teacher area. You can update only your assigned classes and subjects.",
    assignments: "Teaching assignments",
    workspace: "Class workspace",
    welcome: "Welcome,",
    logout: "Log out",
    teachingLoad: "Teaching load",
    currentClass: "Current class",
    classSize: "Class size",
    selectedSubject: "Selected subject",
    noneSelected: "None selected",
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
    teacherGradebook: "Teacher Gradebook",
    gradebookNote: "Edit student grades in the table, then save all changes together.",
    termOne: "Term 1",
    termTwo: "Term 2",
    saveGrade: "Save grade",
    saveGradeChanges: "Save changes",
    noGradeChanges: "No grade changes to save.",
    postAnnouncement: "Post announcement",
    announcementTitle: "Title",
    attachments: "Attachments",
    attachFiles: "Attach PDF, Word, Excel, or image",
    removeAttachment: "Remove",
    attachmentTooLarge: "Each attachment must be 5 MB or smaller.",
    attachmentInvalid: "Use PDF, Word, Excel, JPG, or PNG files only.",
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
    pageTitle: "مدرسة قصة نجاح | حساب المعلم",
    brandPortal: "حساب المعلم",
    studentPortal: "حساب الطالب",
    backWebsite: "Back to website",
    eyebrow: "حساب المعلم",
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
    working: "جاري التنفيذ...",
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
    teacherGradebook: "دفتر علامات المعلم",
    gradebookNote: "عدّل علامات الطلاب في الجدول ثم احفظ كل التغييرات معاً.",
    termOne: "الفصل الأول",
    termTwo: "الفصل الثاني",
    saveGrade: "حفظ العلامة",
    saveGradeChanges: "حفظ التغييرات",
    noGradeChanges: "لا توجد تغييرات في العلامات للحفظ.",
    postAnnouncement: "نشر إعلان",
    announcementTitle: "العنوان",
    attachments: "المرفقات",
    attachFiles: "أرفق PDF أو Word أو Excel أو صورة",
    removeAttachment: "حذف",
    attachmentTooLarge: "يجب ألا يتجاوز حجم كل مرفق 5 ميجابايت.",
    attachmentInvalid: "استخدم ملفات PDF أو Word أو Excel أو JPG أو PNG فقط.",
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
let homeworkAttachments = [];
let announcementAttachments = [];

const allowedAttachmentExtensions = new Set(["pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png"]);
const maxAttachmentBytes = 5 * 1024 * 1024;

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
    invalid_attachment: "attachmentInvalid",
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

function attachmentState(kind) {
  return kind === "announcement" ? announcementAttachments : homeworkAttachments;
}

function setAttachmentState(kind, files) {
  if (kind === "announcement") {
    announcementAttachments = files;
  } else {
    homeworkAttachments = files;
  }
}

function attachmentListElement(kind) {
  return document.querySelector(kind === "announcement" ? "[data-announcement-attachment-list]" : "[data-homework-attachment-list]");
}

function attachmentInputElement(kind) {
  return document.querySelector(kind === "announcement" ? "[data-announcement-attachments]" : "[data-homework-attachments]");
}

function validateAttachment(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  if (!allowedAttachmentExtensions.has(extension)) {
    return "attachmentInvalid";
  }
  if (file.size > maxAttachmentBytes) {
    return "attachmentTooLarge";
  }
  return "";
}

function readAttachmentFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
        data: String(reader.result || "")
      });
    };
    reader.onerror = () => reject(reader.error || new Error("File read failed."));
    reader.readAsDataURL(file);
  });
}

function renderAttachmentPicker(kind) {
  const list = attachmentListElement(kind);
  if (!list) {
    return;
  }
  list.replaceChildren();
  attachmentState(kind).forEach((file, index) => {
    const row = document.createElement("span");
    const name = document.createElement("strong");
    const remove = document.createElement("button");
    name.textContent = file.name;
    remove.type = "button";
    remove.textContent = text("removeAttachment");
    remove.addEventListener("click", () => {
      const next = attachmentState(kind).filter((_, itemIndex) => itemIndex !== index);
      setAttachmentState(kind, next);
      renderAttachmentPicker(kind);
    });
    row.append(name, remove);
    list.appendChild(row);
  });
}

function resetAttachmentPicker(kind) {
  setAttachmentState(kind, []);
  const input = attachmentInputElement(kind);
  if (input) {
    input.value = "";
  }
  renderAttachmentPicker(kind);
}

async function handleAttachmentInput(kind, statusSelector) {
  const input = attachmentInputElement(kind);
  const status = document.querySelector(statusSelector);
  if (!input) {
    return;
  }
  const selected = Array.from(input.files || []).slice(0, 5);
  const invalidKey = selected.map(validateAttachment).find(Boolean);
  if (invalidKey) {
    input.value = "";
    status.textContent = text(invalidKey);
    return;
  }
  try {
    const files = await Promise.all(selected.map(readAttachmentFile));
    setAttachmentState(kind, files);
    status.textContent = "";
    renderAttachmentPicker(kind);
  } catch {
    status.textContent = text("genericError");
  }
}

function setButtonBusy(button, isBusy) {
  if (!button) {
    return;
  }
  if (isBusy) {
    button.dataset.originalHtml = button.innerHTML;
    button.dataset.wasDisabled = button.disabled ? "true" : "false";
    button.textContent = text("working");
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    return;
  }
  if (button.dataset.originalHtml) {
    button.innerHTML = button.dataset.originalHtml;
  }
  button.disabled = button.dataset.wasDisabled === "true";
  button.removeAttribute("aria-busy");
  delete button.dataset.originalHtml;
  delete button.dataset.wasDisabled;
}

async function withButtonFeedback(button, action) {
  setButtonBusy(button, true);
  try {
    return await action();
  } finally {
    setButtonBusy(button, false);
  }
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
  renderAttachmentPicker("homework");
  renderAttachmentPicker("announcement");
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
  updateTeacherSummary();
}

function setTeacherSummary(selector, value) {
  const element = document.querySelector(selector);
  if (!element) {
    return;
  }
  element.removeAttribute("data-i18n");
  element.textContent = value;
}

function updateTeacherSummary() {
  setTeacherSummary("[data-teacher-assignment-count]", assignments.length);
  if (!classroom) {
    setTeacherSummary("[data-teacher-current-class]", text("noneSelected"));
    setTeacherSummary("[data-teacher-class-size]", 0);
    setTeacherSummary("[data-teacher-current-subject]", text("noneSelected"));
    return;
  }
  setTeacherSummary("[data-teacher-current-class]", className(classroom.assignment.class));
  setTeacherSummary("[data-teacher-class-size]", classroom.students.length);
  setTeacherSummary("[data-teacher-current-subject]", classroom.assignment.subject);
}

function renderAssignments() {
  const list = document.querySelector("[data-assignment-list]");
  list.replaceChildren();
  updateTeacherSummary();
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
    button.addEventListener("click", () => withButtonFeedback(button, () => loadClassroom(assignment.id)));
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

function gradebookInput(student, termKey) {
  const input = document.createElement("input");
  const value = student.subjectGrade?.[termKey] ?? "";
  input.type = "number";
  input.min = "0";
  input.max = "100";
  input.step = "0.01";
  input.inputMode = "decimal";
  input.value = value === null ? "" : value;
  input.dataset.studentId = student.studentId;
  input.dataset.term = termKey;
  input.dataset.original = input.value;
  input.setAttribute("aria-label", `${student.name} ${text(termKey === "termOne" ? "termOne" : "termTwo")}`);
  return input;
}

function renderGradebook() {
  const body = document.querySelector("[data-gradebook-body]");
  const empty = document.querySelector("[data-gradebook-empty]");
  body.replaceChildren();
  classroom.students.forEach((student) => {
    const row = document.createElement("tr");
    row.dataset.gradebookRow = "";
    row.dataset.studentId = student.studentId;

    const studentCell = document.createElement("td");
    const studentName = document.createElement("strong");
    const studentId = document.createElement("small");
    studentName.textContent = student.name;
    studentId.textContent = student.studentId;
    studentCell.append(studentName, studentId);

    const termOne = document.createElement("td");
    const termTwo = document.createElement("td");
    termOne.appendChild(gradebookInput(student, "termOne"));
    termTwo.appendChild(gradebookInput(student, "termTwo"));
    row.append(studentCell, termOne, termTwo);
    body.appendChild(row);
  });
  empty.hidden = Boolean(classroom.students.length);
  document.querySelector("[data-grade-form] button[type=submit]").disabled = !classroom.students.length;
}

function appendPostAttachments(article, attachments = []) {
  if (!Array.isArray(attachments) || !attachments.length) {
    return;
  }
  const list = document.createElement("div");
  list.className = "post-attachments";
  attachments.forEach((file) => {
    const link = document.createElement("a");
    link.href = file.data || "#";
    link.download = file.name || "attachment";
    link.textContent = file.name || "Attachment";
    link.rel = "noopener";
    list.appendChild(link);
  });
  article.appendChild(list);
}

function addPost(container, heading, details, attachments = []) {
  const article = document.createElement("article");
  const title = document.createElement("strong");
  const content = document.createElement("p");
  title.textContent = heading;
  content.textContent = details;
  article.append(title, content);
  appendPostAttachments(article, attachments);
  container.appendChild(article);
}

function renderClassroom() {
  if (!classroom) {
    updateTeacherSummary();
    return;
  }
  const assignment = classroom.assignment;
  updateTeacherSummary();
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

  renderGradebook();

  const posts = document.querySelector("[data-recent-posts]");
  posts.replaceChildren();
  classroom.homework.forEach((entry) => {
    const date = entry.due_date ? ` - ${entry.due_date}` : "";
    addPost(posts, `${text("homeworkPost")}: ${entry.subject}`, `${entry.details}${date}`, entry.attachments);
  });
  classroom.announcements.forEach((entry) => {
    addPost(posts, `${text("announcementPost")}: ${entry.title}`, entry.details, entry.attachments);
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
  const submitButton = loginForm.querySelector("[type=submit]");
  try {
    const result = await withButtonFeedback(submitButton, () => api("/api/teacher/login", {
      method: "POST",
      body: JSON.stringify({ teacherId: values.get("teacherId"), password: values.get("password") })
    }));
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
  const submitButton = event.currentTarget.querySelector("[type=submit]");
  try {
    await withButtonFeedback(submitButton, () => api("/api/teacher/attendance", {
      method: "POST",
      body: JSON.stringify({ assignmentId: selectedAssignmentId, schoolDate: attendanceDate.value, records })
    }));
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
  const submitButton = form.querySelector("[type=submit]");
  try {
    await withButtonFeedback(submitButton, () => api("/api/teacher/homework", {
      method: "POST",
      body: JSON.stringify({
        assignmentId: selectedAssignmentId,
        details: values.get("details"),
        dueDate: values.get("dueDate"),
        attachments: homeworkAttachments
      })
    }));
    form.reset();
    resetAttachmentPicker("homework");
    await loadClassroom(selectedAssignmentId);
    document.querySelector("[data-homework-status]").textContent = text("saved");
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-grade-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = document.querySelector("[data-grade-status]");
  const grades = Array.from(document.querySelectorAll("[data-gradebook-row]")).map((row) => {
    const termOne = row.querySelector('[data-term="termOne"]');
    const termTwo = row.querySelector('[data-term="termTwo"]');
    const changed = termOne.value !== termOne.dataset.original || termTwo.value !== termTwo.dataset.original;
    return changed ? {
      studentId: row.dataset.studentId,
      termOne: termOne.value,
      termTwo: termTwo.value
    } : null;
  }).filter(Boolean);
  if (!grades.length) {
    status.textContent = text("noGradeChanges");
    return;
  }
  const submitButton = event.currentTarget.querySelector("[type=submit]");
  try {
    await withButtonFeedback(submitButton, () => api("/api/teacher/grades", {
      method: "POST",
      body: JSON.stringify({
        assignmentId: selectedAssignmentId,
        grades
      })
    }));
    await loadClassroom(selectedAssignmentId);
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
  const submitButton = form.querySelector("[type=submit]");
  try {
    await withButtonFeedback(submitButton, () => api("/api/teacher/announcement", {
      method: "POST",
      body: JSON.stringify({
        assignmentId: selectedAssignmentId,
        title: values.get("title"),
        details: values.get("details"),
        attachments: announcementAttachments
      })
    }));
    form.reset();
    resetAttachmentPicker("announcement");
    await loadClassroom(selectedAssignmentId);
    document.querySelector("[data-announcement-status]").textContent = text("saved");
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-homework-attachments]").addEventListener("change", () => {
  handleAttachmentInput("homework", "[data-homework-status]");
});

document.querySelector("[data-announcement-attachments]").addEventListener("change", () => {
  handleAttachmentInput("announcement", "[data-announcement-status]");
});

document.querySelector("[data-logout]").addEventListener("click", async () => {
  const button = document.querySelector("[data-logout]");
  await withButtonFeedback(button, () => api("/api/teacher/logout", { method: "POST", body: "{}" }));
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
