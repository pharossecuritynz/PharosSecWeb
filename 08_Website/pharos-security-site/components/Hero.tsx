import Link from "next/link";
import { CheckIcon } from "./icons";

const trustPoints = [
  "Independent, no products sold",
  "Works with your existing IT support",
  "Clear scope, fixed pricing",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="bg-grain relative overflow-hidden bg-navy pt-20 pb-28 md:pt-28 md:pb-36"
    >
      {/* Beacon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-teal/20 blur-[140px] animate-beacon-sweep"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-[-15%] h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[120px]"
      />

      {/* Radiating beam lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 500"
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-[0.15]"
        preserveAspectRatio="xMidYMin slice"
      >
        <g stroke="#B8EEF0" strokeWidth="1">
          <line x1="980" y1="40" x2="120" y2="420" />
          <line x1="980" y1="40" x2="380" y2="480" />
          <line x1="980" y1="40" x2="680" y2="500" />
          <line x1="980" y1="40" x2="960" y2="500" />
          <line x1="980" y1="40" x2="1180" y2="440" />
        </g>
      </svg>

      {/* Horizon line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="container-px relative z-10 mx-auto max-w-6xl">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan uppercase">
            Independent security advisory for New Zealand SMEs
          </span>

          <h1 className="mt-7 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
            Your IT support manages the technology. Who checks the
            security?
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            Pharos Security independently checks whether your security is
            actually good enough, and gives you a clear, prioritised plan
            if it isn&apos;t. No jargon, no products to sell.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/book-a-conversation"
              className="inline-flex items-center justify-center rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-cyan"
            >
              Book a 15-minute conversation
            </Link>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              See how the review works
            </a>
          </div>

          <div className="mt-10 flex flex-col gap-x-6 gap-y-2.5 text-sm text-white/60 sm:flex-row sm:flex-wrap sm:items-center">
            {trustPoints.map((point) => (
              <span key={point} className="inline-flex items-center gap-2">
                <CheckIcon className="h-4 w-4 flex-none text-teal" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
