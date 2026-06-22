const languageToggle = document.querySelector("[data-language-toggle]");
const authView = document.querySelector("[data-auth-view]");
const dashboard = document.querySelector("[data-dashboard]");
const registerForm = document.querySelector("[data-register-form]");
const loginForm = document.querySelector("[data-login-form]");
const mfaForm = document.querySelector("[data-mfa-form]");
const registerStatus = document.querySelector("[data-register-status]");
const loginStatus = document.querySelector("[data-login-status]");
const mfaStatus = document.querySelector("[data-mfa-status]");
const mfaCopy = document.querySelector("[data-mfa-copy]");
const idResult = document.querySelector("[data-id-result]");
const issuedId = document.querySelector("[data-issued-id]");
const profileForm = document.querySelector("[data-profile-form]");
const profileStatus = document.querySelector("[data-profile-status]");
const dashboardLoading = document.querySelector("[data-dashboard-loading]");
const toastRegion = document.querySelector("[data-toast-region]");

const translations = {
  en: {
    title: "Success Story School | Student Account",
    skip: "Skip to account content",
    brandPortal: "Student Account",
    backWebsite: "Back to website",
    portalEyebrow: "Student Account",
    portalTitle: "Your school account starts here.",
    portalText: "Create your password and receive your own Success Story School student ID. Use it to sign in securely and access school services.",
    studentPathOne: "Create account",
    studentPathOneText: "Request the correct homeroom and receive your student ID.",
    studentPathTwo: "Sign in securely",
    studentPathTwoText: "Use your student ID and private password.",
    studentPathThree: "Follow school records",
    studentPathThreeText: "View posts, attendance, grades, fees, and bus requests.",
    accountStatus: "Account status",
    activeAccount: "Active",
    pendingApproval: "Pending school approval",
    homeroom: "Homeroom",
    schoolUpdates: "School updates",
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
    createText: "Enter the student's name, request the correct homeroom, and create a private password. School staff approve class access after review.",
    studentName: "Student full name",
    emailAddress: "Email address",
    emailRule: "Use an email address the student or family can open for login codes.",
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
    mfaTitle: "Enter verification code",
    mfaText: "A 6-digit code was sent to the saved email address.",
    mfaTextWithEmail: "A 6-digit code was sent to {email}.",
    verificationCode: "Verification code",
    verifyCode: "Verify code",
    backToSignIn: "Back to sign in",
    rateLimitNote: "After 5 incorrect attempts, sign-in is locked for 15 minutes.",
    secureBanner: "Secure student account. Grades, attendance, and other records will appear when entered by the school.",
    gradeLabel: "Grade:",
    notSelected: "Not selected",
    overview: "Overview",
    overviewSnapshot: "Student snapshot",
    accountReady: "Account ready",
    accountReadyText: "School records will appear here as soon as staff publish them.",
    accountActiveText: "Latest school records are now live in this overview.",
    classRoster: "Class placement",
    noClass: "Your class access is waiting for school approval.",
    yourClass: "Your class",
    classMembers: "Class members",
    classPrivacyNote: "Class rosters are managed privately by the school office.",
    portalDashboard: "Student dashboard",
    loadingDashboard: "Loading your dashboard...",
    loadingDashboardText: "Fetching your grades, attendance, posts, and transportation details.",
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
    classManagedNote: "Your requested grade is saved here. Class access appears after school approval.",
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
    accountCreated: "Account created. Your student ID is shown below. You can sign in after admin permission.",
    invalidLogin: "The student ID or password is incorrect.",
    waitingPermission: "Waiting for admin permission.",
    loginLocked: "Too many failed attempts. Sign-in is locked for 15 minutes.",
    mfaPrompt: "Enter the 6-digit email code sent to {email}.",
    mfaRequired: "Enter the email verification code to finish signing in.",
    invalidMfa: "The verification code is invalid or expired.",
    mfaLocked: "Too many invalid verification attempts. Please sign in again.",
    mfaUnavailable: "Email verification is not available right now. Please contact the school office.",
    genericError: "Something went wrong. Please try again.",
    registerLimited: "Too many account requests. Please try again later.",
    nameRequired: "Enter the student's full name.",
    emailError: "Enter a valid email address.",
    passwordError: "Password must be 8-128 characters and include a letter and a number.",
    invalidClass: "Choose one of the available homerooms.",
    detailsSaved: "Registration details saved.",
    signedIn: "Signed in. Loading your dashboard.",
    signedOut: "Signed out.",
    connectionError: "We could not reach the school server. Please try again.",
    busValue: "Bus requested",
    noBusValue: "No bus required",
    teacherLogin: "Teacher login",
    classPost: "Class post",
    dueDate: "Due",
    markRead: "Mark as read"
  },
  ar: {
    teacherLogin: "دخول المعلم",
    title: "مدرسة قصة نجاح | حساب الطالب",
    skip: "الانتقال إلى محتوى الحساب",
    brandPortal: "حساب الطالب",
    backWebsite: "العودة إلى الموقع",
    portalEyebrow: "حساب الطالب",
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
    emailAddress: "البريد الإلكتروني",
    emailRule: "استخدم بريدا إلكترونيا يستطيع الطالب أو العائلة فتحه للحصول على رموز الدخول.",
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
    mfaTitle: "أدخل رمز التحقق",
    mfaText: "تم إرسال رمز من 6 أرقام إلى البريد الإلكتروني المحفوظ.",
    mfaTextWithEmail: "تم إرسال رمز من 6 أرقام إلى {email}.",
    verificationCode: "رمز التحقق",
    verifyCode: "تحقق من الرمز",
    backToSignIn: "العودة إلى تسجيل الدخول",
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
    loadingDashboard: "جاري تحميل لوحة الطالب...",
    loadingDashboardText: "جاري جلب العلامات والحضور والمنشورات وتفاصيل المواصلات.",
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
    accountCreated: "Account created. Your student ID is shown below. You can sign in after admin permission.",
    invalidLogin: "رقم الطالب أو كلمة المرور غير صحيحة.",
    waitingPermission: "Waiting for admin permission.",
    loginLocked: "محاولات كثيرة غير صحيحة. تم إيقاف تسجيل الدخول لمدة 15 دقيقة.",
    mfaPrompt: "أدخل رمز البريد الإلكتروني المكون من 6 أرقام والمرسل إلى {email}.",
    mfaRequired: "أدخل رمز التحقق من البريد الإلكتروني لإكمال تسجيل الدخول.",
    invalidMfa: "رمز التحقق غير صحيح أو انتهت صلاحيته.",
    mfaLocked: "محاولات تحقق كثيرة غير صحيحة. يرجى تسجيل الدخول مرة أخرى.",
    mfaUnavailable: "التحقق عبر البريد الإلكتروني غير متاح الآن. يرجى التواصل مع مكتب المدرسة.",
    genericError: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    registerLimited: "طلبات حسابات كثيرة جدا. يرجى المحاولة لاحقا.",
    nameRequired: "أدخل اسم الطالب الكامل.",
    emailError: "أدخل بريدا إلكترونيا صحيحا.",
    passwordError: "يجب أن تكون كلمة المرور من 8 إلى 128 حرفا وأن تحتوي على حرف ورقم.",
    invalidClass: "اختر إحدى الشعب المتاحة.",
    detailsSaved: "تم حفظ بيانات التسجيل.",
    signedIn: "تم تسجيل الدخول. جاري تحميل لوحة الطالب.",
    signedOut: "تم تسجيل الخروج.",
    connectionError: "تعذر الاتصال بخادم المدرسة. يرجى المحاولة مرة أخرى.",
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
let pendingMfaChallenge = null;

const text = (key) => translations[language][key] ?? translations.en[key] ?? "";

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  let body = {};
  try {
    body = await response.json();
  } catch {
    body = {};
  }
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
    pending_approval: "waitingPermission",
    login_locked: "loginLocked",
    mfa_code_required: "mfaRequired",
    invalid_mfa: "invalidMfa",
    mfa_locked: "mfaLocked",
    mfa_not_configured: "mfaUnavailable",
    mfa_email_missing: "mfaUnavailable",
    mfa_send_failed: "mfaUnavailable",
    mfa_check_failed: "mfaUnavailable",
    register_limited: "registerLimited",
    name_required: "nameRequired",
    email_rule: "emailError",
    password_rule: "passwordError",
    invalid_class: "invalidClass"
  };
  return text(keys[error?.code] || (error instanceof TypeError ? "connectionError" : "genericError"));
}

function resetMfaForm() {
  pendingMfaChallenge = null;
  mfaForm.hidden = true;
  mfaStatus.textContent = "";
  mfaCopy.textContent = text("mfaText");
  mfaForm.reset();
}

function showMfaForm(result, endpoint) {
  pendingMfaChallenge = {
    endpoint,
    challengeId: result.challengeId,
    emailHint: result.emailHint || ""
  };
  loginForm.hidden = true;
  registerForm.hidden = true;
  mfaForm.hidden = false;
  loginStatus.textContent = "";
  registerStatus.textContent = "";
  mfaStatus.textContent = text("mfaRequired");
  mfaCopy.textContent = pendingMfaChallenge.emailHint
    ? text("mfaTextWithEmail").replace("{email}", pendingMfaChallenge.emailHint)
    : text("mfaText");
  mfaForm.elements.code.value = "";
  mfaForm.elements.code.focus();
}

function showToast(message, type = "info") {
  if (!toastRegion || !message) {
    return;
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.dataset.type = type;
  toast.textContent = message;
  toastRegion.appendChild(toast);
  window.setTimeout(() => {
    toast.remove();
  }, 4200);
}

function setDashboardLoading(isLoading) {
  dashboard.dataset.loading = isLoading ? "true" : "false";
  dashboard.setAttribute("aria-busy", isLoading ? "true" : "false");
  if (dashboardLoading) {
    dashboardLoading.hidden = !isLoading;
  }
}

function applyLanguage(nextLanguage) {
  language = nextLanguage === "ar" ? "ar" : "en";
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.title = text("title");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = text(element.dataset.i18n);
  });
  if (pendingMfaChallenge) {
    mfaCopy.textContent = pendingMfaChallenge.emailHint
      ? text("mfaTextWithEmail").replace("{email}", pendingMfaChallenge.emailHint)
      : text("mfaText");
    mfaStatus.textContent = text("mfaRequired");
  }
  languageToggle.textContent = language === "ar" ? "English" : "العربية";
  languageToggle.setAttribute(
    "aria-label",
    language === "ar" ? "View account in English" : "عرض الحساب باللغة العربية"
  );
  refreshUserDetails();
  renderRecords(currentRecords);
  renderClass();
  try {
    localStorage.setItem("sss-language", language);
  } catch {
    // The account remains usable if language preference cannot be saved.
  }
}

function refreshUserDetails() {
  if (!currentUser) {
    return;
  }
  document.querySelector("[data-student-name]").textContent = currentUser.name;
  document.querySelector("[data-welcome-name]").textContent = currentUser.name;
  document.querySelector("[data-student-id]").textContent = currentUser.studentId;
  const accountState = document.querySelector("[data-student-account-state]");
  if (accountState) {
    accountState.removeAttribute("data-i18n");
    accountState.textContent = currentUser.approvalStatus === "approved" ? text("activeAccount") : text("pendingApproval");
  }
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
  const summaryTransport = document.querySelector("[data-summary-transport]");
  if (summaryTransport) {
    summaryTransport.removeAttribute("data-i18n");
    summaryTransport.textContent = busLabel.textContent;
  }
}

function renderClass() {
  const emptyClass = document.querySelector("[data-empty-class]");
  const classDetails = document.querySelector("[data-class-details]");
  const overviewClass = document.querySelector("[data-overview-class]");
  const summaryClass = document.querySelector("[data-summary-class]");
  if (!currentClass) {
    emptyClass.hidden = false;
    classDetails.hidden = true;
    overviewClass.textContent = "--";
    if (summaryClass) {
      summaryClass.textContent = "--";
    }
    return;
  }
  emptyClass.hidden = true;
  classDetails.hidden = false;
  const className = classroomName(currentClass);
  document.querySelector("[data-class-name]").textContent = className;
  overviewClass.textContent = className;
  if (summaryClass) {
    summaryClass.textContent = className;
  }
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

function metricHasValue(value) {
  return value !== "--" && value !== "";
}

function updateMetric(name, value) {
  const card = document.querySelector(`[data-metric-card="${name}"]`);
  const status = document.querySelector(`[data-metric-status="${name}"]`);
  const hasValue = metricHasValue(value);
  if (card) {
    card.dataset.state = hasValue ? "ready" : "empty";
  }
  if (status) {
    status.hidden = hasValue;
    status.textContent = text("notPosted");
  }
}

function formatPostMeta(primary, audience) {
  const parts = [];
  if (primary) {
    parts.push(primary);
  }
  if (audience === "class") {
    parts.push(text("classPost"));
  }
  return parts.join(" - ");
}

function postMatches(post, target) {
  return post.id === target.id && post.audience === target.audience;
}

async function dismissPost(type, post) {
  await api("/api/portal/dismiss", {
    method: "POST",
    body: JSON.stringify({ type, audience: post.audience, postId: post.id })
  });
  const collection = type === "homework" ? "homework" : "announcements";
  currentRecords = {
    ...currentRecords,
    [collection]: (currentRecords[collection] || []).filter((item) => !postMatches(item, post))
  };
  renderRecords(currentRecords);
}

function addDismissButton(item, type, post) {
  const button = document.createElement("button");
  button.className = "dismiss-action";
  button.type = "button";
  button.textContent = text("markRead");
  button.addEventListener("click", async () => {
    button.disabled = true;
    try {
      await dismissPost(type, post);
    } catch (error) {
      button.disabled = false;
      showToast(messageForError(error), "error");
    }
  });
  item.appendChild(button);
}

function renderOverviewCards({ grades, attendance, homework, announcements, fees }) {
  const hasRecords = grades.length + attendance.length + homework.length + announcements.length + fees.length > 0;
  const title = document.querySelector("[data-overview-title]");
  const subtitle = document.querySelector("[data-overview-subtitle]");
  title.textContent = currentUser ? `${currentUser.name.split(" ")[0]}'s account` : text("accountReady");
  subtitle.textContent = hasRecords ? text("accountActiveText") : text("accountReadyText");
  const summaryUpdates = document.querySelector("[data-summary-updates]");
  if (summaryUpdates) {
    summaryUpdates.textContent = homework.length + announcements.length;
  }

  const latestAnnouncement = announcements[0];
  const announcementCard = document.querySelector('[data-overview-card="announcements"]');
  const announcementMeta = document.querySelector("[data-overview-announcement-meta]");
  document.querySelector("[data-overview-announcements-count]").textContent = announcements.length;
  document.querySelector("[data-overview-announcements-badge]").textContent = announcements.length;
  announcementCard.dataset.state = latestAnnouncement ? "ready" : "empty";
  document.querySelector("[data-overview-announcement-title]").textContent = latestAnnouncement
    ? latestAnnouncement.title
    : text("announcements");
  document.querySelector("[data-overview-announcement-detail]").textContent = latestAnnouncement
    ? latestAnnouncement.details
    : text("noAnnouncements");
  const announcementMetaText = latestAnnouncement
    ? formatPostMeta(latestAnnouncement.posted_at, latestAnnouncement.audience)
    : "";
  announcementMeta.textContent = announcementMetaText;
  announcementMeta.hidden = !announcementMetaText;

  const latestHomework = homework[0];
  const homeworkCard = document.querySelector('[data-overview-card="homework"]');
  const homeworkMeta = document.querySelector("[data-overview-homework-meta]");
  document.querySelector("[data-overview-homework-count]").textContent = homework.length;
  document.querySelector("[data-overview-homework-badge]").textContent = homework.length;
  homeworkCard.dataset.state = latestHomework ? "ready" : "empty";
  document.querySelector("[data-overview-homework-title]").textContent = latestHomework
    ? latestHomework.subject
    : text("homework");
  document.querySelector("[data-overview-homework-detail]").textContent = latestHomework
    ? latestHomework.details
    : text("noHomework");
  const homeworkMetaText = latestHomework
    ? formatPostMeta(latestHomework.due_date ? `${text("dueDate")} ${latestHomework.due_date}` : "", latestHomework.audience)
    : "";
  homeworkMeta.textContent = homeworkMetaText;
  homeworkMeta.hidden = !homeworkMetaText;

  const registrationCard = document.querySelector('[data-overview-card="registration"]');
  const registrationBadge = document.querySelector("[data-overview-registration-badge]");
  const registrationDetail = document.querySelector("[data-overview-registration-detail]");
  const transportLabel = currentUser?.transport === "bus"
    ? text("busValue")
    : currentUser?.transport === "none"
      ? text("noBusValue")
      : text("notSelected");
  registrationCard.dataset.state = currentUser?.transport ? "ready" : "empty";
  registrationBadge.textContent = transportLabel;
  registrationDetail.textContent = currentUser?.transport
    ? `${text("transportRequest")}: ${transportLabel}`
    : text("completeRegistration");
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
    item.className = "post-item";
    item.dataset.kind = "homework";
    const subject = document.createElement("span");
    const details = document.createElement("h4");
    const meta = document.createElement("small");
    subject.textContent = assignment.subject;
    if (assignment.audience === "class") {
      subject.textContent = `${assignment.subject} - ${text("classPost")}`;
    }
    details.textContent = assignment.details;
    meta.textContent = formatPostMeta(
      assignment.due_date ? `${text("dueDate")} ${assignment.due_date}` : "",
      assignment.audience
    );
    item.append(subject, details);
    if (meta.textContent) {
      item.appendChild(meta);
    }
    addDismissButton(item, "homework", assignment);
    homeworkList.appendChild(item);
  });

  showCollection("[data-empty-announcements]", "[data-announcements-list]", announcements.length > 0);
  const announcementList = document.querySelector("[data-announcements-list]");
  announcementList.replaceChildren();
  announcements.forEach((notice) => {
    const item = document.createElement("article");
    item.className = "post-item";
    item.dataset.kind = "announcement";
    const date = document.createElement("time");
    const title = document.createElement("h4");
    const details = document.createElement("p");
    date.textContent = formatPostMeta(notice.posted_at, notice.audience);
    title.textContent = notice.title;
    details.textContent = notice.details;
    item.append(date, title, details);
    addDismissButton(item, "announcement", notice);
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
  const averageOverview = gradeValues.length
    ? `${Math.round(gradeValues.reduce((sum, value) => sum + value, 0) / gradeValues.length)}%`
    : "--";
  document.querySelector("[data-average-overview]").textContent = averageOverview;
  updateMetric("average", averageOverview);
  const attendanceOverview = attendance.length
    ? `${Math.round((attendance.filter((record) => record.status === "present").length / attendance.length) * 100)}%`
    : "--";
  document.querySelector("[data-attendance-overview]").textContent = attendanceOverview;
  updateMetric("attendance", attendanceOverview);
  const dueAmount = fees.filter((fee) => fee.status === "due").reduce((sum, fee) => sum + Number(fee.amount), 0);
  const feesOverview = fees.length ? `${dueAmount.toFixed(2)} JOD` : "--";
  document.querySelector("[data-fees-overview]").textContent = feesOverview;
  updateMetric("fees", feesOverview);
  renderOverviewCards({ grades, attendance, homework, announcements, fees });
}

function selectAuthTab(tabName) {
  resetMfaForm();
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
  authView.hidden = true;
  dashboard.hidden = false;
  setDashboardLoading(true);
  openPanel("overview");
  try {
    const portal = await api("/api/portal");
    currentUser = portal.user;
    currentRecords = portal.records;
    currentClass = portal.class;
    profileForm.elements.transport.value = currentUser.transport || "";
    refreshUserDetails();
    renderClass();
    renderRecords(currentRecords);
    setDashboardLoading(false);
    return true;
  } catch (error) {
    setDashboardLoading(false);
    dashboard.hidden = true;
    authView.hidden = false;
    loginStatus.textContent = messageForError(error);
    showToast(messageForError(error), "error");
    return false;
  }
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
      body: JSON.stringify({
        name: values.get("name"),
        email: values.get("email"),
        classCode: values.get("classCode"),
        password
      })
    });
    registerStatus.textContent = text("accountCreated");
    issuedId.textContent = result.studentId;
    idResult.hidden = false;
    loginForm.elements.studentId.value = result.studentId;
    registerForm.reset();
    showToast(text("accountCreated"), "success");
  } catch (error) {
    registerStatus.textContent = messageForError(error);
    showToast(messageForError(error), "error");
  }
});

document.querySelector("[data-go-signin]").addEventListener("click", () => {
  selectAuthTab("signin");
  loginForm.elements.password.focus();
});

document.querySelector("[data-mfa-cancel]").addEventListener("click", () => {
  selectAuthTab("signin");
  loginForm.elements.password.focus();
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginStatus.textContent = "";
  resetMfaForm();
  loginForm.hidden = false;
  const values = new FormData(loginForm);
  try {
    const result = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        studentId: values.get("studentId"),
        password: values.get("password")
      })
    });
    if (result.mfaRequired) {
      showMfaForm(result, "/api/auth/mfa");
      showToast(text("mfaRequired"), "info");
      return;
    }
    const opened = await openDashboard();
    if (opened) {
      loginForm.reset();
      showToast(text("signedIn"), "success");
    }
  } catch (error) {
    loginStatus.textContent = messageForError(error);
    showToast(messageForError(error), "error");
  }
});

mfaForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  mfaStatus.textContent = "";
  if (!pendingMfaChallenge) {
    selectAuthTab("signin");
    return;
  }
  const values = new FormData(mfaForm);
  try {
    await api(pendingMfaChallenge.endpoint, {
      method: "POST",
      body: JSON.stringify({
        challengeId: pendingMfaChallenge.challengeId,
        code: values.get("code")
      })
    });
    const opened = await openDashboard();
    if (opened) {
      loginForm.reset();
      resetMfaForm();
      showToast(text("signedIn"), "success");
    }
  } catch (error) {
    mfaStatus.textContent = messageForError(error);
    showToast(messageForError(error), "error");
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
    renderRecords(currentRecords);
    profileStatus.textContent = text("detailsSaved");
    showToast(text("detailsSaved"), "success");
  } catch (error) {
    profileStatus.textContent = messageForError(error);
    showToast(messageForError(error), "error");
  }
});

document.querySelector("[data-logout]").addEventListener("click", async () => {
  try {
    await api("/api/auth/logout", { method: "POST", body: "{}" });
  } catch {
    // Local sign-out should still clear the screen if the network blips.
  }
  currentUser = null;
  currentClass = null;
  dashboard.hidden = true;
  authView.hidden = false;
  profileStatus.textContent = "";
  selectAuthTab("signin");
  showToast(text("signedOut"), "success");
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
      openDashboard();
    }
  })
  .catch(() => {});
