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
        <div className="max-w-4xl animate-fade-up">
          <span className="inline-flex items-center rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan uppercase">
            Independent security advisory for New Zealand SMEs
          </span>

          <h1 className="mt-7 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
            Think your business is protected?
          </h1>

          {/*
            Statistic sourced and verified before publishing, per CLAUDE.md's
            no-invented-statistics rule: National Cyber Security Centre,
            "More than half of New Zealand businesses experiencing cyber
            threats" (released 4 September 2025), a survey commissioned by
            the NCSC and conducted by The Research Agency. Exact wording
            preserved: the source says "cyber threat," not "security
            incident" or "attack," and the underlying research does not
            distinguish threat exposure from confirmed incidents. See
            00-business/decisions.md (2026-09-09 entry) for the record.
          */}
          <div className="mt-7 flex items-start gap-3.5 rounded-2xl border border-teal/25 bg-white/5 px-5 py-4">
            <span
              aria-hidden="true"
              className="mt-1 h-2 w-2 flex-none rounded-full bg-teal shadow-[0_0_10px_2px_rgba(47,167,160,0.6)]"
            />
            <p className="text-base leading-relaxed text-white/85 sm:text-lg">
              <strong className="font-semibold text-white">
                53% of surveyed New Zealand SMEs experienced a cyber threat
                in the past six months.
              </strong>
            </p>
          </div>
          <p className="mt-2 text-xs text-white/40">
            Source: National Cyber Security Centre, September 2025.
          </p>

          <div className="mt-7 max-w-3xl space-y-4 text-lg leading-relaxed text-white/70 md:text-xl">
            <p>
              You may already have an IT provider, antivirus, backups, and
              Microsoft&nbsp;365 security in place. Most businesses do.
            </p>
            <p className="font-semibold text-white/90">
              But having security measures in place is not the same as
              knowing they&apos;re enough.
            </p>
            <p>
              Pharos independently reviews how your business is protected,
              shows you where the important gaps are, and gives you a
              practical plan to improve them with your existing IT
              provider.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/exposure-snapshot"
              className="inline-flex items-center justify-center rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-cyan"
            >
              Find out where you stand
            </Link>
            <Link
              href="/book-a-conversation"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Book a 15-minute conversation
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
