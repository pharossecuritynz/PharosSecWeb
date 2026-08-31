"use client";

import { useState } from "react";
import type { ScanResultsData } from "./ScanResults";

interface EmailReportButtonProps {
  email: string;
  data: ScanResultsData;
}

type SendState = "idle" | "sending" | "sent" | "error";

export default function EmailReportButton({ email, data }: EmailReportButtonProps) {
  const [state, setState] = useState<SendState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const handleSend = async () => {
    setState("sending");
    setErrorMessage(undefined);

    try {
      const response = await fetch("/api/exposure-snapshot/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          businessName: data.businessName,
          domain: data.domain,
          scan: data.scan,
          overview: data.overview,
          executiveSummary: data.executiveSummary,
        }),
      });

      const body = await response.json();

      if (!response.ok) {
        setErrorMessage(body.error ?? "That didn't go through. Please try again.");
        setState("error");
        return;
      }

      setState("sent");
    } catch {
      setErrorMessage("That didn't go through. Please check your connection and try again.");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <p className="text-sm font-medium text-navy">Sent to {email} — check your inbox shortly.</p>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleSend}
        disabled={state === "sending"}
        className="inline-flex items-center justify-center rounded-full border border-charcoal/15 px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal/40 hover:bg-mist disabled:opacity-60"
      >
        {state === "sending" ? "Sending..." : `Email this report to ${email}`}
      </button>
      {state === "error" && <p className="mt-2 text-sm text-charcoal/60">{errorMessage}</p>}
    </div>
  );
}
