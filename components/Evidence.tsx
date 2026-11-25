import Link from "next/link";
import { SOURCES } from "@/lib/resources/articles";

/*
  Every finding below was checked against its original source on
  2026-11-25. Quoted text is verbatim. Wording is deliberately no stronger
  than the source: for example Unit 42's figure describes breaches it
  investigated, not all attacks. Full verification notes:
  08_Website/website-review-2026-11.md.

  The NCSC NZ 53% statistic is the founder-supplied, previously verified
  figure from the 2026-09-09 hero (see 00-business/decisions.md), moved
  here unchanged with its original wording.
*/
const findings = [
  {
    source: "UK National Cyber Security Centre",
    date: "November 2026",
    finding:
      "A marked rise, since September 2026, in attacks using AI “agentic” frameworks such as ARTEX, a tool originally built for authorised security testing. The weaknesses exploited were familiar ones: credentials left in code, default or missing passwords, misconfigurations and poorly protected APIs.",
    quote:
      "Nearly everything the NCSC has seen can be prevented by implementing cyber security best practice.",
    caveat: "UK observations, not New Zealand data.",
    href: SOURCES.ukNcscAgentic.url,
  },
  {
    source: "Palo Alto Networks Unit 42",
    date: "2026 report, covering 2025",
    finding:
      "Across more than 750 major incidents, preventable gaps such as limited visibility, inconsistently applied controls or excessive account access materially enabled the intrusion in over 90% of breaches.",
    caveat:
      "These were serious incidents a specialist team was called in to handle. It doesn’t mean 90% of all attacks are preventable.",
    href: SOURCES.unit42.url,
  },
  {
    source: "New Zealand National Cyber Security Centre",
    date: "Critical Controls, reviewed annually",
    finding:
      "Ten priority controls, chosen from the incidents NCSC sees, including patching, multi-factor authentication, password managers, centralised logging, tested backups and least privilege.",
    quote:
      "When correctly implemented, these controls would prevent, detect, or contain most of the attacks we're seeing.",
    href: SOURCES.nzNcscControls.url,
  },
  {
    source: "New Zealand National Cyber Security Centre",
    date: "September 2025",
    finding:
      "53% of surveyed New Zealand SMEs experienced a cyber threat in the past six months, up from 36% the year before.",
    caveat: "“Cyber threat” is the survey’s term; it doesn’t separate attempts from successful incidents.",
    href: SOURCES.nzNcscSurvey.url,
  },
];

const ourView = [
  {
    title: "AI hasn’t changed what attackers exploit.",
    text: "It has shortened the time between a weakness appearing and someone finding it. Gaps that once sat unnoticed for months are now more likely to be found sooner.",
  },
  {
    title: "Most of the fixes aren’t new products.",
    text: "They are configuration and habit: enforcing what you already pay for, removing what you don’t need, and checking that what you assume works actually does.",
  },
  {
    title: "No set of controls removes all risk.",
    text: "That’s why being ready to respond and recover belongs alongside prevention, not after it.",
  },
];

export default function Evidence() {
  return (
    <section id="research" className="bg-white py-24 md:py-32" aria-labelledby="research-heading">
      <div className="container-px mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2
            id="research-heading"
            className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl"
          >
            What the research actually says.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
            We&apos;d rather show you the evidence than ask you to take our
            word for it. Here is what recent research found, followed,
            separately, by what we think it means for a business your
            size.
          </p>
        </div>

        <p className="mt-14 text-xs font-semibold uppercase tracking-wide text-charcoal/50">
          What the research found
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          {findings.map((item) => (
            <li
              key={item.href}
              className="flex flex-col rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_2px_14px_-6px_rgba(7,26,45,0.08)]"
            >
              <p className="font-heading text-sm font-semibold text-navy">{item.source}</p>
              <p className="text-xs text-charcoal/50">{item.date}</p>
              <p className="mt-4 text-base leading-relaxed text-charcoal/80">{item.finding}</p>
              {item.quote && (
                <blockquote className="mt-4 border-l-2 border-teal pl-4 text-base italic leading-relaxed text-charcoal/75">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              )}
              {item.caveat && (
                <p className="mt-4 text-sm leading-relaxed text-charcoal/55">{item.caveat}</p>
              )}
              <a
                href={item.href}
                rel="noopener noreferrer"
                target="_blank"
                className="mt-auto pt-5 text-sm font-semibold text-navy underline decoration-charcoal/20 underline-offset-4 transition-colors hover:text-teal hover:decoration-teal"
              >
                Read the original source
                <span className="sr-only"> from {item.source} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 rounded-2xl bg-mist p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">
            What we take from it
          </p>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
            {ourView.map((point) => (
              <div key={point.title}>
                <h3 className="font-heading text-lg font-semibold leading-snug text-navy">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-base leading-relaxed text-charcoal/70">{point.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-charcoal/60">
            More detail in our guide:{" "}
            <Link
              href="/resources/ai-cyberattacks-what-nz-businesses-need-to-know"
              className="font-semibold text-navy underline decoration-charcoal/20 underline-offset-4 hover:text-teal"
            >
              AI-powered cyberattacks: what New Zealand businesses actually need to know
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
