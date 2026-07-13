import { latestNewsItems } from "../../data/homepage-content.js";

export function LatestNewsSection({ t }) {
  const uniqueNewsItems = latestNewsItems.filter((item, index, items) => {
    const key = item.sourcePostId || item.href || item.title;
    return items.findIndex((candidate) => (candidate.sourcePostId || candidate.href || candidate.title) === key) === index;
  });

  return (
    <section className="latest-news-section" id="news">
      <div className="shell latest-news-heading">
        <div>
          <p className="eyebrow">{t.latestNewsEyebrow}</p>
          <h2>{t.latestNewsTitle} <span aria-hidden="true">[+]</span></h2>
        </div>
        <p>{t.latestNewsIntro}</p>
      </div>
      <div className="shell latest-news-grid">
        {uniqueNewsItems.map((item) => (
          <article className="latest-news-card" key={item.title}>
            <img src={item.image} alt={t[item.alt]} loading="lazy" />
            <div className="latest-news-card-body">
              <h3>{t[item.title]}</h3>
              <time dateTime={item.datetime}>{t[item.date]}</time>
              <p>{t[item.text]}</p>
              <a href={item.href} target="_blank" rel="noreferrer">{t.latestNewsMore}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
