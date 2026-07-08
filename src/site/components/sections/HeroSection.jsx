import { BookOpen, ClipboardList, LayoutDashboard, MapPin } from "../../icons/index.jsx";
import { ActionLink } from "../primitives.jsx";

const heroQuickLinks = [
  { href: "#admissions", label: "navAdmissions", icon: ClipboardList, tone: "gold" },
  { href: "#academics", label: "navAcademics", icon: BookOpen, tone: "blue" },
  { href: "#portals", label: "navPortals", icon: LayoutDashboard, tone: "green" },
  { href: "#contact", label: "navContact", icon: MapPin, tone: "orange" }
];

export function HeroSection({ t, isArabic }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="shell hero-layout">
        <div className="hero-content">
          <h1 className="hero-title">
            {isArabic ? (
              <span>{t.heroTitle}</span>
            ) : (
              <>
                <span>Success Story</span>
                <span className="hero-title-accent">School</span>
              </>
            )}
          </h1>
          <div className="hero-caption-row">
            <span aria-hidden="true" />
            <p>{t.heroText}</p>
            <ActionLink href="#contact" variant="primary" className="hero-caption-cta">{t.beginEnrollment}</ActionLink>
          </div>
        </div>

        <div className="hero-side-ui" aria-label={t.heroActionsLabel}>
          <div className="hero-diamond-cluster">
            {heroQuickLinks.map(({ href, label, icon: Icon, tone }) => (
              <a className={`hero-diamond-link ${tone}`} href={href} key={href}>
                <Icon size={24} strokeWidth={2.2} aria-hidden="true" />
                <span>{t[label]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
