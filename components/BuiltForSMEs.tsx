const reasons = [
  {
    title: "Right-sized for your business",
    description:
      "No enterprise frameworks bolted onto a ten-person team. Recommendations that fit your actual scale.",
  },
  {
    title: "Plain-language advice",
    description:
      "Every conversation is grounded in what it means for your business, not technical terminology.",
  },
  {
    title: "Practical, sensible budgets",
    description:
      "Guidance that respects what SMEs can realistically invest in, prioritised by impact.",
  },
  {
    title: "Independent, no products to sell",
    description:
      "Advice isn't tied to any software or vendor: only to what genuinely reduces your risk.",
  },
];

export default function BuiltForSMEs() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Built for how New Zealand SMEs actually operate.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
              Pharos Security exists because most cyber security advice
              isn&apos;t written with businesses like yours in mind. We close
              that gap.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-charcoal/10 bg-mist/60 p-7 shadow-[0_2px_14px_-8px_rgba(7,26,45,0.06)] transition-colors duration-200 hover:border-teal/30"
              >
                <h3 className="font-heading text-base font-semibold text-navy">
                  {reason.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-charcoal/65">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
