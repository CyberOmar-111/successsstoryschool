import { stages } from "../../data/homepage-content.js";
import { SplitHeading } from "../primitives.jsx";

export function AcademicsSection({ t }) {
  return (
    <section className="section academics" id="academics">
      <SplitHeading eyebrow={t.academicsEyebrow} title={t.academicsTitle} text={t.academicsText} />
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
