import { highlights, schoolActions } from "../../data/homepage-content.js";
import { ArrowRight } from "../../icons/index.jsx";
import { IconLabel } from "../primitives.jsx";

export function HighlightsSection({ t }) {
  return (
    <section className="highlight-strip school-entry-strip" aria-label="School highlights" data-inspiration="jordan-school-pattern">
      <div className="shell entry-actions" aria-label={t.schoolActionsLabel}>
        {schoolActions.map((action) => {
          const Icon = action.icon;
          return (
            <a className="entry-action-card" href={action.href} key={action.number} data-reveal-card>
              <span className="entry-action-number">{action.number}</span>
              <span className="entry-action-icon">
                <Icon size={22} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <strong>{t[action.title]}</strong>
              <p>{t[action.text]}</p>
              <span className="entry-action-link">
                {t.open}
                <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
              </span>
            </a>
          );
        })}
      </div>
      <div className="shell highlight-grid">
        {highlights.map(([label, icon]) => (
          <div className="highlight" key={label}>
            <IconLabel icon={icon}>{t[label]}</IconLabel>
          </div>
        ))}
      </div>
    </section>
  );
}
