import { faqItems } from "../../data/homepage-content.js";
import { SectionHeading } from "../primitives.jsx";

export function FaqSection({ t }) {
  return (
    <section className="section faq-section">
      <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} />
      <div className="shell faq-grid">
        {faqItems.map(([question, answer]) => (
          <article className="faq-card" key={question} data-reveal-card>
            <h3>{t[question]}</h3>
            <p>{t[answer]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
