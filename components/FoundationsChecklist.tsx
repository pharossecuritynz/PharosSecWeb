"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Security foundations self-check. Entirely client-side: answers live in
 * component state only. Nothing is submitted, stored or sent anywhere, and
 * the page says so. It never asks for passwords, system names, IP
 * addresses or any other sensitive detail.
 */

type Answer = "yes" | "unsure" | "no";

interface Item {
  area: string;
  question: string;
  why: string;
  good: string;
}

export const checklistItems: Item[] = [
  {
    area: "Internet exposure",
    question:
      "Do you know which of your systems can be reached from the internet, and has someone confirmed each one needs to be?",
    why: "Automated tools scan the internet constantly. Anything forgotten, such as an old remote access portal or a test website, is often the easiest way in.",
    good: "A current list from your IT provider of everything reachable from outside, with anything unnecessary removed and the rest protected by strong sign-in.",
  },
  {
    area: "Multi-factor authentication",
    question:
      "Is multi-factor authentication required, not just available, for every email and cloud account, including administrators?",
    why: "Passwords are stolen and reused all the time. Enforced MFA stops a stolen password from becoming a stolen account.",
    good: "MFA enforced for everyone, older sign-in methods that bypass it blocked, and any exception written down with a reason.",
  },
  {
    area: "Password management",
    question: "Do staff have a password manager, so nobody needs to reuse passwords?",
    why: "Reused passwords mean a breach at some other website can open your business accounts.",
    good: "A business password manager provided to all staff, with shared logins stored there rather than in spreadsheets or emails.",
  },
  {
    area: "Patching",
    question:
      "Are security updates applied promptly to computers, phones, servers and network equipment, and is everything still supported?",
    why: "Attackers move quickly once a weakness is published. Software that no longer receives updates can't be fixed at all.",
    good: "Updates applied automatically where possible, internet-facing systems prioritised, and a plan to replace anything out of support.",
  },
  {
    area: "Endpoint security",
    question:
      "Is security software installed, up to date and reporting on every computer, including laptops that rarely come into the office?",
    why: "Protection on most devices still leaves the rest open, and coverage gaps are easy to miss.",
    good: "Your IT provider can show a report of every device with protection active and recently checked in, with no unexplained gaps.",
  },
  {
    area: "Administrator access",
    question:
      "Is administrator access limited to the few people who need it, using separate accounts that aren't used for everyday email?",
    why: "Administrator accounts can change anything. If one is compromised through a phishing email, the damage is far greater.",
    good: "A short, known list of admin accounts, separate from day-to-day accounts, each protected by strong MFA.",
  },
  {
    area: "Backups and recovery",
    question:
      "Have you successfully restored from backup in the last six months, and is at least one copy kept where an attacker couldn't reach it?",
    why: "Ransomware often targets backups first. A backup that has never been restored is an assumption, not a recovery plan.",
    good: "Regular test restores with the time taken recorded, and an offline or immutable copy that your everyday admin accounts can't delete.",
  },
  {
    area: "Logging and monitoring",
    question:
      "Would anyone notice, and tell you, if someone signed in to an account from an unusual place or set up a suspicious email forwarding rule?",
    why: "Many incidents go unnoticed for a long time. Logs that nobody reviews or alerts on don't help much when it matters.",
    good: "Key sign-in and email events logged centrally, with alerts going to a named person who knows what to do with them.",
  },
  {
    area: "Incident preparedness",
    question:
      "If you had a cyber incident tomorrow, do you know who you'd call first and who in the business makes the decisions?",
    why: "The first hours of an incident are stressful and expensive. Knowing who does what saves time, money and mistakes.",
    good: "A short plan with names and phone numbers (IT provider, insurer, key staff), stored somewhere other than the systems it covers.",
  },
  {
    area: "Third-party access",
    question:
      "Do you know which outside companies (IT providers, software vendors, contractors) can access your systems, and is old access removed?",
    why: "Other companies' access is a common route in, and it tends to outlive the work it was granted for.",
    good: "A list of who has access and why, reviewed at least yearly, with access removed when a relationship ends.",
  },
];

const OPTIONS: { value: Answer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "unsure", label: "Not sure" },
  { value: "no", label: "No" },
];

export default function FoundationsChecklist() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === checklistItems.length;
  const counts = { yes: 0, unsure: 0, no: 0 };
  Object.values(answers).forEach((answer) => (counts[answer] += 1));
  const followUps = checklistItems.filter((_, index) => answers[index] && answers[index] !== "yes");

  return (
    <div>
      <ol className="space-y-6">
        {checklistItems.map((item, index) => {
          const answer = answers[index];
          const name = `q${index}`;
          return (
            <li
              key={item.area}
              className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-[0_2px_14px_-6px_rgba(7,26,45,0.08)] sm:p-8"
            >
              <fieldset>
                <legend className="w-full">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-teal">
                    {index + 1}. {item.area}
                  </span>
                  <span className="mt-2 block font-heading text-lg font-semibold leading-snug text-navy">
                    {item.question}
                  </span>
                </legend>
                <p className="mt-3 text-base leading-relaxed text-charcoal/70">
                  <span className="font-semibold text-charcoal/80">Why it matters: </span>
                  {item.why}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {OPTIONS.map((option) => {
                    const id = `${name}-${option.value}`;
                    const selected = answer === option.value;
                    return (
                      <label
                        key={option.value}
                        htmlFor={id}
                        className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal has-[:focus-visible]:ring-offset-2 ${
                          selected
                            ? "border-navy bg-navy text-white"
                            : "border-charcoal/20 text-navy hover:border-teal/60"
                        }`}
                      >
                        <input
                          id={id}
                          type="radio"
                          name={name}
                          value={option.value}
                          checked={selected}
                          onChange={() => setAnswers((prev) => ({ ...prev, [index]: option.value }))}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
                {answer && answer !== "yes" && (
                  <p className="mt-5 rounded-xl bg-mist px-5 py-4 text-sm leading-relaxed text-charcoal/80">
                    <span className="font-semibold text-navy">What good looks like: </span>
                    {item.good}
                  </p>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>

      <section
        aria-live="polite"
        className="mt-10 rounded-2xl border border-teal/30 bg-mist p-7 sm:p-9"
      >
        <h2 className="font-heading text-xl font-semibold text-navy">Your summary</h2>
        {answeredCount === 0 ? (
          <p className="mt-3 text-base leading-relaxed text-charcoal/70">
            Answer the questions above and a summary will appear here.
          </p>
        ) : (
          <>
            <p className="mt-3 text-base leading-relaxed text-charcoal/75">
              {answeredCount} of {checklistItems.length} answered: {counts.yes} yes,{" "}
              {counts.unsure} not sure, {counts.no} no.
            </p>
            {followUps.length > 0 ? (
              <>
                <p className="mt-4 text-base leading-relaxed text-charcoal/75">
                  Worth raising with your IT provider. Treat &ldquo;not
                  sure&rdquo; the same as &ldquo;no&rdquo; until someone
                  confirms the answer:
                </p>
                <ul className="mt-3 space-y-2">
                  {followUps.map((item) => (
                    <li key={item.area} className="flex gap-3 text-base text-charcoal/80">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-teal" />
                      {item.area}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              allAnswered && (
                <p className="mt-4 text-base leading-relaxed text-charcoal/75">
                  A good set of answers. The next useful question is how
                  you know: which of these has someone actually checked
                  recently, rather than assumed?
                </p>
              )
            )}
          </>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center rounded-full border border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal/60 print:hidden"
          >
            Print or save as PDF
          </button>
          <Link
            href="/book-a-conversation"
            className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-midnight print:hidden"
          >
            Talk through your answers
          </Link>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-charcoal/60">
          This is a self-check to help you decide where to look first. It
          isn&apos;t an independent security assessment or a certification,
          and a set of &ldquo;yes&rdquo; answers doesn&apos;t mean a business
          is secure. Your answers stay in this browser tab and disappear
          when you close it.
        </p>
      </section>
    </div>
  );
}
