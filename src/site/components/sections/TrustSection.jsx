import { trustBadges } from "../../data/homepage-content.js";
import { CheckCircle2 } from "../../icons/index.jsx";

export function TrustSection({ t }) {
  return (
    <section className="section trust-section">
      <div className="shell trust-layout">
        <div className="section-copy">
          <p className="eyebrow">{t.trustEyebrow}</p>
          <h2>{t.trustTitle}</h2>
          <p>{t.trustText}</p>
        </div>
        <div className="trust-badges" aria-label={t.trustTitle}>
          {trustBadges.map((badge) => (
            <span className="trust-badge" key={badge}>
              <CheckCircle2 size={16} aria-hidden="true" />
              {t[badge]}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
