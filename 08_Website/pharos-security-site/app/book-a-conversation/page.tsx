import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Book a Conversation | Pharos Security",
  description:
    "A few quick questions to help prepare for your free 15-minute conversation with Pharos Security.",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal transition-colors focus:border-teal focus:outline-none";
const labelClass = "text-sm font-semibold text-navy";

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
            <form
              name="conversation-intake"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              action="/book-a-conversation/thanks"
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="conversation-intake" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this in if you&apos;re human:
                  <input name="bot-field" />
                </label>
              </p>

              <div>
                <label htmlFor="company" className={labelClass}>
                  Company name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="size" className={labelClass}>
                  Company size
                </label>
                <select id="size" name="size" required className={inputClass}>
                  <option value="">Select one</option>
                  <option value="1-4">1 to 4 staff</option>
                  <option value="5-15">5 to 15 staff</option>
                  <option value="16-30">16 to 30 staff</option>
                  <option value="31-50">31 to 50 staff</option>
                  <option value="50+">50+ staff</option>
                </select>
              </div>

              <div>
                <label htmlFor="it-support" className={labelClass}>
                  How is IT support handled?
                </label>
                <select id="it-support" name="it-support" required className={inputClass}>
                  <option value="">Select one</option>
                  <option value="outsourced">Outsourced provider / MSP</option>
                  <option value="internal">Internal person or team</option>
                  <option value="hybrid">A mix of both</option>
                  <option value="none">Nobody dedicated right now</option>
                </select>
              </div>

              <div>
                <label htmlFor="systems" className={labelClass}>
                  Main systems
                </label>
                <select id="systems" name="systems" required className={inputClass}>
                  <option value="">Select one</option>
                  <option value="microsoft-365">Microsoft 365</option>
                  <option value="google-workspace">Google Workspace</option>
                  <option value="other">Something else</option>
                  <option value="not-sure">Not sure</option>
                </select>
              </div>

              <fieldset>
                <legend className={labelClass}>Does any of this apply right now?</legend>
                <div className="mt-3 space-y-2.5">
                  {[
                    { value: "insurance", label: "A cyber insurance renewal" },
                    { value: "questionnaire", label: "A customer security questionnaire" },
                    { value: "privacy", label: "A privacy or compliance obligation" },
                    { value: "none", label: "None of these, or not sure" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 text-sm text-charcoal/80"
                    >
                      <input
                        type="checkbox"
                        name="triggers"
                        value={option.value}
                        className="h-4 w-4 rounded border-charcoal/30 text-teal focus:ring-teal"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="question" className={labelClass}>
                  What do you most want to know from this conversation?
                </label>
                <textarea
                  id="question"
                  name="question"
                  rows={4}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-cyan sm:w-auto"
              >
                Send and we&apos;ll be in touch
              </button>

              <p className="text-sm leading-relaxed text-charcoal/55">
                Prefer email instead? Write to{" "}
                <a
                  href="mailto:pharos.security.nz@gmail.com?subject=Cyber%20security%20enquiry"
                  className="font-medium text-navy underline underline-offset-2 hover:text-teal"
                >
                  pharos.security.nz@gmail.com
                </a>{" "}
                directly.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
