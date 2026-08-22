import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy | Pharos Security",
  description: "How Pharos Security handles personal and business information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-white py-24 md:py-32">
          <div className="container-px mx-auto max-w-3xl">
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Privacy
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              Pharos Security is finalising its full privacy policy as part
              of setting up the business properly, rather than publishing
              placeholder legal text and treating it as done.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
              In the meantime: any information you share with us, whether
              through this website, email, or a conversation, is used only
              to respond to your enquiry or deliver an engagement you&apos;ve
              asked for. It isn&apos;t sold, and it isn&apos;t shared with
              third parties beyond what&apos;s needed to do that work.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
              If you have a specific privacy or data-handling question
              before a full policy is published, email us directly at{" "}
              <a
                href="mailto:pharos.security.nz@gmail.com?subject=Privacy%20question"
                className="font-medium text-navy underline underline-offset-2 hover:text-teal"
              >
                pharos.security.nz@gmail.com
              </a>{" "}
              and we&apos;ll answer it plainly.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
