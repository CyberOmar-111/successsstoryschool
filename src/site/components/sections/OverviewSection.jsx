const MODE_CARDS = {
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
        title: "مسار تسجيل واضح",
        text: "تستطيع العائلة فهم الصفوف والمواصلات والموقع وطرق التواصل في زيارة رقمية واحدة واضحة."
      },
      {
        number: "02",
        title: "معلومات المدرسة العامة",
        text: "تبقى الأكاديميات وحياة الطلاب والتسجيل ووسائل التواصل متاحة قبل إصدار أي حساب."
      },
      {
        number: "03",
        title: "متابعة مباشرة من الإدارة",
        text: "تصل الأسئلة إلى إدارة المدرسة مباشرة بدل أن تضيع بين روابط ورسائل متفرقة."
      }
    ],
    students: [
      {
        number: "01",
        title: "رقم مدرسي معتمد",
        text: "يسجل كل طالب الدخول باستخدام رقم مدرسي تصدره المدرسة وكلمة مرور خاصة بعد الموافقة."
      },
      {
        number: "02",
        title: "السجلات عند النشر",
        text: "يظهر الحضور والعلامات والواجبات والإعلانات والرسوم والمواصلات فقط بعد أن ينشرها الكادر."
      },
      {
        number: "03",
        title: "واجهة يومية هادئة",
        text: "تبقى واجهة الطالب واضحة وسهلة وتصبح مفيدة فور توفر المعلومات الحقيقية."
      }
    ],
    staff: [
      {
        number: "01",
        title: "مسارات دخول محمية",
        text: "يستخدم المعلمون والإداريون وصولاً مبنياً على الدور بدلاً من صفحات عامة أو كلمات مرور مشتركة."
      },
      {
        number: "02",
        title: "عمليات صفية حقيقية",
        text: "تدار الواجبات والحضور والإعلانات والتحقق والسجلات من لوحات مدرسية آمنة."
      },
      {
        number: "03",
        title: "نظام واحد مترابط",
        text: "تبقى المعلومات العامة وإصدار الحسابات والسجلات الطلابية ضمن نظام واحد بدون عمل مشتت."
      }
    ]
  }
};

export function OverviewSection({ t, mode, setMode, isArabic }) {
  const cards = MODE_CARDS[isArabic ? "ar" : "en"][mode];

  return (
    <section className="section overview" id="overview">
      <div className="shell overview-shell">
        <div className="overview-copy-column">
          <p className="eyebrow">{t.overviewEyebrow}</p>
          <h2>{t.overviewTitle}</h2>
          <p>{t.overviewText}</p>
          <div className="segmented segmented-vertical" role="tablist" aria-label="School audience">
            <button type="button" className={mode === "parents" ? "active" : ""} role="tab" aria-selected={mode === "parents"} onClick={() => setMode("parents")}>{t.parentMode}</button>
            <button type="button" className={mode === "students" ? "active" : ""} role="tab" aria-selected={mode === "students"} onClick={() => setMode("students")}>{t.studentMode}</button>
            <button type="button" className={mode === "staff" ? "active" : ""} role="tab" aria-selected={mode === "staff"} onClick={() => setMode("staff")}>{t.staffMode}</button>
          </div>
        </div>

        <div className="overview-rail" role="tabpanel" aria-label={t[`${mode === "parents" ? "parentMode" : mode === "students" ? "studentMode" : "staffMode"}`]}>
          {cards.map((card) => (
            <article className="overview-mode-card" key={card.number} data-reveal-card>
              <span className="overview-mode-number">{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
