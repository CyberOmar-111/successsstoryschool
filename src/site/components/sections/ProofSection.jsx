import { proofStats, whyStrengths } from "../../data/homepage-content.js";

export function ProofSection({ t }) {
  return (
    <section className="section proof-section">
      <div className="shell proof-layout">
        <div className="proof-copy">
          <p className="eyebrow">{t.proofEyebrow}</p>
          <h2>{t.proofTitle}</h2>
          <p>{t.proofText}</p>
          <a className="proof-cta" href="#admissions">{t.proofCta}</a>
        </div>

        <div className="proof-wheel" aria-label={t.proofWheelLabel}>
          <div className="proof-wheel-center">
            <span>{t.proofWheelCenter}</span>
          </div>
          {whyStrengths.map((key, index) => (
            <span className={`proof-wheel-item item-${index + 1}`} key={key}>
              {t[key]}
            </span>
          ))}
        </div>

        <div className="proof-grid" aria-label={t.proofWheelLabel}>
          {proofStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article className={`proof-stat-card ${stat.tone}`} key={stat.value} data-reveal-card>
                <Icon size={34} strokeWidth={1.9} aria-hidden="true" />
                <strong>{t[stat.value]}</strong>
                <span>{t[stat.label]}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
