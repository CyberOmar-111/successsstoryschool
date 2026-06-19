import { portals } from "../../data/homepage-content.js";
import { ActionLink, SplitHeading } from "../primitives.jsx";

export function PortalHubSection({ t }) {
  return (
    <section className="section portal-hub" id="portals">
      <SplitHeading eyebrow={t.navPortals} title={t.quickPortalTitle} text={t.quickPortalText} />
      <div className="shell card-grid three">
        {portals.map((portal) => {
          const Icon = portal.icon;
          return (
            <article className="info-card portal-card" key={portal.href} data-reveal-card>
              <Icon size={30} strokeWidth={2.1} aria-hidden="true" />
              <h3>{t[portal.title]}</h3>
              <p>{t[portal.text]}</p>
              <ActionLink href={portal.href} variant="subtle">{t.open}</ActionLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}
