import { faqItems } from "../../data/homepage-content.js";

export function FaqSection({ t }) {
  return (
    <section className="section faq-section" id="faq">
      <div className="shell faq-layout">
        <div className="section-copy">
          <p className="eyebrow">{t.faqEyebrow}</p>
          <h2>{t.faqTitle}</h2>
        </div>
        <div className="faq-stack">
          {faqItems.map(([question, answer], index) => (
            <details className="faq-item" key={question} open={index === 1}>
              <summary>
                <span>{t[question]}</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </summary>
              <div className="faq-answer">
                <p>{t[answer]}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
