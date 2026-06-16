const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const header = document.querySelector("[data-header]");
const form = document.querySelector("[data-inquiry-form]");
const formMessage = document.querySelector("[data-form-message]");
const schoolEmailLink = document.querySelector("[data-school-email-link]");
const languageToggle = document.querySelector("[data-language-toggle]");
const schoolEmail = form?.dataset.schoolEmail?.trim() ?? "";
const descriptions = {
  en: "Success Story School in Irbid offers Grades 1 to 10, Arabic-first and English learning, Collins Curriculum, and bus transportation.",
  ar: "مدرسة قصة نجاح في إربد تقدم التعليم من الصف الأول حتى الصف العاشر باللغة العربية والإنجليزية ومنهاج Collins مع مواصلات بالباص."
};
const translations = {
  en: {
    title: "Success Story School | Building the New Generation",
    skip: "Skip to content",
    admissionsOpen: "Admissions 2026-2027 are open.",
    announcementMessage: "Give your child a place to grow.",
    applyToday: "Apply today",
    navAcademics: "Academics",
    navStudentLife: "Student Life",
    navActivities: "Activities",
    navContact: "Contact",
    navAdmissions: "Admissions",
    navPortal: "School Portal",
    heroEyebrow: "Welcome to Success Story School",
    heroTitle: "Building the new generation.",
    heroText: "Grades 1 to 10 with Arabic-first learning, English education, and the Collins Curriculum in Irbid.",
    beginEnrollment: "Begin enrollment",
    bookTour: "Book a campus tour",
    gradesOffered: "Grades offered",
    arabicFirst: "Arabic first, English",
    schoolHours: "School hours",
    missionCard: "Building the new generation",
    collins: "Collins Curriculum",
    gradesOneTen: "Grades 1-10",
    busTransportation: "Bus transportation",
    academicsEyebrow: "Academics",
    academicsTitle: "Learning designed for each stage",
    academicsText: "With the Collins Curriculum and Arabic-first, English learning, students develop their skills from Grade 1 through Grade 10.",
    stageOneTitle: "Foundation Years",
    stageOneText: "A welcoming start to core learning, language, and discovery.",
    gradesOneThree: "Grades 1-3",
    stageTwoTitle: "Upper Primary",
    stageTwoText: "Building confidence through progressing academic skills and creativity.",
    gradesFourSix: "Grades 4-6",
    stageThreeTitle: "Middle School",
    stageThreeText: "Deeper learning, collaboration, and developing independence.",
    gradesSevenEight: "Grades 7-8",
    stageFourTitle: "Secondary Level",
    stageFourText: "Focused study and skills development for the next educational step.",
    gradesNineTen: "Grades 9-10",
    storyPhoto: "Learning with purpose",
    transportAvailable: "transport available",
    lifeEyebrow: "Student life",
    lifeTitle: "Learning and activities together",
    lifeText: "Alongside classroom learning, students enjoy art, sports, trips, celebrations, and competitions.",
    lifePointOne: "Art and sports activities",
    lifePointTwo: "School trips and celebrations",
    lifePointThree: "Student competitions",
    arrangeVisit: "Arrange a visit",
    admissionsEyebrow: "Admissions",
    admissionsTitle: "Your family's next chapter starts here",
    admissionsText: "Contact Success Story School to ask about enrollment from Grade 1 through Grade 10.",
    inquireTitle: "Inquire",
    inquireText: "Share your student's requested grade with our team.",
    visitTitle: "Visit",
    visitText: "Visit our location behind Irbid Specialty Hospital.",
    applyTitle: "Apply",
    applyText: "Receive application guidance and document requirements from the school.",
    welcomeTitle: "Welcome",
    welcomeText: "Prepare for the school day and available bus transportation.",
    activitiesEyebrow: "Beyond the classroom",
    activitiesTitle: "Student activities",
    activitiesText: "Opportunities for students to take part, create, and celebrate together.",
    contactOffice: "Contact the office",
    tripsTitle: "School Trips",
    tripsText: "Experiences beyond everyday classes.",
    artsSportsTitle: "Arts & Sports",
    artsSportsText: "Activities that encourage creativity and teamwork.",
    celebrationsTitle: "Celebrations & Competitions",
    celebrationsText: "Moments for participation and achievement.",
    missionEyebrow: "Our mission",
    missionQuote: "To build the new generation.",
    missionDetail: "Grades 1 to 10, Arabic first and English learning, with the Collins Curriculum.",
    contactEyebrow: "Get in touch",
    contactTitle: "Visit Success Story School",
    contactText: "Speak with our admissions team to arrange a visit or begin an application.",
    address: "Behind Irbid Specialty Hospital, Irbid, Jordan",
    mapCode: "Exact location: 32.532984, 35.863854",
    getDirections: "Get directions",
    mapsPhoto: "Google Maps photo",
    campusPhotoTitle: "Our campus in Irbid",
    campusPhotoText: "Open the photo and directions",
    campusPhotoAlt: "Success Story School campus in Irbid",
    followUs: "Follow the school",
    whatsapp: "WhatsApp",
    facebook: "Facebook",
    instagram: "Instagram",
    parentName: "Parent name",
    parentPhone: "Parent phone number",
    phonePlaceholder: "07 XXXX XXXX",
    interestedGrade: "Interested grade level",
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
    message: "Message",
    messagePlaceholder: "Tell us how we can help.",
    openGmail: "Open message in Gmail",
    gmailNote: "Gmail sends from the account currently signed in on your device. Switch Gmail accounts before pressing Send if needed.",
    copyright: "Success Story School. All rights reserved.",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    noEmail: "The school email will be connected soon. Please call 07 9946 4848 for now.",
    gmailOpening: "Gmail is opening your draft. It will send from your signed-in Gmail account after you press Send."
  },
  ar: {
    title: "مدرسة قصة نجاح | بناء الجيل الجديد",
    skip: "الانتقال إلى المحتوى",
    admissionsOpen: "التسجيل للعام 2026-2027 مفتوح.",
    announcementMessage: "امنح طفلك مكانا للنمو.",
    applyToday: "سجل الآن",
    navAcademics: "البرنامج الأكاديمي",
    navStudentLife: "الحياة المدرسية",
    navActivities: "الأنشطة",
    navContact: "تواصل معنا",
    navAdmissions: "التسجيل",
    navPortal: "بوابة المدرسة",
    heroEyebrow: "أهلا بكم في مدرسة قصة نجاح",
    heroTitle: "نبني الجيل الجديد.",
    heroText: "من الصف الأول حتى الصف العاشر، مع التركيز على اللغة العربية وتعليم الإنجليزية ومنهاج Collins في إربد.",
    beginEnrollment: "ابدأ التسجيل",
    bookTour: "احجز زيارة للمدرسة",
    gradesOffered: "الصفوف المتاحة",
    arabicFirst: "العربية أولا والإنجليزية",
    schoolHours: "الدوام المدرسي",
    missionCard: "بناء الجيل الجديد",
    collins: "منهاج Collins",
    gradesOneTen: "الصفوف 1-10",
    busTransportation: "مواصلات بالباص",
    academicsEyebrow: "البرنامج الأكاديمي",
    academicsTitle: "تعليم مناسب لكل مرحلة",
    academicsText: "مع منهاج Collins والتعليم بالعربية أولا والإنجليزية، يطور الطلاب مهاراتهم من الصف الأول حتى الصف العاشر.",
    stageOneTitle: "المرحلة الأساسية الأولى",
    stageOneText: "بداية مرحبة للتعلم الأساسي واللغة والاكتشاف.",
    gradesOneThree: "الصفوف 1-3",
    stageTwoTitle: "المرحلة الأساسية المتوسطة",
    stageTwoText: "بناء الثقة من خلال تطوير المهارات الأكاديمية والإبداع.",
    gradesFourSix: "الصفوف 4-6",
    stageThreeTitle: "المرحلة الأساسية العليا",
    stageThreeText: "تعلم أعمق وتعاون وتنمية الاستقلالية.",
    gradesSevenEight: "الصفوف 7-8",
    stageFourTitle: "المرحلة الثانوية",
    stageFourText: "دراسة مركزة وتطوير المهارات للخطوة التعليمية التالية.",
    gradesNineTen: "الصفوف 9-10",
    storyPhoto: "تعلم له هدف",
    transportAvailable: "المواصلات متاحة",
    lifeEyebrow: "الحياة المدرسية",
    lifeTitle: "التعلم والأنشطة معا",
    lifeText: "إلى جانب التعلم الصفي، يستمتع الطلاب بالفنون والرياضة والرحلات والاحتفالات والمسابقات.",
    lifePointOne: "أنشطة فنية ورياضية",
    lifePointTwo: "رحلات واحتفالات مدرسية",
    lifePointThree: "مسابقات طلابية",
    arrangeVisit: "رتب زيارة",
    admissionsEyebrow: "التسجيل",
    admissionsTitle: "خطوة عائلتكم القادمة تبدأ هنا",
    admissionsText: "تواصل مع مدرسة قصة نجاح للاستفسار عن التسجيل من الصف الأول حتى الصف العاشر.",
    inquireTitle: "استفسر",
    inquireText: "شاركنا الصف المطلوب للطالب.",
    visitTitle: "زرنا",
    visitText: "زر موقعنا خلف مستشفى إربد التخصصي.",
    applyTitle: "قدم طلبا",
    applyText: "احصل من المدرسة على إرشادات التسجيل والوثائق المطلوبة.",
    welcomeTitle: "مرحبا بكم",
    welcomeText: "استعد للدوام المدرسي وخدمة المواصلات بالباص.",
    activitiesEyebrow: "خارج الصف",
    activitiesTitle: "الأنشطة الطلابية",
    activitiesText: "فرص للطلاب للمشاركة والإبداع والاحتفال معا.",
    contactOffice: "تواصل مع الإدارة",
    tripsTitle: "الرحلات المدرسية",
    tripsText: "تجارب تعليمية خارج الصفوف اليومية.",
    artsSportsTitle: "الفنون والرياضة",
    artsSportsText: "أنشطة تشجع الإبداع والعمل الجماعي.",
    celebrationsTitle: "الاحتفالات والمسابقات",
    celebrationsText: "لحظات للمشاركة والإنجاز.",
    missionEyebrow: "رسالتنا",
    missionQuote: "بناء الجيل الجديد.",
    missionDetail: "من الصف الأول إلى العاشر، العربية أولا وتعليم الإنجليزية، مع منهاج Collins.",
    contactEyebrow: "تواصل معنا",
    contactTitle: "زر مدرسة قصة نجاح",
    contactText: "تواصل مع فريق التسجيل لترتيب زيارة أو بدء طلب التسجيل.",
    address: "خلف مستشفى إربد التخصصي، إربد، الأردن",
    mapCode: "الموقع الدقيق: 32.532984, 35.863854",
    getDirections: "احصل على الاتجاهات",
    mapsPhoto: "صورة من خرائط Google",
    campusPhotoTitle: "مدرستنا في إربد",
    campusPhotoText: "افتح الصورة والاتجاهات",
    campusPhotoAlt: "مبنى مدرسة قصة نجاح في إربد",
    followUs: "تابع المدرسة",
    whatsapp: "واتساب",
    facebook: "فيسبوك",
    instagram: "إنستغرام",
    parentName: "اسم ولي الأمر",
    parentPhone: "رقم هاتف ولي الأمر",
    phonePlaceholder: "07 XXXX XXXX",
    interestedGrade: "الصف المطلوب",
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
    message: "الرسالة",
    messagePlaceholder: "أخبرنا كيف يمكننا مساعدتك.",
    openGmail: "افتح الرسالة في Gmail",
    gmailNote: "يرسل Gmail من الحساب المسجل دخوله حاليا على جهازك. بدّل حساب Gmail قبل الضغط على إرسال إذا لزم الأمر.",
    copyright: "مدرسة قصة نجاح. جميع الحقوق محفوظة.",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
    noEmail: "سيتم ربط بريد المدرسة قريبا. يرجى الاتصال على 07 9946 4848 حاليا.",
    gmailOpening: "يتم فتح مسودة رسالتك في Gmail. سيتم الإرسال من حساب Gmail المسجل دخوله بعد الضغط على إرسال."
  }
};
let currentLanguage = "en";

document.querySelector("[data-year]").textContent = new Date().getFullYear();

if (schoolEmail && schoolEmailLink) {
  schoolEmailLink.href = `mailto:${schoolEmail}`;
  schoolEmailLink.textContent = schoolEmail;
}

const text = (key) => translations[currentLanguage][key] ?? translations.en[key] ?? "";

const setLanguage = (language) => {
  currentLanguage = language === "ar" ? "ar" : "en";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.title = text("title");
  document.querySelector('meta[name="description"]').content = descriptions[currentLanguage];

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = text(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = text(element.dataset.i18nPlaceholder);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = text(element.dataset.i18nAlt);
  });

  document.querySelectorAll("[data-arrow]").forEach((element) => {
    element.textContent = currentLanguage === "ar" ? "\u2190" : "\u2192";
  });

  if (languageToggle) {
    languageToggle.textContent = currentLanguage === "ar" ? "English" : "العربية";
    languageToggle.setAttribute(
      "aria-label",
      currentLanguage === "ar" ? "View site in English" : "عرض الموقع باللغة العربية"
    );
  }

  const isMenuOpen = menuToggle?.getAttribute("aria-expanded") === "true";
  if (menuToggle) {
    menuToggle.querySelector(".sr-only").textContent = text(isMenuOpen ? "closeMenu" : "openMenu");
  }

  if (formMessage) {
    formMessage.textContent = "";
  }

  try {
    localStorage.setItem("sss-language", currentLanguage);
  } catch {
    // Continue without persisted preference when storage is unavailable.
  }
};

languageToggle?.addEventListener("click", () => {
  setLanguage(currentLanguage === "en" ? "ar" : "en");
});

try {
  currentLanguage = localStorage.getItem("sss-language") === "ar" ? "ar" : "en";
} catch {
  currentLanguage = "en";
}
setLanguage(currentLanguage);

if (menuToggle && menu) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector(".sr-only").textContent = text("openMenu");
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
      return;
    }

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.querySelector(".sr-only").textContent = text("closeMenu");
    menu.classList.add("open");
    document.body.classList.add("menu-open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1040) {
      closeMenu();
    }
  });
}

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.13 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!schoolEmail) {
    formMessage.textContent = text("noEmail");
    return;
  }

  const details = new FormData(form);
  const parentName = String(details.get("name")).trim();
  const parentPhone = String(details.get("phone")).trim();
  const grade = form.elements.grade.selectedOptions[0].textContent.trim();
  const defaultMessage = currentLanguage === "ar"
    ? "أرغب في الحصول على مزيد من المعلومات حول التسجيل."
    : "I would like more information about enrollment.";
  const message = String(details.get("message")).trim() || defaultMessage;
  const subject = currentLanguage === "ar"
    ? `استفسار مدرسي - ${grade} - ${parentName}`
    : `School inquiry - ${grade} - ${parentName}`;
  const body = currentLanguage === "ar" ? [
    "مرحبا مدرسة قصة نجاح،",
    "",
    message,
    "",
    `اسم ولي الأمر: ${parentName}`,
    `رقم هاتف ولي الأمر: ${parentPhone}`,
    `الصف المطلوب: ${grade}`,
    "",
    "شكرا لكم،"
  ].join("\n") : [
    "Hello Success Story School,",
    "",
    message,
    "",
    `Parent name: ${parentName}`,
    `Parent phone number: ${parentPhone}`,
    `Interested grade level: ${grade}`,
    "",
    "Thank you,"
  ].join("\n");
  const gmailComposeUrl = new URL("https://mail.google.com/mail/");

  gmailComposeUrl.search = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: schoolEmail,
    su: subject,
    body
  }).toString();

  formMessage.textContent = text("gmailOpening");

  if (!window.open(gmailComposeUrl.toString(), "_blank")) {
    window.location.href = gmailComposeUrl.toString();
  }
});
