import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Thanks | Pharos Security",
  description: "Your details have been received.",
};

export default function BookAConversationThanksPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-white py-24 md:py-32">
          <div className="container-px mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Thanks, that&apos;s through.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              We&apos;ll read what you&apos;ve sent and be in touch to
              arrange a time, usually within one business day.
            </p>
            <Link
              href="/"
              className="mt-10 inline-flex items-center justify-center rounded-full border border-charcoal/15 px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-teal/40 hover:bg-mist"
            >
              Back to the homepage
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
