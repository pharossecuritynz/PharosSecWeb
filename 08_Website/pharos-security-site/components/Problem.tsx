const points = [
  {
    title: "Too busy running the business",
    description:
      "Security often gets pushed aside for the day-to-day demands of running a growing operation.",
  },
  {
    title: "Advice that misses the mark",
    description:
      "Guidance is either written for large enterprises with dedicated teams, or too vague to actually act on.",
  },
  {
    title: "Unsure where to start",
    description:
      "Without a clear picture of what matters most, it's hard to know which risks are worth addressing first.",
  },
];

export default function Problem() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-teal">
            Why Pharos
          </span>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Cyber security shouldn&apos;t feel overwhelming.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
            Most cyber security advice is written for organisations with
            dedicated security teams and enterprise budgets. Pharos Security
            translates it into practical, right-sized steps for how New
            Zealand SMEs actually operate.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/10 sm:grid-cols-3">
          {points.map((point) => (
            <div key={point.title} className="bg-mist p-8">
              <h3 className="font-heading text-lg font-semibold text-navy">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
