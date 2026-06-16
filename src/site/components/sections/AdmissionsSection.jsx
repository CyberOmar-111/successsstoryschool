import { admissions } from "../../data/homepage-content.js";
import { CalendarDays } from "../../icons/index.jsx";
import { ActionLink, SplitHeading } from "../primitives.jsx";

export function AdmissionsSection({ t }) {
  return (
    <section className="section admissions" id="admissions">
      <SplitHeading
        eyebrow={t.admissionsEyebrow}
        title={t.admissionsTitle}
        action={<ActionLink href="#contact" variant="primary" icon={CalendarDays}>{t.applyToday}</ActionLink>}
      />
      <div className="shell timeline">
        {admissions.map(([number, title, text]) => (
          <article className="timeline-step" key={number} data-reveal-card>
            <span>{number}</span>
            <h3>{t[title]}</h3>
            <p>{t[text]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
