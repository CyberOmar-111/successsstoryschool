import { facilities } from "../../data/homepage-content.js";

export function FacilitiesSection({ t }) {
  return (
    <section className="section facilities-section" id="facilities" aria-labelledby="facilities-title">
      <div className="shell facilities-heading">
        <h2 id="facilities-title">{t.facilitiesTitle}</h2>
        <span aria-hidden="true" />
      </div>

      <div className="shell facilities-grid">
        {facilities.map((facility) => (
          <article className={`facility-card ${facility.crop}`} key={facility.title} data-reveal-card>
            <img src={facility.image} alt={t[facility.alt]} loading="lazy" />
            <div className="facility-card-body">
              <h3>{t[facility.title]}</h3>
              <p>{t[facility.text]}</p>
              <a href={facility.href}>{t.facilitiesReadMore}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
