import { ArrowRight } from "../../icons/index.jsx";
import { exploreTiles, showcaseUpdates } from "../../data/homepage-content.js";

export function SchoolShowcaseSection({ t }) {
  return (
    <section className="section school-showcase" id="updates">
      <div className="shell split-heading showcase-heading">
        <div>
          <p className="eyebrow">{t.showcaseEyebrow}</p>
          <h2>{t.showcaseTitle}</h2>
        </div>
        <p>{t.showcaseText}</p>
      </div>

      <div className="shell school-showcase-grid">
        <div className="showcase-updates" data-reveal-card>
          <h3>{t.latestUpdatesTitle}</h3>
          <div className="showcase-update-list">
            {showcaseUpdates.map(({ title, text, href, icon: Icon }) => (
              <a className="showcase-update-card" href={href} key={title}>
                <span className="showcase-card-icon">
                  <Icon />
                </span>
                <span>
                  <strong>{t[title]}</strong>
                  <small>{t[text]}</small>
                </span>
                <ArrowRight />
              </a>
            ))}
          </div>
        </div>

        <div className="showcase-explore" data-reveal-card>
          <h3>{t.exploreTitle}</h3>
          <div className="explore-tile-grid">
            {exploreTiles.map(({ title, href, icon: Icon }) => (
              <a className="explore-tile" href={href} key={title}>
                <span>
                  <Icon />
                </span>
                <strong>{t[title]}</strong>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
