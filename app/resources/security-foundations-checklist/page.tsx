import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoundationsChecklist from "@/components/FoundationsChecklist";
import { SOURCES } from "@/lib/resources/articles";

export const metadata: Metadata = {
  title: "Free Security Foundations Checklist for Small Businesses | Pharos Security",
  description:
    "A free, ten-question cyber security self-check for New Zealand small businesses. Covers internet exposure, MFA, patching, backups, admin access and more. No sign-up, nothing leaves your browser.",
  alternates: { canonical: "/resources/security-foundations-checklist" },
};

export default function ChecklistPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-grain relative bg-navy pt-16 pb-16 md:pt-20 md:pb-20 print:bg-white print:pt-0 print:pb-6">
          <div className="container-px relative z-10 mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-sm text-white/60 print:hidden">
              <Link href="/resources" className="transition-colors hover:text-white">
                Guides
              </Link>
            </nav>
            <h1 className="mt-4 font-heading text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl print:text-navy">
              Security foundations checklist
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/70 print:text-charcoal">
              Ten questions based on the controls New Zealand&apos;s NCSC
              says would prevent, detect or contain most of the attacks it
              sees, when correctly implemented. Answer honestly;
              &ldquo;not sure&rdquo; is a useful answer. You won&apos;t be
              asked for passwords, system details or contact information.
            </p>
          </div>
        </section>

        <section className="bg-mist/50 py-14 md:py-20 print:bg-white print:py-0">
          <div className="container-px mx-auto max-w-3xl">
            <FoundationsChecklist />

            <p className="mt-10 text-sm leading-relaxed text-charcoal/60">
              The ten areas draw on New Zealand&apos;s{" "}
              <a
                href={SOURCES.nzNcscControls.url}
                rel="noopener noreferrer"
                target="_blank"
                className="underline decoration-charcoal/25 underline-offset-2 hover:text-navy"
              >
                NCSC Critical Controls
              </a>{" "}
              and the{" "}
              <a
                href={SOURCES.cisIg1.url}
                rel="noopener noreferrer"
                target="_blank"
                className="underline decoration-charcoal/25 underline-offset-2 hover:text-navy"
              >
                CIS Controls Implementation Group 1
              </a>
              , simplified for business owners. Neither organisation has
              reviewed or endorsed this checklist.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
