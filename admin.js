const languageToggle = document.querySelector("[data-language-toggle]");
const authView = document.querySelector("[data-auth-view]");
const dashboard = document.querySelector("[data-dashboard]");
const setupForm = document.querySelector("[data-setup-form]");
const loginForm = document.querySelector("[data-login-form]");
const setupStatus = document.querySelector("[data-setup-status]");
const loginStatus = document.querySelector("[data-login-status]");
const userSearchInput = document.querySelector("[data-user-search]");

const translations = {
  en: {
    pageTitle: "Success Story School | Staff Login",
    brandAdmin: "Staff Portal",
    studentPortal: "Student Account",
    teacherPortal: "Teacher Account",
    backWebsite: "Back to website",
    eyebrow: "School Office",
    title: "Administration Login",
    intro: "Authorized staff can access school tools after sign-in.",
    securityTitle: "Authorized access",
    securityText: "For authorized school staff only.",
    protectedAdmin: "Staff sign-in",
    setupTitle: "Set up administrator access",
    setupText: "For authorized school staff only. Choose a private strong password; it will not be viewable later.",
    adminId: "Administrator ID",
    adminName: "Administrator name",
    setupSecret: "Private setup secret",
    setupSecretNote: "Required only on the public production server.",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    adminIdRule: "Enter a private administrator ID in the format ADM-0000.",
    adminPasswordRule: "Use at least 8 characters with a letter, number, and symbol.",
    createAdmin: "Create account",
    signInTitle: "Administration Login",
    signInText: "For authorized school staff only.",
    password: "Password",
    rateLimit: "Five failed attempts lock sign-in for 15 minutes.",
    signIn: "Sign in",
    working: "Working...",
    dashboardBanner: "Administration area. Changes here appear in student accounts.",
    welcome: "Welcome,",
    logout: "Log out",
    students: "Students",
    classes: "Classes",
    administrators: "Administrators",
    parents: "Parents",
    addAdministrator: "Manage administrators",
    teachers: "Teachers",
    userManagementEyebrow: "Accounts overview",
    userManagementTitle: "Admin User Management",
    userManagementText: "Search every school account, check status, and approve new student registrations from one table.",
    searchUsers: "Search users",
    userSearchPlaceholder: "Search by name, ID, role, or class",
    allUsers: "All",
    active: "Active",
    pending: "Pending",
    declined: "Declined",
    user: "User",
    role: "Role",
    action: "Action",
    approve: "Approve",
    openRecord: "Open",
    noAction: "No action",
    noUserResults: "No users match this search.",
    studentApproved: "Student approved.",
    parentRecord: "Parent record",
    parentVerification: "Parent verification",
    parentVerificationText: "Approve the parent account, then approve each child connection before records appear.",
    approveParent: "Approve parent",
    declineParent: "Decline parent",
    parentApproved: "Parent approved.",
    parentDeclined: "Parent declined.",
    linkedChildren: "Linked children",
    approveChild: "Approve child",
    declineChild: "Decline child",
    childLinkApproved: "Child link approved.",
    childLinkDeclined: "Child link declined.",
    noParents: "No parent accounts yet.",
    noLinkedChildren: "No child links requested yet.",
    username: "Username",
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
    emailAddress: "Email address",
    registrationSource: "Created from",
    registrationDevice: "Device",
    registrationIp: "IP address",
    webPortal: "Website portal",
    iosApp: "iOS app",
    unknown: "Unknown",
    placeClass: "Student verification",
    studentVerification: "Student verification",
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
    assignClass: "Verify",
    verifyStudent: "Verify",
    declineStudent: "Decline",
    pendingApproval: "Pending approval",
    approved: "Approved",
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
    studentVerified: "Student verified.",
    studentDeclined: "Student account request declined.",
    setupDone: "Administrator account created. Sign in below.",
    setupAlreadyComplete: "Administrator setup is complete. Sign in below.",
    setupSecretRequired: "Enter the private setup secret configured on the server.",
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
    userManagementEyebrow: "Accounts overview",
    userManagementTitle: "Admin User Management",
    userManagementText: "Search every school account, check status, and approve new student registrations from one table.",
    searchUsers: "Search users",
    userSearchPlaceholder: "Search by name, ID, role, or class",
    allUsers: "All",
    active: "Active",
    pending: "Pending",
    declined: "Declined",
    user: "User",
    role: "Role",
    action: "Action",
    approve: "Approve",
    openRecord: "Open",
    noAction: "No action",
    noUserResults: "No users match this search.",
    studentApproved: "Student approved.",
    parentRecord: "Parent record",
    parentVerification: "Parent verification",
    parentVerificationText: "Approve the parent account, then approve each child connection before records appear.",
    approveParent: "Approve parent",
    declineParent: "Decline parent",
    parentApproved: "Parent approved.",
    parentDeclined: "Parent declined.",
    linkedChildren: "Linked children",
    approveChild: "Approve child",
    declineChild: "Decline child",
    childLinkApproved: "Child link approved.",
    childLinkDeclined: "Child link declined.",
    noParents: "No parent accounts yet.",
    noLinkedChildren: "No child links requested yet.",
    username: "Username",
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
    title: "Administration Login",
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
    createAdmin: "إنشاء حساب",
    signInTitle: "دخول الإدارة",
    signInText: "For authorized school staff only.",
    password: "كلمة المرور",
    rateLimit: "بعد خمس محاولات خاطئة يتوقف الدخول لمدة 15 دقيقة.",
    signIn: "تسجيل الدخول",
    working: "جاري التنفيذ...",
    dashboardBanner: "منطقة الإدارة. تظهر التغييرات هنا في حسابات الطلاب.",
    welcome: "مرحبا،",
    logout: "تسجيل الخروج",
    students: "الطلاب",
    classes: "الصفوف",
    administrators: "الإداريون",
    parents: "أولياء الأمور",
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
    emailAddress: "البريد الإلكتروني",
    registrationSource: "مصدر الإنشاء",
    registrationDevice: "الجهاز",
    registrationIp: "عنوان IP",
    webPortal: "بوابة الموقع",
    iosApp: "تطبيق iOS",
    unknown: "غير معروف",
    placeClass: "Student verification",
    studentVerification: "Student verification",
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
    assignClass: "Verify",
    verifyStudent: "Verify",
    declineStudent: "Decline",
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
    studentVerified: "Student verified.",
    studentDeclined: "Student account request declined.",
    setupDone: "تم إنشاء حساب الإدارة. سجل الدخول أدناه.",
    setupAlreadyComplete: "تم إعداد حساب الإدارة. سجل الدخول أدناه.",
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

Object.assign(translations.ar, {
  pageTitle: "Success Story School | Staff Login",
  brandAdmin: "Staff Portal",
  studentPortal: "Student Account",
  teacherPortal: "Teacher Account",
  backWebsite: "Back to website",
  eyebrow: "School Office",
  title: "Administration Login",
  intro: "Authorized staff can access school tools after sign-in.",
  securityTitle: "Authorized access",
  securityText: "For authorized school staff only.",
  protectedAdmin: "Staff sign-in",
  setupTitle: "Set up administrator access",
  setupText: "For authorized school staff only. Choose a private strong password; it will not be viewable later.",
  setupSecret: "Private setup secret",
  setupSecretNote: "Required only on the public production server.",
  adminIdRule: "Enter a private administrator ID in the format ADM-0000.",
  createAdmin: "Create account",
  signInTitle: "Administration Login",
  signInText: "For authorized school staff only.",
  studentVerification: "Student verification",
  verifyStudent: "Verify",
  declineStudent: "Decline",
  dashboardBanner: "Administration area. Changes here appear in student accounts.",
  studentVerified: "Student verified.",
  studentDeclined: "Student account request declined.",
  setupDone: "Administrator account created. Sign in below.",
  setupAlreadyComplete: "Administrator setup is complete. Sign in below.",
  setupSecretRequired: "Enter the private setup secret configured on the server."
});

let language = "en";
let admin = null;
let students = [];
let classes = [];
let administrators = [];
let teachers = [];
let parents = [];
let studentDetails = null;
let classDetails = null;
let parentDetails = null;
let userStatusFilter = "all";

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
    admin_id_rule: "adminIdRule",
    admin_password_rule: "adminPasswordError",
    teacher_password_rule: "teacherPasswordError",
    assignment_required: "subjectRequired",
    invalid_class: "invalidClass",
    name_required: "nameRequired",
    invalid_current_password: "invalidCurrentPassword",
    setup_complete: "setupAlreadyComplete",
    setup_secret_required: "setupSecretRequired"
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
  if (userSearchInput) {
    userSearchInput.placeholder = text("userSearchPlaceholder");
  }
  renderLists();
  if (studentDetails) {
    renderStudent(studentDetails);
  }
  if (classDetails) {
    renderClass(classDetails);
  }
  if (parentDetails) {
    renderParent(parentDetails);
  }
  try {
    localStorage.setItem("sss-language", language);
  } catch {
    // Language selection remains available for the current page.
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
  setAdminSummary("[data-admin-total-parents]", parents.length);
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
  renderUserManagement();
  const studentList = document.querySelector("[data-student-list]");
  const classList = document.querySelector("[data-class-list]");
  const adminList = document.querySelector("[data-admin-list]");
  const teacherList = document.querySelector("[data-teacher-list]");
  const parentList = document.querySelector("[data-parent-list]");
  if (!studentList || !classList || !adminList || !teacherList || !parentList) {
    return;
  }
  studentList.replaceChildren();
  classList.replaceChildren();
  adminList.replaceChildren();
  teacherList.replaceChildren();
  parentList.replaceChildren();
  if (!students.length) {
    studentList.textContent = text("emptyStudents");
  }
  students.forEach((student) => {
    const classroom = classes.find((group) => group.id === student.classId);
    const approval = student.approvalStatus === "approved" ? text("approved") : text("pendingApproval");
    const homeroom = classroom ? className(classroom) : student.requestedClassName || text("noClass");
    studentList.appendChild(createListButton(
      student.name,
      `${student.studentId} - ${approval} - ${homeroom}`,
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
  if (!parents.length) {
    parentList.textContent = text("noParents");
  }
  parents.forEach((parent) => {
    const linked = (parent.children || []).length;
    const status = parent.status === "active" ? text("active") : parent.status === "declined" ? text("declined") : text("pending");
    parentList.appendChild(createListButton(
      parent.name,
      `${parent.parentId} - ${status} - ${linked} ${text("students")}`,
      () => openParentEditor(parent.parentId),
      parentDetails && parentDetails.parentId === parent.parentId
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

function userRoleLabel(role) {
  const labels = {
    student: text("students"),
    teacher: text("teachers"),
    admin: text("administrators"),
    parent: text("parents")
  };
  return labels[role] || role;
}

function allUserRows() {
  return [
    ...students.map((student) => {
      const classroom = classes.find((group) => group.id === student.classId);
      const homeroom = classroom ? className(classroom) : student.requestedClassName || text("noClass");
      const status = student.approvalStatus === "approved" ? "active" : "pending";
      return {
        role: "student",
        id: student.studentId,
        name: student.name,
        status,
        statusLabel: status === "active" ? text("active") : text("pending"),
        email: student.email || student.emailHint || "-",
        detail: homeroom,
        source: registrationSourceLabel(student.registrationSource),
        searchText: `${student.name} ${student.studentId} ${student.email || ""} student ${homeroom} ${status} ${student.registrationSource || ""} ${student.registrationDevice || ""}`,
        student
      };
    }),
    ...teachers.map((teacher) => ({
      role: "teacher",
      id: teacher.teacherId,
      name: teacher.name,
      status: "active",
      statusLabel: text("active"),
      email: "-",
      detail: (teacher.assignments || []).length
        ? teacher.assignments.map((assignment) => `${className(assignment.class)} / ${assignment.subject}`).join(", ")
        : text("noClass"),
      source: "-",
      searchText: `${teacher.name} ${teacher.teacherId} teacher active`
    })),
    ...parents.map((parent) => {
      const linked = (parent.children || []).length;
      const pendingLinks = (parent.children || []).filter((child) => child.status === "pending").length;
      const status = parent.status === "active" ? "active" : parent.status === "declined" ? "declined" : "pending";
      return {
        role: "parent",
        id: parent.parentId,
        name: parent.name,
        status,
        statusLabel: status === "active" ? text("active") : status === "pending" ? text("pending") : "Declined",
        email: parent.email || parent.emailHint || "-",
        detail: `${linked} ${text("students")}${pendingLinks ? `, ${pendingLinks} ${text("pending")}` : ""}`,
        source: registrationSourceLabel(parent.registrationSource),
        searchText: `${parent.name} ${parent.parentId} ${parent.email || ""} ${parent.username || ""} parent ${status} ${parent.registrationSource || ""} ${parent.registrationDevice || ""}`,
        parent
      };
    }),
    ...administrators.map((account) => ({
      role: "admin",
      id: account.adminId,
      name: account.name,
      status: "active",
      statusLabel: text("active"),
      email: "-",
      detail: text("administrators"),
      source: "-",
      searchText: `${account.name} ${account.adminId} admin active`
    }))
  ];
}

function renderUserManagement() {
  const body = document.querySelector("[data-user-table-body]");
  const empty = document.querySelector("[data-user-table-empty]");
  if (!body || !empty) {
    return;
  }
  const term = (userSearchInput?.value || "").trim().toLowerCase();
  const rows = allUserRows().filter((row) => {
    const statusMatch = userStatusFilter === "all" || row.status === userStatusFilter;
    const textMatch = !term || row.searchText.toLowerCase().includes(term);
    return statusMatch && textMatch;
  });
  body.replaceChildren();
  document.querySelectorAll("[data-user-status-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.userStatusFilter === userStatusFilter);
  });
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    const userCell = document.createElement("td");
    const name = document.createElement("strong");
    const id = document.createElement("small");
    name.textContent = row.name;
    id.textContent = row.id;
    userCell.append(name, id);

    const role = document.createElement("td");
    role.textContent = userRoleLabel(row.role);

    const email = document.createElement("td");
    email.textContent = row.email;

    const status = document.createElement("td");
    const statusPill = document.createElement("span");
    statusPill.className = `status-pill ${row.status}`;
    statusPill.textContent = row.statusLabel;
    status.appendChild(statusPill);

    const detail = document.createElement("td");
    detail.textContent = row.detail;

    const source = document.createElement("td");
    source.textContent = row.source;

    const action = document.createElement("td");
    if (row.role === "student") {
      const button = document.createElement("button");
      button.type = "button";
      button.className = row.status === "pending" ? "table-action approve" : "table-action";
      button.textContent = row.status === "pending" ? text("approve") : text("openRecord");
      button.addEventListener("click", () => {
        if (row.status === "pending") {
          withButtonFeedback(button, () => approveStudentFromTable(row.student));
        } else {
          withButtonFeedback(button, () => loadStudent(row.id));
        }
      });
      action.appendChild(button);
    } else if (row.role === "parent") {
      const button = document.createElement("button");
      button.type = "button";
      button.className = row.status === "pending" ? "table-action approve" : "table-action";
      button.textContent = row.status === "pending" ? text("approve") : text("openRecord");
      button.addEventListener("click", () => {
        if (row.status === "pending") {
          withButtonFeedback(button, () => approveParentFromTable(row.parent));
        } else {
          withButtonFeedback(button, () => openParentEditor(row.id));
        }
      });
      action.appendChild(button);
    } else {
      const label = document.createElement("span");
      label.className = "table-action muted";
      label.textContent = text("noAction");
      action.appendChild(label);
    }
    tr.append(userCell, role, email, status, detail, source, action);
    body.appendChild(tr);
  });
  empty.hidden = Boolean(rows.length);
}

async function approveStudentFromTable(student) {
  const status = document.querySelector("[data-user-management-status]");
  if (!student.requestedClassCode) {
    status.textContent = text("chooseClass");
    await loadStudent(student.studentId);
    return;
  }
  try {
    await api("/api/admin/class-assignment", {
      method: "POST",
      body: JSON.stringify({ studentId: student.studentId, classCode: student.requestedClassCode })
    });
    status.textContent = text("studentApproved");
    await loadLists();
    if (studentDetails?.student?.studentId === student.studentId) {
      await loadStudent(student.studentId);
    }
  } catch (error) {
    status.textContent = errorText(error);
  }
}

async function approveParentFromTable(parent) {
  const status = document.querySelector("[data-user-management-status]");
  try {
    await api("/api/admin/parents/approve", {
      method: "POST",
      body: JSON.stringify({ parentId: parent.parentId })
    });
    status.textContent = text("parentApproved");
    await loadLists();
  } catch (error) {
    status.textContent = errorText(error);
  }
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

function registrationSourceLabel(source) {
  if (source === "ios_app") return text("iosApp");
  if (source === "web_portal") return text("webPortal");
  return text("unknown");
}

function renderParent(parent) {
  parentDetails = parent;
  studentDetails = null;
  classDetails = null;
  document.querySelector("[data-placeholder]").hidden = true;
  document.querySelector("[data-admin-editor]").hidden = true;
  document.querySelector("[data-teacher-editor]").hidden = true;
  document.querySelector("[data-class-editor]").hidden = true;
  document.querySelector("[data-student-editor]").hidden = true;
  document.querySelector("[data-parent-editor]").hidden = false;
  document.querySelector("[data-selected-parent-name]").textContent = parent.name;
  document.querySelector("[data-selected-parent-id]").textContent = parent.parentId;
  document.querySelector("[data-selected-parent-status]").textContent =
    parent.status === "active" ? text("active") : parent.status === "pending" ? text("pending") : text("declined");
  document.querySelector("[data-selected-parent-email]").textContent = parent.email || parent.emailHint || text("unknown");
  document.querySelector("[data-selected-parent-username]").textContent = parent.username || "-";
  document.querySelector("[data-selected-parent-source]").textContent = registrationSourceLabel(parent.registrationSource);
  document.querySelector("[data-selected-parent-device]").textContent = parent.registrationDevice || parent.registrationUserAgent || text("unknown");
  document.querySelector("[data-selected-parent-ip]").textContent = parent.registrationIp || text("unknown");
  document.querySelector("[data-approve-parent]").hidden = parent.status === "active";
  document.querySelector("[data-decline-parent]").hidden = parent.status === "declined";
  document.querySelector("[data-parent-status-message]").textContent = "";

  const links = document.querySelector("[data-parent-child-links]");
  links.replaceChildren();
  (parent.children || []).forEach((link) => {
    const article = document.createElement("article");
    article.className = "parent-link-row";
    const details = document.createElement("div");
    const title = document.createElement("strong");
    const meta = document.createElement("p");
    const badge = document.createElement("span");
    const actions = document.createElement("div");
    title.textContent = link.student.name;
    meta.textContent = `${link.student.studentId} - ${link.student.className || link.student.requestedClassName || text("noClass")} - ${link.relationship || "Parent"}`;
    badge.className = `status-pill ${link.status}`;
    badge.textContent = link.status === "approved" ? text("approved") : link.status === "pending" ? text("pending") : text("declined");
    details.append(title, meta, badge);
    if (link.status !== "approved") {
      const approve = document.createElement("button");
      approve.type = "button";
      approve.className = "table-action approve";
      approve.textContent = text("approveChild");
      approve.addEventListener("click", () => withButtonFeedback(approve, () => updateParentChildLink(link.linkId, "approve")));
      actions.appendChild(approve);
    }
    if (link.status !== "declined") {
      const decline = document.createElement("button");
      decline.type = "button";
      decline.className = "table-action";
      decline.textContent = text("declineChild");
      decline.addEventListener("click", () => withButtonFeedback(decline, () => updateParentChildLink(link.linkId, "decline")));
      actions.appendChild(decline);
    }
    article.append(details, actions);
    links.appendChild(article);
  });
  if (!links.childNodes.length) {
    links.textContent = text("noLinkedChildren");
  }
  renderLists();
}

function renderStudent(result) {
  studentDetails = result;
  classDetails = null;
  parentDetails = null;
  document.querySelector("[data-placeholder]").hidden = true;
  document.querySelector("[data-admin-editor]").hidden = true;
  document.querySelector("[data-teacher-editor]").hidden = true;
  document.querySelector("[data-class-editor]").hidden = true;
  document.querySelector("[data-parent-editor]").hidden = true;
  document.querySelector("[data-student-editor]").hidden = false;
  const student = result.student;
  document.querySelector("[data-selected-student-name]").textContent = student.name;
  document.querySelector("[data-selected-student-id]").textContent = student.studentId;
  document.querySelector("[data-selected-student-status]").textContent =
    student.approvalStatus === "approved" ? text("approved") : text("pendingApproval");
  document.querySelector("[data-selected-student-class]").textContent =
    result.class ? className(result.class) : student.requestedClassName || text("noClass");
  document.querySelector("[data-selected-student-email]").textContent = student.email || student.emailHint || text("unknown");
  document.querySelector("[data-selected-student-source]").textContent = registrationSourceLabel(student.registrationSource);
  document.querySelector("[data-selected-student-device]").textContent = student.registrationDevice || student.registrationUserAgent || text("unknown");
  document.querySelector("[data-selected-student-ip]").textContent = student.registrationIp || text("unknown");
  document.querySelectorAll("[data-student-editor] input[name=studentId]").forEach((input) => {
    input.value = student.studentId;
  });
  const assignment = document.querySelector("[data-class-assignment-form]");
  assignment.elements.classCode.value = result.class
    ? `${result.class.grade}-${result.class.section}`
    : student.requestedClassCode || "";
  const declineButton = document.querySelector("[data-decline-student]");
  declineButton.hidden = student.approvalStatus === "approved";
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
  parentDetails = null;
  document.querySelector("[data-placeholder]").hidden = true;
  document.querySelector("[data-admin-editor]").hidden = true;
  document.querySelector("[data-teacher-editor]").hidden = true;
  document.querySelector("[data-student-editor]").hidden = true;
  document.querySelector("[data-parent-editor]").hidden = true;
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
    option.textContent = `${student.name} (${student.studentId}) - ${currentClass ? className(currentClass) : student.requestedClassName || text("noClass")}`;
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
    remove.addEventListener("click", () => removeClassMember(member.studentId, result.class.id, remove));
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
  const [studentResult, classResult, administratorResult, teacherResult, parentResult] = await Promise.all([
    api("/api/admin/students"),
    api("/api/admin/classes"),
    api("/api/admin/accounts"),
    api("/api/admin/teachers"),
    api("/api/admin/parents")
  ]);
  students = studentResult.students;
  classes = classResult.classes;
  administrators = administratorResult.administrators;
  teachers = teacherResult.teachers;
  parents = parentResult.parents || [];
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

function openParentEditor(parentId) {
  const parent = parents.find((item) => item.parentId === parentId);
  if (parent) {
    renderParent(parent);
  }
}

async function updateParentStatus(status) {
  if (!parentDetails) {
    return;
  }
  const endpoint = status === "active" ? "/api/admin/parents/approve" : "/api/admin/parents/decline";
  const message = document.querySelector("[data-parent-status-message]");
  try {
    await api(endpoint, {
      method: "POST",
      body: JSON.stringify({ parentId: parentDetails.parentId })
    });
    message.textContent = status === "active" ? text("parentApproved") : text("parentDeclined");
    await loadLists();
    openParentEditor(parentDetails.parentId);
  } catch (error) {
    message.textContent = errorText(error);
  }
}

async function updateParentChildLink(linkId, action) {
  const endpoint = action === "approve"
    ? "/api/admin/parents/children/approve"
    : "/api/admin/parents/children/decline";
  const message = document.querySelector("[data-parent-status-message]");
  try {
    await api(endpoint, {
      method: "POST",
      body: JSON.stringify({ linkId })
    });
    message.textContent = action === "approve" ? text("childLinkApproved") : text("childLinkDeclined");
    const parentId = parentDetails?.parentId;
    await loadLists();
    if (parentId) {
      openParentEditor(parentId);
    }
  } catch (error) {
    message.textContent = errorText(error);
  }
}

async function removeClassMember(studentId, classId, button) {
  const form = document.querySelector("[data-class-member-form]");
  const status = form.querySelector(".form-status");
  try {
    await withButtonFeedback(button, () => api("/api/admin/class-removal", {
      method: "POST",
      body: JSON.stringify({ studentId, classId })
    }));
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
  parentDetails = null;
  document.querySelector("[data-placeholder]").hidden = true;
  document.querySelector("[data-student-editor]").hidden = true;
  document.querySelector("[data-class-editor]").hidden = true;
  document.querySelector("[data-teacher-editor]").hidden = true;
  document.querySelector("[data-parent-editor]").hidden = true;
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
  parentDetails = null;
  document.querySelector("[data-placeholder]").hidden = true;
  document.querySelector("[data-student-editor]").hidden = true;
  document.querySelector("[data-class-editor]").hidden = true;
  document.querySelector("[data-admin-editor]").hidden = true;
  document.querySelector("[data-parent-editor]").hidden = true;
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
  const submitButton = setupForm.querySelector("[type=submit]");
  try {
    await withButtonFeedback(submitButton, () => api("/api/admin/setup", {
      method: "POST",
      body: JSON.stringify({
        adminId: values.get("adminId"),
        name: values.get("name"),
        password,
        setupSecret: values.get("setupSecret")
      })
    }));
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
  const submitButton = loginForm.querySelector("[type=submit]");
  try {
    const result = await withButtonFeedback(submitButton, () => api("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ adminId: values.get("adminId"), password: values.get("password") })
    }));
    admin = result.admin;
    loginForm.reset();
    await openDashboard();
  } catch (error) {
    loginStatus.textContent = errorText(error);
  }
});

document.querySelector("[data-new-admin]").addEventListener("click", openAdminEditor);
document.querySelector("[data-new-teacher]").addEventListener("click", openTeacherEditor);
document.querySelector("[data-add-assignment]").addEventListener("click", () => createAssignmentRow());
document.querySelector("[data-approve-parent]")?.addEventListener("click", (event) => {
  withButtonFeedback(event.currentTarget, () => updateParentStatus("active"));
});
document.querySelector("[data-decline-parent]")?.addEventListener("click", (event) => {
  withButtonFeedback(event.currentTarget, () => updateParentStatus("declined"));
});
userSearchInput?.addEventListener("input", renderUserManagement);
document.querySelectorAll("[data-user-status-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    userStatusFilter = button.dataset.userStatusFilter || "all";
    renderUserManagement();
  });
});

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
  const submitButton = form.querySelector("[type=submit]");
  try {
    const result = await withButtonFeedback(submitButton, () => api("/api/admin/accounts", {
      method: "POST",
      body: JSON.stringify({ name: values.get("name"), password })
    }));
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
  const submitButton = form.querySelector("[type=submit]");
  try {
    const result = await withButtonFeedback(submitButton, () => api("/api/admin/teachers", {
      method: "POST",
      body: JSON.stringify({ name: values.get("name"), password, assignments })
    }));
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
  const submitButton = form.querySelector("[type=submit]");
  try {
    await withButtonFeedback(submitButton, () => api("/api/admin/change-password", {
      method: "POST",
      body: JSON.stringify({
        currentPassword: values.get("currentPassword"),
        newPassword
      })
    }));
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
  const submitButton = form.querySelector("[type=submit]");
  try {
    const values = Object.fromEntries(new FormData(form));
    await withButtonFeedback(submitButton, () => api("/api/admin/class-assignment", { method: "POST", body: JSON.stringify(values) }));
    status.textContent = text("studentVerified");
    await loadLists();
    await loadStudent(values.studentId);
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-decline-student]").addEventListener("click", async () => {
  if (!studentDetails) {
    return;
  }
  const form = document.querySelector("[data-class-assignment-form]");
  const status = form.querySelector("[data-class-assignment-status]");
  const studentId = studentDetails.student.studentId;
  const button = document.querySelector("[data-decline-student]");
  try {
    await withButtonFeedback(button, () => api("/api/admin/student-decline", {
      method: "POST",
      body: JSON.stringify({ studentId })
    }));
    status.textContent = text("studentDeclined");
    studentDetails = null;
    document.querySelector("[data-student-editor]").hidden = true;
    document.querySelector("[data-placeholder]").hidden = false;
    await loadLists();
  } catch (error) {
    status.textContent = errorText(error);
  }
});

document.querySelector("[data-class-member-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector(".form-status");
  const group = classDetails.class;
  const submitButton = form.querySelector("[type=submit]");
  try {
    await withButtonFeedback(submitButton, () => api("/api/admin/class-assignment", {
      method: "POST",
      body: JSON.stringify({
        studentId: form.elements.studentId.value,
        classCode: `${group.grade}-${group.section}`
      })
    }));
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
    const submitButton = form.querySelector("[type=submit]");
    try {
      await withButtonFeedback(submitButton, () => api("/api/admin/record", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      }));
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
  const submitButton = form.querySelector("[type=submit]");
  try {
    await withButtonFeedback(submitButton, () => api("/api/admin/reset-password", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    }));
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
    const submitButton = form.querySelector("[type=submit]");
    try {
      await withButtonFeedback(submitButton, () => api("/api/admin/class-record", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      }));
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
  const button = document.querySelector("[data-logout]");
  await withButtonFeedback(button, () => api("/api/admin/logout", { method: "POST", body: "{}" }));
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
