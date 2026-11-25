import Link from "next/link";
import { CheckIcon } from "./icons";

const trustPoints = [
  "Independent, no products sold",
  "Works with your existing IT support",
  "Clear scope, fixed pricing",
];

/*
  Hero copy: PROPOSED 2026-11-25, pending Jason Hill's approval. See
  00-business/decisions.md. Claims here are supported by the sources cited
  in components/Evidence.tsx:
  - "faster, at lower cost": UK NCSC, 24 Nov 2026 ("how quickly and
    persistently threat actors can conduct attacks, at low cost").
  - "familiar weaknesses": UK NCSC ("none of the weaknesses being exploited
    are new or novel") and Unit 42 2026 (preventable gaps in over 90% of
    breaches investigated).
  The founder's 53% NCSC NZ statistic moved, unchanged and with its
  citation, to the Evidence section.
*/
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
        <div className="max-w-4xl animate-fade-up">
          <span className="inline-flex items-center rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan uppercase">
            Independent security advisory for New Zealand businesses
          </span>

          <h1 className="mt-7 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
            AI is changing cyberattacks. Getting the basics right has never
            mattered more.
          </h1>

          <div className="mt-7 max-w-3xl space-y-4 text-lg leading-relaxed text-white/70 md:text-xl">
            <p>
              Attackers are using automated tools to find and exploit
              weaknesses faster, and more cheaply, than before. But the
              weaknesses are mostly familiar: systems left open to the
              internet, sign-ins without multi-factor authentication,
              software that hasn&apos;t been updated, and protections that
              are only partly in place.
            </p>
            <p className="font-semibold text-white/90">
              You may already have an IT provider, antivirus and backups.
              Having security measures in place is not the same as knowing
              they&apos;re enough.
            </p>
            <p>
              Pharos independently checks how your business is protected,
              shows you which gaps matter most, and helps you fix them with
              your existing IT provider.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/exposure-snapshot"
              className="inline-flex items-center justify-center rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-cyan"
            >
              Check what you expose to the internet
            </Link>
            <Link
              href="/book-a-conversation"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Talk about your business security
            </Link>
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
