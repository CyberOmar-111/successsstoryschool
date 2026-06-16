import { useEffect, useMemo, useState } from "react";
import { copy, profileModes, truthCopy } from "../data/homepage-content.js";
import { schoolEmail } from "../data/site-config.js";
import { openInquiryComposer } from "../services/api.js";

const galleryCopyByLanguage = {
  en: {
    eyebrow: "Photo gallery",
    title: "A closer look at campus spaces and school life.",
    text: "A refined dark gallery with real school photos, scaled carefully for larger screens and presented in a clear sequence."
  },
  ar: {
    eyebrow: "جولة بالصور",
    title: "نظرة أقرب إلى الحرم والحياة المدرسية.",
    text: "معرض داكن يعرض الحرم والمساحات وبعض المشاهد اليومية بتنقل سلس وواضح."
  }
};

function getInitialLanguage() {
  try {
    return localStorage.getItem("sss-language") === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

export function useSchoolSiteState() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState("parents");
  const [formStatus, setFormStatus] = useState("");

  const t = useMemo(() => ({ ...copy[language], ...truthCopy }), [language]);
  const isArabic = language === "ar";
  const activeMode = useMemo(
    () => profileModes.find((item) => item.id === mode) ?? profileModes[0],
    [mode]
  );
  const galleryCopy = galleryCopyByLanguage[language] ?? galleryCopyByLanguage.en;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = t.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = t.description;
    }

    try {
      localStorage.setItem("sss-language", language);
    } catch {
      // Private browsing may block storage. The website still works.
    }
  }, [isArabic, language, t.description, t.title]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll("[data-reveal-card]"));
    if (!cards.length) {
      return undefined;
    }

    cards.forEach((card, index) => {
      card.style.setProperty("--reveal-delay", `${(index % 3) * 100}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => {
        card.dataset.reveal = "visible";
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.dataset.reveal = "visible";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === "en" ? "ar" : "en"));
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  const closeMenu = () => setMenuOpen(false);

  const handleInquiry = (event) => {
    event.preventDefault();
    setFormStatus(t.inquiryOpening);
    openInquiryComposer({
      formElement: event.currentTarget,
      isArabic,
      schoolEmail
    });
  };

  return {
    activeMode,
    closeMenu,
    formStatus,
    galleryCopy,
    handleInquiry,
    isArabic,
    language,
    menuOpen,
    mode,
    setMode,
    t,
    toggleLanguage,
    toggleMenu
  };
}

