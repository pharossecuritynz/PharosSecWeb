import type { Finding } from "../findings/types";
import type { ExecutiveSummary } from "../findings/executive-summary";
import type { ExposureOverview } from "../findings/overview";

/**
 * Deterministic HTML email template for "email me this report". Inline
 * styles throughout, since email clients don't reliably support external
 * stylesheets or a custom web font — falls back to a plain sans-serif
 * stack rather than Libre Franklin. Mirrors the on-screen report's
 * structure and language (evidence/interpretation/action, no fake-
 * precision scores), not a redesign for email.
 *
 * No persisted report link exists yet (no database — see
 * docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md), so this sends the findings
 * directly rather than a link. That's consistent with the current privacy
 * model: Level 1 findings never include personal or credential data, so
 * there's nothing here more sensitive than what's already shown on screen.
 */

const COLORS = {
  navy: "#071a2d",
  mist: "#eef5f6",
  teal: "#2fa7a0",
  charcoal: "#17212b",
  amber: "#b8763a",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const STATUS_LABEL: Record<Finding["status"], string> = {
  good: "Good",
  attention: "Needs attention",
  "high-priority": "High priority",
  informational: "Informational",
  "not-checked": "Not checked",
};

const STATUS_COLOR: Record<Finding["status"], string> = {
  good: COLORS.teal,
  attention: "#8a94a6",
  "high-priority": COLORS.amber,
  informational: "#8a94a6",
  "not-checked": "#b7bec9",
};

function findingRow(finding: Finding): string {
  const color = STATUS_COLOR[finding.status];
  return `
    <tr>
      <td style="padding:14px 0;border-top:1px solid #e5e9ee;">
        <div style="font-size:15px;font-weight:600;color:${COLORS.navy};">${escapeHtml(finding.title)}</div>
        <div style="font-size:13px;line-height:1.5;color:#4a5568;margin-top:4px;">${escapeHtml(finding.observation)}</div>
        <div style="display:inline-block;margin-top:8px;padding:3px 10px;border-radius:999px;border:1px solid ${color};font-size:11px;font-weight:600;color:${COLORS.charcoal};">${STATUS_LABEL[finding.status]}</div>
      </td>
    </tr>`;
}

export interface EmailTemplateInput {
  businessName: string;
  domain: string;
  scanCompletedAt: string;
  findings: Finding[];
  overview: ExposureOverview;
  executiveSummary: ExecutiveSummary;
}

export function buildReportEmailHtml(input: EmailTemplateInput): string {
  const checkedDate = new Date(input.scanCompletedAt).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const sortedFindings = [...input.findings].sort((a, b) => {
    const weight: Record<Finding["status"], number> = {
      "high-priority": 0,
      attention: 1,
      "not-checked": 2,
      informational: 3,
      good: 4,
    };
    return weight[a.status] - weight[b.status];
  });

  const topActionsHtml = input.executiveSummary.topActions
    .map(
      (action, i) => `
      <tr>
        <td style="padding:10px 0;vertical-align:top;width:28px;">
          <div style="width:22px;height:22px;border-radius:999px;background:${COLORS.navy};color:#fff;font-size:11px;font-weight:600;text-align:center;line-height:22px;">${i + 1}</div>
        </td>
        <td style="padding:10px 0 10px 10px;">
          <div style="font-size:14px;font-weight:600;color:${COLORS.navy};">${escapeHtml(action.title)}</div>
          <div style="font-size:13px;line-height:1.5;color:#4a5568;margin-top:2px;">${escapeHtml(action.recommendation)}</div>
        </td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f7;font-family:Arial, Helvetica, sans-serif;color:${COLORS.charcoal};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e9ee;">
          <tr>
            <td style="background:${COLORS.navy};padding:28px 28px 24px;">
              <div style="font-size:12px;font-weight:600;letter-spacing:0.04em;color:${COLORS.teal};text-transform:uppercase;">Pharos Exposure Snapshot</div>
              <div style="font-size:22px;font-weight:700;color:#ffffff;margin-top:6px;">${escapeHtml(input.businessName)}</div>
              <div style="font-size:13px;color:rgba(255,255,255,0.65);margin-top:4px;">${escapeHtml(input.domain)} &middot; Checked ${checkedDate}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 8px;">
              <div style="font-size:15px;font-weight:600;color:${COLORS.navy};">Your external security snapshot</div>
              <div style="font-size:14px;line-height:1.6;color:#3d4a5c;margin-top:8px;">${escapeHtml(input.executiveSummary.overallPicture)}</div>
              <div style="font-size:13px;color:#5b6879;margin-top:14px;">
                <strong style="color:${COLORS.navy};">${input.executiveSummary.protectionsInPlaceCount}</strong> protection(s) in place &nbsp;&middot;&nbsp;
                <strong style="color:${COLORS.navy};">${input.executiveSummary.thingsToReviewCount}</strong> thing(s) to review &nbsp;&middot;&nbsp;
                <strong style="color:${COLORS.navy};">${input.executiveSummary.priorityActionCount}</strong> priority action(s)
              </div>
            </td>
          </tr>
          ${
            topActionsHtml
              ? `<tr><td style="padding:16px 28px 8px;">
                  <div style="font-size:15px;font-weight:600;color:${COLORS.navy};margin-bottom:4px;">Priority actions</div>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${topActionsHtml}</table>
                </td></tr>`
              : ""
          }
          <tr>
            <td style="padding:16px 28px 8px;">
              <div style="font-size:15px;font-weight:600;color:${COLORS.navy};margin-bottom:4px;">Findings</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${sortedFindings.map(findingRow).join("")}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 8px;">
              <div style="background:${COLORS.mist};border-radius:12px;padding:16px 18px;font-size:12px;line-height:1.6;color:#4a5568;">
                <strong style="color:${COLORS.navy};">What this assessment does not cover.</strong>
                This snapshot examines externally observable information only. It is not a penetration test or a
                vulnerability assessment, does not examine internal systems, and cannot prove your business is secure
                or that it hasn't been compromised.
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 32px;text-align:center;">
              <a href="https://pharos.security.nz/book-a-conversation" style="display:inline-block;background:${COLORS.teal};color:${COLORS.navy};font-size:14px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:999px;">Book a 15-minute conversation</a>
              <div style="font-size:12px;color:#8a94a6;margin-top:14px;">Pharos Security &middot; pharos.security.nz@gmail.com</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
