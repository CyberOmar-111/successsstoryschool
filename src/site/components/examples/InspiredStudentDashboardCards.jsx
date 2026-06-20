const defaultCards = [
  {
    label: "Attendance",
    value: "96%",
    detail: "Live attendance summary once records are posted by school staff.",
    tone: "teal",
  },
  {
    label: "Overall average",
    value: "88%",
    detail: "A compact grade signal for the current published report period.",
    tone: "navy",
  },
  {
    label: "Fee balance",
    value: "0.00 JOD",
    detail: "Clear account status without exposing unnecessary payment detail.",
    tone: "amber",
  },
];

const toneClasses = {
  teal: "bg-school-teal/10 text-school-teal ring-school-teal/20",
  navy: "bg-school-navy/10 text-school-navy ring-school-navy/20",
  amber: "bg-school-amber/15 text-school-amber ring-school-amber/25",
};

export function InspiredStudentDashboardCards({ cards = defaultCards }) {
  return (
    <section className="grid gap-4 md:grid-cols-3" aria-label="Student dashboard cards">
      {cards.map((card, index) => (
        <article
          className="rounded-school border border-white/70 bg-white/75 p-5 shadow-school backdrop-blur-xl transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg focus-within:ring-3 focus-within:ring-school-amber/35"
          key={card.label}
          style={{ transitionDelay: `${index * 40}ms` }}
        >
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] ring-1 ${toneClasses[card.tone] ?? toneClasses.teal}`}>
            {card.label}
          </span>
          <strong className="mt-5 block font-heading text-3xl leading-tight text-school-navy">{card.value}</strong>
          <p className="mt-3 font-body text-sm leading-7 text-school-muted">{card.detail}</p>
        </article>
      ))}
    </section>
  );
}
