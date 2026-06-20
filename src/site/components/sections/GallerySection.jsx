import { useEffect, useState } from "react";

export function GallerySection({ galleryCopy, isArabic }) {
  const [SchoolPhotoCarousel, setSchoolPhotoCarousel] = useState(
    () => window.SuccessStoryCarousel?.SchoolPhotoCarousel ?? null
  );

  useEffect(() => {
    if (SchoolPhotoCarousel) {
      return undefined;
    }

    const handleCarouselReady = () => {
      const carouselComponent = window.SuccessStoryCarousel?.SchoolPhotoCarousel ?? null;
      if (carouselComponent) {
        setSchoolPhotoCarousel(() => carouselComponent);
      }
    };

    window.addEventListener("success-story-carousel-ready", handleCarouselReady);
    handleCarouselReady();

    return () => window.removeEventListener("success-story-carousel-ready", handleCarouselReady);
  }, [SchoolPhotoCarousel]);

  if (!SchoolPhotoCarousel) {
    return null;
  }

  return (
    <section className="section gallery-section" id="gallery">
      <div className="shell split-heading gallery-heading">
        <div>
          <p className="eyebrow">{galleryCopy.eyebrow}</p>
          <h2>{galleryCopy.title}</h2>
        </div>
        <p>{galleryCopy.text}</p>
      </div>
      <div className="shell">
        <SchoolPhotoCarousel locale={isArabic ? "ar" : "en"} />
      </div>
    </section>
  );
}
