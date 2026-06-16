import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { CarouselNavigator } from "./CarouselNavigator.jsx";
import { gallerySlides } from "./school-gallery-slides.js";

const AUTO_DELAY = 5200;

export function SchoolPhotoCarousel({ locale = "en" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useMemo(() => gallerySlides, []);
  const currentSlide = slides[currentIndex] ?? slides[0];
  const copy = locale === "ar"
    ? {
        region: "\u0645\u0639\u0631\u0636 \u0635\u0648\u0631 \u0627\u0644\u0645\u062F\u0631\u0633\u0629",
        counter: "\u0631\u0642\u0645 \u0627\u0644\u0635\u0648\u0631\u0629",
        navigator: "\u0627\u0644\u062A\u0646\u0642\u0644 \u0628\u064A\u0646 \u0635\u0648\u0631 \u0627\u0644\u0645\u062F\u0631\u0633\u0629"
      }
    : {
        region: "School photo gallery",
        counter: "Slide",
        navigator: "Navigate school photos"
      };

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }
    const timeoutId = window.setTimeout(() => {
      setCurrentIndex((index) => (index + 1) % slides.length);
    }, AUTO_DELAY);
    return () => window.clearTimeout(timeoutId);
  }, [currentIndex, slides.length]);

  return (
    <div className="school-photo-carousel" aria-label={copy.region}>
      <div className="school-photo-stage">
        <AnimatePresence mode="wait">
          <motion.figure
            key={currentSlide.id}
            className="school-photo-figure"
            initial={{ opacity: 0.22 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.22 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="school-photo-backdrop"
              style={{
                backgroundImage: `url(${currentSlide.image})`,
                backgroundPosition: currentSlide.position ?? "center center"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.img
              className="school-photo-image"
              src={currentSlide.image}
              alt={currentSlide.alt[locale] ?? currentSlide.alt.en}
              style={{ objectPosition: currentSlide.position ?? "center center" }}
              initial={{ opacity: 0.56 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.48 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              loading={currentIndex === 0 ? "eager" : "lazy"}
              fetchPriority={currentIndex === 0 ? "high" : "auto"}
              decoding="async"
            />
            <motion.figcaption
              className="school-photo-caption"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, delay: 0.04 }}
            >
              <span className="school-photo-kicker">{currentSlide.kicker[locale] ?? currentSlide.kicker.en}</span>
              <h3>{currentSlide.title[locale] ?? currentSlide.title.en}</h3>
              <p>{currentSlide.description[locale] ?? currentSlide.description.en}</p>
            </motion.figcaption>
          </motion.figure>
        </AnimatePresence>

        <div className="school-photo-carousel-footer">
          <div className="school-photo-carousel-meta">
            <span>{copy.counter}</span>
            <strong>{String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</strong>
          </div>
          <div aria-label={copy.navigator}>
            <CarouselNavigator
              totalSlides={slides.length}
              autoDelay={AUTO_DELAY}
              themes={slides.map((slide) => slide.theme)}
              currentIndex={currentIndex}
              onIndexChange={setCurrentIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
