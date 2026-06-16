import { heroStats } from "../../data/homepage-content.js";
import { CheckCircle2, LayoutDashboard, Phone } from "../../icons/index.jsx";
import { ActionLink } from "../primitives.jsx";

export function HeroSection({ t, phoneHref }) {
  return (
    <section className="hero" id="top">
      <div className="shell hero-layout">
        <div className="hero-content">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-text">{t.heroText}</p>
          <div className="hero-actions">
            <ActionLink href="#contact" variant="primary">{t.beginEnrollment}</ActionLink>
            <ActionLink href="#portals" variant="secondary" icon={LayoutDashboard}>{t.openPortals}</ActionLink>
            <ActionLink href={phoneHref} variant="ghost" icon={Phone}>{t.callOffice}</ActionLink>
          </div>
          <dl className="hero-stats" aria-label="School quick facts">
            {heroStats.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{t[label]}</dd>
              </div>
            ))}
          </dl>
        </div>
        <aside className="hero-card" aria-label={t.heroCardKicker}>
          <img src="assets/success-story-logo.jpg" alt="" width={78} height={78} />
          <span className="hero-card-kicker">{t.heroCardKicker}</span>
          <h2>{t.heroCardTitle}</h2>
          <p>{t.heroCardText}</p>
          <ul>
            {[t.heroCardPointOne, t.heroCardPointTwo, t.heroCardPointThree].map((item) => (
              <li key={item}>
                <CheckCircle2 size={17} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
