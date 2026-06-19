import { navItems } from "../../data/homepage-content.js";
import { Globe2, Menu, X } from "../../icons/index.jsx";
import { cx } from "../../utils/cx.js";
import { ActionLink, BrandLockup } from "../primitives.jsx";

export function SiteHeader({ t, menuOpen, closeMenu, toggleMenu, toggleLanguage }) {
  return (
    <header className="site-header">
      <nav className="shell nav" aria-label="Primary navigation">
        <BrandLockup onClick={closeMenu} />
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? t.menuClose : t.menuOpen}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={24} strokeWidth={2.2} aria-hidden="true" /> : <Menu size={24} strokeWidth={2.2} aria-hidden="true" />}
        </button>
        <div className={cx("nav-panel", menuOpen && "open")}>
          <div className="nav-links">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu}>{t[label]}</a>
            ))}
          </div>
          <div className="nav-actions">
            <button className="language-button" type="button" onClick={toggleLanguage} aria-label={t.languageAria}>
              <Globe2 size={18} aria-hidden="true" />
              <span>{t.languageLabel}</span>
            </button>
            <ActionLink href="#contact" variant="primary" onClick={closeMenu}>{t.beginEnrollment}</ActionLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
