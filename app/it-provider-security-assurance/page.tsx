import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckIcon, PeopleIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "IT Provider Security Assurance | Pharos Security",
  description:
    "Independent verification that your MSP or internal IT team has the important security outcomes in place, without putting your provider on trial.",
};

const scope = [
  {
    label: "Identity & access",
    items: [
      "MFA coverage across your organisation",
      "Privileged administration practices",
      "Microsoft 365 or Google Workspace configuration, checked against the Pharos Security Baseline",
    ],
  },
  {
    label: "Protection & recovery",
    items: [
      "Endpoint protection coverage",
      "Patch management evidence",
      "Backup evidence",
    ],
  },
  {
    label: "Visibility & response",
    items: [
      "External exposure",
      "Vulnerability management practices, as reported and evidenced",
      "Logging, at whatever level exists",
      "Incident-response responsibilities as currently defined",
    ],
  },
  {
    label: "Provider accountability",
    items: [
      "Review of existing MSP reports and documentation",
      "Review of stated security responsibilities, and what falls into the gap between you and your provider",
      "Any security products your provider has recommended, translated into plain business risk",
    ],
  },
];

const situations = [
  "“Our MSP says we’re secure, but how would we independently know that?”",
  "“Our supplier has recommended another security product. Do we actually need it?”",
  "“The board wants reassurance that IT is covering the right things.”",
  "“Our insurance renewal asks questions we don’t understand.”",
  "“We’re changing MSP, or just did, and want an independent baseline.”",
];

export default function ITProviderSecurityAssurancePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-grain relative overflow-hidden bg-navy pt-20 pb-24 md:pt-28 md:pb-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-teal/15 blur-[130px]"
          />
          <div className="container-px relative z-10 mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan uppercase">
                For businesses with an MSP or internal IT
              </span>
              <h1 className="mt-7 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl">
                Your IT support manages your technology. This is how you
                independently check the security.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                IT Provider Security Assurance is an independent review of
                the security outcomes your MSP or internal IT team have in
                place, without putting anyone on trial. Most providers are
                doing a reasonable job with the scope they&apos;ve been
                given. The gap is usually that nobody has independently
                checked, not that the provider is failing.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/book-a-conversation"
                  className="inline-flex items-center justify-center rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-cyan"
                >
                  Book a 15-minute conversation
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
                >
                  See all services
                </Link>
              </div>
              <p className="mt-4 text-sm text-white/60">
                Or email{" "}
                <a
                  href="mailto:pharos.security.nz@gmail.com?subject=IT%20Provider%20Security%20Assurance%20enquiry"
                  className="font-medium text-white/80 underline underline-offset-2 transition-colors hover:text-white"
                >
                  pharos.security.nz@gmail.com
                </a>{" "}
                directly.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 md:py-32">
          <div className="container-px mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  Complementary, not adversarial.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
                  We don&apos;t build this around catching your IT support
                  out, proving they can&apos;t be trusted, or second-guessing
                  technical decisions for the sake of it. The working
                  principle is simple: your IT support, whether that&apos;s
                  an outsourced provider or an internal team, operates and
                  supports the technology; we independently review the
                  security outcome and help you understand risk and
                  priorities.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
                  Where it&apos;s useful, we invite them into the process
                  rather than working around them. A good outcome here is
                  often &ldquo;your IT support has this covered, and
                  here&rsquo;s the evidence&rdquo;, not just a list of gaps.
                </p>
              </div>

              <div className="rounded-3xl border border-charcoal/10 bg-mist/60 p-9 sm:p-10">
                <h3 className="font-heading text-lg font-semibold text-navy">
                  Situations this fits
                </h3>
                <ul className="mt-6 space-y-4">
                  {situations.map((situation) => (
                    <li key={situation} className="flex items-start gap-3.5">
                      <PeopleIcon className="mt-0.5 h-5 w-5 flex-none text-teal" />
                      <span className="text-base leading-relaxed text-charcoal/75">
                        {situation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-mist py-24 md:py-32">
          <div className="container-px mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                What we check.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
                Every finding is labelled by how it was confirmed:
                self-reported, documented, observed, or verified, so you
                always know the difference between what was told to us and
                what we actually checked.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
              {scope.map((group) => (
                <div key={group.label}>
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-navy/70">
                    {group.label}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckIcon className="mt-1 h-4 w-4 flex-none text-teal" />
                        <span className="text-base leading-relaxed text-charcoal/75">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-grain relative overflow-hidden bg-navy py-24 md:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[640px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-teal/15 blur-[120px]"
          />
          <div className="container-px relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Find out what&apos;s actually covered.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65">
              A 15-minute conversation, no obligation, to see whether this
              is the right starting point for your business.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/book-a-conversation"
                className="inline-flex items-center justify-center rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-cyan"
              >
                Book a 15-minute conversation
              </Link>
              <a
                href="mailto:pharos.security.nz@gmail.com?subject=IT%20Provider%20Security%20Assurance%20enquiry"
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                pharos.security.nz@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
