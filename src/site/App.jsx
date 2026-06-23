import { phoneHref } from "./data/site-config.js";
import { useSchoolSiteState } from "./hooks/useSchoolSiteState.js";
import { SiteFooter } from "./components/layout/SiteFooter.jsx";
import { SiteHeader } from "./components/layout/SiteHeader.jsx";
import { AcademicsSection } from "./components/sections/AcademicsSection.jsx";
import { AdmissionsSection } from "./components/sections/AdmissionsSection.jsx";
import { ContactSection } from "./components/sections/ContactSection.jsx";
import { FaqSection } from "./components/sections/FaqSection.jsx";
import { FeedbackSection } from "./components/sections/FeedbackSection.jsx";
import { GallerySection } from "./components/sections/GallerySection.jsx";
import { HeroSection } from "./components/sections/HeroSection.jsx";
import { HighlightsSection } from "./components/sections/HighlightsSection.jsx";
import { HowItWorksSection } from "./components/sections/HowItWorksSection.jsx";
import { OverviewSection } from "./components/sections/OverviewSection.jsx";
import { PortalHubSection } from "./components/sections/PortalHubSection.jsx";
import { PortalPreviewSection } from "./components/sections/PortalPreviewSection.jsx";
import { ProofSection } from "./components/sections/ProofSection.jsx";
import { SchoolShowcaseSection } from "./components/sections/SchoolShowcaseSection.jsx";
import { StudentLifeSection } from "./components/sections/StudentLifeSection.jsx";
import { TrustSection } from "./components/sections/TrustSection.jsx";

export function App() {
  const {
    activeMode,
    closeMenu,
    formStatus,
    galleryCopy,
    handleInquiry,
    isArabic,
    menuOpen,
    mode,
    setMode,
    t,
    toggleLanguage,
    toggleMenu
  } = useSchoolSiteState();

  return (
    <>
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <SiteHeader
        t={t}
        menuOpen={menuOpen}
        closeMenu={closeMenu}
        toggleMenu={toggleMenu}
        toggleLanguage={toggleLanguage}
      />
      <main id="main-content">
        <HeroSection t={t} phoneHref={phoneHref} isArabic={isArabic} />
        <HighlightsSection t={t} />
        <ProofSection t={t} />
        <PortalHubSection t={t} />
        <PortalPreviewSection t={t} />
        <HowItWorksSection t={t} />
        <FeedbackSection t={t} />
        <TrustSection t={t} />
        <FaqSection t={t} />
        <OverviewSection t={t} mode={mode} setMode={setMode} activeMode={activeMode} isArabic={isArabic} />
        <AcademicsSection t={t} />
        <StudentLifeSection t={t} />
        <GallerySection galleryCopy={galleryCopy} isArabic={isArabic} />
        <SchoolShowcaseSection t={t} />
        <AdmissionsSection t={t} />
        <ContactSection t={t} isArabic={isArabic} formStatus={formStatus} handleInquiry={handleInquiry} />
      </main>
      <SiteFooter t={t} isArabic={isArabic} />
    </>
  );
}
