import { feedbackSlots } from "../../data/homepage-content.js";

export function FeedbackSection({ t }) {
  return (
    <section className="section feedback-section" id="feedback" aria-labelledby="school-feedback-title">
      <div className="shell feedback-layout">
        <div className="section-copy">
          <p className="eyebrow">{t.feedbackEyebrow}</p>
          <h2 id="school-feedback-title">{t.feedbackTitle}</h2>
          <p>{t.feedbackText}</p>
        </div>
        <div className="feedback-grid">
          {feedbackSlots.map((slot) => (
            <article className="feedback-slot" key={slot}>
              <div className="feedback-slot-top">
                <span className="feedback-slot-label">{t[slot]}</span>
                <strong className="feedback-status">{t.feedbackEmpty}</strong>
              </div>
              <div className="feedback-placeholder" aria-hidden="true">
                <span className="skeleton-line wide" />
                <span className="skeleton-line" />
                <span className="skeleton-line short" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
