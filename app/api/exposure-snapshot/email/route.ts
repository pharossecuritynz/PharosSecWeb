import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/exposure-snapshot/security/rate-limit";
import { getClientIp } from "@/lib/exposure-snapshot/security/client-ip";
import { buildReportEmailHtml } from "@/lib/exposure-snapshot/report/email-template";
import { verifyReportToken } from "@/lib/exposure-snapshot/report/report-token";

/**
 * POST /api/exposure-snapshot/email
 *
 * Emails an already-computed scan result. The request carries only the
 * signed report token issued by the scan route; the recipient and the
 * content both come from inside that token, never from the browser. This
 * closes an abuse path where anyone could send arbitrary text, branded as
 * a Pharos report, to any address. See report-token.ts.
 *
 * No database: nothing is stored, this is a one-off send. Requires
 * RESEND_API_KEY. Degrades to a clear error, never a silent failure, if
 * it's not configured.
 */

/**
 * The domain pharos.security.nz is not yet registered (see
 * 09-project-management/decisions-required.md question 5), and Resend
 * requires a verified sending domain; it can't send "from" a domain you
 * don't control, and can't send "from" a Gmail address at all. Falls back
 * to Resend's own unverified testing address (only deliverable to the
 * Resend account's own verified email while unconfigured) until a real
 * domain is registered and verified. Set RESEND_FROM_ADDRESS once it is.
 */
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS || "Pharos Security <onboarding@resend.dev>";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email delivery isn't available right now." },
      { status: 503 }
    );
  }

  const clientIp = getClientIp(request.headers);
  const rateLimit = checkRateLimit(`email:${clientIp}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  let body: { token?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const verified = verifyReportToken(body?.token);
  if (!verified.ok) {
    if (verified.reason === "expired") {
      return NextResponse.json(
        { error: "This report has expired. Please run the snapshot again to email it." },
        { status: 410 }
      );
    }
    if (verified.reason === "not-configured") {
      return NextResponse.json({ error: "Email delivery isn't available right now." }, { status: 503 });
    }
    return NextResponse.json({ error: "This report can't be emailed. Please run the snapshot again." }, { status: 400 });
  }

  const report = verified.payload;
  const html = buildReportEmailHtml({
    businessName: report.businessName,
    domain: report.domain,
    scanCompletedAt: report.scan.scanCompletedAt,
    findings: report.scan.findings,
    overview: report.overview,
    executiveSummary: report.executiveSummary,
  });
  const email = report.email;
  const domain = report.domain;

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
