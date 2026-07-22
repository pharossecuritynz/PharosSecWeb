import BeaconMark from "./BeaconMark";

const steps = [
  {
    number: "1",
    title: "Understand",
    description:
      "We build a clear picture of your business, your data, and the risks that actually apply to you.",
  },
  {
    number: "2",
    title: "Prioritise",
    description:
      "We rank what matters most, so effort and budget go toward the risks with the greatest impact.",
  },
  {
    number: "3",
    title: "Improve",
    description:
      "We help you put practical, sustainable controls in place, matched to your team and tools.",
  },
  {
    number: "4",
    title: "Prepare",
    description:
      "We make sure your business knows what to do if something goes wrong, before it happens.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-grain relative bg-navy py-24 md:py-32">
      <div className="container-px relative z-10 mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <BeaconMark className="h-6 w-6" />
          <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A steady, four-step path forward.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">
            Every engagement follows the same considered process:
            calm, methodical, and grounded in what matters for your business.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px overflow-hidden lg:block"
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
            <div className="absolute inset-y-[-2.5px] left-0 h-[6px] w-20 animate-beam-travel rounded-full bg-cyan/80 blur-[3px]" />
          </div>
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_14px_2px_rgba(184,238,240,0.5)]"
                />
              </div>
              <span className="mt-4 block font-heading text-xs font-semibold tracking-wide text-teal/80">
                Step {step.number}
              </span>
              <h3 className="mt-1.5 font-heading text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
