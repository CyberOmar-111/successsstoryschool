const DEFAULT_SCHOOL_NAME = "Success Story School";

export function buildInquiryDraft({ isArabic, name, phone, grade, message, schoolName = DEFAULT_SCHOOL_NAME }) {
  const subject = isArabic
    ? `استفسار تسجيل - ${grade || schoolName}`
    : `School inquiry - ${grade || schoolName}`;

  const body = isArabic
    ? [
        `اسم ولي الأمر: ${name}`,
        `رقم الهاتف: ${phone}`,
        `الصف المطلوب: ${grade}`,
        "",
        message || "أرغب بالاستفسار عن التسجيل في مدرسة قصة نجاح."
      ].join("\n")
    : [
        `Parent name: ${name}`,
        `Phone: ${phone}`,
        `Interested grade: ${grade}`,
        "",
        message || "I would like to ask about enrollment at Success Story School."
      ].join("\n");

  return { subject, body };
}

export function openInquiryComposer({ formElement, isArabic, schoolEmail, schoolName = DEFAULT_SCHOOL_NAME }) {
  const data = new FormData(formElement);
  const payload = {
    name: String(data.get("name") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    grade: String(data.get("grade") || "").trim(),
    message: String(data.get("message") || "").trim()
  };

  const draft = buildInquiryDraft({ ...payload, isArabic, schoolName });
  const gmailUrl = new URL("https://mail.google.com/mail/");
  gmailUrl.search = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: schoolEmail,
    su: draft.subject,
    body: draft.body
  }).toString();

  if (!window.open(gmailUrl.toString(), "_blank", "noopener")) {
    window.location.href = gmailUrl.toString();
  }

  return payload;
}
