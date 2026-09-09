import Link from "next/link";
import { CompassIcon, GridIcon, PeopleIcon, CheckIcon } from "./icons";

const whatYouGet = [
  "An executive summary in plain English, including what's already working",
  "Findings labelled by how confident we are, self-reported, documented, observed, or verified",
  "A prioritised 30/60/90-day plan, with each action assigned: for you to decide, for your IT provider to action, or a specialist referral",
];

const entryPoints = [
  {
    icon: GridIcon,
    title: "Want a free first look?",
    description:
      "Run the Exposure Snapshot: an instant, independent check of your domain, email security, and public exposure. No obligation.",
    href: "/exposure-snapshot",
    linkLabel: "Try the Exposure Snapshot",
  },
  {
    icon: PeopleIcon,
    title: "Is your real question about your MSP?",
    description:
      "Same review, framed around your existing IT provider: what's covered, what's unclear, and what's worth asking about.",
    href: "/it-provider-security-assurance",
    linkLabel: "See IT Provider Security Assurance",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            One clear review, not a menu of scans.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
            Pharos sells one thing: an independent, evidence-based review of
            your security, scoped and priced up front, that tells you what
            matters and what to do next.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-charcoal/10 bg-white p-9 shadow-[0_2px_14px_-6px_rgba(7,26,45,0.08)] sm:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-mist text-navy">
                <CompassIcon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-heading text-2xl font-semibold text-navy">
                Independent Security Review
              </h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal/70">
                How well protected is your business, what actually matters,
                and what should happen next. A structured review across
                identity, email, devices, backups, external exposure, and
                the rest of what a business your size genuinely needs
                checked, assessed against a practical baseline, not an
                enterprise framework.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/60">
                <span className="font-semibold text-navy">For: </span>
                Owners and operations leads who know cyber security matters
                but have no independent picture of where they actually
                stand.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                What you get
              </p>
              <ul className="mt-3 space-y-3">
                {whatYouGet.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base leading-relaxed text-charcoal/75"
                  >
                    <CheckIcon className="mt-1 h-4 w-4 flex-none text-teal" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/book-a-conversation"
                  className="inline-flex items-center justify-center rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-midnight"
                >
                  Book a 15-minute conversation
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-charcoal/60">
          Once you know what matters, we can independently check that your
          IT provider actually addressed it, through Remediation Assurance,
          rather than leaving that on trust.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {entryPoints.map((entry) => {
            const Icon = entry.icon;
            return (
              <Link
                key={entry.title}
                href={entry.href}
                className="group rounded-2xl border border-charcoal/10 bg-white p-7 transition-colors duration-200 hover:border-teal/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-navy transition-colors duration-200 group-hover:bg-teal/15 group-hover:text-teal">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-heading text-lg font-semibold text-navy">
                  {entry.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                  {entry.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                  {entry.linkLabel}
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
