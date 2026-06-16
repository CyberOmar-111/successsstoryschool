import { feedbackSlots } from "../../data/homepage-content.js";

export function FeedbackSection({ t }) {
  return (
    <section className="section feedback-section" aria-labelledby="school-feedback-title">
      <div className="shell feedback-layout">
        <div className="section-copy">
          <p className="eyebrow">{t.feedbackEyebrow}</p>
          <h2 id="school-feedback-title">{t.feedbackTitle}</h2>
          <p>{t.feedbackText}</p>
        </div>
        <div className="feedback-grid">
          {feedbackSlots.map((slot) => (
            <article className="feedback-slot" key={slot}>
              <span className="feedback-slot-label">{t[slot]}</span>
              <span className="skeleton-line wide" aria-hidden="true" />
              <span className="skeleton-line" aria-hidden="true" />
              <strong>{t.feedbackEmpty}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
