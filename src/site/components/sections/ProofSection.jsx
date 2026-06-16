import { proofPoints } from "../../data/homepage-content.js";

export function ProofSection({ t }) {
  return (
    <section className="section proof-section">
      <div className="shell proof-layout">
        <div className="proof-copy">
          <p className="eyebrow">{t.proofEyebrow}</p>
          <h2>{t.proofTitle}</h2>
          <p>{t.proofText}</p>
        </div>
        <div className="proof-grid">
          {proofPoints.map((point) => {
            const Icon = point.icon;
            return (
              <article className="proof-card" key={point.title} data-reveal-card>
                <Icon size={27} strokeWidth={2.1} aria-hidden="true" />
                <h3>{t[point.title]}</h3>
                <p>{t[point.text]}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
