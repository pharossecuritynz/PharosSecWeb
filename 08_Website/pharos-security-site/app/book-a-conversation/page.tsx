import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConversationIntakeForm from "@/components/ConversationIntakeForm";

export const metadata: Metadata = {
  title: "Book a Conversation | Pharos Security",
  description:
    "A few quick questions to help prepare for your free 15-minute conversation with Pharos Security.",
};

export default function BookAConversationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-grain relative overflow-hidden bg-navy pt-20 pb-16 md:pt-28 md:pb-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-teal/15 blur-[130px]"
          />
          <div className="container-px relative z-10 mx-auto max-w-3xl">
            <h1 className="font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl">
              Book a 15-minute conversation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              A few quick questions so the conversation itself can get
              straight to what matters, instead of covering the basics. No
              obligation, and approximate answers are completely fine.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container-px mx-auto max-w-2xl">
            <ConversationIntakeForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
