import { portalPreviewRows } from "../../data/homepage-content.js";
import { ClipboardList, GraduationCap } from "../../icons/index.jsx";
import { ActionLink, AnimatedDashboardWidget } from "../primitives.jsx";

export function PortalPreviewSection({ t }) {
  return (
    <section className="portal-preview-section">
      <div className="shell portal-preview-layout">
        <div className="section-copy">
          <p className="eyebrow">{t.portalPreviewEyebrow}</p>
          <h2>{t.portalPreviewTitle}</h2>
          <p>{t.portalPreviewText}</p>
          <div className="portal-preview-actions">
            <ActionLink href="/student" variant="primary" icon={GraduationCap}>{t.studentPortal}</ActionLink>
            <ActionLink href="/teacher" variant="secondary" icon={ClipboardList}>{t.teacherPortal}</ActionLink>
          </div>
        </div>
        <div className="dashboard-preview" aria-label={t.portalPreviewTitle}>
          <div className="dashboard-preview-top">
            <div>
              <span>{t.previewStudent}</span>
              <strong>{t.previewClass}</strong>
            </div>
            <em>SSS</em>
          </div>
          <div className="dashboard-preview-grid">
            {portalPreviewRows.map(([label, value, status], index) => (
              <AnimatedDashboardWidget className="dashboard-preview-widget" index={index} key={label}>
                <span>{t[label]}</span>
                <strong>{value}</strong>
                <small>{t[status]}</small>
              </AnimatedDashboardWidget>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
