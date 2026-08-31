"use client";

import { useState } from "react";
import ScanForm, { type ScanFormValues } from "./ScanForm";
import ScanProgress from "./ScanProgress";
import ScanResults, { type ScanResultsData } from "./ScanResults";

type ToolState = "form" | "scanning" | "results" | "error";

export default function ExposureSnapshotTool() {
  const [state, setState] = useState<ToolState>("form");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [results, setResults] = useState<ScanResultsData | null>(null);
  const [workEmail, setWorkEmail] = useState<string>("");

  const handleSubmit = async (values: ScanFormValues) => {
    setState("scanning");
    setErrorMessage(undefined);

    try {
      const response = await fetch("/api/exposure-snapshot/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const body = await response.json();

      if (!response.ok) {
        setErrorMessage(body.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setResults(body as ScanResultsData);
      setWorkEmail(values.workEmail);
      setState("results");
    } catch {
      setErrorMessage("That didn't go through. Please check your connection and try again.");
      setState("error");
    }
  };

  const handleTryAgain = () => {
    setState("form");
    setResults(null);
    setErrorMessage(undefined);
  };

  if (state === "scanning") {
    return <ScanProgress />;
  }

  if (state === "results" && results) {
    return (
      <div>
        <ScanResults data={results} recipientEmail={workEmail} />
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={handleTryAgain}
            className="text-sm font-medium text-navy underline underline-offset-2 transition-colors hover:text-teal"
          >
            Check another domain
          </button>
        </div>
      </div>
    );
  }

  return <ScanForm onSubmit={handleSubmit} submitting={false} errorMessage={errorMessage} />;
}
