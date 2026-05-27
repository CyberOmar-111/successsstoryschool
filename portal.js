const languageToggle = document.querySelector("[data-language-toggle]");
const authView = document.querySelector("[data-auth-view]");
const dashboard = document.querySelector("[data-dashboard]");
const registerForm = document.querySelector("[data-register-form]");
const loginForm = document.querySelector("[data-login-form]");
const registerStatus = document.querySelector("[data-register-status]");
const loginStatus = document.querySelector("[data-login-status]");
const idResult = document.querySelector("[data-id-result]");
const issuedId = document.querySelector("[data-issued-id]");
const profileForm = document.querySelector("[data-profile-form]");
const profileStatus = document.querySelector("[data-profile-status]");

const translations = {
  en: {
    title: "Success Story School | Student Portal",
    skip: "Skip to portal content",
    brandPortal: "Student Portal",
    backWebsite: "Back to website",
    portalEyebrow: "Student Portal",
    portalTitle: "Your school account starts here.",
    portalText: "Create your password and receive your own Success Story School student ID. Use it to sign in securely and access school services.",
    grades: "Grades",
    myClass: "My class",
    attendance: "Attendance",
    homework: "Homework",
    announcements: "Announcements",
    fees: "Fees",
    bus: "Bus details",
    registration: "Registration",
    secureBadge: "Protected student account",
    createAccount: "Create account",
    signIn: "Sign in",
    createTitle: "Create a student account",
    createText: "Enter the student's name, choose the correct homeroom, and create a private password. The school system will issue the student ID.",
    studentName: "Student full name",
    classSection: "Class / section",
    chooseClass: "Choose your class",
    class10ABoys: "Grade 10 A - Boys",
    class10BGirls: "Grade 10 B - Girls",
    class9ABoys: "Grade 9 A - Boys",
    class9BBoys: "Grade 9 B - Boys",
    class9CGirls: "Grade 9 C - Girls",
    class8ABoys: "Grade 8 A - Boys",
    class8BBoys: "Grade 8 B - Boys",
    class8CGirls: "Grade 8 C - Girls",
    class8DGirls: "Grade 8 D - Girls",
    newPassword: "Create password",
    confirmPassword: "Confirm password",
    passwordRule: "Password must be at least 8 characters and contain a letter and a number.",
    getStudentId: "Create account and get ID",
    yourStudentId: "Your student ID",
    keepId: "Keep this ID. You will use it with your password to sign in.",
    continueSignIn: "Continue to sign in",
    signInTitle: "Sign in to your account",
    signInText: "Enter the student ID issued by the school system and your password.",
    studentId: "Student ID",
    password: "Password",
    rateLimitNote: "After 5 incorrect attempts, sign-in is locked for 15 minutes.",
    secureBanner: "Secure student account. Grades, attendance, and other records will appear when entered by the school.",
    gradeLabel: "Grade:",
    notSelected: "Not selected",
    overview: "Overview",
    classRoster: "Class roster",
    noClass: "You have not been placed in a class yet.",
    yourClass: "Your class",
    classMembers: "Class members",
    portalDashboard: "Student dashboard",
    welcome: "Welcome,",
    logout: "Log out",
    attendanceThisTerm: "Attendance this term",
    overallAverage: "Overall average",
    feeBalance: "Fee balance",
    notPosted: "Not posted",
    noAnnouncements: "No school announcements have been posted to this account.",
    noHomework: "No homework has been posted to this account.",
    completeRegistration: "Complete your registration details to request bus transportation.",
    openModule: "Open section",
    gradesReport: "Grades & report card",
    noGrades: "No grades have been entered for this student yet.",
    subject: "Subject",
    termOne: "Term 1",
    termTwo: "Term 2",
    average: "Average",
    attendanceRecord: "Attendance record",
    noAttendance: "No attendance records have been entered for this student yet.",
    date: "Date",
    status: "Status",
    present: "Present",
    absent: "Absent",
    late: "Late",
    homeworkAssignments: "Homework assignments",
    schoolAnnouncements: "School announcements",
    feesTitle: "Fees & payment status",
    noFees: "No fee records have been entered for this student yet.",
    item: "Item",
    amount: "Amount",
    due: "Due",
    paid: "Paid",
    contactFees: "Contact school about fees",
    busTitle: "Bus transportation",
    transportRequest: "Transportation request",
    schoolDeparture: "School departure",
    busNote: "Routes and pickup times will appear after confirmation by school administration.",
    registrationProfile: "Student registration details",
    classManagedNote: "Your homeroom is selected during account creation. Please contact administration to change it.",
    requestedGrade: "Student grade",
    chooseGrade: "Choose a grade",
    grade1: "Grade 1",
    grade2: "Grade 2",
    grade3: "Grade 3",
    grade4: "Grade 4",
    grade5: "Grade 5",
    grade6: "Grade 6",
    grade7: "Grade 7",
    grade8: "Grade 8",
    grade9: "Grade 9",
    grade10: "Grade 10",
    transportNeeded: "Transportation needed",
    chooseOption: "Choose an option",
    busRequested: "Bus requested",
    noBus: "No bus required",
    saveDetails: "Save details",
    passwordsDoNotMatch: "Passwords do not match.",
    accountCreated: "Account created. Your student ID is shown below.",
    invalidLogin: "The student ID or password is incorrect.",
    loginLocked: "Too many failed attempts. Sign-in is locked for 15 minutes.",
    genericError: "Something went wrong. Please try again.",
    registerLimited: "Too many account requests. Please try again later.",
    nameRequired: "Enter the student's full name.",
    passwordError: "Password must be 8-128 characters and include a letter and a number.",
    invalidClass: "Choose one of the available homerooms.",
    detailsSaved: "Registration details saved.",
    busValue: "Bus requested",
    noBusValue: "No bus required",
    administratorLogin: "Administrator login",
    teacherLogin: "Teacher login",
    classPost: "Class post"
  },
  ar: {
    teacherLogin: "دخول المعلم",
    title: "مدرسة قصة نجاح | بوابة الطالب",
    skip: "الانتقال إلى محتوى البوابة",
    brandPortal: "بوابة الطالب",
    backWebsite: "العودة إلى الموقع",
    portalEyebrow: "بوابة الطالب",
    portalTitle: "حسابك المدرسي يبدأ هنا.",
    portalText: "أنشئ كلمة مرورك واحصل على رقم طالب خاص بك من مدرسة قصة نجاح. استخدمه لتسجيل الدخول بأمان والوصول إلى خدمات المدرسة.",
    grades: "العلامات",
    myClass: "صفي",
    attendance: "الحضور",
    homework: "الواجبات",
    announcements: "الإعلانات",
    fees: "الرسوم",
    bus: "تفاصيل الباص",
    registration: "التسجيل",
    secureBadge: "حساب طالب محمي",
    createAccount: "إنشاء حساب",
    signIn: "تسجيل الدخول",
    createTitle: "إنشاء حساب طالب",
    createText: "أدخل اسم الطالب واختر الشعبة الصحيحة وأنشئ كلمة مرور خاصة. سيصدر نظام المدرسة رقم الطالب.",
    studentName: "اسم الطالب الكامل",
    classSection: "الصف / الشعبة",
    chooseClass: "اختر صفك",
    class10ABoys: "الصف العاشر أ - بنين",
    class10BGirls: "الصف العاشر ب - بنات",
    class9ABoys: "الصف التاسع أ - بنين",
    class9BBoys: "الصف التاسع ب - بنين",
    class9CGirls: "الصف التاسع ج - بنات",
    class8ABoys: "الصف الثامن أ - بنين",
    class8BBoys: "الصف الثامن ب - بنين",
    class8CGirls: "الصف الثامن ج - بنات",
    class8DGirls: "الصف الثامن د - بنات",
    newPassword: "إنشاء كلمة مرور",
    confirmPassword: "تأكيد كلمة المرور",
    passwordRule: "يجب أن تكون كلمة المرور 8 أحرف على الأقل وأن تحتوي على حرف ورقم.",
    getStudentId: "إنشاء الحساب والحصول على الرقم",
    yourStudentId: "رقم الطالب الخاص بك",
    keepId: "احتفظ بهذا الرقم. ستستخدمه مع كلمة المرور لتسجيل الدخول.",
    continueSignIn: "متابعة تسجيل الدخول",
    signInTitle: "تسجيل الدخول إلى حسابك",
    signInText: "أدخل رقم الطالب الصادر عن نظام المدرسة وكلمة المرور.",
    studentId: "رقم الطالب",
    password: "كلمة المرور",
    rateLimitNote: "بعد 5 محاولات غير صحيحة، يتم إيقاف تسجيل الدخول لمدة 15 دقيقة.",
    secureBanner: "حساب طالب آمن. ستظهر العلامات والحضور والسجلات الأخرى عند إدخالها من المدرسة.",
    gradeLabel: "الصف:",
    notSelected: "غير محدد",
    overview: "الرئيسية",
    classRoster: "قائمة الصف",
    noClass: "لم يتم وضعك في صف بعد.",
    yourClass: "صفك",
    classMembers: "طلاب الصف",
    portalDashboard: "لوحة الطالب",
    welcome: "مرحبا،",
    logout: "تسجيل الخروج",
    attendanceThisTerm: "الحضور لهذا الفصل",
    overallAverage: "المعدل العام",
    feeBalance: "رصيد الرسوم",
    notPosted: "لم ينشر بعد",
    noAnnouncements: "لم تتم إضافة إعلانات مدرسية إلى هذا الحساب.",
    noHomework: "لم تتم إضافة واجبات إلى هذا الحساب.",
    completeRegistration: "أكمل بيانات التسجيل لطلب المواصلات بالباص.",
    openModule: "فتح القسم",
    gradesReport: "العلامات وكشف الدرجات",
    noGrades: "لم يتم إدخال علامات لهذا الطالب بعد.",
    subject: "المادة",
    termOne: "الفصل الأول",
    termTwo: "الفصل الثاني",
    average: "المعدل",
    attendanceRecord: "سجل الحضور",
    noAttendance: "لم يتم إدخال سجلات حضور لهذا الطالب بعد.",
    date: "التاريخ",
    status: "الحالة",
    present: "حاضر",
    absent: "غائب",
    late: "متأخر",
    homeworkAssignments: "الواجبات المنزلية",
    schoolAnnouncements: "إعلانات المدرسة",
    feesTitle: "الرسوم وحالة الدفع",
    noFees: "لم يتم إدخال سجلات رسوم لهذا الطالب بعد.",
    item: "البند",
    amount: "المبلغ",
    due: "مستحق",
    paid: "مدفوع",
    contactFees: "تواصل مع المدرسة بشأن الرسوم",
    busTitle: "المواصلات بالباص",
    transportRequest: "طلب المواصلات",
    schoolDeparture: "مغادرة المدرسة",
    busNote: "ستظهر المسارات وأوقات الاصطحاب بعد تأكيد إدارة المدرسة.",
    registrationProfile: "بيانات تسجيل الطالب",
    classManagedNote: "يتم اختيار الشعبة عند إنشاء الحساب. يرجى التواصل مع الإدارة لتغييرها.",
    requestedGrade: "صف الطالب",
    chooseGrade: "اختر الصف",
    grade1: "الصف الأول",
    grade2: "الصف الثاني",
    grade3: "الصف الثالث",
    grade4: "الصف الرابع",
    grade5: "الصف الخامس",
    grade6: "الصف السادس",
    grade7: "الصف السابع",
    grade8: "الصف الثامن",
    grade9: "الصف التاسع",
    grade10: "الصف العاشر",
    transportNeeded: "هل تحتاج إلى المواصلات",
    chooseOption: "اختر خيارا",
    busRequested: "مطلوب باص",
    noBus: "لا يلزم باص",
    saveDetails: "حفظ البيانات",
    passwordsDoNotMatch: "كلمتا المرور غير متطابقتين.",
    accountCreated: "تم إنشاء الحساب. رقم الطالب ظاهر أدناه.",
    invalidLogin: "رقم الطالب أو كلمة المرور غير صحيحة.",
    loginLocked: "محاولات كثيرة غير صحيحة. تم إيقاف تسجيل الدخول لمدة 15 دقيقة.",
    genericError: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    registerLimited: "طلبات حسابات كثيرة جدا. يرجى المحاولة لاحقا.",
    nameRequired: "أدخل اسم الطالب الكامل.",
    passwordError: "يجب أن تكون كلمة المرور من 8 إلى 128 حرفا وأن تحتوي على حرف ورقم.",
    invalidClass: "اختر إحدى الشعب المتاحة.",
    detailsSaved: "تم حفظ بيانات التسجيل.",
    busValue: "مطلوب باص",
    noBusValue: "لا يلزم باص",
    administratorLogin: "دخول الإدارة",
    classPost: "للصف"
  }
};

let language = "en";
let currentUser = null;
let currentClass = null;
let currentRecords = {
  grades: [],
  attendance: [],
  homework: [],
  announcements: [],
  fees: []
};

const text = (key) => translations[language][key] ?? translations.en[key] ?? "";

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

function messageForError(error) {
  const keys = {
    invalid_login: "invalidLogin",
    login_locked: "loginLocked",
    register_limited: "registerLimited",
    name_required: "nameRequired",
    password_rule: "passwordError",
    invalid_class: "invalidClass"
  };
  return text(keys[error.code] || "genericError");
}

function applyLanguage(nextLanguage) {
  language = nextLanguage === "ar" ? "ar" : "en";
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.title = text("title");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = text(element.dataset.i18n);
  });
  languageToggle.textContent = language === "ar" ? "English" : "العربية";
  languageToggle.setAttribute(
    "aria-label",
    language === "ar" ? "View portal in English" : "عرض البوابة باللغة العربية"
  );
  refreshUserDetails();
  renderRecords(currentRecords);
  renderClass();
  try {
    localStorage.setItem("sss-language", language);
  } catch {
    // The portal remains usable if language preference cannot be saved.
  }
}

function refreshUserDetails() {
  if (!currentUser) {
    return;
  }
  document.querySelector("[data-student-name]").textContent = currentUser.name;
  document.querySelector("[data-welcome-name]").textContent = currentUser.name;
  document.querySelector("[data-student-id]").textContent = currentUser.studentId;
  document.querySelector("[data-avatar]").textContent = currentUser.name
    .split(" ")
    .slice(0, 2)
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();
  const gradeLabel = document.querySelector("[data-grade-label]");
  gradeLabel.removeAttribute("data-i18n");
  gradeLabel.textContent = currentUser.grade ? text(`grade${currentUser.grade}`) : text("notSelected");
  const busLabel = document.querySelector("[data-bus-request]");
  busLabel.removeAttribute("data-i18n");
  busLabel.textContent = currentUser.transport === "bus"
    ? text("busValue")
    : currentUser.transport === "none"
      ? text("noBusValue")
      : text("notSelected");
}

function renderClass() {
  const emptyClass = document.querySelector("[data-empty-class]");
  const classDetails = document.querySelector("[data-class-details]");
  if (!currentClass) {
    emptyClass.hidden = false;
    classDetails.hidden = true;
    return;
  }
  emptyClass.hidden = true;
  classDetails.hidden = false;
  document.querySelector("[data-class-name]").textContent = classroomName(currentClass);
  const members = document.querySelector("[data-class-members]");
  members.replaceChildren();
  currentClass.members.forEach((member) => {
    const item = document.createElement("span");
    item.textContent = member.name;
    members.appendChild(item);
  });
}

function classroomName(classroom) {
  const key = `class${classroom.grade}${classroom.section}${classroom.group === "girls" ? "Girls" : "Boys"}`;
  return text(key);
}

function addCell(row, value) {
  const cell = document.createElement("td");
  cell.textContent = String(value ?? "--");
  row.appendChild(cell);
}

function showCollection(emptySelector, listSelector, hasValues) {
  document.querySelector(emptySelector).hidden = hasValues;
  document.querySelector(listSelector).hidden = !hasValues;
}

function renderMetric(valueSelector, statusSelector, value) {
  document.querySelector(valueSelector).textContent = value ?? "--";
  document.querySelector(statusSelector).hidden = value !== null;
}

function renderRecords(records) {
  const grades = records.grades || [];
  const attendance = records.attendance || [];
  const homework = records.homework || [];
  const announcements = records.announcements || [];
  const fees = records.fees || [];

  showCollection("[data-empty-grades]", "[data-grades-list]", grades.length > 0);
  const gradesBody = document.querySelector("[data-grades-body]");
  gradesBody.replaceChildren();
  grades.forEach((grade) => {
    const row = document.createElement("tr");
    const values = [grade.term_one, grade.term_two].filter((value) => value !== null);
    const average = values.length
      ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
      : "--";
    addCell(row, grade.subject);
    addCell(row, grade.term_one);
    addCell(row, grade.term_two);
    addCell(row, average);
    gradesBody.appendChild(row);
  });

  showCollection("[data-empty-attendance]", "[data-attendance-list]", attendance.length > 0);
  const attendanceBody = document.querySelector("[data-attendance-body]");
  attendanceBody.replaceChildren();
  attendance.forEach((record) => {
    const row = document.createElement("tr");
    addCell(row, record.school_date);
    addCell(row, text(record.status));
    attendanceBody.appendChild(row);
  });

  showCollection("[data-empty-homework]", "[data-homework-list]", homework.length > 0);
  const homeworkList = document.querySelector("[data-homework-list]");
  homeworkList.replaceChildren();
  homework.forEach((assignment) => {
    const item = document.createElement("article");
    const subject = document.createElement("span");
    const details = document.createElement("h4");
    const date = document.createElement("small");
    subject.textContent = assignment.subject;
    if (assignment.audience === "class") {
      subject.textContent = `${assignment.subject} - ${text("classPost")}`;
    }
    details.textContent = assignment.details;
    date.textContent = assignment.due_date || "";
    item.append(subject, details, date);
    homeworkList.appendChild(item);
  });

  showCollection("[data-empty-announcements]", "[data-announcements-list]", announcements.length > 0);
  const announcementList = document.querySelector("[data-announcements-list]");
  announcementList.replaceChildren();
  announcements.forEach((notice) => {
    const item = document.createElement("article");
    const date = document.createElement("time");
    const title = document.createElement("h4");
    const details = document.createElement("p");
    date.textContent = notice.posted_at;
    if (notice.audience === "class") {
      date.textContent = `${notice.posted_at} - ${text("classPost")}`;
    }
    title.textContent = notice.title;
    details.textContent = notice.details;
    item.append(date, title, details);
    announcementList.appendChild(item);
  });

  showCollection("[data-empty-fees]", "[data-fees-list]", fees.length > 0);
  const feesBody = document.querySelector("[data-fees-body]");
  feesBody.replaceChildren();
  fees.forEach((fee) => {
    const row = document.createElement("tr");
    addCell(row, fee.label);
    addCell(row, `${Number(fee.amount).toFixed(2)} JOD`);
    addCell(row, text(fee.status));
    feesBody.appendChild(row);
  });

  const gradeValues = grades.flatMap((grade) => [grade.term_one, grade.term_two]).filter((value) => value !== null);
  renderMetric("[data-average-overview]", "[data-average-status]", gradeValues.length
    ? `${Math.round(gradeValues.reduce((sum, value) => sum + value, 0) / gradeValues.length)}%`
    : null);
  renderMetric("[data-attendance-overview]", "[data-attendance-status]", attendance.length
    ? `${Math.round((attendance.filter((record) => record.status === "present").length / attendance.length) * 100)}%`
    : null);
  const dueAmount = fees.filter((fee) => fee.status === "due").reduce((sum, fee) => sum + Number(fee.amount), 0);
  renderMetric("[data-fees-overview]", "[data-fees-status]", fees.length ? `${dueAmount.toFixed(2)} JOD` : null);
}

function selectAuthTab(tabName) {
  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authTab === tabName);
  });
  registerForm.hidden = tabName !== "create";
  loginForm.hidden = tabName !== "signin";
  loginStatus.textContent = "";
  registerStatus.textContent = "";
}

function openPanel(panelName) {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === panelName);
  });
  document.querySelectorAll("[data-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.panel !== panelName;
  });
}

async function openDashboard() {
  const portal = await api("/api/portal");
  currentUser = portal.user;
  currentRecords = portal.records;
  currentClass = portal.class;
  authView.hidden = true;
  dashboard.hidden = false;
  profileForm.elements.transport.value = currentUser.transport || "";
  refreshUserDetails();
  renderClass();
  renderRecords(currentRecords);
  openPanel("overview");
}

languageToggle.addEventListener("click", () => {
  applyLanguage(language === "en" ? "ar" : "en");
});

document.querySelectorAll("[data-auth-tab]").forEach((button) => {
  button.addEventListener("click", () => selectAuthTab(button.dataset.authTab));
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  registerStatus.textContent = "";
  idResult.hidden = true;
  const values = new FormData(registerForm);
  const password = String(values.get("password"));
  if (password !== String(values.get("confirmPassword"))) {
    registerStatus.textContent = text("passwordsDoNotMatch");
    return;
  }
  try {
    const result = await api("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name: values.get("name"), classCode: values.get("classCode"), password })
    });
    registerStatus.textContent = text("accountCreated");
    issuedId.textContent = result.studentId;
    idResult.hidden = false;
    loginForm.elements.studentId.value = result.studentId;
    registerForm.reset();
  } catch (error) {
    registerStatus.textContent = messageForError(error);
  }
});

document.querySelector("[data-go-signin]").addEventListener("click", () => {
  selectAuthTab("signin");
  loginForm.elements.password.focus();
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginStatus.textContent = "";
  const values = new FormData(loginForm);
  try {
    await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        studentId: values.get("studentId"),
        password: values.get("password")
      })
    });
    loginForm.reset();
    await openDashboard();
  } catch (error) {
    loginStatus.textContent = messageForError(error);
  }
});

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => openPanel(button.dataset.tab));
});

document.querySelectorAll("[data-open-tab]").forEach((button) => {
  button.addEventListener("click", () => openPanel(button.dataset.openTab));
});

profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  profileStatus.textContent = "";
  const values = new FormData(profileForm);
  try {
    const result = await api("/api/portal/profile", {
      method: "POST",
      body: JSON.stringify({ transport: values.get("transport") })
    });
    currentUser = result.user;
    profileForm.elements.transport.value = currentUser.transport || "";
    refreshUserDetails();
    profileStatus.textContent = text("detailsSaved");
  } catch {
    profileStatus.textContent = text("genericError");
  }
});

document.querySelector("[data-logout]").addEventListener("click", async () => {
  await api("/api/auth/logout", { method: "POST", body: "{}" });
  currentUser = null;
  currentClass = null;
  dashboard.hidden = true;
  authView.hidden = false;
  profileStatus.textContent = "";
  selectAuthTab("signin");
});

try {
  language = localStorage.getItem("sss-language") === "ar" ? "ar" : "en";
} catch {
  language = "en";
}
applyLanguage(language);

api("/api/auth/session")
  .then((session) => {
    if (session.authenticated) {
      openDashboard().catch(() => {
        dashboard.hidden = true;
        authView.hidden = false;
      });
    }
  })
  .catch(() => {});
