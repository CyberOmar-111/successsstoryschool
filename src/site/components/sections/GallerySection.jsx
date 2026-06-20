import { SchoolPhotoCarousel } from "../../../carousel/SchoolPhotoCarousel.jsx";

export function GallerySection({ galleryCopy, isArabic }) {
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
