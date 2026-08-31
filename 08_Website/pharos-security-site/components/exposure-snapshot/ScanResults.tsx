import Link from "next/link";
import StatusBadge, { type BadgeStatus } from "./StatusBadge";
import ConceptInfo from "./ConceptInfo";
import EmailReportButton from "./EmailReportButton";
import type { Finding } from "@/lib/exposure-snapshot/findings/types";
import type { ExecutiveSummary } from "@/lib/exposure-snapshot/findings/executive-summary";
import type { ExposureOverview } from "@/lib/exposure-snapshot/findings/overview";

export interface ScanResultsData {
  businessName: string;
  domain: string;
  scan: { scanCompletedAt: string; findings: Finding[] };
  overview: ExposureOverview;
  executiveSummary: ExecutiveSummary;
}

interface ScanResultsProps {
  data: ScanResultsData;
  recipientEmail?: string;
}

const OVERVIEW_ROWS: { key: keyof ExposureOverview; label: string; description: string }[] = [
  {
    key: "emailProtection",
    label: "Email protection",
    description: "Whether your domain has basic protections (SPF, DMARC, DKIM) against spoofed or faked email.",
  },
  {
    key: "domainSecurity",
    label: "Domain security",
    description: "Whether your domain registration and DNS security are in reasonable shape.",
  },
  {
    key: "internetExposure",
    label: "Internet exposure",
    description: "Forgotten or non-production systems (like an old test site) still reachable from the internet.",
  },
  {
    key: "credentialExposure",
    label: "Credential exposure",
    description: "Whether email addresses linked to your domain have appeared in known data breaches.",
  },
  {
    key: "publicFootprint",
    label: "Public footprint",
    description: "How much about your business is discoverable from public DNS and certificate records.",
  },
];

const OVERVIEW_VALUE_LABEL: Record<string, string> = {
  strong: "Strong",
  "needs-attention": "Needs attention",
  "high-priority": "High priority",
  low: "Low",
  moderate: "Moderate",
  elevated: "Elevated",
  broad: "Broad",
  unknown: "Unknown",
  "none-observed": "None observed",
  observed: "Observed",
  "not-checked": "Not checked",
};

const OVERVIEW_BADGE_STATUS: Record<string, BadgeStatus> = {
  strong: "good",
  "needs-attention": "attention",
  "high-priority": "high-priority",
  low: "good",
  moderate: "attention",
  elevated: "high-priority",
  broad: "attention",
  unknown: "not-checked",
  "none-observed": "good",
  observed: "high-priority",
  "not-checked": "not-checked",
};

function FindingRow({ finding }: { finding: Finding }) {
  return (
    <div className="flex flex-col gap-3 border-t border-charcoal/10 py-5 first:border-t-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <p className="flex items-center gap-2 font-heading text-base font-semibold text-navy">
          {finding.title}
          <ConceptInfo concept={finding.concept} />
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">{finding.observation}</p>
        {finding.status !== "good" && (
          <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
            <span className="font-medium text-navy">What to do: </span>
            {finding.recommendation}
          </p>
        )}
      </div>
      <div className="flex flex-none items-center gap-2 sm:flex-col sm:items-end">
        <StatusBadge status={finding.status} />
      </div>
    </div>
  );
}

export default function ScanResults({ data, recipientEmail }: ScanResultsProps) {
  const { businessName, domain, scan, overview, executiveSummary } = data;
  const checkedDate = new Date(scan.scanCompletedAt).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const sortedFindings = [...scan.findings].sort((a, b) => {
    const weight: Record<Finding["status"], number> = {
      "high-priority": 0,
      attention: 1,
      "not-checked": 2,
      informational: 3,
      good: 4,
    };
    return weight[a.status] - weight[b.status];
  });

  return (
    <div className="space-y-10">
      <div>
        <span className="text-xs font-semibold tracking-wide text-charcoal/50 uppercase">
          Pharos Exposure Snapshot
        </span>
        <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          {businessName}
        </h2>
        <p className="mt-1 text-sm text-charcoal/60">
          {domain} · Checked {checkedDate}
        </p>
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-mist/60 p-7 sm:p-8">
        <h3 className="font-heading text-lg font-semibold text-navy">Your external security snapshot</h3>
        <p className="mt-3 text-base leading-relaxed text-charcoal/75">{executiveSummary.overallPicture}</p>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <span>
            <strong className="text-navy">{executiveSummary.protectionsInPlaceCount}</strong>{" "}
            <span className="text-charcoal/60">protection{executiveSummary.protectionsInPlaceCount === 1 ? "" : "s"} in place</span>
          </span>
          <span>
            <strong className="text-navy">{executiveSummary.thingsToReviewCount}</strong>{" "}
            <span className="text-charcoal/60">thing{executiveSummary.thingsToReviewCount === 1 ? "" : "s"} to review</span>
          </span>
          <span>
            <strong className="text-navy">{executiveSummary.priorityActionCount}</strong>{" "}
            <span className="text-charcoal/60">priority action{executiveSummary.priorityActionCount === 1 ? "" : "s"}</span>
          </span>
        </div>
      </div>

      {executiveSummary.topActions.length > 0 && (
        <div>
          <h3 className="font-heading text-lg font-semibold text-navy">Priority actions</h3>
          <ol className="mt-4 space-y-3">
            {executiveSummary.topActions.map((action, i) => (
              <li key={action.id} className="flex items-start gap-3.5 rounded-xl border border-charcoal/10 p-4">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                    {action.title}
                    <ConceptInfo concept={action.concept} />
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal/65">{action.recommendation}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div>
        <h3 className="font-heading text-lg font-semibold text-navy">External exposure overview</h3>
        <div className="mt-4 divide-y divide-charcoal/10 rounded-2xl border border-charcoal/10">
          {OVERVIEW_ROWS.map(({ key, label, description }) => {
            const value = overview[key];
            return (
              <div key={key} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-charcoal/80">{label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-charcoal/50">{description}</p>
                </div>
                <StatusBadge
                  status={OVERVIEW_BADGE_STATUS[value] ?? "not-checked"}
                  label={OVERVIEW_VALUE_LABEL[value] ?? value}
                />
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-charcoal/45">
          &ldquo;Credential exposure&rdquo; isn&apos;t checked yet in this version of the tool — see the{" "}
          <a href="#credential-exposure-note" className="underline underline-offset-2 hover:text-charcoal/70">
            note below
          </a>
          .
        </p>
      </div>

      <div>
        <h3 className="font-heading text-lg font-semibold text-navy">Findings</h3>
        <div className="mt-4 rounded-2xl border border-charcoal/10 px-5 sm:px-7">
          {sortedFindings.map((finding) => (
            <FindingRow key={finding.id} finding={finding} />
          ))}
        </div>
      </div>

      <div
        id="credential-exposure-note"
        className="rounded-2xl border border-charcoal/10 bg-white p-6 text-sm leading-relaxed text-charcoal/65"
      >
        <p className="font-semibold text-navy">A note on credential exposure</p>
        <p className="mt-2">
          Checking whether email addresses linked to your domain have appeared in known data breaches is
          genuinely useful, but it&apos;s sensitive information, so it&apos;s only shown once a business has
          confirmed it actually controls the domain being checked. That verification step isn&apos;t built into
          this tool yet, which is why credential exposure always shows as &ldquo;not checked&rdquo; for now.
        </p>
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 text-sm leading-relaxed text-charcoal/65">
        <p className="font-semibold text-navy">What this assessment does not cover</p>
        <p className="mt-2">
          This snapshot examines externally observable information only. It is not a penetration test or a
          vulnerability assessment, does not examine internal systems, and cannot prove your business is secure
          or that it hasn&apos;t been compromised.
        </p>
      </div>

      {recipientEmail && (
        <div className="text-center">
          <EmailReportButton email={recipientEmail} data={data} />
        </div>
      )}

      <div className="rounded-2xl bg-navy p-7 text-center sm:p-9">
        <p className="font-heading text-lg font-semibold text-white">Want help interpreting the results?</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/65">
          A short, no-obligation conversation to walk through what matters most for your business.
        </p>
        <Link
          href="/book-a-conversation"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-teal px-7 py-3 text-sm font-semibold text-navy transition-colors hover:bg-cyan"
        >
          Book a 15-minute conversation
        </Link>
      </div>
    </div>
  );
}
