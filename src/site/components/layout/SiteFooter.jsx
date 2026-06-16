import { BookOpen, School, Trophy } from "../../icons/index.jsx";
import { BrandLockup } from "../primitives.jsx";

export function SiteFooter({ t }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <BrandLockup className="footer-brand" size={48} />
        <p>{t.footerText}</p>
        <div className="footer-icons" aria-label="School values">
          <School size={20} aria-hidden="true" />
          <Trophy size={20} aria-hidden="true" />
          <BookOpen size={20} aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
