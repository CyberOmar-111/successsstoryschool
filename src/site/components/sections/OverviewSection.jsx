import { profileModes } from "../../data/homepage-content.js";

export function OverviewSection({ t, mode, setMode, activeMode }) {
  const ActiveIcon = activeMode.icon;

  return (
    <section className="section overview">
      <div className="shell overview-grid">
        <div className="section-copy">
          <p className="eyebrow">{t.overviewEyebrow}</p>
          <h2>{t.overviewTitle}</h2>
          <p>{t.overviewText}</p>
          <div className="segmented" role="tablist" aria-label="School audience">
            {profileModes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === mode ? "active" : ""}
                role="tab"
                aria-selected={item.id === mode}
                onClick={() => setMode(item.id)}
              >
                {t[item.label]}
              </button>
            ))}
          </div>
        </div>
        <article className="feature-panel">
          <ActiveIcon size={34} strokeWidth={2.1} aria-hidden="true" />
          <h3>{t[activeMode.title]}</h3>
          <p>{t[activeMode.text]}</p>
        </article>
      </div>
    </section>
  );
}
