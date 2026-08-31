import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/exposure-snapshot/security/rate-limit";
import { buildReportEmailHtml } from "@/lib/exposure-snapshot/report/email-template";
import type { Finding } from "@/lib/exposure-snapshot/findings/types";
import type { ExecutiveSummary } from "@/lib/exposure-snapshot/findings/executive-summary";
import type { ExposureOverview } from "@/lib/exposure-snapshot/findings/overview";

/**
 * POST /api/exposure-snapshot/email
 *
 * Emails an already-computed scan result — the client already has the full
 * result from the scan endpoint, so this never re-runs a scan or calls any
 * external provider, just formats and sends what it's given. No database:
 * nothing is stored, this is a one-off send. See
 * lib/exposure-snapshot/report/email-template.ts for why the full findings
 * are emailed directly rather than a report link (no persistence exists
 * yet to link to, and Level 1 findings never contain personal data).
 *
 * Requires RESEND_API_KEY. Degrades to a clear error, never a silent
 * failure, if it's not configured.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 200;

/**
 * The domain pharos.security.nz is not yet registered (see
 * 09-project-management/decisions-required.md question 5), and Resend
 * requires a verified sending domain — it can't send "from" a domain you
 * don't control, and can't send "from" a Gmail address at all. Falls back
 * to Resend's own unverified testing address (only deliverable to the
 * Resend account's own verified email while unconfigured) until a real
 * domain is registered and verified. Set RESEND_FROM_ADDRESS once it is.
 */
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS || "Pharos Security <onboarding@resend.dev>";

interface EmailRequestBody {
  email?: string;
  businessName?: string;
  domain?: string;
  scan?: { scanCompletedAt?: string; findings?: Finding[] };
  overview?: ExposureOverview;
  executiveSummary?: ExecutiveSummary;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email delivery isn't configured yet. Set RESEND_API_KEY to enable it." },
      { status: 503 }
    );
  }

  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`email:${clientIp}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  let body: EmailRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const businessName = (body.businessName ?? "").trim();
  const domain = (body.domain ?? "").trim();

  if (!email || email.length > MAX_FIELD_LENGTH || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!businessName || businessName.length > MAX_FIELD_LENGTH) {
    return NextResponse.json({ error: "Missing business name." }, { status: 400 });
  }
  if (!domain || domain.length > MAX_FIELD_LENGTH) {
    return NextResponse.json({ error: "Missing domain." }, { status: 400 });
  }
  if (!body.scan || !Array.isArray(body.scan.findings) || !body.overview || !body.executiveSummary) {
    return NextResponse.json({ error: "Missing or malformed scan result." }, { status: 400 });
  }

  const html = buildReportEmailHtml({
    businessName,
    domain,
    scanCompletedAt: body.scan.scanCompletedAt ?? new Date().toISOString(),
    findings: body.scan.findings,
    overview: body.overview,
    executiveSummary: body.executiveSummary,
  });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: `Your Pharos Exposure Snapshot for ${domain}`,
      html,
    });

    if (error) {
      return NextResponse.json({ error: "The email could not be sent. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ sent: true });
  } catch {
    return NextResponse.json({ error: "The email could not be sent. Please try again." }, { status: 502 });
  }
}
