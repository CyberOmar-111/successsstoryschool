import { ArrowRight } from "../icons/index.jsx";
import { cx } from "../utils/cx.js";

export function BrandLockup({ href = "#top", onClick, className = "", ariaLabel = "Success Story School home", size = 52 }) {
  return (
    <a className={cx("brand", className)} href={href} onClick={onClick} aria-label={ariaLabel}>
      <img src="assets/success-story-logo.jpg" alt="" width={size} height={size} />
      <span>
        <strong>Success Story</strong>
        <small>School</small>
      </span>
    </a>
  );
}

export function IconLabel({ icon: Icon, children }) {
  return (
    <span className="icon-label">
      <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
}

export function ActionLink({ href, children, icon: Icon = ArrowRight, variant = "primary", ...props }) {
  return (
    <a className={cx("action-link", variant)} href={href} {...props}>
      <span>{children}</span>
      <Icon size={18} strokeWidth={2.4} aria-hidden="true" />
    </a>
  );
}

export function SplitHeading({ eyebrow, title, text, className = "", action = null }) {
  return (
    <div className={cx("shell", "split-heading", className)}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {action ?? <p>{text}</p>}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="shell section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
