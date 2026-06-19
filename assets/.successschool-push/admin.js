const languageToggle = document.querySelector("[data-language-toggle]");
const authView = document.querySelector("[data-auth-view]");
const dashboard = document.querySelector("[data-dashboard]");
const setupForm = document.querySelector("[data-setup-form]");
const loginForm = document.querySelector("[data-login-form]");
const setupStatus = document.querySelector("[data-setup-status]");
const loginStatus = document.querySelector("[data-login-status]");

const translations = {
  en: {
    pageTitle: "Success Story School | Administration",
    brandAdmin: "Administration",
    studentPortal: "Student Account",
    teacherPortal: "Teacher Account",
    eyebrow: "School Administration",
    title: "Manage real student records and classrooms.",
    intro: "Assign students to one classroom roster, enter their records, and publish assignments or announcements once for the whole class.",
    securityTitle: "Protected records",
    securityText: "Passwords are never shown. The administrator can only replace a student's password when needed.",
    protectedAdmin: "Protected administrator account",
    setupTitle: "Set up administrator access",
    setupText: "The administrator ID is fixed. Choose a private strong password now; it will not be viewable later.",
    adminId: "Administrator ID",
    adminName: "Administrator name",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    adminPasswordRule: "Use at least 8 characters with a letter, number, and symbol.",
    createAdmin: "Create ADM-1 account",
    signInTitle: "Administrator sign in",
    signInText: "Use your issued administrator ID to access records and classroom tools.",
    password: "Password",
    rateLimit: "Five failed attempts lock sign-in for 15 minutes.",
    signIn: "Sign in",
    dashboardBanner: "Administration area. Changes here appear in student accounts.",
    welcome: "Welcome,",
    logout: "Log out",
    students: "Students",
    classes: "Classes",
    administrators: "Administrators",
    addAdministrator: "Manage administrators",
    teachers: "Teachers",
    addTeacher: "Add teacher",
    newTeacher: "Create teacher account",
    teacherText: "Choose each class and subject this teacher is permitted to teach. Homework subjects are fixed by these assignments.",
    teacherName: "Teacher name",
    teacherPasswordRule: "Use at least 8 characters with a letter, number, and symbol.",
    teachingAssignments: "Teaching assignments",
    addTeachingAssignment: "Add class and subject",
    removeAssignment: "Remove",
    createTeacher: "Create teacher account",
    issuedTeacherId: "New teacher ID",
    teacherLoginInfo: "The teacher signs in with this ID and the private password entered above.",
    newAdministrator: "Create administrator account",
    newAdminText: "A new administrator ID is issued automatically. Give the ID and password privately to that staff member.",
    createAdministrator: "Create administrator",
    issuedAdminId: "New administrator ID",
    keepAdminPassword: "This ID signs in with the private password entered above.",
    changeMyPassword: "Change my password",
    currentPassword: "Current password",
    changePassword: "Change password",
    classCreationNote: "Only the school's approved homerooms are available.",
    chooseStudent: "Choose a student or class",
    chooseStudentText: "Select a student to update records, or select a class to publish work for everyone in that classroom.",
    studentRecord: "Student record",
    noClass: "No class assigned",
    placeClass: "Place in classroom",
    approvedHomeroom: "Approved homeroom",
    chooseClass: "Choose a class",
    class10ABoys: "Grade 10 A - Boys",
    class10BGirls: "Grade 10 B - Girls",
    class9ABoys: "Grade 9 A - Boys",
    class9BBoys: "Grade 9 B - Boys",
    class9CGirls: "Grade 9 C - Girls",
    class8ABoys: "Grade 8 A - Boys",
    class8BBoys: "Grade 8 B - Boys",
    class8CGirls: "Grade 8 C - Girls",
    class8DGirls: "Grade 8 D - Girls",
    assignClass: "Assign class",
    addGrade: "Add grades",
    subject: "Subject",
    termOne: "Term 1",
    termTwo: "Term 2",
    add: "Add",
    addAttendance: "Add attendance",
    date: "Date",
    status: "Status",
    present: "Present",
    absent: "Absent",
    late: "Late",
    addFee: "Add fee record",
    item: "Item",
    amount: "Amount JOD",
    due: "Due",
    paid: "Paid",
    resetPassword: "Reset student password",
    studentPasswordRule: "At least 8 characters with a letter and number. Existing passwords cannot be viewed.",
    reset: "Reset",
    currentRecords: "Current records",
    classroom: "Classroom",
    roster: "Roster",
    chooseStudentToAdd: "Student to assign or move here",
    addToClass: "Add to class",
    removeFromClass: "Remove",
    removed: "Removed from class.",
    publishHomework: "Assignment for whole class",
    details: "Details",
    dueDate: "Due date",
    publish: "Publish to class",
    publishAnnouncement: "Announcement for whole class",
    announcementTitle: "Title",
    classPosts: "Class posts",
    emptyStudents: "No student accounts yet.",
    emptyClasses: "No classes created yet.",
    emptyTeachers: "No teacher accounts yet.",
    noRecords: "No records entered yet.",
    noPosts: "No classroom posts yet.",
    noMembers: "No students are currently in this class.",
    setupDone: "Administrator account created. Sign in with ADM-1.",
    setupAlreadyComplete: "ADM-1 already exists. Sign in below.",
    adminCreated: "Administrator account created.",
    teacherCreated: "Teacher account created.",
    passwordChanged: "Password changed. Sign in again with your new password.",
    saved: "Saved.",
    passwordsDoNotMatch: "Passwords do not match.",
    invalidLogin: "Administrator ID or password is incorrect.",
    loginLocked: "Too many attempts. Sign-in is locked for 15 minutes.",
    adminPasswordError: "Use at least 8 characters with a letter, number, and symbol.",
    nameRequired: "Enter the administrator's name.",
    teacherPasswordError: "Use at least 8 characters with a letter, number, and symbol.",
    subjectRequired: "Add at least one class and subject for the teacher.",
    invalidCurrentPassword: "Current password is incorrect.",
    invalidClass: "Choose one of the approved homerooms.",
    genericError: "Something went wrong. Please try again.",
    members: "members",
    classHomework: "Assignment",
    classAnnouncement: "Announcement",
    grades: "Grades",
    attendance: "Attendance",
    fees: "Fees"
  },
  ar: {
    teacherPortal: "حساب المعلم",
    teachers: "المعلمون",
    addTeacher: "إضافة معلم",
    newTeacher: "إنشاء حساب معلم",
    teacherText: "اختر كل شعبة ومادة يسمح لهذا المعلم بتدريسها. تكون مادة الواجب محددة حسب هذه التعيينات.",
    teacherName: "اسم المعلم",
    teacherPasswordRule: "استخدم 8 خانات على الأقل مع حرف ورقم ورمز.",
    teachingAssignments: "تعيينات التدريس",
    addTeachingAssignment: "إضافة شعبة ومادة",
    removeAssignment: "إزالة",
    createTeacher: "إنشاء حساب المعلم",
    issuedTeacherId: "رقم المعلم الجديد",
    teacherLoginInfo: "يسجل المعلم الدخول بهذا الرقم وكلمة المرور الخاصة المدخلة أعلاه.",
    emptyTeachers: "لا توجد حسابات معلمين بعد.",
    teacherCreated: "تم إنشاء حساب المعلم.",
    teacherPasswordError: "استخدم 8 خانات على الأقل مع حرف ورقم ورمز.",
    subjectRequired: "أضف شعبة ومادة واحدة على الأقل للمعلم.",
    pageTitle: "مدرسة قصة نجاح | الإدارة",
    brandAdmin: "الإدارة",
    studentPortal: "حساب الطالب",
    eyebrow: "إدارة المدرسة",
    title: "إدارة سجلات الطلاب والصفوف الفعلية.",
    intro: "ضع الطلاب في شعبة صفية واحدة، وأدخل سجلاتهم، وانشر الواجبات أو الإعلانات مرة واحدة لكل الصف.",
    securityTitle: "سجلات محمية",
    securityText: "لا تظهر كلمات المرور أبدا. يمكن للإدارة استبدال كلمة مرور الطالب عند الحاجة فقط.",
    protectedAdmin: "حساب إدارة محمي",
    setupTitle: "إعداد دخول الإدارة",
    setupText: "رقم الإدارة ثابت. اختر كلمة مرور قوية وخاصة الآن ولن يمكن عرضها لاحقا.",
    adminId: "رقم الإدارة",
    adminName: "اسم المسؤول",
    newPassword: "كلمة المرور الجديدة",
    confirmPassword: "تأكيد كلمة المرور",
    adminPasswordRule: "استخدم 8 خانات على الأقل وتحتوي على حرف ورقم ورمز.",
    createAdmin: "إنشاء حساب ADM-1",
    signInTitle: "دخول الإدارة",
    signInText: "استخدم رقم الإدارة الصادر لك للوصول إلى السجلات وأدوات الصفوف.",
    password: "كلمة المرور",
    rateLimit: "بعد خمس محاولات خاطئة يتوقف الدخول لمدة 15 دقيقة.",
    signIn: "تسجيل الدخول",
    dashboardBanner: "منطقة الإدارة. تظهر التغييرات هنا في حسابات الطلاب.",
    welcome: "مرحبا،",
    logout: "تسجيل الخروج",
    students: "الطلاب",
    classes: "الصفوف",
    administrators: "الإداريون",
    addAdministrator: "إدارة الإداريين",
    newAdministrator: "إنشاء حساب إداري",
    newAdminText: "يصدر رقم إداري جديد تلقائيا. أعط الرقم وكلمة المرور لذلك الموظف بشكل خاص.",
    createAdministrator: "إنشاء الإداري",
    issuedAdminId: "رقم الإداري الجديد",
    keepAdminPassword: "يستخدم هذا الرقم كلمة المرور الخاصة التي أدخلتها أعلاه.",
    changeMyPassword: "تغيير كلمة مروري",
    currentPassword: "كلمة المرور الحالية",
    changePassword: "تغيير كلمة المرور",
    classCreationNote: "تتاح فقط الشعب المعتمدة في المدرسة.",
    chooseStudent: "اختر طالبا أو صفا",
    chooseStudentText: "اختر طالبا لتحديث سجله أو صفا لنشر العمل لجميع الطلاب في الغرفة الصفية.",
    studentRecord: "سجل الطالب",
    noClass: "لم يحدد صف",
    placeClass: "وضع الطالب في الصف",
    approvedHomeroom: "الشعبة المعتمدة",
    chooseClass: "اختر الشعبة",
    class10ABoys: "الصف العاشر أ - بنين",
    class10BGirls: "الصف العاشر ب - بنات",
    class9ABoys: "الصف التاسع أ - بنين",
    class9BBoys: "الصف التاسع ب - بنين",
    class9CGirls: "الصف التاسع ج - بنات",
    class8ABoys: "الصف الثامن أ - بنين",
    class8BBoys: "الصف الثامن ب - بنين",
    class8CGirls: "الصف الثامن ج - بنات",
    class8DGirls: "الصف الثامن د - بنات",
    assignClass: "تعيين الصف",
    addGrade: "إضافة علامات",
    subject: "المادة",
    termOne: "الفصل الأول",
    termTwo: "الفصل الثاني",
    add: "إضافة",
    addAttendance: "إضافة حضور",
    date: "التاريخ",
    status: "الحالة",
    present: "حاضر",
    absent: "غائب",
    late: "متأخر",
    addFee: "إضافة رسوم",
    item: "البند",
    amount: "المبلغ بالدينار",
    due: "مستحق",
    paid: "مدفوع",
    resetPassword: "إعادة تعيين كلمة مرور الطالب",
    studentPasswordRule: "8 خانات على الأقل مع حرف ورقم. لا يمكن عرض كلمات المرور الحالية.",
    reset: "إعادة تعيين",
    currentRecords: "السجلات الحالية",
    classroom: "الغرفة الصفية",
    roster: "أسماء الطلاب",
    chooseStudentToAdd: "طالب لإضافته أو نقله إلى هذا الصف",
    addToClass: "إضافة إلى الصف",
    removeFromClass: "إزالة",
    removed: "تمت الإزالة من الصف.",
    publishHomework: "واجب لكل الصف",
    details: "التفاصيل",
    dueDate: "تاريخ التسليم",
    publish: "نشر للصف",
    publishAnnouncement: "إعلان لكل الصف",
    announcementTitle: "العنوان",
    classPosts: "منشورات الصف",
    emptyStudents: "لا توجد حسابات طلاب بعد.",
    emptyClasses: "لم يتم إنشاء صفوف بعد.",
    noRecords: "لا توجد سجلات مدخلة بعد.",
    noPosts: "لا توجد منشورات صفية بعد.",
    noMembers: "لا يوجد طلاب في هذا الصف حاليا.",
    setupDone: "تم إنشاء حساب الإدارة. سجل الدخول بالرقم ADM-1.",
    setupAlreadyComplete: "حساب ADM-1 موجود بالفعل. سجل الدخول أدناه.",
    adminCreated: "تم إنشاء حساب الإداري.",
    passwordChanged: "تم تغيير كلمة المرور. سجل الدخول مرة أخرى بكلمة المرور الجديدة.",
    saved: "تم الحفظ.",
    passwordsDoNotMatch: "كلمتا المرور غير متطابقتين.",
    invalidLogin: "رقم الإدارة أو كلمة المرور غير صحيحة.",
    loginLocked: "محاولات كثيرة. توقف الدخول لمدة 15 دقيقة.",
    adminPasswordError: "استخدم 8 خانات على الأقل مع حرف ورقم ورمز.",
    nameRequired: "أدخل اسم الإداري.",
    invalidCurrentPassword: "كلمة المرور الحالية غير صحيحة.",
    invalidClass: "اختر إحدى الشعب المعتمدة.",
    genericError: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    members: "طلاب",
    classHomework: "واجب",
    classAnnouncement: "إعلان",
    grades: "العلامات",
    attendance: "الحضور",
    fees: "الرسوم"
  }
};

let language = "en";
let admin = null;
let students = [];
let classes = [];
let administrators = [];
let teachers = [];
let studentDetails = null;
let classDetails = null;

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
  const errors = {
    invalid_login: "invalidLogin",
    login_locked: "loginLocked",
    admin_password_rule: "adminPasswordError",
    teacher_password_rule: "teacherPasswordError",
    assignment_required: "subjectRequired",
    invalid_class: "invalidClass",
    name_required: "nameRequired",
    invalid_current_password: "invalidCurrentPassword",
    setup_complete: "setupAlreadyComplete"
  };
  return text(errors[error.code] || "genericError");
}

function className(value) {
  if (!value) {
    return text("noClass");
  }
  const key = `class${value.grade}${value.section}${value.group === "girls" ? "Girls" : "Boys"}`;
  return text(key);
}

function applyLanguage(nextLanguage) {
  language = nextLanguage === "ar" ? "ar" : "en";
  refreshAssignmentRows();
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.title = text("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = text(element.dataset.i18n);
  });
  languageToggle.textContent = language === "ar" ? "English" : "العربية";
  renderLists();
  if (studentDetails) {
    renderStudent(studentDetails);
  }
  if (classDetails) {
    renderClass(classDetails);
  }
  try {
    localStorage.setItem("sss-language", language);
  } catch {
    // Language selection remains available for the current page.
  }
}

function setAuthMode(mode) {
  setupForm.hidden = mode !== "setup";
  loginForm.hidden = mode !== "login";
  setupStatus.textContent = "";
  loginStatus.textContent = "";
}

function displayDashboard() {
  authView.hidden = true;
  dashboard.hidden = false;
  document.querySelector("[data-admin-name]").textContent = admin.name;
  updateAdminSummary();
}

function setAdminSummary(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function updateAdminSummary() {
  setAdminSummary("[data-admin-total-students]", students.length);
  setAdminSummary("[data-admin-total-classes]", classes.length);
  setAdminSummary("[data-admin-total-teachers]", teachers.length);
  setAdminSummary("[data-admin-total-admins]", administrators.length);
}

function createListButton(primary, secondary, onClick, active) {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.toggle("active", active);
  const heading = document.createElement("strong");
  heading.textContent = primary;
  const description = document.createElement("small");
  description.textContent = secondary;
  button.append(heading, description);
  button.addEventListener("click", onClick);
  return button;
}

function renderLists() {
  updateAdminSummary();
  const studentList = document.querySelector("[data-student-list]");
  const classList = document.querySelector("[data-class-list]");
  const adminList = document.querySelector("[data-admin-list]");
  const teacherList = document.querySelector("[data-teacher-list]");
  if (!studentList || !classList || !adminList || !teacherList) {
    return;
  }
  studentList.replaceChildren();
  classList.replaceChildren();
  adminList.replaceChildren();
  teacherList.replaceChildren();
  if (!students.length) {
    studentList.textContent = text("emptyStudents");
  }
  students.forEach((student) => {
    const classroom = classes.find((group) => group.id === student.classId);
    studentList.appendChild(createListButton(
      student.name,
      `${student.studentId} - ${classroom ? className(classroom) : text("noClass")}`,
      () => loadStudent(student.studentId),
      studentDetails && studentDetails.student.studentId === student.studentId
    ));
  });
  if (!classes.length) {
    classList.textContent = text("emptyClasses");
  }
  classes.forEach((group) => {
    classList.appendChild(createListButton(
      className(group),
      `${group.memberCount} ${text("members")}`,
      () => loadClass(group.id),
      classDetails && classDetails.class.id === group.id
    ));
  });
  administrators.forEach((account) => {
    const item = document.createElement("div");
    item.className = "admin-account";
    const name = document.createElement("strong");
    const id = document.createElement("small");
    name.textContent = account.name;
    id.textContent = account.adminId;
    item.append(name, id);
    adminList.appendChild(item);
  });
  if (!teachers.length) {
    teacherList.textContent = text("emptyTeachers");
  }
  teachers.forEach((teacher) => {
    const item = document.createElement("div");
    item.className = "admin-account";
    const name = document.createElement("strong");
    const assignments = document.createElement("small");
    name.textContent = `${teacher.name} (${teacher.teacherId})`;
    assignments.textContent = teacher.assignments
      .map((assignment) => `${className(assignment.class)} / ${assignment.subject}`)
      .join(", ");
    item.append(name, assignments);
    teacherList.appendChild(item);
  });
}

function recordArticle(title, details) {
  const article = document.createElement("article");
  const heading = document.createElement("strong");
  const content = document.createElement("p");
  heading.textContent = title;
  content.textContent = details;
  article.append(heading, content);
  return article;
}

function renderStudent(result) {
  studentDetails = result;
  classDetails = null;
  document.querySelector("[data-placeholder]").hidden = true;
  document.querySelector("[data-admin-editor]").hidden = true;
  document.querySelector("[data-teacher-editor]").hidden = true;
  document.querySelector("[data-class-editor]").hidden = true;
  document.querySelector("[data-student-editor]").hidden = false;
  const student = result.student;
  document.querySelector("[data-selected-student-name]").textContent = student.name;
  document.querySelector("[data-selected-student-id]").textContent = student.studentId;
  document.querySelector("[data-selected-student-class]").textContent =
    result.class ? className(result.class) : text("noClass");
  document.querySelectorAll("[data-student-editor] input[name=studentId]").forEach((input) => {
    input.value = student.studentId;
  });
  const assignment = document.querySelector("[data-class-assignment-form]");
  assignment.elements.classCode.value = result.class
    ? `${result.class.grade}-${result.class.section}`
    : "";
  const records = document.querySelector("[data-student-records]");
  records.replaceChildren();
  result.records.grades.forEach((grade) => {
    records.appendChild(recordArticle(
      `${text("grades")}: ${grade.subject}`,
      `${text("termOne")}: ${grade.term_one ?? "--"} | ${text("termTwo")}: ${grade.term_two ?? "--"}`
    ));
  });
  result.records.attendance.forEach((entry) => {
    records.appendChild(recordArticle(text("attendance"), `${entry.school_date} - ${text(entry.status)}`));
  });
  result.records.fees.forEach((fee) => {
    records.appendChild(recordArticle(text("fees"), `${fee.label}: ${Number(fee.amount).toFixed(2)} JOD - ${text(fee.status)}`));
  });
  if (!records.childNodes.length) {
    records.textContent = text("noRecords");
  }
  renderLists();
}

function renderClass(result) {
  classDetails = result;
  studentDetails = null;
  document.querySelector("[data-placeholder]").hidden = true;
  document.querySelector("[data-admin-editor]").hidden = true;
  document.querySelector("[data-teacher-editor]").hidden = true;
  document.querySelector("[data-student-editor]").hidden = true;
  document.querySelector("[data-class-editor]").hidden = false;
  document.querySelector("[data-selected-class-name]").textContent = className(result.class);
  const memberForm = document.querySelector("[data-class-member-form]");
  memberForm.elements.classId.value = result.class.id;
  const choices = memberForm.elements.studentId;
  choices.replaceChildren();
  students.forEach((student) => {
    const option = document.createElement("option");
    option.value = student.studentId;
    const currentClass = classes.find((group) => group.id === student.classId);
    option.textContent = `${student.name} (${student.studentId}) - ${currentClass ? className(currentClass) : text("noClass")}`;
    choices.appendChild(option);
  });
  const members = document.querySelector("[data-admin-class-members]");
  members.replaceChildren();
  result.class.members.forEach((member) => {
    const row = document.createElement("div");
    row.className = "member-row";
    const item = document.createElement("span");
    item.textContent = member.name;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-member";
    remove.textContent = text("removeFromClass");
    remove.addEventListener("click", () => removeClassMember(member.studentId, result.class.id));
    row.append(item, remove);
    members.appendChild(row);
  });
  if (!result.class.members.length) {
    members.textContent = text("noMembers");
  }
  document.querySelectorAll("[data-class-record-form] input[name=classId]").forEach((input) => {
    input.value = result.class.id;
  });
  const posts = document.querySelector("[data-class-records]");
  posts.replaceChildren();
  result.homework.forEach((entry) => {
    posts.appendChild(recordArticle(`${text("classHomework")}: ${entry.subject}`, `${entry.details}${entry.due_date ? ` - ${entry.due_date}` : ""}`));
  });
  result.announcements.forEach((entry) => {
    posts.appendChild(recordArticle(`${text("classAnnouncement")}: ${entry.title}`, entry.details));
  });
  if (!posts.childNodes.length) {
    posts.textContent = text("noPosts");
  }
  renderLists();
}

async function loadLists() {
  const [studentResult, classResult, administratorResult, teacherResult] = await Promise.all([
    api("/api/admin/students"),
    api("/api/admin/classes"),
    api("/api/admin/accounts"),
    api("/api/admin/teachers")
  ]);
  students = studentResult.students;
  classes = classResult.classes;
  administrators = administratorResult.administrators;
  teachers = teacherResult.teachers;
  refreshAssignmentRows();
  renderLists();
}

async function loadStudent(studentId) {
  const result = await api(`/api/admin/student?studentId=${encodeURIComponent(studentId)}`);
  renderStudent(result);
}

async function loadClass(classId) {
  const result = await api(`/api/admin/class?classId=${encodeURIComponent(classId)}`);
  renderClass(result);
}

async function removeClassMember(studentId, classId) {
  const form = document.querySelector("[data-class-member-form]");
  const status = form.querySelector(".form-status");
  try {
    await api("/api/admin/class-removal", {
      method: "POST",
      body: JSON.stringify({ studentId, classId })
    });
    status.textContent = text("removed");
    await loadLists();
    await loadClass(classId);
  } catch (error) {
    status.textContent = errorText(error);
  }
}

async function openDashboard() {
  displayDashboard();
  await loadLists();
}

function openAdminEditor() {
  studentDetails = null;
  classDetails = null;
  document.querySelector("[data-placeholder]").hidden = true;
  document.querySelector("[data-student-editor]").hidden = true;
  document.querySelector("[data-class-editor]").hidden = true;
  document.querySelector("[data-teacher-editor]").hidden = true;
  document.querySelector("[data-admin-editor]").hidden = false;
  document.querySelector("[data-admin-account-status]").textContent = "";
  document.querySelector("[data-admin-password-status]").textContent = "";
  document.querySelector("[data-new-admin-result]").hidden = true;
  renderLists();
}

function createAssignmentRow(classCode = "", subject = "") {
  const row = document.createElement("div");
  row.className = "teacher-assignment-row";
  const classSelect = document.createElement("select");
  classSelect.name = "classCode";
  classSelect.required = true;
  const subjectInput = document.createElement("input");
  subjectInput.name = "subject";
  subjectInput.required = true;
  subjectInput.maxLength = 80;
  subjectInput.placeholder = text("subject");
  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = text("removeAssignment");
  remove.addEventListener("click", () => {
    row.remove();
    if (!document.querySelector("[data-teaching-assignments]").children.length) {
      createAssignmentRow();
    }
  });
  row.append(classSelect, subjectInput, remove);
  document.querySelector("[data-teaching-assignments]").appendChild(row);
  refreshAssignmentRows();
  classSelect.value = classCode;
  subjectInput.value = subject;
}

function refreshAssignmentRows() {
  document.querySelectorAll(".teacher-assignment-row").forEach((row) => {
    const select = row.querySelector("select");
    const previous = select.value;
    select.replaceChildren();
    classes.forEach((group) => {
      const option = document.createElement("option");
      option.value = `${group.grade}-${group.section}`;
      option.textContent = className(group);
      select.appendChild(option);
    });
    select.value = previous;
    row.querySelector("input").placeholder = text("subject");
    row.querySelector("button").textContent = text("removeAssignment");
  });
}

function openTeacherEditor() {
  studentDetails = null;
  classDetails = null;
  document.querySelector("[data-placeholder]").hidden = true;
  document.querySelector("[data-student-editor]").hidden = true;
  document.querySelector("[data-class-editor]").hidden = true;
  document.querySelector("[data-admin-editor]").hidden = true;
  document.querySelector("[data-teacher-editor]").hidden = false;
  const form = document.querySelector("[data-teacher-account-form]");
  form.reset();
  form.querySelector("[data-teaching-assignments]").replaceChildren();
  createAssignmentRow();
  document.querySelector("[data-teacher-account-status]").textContent = "";
  document.querySelector("[data-new-teacher-result]").hidden = true;
  renderLists();
}

setupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const values = new FormData(setupForm);
  const password = String(values.get("password"));
  if (password !== String(values.get("confirmPassword"))) {
    setupStatus.textContent = text("passwordsDoNotMatch");
    return;
  }
  try {
    await api("/api/admin/setup", {
      method: "POST",
      body: JSON.stringify({ name: values.get("name"), password })
    });
    setAuthMode("login");
    loginStatus.textContent = text("setupDone");
  } catch (error) {
    setupStatus.textContent = errorText(error);
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginStatus.textContent = "";
  const values = new FormData(loginForm);
  try {
    const result = await api("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ adminId: values.get("adminId"), password: values.get("password") })
    });
    admin = result.admin;
    loginForm.reset();
    loginForm.elements.adminId.value = "ADM-1";
    await openDashboard();
  } catch (error) {
    loginStatus.textContent = errorText(error);
  }
});

document.querySelector("[data-new-admin]").addEventListener("click", openAdminEditor);
document.querySelector("[data-new-teacher]").addEventListener("click", openTeacherEditor);
document.querySelector("[data-add-assignment]").addEventListener("click", () => createAssignmentRow());

document.querySelector("[data-admin-account-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("[data-admin-account-status]");
  const resultCard = document.querySelector("[data-new-admin-result]");
  const values = new FormData(form);
  const password = String(values.get("password"));
  status.textContent = "";
  resultCard.hidden = true;
  if (password !== String(values.get("confirmPassword"))) {
    status.textContent = text("passwordsDoNotMatch");
    return;
  }
  try {
    const result = await api("/api/admin/accounts", {
      method: "POST",
      body: JSON.stringify({ name: values.get("name"), password })
    });
    status.textContent = text("adminCreated");
    document.querySelector("[data-new-admin-id]").textContent = result.administrator.adminId;
    resultCard.hidden = false;
    form.elements.password.value = "";
    form.elements.confirmPassword.value = "";
    await loadLists();
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-teacher-account-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("[data-teacher-account-status]");
  const resultCard = document.querySelector("[data-new-teacher-result]");
  const values = new FormData(form);
  const password = String(values.get("password"));
  const assignments = Array.from(form.querySelectorAll(".teacher-assignment-row")).map((row) => ({
    classCode: row.querySelector("select").value,
    subject: row.querySelector("input").value.trim()
  }));
  status.textContent = "";
  resultCard.hidden = true;
  if (password !== String(values.get("confirmPassword"))) {
    status.textContent = text("passwordsDoNotMatch");
    return;
  }
  if (!assignments.length || assignments.some((assignment) => !assignment.classCode || !assignment.subject)) {
    status.textContent = text("subjectRequired");
    return;
  }
  try {
    const result = await api("/api/admin/teachers", {
      method: "POST",
      body: JSON.stringify({ name: values.get("name"), password, assignments })
    });
    status.textContent = text("teacherCreated");
    document.querySelector("[data-new-teacher-id]").textContent = result.teacher.teacherId;
    resultCard.hidden = false;
    form.elements.password.value = "";
    form.elements.confirmPassword.value = "";
    await loadLists();
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-admin-password-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const status = document.querySelector("[data-admin-password-status]");
  const newPassword = String(values.get("newPassword"));
  status.textContent = "";
  if (newPassword !== String(values.get("confirmPassword"))) {
    status.textContent = text("passwordsDoNotMatch");
    return;
  }
  try {
    await api("/api/admin/change-password", {
      method: "POST",
      body: JSON.stringify({
        currentPassword: values.get("currentPassword"),
        newPassword
      })
    });
    admin = null;
    dashboard.hidden = true;
    authView.hidden = false;
    setAuthMode("login");
    loginStatus.textContent = text("passwordChanged");
    form.reset();
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-class-assignment-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector("[data-class-assignment-status]");
  try {
    const values = Object.fromEntries(new FormData(form));
    await api("/api/admin/class-assignment", { method: "POST", body: JSON.stringify(values) });
    status.textContent = text("saved");
    await loadLists();
    await loadStudent(values.studentId);
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-class-member-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector(".form-status");
  const group = classDetails.class;
  try {
    await api("/api/admin/class-assignment", {
      method: "POST",
      body: JSON.stringify({
        studentId: form.elements.studentId.value,
        classCode: `${group.grade}-${group.section}`
      })
    });
    status.textContent = text("saved");
    await loadLists();
    await loadClass(group.id);
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelectorAll("[data-student-record-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const studentId = form.elements.studentId.value;
    const status = form.querySelector(".form-status");
    try {
      await api("/api/admin/record", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      form.reset();
      form.elements.studentId.value = studentId;
      status.textContent = text("saved");
      await loadStudent(studentId);
    } catch (error) {
      status.textContent = errorText(error);
    }
  });
});

document.querySelector("[data-password-reset-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const studentId = form.elements.studentId.value;
  const status = form.querySelector(".form-status");
  try {
    await api("/api/admin/reset-password", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    form.reset();
    form.elements.studentId.value = studentId;
    status.textContent = text("saved");
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelectorAll("[data-class-record-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const classId = form.elements.classId.value;
    const status = form.querySelector(".form-status");
    try {
      await api("/api/admin/class-record", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      form.reset();
      form.elements.classId.value = classId;
      status.textContent = text("saved");
      await loadClass(Number(classId));
    } catch (error) {
      status.textContent = errorText(error);
    }
  });
});

document.querySelector("[data-logout]").addEventListener("click", async () => {
  await api("/api/admin/logout", { method: "POST", body: "{}" });
  admin = null;
  students = [];
  classes = [];
  administrators = [];
  teachers = [];
  studentDetails = null;
  classDetails = null;
  dashboard.hidden = true;
  authView.hidden = false;
  setAuthMode("login");
});

languageToggle.addEventListener("click", () => applyLanguage(language === "en" ? "ar" : "en"));

try {
  language = localStorage.getItem("sss-language") === "ar" ? "ar" : "en";
} catch {
  language = "en";
}
applyLanguage(language);

api("/api/admin/session")
  .then(async (session) => {
    if (session.authenticated) {
      admin = session.admin;
      await openDashboard();
      return;
    }
    const status = await api("/api/admin/setup-status");
    setAuthMode(status.setupRequired ? "setup" : "login");
  })
  .catch(() => setAuthMode("login"));
