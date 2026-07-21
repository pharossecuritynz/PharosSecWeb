import BeaconMark from "./BeaconMark";

export default function CTA() {
  return (
    <section id="contact" className="bg-grain relative overflow-hidden bg-navy py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-teal/15 blur-[130px]"
      />

      <div className="container-px relative z-10 mx-auto max-w-3xl text-center">
        <BeaconMark className="mx-auto h-11 w-11 text-teal" />

        <h2 className="mt-8 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Ready to understand where you stand?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65">
          Start with a straightforward conversation about your business and
          the risks that matter most, no obligation, no jargon.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:hello@pharossecurity.co.nz"
            className="inline-flex items-center justify-center rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-cyan"
          >
            Book a cyber risk review
          </a>
          <a
            href="mailto:hello@pharossecurity.co.nz"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            hello@pharossecurity.co.nz
          </a>
        </div>
      </div>
    </section>
  );
}
