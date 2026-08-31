import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckIcon, MailIcon, GridIcon, ScanIcon } from "@/components/icons";
import ExposureSnapshotTool from "@/components/exposure-snapshot/ExposureSnapshotTool";

export const metadata: Metadata = {
  title: "Exposure Snapshot | Pharos Security",
  description:
    "A free, independent check of your domain, your email security, and what's publicly exposed, without touching anything internal.",
};

const whatWeCheck = [
  {
    icon: MailIcon,
    label: "Email impersonation",
    description: "Check whether your domain has basic protections against spoofed email.",
  },
  {
    icon: GridIcon,
    label: "Domain security",
    description: "Review important DNS and domain configuration.",
  },
  {
    icon: ScanIcon,
    label: "Public footprint",
    description: "See what's publicly discoverable about your business online.",
  },
];

export default function ExposureSnapshotPage() {
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
                Free · No obligation
              </span>
              <h1 className="mt-7 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl">
                See what your business exposes to the internet.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                A quick external check of your domain, email protections, and public internet footprint.
                We don&apos;t vulnerability-scan or attempt to access your systems during this check.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container-px mx-auto max-w-3xl">
            <div className="rounded-3xl border border-charcoal/10 bg-mist/60 p-7 sm:p-10">
              <ExposureSnapshotTool />
            </div>
          </div>
        </section>

        <section className="bg-mist py-24 md:py-32">
          <div className="container-px mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                What we check.
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-3">
              {whatWeCheck.map(({ icon: Icon, label, description }) => (
                <div key={label}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-navy">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy">{label}</h3>
                  <p className="mt-2 text-base leading-relaxed text-charcoal/70">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 flex items-start gap-3 rounded-2xl border border-charcoal/10 bg-white p-6">
              <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-teal" />
              <p className="text-sm leading-relaxed text-charcoal/70">
                We don&apos;t vulnerability-scan or attempt to access your systems during the public check.
                This is an external security intelligence snapshot, not a penetration test.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
