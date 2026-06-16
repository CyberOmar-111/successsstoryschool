import { CheckCircle2 } from "../../icons/index.jsx";

export function StudentLifeSection({ t }) {
  return (
    <section className="section life" id="life">
      <div className="shell life-grid">
        <div className="life-image" role="img" aria-label="Success Story School campus">
          <img src="assets/success-story-campus.jpg" alt="Success Story School campus in Irbid" />
        </div>
        <div className="section-copy">
          <p className="eyebrow">{t.lifeEyebrow}</p>
          <h2>{t.lifeTitle}</h2>
          <p>{t.lifeText}</p>
          <ul className="check-list">
            {[t.lifeOne, t.lifeTwo, t.lifeThree].map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
