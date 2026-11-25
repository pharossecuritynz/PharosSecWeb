import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles } from "@/lib/resources/articles";

export const metadata: Metadata = {
  title: "Security Guides for New Zealand Small Businesses | Pharos Security",
  description:
    "Plain-English cyber security guides for New Zealand small businesses: AI-enabled attacks, MFA, questions for your IT provider, ransomware recovery, and a free security foundations checklist.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-grain relative bg-navy pt-20 pb-20 md:pt-24 md:pb-24">
          <div className="container-px relative z-10 mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan">Guides</p>
              <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl">
                Practical security, explained plainly.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                Short guides for business owners and managers. They&apos;re
                written to be useful whether or not you ever work with us,
                and every figure links to its original source.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container-px mx-auto max-w-6xl">
            <Link
              href="/resources/security-foundations-checklist"
              className="group block rounded-2xl border border-teal/30 bg-mist p-8 transition-colors duration-200 hover:border-teal sm:p-10"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                Free self-check
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-navy">
                Security foundations checklist
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal/70">
                Ten questions covering the areas that matter most, from
                internet exposure to backups. Each one explains why it
                matters. About ten minutes, no sign-up, and nothing you
                select leaves your browser.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                Start the checklist <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>

            <h2 className="mt-16 font-heading text-2xl font-bold tracking-tight text-navy">
              Guides
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/resources/${article.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_2px_14px_-6px_rgba(7,26,45,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-teal/40"
                  >
                    <h3 className="font-heading text-lg font-semibold leading-snug text-navy">
                      {article.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">
                      {article.description}
                    </p>
                    <span className="mt-5 text-xs font-medium text-charcoal/50">
                      {article.readingMinutes} minute read
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
