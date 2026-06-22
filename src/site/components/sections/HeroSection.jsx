import { CheckCircle2, LayoutDashboard, Phone } from "../../icons/index.jsx";
import { ActionLink } from "../primitives.jsx";

export function HeroSection({ t, phoneHref, isArabic }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="shell hero-layout">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow-pill">{t.heroEyebrow}</p>
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
          <p className="hero-text">{t.heroText}</p>
          <div className="hero-actions">
            <ActionLink href="#contact" variant="primary" className="hero-primary-cta">{t.beginEnrollment}</ActionLink>
            <ActionLink href="#portals" variant="secondary" icon={LayoutDashboard}>{t.openPortals}</ActionLink>
            <ActionLink href={phoneHref} variant="ghost" icon={Phone}>{t.callOffice}</ActionLink>
          </div>
        </div>

        <aside className="hero-card" aria-label={t.heroCardKicker}>
          <img src="assets/success-story-logo.jpg" alt="" width={84} height={84} />
          <span className="hero-card-kicker">{t.heroCardKicker}</span>
          <h2>{t.heroCardTitle}</h2>
          <p>{t.heroCardText}</p>
          <ul>
            {[t.heroCardPointOne, t.heroCardPointTwo, t.heroCardPointThree].map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
