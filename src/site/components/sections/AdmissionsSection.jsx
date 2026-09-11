import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { admissions } from "../../data/homepage-content.js";
import { schoolEmail } from "../../data/site-config.js";

export function AdmissionsSection({ t, isArabic }) {
  const viewportRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const position = Math.abs(viewport.scrollLeft);
    setEdges({
      start: position < 2,
      end: position >= viewport.scrollWidth - viewport.clientWidth - 2
    });
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    viewport.scrollLeft = 0;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(viewport);
    updateEdges();
    return () => observer.disconnect();
  }, [isArabic]);

  const move = (direction) => {
    const viewport = viewportRef.current;
    const steps = viewport.querySelectorAll(".admissions-step");
    const distance = Math.abs(steps[1].offsetLeft - steps[0].offsetLeft);
    viewport.scrollBy({
      left: distance * direction * (isArabic ? -1 : 1),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    });
  };

  const PreviousIcon = isArabic ? ArrowRight : ArrowLeft;
  const NextIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section className="admissions-process" id="admissions" dir={isArabic ? "rtl" : "ltr"} aria-labelledby="admissions-title">
      <div className="admissions-heading">
        <h2 id="admissions-title">{t.admissionsTitle}</h2>
        <div className="admissions-heading-row">
          <p>{t.admissionsIntro}</p>
          <div className="admissions-controls">
            <button type="button" onClick={() => move(-1)} disabled={edges.start} aria-label={t.admissionsPrevious} title={t.admissionsPrevious} aria-controls="admissions-timeline">
              <PreviousIcon size={25} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => move(1)} disabled={edges.end} aria-label={t.admissionsNext} title={t.admissionsNext} aria-controls="admissions-timeline">
              <NextIcon size={25} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="admissions-viewport" id="admissions-timeline" ref={viewportRef} onScroll={updateEdges} tabIndex={0} role="region" aria-label={t.admissionsTitle}>
        <ol className="admissions-track">
          {admissions.map((step) => (
            <li className={`admissions-step admissions-step--${step.tone}`} key={step.number}>
              <article className={`admissions-card${step.image ? " admissions-card--photo" : ""}`}>
                {step.image && <img className={`admissions-photo admissions-photo--${step.number}`} src={step.image} alt={t[step.alt]} loading="lazy" width="600" height="400" />}
                <div className="admissions-card-body">
                  <h3>{t[step.title]}</h3>
                  <div className="admissions-card-copy">
                    <p>{t[step.text]}</p>
                    {step.action && <a className="admissions-cta" href={step.action === "email" ? `mailto:${schoolEmail}` : "#contact"}>{t[step.action === "email" ? "admissionsEmail" : "admissionsEnquire"]}</a>}
                  </div>
                </div>
              </article>
              <div className="admissions-marker" aria-hidden="true"><span>{step.number}</span></div>
              <p className="admissions-step-label" aria-hidden="true">{t[step.title]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
