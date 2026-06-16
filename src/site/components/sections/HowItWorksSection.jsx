import { howItWorksSteps } from "../../data/homepage-content.js";
import { SplitHeading } from "../primitives.jsx";

export function HowItWorksSection({ t }) {
  return (
    <section className="section how-works" id="how-it-works">
      <SplitHeading eyebrow={t.howWorksEyebrow} title={t.howWorksTitle} text={t.howWorksText} />
      <div className="shell how-works-grid">
        {howItWorksSteps.map(([number, title, text]) => (
          <article className="how-step" key={number} data-reveal-card>
            <span>{number}</span>
            <h3>{t[title]}</h3>
            <p>{t[text]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
