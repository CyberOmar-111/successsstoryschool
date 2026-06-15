(() => {
if (!window.React || !window.ReactDOM) {
  return;
}

const { useEffect, useMemo, useState } = React;
const { createRoot } = ReactDOM;
const h = React.createElement;

function svgIcon(nodes) {
  return function SvgIcon({ size = 24, strokeWidth = 2, ...props }) {
    return h(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
        ...props
      },
      nodes.map(([tag, attrs], index) => h(tag, { ...attrs, key: index }))
    );
  };
}

const ArrowRight = svgIcon([
  ["path", { d: "M5 12h14" }],
  ["path", { d: "m12 5 7 7-7 7" }]
]);
const BookOpen = svgIcon([
  ["path", { d: "M12 7v14" }],
  ["path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H12V5H6.5A2.5 2.5 0 0 0 4 7.5v12Z" }],
  ["path", { d: "M20 19.5A2.5 2.5 0 0 0 17.5 17H12V5h5.5A2.5 2.5 0 0 1 20 7.5v12Z" }]
]);
const Bus = svgIcon([
  ["path", { d: "M6 17h12" }],
  ["path", { d: "M6 17v2" }],
  ["path", { d: "M18 17v2" }],
  ["rect", { x: "4", y: "5", width: "16", height: "12", rx: "2" }],
  ["path", { d: "M4 10h16" }],
  ["path", { d: "M8 14h.01" }],
  ["path", { d: "M16 14h.01" }]
]);
const CalendarDays = svgIcon([
  ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 14h.01" }],
  ["path", { d: "M12 14h.01" }],
  ["path", { d: "M16 14h.01" }],
  ["path", { d: "M8 18h.01" }],
  ["path", { d: "M12 18h.01" }]
]);
const CheckCircle2 = svgIcon([
  ["circle", { cx: "12", cy: "12", r: "9" }],
  ["path", { d: "m8 12 2.5 2.5L16 9" }]
]);
const ClipboardList = svgIcon([
  ["path", { d: "M9 5h6" }],
  ["path", { d: "M9 3h6v4H9z" }],
  ["rect", { x: "5", y: "5", width: "14", height: "16", rx: "2" }],
  ["path", { d: "M9 12h6" }],
  ["path", { d: "M9 16h6" }]
]);
const Globe2 = svgIcon([
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M2 12h20" }],
  ["path", { d: "M12 2a15 15 0 0 1 0 20" }],
  ["path", { d: "M12 2a15 15 0 0 0 0 20" }]
]);
const GraduationCap = svgIcon([
  ["path", { d: "M22 10 12 5 2 10l10 5 10-5Z" }],
  ["path", { d: "M6 12v5c3 2 9 2 12 0v-5" }],
  ["path", { d: "M22 10v6" }]
]);
const LayoutDashboard = svgIcon([
  ["rect", { x: "3", y: "3", width: "7", height: "8", rx: "1" }],
  ["rect", { x: "14", y: "3", width: "7", height: "5", rx: "1" }],
  ["rect", { x: "14", y: "12", width: "7", height: "9", rx: "1" }],
  ["rect", { x: "3", y: "15", width: "7", height: "6", rx: "1" }]
]);
const MapPin = svgIcon([
  ["path", { d: "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" }],
  ["circle", { cx: "12", cy: "10", r: "3" }]
]);
const Menu = svgIcon([
  ["path", { d: "M4 6h16" }],
  ["path", { d: "M4 12h16" }],
  ["path", { d: "M4 18h16" }]
]);
const MessageCircle = svgIcon([
  ["path", { d: "M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.2A8.5 8.5 0 1 1 21 11.5Z" }]
]);
const Phone = svgIcon([
  ["path", { d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" }]
]);
const School = svgIcon([
  ["path", { d: "M3 21h18" }],
  ["path", { d: "M5 21V8l7-4 7 4v13" }],
  ["path", { d: "M9 21v-6h6v6" }],
  ["path", { d: "M9 10h.01" }],
  ["path", { d: "M15 10h.01" }]
]);
const ShieldCheck = svgIcon([
  ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }],
  ["path", { d: "m9 12 2 2 4-5" }]
]);
const Trophy = svgIcon([
  ["path", { d: "M8 21h8" }],
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M7 4h10v5a5 5 0 0 1-10 0V4Z" }],
  ["path", { d: "M5 5H3v3a4 4 0 0 0 4 4" }],
  ["path", { d: "M19 5h2v3a4 4 0 0 1-4 4" }]
]);
const UsersRound = svgIcon([
  ["path", { d: "M18 21a6 6 0 0 0-12 0" }],
  ["circle", { cx: "12", cy: "8", r: "5" }],
  ["path", { d: "M22 21a5 5 0 0 0-4-4.8" }],
  ["path", { d: "M2 21a5 5 0 0 1 4-4.8" }]
]);
const X = svgIcon([
  ["path", { d: "M18 6 6 18" }],
  ["path", { d: "m6 6 12 12" }]
]);

const schoolEmail = "abrar.rashdan84@gmail.com";
const phoneNumber = "07 9946 4848";
const phoneHref = "tel:+962799464848";
const whatsappHref = "https://wa.me/00962799464848";
const mapsHref =
  "https://www.google.com/maps/search/?api=1&query=32.532984%2C35.863854";

const copy = {
  en: {
    title: "Success Story School | Irbid",
    description:
      "Success Story School in Irbid offers Grades 1 to 10, Arabic-first learning, English education, the Collins Curriculum, school activities, and secure school accounts.",
    skip: "Skip to content",
    announcementStrong: "Admissions inquiries are open.",
    announcementText: "Families can ask about Grades 1 to 10 now.",
    applyToday: "Start inquiry",
    navAcademics: "Academics",
    navLife: "Student life",
    navPortals: "School Accounts",
    navAdmissions: "Admissions",
    navContact: "Contact",
    languageLabel: "العربية",
    languageAria: "View site in Arabic",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    heroEyebrow: "Private school in Irbid",
    heroTitle: "Success Story School",
    heroText:
      "Arabic-first learning, strong English education, Collins Curriculum, safe routines, school activities, and online school accounts for families and staff.",
    beginEnrollment: "Begin enrollment",
    openPortals: "Portal Login",
    callOffice: "Call office",
    grades: "Grades 1-10",
    curriculum: "Collins Curriculum",
    language: "Arabic + English",
    transport: "Bus transportation",
    quickPortalTitle: "School accounts",
    quickPortalText:
      "Students and authorized staff sign in through protected school account paths.",
    studentPortal: "Student Account",
    studentPortalText:
      "Create a student account, view class details, grades, attendance, homework, announcements, fees, and bus requests.",
    teacherPortal: "Teacher Account",
    teacherPortalText:
      "Teachers manage assigned classes, attendance, homework, announcements, and grades.",
    adminPortal: "Staff Access",
    adminPortalText:
      "Authorized staff use private access provided by the school.",
    open: "Open",
    overviewEyebrow: "School experience",
    overviewTitle: "A modern school rhythm for families",
    overviewText:
      "The public website explains the school clearly, while secure school accounts handle day-to-day academic records.",
    parentMode: "Parents",
    studentMode: "Students",
    staffMode: "Staff",
    parentModeTitle: "Simple enrollment path",
    parentModeText:
      "Parents can understand grades, curriculum, activities, transportation, and contact the school in one visit.",
    studentModeTitle: "A student account that grows",
    studentModeText:
      "Students receive a school ID and can follow updates as records are posted by the school.",
    staffModeTitle: "Cleaner staff operations",
    staffModeText:
      "Teachers and administrators work from protected dashboards connected to school records.",
    academicsEyebrow: "Academics",
    academicsTitle: "Learning designed for each stage",
    academicsText:
      "From foundation years to Grade 10, students build language, confidence, independence, and focused academic habits.",
    foundation: "Foundation Years",
    foundationText: "A welcoming start to core learning, language, and discovery.",
    upperPrimary: "Upper Primary",
    upperPrimaryText: "Developing confidence through academic skills and creativity.",
    middle: "Middle School",
    middleText: "Deeper learning, collaboration, and stronger independence.",
    secondary: "Secondary Level",
    secondaryText: "Focused study and preparation for the next educational step.",
    lifeEyebrow: "Student life",
    lifeTitle: "Learning, activities, and care in one place",
    lifeText:
      "Students take part in classroom learning, art, sports, trips, celebrations, and competitions.",
    lifeOne: "Art, sports, and creative projects",
    lifeTwo: "School trips and celebration days",
    lifeThree: "Class announcements and homework updates",
    admissionsEyebrow: "Admissions",
    admissionsTitle: "A clear enrollment journey",
    stepOne: "Inquire",
    stepOneText: "Share the student's grade and family contact details.",
    stepTwo: "Visit",
    stepTwoText: "Tour the school behind Irbid Specialty Hospital.",
    stepThree: "Apply",
    stepThreeText: "Receive guidance for documents and next steps.",
    stepFour: "Welcome",
    stepFourText: "Prepare for classes, routines, and transportation.",
    contactEyebrow: "Get in touch",
    contactTitle: "Visit or contact Success Story School",
    contactText:
      "Send an inquiry, call the office, or open directions to the campus in Irbid.",
    parentName: "Parent name",
    parentPhone: "Parent phone number",
    interestedGrade: "Interested grade level",
    chooseGrade: "Choose a grade",
    message: "Message",
    messagePlaceholder: "Tell us how we can help.",
    sendInquiry: "Open Gmail draft",
    inquiryNote:
      "Gmail opens a prepared message. Review it, then press Send from your account.",
    inquiryOpening: "Opening a prepared Gmail draft for the school office.",
    address: "Behind Irbid Specialty Hospital, Irbid, Jordan",
    exactLocation: "Exact location: 32.532984, 35.863854",
    directions: "Directions",
    whatsapp: "WhatsApp",
    email: "Email",
    heroCardKicker: "Admissions desk",
    heroCardTitle: "A clear path from inquiry to first day.",
    heroCardText: "Families can contact the office, visit the campus, and then use secure school accounts once access is issued.",
    heroCardPointOne: "One school account system",
    heroCardPointTwo: "Student and staff account access",
    heroCardPointThree: "Class records connected to school accounts",
    heroStatGrades: "Grade 1 to Grade 10",
    heroStatPortal: "school accounts",
    heroStatLocation: "Irbid campus",
    heroStatLanguage: "Arabic + English",
    proofEyebrow: "Built for Success Story School",
    proofTitle: "A live school system for daily communication.",
    proofText: "This site was built for Success Story School so families can understand the school quickly and staff can manage accounts without scattered messages. It supports real workflows: admissions questions, class records, homework, announcements, transportation, and secure account access.",
    proofAcademicsTitle: "School-ready clarity",
    proofAcademicsText: "The live site puts public school information and private account workflows into one calm path instead of separate links and messages.",
    proofPortalTitle: "Protected school accounts",
    proofPortalText: "Students and authorized staff each have a protected sign-in path with tools made for their role.",
    proofCareTitle: "Real records only",
    proofCareText: "Grades, attendance, homework, announcements, fees, and bus requests begin empty and appear only when school staff publish real data.",
    proofAccessTitle: "Direct contact paths",
    proofAccessText: "Families can call, message, email, open directions, or start a prepared Gmail inquiry from the same page.",
    portalPreviewEyebrow: "School account system",
    portalPreviewTitle: "Secure accounts for real school operations.",
    portalPreviewText: "The site introduces protected account areas without exposing private staff tools on the public homepage. Personal values appear only after authorized school staff publish them.",
    previewStudent: "Student record",
    previewClass: "Grade 8 B",
    previewAttendance: "Attendance",
    previewHomework: "Homework",
    previewFees: "Fees",
    previewStatusPosted: "When posted",
    previewStatusReady: "Ready",
    previewStatusSecure: "Secure",
    previewRoster: "Approval status",
    previewAverage: "Grades",
    previewAnnouncement: "Announcements",
    howWorksEyebrow: "How it works",
    howWorksTitle: "A clear path from inquiry to school account.",
    howWorksText: "The flow is intentionally simple: families learn about the school, the office issues access, and records appear only after staff publish them.",
    howWorksInquiryTitle: "Start with a real inquiry",
    howWorksInquiryText: "Families share the student grade, contact details, and questions so the school can respond directly.",
    howWorksAccountTitle: "Issue protected accounts",
    howWorksAccountText: "Students and authorized staff use separate sign-in paths with server-backed sessions, clean account URLs, and role-specific tools.",
    howWorksRecordsTitle: "Post records from staff dashboards",
    howWorksRecordsText: "Attendance, grades, homework, announcements, fees, and class access come from teacher or administrator actions.",
    howWorksFollowupTitle: "Keep the family view clean",
    howWorksFollowupText: "The student overview removes waiting labels as soon as school data is posted, so the page stays useful.",
    feedbackEyebrow: "School feedback",
    feedbackTitle: "Feedback from the school community",
    feedbackText: "Published feedback will appear here after Success Story School approves real comments from families or staff.",
    feedbackSlotParent: "Parent feedback awaiting approval",
    feedbackSlotTeacher: "Teacher feedback awaiting approval",
    feedbackSlotAdmin: "Administration feedback awaiting approval",
    feedbackEmpty: "Waiting for school approval",
    trustEyebrow: "Family support",
    trustTitle: "Helpful school information in one place.",
    trustText: "Families can use the website to prepare a visit, ask admissions questions, open directions, and follow school updates after accounts are issued.",
    trustBadgeStack: "Admissions inquiry",
    trustBadgeBackend: "Campus directions",
    trustBadgeDatabase: "Grades 1 to 10 information",
    trustBadgeSessions: "Homework and announcements",
    trustBadgePasswords: "Attendance, grades, fees, and bus requests",
    trustBadgeHonest: "School-approved feedback",
    faqEyebrow: "FAQ",
    faqTitle: "Straight answers before families sign in.",
    faqOneQ: "Can families use the site before a student account is issued?",
    faqOneA: "Yes. The public website explains academics, student life, admissions, location, and contact options without requiring an account.",
    faqTwoQ: "Why do some student records start empty?",
    faqTwoA: "Empty records are intentional. Attendance, grades, homework, fees, and announcements appear only after authorized school staff post real information.",
    faqThreeQ: "Does the portal invent academic results?",
    faqThreeA: "No. Account pages show only values posted by authorized school staff.",
    faqFourQ: "Who updates student information?",
    faqFourA: "Authorized school staff update class records, homework, announcements, attendance, and grades from protected accounts.",
    footerText: "Success Story School. Building the new generation."
  },
  ar: {
    title: "مدرسة قصة نجاح | إربد",
    description:
      "مدرسة قصة نجاح في إربد تقدم التعليم من الصف الأول حتى العاشر مع تعليم عربي وإنجليزي ومنهاج Collins وحسابات مدرسية آمنة.",
    skip: "الانتقال إلى المحتوى",
    announcementStrong: "التسجيل للعام 2026-2027 مفتوح.",
    announcementText: "يمكن للعائلات الاستفسار عن الصفوف من الأول حتى العاشر الآن.",
    applyToday: "ابدأ الاستفسار",
    navAcademics: "الأكاديميات",
    navLife: "حياة الطلاب",
    navPortals: "حسابات المدرسة",
    navAdmissions: "التسجيل",
    navContact: "تواصل معنا",
    languageLabel: "English",
    languageAria: "View site in English",
    menuOpen: "فتح القائمة",
    menuClose: "إغلاق القائمة",
    heroEyebrow: "مدرسة خاصة في إربد",
    heroTitle: "مدرسة قصة نجاح",
    heroText:
      "تعليم عربي أولاً، وتقوية اللغة الإنجليزية، ومنهاج Collins، وروتين آمن، وأنشطة مدرسية، وحسابات إلكترونية للعائلات والكوادر.",
    beginEnrollment: "ابدأ التسجيل",
    openPortals: "افتح الحسابات",
    callOffice: "اتصل بالإدارة",
    grades: "الصفوف 1-10",
    curriculum: "منهاج Collins",
    language: "عربي + إنجليزي",
    transport: "مواصلات بالباص",
    quickPortalTitle: "حسابات المدرسة",
    quickPortalText:
      "يسجل الطلاب والمعلمون والإدارة الدخول من مركز حسابات واحد وواضح.",
    studentPortal: "حساب الطالب",
    studentPortalText:
      "إنشاء حساب طالب، ومتابعة الصف، العلامات، الحضور، الواجبات، الإعلانات، الرسوم، وطلب المواصلات.",
    teacherPortal: "حساب المعلم",
    teacherPortalText:
      "يدير المعلم الصفوف المسندة، الحضور، الواجبات، الإعلانات، والعلامات.",
    adminPortal: "Staff Access",
    adminPortalText:
      "Authorized staff use private access provided by the school.",
    open: "فتح",
    overviewEyebrow: "تجربة المدرسة",
    overviewTitle: "نظام مدرسي حديث للعائلات",
    overviewText:
      "يعرض الموقع معلومات المدرسة بوضوح، بينما تتولى حسابات المدرسة الآمنة السجلات الأكاديمية اليومية.",
    parentMode: "الأهل",
    studentMode: "الطلاب",
    staffMode: "الكوادر",
    parentModeTitle: "مسار تسجيل واضح",
    parentModeText:
      "يمكن للأهل معرفة الصفوف، المنهاج، الأنشطة، المواصلات، والتواصل مع المدرسة بسهولة.",
    studentModeTitle: "حساب طالب يتطور",
    studentModeText:
      "يحصل الطالب على رقم مدرسي ويتابع التحديثات عند نشر السجلات من المدرسة.",
    staffModeTitle: "إدارة مدرسية أوضح",
    staffModeText:
      "يعمل المعلمون والإداريون من لوحات محمية مرتبطة بالنظام الحالي.",
    academicsEyebrow: "الأكاديميات",
    academicsTitle: "تعلم مناسب لكل مرحلة",
    academicsText:
      "من السنوات التأسيسية حتى الصف العاشر، يبني الطلاب اللغة والثقة والاستقلالية والعادات الدراسية.",
    foundation: "السنوات التأسيسية",
    foundationText: "بداية داعمة للتعلم الأساسي واللغة والاكتشاف.",
    upperPrimary: "المرحلة الأساسية العليا",
    upperPrimaryText: "تنمية الثقة من خلال المهارات الأكاديمية والإبداع.",
    middle: "المرحلة المتوسطة",
    middleText: "تعلم أعمق وتعاون واستقلالية أقوى.",
    secondary: "المرحلة الثانوية",
    secondaryText: "دراسة مركزة واستعداد للخطوة التعليمية التالية.",
    lifeEyebrow: "حياة الطلاب",
    lifeTitle: "تعلم وأنشطة ورعاية في مكان واحد",
    lifeText:
      "يشارك الطلاب في التعلم الصفي، الفن، الرياضة، الرحلات، الاحتفالات، والمسابقات.",
    lifeOne: "فن ورياضة ومشاريع إبداعية",
    lifeTwo: "رحلات مدرسية وأيام احتفالية",
    lifeThree: "إعلانات الصف وتحديثات الواجبات",
    admissionsEyebrow: "التسجيل",
    admissionsTitle: "رحلة تسجيل واضحة",
    stepOne: "استفسار",
    stepOneText: "شارك صف الطالب وبيانات تواصل العائلة.",
    stepTwo: "زيارة",
    stepTwoText: "زر المدرسة خلف مستشفى إربد التخصصي.",
    stepThree: "تقديم",
    stepThreeText: "استلم إرشادات الوثائق والخطوات التالية.",
    stepFour: "ترحيب",
    stepFourText: "استعد للدوام والروتين والمواصلات.",
    contactEyebrow: "تواصل معنا",
    contactTitle: "زر أو تواصل مع مدرسة قصة نجاح",
    contactText:
      "أرسل استفساراً، اتصل بالإدارة، أو افتح الاتجاهات إلى المدرسة في إربد.",
    parentName: "اسم ولي الأمر",
    parentPhone: "رقم هاتف ولي الأمر",
    interestedGrade: "الصف المطلوب",
    chooseGrade: "اختر الصف",
    message: "الرسالة",
    messagePlaceholder: "اكتب كيف يمكننا مساعدتك.",
    sendInquiry: "افتح مسودة Gmail",
    inquiryNote:
      "يفتح Gmail رسالة جاهزة. راجعها ثم اضغط إرسال من حسابك.",
    inquiryOpening: "يتم فتح مسودة Gmail جاهزة لإدارة المدرسة.",
    address: "خلف مستشفى إربد التخصصي، إربد، الأردن",
    exactLocation: "الموقع الدقيق: 32.532984, 35.863854",
    directions: "الاتجاهات",
    whatsapp: "واتساب",
    email: "البريد",
    heroCardKicker: "مكتب التسجيل",
    heroCardTitle: "مسار واضح من الاستفسار إلى أول يوم.",
    heroCardText: "تستطيع العائلات التواصل مع الإدارة، زيارة المدرسة، ثم استخدام حسابات المدرسة الآمنة بعد إصدار الوصول.",
    heroCardPointOne: "نظام حسابات مدرسي واحد",
    heroCardPointTwo: "حسابات للطلاب والمعلمين والإدارة",
    heroCardPointThree: "سجلات صفية مرتبطة بالنظام",
    heroStatGrades: "مستويات دراسية",
    heroStatPortal: "حسابات آمنة",
    heroStatLocation: "مبنى إربد",
    heroStatLanguage: "عربي + إنجليزي",
    proofEyebrow: "لماذا تثق العائلات بنا",
    proofTitle: "موقع مدرسي يشعر بنفس تنظيم المدرسة.",
    proofText: "تجربة جديدة تجمع المبنى، التسجيل، الأكاديميات، حسابات المدرسة، والتواصل في مسار واضح للأهل.",
    proofAcademicsTitle: "أكاديميات منظمة",
    proofAcademicsText: "رحلة واضحة من الصف الأول حتى العاشر مع تعلم عربي أولاً وتعليم إنجليزي.",
    proofPortalTitle: "حسابات مدرسية جدية",
    proofPortalText: "للطلاب والمعلمين والإدارة حسابات محمية مرتبطة بسجلات المدرسة.",
    proofCareTitle: "حياة طلابية واضحة",
    proofCareText: "الأنشطة والرحلات والاحتفالات وتحديثات الصف تظهر كجزء من هوية المدرسة.",
    proofAccessTitle: "تواصل سهل",
    proofAccessText: "يمكن للأهل الاتصال، المراسلة، الإيميل، فتح الاتجاهات، أو بدء استفسار من مكان واحد.",
    portalPreviewEyebrow: "عمليات مدرسية حية",
    portalPreviewTitle: "حسابات مدرسية تبدو مرتبطة بنظام أكاديمي حقيقي.",
    portalPreviewText: "يعرض الموقع الأدوات الآمنة التي يستخدمها الأهل والمعلمون والإدارة يومياً.",
    previewStudent: "سجل طالب",
    previewClass: "الصف 8 B",
    previewAttendance: "الحضور",
    previewHomework: "الواجبات",
    previewFees: "الرسوم",
    previewStatusPosted: "منشور",
    previewStatusReady: "جاهز",
    previewStatusSecure: "آمن",
    previewRoster: "قائمة الصف",
    previewAverage: "المعدل",
    previewAnnouncement: "إعلان",
    footerText: "مدرسة قصة نجاح. نبني الجيل الجديد."
  }
};

const truthCopyKeys = [
  "announcementStrong",
  "heroStatGrades",
  "heroStatPortal",
  "heroStatLocation",
  "heroStatLanguage",
  "proofEyebrow",
  "proofTitle",
  "proofText",
  "proofAcademicsTitle",
  "proofAcademicsText",
  "proofPortalTitle",
  "proofPortalText",
  "proofCareTitle",
  "proofCareText",
  "proofAccessTitle",
  "proofAccessText",
  "portalPreviewEyebrow",
  "portalPreviewTitle",
  "portalPreviewText",
  "previewStatusPosted",
  "previewStatusReady",
  "previewStatusSecure",
  "previewRoster",
  "previewAverage",
  "previewAnnouncement",
  "howWorksEyebrow",
  "howWorksTitle",
  "howWorksText",
  "howWorksInquiryTitle",
  "howWorksInquiryText",
  "howWorksAccountTitle",
  "howWorksAccountText",
  "howWorksRecordsTitle",
  "howWorksRecordsText",
  "howWorksFollowupTitle",
  "howWorksFollowupText",
  "feedbackEyebrow",
  "feedbackTitle",
  "feedbackText",
  "feedbackSlotParent",
  "feedbackSlotTeacher",
  "feedbackSlotAdmin",
  "feedbackEmpty",
  "trustEyebrow",
  "trustTitle",
  "trustText",
  "trustBadgeStack",
  "trustBadgeBackend",
  "trustBadgeDatabase",
  "trustBadgeSessions",
  "trustBadgePasswords",
  "trustBadgeHonest",
  "faqEyebrow",
  "faqTitle",
  "faqOneQ",
  "faqOneA",
  "faqTwoQ",
  "faqTwoA",
  "faqThreeQ",
  "faqThreeA",
  "faqFourQ",
  "faqFourA"
];

const truthCopy = truthCopyKeys.reduce((values, key) => {
  values[key] = copy.en[key];
  return values;
}, {});

const grades = Array.from({ length: 10 }, (_, index) => `Grade ${index + 1}`);

const navItems = [
  ["navAcademics", "#academics"],
  ["navLife", "#life"],
  ["navPortals", "#portals"],
  ["navAdmissions", "#admissions"],
  ["navContact", "#contact"]
];

const highlights = [
  ["grades", GraduationCap],
  ["curriculum", BookOpen],
  ["language", Globe2],
  ["transport", Bus]
];

const heroStats = [
  ["Grades", "heroStatGrades"],
  ["Accounts", "heroStatPortal"],
  ["Irbid", "heroStatLocation"],
  ["AR/EN", "heroStatLanguage"]
];

const proofPoints = [
  {
    icon: BookOpen,
    title: "proofAcademicsTitle",
    text: "proofAcademicsText"
  },
  {
    icon: ShieldCheck,
    title: "proofPortalTitle",
    text: "proofPortalText"
  },
  {
    icon: Trophy,
    title: "proofCareTitle",
    text: "proofCareText"
  },
  {
    icon: MessageCircle,
    title: "proofAccessTitle",
    text: "proofAccessText"
  }
];

const portalPreviewRows = [
  ["previewAttendance", "When posted", "previewStatusPosted"],
  ["previewHomework", "Staff posts", "previewStatusReady"],
  ["previewFees", "Account only", "previewStatusSecure"],
  ["previewRoster", "Class-linked", "previewStatusReady"],
  ["previewAverage", "Real grades", "previewStatusPosted"],
  ["previewAnnouncement", "School posts", "previewStatusReady"]
];

const howItWorksSteps = [
  ["01", "howWorksInquiryTitle", "howWorksInquiryText"],
  ["02", "howWorksAccountTitle", "howWorksAccountText"],
  ["03", "howWorksRecordsTitle", "howWorksRecordsText"],
  ["04", "howWorksFollowupTitle", "howWorksFollowupText"]
];

const feedbackSlots = [
  "feedbackSlotParent",
  "feedbackSlotTeacher",
  "feedbackSlotAdmin"
];

const trustBadges = [
  "trustBadgeStack",
  "trustBadgeBackend",
  "trustBadgeDatabase",
  "trustBadgeSessions",
  "trustBadgePasswords",
  "trustBadgeHonest"
];

const faqItems = [
  ["faqOneQ", "faqOneA"],
  ["faqTwoQ", "faqTwoA"],
  ["faqThreeQ", "faqThreeA"],
  ["faqFourQ", "faqFourA"]
];

const portals = [
  {
    title: "studentPortal",
    text: "studentPortalText",
    href: "/student",
    icon: GraduationCap
  },
  {
    title: "teacherPortal",
    text: "teacherPortalText",
    href: "/teacher",
    icon: ClipboardList
  }
];

const profileModes = [
  {
    id: "parents",
    label: "parentMode",
    title: "parentModeTitle",
    text: "parentModeText",
    icon: UsersRound
  },
  {
    id: "students",
    label: "studentMode",
    title: "studentModeTitle",
    text: "studentModeText",
    icon: GraduationCap
  },
  {
    id: "staff",
    label: "staffMode",
    title: "staffModeTitle",
    text: "staffModeText",
    icon: ShieldCheck
  }
];

const stages = [
  ["01", "foundation", "foundationText", "Grades 1-3"],
  ["02", "upperPrimary", "upperPrimaryText", "Grades 4-6"],
  ["03", "middle", "middleText", "Grades 7-8"],
  ["04", "secondary", "secondaryText", "Grades 9-10"]
];

const admissions = [
  ["01", "stepOne", "stepOneText"],
  ["02", "stepTwo", "stepTwoText"],
  ["03", "stepThree", "stepThreeText"],
  ["04", "stepFour", "stepFourText"]
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function IconLabel({ icon, children }) {
  return h(
    "span",
    { className: "icon-label" },
    h(icon, { size: 18, strokeWidth: 2.2, "aria-hidden": true }),
    h("span", null, children)
  );
}

function ActionLink({ href, children, icon = ArrowRight, variant = "primary", ...props }) {
  return h(
    "a",
    { className: cx("action-link", variant), href, ...props },
    h("span", null, children),
    h(icon, { size: 18, strokeWidth: 2.4, "aria-hidden": true })
  );
}

function App() {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("sss-language") === "ar" ? "ar" : "en";
    } catch {
      return "en";
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState("parents");
  const [formStatus, setFormStatus] = useState("");

  const t = useMemo(() => ({ ...copy[language], ...truthCopy }), [language]);
  const isArabic = language === "ar";
  const activeMode = profileModes.find((item) => item.id === mode) ?? profileModes[0];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = t.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.content = t.description;
    try {
      localStorage.setItem("sss-language", language);
    } catch {
      // Local storage can be blocked in private browsing; the UI still works.
    }
  }, [language, isArabic, t]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll("[data-reveal-card]"));
    if (!cards.length) return undefined;

    cards.forEach((card, index) => {
      card.style.setProperty("--reveal-delay", `${(index % 3) * 100}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => {
        card.dataset.reveal = "visible";
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.reveal = "visible";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === "en" ? "ar" : "en"));
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const handleInquiry = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const grade = String(data.get("grade") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = isArabic
      ? `استفسار تسجيل - ${grade || "مدرسة قصة نجاح"}`
      : `School inquiry - ${grade || "Success Story School"}`;
    const body = isArabic
      ? [
          `اسم ولي الأمر: ${name}`,
          `رقم الهاتف: ${phone}`,
          `الصف المطلوب: ${grade}`,
          "",
          message || "أرغب بالاستفسار عن التسجيل في مدرسة قصة نجاح."
        ].join("\n")
      : [
          `Parent name: ${name}`,
          `Phone: ${phone}`,
          `Interested grade: ${grade}`,
          "",
          message || "I would like to ask about enrollment at Success Story School."
        ].join("\n");
    const gmailUrl = new URL("https://mail.google.com/mail/");
    gmailUrl.search = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: schoolEmail,
      su: subject,
      body
    }).toString();
    setFormStatus(t.inquiryOpening);
    if (!window.open(gmailUrl.toString(), "_blank", "noopener")) {
      window.location.href = gmailUrl.toString();
    }
  };

  return h(
    React.Fragment,
    null,
    h("a", { className: "skip-link", href: "#main-content" }, t.skip),
    h(
      "div",
      { className: "announcement" },
      h(
        "div",
        { className: "shell announcement-inner" },
        h("p", null, h("strong", null, t.announcementStrong), " ", t.announcementText),
        h("a", { href: "#contact", onClick: closeMenu }, t.applyToday)
      )
    ),
    h(
      "header",
      { className: "site-header" },
      h(
        "nav",
        { className: "shell nav", "aria-label": "Primary navigation" },
        h(
          "a",
          { className: "brand", href: "#top", onClick: closeMenu, "aria-label": "Success Story School home" },
          h("img", { src: "assets/success-story-logo.jpg", alt: "", width: 52, height: 52 }),
          h("span", null, h("strong", null, "Success Story"), h("small", null, "School"))
        ),
        h(
          "button",
          {
            className: "menu-button",
            type: "button",
            "aria-label": menuOpen ? t.menuClose : t.menuOpen,
            "aria-expanded": menuOpen,
            onClick: () => setMenuOpen((open) => !open)
          },
          h(menuOpen ? X : Menu, { size: 24, strokeWidth: 2.2, "aria-hidden": true })
        ),
        h(
          "div",
          { className: cx("nav-panel", menuOpen && "open") },
          h(
            "div",
            { className: "nav-links" },
            navItems.map(([label, href]) =>
              h("a", { key: href, href, onClick: closeMenu }, t[label])
            )
          ),
          h(
            "div",
            { className: "nav-actions" },
            h(
              "button",
              {
                className: "language-button",
                type: "button",
                onClick: toggleLanguage,
                "aria-label": t.languageAria
              },
              h(Globe2, { size: 18, "aria-hidden": true }),
              h("span", null, t.languageLabel)
            ),
            h(ActionLink, { href: "#contact", variant: "primary", onClick: closeMenu }, t.beginEnrollment)
          )
        )
      )
    ),
    h(
      "main",
      { id: "main-content" },
      h(
        "section",
        { className: "hero", id: "top" },
        h(
          "div",
          { className: "shell hero-layout" },
          h(
            "div",
            { className: "hero-content" },
            h("p", { className: "eyebrow" }, t.heroEyebrow),
            h("h1", null, t.heroTitle),
            h("p", { className: "hero-text" }, t.heroText),
            h(
              "div",
              { className: "hero-actions" },
              h(ActionLink, { href: "#contact", variant: "primary" }, t.beginEnrollment),
              h(ActionLink, { href: "#portals", variant: "secondary", icon: LayoutDashboard }, t.openPortals),
              h(ActionLink, { href: phoneHref, variant: "ghost", icon: Phone }, t.callOffice)
            ),
            h(
              "dl",
              { className: "hero-stats", "aria-label": "School quick facts" },
              heroStats.map(([value, label]) =>
                h(
                  "div",
                  { key: label },
                  h("dt", null, value),
                  h("dd", null, t[label])
                )
              )
            )
          ),
          h(
            "aside",
            { className: "hero-card", "aria-label": t.heroCardKicker },
            h("img", { src: "assets/success-story-logo.jpg", alt: "", width: 78, height: 78 }),
            h("span", { className: "hero-card-kicker" }, t.heroCardKicker),
            h("h2", null, t.heroCardTitle),
            h("p", null, t.heroCardText),
            h(
              "ul",
              null,
              [t.heroCardPointOne, t.heroCardPointTwo, t.heroCardPointThree].map((item) =>
                h("li", { key: item }, h(CheckCircle2, { size: 17, "aria-hidden": true }), h("span", null, item))
              )
            )
          )
        )
      ),
      h(
        "section",
        { className: "highlight-strip", "aria-label": "School highlights" },
        h(
          "div",
          { className: "shell highlight-grid" },
          highlights.map(([label, icon]) =>
            h("div", { className: "highlight", key: label }, h(IconLabel, { icon }, t[label]))
          )
        )
      ),
      h(
        "section",
        { className: "section proof-section" },
        h(
          "div",
          { className: "shell proof-layout" },
          h(
            "div",
            { className: "proof-copy" },
            h("p", { className: "eyebrow" }, t.proofEyebrow),
            h("h2", null, t.proofTitle),
            h("p", null, t.proofText)
          ),
          h(
            "div",
            { className: "proof-grid" },
            proofPoints.map((point) =>
              h(
                "article",
                { className: "proof-card", key: point.title, "data-reveal-card": true },
                h(point.icon, { size: 27, strokeWidth: 2.1, "aria-hidden": true }),
                h("h3", null, t[point.title]),
                h("p", null, t[point.text])
              )
            )
          )
        )
      ),
      h(
        "section",
        { className: "section portal-hub", id: "portals" },
        h(
          "div",
          { className: "shell split-heading" },
          h("div", null, h("p", { className: "eyebrow" }, t.navPortals), h("h2", null, t.quickPortalTitle)),
          h("p", null, t.quickPortalText)
        ),
        h(
          "div",
          { className: "shell card-grid three" },
          portals.map((portal) =>
            h(
              "article",
              { className: "info-card portal-card", key: portal.href, "data-reveal-card": true },
              h(portal.icon, { size: 30, strokeWidth: 2.1, "aria-hidden": true }),
              h("h3", null, t[portal.title]),
              h("p", null, t[portal.text]),
              h(ActionLink, { href: portal.href, variant: "subtle" }, t.open)
            )
          )
        )
      ),
      h(
        "section",
        { className: "portal-preview-section" },
        h(
          "div",
          { className: "shell portal-preview-layout" },
          h(
            "div",
            { className: "section-copy" },
            h("p", { className: "eyebrow" }, t.portalPreviewEyebrow),
            h("h2", null, t.portalPreviewTitle),
            h("p", null, t.portalPreviewText),
            h(
              "div",
              { className: "portal-preview-actions" },
              h(ActionLink, { href: "/student", variant: "primary", icon: GraduationCap }, t.studentPortal),
              h(ActionLink, { href: "/teacher", variant: "secondary", icon: ClipboardList }, t.teacherPortal)
            )
          ),
          h(
            "div",
            { className: "dashboard-preview", "aria-label": t.portalPreviewTitle },
            h(
              "div",
              { className: "dashboard-preview-top" },
              h(
                "div",
                null,
                h("span", null, t.previewStudent),
                h("strong", null, t.previewClass)
              ),
              h("em", null, "SSS")
            ),
            h(
              "div",
              { className: "dashboard-preview-grid" },
              portalPreviewRows.map(([label, value, status]) =>
                h(
                  "article",
                  { key: label },
                  h("span", null, t[label]),
                  h("strong", null, value),
                  h("small", null, t[status])
                )
              )
            )
          )
        )
      ),
      h(
        "section",
        { className: "section how-works", id: "how-it-works" },
        h(
          "div",
          { className: "shell split-heading" },
          h("div", null, h("p", { className: "eyebrow" }, t.howWorksEyebrow), h("h2", null, t.howWorksTitle)),
          h("p", null, t.howWorksText)
        ),
        h(
          "div",
          { className: "shell how-works-grid" },
          howItWorksSteps.map(([number, title, text]) =>
            h(
              "article",
              { className: "how-step", key: number, "data-reveal-card": true },
              h("span", null, number),
              h("h3", null, t[title]),
              h("p", null, t[text])
            )
          )
        )
      ),
      h(
        "section",
        { className: "section feedback-section", "aria-labelledby": "school-feedback-title" },
        h(
          "div",
          { className: "shell feedback-layout" },
          h(
            "div",
            { className: "section-copy" },
            h("p", { className: "eyebrow" }, t.feedbackEyebrow),
            h("h2", { id: "school-feedback-title" }, t.feedbackTitle),
            h("p", null, t.feedbackText)
          ),
          h(
            "div",
            { className: "feedback-grid" },
            feedbackSlots.map((slot) =>
              h(
                "article",
                { className: "feedback-slot", key: slot },
                h("span", { className: "feedback-slot-label" }, t[slot]),
                h("span", { className: "skeleton-line wide", "aria-hidden": true }),
                h("span", { className: "skeleton-line", "aria-hidden": true }),
                h("strong", null, t.feedbackEmpty)
              )
            )
          )
        )
      ),
      h(
        "section",
        { className: "section trust-section" },
        h(
          "div",
          { className: "shell trust-layout" },
          h(
            "div",
            { className: "section-copy" },
            h("p", { className: "eyebrow" }, t.trustEyebrow),
            h("h2", null, t.trustTitle),
            h("p", null, t.trustText)
          ),
          h(
            "div",
            { className: "trust-badges", "aria-label": t.trustTitle },
            trustBadges.map((badge) =>
              h("span", { className: "trust-badge", key: badge }, h(CheckCircle2, { size: 16, "aria-hidden": true }), t[badge])
            )
          )
        )
      ),
      h(
        "section",
        { className: "section faq-section" },
        h(
          "div",
          { className: "shell section-heading" },
          h("p", { className: "eyebrow" }, t.faqEyebrow),
          h("h2", null, t.faqTitle)
        ),
        h(
          "div",
          { className: "shell faq-grid" },
          faqItems.map(([question, answer]) =>
            h(
              "article",
              { className: "faq-card", key: question, "data-reveal-card": true },
              h("h3", null, t[question]),
              h("p", null, t[answer])
            )
          )
        )
      ),
      h(
        "section",
        { className: "section overview" },
        h(
          "div",
          { className: "shell overview-grid" },
          h(
            "div",
            { className: "section-copy" },
            h("p", { className: "eyebrow" }, t.overviewEyebrow),
            h("h2", null, t.overviewTitle),
            h("p", null, t.overviewText),
            h(
              "div",
              { className: "segmented", role: "tablist", "aria-label": "School audience" },
              profileModes.map((item) =>
                h(
                  "button",
                  {
                    key: item.id,
                    type: "button",
                    className: item.id === mode ? "active" : "",
                    role: "tab",
                    "aria-selected": item.id === mode,
                    onClick: () => setMode(item.id)
                  },
                  t[item.label]
                )
              )
            )
          ),
          h(
            "article",
            { className: "feature-panel" },
            h(activeMode.icon, { size: 34, strokeWidth: 2.1, "aria-hidden": true }),
            h("h3", null, t[activeMode.title]),
            h("p", null, t[activeMode.text])
          )
        )
      ),
      h(
        "section",
        { className: "section academics", id: "academics" },
        h(
          "div",
          { className: "shell section-heading" },
          h("p", { className: "eyebrow" }, t.academicsEyebrow),
          h("h2", null, t.academicsTitle),
          h("p", null, t.academicsText)
        ),
        h(
          "div",
          { className: "shell card-grid four" },
          stages.map(([number, title, text, gradeRange]) =>
            h(
              "article",
              { className: "info-card stage-card", key: number, "data-reveal-card": true },
              h("span", { className: "card-number" }, number),
              h("h3", null, t[title]),
              h("p", null, t[text]),
              h("strong", null, gradeRange)
            )
          )
        )
      ),
      h(
        "section",
        { className: "section life", id: "life" },
        h(
          "div",
          { className: "shell life-grid" },
          h(
            "div",
            { className: "life-image", role: "img", "aria-label": "Success Story School campus" },
            h("img", { src: "assets/success-story-campus.jpg", alt: "Success Story School campus in Irbid" })
          ),
          h(
            "div",
            { className: "section-copy" },
            h("p", { className: "eyebrow" }, t.lifeEyebrow),
            h("h2", null, t.lifeTitle),
            h("p", null, t.lifeText),
            h(
              "ul",
              { className: "check-list" },
              [t.lifeOne, t.lifeTwo, t.lifeThree].map((item) =>
                h("li", { key: item }, h(CheckCircle2, { size: 18, "aria-hidden": true }), h("span", null, item))
              )
            )
          )
        )
      ),
      h(
        "section",
        { className: "section admissions", id: "admissions" },
        h(
          "div",
          { className: "shell split-heading" },
          h("div", null, h("p", { className: "eyebrow" }, t.admissionsEyebrow), h("h2", null, t.admissionsTitle)),
          h(ActionLink, { href: "#contact", variant: "primary", icon: CalendarDays }, t.applyToday)
        ),
        h(
          "div",
          { className: "shell timeline" },
          admissions.map(([number, title, text]) =>
            h(
              "article",
              { className: "timeline-step", key: number, "data-reveal-card": true },
              h("span", null, number),
              h("h3", null, t[title]),
              h("p", null, t[text])
            )
          )
        )
      ),
      h(
        "section",
        { className: "section contact", id: "contact" },
        h(
          "div",
          { className: "shell contact-grid" },
          h(
            "div",
            { className: "section-copy contact-copy" },
            h("p", { className: "eyebrow" }, t.contactEyebrow),
            h("h2", null, t.contactTitle),
            h("p", null, t.contactText),
            h(
              "div",
              { className: "contact-actions" },
              h(ActionLink, { href: phoneHref, variant: "primary", icon: Phone }, phoneNumber),
              h(ActionLink, { href: whatsappHref, variant: "secondary", icon: MessageCircle, target: "_blank", rel: "noopener noreferrer" }, t.whatsapp),
              h(ActionLink, { href: mapsHref, variant: "ghost", icon: MapPin, target: "_blank", rel: "noopener noreferrer" }, t.directions)
            ),
            h(
              "address",
              null,
              h("span", null, h(MapPin, { size: 17, "aria-hidden": true }), t.address),
              h("span", null, t.exactLocation),
              h("a", { href: `mailto:${schoolEmail}` }, t.email, ": ", schoolEmail)
            )
          ),
          h(
            "form",
            { className: "inquiry-form", onSubmit: handleInquiry },
            h("label", null, h("span", null, t.parentName), h("input", { name: "name", type: "text", autoComplete: "name", required: true })),
            h("label", null, h("span", null, t.parentPhone), h("input", { name: "phone", type: "tel", autoComplete: "tel", required: true })),
            h(
              "label",
              null,
              h("span", null, t.interestedGrade),
              h(
                "select",
                { name: "grade", required: true, defaultValue: "" },
                h("option", { value: "", disabled: true }, t.chooseGrade),
                grades.map((grade) => h("option", { key: grade, value: grade }, isArabic ? grade.replace("Grade", "الصف") : grade))
              )
            ),
            h(
              "label",
              null,
              h("span", null, t.message),
              h("textarea", { name: "message", rows: 4, placeholder: t.messagePlaceholder })
            ),
            h(
              "button",
              { className: "form-submit", type: "submit" },
              h("span", null, t.sendInquiry),
              h(ArrowRight, { size: 18, strokeWidth: 2.4, "aria-hidden": true })
            ),
            h("p", { className: "form-note" }, t.inquiryNote),
            h("p", { className: "form-status", "aria-live": "polite" }, formStatus)
          )
        )
      )
    ),
    h(
      "footer",
      { className: "site-footer" },
      h(
        "div",
        { className: "shell footer-inner" },
        h(
          "a",
          { className: "brand footer-brand", href: "#top" },
          h("img", { src: "assets/success-story-logo.jpg", alt: "", width: 48, height: 48 }),
          h("span", null, h("strong", null, "Success Story"), h("small", null, "School"))
        ),
        h("p", null, t.footerText),
        h(
          "div",
          { className: "footer-icons", "aria-label": "School values" },
          h(School, { size: 20, "aria-hidden": true }),
          h(Trophy, { size: 20, "aria-hidden": true }),
          h(BookOpen, { size: 20, "aria-hidden": true })
        )
      )
    )
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(h(App));
}
})();
