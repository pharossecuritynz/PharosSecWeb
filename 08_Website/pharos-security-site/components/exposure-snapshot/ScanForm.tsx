"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal transition-colors focus:border-teal focus:outline-none";
const labelClass = "text-sm font-semibold text-navy";

export interface ScanFormValues {
  businessName: string;
  domain: string;
  workEmail: string;
}

interface ScanFormProps {
  onSubmit: (values: ScanFormValues) => void;
  submitting: boolean;
  errorMessage?: string;
}

export default function ScanForm({ onSubmit, submitting, errorMessage }: ScanFormProps) {
  const [businessName, setBusinessName] = useState("");
  const [domain, setDomain] = useState("");
  const [workEmail, setWorkEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ businessName: businessName.trim(), domain: domain.trim(), workEmail: workEmail.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="businessName" className={labelClass}>
          Business name
        </label>
        <input
          id="businessName"
          name="businessName"
          type="text"
          required
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className={inputClass}
          placeholder="Acme Plumbing Ltd"
        />
      </div>

      <div>
        <label htmlFor="domain" className={labelClass}>
          Website or email domain
        </label>
        <input
          id="domain"
          name="domain"
          type="text"
          required
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className={inputClass}
          placeholder="acmeplumbing.co.nz"
        />
      </div>

      <div>
        <label htmlFor="workEmail" className={labelClass}>
          Work email
        </label>
        <input
          id="workEmail"
          name="workEmail"
          type="email"
          required
          value={workEmail}
          onChange={(e) => setWorkEmail(e.target.value)}
          className={inputClass}
          placeholder="you@acmeplumbing.co.nz"
        />
      </div>

      {errorMessage && <p className="text-sm leading-relaxed text-charcoal/70">{errorMessage}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-cyan disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Checking..." : "Check my exposure"}
      </button>

      <p className="text-sm leading-relaxed text-charcoal/55">
        We don&apos;t vulnerability-scan or attempt to access your systems during this check — only publicly
        available information is used.
      </p>
    </form>
  );
}
