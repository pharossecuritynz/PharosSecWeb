import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms | Pharos Security",
  description: "Terms of engagement for working with Pharos Security.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-white py-24 md:py-32">
          <div className="container-px mx-auto max-w-3xl">
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Terms
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              Pharos Security&apos;s formal Terms of Engagement are being
              reviewed as part of setting up the business properly, rather
              than publishing generic legal text and treating it as done.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
              Every paid engagement is governed by a written scope agreed
              before work begins, setting out what&apos;s included, what
              isn&apos;t, pricing, and timelines, in plain English, not just
              this page.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
              Questions about how an engagement would work before you
              commit to anything are exactly what the free 15-minute
              conversation is for. Email{" "}
              <a
                href="mailto:pharos.security.nz@gmail.com?subject=Terms%20question"
                className="font-medium text-navy underline underline-offset-2 hover:text-teal"
              >
                pharos.security.nz@gmail.com
              </a>{" "}
              any time.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
