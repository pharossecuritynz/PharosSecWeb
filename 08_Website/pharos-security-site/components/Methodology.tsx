const levels = [
  {
    label: "Self-reported",
    description: "You told us it's in place.",
  },
  {
    label: "Documented",
    description: "A report or document shows it.",
  },
  {
    label: "Observed",
    description: "We saw it ourselves.",
  },
  {
    label: "Verified",
    description: "We checked it ourselves.",
  },
];

export default function Methodology() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Checked, not assumed.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
              Every review is measured against the Pharos Security Baseline:
              a practical security standard for New Zealand small
              businesses, informed by recognised international security
              controls and New Zealand guidance.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal/70">
              We never let a finding sound more certain than it is. Every
              claim in a Pharos report is labelled by how it was actually
              confirmed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {levels.map((level, index) => (
              <div key={level.label} className="border-t border-charcoal/15 pt-5">
                <span className="font-heading text-xs font-semibold tracking-wide text-teal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1.5 font-heading text-base font-semibold text-navy">
                  {level.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
                  {level.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
