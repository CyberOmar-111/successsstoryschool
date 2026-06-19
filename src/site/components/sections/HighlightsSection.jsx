import { highlights } from "../../data/homepage-content.js";
import { IconLabel } from "../primitives.jsx";

export function HighlightsSection({ t }) {
  return (
    <section className="highlight-strip" aria-label="School highlights">
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
