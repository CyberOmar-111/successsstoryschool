(() => {
  // src/site/data/site-config.js
  var schoolEmail = "abrar.rashdan84@gmail.com";
  var phoneNumber = "07 9946 4848";
  var phoneHref = "tel:+962799464848";
  var whatsappHref = "https://wa.me/00962799464848";
  var mapsHref = "https://www.google.com/maps/search/?api=1&query=32.532984%2C35.863854";

  // src/carousel/react-global.js
  var React = window.React;
  if (!React) {
    throw new Error("React must be loaded before the school carousel bundle.");
  }
  var {
    Children,
    Component,
    Fragment,
    Profiler,
    PureComponent,
    StrictMode,
    Suspense,
    cloneElement,
    createContext,
    createElement,
    createRef,
    forwardRef,
    isValidElement,
    lazy,
    memo,
    startTransition,
    use,
    useCallback,
    useContext,
    useDebugValue,
    useDeferredValue,
    useEffect,
    useId,
    useImperativeHandle,
    useInsertionEffect,
    useLayoutEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
    useSyncExternalStore,
    useTransition
  } = React;
  var react_global_default = React;

  // src/site/icons/index.jsx
  var h = react_global_default.createElement;
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
  var ArrowRight = svgIcon([
    ["path", { d: "M5 12h14" }],
    ["path", { d: "m12 5 7 7-7 7" }]
  ]);
  var BookOpen = svgIcon([
    ["path", { d: "M12 7v14" }],
    ["path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H12V5H6.5A2.5 2.5 0 0 0 4 7.5v12Z" }],
    ["path", { d: "M20 19.5A2.5 2.5 0 0 0 17.5 17H12V5h5.5A2.5 2.5 0 0 1 20 7.5v12Z" }]
  ]);
  var Bus = svgIcon([
    ["path", { d: "M6 17h12" }],
    ["path", { d: "M6 17v2" }],
    ["path", { d: "M18 17v2" }],
    ["rect", { x: "4", y: "5", width: "16", height: "12", rx: "2" }],
    ["path", { d: "M4 10h16" }],
    ["path", { d: "M8 14h.01" }],
    ["path", { d: "M16 14h.01" }]
  ]);
  var CalendarDays = svgIcon([
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
  var CheckCircle2 = svgIcon([
    ["circle", { cx: "12", cy: "12", r: "9" }],
    ["path", { d: "m8 12 2.5 2.5L16 9" }]
  ]);
  var ClipboardList = svgIcon([
    ["path", { d: "M9 5h6" }],
    ["path", { d: "M9 3h6v4H9z" }],
    ["rect", { x: "5", y: "5", width: "14", height: "16", rx: "2" }],
    ["path", { d: "M9 12h6" }],
    ["path", { d: "M9 16h6" }]
  ]);
  var Globe2 = svgIcon([
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M2 12h20" }],
    ["path", { d: "M12 2a15 15 0 0 1 0 20" }],
    ["path", { d: "M12 2a15 15 0 0 0 0 20" }]
  ]);
  var GraduationCap = svgIcon([
    ["path", { d: "M22 10 12 5 2 10l10 5 10-5Z" }],
    ["path", { d: "M6 12v5c3 2 9 2 12 0v-5" }],
    ["path", { d: "M22 10v6" }]
  ]);
  var LayoutDashboard = svgIcon([
    ["rect", { x: "3", y: "3", width: "7", height: "8", rx: "1" }],
    ["rect", { x: "14", y: "3", width: "7", height: "5", rx: "1" }],
    ["rect", { x: "14", y: "12", width: "7", height: "9", rx: "1" }],
    ["rect", { x: "3", y: "15", width: "7", height: "6", rx: "1" }]
  ]);
  var MapPin = svgIcon([
    ["path", { d: "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" }],
    ["circle", { cx: "12", cy: "10", r: "3" }]
  ]);
  var Menu = svgIcon([
    ["path", { d: "M4 6h16" }],
    ["path", { d: "M4 12h16" }],
    ["path", { d: "M4 18h16" }]
  ]);
  var MessageCircle = svgIcon([
    ["path", { d: "M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.2A8.5 8.5 0 1 1 21 11.5Z" }]
  ]);
  var Phone = svgIcon([
    ["path", { d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" }]
  ]);
  var School = svgIcon([
    ["path", { d: "M3 21h18" }],
    ["path", { d: "M5 21V8l7-4 7 4v13" }],
    ["path", { d: "M9 21v-6h6v6" }],
    ["path", { d: "M9 10h.01" }],
    ["path", { d: "M15 10h.01" }]
  ]);
  var ShieldCheck = svgIcon([
    ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }],
    ["path", { d: "m9 12 2 2 4-5" }]
  ]);
  var Trophy = svgIcon([
    ["path", { d: "M8 21h8" }],
    ["path", { d: "M12 17v4" }],
    ["path", { d: "M7 4h10v5a5 5 0 0 1-10 0V4Z" }],
    ["path", { d: "M5 5H3v3a4 4 0 0 0 4 4" }],
    ["path", { d: "M19 5h2v3a4 4 0 0 1-4 4" }]
  ]);
  var UsersRound = svgIcon([
    ["path", { d: "M18 21a6 6 0 0 0-12 0" }],
    ["circle", { cx: "12", cy: "8", r: "5" }],
    ["path", { d: "M22 21a5 5 0 0 0-4-4.8" }],
    ["path", { d: "M2 21a5 5 0 0 1 4-4.8" }]
  ]);
  var X = svgIcon([
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }]
  ]);

  // src/site/data/homepage-content.js
  var copy = {
    en: {
      title: "Success Story School | Irbid",
      description: "Success Story School in Irbid offers Grades 1 to 10, Arabic-first learning, English education, the Collins Curriculum, school activities, and secure school accounts.",
      skip: "Skip to content",
      announcementStrong: "Admissions inquiries are open.",
      announcementText: "Families can ask about Grades 1 to 10 now.",
      applyToday: "Start inquiry",
      navAcademics: "Academics",
      navLife: "Student life",
      navPortals: "School Accounts",
      navAdmissions: "Admissions",
      navContact: "Contact",
      languageLabel: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
      languageAria: "View site in Arabic",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      heroEyebrow: "Private school in Irbid",
      heroTitle: "Success Story School",
      heroText: "Arabic-first learning, strong English education, Collins Curriculum, safe routines, school activities, and online school accounts for families and staff.",
      beginEnrollment: "Begin enrollment",
      openPortals: "Portal Login",
      callOffice: "Call office",
      grades: "Grades 1-10",
      curriculum: "Collins Curriculum",
      language: "Arabic + English",
      transport: "Bus transportation",
      quickPortalTitle: "School accounts",
      quickPortalText: "Students and authorized staff sign in through protected school account paths.",
      studentPortal: "Student Account",
      studentPortalText: "Create a student account, view class details, grades, attendance, homework, announcements, fees, and bus requests.",
      teacherPortal: "Teacher Account",
      teacherPortalText: "Teachers manage assigned classes, attendance, homework, announcements, and grades.",
      adminPortal: "Staff Access",
      adminPortalText: "Authorized staff use private access provided by the school.",
      open: "Open",
      overviewEyebrow: "School experience",
      overviewTitle: "A modern school rhythm for families",
      overviewText: "The public website explains the school clearly, while secure school accounts handle day-to-day academic records.",
      parentMode: "Parents",
      studentMode: "Students",
      staffMode: "Staff",
      parentModeTitle: "Simple enrollment path",
      parentModeText: "Parents can understand grades, curriculum, activities, transportation, and contact the school in one visit.",
      studentModeTitle: "A student account that grows",
      studentModeText: "Students receive a school ID and can follow updates as records are posted by the school.",
      staffModeTitle: "Cleaner staff operations",
      staffModeText: "Teachers and administrators work from protected dashboards connected to school records.",
      academicsEyebrow: "Academics",
      academicsTitle: "Learning designed for each stage",
      academicsText: "From foundation years to Grade 10, students build language, confidence, independence, and focused academic habits.",
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
      lifeText: "Students take part in classroom learning, art, sports, trips, celebrations, and competitions.",
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
      contactText: "Send an inquiry, call the office, or open directions to the campus in Irbid.",
      parentName: "Parent name",
      parentPhone: "Parent phone number",
      interestedGrade: "Interested grade level",
      chooseGrade: "Choose a grade",
      message: "Message",
      messagePlaceholder: "Tell us how we can help.",
      sendInquiry: "Open Gmail draft",
      inquiryNote: "Gmail opens a prepared message. Review it, then press Send from your account.",
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
      title: "\u0645\u062F\u0631\u0633\u0629 \u0642\u0635\u0629 \u0646\u062C\u0627\u062D | \u0625\u0631\u0628\u062F",
      description: "\u0645\u062F\u0631\u0633\u0629 \u0642\u0635\u0629 \u0646\u062C\u0627\u062D \u0641\u064A \u0625\u0631\u0628\u062F \u062A\u0642\u062F\u0645 \u0627\u0644\u062A\u0639\u0644\u064A\u0645 \u0645\u0646 \u0627\u0644\u0635\u0641 \u0627\u0644\u0623\u0648\u0644 \u062D\u062A\u0649 \u0627\u0644\u0639\u0627\u0634\u0631 \u0645\u0639 \u062A\u0639\u0644\u064A\u0645 \u0639\u0631\u0628\u064A \u0648\u0625\u0646\u062C\u0644\u064A\u0632\u064A \u0648\u0645\u0646\u0647\u0627\u062C Collins \u0648\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062F\u0631\u0633\u064A\u0629 \u0622\u0645\u0646\u0629.",
      skip: "\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u062D\u062A\u0648\u0649",
      announcementStrong: "\u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0644\u0644\u0639\u0627\u0645 2026-2027 \u0645\u0641\u062A\u0648\u062D.",
      announcementText: "\u064A\u0645\u0643\u0646 \u0644\u0644\u0639\u0627\u0626\u0644\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631 \u0639\u0646 \u0627\u0644\u0635\u0641\u0648\u0641 \u0645\u0646 \u0627\u0644\u0623\u0648\u0644 \u062D\u062A\u0649 \u0627\u0644\u0639\u0627\u0634\u0631 \u0627\u0644\u0622\u0646.",
      applyToday: "\u0627\u0628\u062F\u0623 \u0627\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631",
      navAcademics: "\u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0627\u062A",
      navLife: "\u062D\u064A\u0627\u0629 \u0627\u0644\u0637\u0644\u0627\u0628",
      navPortals: "\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0633\u0629",
      navAdmissions: "\u0627\u0644\u062A\u0633\u062C\u064A\u0644",
      navContact: "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
      languageLabel: "English",
      languageAria: "View site in English",
      menuOpen: "\u0641\u062A\u062D \u0627\u0644\u0642\u0627\u0626\u0645\u0629",
      menuClose: "\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0642\u0627\u0626\u0645\u0629",
      heroEyebrow: "\u0645\u062F\u0631\u0633\u0629 \u062E\u0627\u0635\u0629 \u0641\u064A \u0625\u0631\u0628\u062F",
      heroTitle: "\u0645\u062F\u0631\u0633\u0629 \u0642\u0635\u0629 \u0646\u062C\u0627\u062D",
      heroText: "\u062A\u0639\u0644\u064A\u0645 \u0639\u0631\u0628\u064A \u0623\u0648\u0644\u0627\u064B\u060C \u0648\u062A\u0642\u0648\u064A\u0629 \u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629\u060C \u0648\u0645\u0646\u0647\u0627\u062C Collins\u060C \u0648\u0631\u0648\u062A\u064A\u0646 \u0622\u0645\u0646\u060C \u0648\u0623\u0646\u0634\u0637\u0629 \u0645\u062F\u0631\u0633\u064A\u0629\u060C \u0648\u062D\u0633\u0627\u0628\u0627\u062A \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0644\u0644\u0639\u0627\u0626\u0644\u0627\u062A \u0648\u0627\u0644\u0643\u0648\u0627\u062F\u0631.",
      beginEnrollment: "\u0627\u0628\u062F\u0623 \u0627\u0644\u062A\u0633\u062C\u064A\u0644",
      openPortals: "\u0627\u0641\u062A\u062D \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A",
      callOffice: "\u0627\u062A\u0635\u0644 \u0628\u0627\u0644\u0625\u062F\u0627\u0631\u0629",
      grades: "\u0627\u0644\u0635\u0641\u0648\u0641 1-10",
      curriculum: "\u0645\u0646\u0647\u0627\u062C Collins",
      language: "\u0639\u0631\u0628\u064A + \u0625\u0646\u062C\u0644\u064A\u0632\u064A",
      transport: "\u0645\u0648\u0627\u0635\u0644\u0627\u062A \u0628\u0627\u0644\u0628\u0627\u0635",
      quickPortalTitle: "\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0633\u0629",
      quickPortalText: "\u064A\u0633\u062C\u0644 \u0627\u0644\u0637\u0644\u0627\u0628 \u0648\u0627\u0644\u0645\u0639\u0644\u0645\u0648\u0646 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0646 \u0645\u0631\u0643\u0632 \u062D\u0633\u0627\u0628\u0627\u062A \u0648\u0627\u062D\u062F \u0648\u0648\u0627\u0636\u062D.",
      studentPortal: "\u062D\u0633\u0627\u0628 \u0627\u0644\u0637\u0627\u0644\u0628",
      studentPortalText: "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u0637\u0627\u0644\u0628\u060C \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0635\u0641\u060C \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A\u060C \u0627\u0644\u062D\u0636\u0648\u0631\u060C \u0627\u0644\u0648\u0627\u062C\u0628\u0627\u062A\u060C \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A\u060C \u0627\u0644\u0631\u0633\u0648\u0645\u060C \u0648\u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0627\u0635\u0644\u0627\u062A.",
      teacherPortal: "\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0639\u0644\u0645",
      teacherPortalText: "\u064A\u062F\u064A\u0631 \u0627\u0644\u0645\u0639\u0644\u0645 \u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0633\u0646\u062F\u0629\u060C \u0627\u0644\u062D\u0636\u0648\u0631\u060C \u0627\u0644\u0648\u0627\u062C\u0628\u0627\u062A\u060C \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A\u060C \u0648\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A.",
      adminPortal: "Staff Access",
      adminPortalText: "Authorized staff use private access provided by the school.",
      open: "\u0641\u062A\u062D",
      overviewEyebrow: "\u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u0645\u062F\u0631\u0633\u0629",
      overviewTitle: "\u0646\u0638\u0627\u0645 \u0645\u062F\u0631\u0633\u064A \u062D\u062F\u064A\u062B \u0644\u0644\u0639\u0627\u0626\u0644\u0627\u062A",
      overviewText: "\u064A\u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0642\u0639 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0628\u0648\u0636\u0648\u062D\u060C \u0628\u064A\u0646\u0645\u0627 \u062A\u062A\u0648\u0644\u0649 \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0627\u0644\u0622\u0645\u0646\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u064A\u0648\u0645\u064A\u0629.",
      parentMode: "\u0627\u0644\u0623\u0647\u0644",
      studentMode: "\u0627\u0644\u0637\u0644\u0627\u0628",
      staffMode: "\u0627\u0644\u0643\u0648\u0627\u062F\u0631",
      parentModeTitle: "\u0645\u0633\u0627\u0631 \u062A\u0633\u062C\u064A\u0644 \u0648\u0627\u0636\u062D",
      parentModeText: "\u064A\u0645\u0643\u0646 \u0644\u0644\u0623\u0647\u0644 \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0635\u0641\u0648\u0641\u060C \u0627\u0644\u0645\u0646\u0647\u0627\u062C\u060C \u0627\u0644\u0623\u0646\u0634\u0637\u0629\u060C \u0627\u0644\u0645\u0648\u0627\u0635\u0644\u0627\u062A\u060C \u0648\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0628\u0633\u0647\u0648\u0644\u0629.",
      studentModeTitle: "\u062D\u0633\u0627\u0628 \u0637\u0627\u0644\u0628 \u064A\u062A\u0637\u0648\u0631",
      studentModeText: "\u064A\u062D\u0635\u0644 \u0627\u0644\u0637\u0627\u0644\u0628 \u0639\u0644\u0649 \u0631\u0642\u0645 \u0645\u062F\u0631\u0633\u064A \u0648\u064A\u062A\u0627\u0628\u0639 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0639\u0646\u062F \u0646\u0634\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0645\u0646 \u0627\u0644\u0645\u062F\u0631\u0633\u0629.",
      staffModeTitle: "\u0625\u062F\u0627\u0631\u0629 \u0645\u062F\u0631\u0633\u064A\u0629 \u0623\u0648\u0636\u062D",
      staffModeText: "\u064A\u0639\u0645\u0644 \u0627\u0644\u0645\u0639\u0644\u0645\u0648\u0646 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0648\u0646 \u0645\u0646 \u0644\u0648\u062D\u0627\u062A \u0645\u062D\u0645\u064A\u0629 \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u062D\u0627\u0644\u064A.",
      academicsEyebrow: "\u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0627\u062A",
      academicsTitle: "\u062A\u0639\u0644\u0645 \u0645\u0646\u0627\u0633\u0628 \u0644\u0643\u0644 \u0645\u0631\u062D\u0644\u0629",
      academicsText: "\u0645\u0646 \u0627\u0644\u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062A\u0623\u0633\u064A\u0633\u064A\u0629 \u062D\u062A\u0649 \u0627\u0644\u0635\u0641 \u0627\u0644\u0639\u0627\u0634\u0631\u060C \u064A\u0628\u0646\u064A \u0627\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u0644\u063A\u0629 \u0648\u0627\u0644\u062B\u0642\u0629 \u0648\u0627\u0644\u0627\u0633\u062A\u0642\u0644\u0627\u0644\u064A\u0629 \u0648\u0627\u0644\u0639\u0627\u062F\u0627\u062A \u0627\u0644\u062F\u0631\u0627\u0633\u064A\u0629.",
      foundation: "\u0627\u0644\u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062A\u0623\u0633\u064A\u0633\u064A\u0629",
      foundationText: "\u0628\u062F\u0627\u064A\u0629 \u062F\u0627\u0639\u0645\u0629 \u0644\u0644\u062A\u0639\u0644\u0645 \u0627\u0644\u0623\u0633\u0627\u0633\u064A \u0648\u0627\u0644\u0644\u063A\u0629 \u0648\u0627\u0644\u0627\u0643\u062A\u0634\u0627\u0641.",
      upperPrimary: "\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0627\u0644\u0639\u0644\u064A\u0627",
      upperPrimaryText: "\u062A\u0646\u0645\u064A\u0629 \u0627\u0644\u062B\u0642\u0629 \u0645\u0646 \u062E\u0644\u0627\u0644 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0648\u0627\u0644\u0625\u0628\u062F\u0627\u0639.",
      middle: "\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u0645\u062A\u0648\u0633\u0637\u0629",
      middleText: "\u062A\u0639\u0644\u0645 \u0623\u0639\u0645\u0642 \u0648\u062A\u0639\u0627\u0648\u0646 \u0648\u0627\u0633\u062A\u0642\u0644\u0627\u0644\u064A\u0629 \u0623\u0642\u0648\u0649.",
      secondary: "\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062B\u0627\u0646\u0648\u064A\u0629",
      secondaryText: "\u062F\u0631\u0627\u0633\u0629 \u0645\u0631\u0643\u0632\u0629 \u0648\u0627\u0633\u062A\u0639\u062F\u0627\u062F \u0644\u0644\u062E\u0637\u0648\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629.",
      lifeEyebrow: "\u062D\u064A\u0627\u0629 \u0627\u0644\u0637\u0644\u0627\u0628",
      lifeTitle: "\u062A\u0639\u0644\u0645 \u0648\u0623\u0646\u0634\u0637\u0629 \u0648\u0631\u0639\u0627\u064A\u0629 \u0641\u064A \u0645\u0643\u0627\u0646 \u0648\u0627\u062D\u062F",
      lifeText: "\u064A\u0634\u0627\u0631\u0643 \u0627\u0644\u0637\u0644\u0627\u0628 \u0641\u064A \u0627\u0644\u062A\u0639\u0644\u0645 \u0627\u0644\u0635\u0641\u064A\u060C \u0627\u0644\u0641\u0646\u060C \u0627\u0644\u0631\u064A\u0627\u0636\u0629\u060C \u0627\u0644\u0631\u062D\u0644\u0627\u062A\u060C \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0644\u0627\u062A\u060C \u0648\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0627\u062A.",
      lifeOne: "\u0641\u0646 \u0648\u0631\u064A\u0627\u0636\u0629 \u0648\u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0628\u062F\u0627\u0639\u064A\u0629",
      lifeTwo: "\u0631\u062D\u0644\u0627\u062A \u0645\u062F\u0631\u0633\u064A\u0629 \u0648\u0623\u064A\u0627\u0645 \u0627\u062D\u062A\u0641\u0627\u0644\u064A\u0629",
      lifeThree: "\u0625\u0639\u0644\u0627\u0646\u0627\u062A \u0627\u0644\u0635\u0641 \u0648\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0648\u0627\u062C\u0628\u0627\u062A",
      admissionsEyebrow: "\u0627\u0644\u062A\u0633\u062C\u064A\u0644",
      admissionsTitle: "\u0631\u062D\u0644\u0629 \u062A\u0633\u062C\u064A\u0644 \u0648\u0627\u0636\u062D\u0629",
      stepOne: "\u0627\u0633\u062A\u0641\u0633\u0627\u0631",
      stepOneText: "\u0634\u0627\u0631\u0643 \u0635\u0641 \u0627\u0644\u0637\u0627\u0644\u0628 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0639\u0627\u0626\u0644\u0629.",
      stepTwo: "\u0632\u064A\u0627\u0631\u0629",
      stepTwoText: "\u0632\u0631 \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u062E\u0644\u0641 \u0645\u0633\u062A\u0634\u0641\u0649 \u0625\u0631\u0628\u062F \u0627\u0644\u062A\u062E\u0635\u0635\u064A.",
      stepThree: "\u062A\u0642\u062F\u064A\u0645",
      stepThreeText: "\u0627\u0633\u062A\u0644\u0645 \u0625\u0631\u0634\u0627\u062F\u0627\u062A \u0627\u0644\u0648\u062B\u0627\u0626\u0642 \u0648\u0627\u0644\u062E\u0637\u0648\u0627\u062A \u0627\u0644\u062A\u0627\u0644\u064A\u0629.",
      stepFour: "\u062A\u0631\u062D\u064A\u0628",
      stepFourText: "\u0627\u0633\u062A\u0639\u062F \u0644\u0644\u062F\u0648\u0627\u0645 \u0648\u0627\u0644\u0631\u0648\u062A\u064A\u0646 \u0648\u0627\u0644\u0645\u0648\u0627\u0635\u0644\u0627\u062A.",
      contactEyebrow: "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
      contactTitle: "\u0632\u0631 \u0623\u0648 \u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u0631\u0633\u0629 \u0642\u0635\u0629 \u0646\u062C\u0627\u062D",
      contactText: "\u0623\u0631\u0633\u0644 \u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0627\u064B\u060C \u0627\u062A\u0635\u0644 \u0628\u0627\u0644\u0625\u062F\u0627\u0631\u0629\u060C \u0623\u0648 \u0627\u0641\u062A\u062D \u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A \u0625\u0644\u0649 \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0641\u064A \u0625\u0631\u0628\u062F.",
      parentName: "\u0627\u0633\u0645 \u0648\u0644\u064A \u0627\u0644\u0623\u0645\u0631",
      parentPhone: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0648\u0644\u064A \u0627\u0644\u0623\u0645\u0631",
      interestedGrade: "\u0627\u0644\u0635\u0641 \u0627\u0644\u0645\u0637\u0644\u0648\u0628",
      chooseGrade: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0641",
      message: "\u0627\u0644\u0631\u0633\u0627\u0644\u0629",
      messagePlaceholder: "\u0627\u0643\u062A\u0628 \u0643\u064A\u0641 \u064A\u0645\u0643\u0646\u0646\u0627 \u0645\u0633\u0627\u0639\u062F\u062A\u0643.",
      sendInquiry: "\u0627\u0641\u062A\u062D \u0645\u0633\u0648\u062F\u0629 Gmail",
      inquiryNote: "\u064A\u0641\u062A\u062D Gmail \u0631\u0633\u0627\u0644\u0629 \u062C\u0627\u0647\u0632\u0629. \u0631\u0627\u062C\u0639\u0647\u0627 \u062B\u0645 \u0627\u0636\u063A\u0637 \u0625\u0631\u0633\u0627\u0644 \u0645\u0646 \u062D\u0633\u0627\u0628\u0643.",
      inquiryOpening: "\u064A\u062A\u0645 \u0641\u062A\u062D \u0645\u0633\u0648\u062F\u0629 Gmail \u062C\u0627\u0647\u0632\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062F\u0631\u0633\u0629.",
      address: "\u062E\u0644\u0641 \u0645\u0633\u062A\u0634\u0641\u0649 \u0625\u0631\u0628\u062F \u0627\u0644\u062A\u062E\u0635\u0635\u064A\u060C \u0625\u0631\u0628\u062F\u060C \u0627\u0644\u0623\u0631\u062F\u0646",
      exactLocation: "\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062F\u0642\u064A\u0642: 32.532984, 35.863854",
      directions: "\u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A",
      whatsapp: "\u0648\u0627\u062A\u0633\u0627\u0628",
      email: "\u0627\u0644\u0628\u0631\u064A\u062F",
      heroCardKicker: "\u0645\u0643\u062A\u0628 \u0627\u0644\u062A\u0633\u062C\u064A\u0644",
      heroCardTitle: "\u0645\u0633\u0627\u0631 \u0648\u0627\u0636\u062D \u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631 \u0625\u0644\u0649 \u0623\u0648\u0644 \u064A\u0648\u0645.",
      heroCardText: "\u062A\u0633\u062A\u0637\u064A\u0639 \u0627\u0644\u0639\u0627\u0626\u0644\u0627\u062A \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0629\u060C \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0645\u062F\u0631\u0633\u0629\u060C \u062B\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0627\u0644\u0622\u0645\u0646\u0629 \u0628\u0639\u062F \u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u0648\u0635\u0648\u0644.",
      heroCardPointOne: "\u0646\u0638\u0627\u0645 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062F\u0631\u0633\u064A \u0648\u0627\u062D\u062F",
      heroCardPointTwo: "\u062D\u0633\u0627\u0628\u0627\u062A \u0644\u0644\u0637\u0644\u0627\u0628 \u0648\u0627\u0644\u0645\u0639\u0644\u0645\u064A\u0646 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0629",
      heroCardPointThree: "\u0633\u062C\u0644\u0627\u062A \u0635\u0641\u064A\u0629 \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u0646\u0638\u0627\u0645",
      heroStatGrades: "\u0645\u0633\u062A\u0648\u064A\u0627\u062A \u062F\u0631\u0627\u0633\u064A\u0629",
      heroStatPortal: "\u062D\u0633\u0627\u0628\u0627\u062A \u0622\u0645\u0646\u0629",
      heroStatLocation: "\u0645\u0628\u0646\u0649 \u0625\u0631\u0628\u062F",
      heroStatLanguage: "\u0639\u0631\u0628\u064A + \u0625\u0646\u062C\u0644\u064A\u0632\u064A",
      proofEyebrow: "\u0644\u0645\u0627\u0630\u0627 \u062A\u062B\u0642 \u0627\u0644\u0639\u0627\u0626\u0644\u0627\u062A \u0628\u0646\u0627",
      proofTitle: "\u0645\u0648\u0642\u0639 \u0645\u062F\u0631\u0633\u064A \u064A\u0634\u0639\u0631 \u0628\u0646\u0641\u0633 \u062A\u0646\u0638\u064A\u0645 \u0627\u0644\u0645\u062F\u0631\u0633\u0629.",
      proofText: "\u062A\u062C\u0631\u0628\u0629 \u062C\u062F\u064A\u062F\u0629 \u062A\u062C\u0645\u0639 \u0627\u0644\u0645\u0628\u0646\u0649\u060C \u0627\u0644\u062A\u0633\u062C\u064A\u0644\u060C \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0627\u062A\u060C \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0633\u0629\u060C \u0648\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0641\u064A \u0645\u0633\u0627\u0631 \u0648\u0627\u0636\u062D \u0644\u0644\u0623\u0647\u0644.",
      proofAcademicsTitle: "\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0627\u062A \u0645\u0646\u0638\u0645\u0629",
      proofAcademicsText: "\u0631\u062D\u0644\u0629 \u0648\u0627\u0636\u062D\u0629 \u0645\u0646 \u0627\u0644\u0635\u0641 \u0627\u0644\u0623\u0648\u0644 \u062D\u062A\u0649 \u0627\u0644\u0639\u0627\u0634\u0631 \u0645\u0639 \u062A\u0639\u0644\u0645 \u0639\u0631\u0628\u064A \u0623\u0648\u0644\u0627\u064B \u0648\u062A\u0639\u0644\u064A\u0645 \u0625\u0646\u062C\u0644\u064A\u0632\u064A.",
      proofPortalTitle: "\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062F\u0631\u0633\u064A\u0629 \u062C\u062F\u064A\u0629",
      proofPortalText: "\u0644\u0644\u0637\u0644\u0627\u0628 \u0648\u0627\u0644\u0645\u0639\u0644\u0645\u064A\u0646 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062D\u0645\u064A\u0629 \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0633\u0629.",
      proofCareTitle: "\u062D\u064A\u0627\u0629 \u0637\u0644\u0627\u0628\u064A\u0629 \u0648\u0627\u0636\u062D\u0629",
      proofCareText: "\u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0648\u0627\u0644\u0631\u062D\u0644\u0627\u062A \u0648\u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0644\u0627\u062A \u0648\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0627\u0644\u0635\u0641 \u062A\u0638\u0647\u0631 \u0643\u062C\u0632\u0621 \u0645\u0646 \u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u062F\u0631\u0633\u0629.",
      proofAccessTitle: "\u062A\u0648\u0627\u0635\u0644 \u0633\u0647\u0644",
      proofAccessText: "\u064A\u0645\u0643\u0646 \u0644\u0644\u0623\u0647\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644\u060C \u0627\u0644\u0645\u0631\u0627\u0633\u0644\u0629\u060C \u0627\u0644\u0625\u064A\u0645\u064A\u0644\u060C \u0641\u062A\u062D \u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A\u060C \u0623\u0648 \u0628\u062F\u0621 \u0627\u0633\u062A\u0641\u0633\u0627\u0631 \u0645\u0646 \u0645\u0643\u0627\u0646 \u0648\u0627\u062D\u062F.",
      portalPreviewEyebrow: "\u0639\u0645\u0644\u064A\u0627\u062A \u0645\u062F\u0631\u0633\u064A\u0629 \u062D\u064A\u0629",
      portalPreviewTitle: "\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062F\u0631\u0633\u064A\u0629 \u062A\u0628\u062F\u0648 \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0646\u0638\u0627\u0645 \u0623\u0643\u0627\u062F\u064A\u0645\u064A \u062D\u0642\u064A\u0642\u064A.",
      portalPreviewText: "\u064A\u0639\u0631\u0636 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0622\u0645\u0646\u0629 \u0627\u0644\u062A\u064A \u064A\u0633\u062A\u062E\u062F\u0645\u0647\u0627 \u0627\u0644\u0623\u0647\u0644 \u0648\u0627\u0644\u0645\u0639\u0644\u0645\u0648\u0646 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u064A\u0648\u0645\u064A\u0627\u064B.",
      previewStudent: "\u0633\u062C\u0644 \u0637\u0627\u0644\u0628",
      previewClass: "\u0627\u0644\u0635\u0641 8 B",
      previewAttendance: "\u0627\u0644\u062D\u0636\u0648\u0631",
      previewHomework: "\u0627\u0644\u0648\u0627\u062C\u0628\u0627\u062A",
      previewFees: "\u0627\u0644\u0631\u0633\u0648\u0645",
      previewStatusPosted: "\u0645\u0646\u0634\u0648\u0631",
      previewStatusReady: "\u062C\u0627\u0647\u0632",
      previewStatusSecure: "\u0622\u0645\u0646",
      previewRoster: "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0635\u0641",
      previewAverage: "\u0627\u0644\u0645\u0639\u062F\u0644",
      previewAnnouncement: "\u0625\u0639\u0644\u0627\u0646",
      footerText: "\u0645\u062F\u0631\u0633\u0629 \u0642\u0635\u0629 \u0646\u062C\u0627\u062D. \u0646\u0628\u0646\u064A \u0627\u0644\u062C\u064A\u0644 \u0627\u0644\u062C\u062F\u064A\u062F."
    }
  };
  var truthCopyKeys = [
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
  var truthCopy = truthCopyKeys.reduce((values, key) => {
    values[key] = copy.en[key];
    return values;
  }, {});
  var grades = Array.from({ length: 10 }, (_, index) => `Grade ${index + 1}`);
  var navItems = [
    ["navAcademics", "#academics"],
    ["navLife", "#life"],
    ["navPortals", "#portals"],
    ["navAdmissions", "#admissions"],
    ["navContact", "#contact"]
  ];
  var highlights = [
    ["grades", GraduationCap],
    ["curriculum", BookOpen],
    ["language", Globe2],
    ["transport", Bus]
  ];
  var proofPoints = [
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
  var portalPreviewRows = [
    ["previewAttendance", "When posted", "previewStatusPosted"],
    ["previewHomework", "Staff posts", "previewStatusReady"],
    ["previewFees", "Account only", "previewStatusSecure"],
    ["previewRoster", "Class-linked", "previewStatusReady"],
    ["previewAverage", "Real grades", "previewStatusPosted"],
    ["previewAnnouncement", "School posts", "previewStatusReady"]
  ];
  var howItWorksSteps = [
    ["01", "howWorksInquiryTitle", "howWorksInquiryText"],
    ["02", "howWorksAccountTitle", "howWorksAccountText"],
    ["03", "howWorksRecordsTitle", "howWorksRecordsText"],
    ["04", "howWorksFollowupTitle", "howWorksFollowupText"]
  ];
  var feedbackSlots = [
    "feedbackSlotParent",
    "feedbackSlotTeacher",
    "feedbackSlotAdmin"
  ];
  var trustBadges = [
    "trustBadgeStack",
    "trustBadgeBackend",
    "trustBadgeDatabase",
    "trustBadgeSessions",
    "trustBadgePasswords",
    "trustBadgeHonest"
  ];
  var faqItems = [
    ["faqOneQ", "faqOneA"],
    ["faqTwoQ", "faqTwoA"],
    ["faqThreeQ", "faqThreeA"],
    ["faqFourQ", "faqFourA"]
  ];
  var portals = [
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
  var profileModes = [
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
  var stages = [
    ["01", "foundation", "foundationText", "Grades 1-3"],
    ["02", "upperPrimary", "upperPrimaryText", "Grades 4-6"],
    ["03", "middle", "middleText", "Grades 7-8"],
    ["04", "secondary", "secondaryText", "Grades 9-10"]
  ];
  var admissions = [
    ["01", "stepOne", "stepOneText"],
    ["02", "stepTwo", "stepTwoText"],
    ["03", "stepThree", "stepThreeText"],
    ["04", "stepFour", "stepFourText"]
  ];

  // src/site/services/api.js
  var DEFAULT_SCHOOL_NAME = "Success Story School";
  function buildInquiryDraft({ isArabic, name, phone, grade, message, schoolName = DEFAULT_SCHOOL_NAME }) {
    const subject = isArabic ? `\u0627\u0633\u062A\u0641\u0633\u0627\u0631 \u062A\u0633\u062C\u064A\u0644 - ${grade || schoolName}` : `School inquiry - ${grade || schoolName}`;
    const body = isArabic ? [
      `\u0627\u0633\u0645 \u0648\u0644\u064A \u0627\u0644\u0623\u0645\u0631: ${name}`,
      `\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641: ${phone}`,
      `\u0627\u0644\u0635\u0641 \u0627\u0644\u0645\u0637\u0644\u0648\u0628: ${grade}`,
      "",
      message || "\u0623\u0631\u063A\u0628 \u0628\u0627\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631 \u0639\u0646 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0641\u064A \u0645\u062F\u0631\u0633\u0629 \u0642\u0635\u0629 \u0646\u062C\u0627\u062D."
    ].join("\n") : [
      `Parent name: ${name}`,
      `Phone: ${phone}`,
      `Interested grade: ${grade}`,
      "",
      message || "I would like to ask about enrollment at Success Story School."
    ].join("\n");
    return { subject, body };
  }
  function openInquiryComposer({ formElement, isArabic, schoolEmail: schoolEmail2, schoolName = DEFAULT_SCHOOL_NAME }) {
    const data = new FormData(formElement);
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      grade: String(data.get("grade") || "").trim(),
      message: String(data.get("message") || "").trim()
    };
    const draft = buildInquiryDraft({ ...payload, isArabic, schoolName });
    const gmailUrl = new URL("https://mail.google.com/mail/");
    gmailUrl.search = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: schoolEmail2,
      su: draft.subject,
      body: draft.body
    }).toString();
    if (!window.open(gmailUrl.toString(), "_blank", "noopener")) {
      window.location.href = gmailUrl.toString();
    }
    return payload;
  }

  // src/site/hooks/useSchoolSiteState.js
  var galleryCopyByLanguage = {
    en: {
      eyebrow: "Photo gallery",
      title: "A closer look at campus spaces and school life.",
      text: "A refined dark gallery with real school photos, scaled carefully for larger screens and presented in a clear sequence."
    },
    ar: {
      eyebrow: "\u062C\u0648\u0644\u0629 \u0628\u0627\u0644\u0635\u0648\u0631",
      title: "\u0646\u0638\u0631\u0629 \u0623\u0642\u0631\u0628 \u0625\u0644\u0649 \u0627\u0644\u062D\u0631\u0645 \u0648\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0645\u062F\u0631\u0633\u064A\u0629.",
      text: "\u0645\u0639\u0631\u0636 \u062F\u0627\u0643\u0646 \u064A\u0639\u0631\u0636 \u0627\u0644\u062D\u0631\u0645 \u0648\u0627\u0644\u0645\u0633\u0627\u062D\u0627\u062A \u0648\u0628\u0639\u0636 \u0627\u0644\u0645\u0634\u0627\u0647\u062F \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0628\u062A\u0646\u0642\u0644 \u0633\u0644\u0633 \u0648\u0648\u0627\u0636\u062D."
    }
  };
  function getInitialLanguage() {
    try {
      return localStorage.getItem("sss-language") === "ar" ? "ar" : "en";
    } catch {
      return "en";
    }
  }
  function useSchoolSiteState() {
    const [language, setLanguage] = useState(getInitialLanguage);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mode, setMode] = useState("parents");
    const [formStatus, setFormStatus] = useState("");
    const t = useMemo(() => ({ ...copy[language], ...truthCopy }), [language]);
    const isArabic = language === "ar";
    const activeMode = useMemo(
      () => profileModes.find((item) => item.id === mode) ?? profileModes[0],
      [mode]
    );
    const galleryCopy = galleryCopyByLanguage[language] ?? galleryCopyByLanguage.en;
    useEffect(() => {
      document.documentElement.lang = language;
      document.documentElement.dir = isArabic ? "rtl" : "ltr";
      document.title = t.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = t.description;
      }
      try {
        localStorage.setItem("sss-language", language);
      } catch {
      }
    }, [isArabic, language, t.description, t.title]);
    useEffect(() => {
      document.body.classList.toggle("menu-open", menuOpen);
      return () => document.body.classList.remove("menu-open");
    }, [menuOpen]);
    useEffect(() => {
      const cards = Array.from(document.querySelectorAll("[data-reveal-card]"));
      if (!cards.length) {
        return void 0;
      }
      cards.forEach((card, index) => {
        card.style.setProperty("--reveal-delay", `${index % 3 * 100}ms`);
      });
      if (!("IntersectionObserver" in window)) {
        cards.forEach((card) => {
          card.dataset.reveal = "visible";
        });
        return void 0;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }
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
      setLanguage((current) => current === "en" ? "ar" : "en");
      setMenuOpen(false);
    };
    const toggleMenu = () => {
      setMenuOpen((open) => !open);
    };
    const closeMenu = () => setMenuOpen(false);
    const handleInquiry = (event) => {
      event.preventDefault();
      setFormStatus(t.inquiryOpening);
      openInquiryComposer({
        formElement: event.currentTarget,
        isArabic,
        schoolEmail
      });
    };
    return {
      activeMode,
      closeMenu,
      formStatus,
      galleryCopy,
      handleInquiry,
      isArabic,
      language,
      menuOpen,
      mode,
      setMode,
      t,
      toggleLanguage,
      toggleMenu
    };
  }

  // src/site/utils/cx.js
  function cx(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // src/carousel/react-jsx-runtime.js
  var Fragment2 = react_global_default.Fragment;
  function createJsxElement(type, props, key) {
    const nextProps = props ? { ...props } : {};
    if (key !== void 0) {
      nextProps.key = key;
    }
    return react_global_default.createElement(type, nextProps);
  }
  var jsx = createJsxElement;
  var jsxs = createJsxElement;

  // src/site/components/primitives.jsx
  function BrandLockup({ href = "#top", onClick, className = "", ariaLabel = "Success Story School home", size = 52 }) {
    return /* @__PURE__ */ jsxs("a", { className: cx("brand", className), href, onClick, "aria-label": ariaLabel, children: [
      /* @__PURE__ */ jsx("img", { src: "assets/success-story-logo.jpg", alt: "", width: size, height: size }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Success Story" }),
        /* @__PURE__ */ jsx("small", { children: "School" })
      ] })
    ] });
  }
  function IconLabel({ icon: Icon, children }) {
    return /* @__PURE__ */ jsxs("span", { className: "icon-label", children: [
      /* @__PURE__ */ jsx(Icon, { size: 18, strokeWidth: 2.2, "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("span", { children })
    ] });
  }
  function ActionLink({ href, children, icon: Icon = ArrowRight, variant = "primary", ...props }) {
    return /* @__PURE__ */ jsxs("a", { className: cx("action-link", variant), href, ...props, children: [
      /* @__PURE__ */ jsx("span", { children }),
      /* @__PURE__ */ jsx(Icon, { size: 18, strokeWidth: 2.4, "aria-hidden": "true" })
    ] });
  }
  function SplitHeading({ eyebrow, title, text, className = "", action = null }) {
    return /* @__PURE__ */ jsxs("div", { className: cx("shell", "split-heading", className), children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: eyebrow }),
        /* @__PURE__ */ jsx("h2", { children: title })
      ] }),
      action ?? /* @__PURE__ */ jsx("p", { children: text })
    ] });
  }

  // src/site/components/layout/SiteFooter.jsx
  function SiteFooter({ t, isArabic }) {
    const feedbackLabel = isArabic ? "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629" : "FAQ";
    const officeLabel = isArabic ? "\u0627\u062A\u0635\u0644 \u0628\u0627\u0644\u0625\u062F\u0627\u0631\u0629" : "Call the office";
    const locationLabel = isArabic ? "\u0625\u0631\u0628\u062F\u060C \u0627\u0644\u0623\u0631\u062F\u0646" : "Irbid, Jordan";
    const copyrightLabel = isArabic ? "\xA9 2026 \u0645\u062F\u0631\u0633\u0629 \u0642\u0635\u0629 \u0646\u062C\u0627\u062D. \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629." : "\xA9 2026 Success Story School. All rights reserved.";
    const arabicSchoolName = "\u0645\u062F\u0631\u0633\u0629 \u0642\u0635\u0629 \u0646\u062C\u0627\u062D - \u0625\u0631\u0628\u062F\u060C \u0627\u0644\u0623\u0631\u062F\u0646";
    return /* @__PURE__ */ jsxs("footer", { className: "site-footer", children: [
      /* @__PURE__ */ jsxs("div", { className: "shell footer-grid", children: [
        /* @__PURE__ */ jsxs("div", { className: "footer-column footer-primary", children: [
          /* @__PURE__ */ jsx(BrandLockup, { className: "footer-brand", size: 56 }),
          /* @__PURE__ */ jsx("p", { children: t.heroText }),
          /* @__PURE__ */ jsx(ActionLink, { href: "#contact", variant: "primary", children: t.beginEnrollment })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "footer-column footer-links-column", children: [
          /* @__PURE__ */ jsx("span", { className: "footer-label", children: isArabic ? "\u0627\u0644\u062A\u0646\u0642\u0644" : "Navigation" }),
          /* @__PURE__ */ jsx("a", { href: "#academics", children: t.navAcademics }),
          /* @__PURE__ */ jsx("a", { href: "#life", children: t.navLife }),
          /* @__PURE__ */ jsx("a", { href: "#portals", children: t.navPortals }),
          /* @__PURE__ */ jsx("a", { href: "#admissions", children: t.navAdmissions }),
          /* @__PURE__ */ jsx("a", { href: "#faq", children: feedbackLabel })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "footer-column footer-links-column", children: [
          /* @__PURE__ */ jsx("span", { className: "footer-label", children: t.navContact }),
          /* @__PURE__ */ jsxs("a", { href: phoneHref, children: [
            /* @__PURE__ */ jsx(Phone, { size: 18, "aria-hidden": "true" }),
            officeLabel
          ] }),
          /* @__PURE__ */ jsxs("a", { href: `mailto:${schoolEmail}`, children: [
            /* @__PURE__ */ jsx(Globe2, { size: 18, "aria-hidden": "true" }),
            schoolEmail
          ] }),
          /* @__PURE__ */ jsxs("a", { href: mapsHref, target: "_blank", rel: "noreferrer", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 18, "aria-hidden": "true" }),
            locationLabel
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "shell footer-meta", children: [
        /* @__PURE__ */ jsx("span", { children: copyrightLabel }),
        /* @__PURE__ */ jsx("span", { children: arabicSchoolName })
      ] })
    ] });
  }

  // src/site/components/layout/SiteHeader.jsx
  function SiteHeader({ t, menuOpen, closeMenu, toggleMenu, toggleLanguage }) {
    return /* @__PURE__ */ jsx("header", { className: "site-header", children: /* @__PURE__ */ jsxs("nav", { className: "shell nav", "aria-label": "Primary navigation", children: [
      /* @__PURE__ */ jsx(BrandLockup, { onClick: closeMenu }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "menu-button",
          type: "button",
          "aria-label": menuOpen ? t.menuClose : t.menuOpen,
          "aria-expanded": menuOpen,
          onClick: toggleMenu,
          children: menuOpen ? /* @__PURE__ */ jsx(X, { size: 24, strokeWidth: 2.2, "aria-hidden": "true" }) : /* @__PURE__ */ jsx(Menu, { size: 24, strokeWidth: 2.2, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: cx("nav-panel", menuOpen && "open"), children: [
        /* @__PURE__ */ jsx("div", { className: "nav-links", children: navItems.map(([label, href]) => /* @__PURE__ */ jsx("a", { href, onClick: closeMenu, children: t[label] }, href)) }),
        /* @__PURE__ */ jsxs("div", { className: "nav-actions", children: [
          /* @__PURE__ */ jsxs("button", { className: "language-button", type: "button", onClick: toggleLanguage, "aria-label": t.languageAria, children: [
            /* @__PURE__ */ jsx(Globe2, { size: 18, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: t.languageLabel })
          ] }),
          /* @__PURE__ */ jsx(ActionLink, { href: "#contact", variant: "primary", onClick: closeMenu, children: t.beginEnrollment })
        ] })
      ] })
    ] }) });
  }

  // src/site/components/sections/AcademicsSection.jsx
  function AcademicsSection({ t }) {
    return /* @__PURE__ */ jsxs("section", { className: "section academics", id: "academics", children: [
      /* @__PURE__ */ jsx(SplitHeading, { eyebrow: t.academicsEyebrow, title: t.academicsTitle, text: t.academicsText }),
      /* @__PURE__ */ jsx("div", { className: "shell card-grid four", children: stages.map(([number, title, text, gradeRange]) => /* @__PURE__ */ jsxs("article", { className: "info-card stage-card", "data-reveal-card": true, children: [
        /* @__PURE__ */ jsx("span", { className: "card-number", children: number }),
        /* @__PURE__ */ jsx("h3", { children: t[title] }),
        /* @__PURE__ */ jsx("p", { children: t[text] }),
        /* @__PURE__ */ jsx("strong", { children: gradeRange })
      ] }, number)) })
    ] });
  }

  // src/site/components/sections/AdmissionsSection.jsx
  function AdmissionsSection({ t }) {
    return /* @__PURE__ */ jsxs("section", { className: "section admissions", id: "admissions", children: [
      /* @__PURE__ */ jsx(
        SplitHeading,
        {
          eyebrow: t.admissionsEyebrow,
          title: t.admissionsTitle,
          action: /* @__PURE__ */ jsx(ActionLink, { href: "#contact", variant: "primary", icon: CalendarDays, children: t.applyToday })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "shell timeline", children: admissions.map(([number, title, text]) => /* @__PURE__ */ jsxs("article", { className: "timeline-step", "data-reveal-card": true, children: [
        /* @__PURE__ */ jsx("span", { children: number }),
        /* @__PURE__ */ jsx("h3", { children: t[title] }),
        /* @__PURE__ */ jsx("p", { children: t[text] })
      ] }, number)) })
    ] });
  }

  // src/site/components/sections/ContactSection.jsx
  function ContactSection({ t, isArabic, formStatus, handleInquiry }) {
    return /* @__PURE__ */ jsx("section", { className: "section contact", id: "contact", children: /* @__PURE__ */ jsxs("div", { className: "shell contact-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-copy contact-copy", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: t.contactEyebrow }),
        /* @__PURE__ */ jsx("h2", { children: t.contactTitle }),
        /* @__PURE__ */ jsx("p", { children: t.contactText }),
        /* @__PURE__ */ jsxs("div", { className: "contact-actions", children: [
          /* @__PURE__ */ jsx(ActionLink, { href: phoneHref, variant: "primary", icon: Phone, children: phoneNumber }),
          /* @__PURE__ */ jsx(ActionLink, { href: whatsappHref, variant: "secondary", icon: MessageCircle, target: "_blank", rel: "noopener noreferrer", children: t.whatsapp }),
          /* @__PURE__ */ jsx(ActionLink, { href: mapsHref, variant: "ghost", icon: MapPin, target: "_blank", rel: "noopener noreferrer", children: t.directions })
        ] }),
        /* @__PURE__ */ jsxs("address", { children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx(MapPin, { size: 17, "aria-hidden": "true" }),
            t.address
          ] }),
          /* @__PURE__ */ jsx("span", { children: t.exactLocation }),
          /* @__PURE__ */ jsxs("a", { href: `mailto:${schoolEmail}`, children: [
            t.email,
            ": ",
            schoolEmail
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { className: "inquiry-form", onSubmit: handleInquiry, children: [
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: t.parentName }),
          /* @__PURE__ */ jsx("input", { name: "name", type: "text", autoComplete: "name", required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: t.parentPhone }),
          /* @__PURE__ */ jsx("input", { name: "phone", type: "tel", autoComplete: "tel", required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: t.interestedGrade }),
          /* @__PURE__ */ jsxs("select", { name: "grade", required: true, defaultValue: "", children: [
            /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: t.chooseGrade }),
            grades.map((grade) => /* @__PURE__ */ jsx("option", { value: grade, children: isArabic ? grade.replace("Grade", "\u0627\u0644\u0635\u0641") : grade }, grade))
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: t.message }),
          /* @__PURE__ */ jsx("textarea", { name: "message", rows: 4, placeholder: t.messagePlaceholder })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "form-submit", type: "submit", children: [
          /* @__PURE__ */ jsx("span", { children: t.sendInquiry }),
          /* @__PURE__ */ jsx(ArrowRight, { size: 18, strokeWidth: 2.4, "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "form-note", children: t.inquiryNote }),
        /* @__PURE__ */ jsx("p", { className: "form-status", "aria-live": "polite", children: formStatus })
      ] })
    ] }) });
  }

  // src/site/components/sections/FaqSection.jsx
  function FaqSection({ t }) {
    return /* @__PURE__ */ jsx("section", { className: "section faq-section", id: "faq", children: /* @__PURE__ */ jsxs("div", { className: "shell faq-layout", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-copy", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: t.faqEyebrow }),
        /* @__PURE__ */ jsx("h2", { children: t.faqTitle })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "faq-stack", children: faqItems.map(([question, answer], index) => /* @__PURE__ */ jsxs("details", { className: "faq-item", open: index === 1, children: [
        /* @__PURE__ */ jsxs("summary", { children: [
          /* @__PURE__ */ jsx("span", { children: t[question] }),
          /* @__PURE__ */ jsx("span", { className: "faq-toggle", "aria-hidden": "true", children: "+" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "faq-answer", children: /* @__PURE__ */ jsx("p", { children: t[answer] }) })
      ] }, question)) })
    ] }) });
  }

  // src/site/components/sections/FeedbackSection.jsx
  function FeedbackSection({ t }) {
    return /* @__PURE__ */ jsx("section", { className: "section feedback-section", id: "feedback", "aria-labelledby": "school-feedback-title", children: /* @__PURE__ */ jsxs("div", { className: "shell feedback-layout", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-copy", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: t.feedbackEyebrow }),
        /* @__PURE__ */ jsx("h2", { id: "school-feedback-title", children: t.feedbackTitle }),
        /* @__PURE__ */ jsx("p", { children: t.feedbackText })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "feedback-grid", children: feedbackSlots.map((slot) => /* @__PURE__ */ jsxs("article", { className: "feedback-slot", children: [
        /* @__PURE__ */ jsxs("div", { className: "feedback-slot-top", children: [
          /* @__PURE__ */ jsx("span", { className: "feedback-slot-label", children: t[slot] }),
          /* @__PURE__ */ jsx("strong", { className: "feedback-status", children: t.feedbackEmpty })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "feedback-placeholder", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("span", { className: "skeleton-line wide" }),
          /* @__PURE__ */ jsx("span", { className: "skeleton-line" }),
          /* @__PURE__ */ jsx("span", { className: "skeleton-line short" })
        ] })
      ] }, slot)) })
    ] }) });
  }

  // src/site/components/sections/GallerySection.jsx
  function GallerySection({ galleryCopy, isArabic }) {
    const SchoolPhotoCarousel = window.SuccessStoryCarousel?.SchoolPhotoCarousel ?? null;
    if (!SchoolPhotoCarousel) {
      return null;
    }
    return /* @__PURE__ */ jsxs("section", { className: "section gallery-section", id: "gallery", children: [
      /* @__PURE__ */ jsxs("div", { className: "shell split-heading gallery-heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow", children: galleryCopy.eyebrow }),
          /* @__PURE__ */ jsx("h2", { children: galleryCopy.title })
        ] }),
        /* @__PURE__ */ jsx("p", { children: galleryCopy.text })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "shell", children: /* @__PURE__ */ jsx(SchoolPhotoCarousel, { locale: isArabic ? "ar" : "en" }) })
    ] });
  }

  // src/site/components/sections/HeroSection.jsx
  function HeroSection({ t, phoneHref: phoneHref2, isArabic }) {
    return /* @__PURE__ */ jsxs("section", { className: "hero", id: "top", children: [
      /* @__PURE__ */ jsx("div", { className: "hero-grid", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("div", { className: "shell hero-layout", children: [
        /* @__PURE__ */ jsxs("div", { className: "hero-content", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow hero-eyebrow-pill", children: t.heroEyebrow }),
          /* @__PURE__ */ jsx("h1", { className: "hero-title", children: isArabic ? /* @__PURE__ */ jsx("span", { children: t.heroTitle }) : /* @__PURE__ */ jsxs(Fragment2, { children: [
            /* @__PURE__ */ jsx("span", { children: "Success Story" }),
            /* @__PURE__ */ jsx("span", { className: "hero-title-accent", children: "School" })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "hero-text", children: t.heroText }),
          /* @__PURE__ */ jsxs("div", { className: "hero-actions", children: [
            /* @__PURE__ */ jsx(ActionLink, { href: "#contact", variant: "primary", children: t.beginEnrollment }),
            /* @__PURE__ */ jsx(ActionLink, { href: "#portals", variant: "secondary", icon: LayoutDashboard, children: t.openPortals }),
            /* @__PURE__ */ jsx(ActionLink, { href: phoneHref2, variant: "ghost", icon: Phone, children: t.callOffice })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "hero-card", "aria-label": t.heroCardKicker, children: [
          /* @__PURE__ */ jsx("img", { src: "assets/success-story-logo.jpg", alt: "", width: 84, height: 84 }),
          /* @__PURE__ */ jsx("span", { className: "hero-card-kicker", children: t.heroCardKicker }),
          /* @__PURE__ */ jsx("h2", { children: t.heroCardTitle }),
          /* @__PURE__ */ jsx("p", { children: t.heroCardText }),
          /* @__PURE__ */ jsx("ul", { children: [t.heroCardPointOne, t.heroCardPointTwo, t.heroCardPointThree].map((item) => /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(CheckCircle2, { size: 18, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: item })
          ] }, item)) })
        ] })
      ] })
    ] });
  }

  // src/site/components/sections/HighlightsSection.jsx
  function HighlightsSection({ t }) {
    return /* @__PURE__ */ jsx("section", { className: "highlight-strip", "aria-label": "School highlights", children: /* @__PURE__ */ jsx("div", { className: "shell highlight-grid", children: highlights.map(([label, icon]) => /* @__PURE__ */ jsx("div", { className: "highlight", children: /* @__PURE__ */ jsx(IconLabel, { icon, children: t[label] }) }, label)) }) });
  }

  // src/site/components/sections/HowItWorksSection.jsx
  function HowItWorksSection({ t }) {
    return /* @__PURE__ */ jsxs("section", { className: "section how-works", id: "how-it-works", children: [
      /* @__PURE__ */ jsx(SplitHeading, { eyebrow: t.howWorksEyebrow, title: t.howWorksTitle, text: t.howWorksText }),
      /* @__PURE__ */ jsx("div", { className: "shell how-works-grid", children: howItWorksSteps.map(([number, title, text]) => /* @__PURE__ */ jsxs("article", { className: "how-step", "data-reveal-card": true, children: [
        /* @__PURE__ */ jsx("span", { children: number }),
        /* @__PURE__ */ jsx("h3", { children: t[title] }),
        /* @__PURE__ */ jsx("p", { children: t[text] })
      ] }, number)) })
    ] });
  }

  // src/site/components/sections/OverviewSection.jsx
  var MODE_CARDS = {
    en: {
      parents: [
        {
          number: "01",
          title: "Simple enrollment path",
          text: "Families can understand grades, transport, campus location, and school contact in one clear visit."
        },
        {
          number: "02",
          title: "Public school information",
          text: "Academics, student life, admissions, and contact stay visible before any account is issued."
        },
        {
          number: "03",
          title: "Direct office follow-up",
          text: "Questions go to the school office directly instead of being lost across separate links and messages."
        }
      ],
      students: [
        {
          number: "01",
          title: "Issued school ID",
          text: "Each student signs in with a school-issued ID and a private password after access is approved."
        },
        {
          number: "02",
          title: "Records when posted",
          text: "Attendance, grades, homework, announcements, fees, and transport appear only after staff publish them."
        },
        {
          number: "03",
          title: "Clean daily overview",
          text: "The student view stays calm, readable, and useful as soon as real information becomes available."
        }
      ],
      staff: [
        {
          number: "01",
          title: "Protected sign-in paths",
          text: "Teachers and administrators use role-based access instead of public-facing pages or shared passwords."
        },
        {
          number: "02",
          title: "Real class operations",
          text: "Homework, attendance, announcements, verification, and records are managed from secure school dashboards."
        },
        {
          number: "03",
          title: "One connected system",
          text: "Public information, account issuance, and student records stay connected without scattered admin work."
        }
      ]
    },
    ar: {
      parents: [
        {
          number: "01",
          title: "\u0645\u0633\u0627\u0631 \u062A\u0633\u062C\u064A\u0644 \u0648\u0627\u0636\u062D",
          text: "\u062A\u0633\u062A\u0637\u064A\u0639 \u0627\u0644\u0639\u0627\u0626\u0644\u0629 \u0641\u0647\u0645 \u0627\u0644\u0635\u0641\u0648\u0641 \u0648\u0627\u0644\u0645\u0648\u0627\u0635\u0644\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0637\u0631\u0642 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0641\u064A \u0632\u064A\u0627\u0631\u0629 \u0631\u0642\u0645\u064A\u0629 \u0648\u0627\u062D\u062F\u0629 \u0648\u0627\u0636\u062D\u0629."
        },
        {
          number: "02",
          title: "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0627\u0644\u0639\u0627\u0645\u0629",
          text: "\u062A\u0628\u0642\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0627\u062A \u0648\u062D\u064A\u0627\u0629 \u0627\u0644\u0637\u0644\u0627\u0628 \u0648\u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u062A\u0627\u062D\u0629 \u0642\u0628\u0644 \u0625\u0635\u062F\u0627\u0631 \u0623\u064A \u062D\u0633\u0627\u0628."
        },
        {
          number: "03",
          title: "\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0645\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",
          text: "\u062A\u0635\u0644 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0625\u0644\u0649 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0628\u062F\u0644 \u0623\u0646 \u062A\u0636\u064A\u0639 \u0628\u064A\u0646 \u0631\u0648\u0627\u0628\u0637 \u0648\u0631\u0633\u0627\u0626\u0644 \u0645\u062A\u0641\u0631\u0642\u0629."
        }
      ],
      students: [
        {
          number: "01",
          title: "\u0631\u0642\u0645 \u0645\u062F\u0631\u0633\u064A \u0645\u0639\u062A\u0645\u062F",
          text: "\u064A\u0633\u062C\u0644 \u0643\u0644 \u0637\u0627\u0644\u0628 \u0627\u0644\u062F\u062E\u0648\u0644 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0631\u0642\u0645 \u0645\u062F\u0631\u0633\u064A \u062A\u0635\u062F\u0631\u0647 \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0648\u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u062E\u0627\u0635\u0629 \u0628\u0639\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629."
        },
        {
          number: "02",
          title: "\u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0639\u0646\u062F \u0627\u0644\u0646\u0634\u0631",
          text: "\u064A\u0638\u0647\u0631 \u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0648\u0627\u0644\u0648\u0627\u062C\u0628\u0627\u062A \u0648\u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A \u0648\u0627\u0644\u0631\u0633\u0648\u0645 \u0648\u0627\u0644\u0645\u0648\u0627\u0635\u0644\u0627\u062A \u0641\u0642\u0637 \u0628\u0639\u062F \u0623\u0646 \u064A\u0646\u0634\u0631\u0647\u0627 \u0627\u0644\u0643\u0627\u062F\u0631."
        },
        {
          number: "03",
          title: "\u0648\u0627\u062C\u0647\u0629 \u064A\u0648\u0645\u064A\u0629 \u0647\u0627\u062F\u0626\u0629",
          text: "\u062A\u0628\u0642\u0649 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0637\u0627\u0644\u0628 \u0648\u0627\u0636\u062D\u0629 \u0648\u0633\u0647\u0644\u0629 \u0648\u062A\u0635\u0628\u062D \u0645\u0641\u064A\u062F\u0629 \u0641\u0648\u0631 \u062A\u0648\u0641\u0631 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062D\u0642\u064A\u0642\u064A\u0629."
        }
      ],
      staff: [
        {
          number: "01",
          title: "\u0645\u0633\u0627\u0631\u0627\u062A \u062F\u062E\u0648\u0644 \u0645\u062D\u0645\u064A\u0629",
          text: "\u064A\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0645\u0639\u0644\u0645\u0648\u0646 \u0648\u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0648\u0646 \u0648\u0635\u0648\u0644\u0627\u064B \u0645\u0628\u0646\u064A\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0631 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0635\u0641\u062D\u0627\u062A \u0639\u0627\u0645\u0629 \u0623\u0648 \u0643\u0644\u0645\u0627\u062A \u0645\u0631\u0648\u0631 \u0645\u0634\u062A\u0631\u0643\u0629."
        },
        {
          number: "02",
          title: "\u0639\u0645\u0644\u064A\u0627\u062A \u0635\u0641\u064A\u0629 \u062D\u0642\u064A\u0642\u064A\u0629",
          text: "\u062A\u062F\u0627\u0631 \u0627\u0644\u0648\u0627\u062C\u0628\u0627\u062A \u0648\u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A \u0648\u0627\u0644\u062A\u062D\u0642\u0642 \u0648\u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0645\u0646 \u0644\u0648\u062D\u0627\u062A \u0645\u062F\u0631\u0633\u064A\u0629 \u0622\u0645\u0646\u0629."
        },
        {
          number: "03",
          title: "\u0646\u0638\u0627\u0645 \u0648\u0627\u062D\u062F \u0645\u062A\u0631\u0627\u0628\u0637",
          text: "\u062A\u0628\u0642\u0649 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0629 \u0648\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0648\u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0637\u0644\u0627\u0628\u064A\u0629 \u0636\u0645\u0646 \u0646\u0638\u0627\u0645 \u0648\u0627\u062D\u062F \u0628\u062F\u0648\u0646 \u0639\u0645\u0644 \u0645\u0634\u062A\u062A."
        }
      ]
    }
  };
  function OverviewSection({ t, mode, setMode, isArabic }) {
    const cards = MODE_CARDS[isArabic ? "ar" : "en"][mode];
    return /* @__PURE__ */ jsx("section", { className: "section overview", id: "overview", children: /* @__PURE__ */ jsxs("div", { className: "shell overview-shell", children: [
      /* @__PURE__ */ jsxs("div", { className: "overview-copy-column", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: t.overviewEyebrow }),
        /* @__PURE__ */ jsx("h2", { children: t.overviewTitle }),
        /* @__PURE__ */ jsx("p", { children: t.overviewText }),
        /* @__PURE__ */ jsxs("div", { className: "segmented segmented-vertical", role: "tablist", "aria-label": "School audience", children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: mode === "parents" ? "active" : "", role: "tab", "aria-selected": mode === "parents", onClick: () => setMode("parents"), children: t.parentMode }),
          /* @__PURE__ */ jsx("button", { type: "button", className: mode === "students" ? "active" : "", role: "tab", "aria-selected": mode === "students", onClick: () => setMode("students"), children: t.studentMode }),
          /* @__PURE__ */ jsx("button", { type: "button", className: mode === "staff" ? "active" : "", role: "tab", "aria-selected": mode === "staff", onClick: () => setMode("staff"), children: t.staffMode })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overview-rail", role: "tabpanel", "aria-label": t[`${mode === "parents" ? "parentMode" : mode === "students" ? "studentMode" : "staffMode"}`], children: cards.map((card) => /* @__PURE__ */ jsxs("article", { className: "overview-mode-card", "data-reveal-card": true, children: [
        /* @__PURE__ */ jsx("span", { className: "overview-mode-number", children: card.number }),
        /* @__PURE__ */ jsx("h3", { children: card.title }),
        /* @__PURE__ */ jsx("p", { children: card.text })
      ] }, card.number)) })
    ] }) });
  }

  // src/site/components/sections/PortalHubSection.jsx
  function PortalHubSection({ t }) {
    return /* @__PURE__ */ jsxs("section", { className: "section portal-hub", id: "portals", children: [
      /* @__PURE__ */ jsx(SplitHeading, { eyebrow: t.navPortals, title: t.quickPortalTitle, text: t.quickPortalText }),
      /* @__PURE__ */ jsx("div", { className: "shell card-grid three", children: portals.map((portal) => {
        const Icon = portal.icon;
        return /* @__PURE__ */ jsxs("article", { className: "info-card portal-card", "data-reveal-card": true, children: [
          /* @__PURE__ */ jsx(Icon, { size: 30, strokeWidth: 2.1, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("h3", { children: t[portal.title] }),
          /* @__PURE__ */ jsx("p", { children: t[portal.text] }),
          /* @__PURE__ */ jsx(ActionLink, { href: portal.href, variant: "subtle", children: t.open })
        ] }, portal.href);
      }) })
    ] });
  }

  // src/site/components/sections/PortalPreviewSection.jsx
  function PortalPreviewSection({ t }) {
    return /* @__PURE__ */ jsx("section", { className: "portal-preview-section", children: /* @__PURE__ */ jsxs("div", { className: "shell portal-preview-layout", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-copy", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: t.portalPreviewEyebrow }),
        /* @__PURE__ */ jsx("h2", { children: t.portalPreviewTitle }),
        /* @__PURE__ */ jsx("p", { children: t.portalPreviewText }),
        /* @__PURE__ */ jsxs("div", { className: "portal-preview-actions", children: [
          /* @__PURE__ */ jsx(ActionLink, { href: "/student", variant: "primary", icon: GraduationCap, children: t.studentPortal }),
          /* @__PURE__ */ jsx(ActionLink, { href: "/teacher", variant: "secondary", icon: ClipboardList, children: t.teacherPortal })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "dashboard-preview", "aria-label": t.portalPreviewTitle, children: [
        /* @__PURE__ */ jsxs("div", { className: "dashboard-preview-top", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: t.previewStudent }),
            /* @__PURE__ */ jsx("strong", { children: t.previewClass })
          ] }),
          /* @__PURE__ */ jsx("em", { children: "SSS" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "dashboard-preview-grid", children: portalPreviewRows.map(([label, value, status]) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("span", { children: t[label] }),
          /* @__PURE__ */ jsx("strong", { children: value }),
          /* @__PURE__ */ jsx("small", { children: t[status] })
        ] }, label)) })
      ] })
    ] }) });
  }

  // src/site/components/sections/ProofSection.jsx
  function ProofSection({ t }) {
    return /* @__PURE__ */ jsx("section", { className: "section proof-section", children: /* @__PURE__ */ jsxs("div", { className: "shell proof-layout", children: [
      /* @__PURE__ */ jsxs("div", { className: "proof-copy", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: t.proofEyebrow }),
        /* @__PURE__ */ jsx("h2", { children: t.proofTitle }),
        /* @__PURE__ */ jsx("p", { children: t.proofText })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "proof-grid", children: proofPoints.map((point) => {
        const Icon = point.icon;
        return /* @__PURE__ */ jsxs("article", { className: "proof-card", "data-reveal-card": true, children: [
          /* @__PURE__ */ jsx(Icon, { size: 27, strokeWidth: 2.1, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("h3", { children: t[point.title] }),
          /* @__PURE__ */ jsx("p", { children: t[point.text] })
        ] }, point.title);
      }) })
    ] }) });
  }

  // src/site/components/sections/StudentLifeSection.jsx
  function StudentLifeSection({ t }) {
    return /* @__PURE__ */ jsx("section", { className: "section life", id: "life", children: /* @__PURE__ */ jsxs("div", { className: "shell life-grid", children: [
      /* @__PURE__ */ jsx("div", { className: "life-image", role: "img", "aria-label": "Success Story School campus", children: /* @__PURE__ */ jsx("img", { src: "assets/success-story-campus.jpg", alt: "Success Story School campus in Irbid" }) }),
      /* @__PURE__ */ jsxs("div", { className: "section-copy", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: t.lifeEyebrow }),
        /* @__PURE__ */ jsx("h2", { children: t.lifeTitle }),
        /* @__PURE__ */ jsx("p", { children: t.lifeText }),
        /* @__PURE__ */ jsx("ul", { className: "check-list", children: [t.lifeOne, t.lifeTwo, t.lifeThree].map((item) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(CheckCircle2, { size: 18, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, item)) })
      ] })
    ] }) });
  }

  // src/site/components/sections/TrustSection.jsx
  function TrustSection({ t }) {
    return /* @__PURE__ */ jsx("section", { className: "section trust-section", children: /* @__PURE__ */ jsxs("div", { className: "shell trust-layout", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-copy", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: t.trustEyebrow }),
        /* @__PURE__ */ jsx("h2", { children: t.trustTitle }),
        /* @__PURE__ */ jsx("p", { children: t.trustText })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "trust-badges", "aria-label": t.trustTitle, children: trustBadges.map((badge) => /* @__PURE__ */ jsxs("span", { className: "trust-badge", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { size: 16, "aria-hidden": "true" }),
        t[badge]
      ] }, badge)) })
    ] }) });
  }

  // src/site/App.jsx
  function App() {
    const {
      activeMode,
      closeMenu,
      formStatus,
      galleryCopy,
      handleInquiry,
      isArabic,
      menuOpen,
      mode,
      setMode,
      t,
      toggleLanguage,
      toggleMenu
    } = useSchoolSiteState();
    return /* @__PURE__ */ jsxs(Fragment2, { children: [
      /* @__PURE__ */ jsx("a", { className: "skip-link", href: "#main-content", children: t.skip }),
      /* @__PURE__ */ jsx(
        SiteHeader,
        {
          t,
          menuOpen,
          closeMenu,
          toggleMenu,
          toggleLanguage
        }
      ),
      /* @__PURE__ */ jsxs("main", { id: "main-content", children: [
        /* @__PURE__ */ jsx(HeroSection, { t, phoneHref, isArabic }),
        /* @__PURE__ */ jsx(HighlightsSection, { t }),
        /* @__PURE__ */ jsx(ProofSection, { t }),
        /* @__PURE__ */ jsx(PortalHubSection, { t }),
        /* @__PURE__ */ jsx(PortalPreviewSection, { t }),
        /* @__PURE__ */ jsx(HowItWorksSection, { t }),
        /* @__PURE__ */ jsx(FeedbackSection, { t }),
        /* @__PURE__ */ jsx(TrustSection, { t }),
        /* @__PURE__ */ jsx(FaqSection, { t }),
        /* @__PURE__ */ jsx(OverviewSection, { t, mode, setMode, activeMode, isArabic }),
        /* @__PURE__ */ jsx(AcademicsSection, { t }),
        /* @__PURE__ */ jsx(StudentLifeSection, { t }),
        /* @__PURE__ */ jsx(GallerySection, { galleryCopy, isArabic }),
        /* @__PURE__ */ jsx(AdmissionsSection, { t }),
        /* @__PURE__ */ jsx(ContactSection, { t, isArabic, formStatus, handleInquiry })
      ] }),
      /* @__PURE__ */ jsx(SiteFooter, { t, isArabic })
    ] });
  }

  // src/site/index.jsx
  var rootElement = document.getElementById("root");
  if (rootElement && window.ReactDOM?.createRoot) {
    window.ReactDOM.createRoot(rootElement).render(/* @__PURE__ */ jsx(App, {}));
  }
})();
