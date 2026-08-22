"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon } from "./icons";

const inputClass =
  "mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal transition-colors focus:border-teal focus:outline-none";
const labelClass = "text-sm font-semibold text-navy";

const starterQuestions = [
  "We had a close call (a suspicious email, a strange login) and want to check we're actually okay.",
  "We're getting a new IT provider, or leaving one, and want an independent baseline first.",
  "We've been quoted for security software and aren't sure we actually need it.",
  "A board member or manager has raised concern and we need a straight answer.",
  "We're a small team. Do we really need to worry about this yet?",
  "We're growing quickly and our security hasn't kept up.",
  "Nothing's gone wrong. We just want reassurance before it does.",
];

export default function ConversationIntakeForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [question, setQuestion] = useState("");
  const [showStarters, setShowStarters] = useState(false);
  const [addedStarters, setAddedStarters] = useState<Set<string>>(new Set());

  const addStarter = (starter: string) => {
    setQuestion((prev) => (prev.trim() ? `${prev}\n${starter}` : starter));
    setAddedStarters((prev) => new Set(prev).add(starter));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      if (!response.ok) throw new Error("Form submission failed");

      router.push("/book-a-conversation/thanks");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form name="conversation-intake" onSubmit={handleSubmit} className="space-y-6">
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
        <input id="company" name="company" type="text" required className={inputClass} />
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
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className={inputClass}
        />

        <button
          type="button"
          onClick={() => setShowStarters((prev) => !prev)}
          className="mt-2 text-sm font-medium text-navy underline underline-offset-2 transition-colors hover:text-teal"
        >
          {showStarters ? "Hide example questions" : "Not sure what to ask? See example questions"}
        </button>

        {showStarters && (
          <div className="mt-3 space-y-2">
            {starterQuestions.map((starter) => {
              const added = addedStarters.has(starter);
              return (
                <button
                  key={starter}
                  type="button"
                  onClick={() => !added && addStarter(starter)}
                  disabled={added}
                  className="flex w-full items-start gap-2.5 rounded-xl border border-charcoal/10 p-3.5 text-left text-sm leading-relaxed text-charcoal/80 transition-colors hover:border-teal/40 hover:bg-mist disabled:cursor-default disabled:border-teal/30 disabled:bg-mist/60 disabled:text-charcoal/50 disabled:hover:bg-mist/60"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border border-charcoal/25"
                  >
                    {added && <CheckIcon className="h-2.5 w-2.5 text-teal" />}
                  </span>
                  {starter}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Your email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm leading-relaxed text-charcoal/70">
          That didn&apos;t go through. Please try again, or email{" "}
          <a
            href="mailto:pharos.security.nz@gmail.com?subject=Cyber%20security%20enquiry"
            className="font-medium text-navy underline underline-offset-2 hover:text-teal"
          >
            pharos.security.nz@gmail.com
          </a>{" "}
          directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-cyan disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send and we'll be in touch"}
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
  );
}
