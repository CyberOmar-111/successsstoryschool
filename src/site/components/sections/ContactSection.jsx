import { grades } from "../../data/homepage-content.js";
import { mapsHref, phoneHref, phoneNumber, schoolEmail, whatsappHref } from "../../data/site-config.js";
import { ArrowRight, MapPin, MessageCircle, Phone } from "../../icons/index.jsx";
import { ActionLink } from "../primitives.jsx";

export function ContactSection({ t, isArabic, formStatus, handleInquiry }) {
  return (
    <section className="section contact" id="contact">
      <div className="shell contact-grid">
        <div className="section-copy contact-copy">
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
          <div className="contact-actions">
            <ActionLink href={phoneHref} variant="primary" icon={Phone}>{phoneNumber}</ActionLink>
            <ActionLink href={whatsappHref} variant="secondary" icon={MessageCircle} target="_blank" rel="noopener noreferrer">{t.whatsapp}</ActionLink>
            <ActionLink href={mapsHref} variant="ghost" icon={MapPin} target="_blank" rel="noopener noreferrer">{t.directions}</ActionLink>
          </div>
          <address>
            <span><MapPin size={17} aria-hidden="true" />{t.address}</span>
            <span>{t.exactLocation}</span>
            <a href={`mailto:${schoolEmail}`}>{t.email}: {schoolEmail}</a>
          </address>
        </div>
        <form className="inquiry-form" onSubmit={handleInquiry}>
          <label>
            <span>{t.parentName}</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>{t.parentPhone}</span>
            <input name="phone" type="tel" autoComplete="tel" required />
          </label>
          <label>
            <span>{t.interestedGrade}</span>
            <select name="grade" required defaultValue="">
              <option value="" disabled>{t.chooseGrade}</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>{isArabic ? grade.replace("Grade", "الصف") : grade}</option>
              ))}
            </select>
          </label>
          <label>
            <span>{t.message}</span>
            <textarea name="message" rows={4} placeholder={t.messagePlaceholder} />
          </label>
          <button className="form-submit" type="submit">
            <span>{t.sendInquiry}</span>
            <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <p className="form-note">{t.inquiryNote}</p>
          <p className="form-status" aria-live="polite">{formStatus}</p>
        </form>
      </div>
    </section>
  );
}

