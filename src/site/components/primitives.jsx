import { ArrowRight } from "../icons/index.jsx";
import { motion, useReducedMotion } from "motion/react";
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

export function ActionLink({ href, children, icon: Icon = ArrowRight, variant = "primary", className = "", ...props }) {
  return (
    <a className={cx("action-link", variant, className)} href={href} {...props}>
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

export function AnimatedDashboardWidget({ children, className = "", index = 0, as = "article", ...props }) {
  const shouldReduceMotion = useReducedMotion();
  const MotionElement = as === "div" ? motion.div : motion.article;

  return (
    <MotionElement
      className={className}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.32,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </MotionElement>
  );
}
