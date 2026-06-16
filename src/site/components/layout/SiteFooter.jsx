import { Globe2, MapPin, Phone } from "../../icons/index.jsx";
import { mapsHref, phoneHref, schoolEmail } from "../../data/site-config.js";
import { ActionLink, BrandLockup } from "../primitives.jsx";

export function SiteFooter({ t, isArabic }) {
  const feedbackLabel = isArabic ? "الأسئلة الشائعة" : "FAQ";
  const officeLabel = isArabic ? "اتصل بالإدارة" : "Call the office";
  const locationLabel = isArabic ? "إربد، الأردن" : "Irbid, Jordan";
  const copyrightLabel = isArabic
    ? "© 2026 مدرسة قصة نجاح. جميع الحقوق محفوظة."
    : "© 2026 Success Story School. All rights reserved.";
  const arabicSchoolName = "مدرسة قصة نجاح - إربد، الأردن";

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-column footer-primary">
          <BrandLockup className="footer-brand" size={56} />
          <p>{t.heroText}</p>
          <ActionLink href="#contact" variant="primary">{t.beginEnrollment}</ActionLink>
        </div>

        <div className="footer-column footer-links-column">
          <span className="footer-label">{isArabic ? "التنقل" : "Navigation"}</span>
          <a href="#academics">{t.navAcademics}</a>
          <a href="#life">{t.navLife}</a>
          <a href="#portals">{t.navPortals}</a>
          <a href="#admissions">{t.navAdmissions}</a>
          <a href="#faq">{feedbackLabel}</a>
        </div>

        <div className="footer-column footer-links-column">
          <span className="footer-label">{t.navContact}</span>
          <a href={phoneHref}><Phone size={18} aria-hidden="true" />{officeLabel}</a>
          <a href={`mailto:${schoolEmail}`}><Globe2 size={18} aria-hidden="true" />{schoolEmail}</a>
          <a href={mapsHref} target="_blank" rel="noreferrer"><MapPin size={18} aria-hidden="true" />{locationLabel}</a>
        </div>
      </div>
      <div className="shell footer-meta">
        <span>{copyrightLabel}</span>
        <span>{arabicSchoolName}</span>
      </div>
    </footer>
  );
}
