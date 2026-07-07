import { programs } from "../../data/homepage-content.js";
import { ActionLink } from "../primitives.jsx";

export function PortalHubSection({ t }) {
  return (
    <section className="section portal-hub program-section" id="portals">
      <div className="shell program-section-inner">
        <div className="program-section-copy">
          <p className="eyebrow">{t.programsEyebrow}</p>
          <h2><span>{t.programsTitleAccent}</span> {t.programsTitleRest}</h2>
          <p>{t.programsText}</p>
        </div>
        <div className="program-grid" aria-label={t.programsTitle}>
          {programs.map((program) => (
            <article className="program-card" key={program.title} data-reveal-card>
              <img src="/assets/success-story-mark.png?v=3" alt="" aria-hidden="true" />
              <h3>{t[program.title]}</h3>
              <p>{t[program.text]}</p>
            </article>
          ))}
        </div>
        <ActionLink href="#contact" variant="primary">{t.needConsultation}</ActionLink>
      </div>
    </section>
  );
}
