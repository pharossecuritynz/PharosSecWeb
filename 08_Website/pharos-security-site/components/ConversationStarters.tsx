"use client";

import { useRef } from "react";

const starters = [
  {
    question: "We had a close call (a suspicious email, a strange login) and want to check we're actually okay.",
    body: "Hi, we recently had a close call (a suspicious email / an odd login) and want to check whether we're actually okay, not just lucky. Could we talk it through?",
  },
  {
    question: "We're getting a new IT provider, or leaving one, and want an independent baseline first.",
    body: "Hi, we're in the middle of changing IT providers and would like an independent baseline of our security before or after the switch. Could we talk it through?",
  },
  {
    question: "We've been quoted for security software and aren't sure we actually need it.",
    body: "Hi, we've been quoted for some security software and aren't sure whether we actually need it. Could we talk it through?",
  },
  {
    question: "A board member or manager has raised concern and we need a straight answer.",
    body: "Hi, someone on our leadership team has raised concerns about our security and we'd like a straight, independent answer. Could we talk it through?",
  },
  {
    question: "We're a small team. Do we really need to worry about this yet?",
    body: "Hi, we're a small team and honestly aren't sure whether we need to worry about this yet. Could we talk it through?",
  },
  {
    question: "We're growing quickly and our security hasn't kept up.",
    body: "Hi, we're growing quickly and I don't think our security practices have kept pace. Could we talk it through?",
  },
  {
    question: "Nothing's gone wrong. We just want reassurance before it does.",
    body: "Hi, nothing's gone wrong for us so far, we'd just like some independent reassurance before it does. Could we talk it through?",
  },
];

export default function ConversationStarters() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = () => dialogRef.current?.close();

  const startWith = (body: string) => {
    window.location.assign(
      `mailto:pharos.security.nz@gmail.com?subject=Cyber%20security%20enquiry&body=${encodeURIComponent(
        body
      )}`
    );
    close();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="text-sm font-medium text-white/60 underline underline-offset-2 transition-colors hover:text-white"
      >
        Not sure what to ask? See example questions
      </button>

      <dialog
        ref={dialogRef}
        onClick={(event) => {
          const rect = dialogRef.current?.getBoundingClientRect();
          if (!rect) return;
          const inDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
          if (!inDialog) close();
        }}
        className="w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-charcoal/10 bg-white p-0 text-charcoal backdrop:bg-navy/60"
      >
        <div className="max-h-[85vh] overflow-y-auto p-7 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-xl font-bold text-navy">
              Questions people start with
            </h3>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-charcoal/50 transition-colors hover:bg-mist hover:text-navy"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
            Pick one and it opens in your email, ready to send. Or write
            your own, this is just here if you&apos;re not sure where to
            start.
          </p>
          <ul className="mt-6 space-y-2.5">
            {starters.map((starter) => (
              <li key={starter.question}>
                <button
                  type="button"
                  onClick={() => startWith(starter.body)}
                  className="w-full rounded-xl border border-charcoal/10 p-4 text-left text-sm leading-relaxed text-charcoal/80 transition-colors hover:border-teal/40 hover:bg-mist"
                >
                  {starter.question}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
