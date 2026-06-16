export function AnnouncementBar({ t, closeMenu }) {
  return (
    <div className="announcement">
      <div className="shell announcement-inner">
        <p>
          <strong>{t.announcementStrong}</strong> {t.announcementText}
        </p>
        <a href="#contact" onClick={closeMenu}>{t.applyToday}</a>
      </div>
    </div>
  );
}
