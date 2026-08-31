"use client";

import { useEffect, useState } from "react";
import { ScanIcon } from "@/components/icons";

const STEPS = [
  "Checking email protections",
  "Reviewing domain configuration",
  "Reviewing public certificate records",
  "Checking external intelligence sources",
  "Preparing your snapshot",
];

const STEP_INTERVAL_MS = 1400;

export default function ScanProgress() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, STEP_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-navy">
        <ScanIcon className="h-6 w-6 animate-pulse" />
      </span>
      <div className="space-y-2.5">
        {STEPS.map((step, i) => (
          <p
            key={step}
            className={`text-sm transition-colors ${
              i < stepIndex
                ? "text-charcoal/40"
                : i === stepIndex
                  ? "font-semibold text-navy"
                  : "text-charcoal/25"
            }`}
          >
            {step}
          </p>
        ))}
      </div>
    </div>
  );
}
