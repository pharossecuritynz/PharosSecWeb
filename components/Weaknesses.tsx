import Link from "next/link";

/*
  Maps the familiar weaknesses in the research to what Pharos actually
  offers, using the confirmed service names and statuses in
  03_Services/service-catalogue.md and 00-business/pharos-current-strategy.md:
  Exposure Snapshot (free, passive), Independent Security Review (core),
  Remediation Assurance (follow-on). Incident readiness is covered inside
  the review's scope rather than pitched as a standalone product, and
  ongoing support is only offered after a review, per the strategy doc.
*/
const groups = [
  {
    label: "What you expose to the internet",
    weaknesses: [
      "Systems open to the internet that don’t need to be",
      "Forgotten or unsupported websites and remote access portals",
      "Email and domain settings that make your business easier to impersonate",
      "Business information that’s more public than you’d expect",
    ],
    service: "Exposure Snapshot",
    serviceNote:
      "Free and automated. Looks only at publicly available information, the same outside view an attacker has. It never logs in, scans for vulnerabilities or tests your systems.",
    href: "/exposure-snapshot",
    linkLabel: "Run the free Exposure Snapshot",
  },
  {
    label: "Whether the essentials are really in place",
    weaknesses: [
      "Multi-factor authentication that’s available but not enforced",
      "Weak, reused or stolen passwords",
      "Updates that lag, and devices missing protection",
      "More administrator access than anyone needs",
      "Backups that have never been restored",
      "Sign-ins and changes nobody is watching",
      "Whether you’d know what to do, and who to call, if something got through",
    ],
    service: "Independent Security Review",
    serviceNote:
      "Our core review. We check what’s actually in place across identity, devices, email, backups, monitoring and incident readiness, then give you a prioritised plan.",
    href: "/#services",
    linkLabel: "See what the review covers",
  },
  {
    label: "Whether the fixes actually happened",
    weaknesses: [
      "Changes agreed but never quite finished",
      "Fixes applied to most accounts or devices, but not all",
      "Settings that drift back over time",
    ],
    service: "Remediation Assurance",
    serviceNote:
      "After a review, we work with your IT provider on the priority findings and independently check that they’ve been addressed, rather than leaving it on trust.",
    href: "/it-provider-security-assurance",
    linkLabel: "How we work with your IT provider",
  },
];

export default function Weaknesses() {
  return (
    <section className="bg-grain relative bg-midnight py-24 md:py-32" aria-labelledby="weaknesses-heading">
      <div className="container-px relative z-10 mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2
            id="weaknesses-heading"
            className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Familiar weaknesses, and what we do about them.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">
            These are the gaps that turn up again and again in incident
            research. None of them needs an expensive new product to fix.
            They need someone to find them, prioritise them and check
            they&apos;re closed.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.label}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8"
            >
              <h3 className="font-heading text-lg font-semibold text-white">{group.label}</h3>
              <ul className="mt-5 space-y-3">
                {group.weaknesses.map((weakness) => (
                  <li key={weakness} className="flex gap-3 text-sm leading-relaxed text-white/70">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-teal"
                    />
                    {weakness}
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-white/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan">
                  {group.service}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{group.serviceNote}</p>
                <Link
                  href={group.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-cyan"
                >
                  {group.linkLabel} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-base leading-relaxed text-white/60">
          Security doesn&apos;t stay done. New systems get added, settings
          drift, new weaknesses are published and the business changes.
          After a review, we can re-check what matters at sensible
          intervals, so the picture stays current rather than becoming a
          report in a drawer.
        </p>
      </div>
    </section>
  );
}
