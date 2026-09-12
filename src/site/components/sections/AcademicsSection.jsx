import { stages } from "../../data/homepage-content.js";

export function AcademicsSection({ t }) {
  return (
    <section className="section academics" id="academics">
      <div className="shell academics-intro">
        <div className="section-copy">
          <p className="eyebrow">{t.academicsEyebrow}</p>
          <h2>{t.academicsTitle}</h2>
          <p>{t.academicsText}</p>
        </div>
        <img
          className="academics-lab-photo"
          src="assets/computer-lab.jpg"
          alt={t.academicsLabAlt}
          loading="lazy"
          width="1290"
          height="2294"
        />
      </div>
      <div className="shell card-grid four">
        {stages.map(([number, title, text, gradeRange]) => (
          <article className="info-card stage-card" key={number} data-reveal-card>
            <span className="card-number">{number}</span>
            <h3>{t[title]}</h3>
            <p>{t[text]}</p>
            <strong>{gradeRange}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
