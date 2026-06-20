export function TailwindCard({
  eyebrow = "Tailwind ready",
  title = "A modern school card",
  children = "Use this component as a compact starting point for utility-first React UI in the Success Story School theme.",
}) {
  return (
    <article className="rounded-school border border-school-line bg-white p-6 shadow-school transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-3 focus-within:ring-school-amber/35">
      <p className="font-body text-xs font-extrabold uppercase tracking-[0.14em] text-school-teal">{eyebrow}</p>
      <h3 className="mt-3 font-heading text-2xl leading-tight text-school-navy">{title}</h3>
      <p className="mt-3 font-body text-sm leading-7 text-school-muted">{children}</p>
      <a
        className="mt-5 inline-flex items-center rounded-school bg-school-teal px-4 py-2 font-body text-sm font-extrabold text-white shadow-sm transition hover:bg-school-navy focus:outline-none focus:ring-3 focus:ring-school-amber/35"
        href="/student"
      >
        Open student portal
      </a>
    </article>
  );
}
