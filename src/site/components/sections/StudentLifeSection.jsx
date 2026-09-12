import { CheckCircle2 } from "../../icons/index.jsx";

export function StudentLifeSection({ t }) {
  return (
    <section className="section life" id="life">
      <div className="shell life-grid">
        <div className="life-image life-photos">
          <img
            src="assets/playground.jpg"
            alt={t.lifePlaygroundAlt}
            loading="lazy"
            width="1290"
            height="2270"
          />
          <img
            src="assets/covered-football.jpg"
            alt={t.lifeFootballAlt}
            loading="lazy"
            width="1290"
            height="2265"
          />
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
