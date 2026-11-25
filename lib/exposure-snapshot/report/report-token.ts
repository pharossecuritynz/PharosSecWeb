import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { Finding } from "@/lib/exposure-snapshot/findings/types";
import type { ExecutiveSummary } from "@/lib/exposure-snapshot/findings/executive-summary";
import type { ExposureOverview } from "@/lib/exposure-snapshot/findings/overview";

/**
 * Signed report tokens for "email me this report".
 *
 * Why this exists: the email route used to accept the recipient address and
 * the full findings content straight from the browser. Anyone could POST
 * arbitrary text, dressed as a Pharos Exposure Snapshot, to any email
 * address, sent from Pharos's own sending domain. That is a ready-made
 * phishing and spam relay carrying the Pharos brand.
 *
 * Now the scan route signs the real scan result together with the work
 * email entered on the form, and the email route only sends what carries a
 * valid, unexpired signature. The browser can no longer change the
 * recipient or the content.
 *
 * Key: REPORT_SIGNING_SECRET if set (preferred). Otherwise a key derived
 * from RESEND_API_KEY, so the feature keeps working without new config;
 * the derived key never leaves the server and is not the API key itself.
 * With neither set, no token is issued and emailing is unavailable, which
 * matches the existing 503 behaviour when Resend isn't configured.
 */

export const REPORT_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export interface ReportTokenPayload {
  v: 1;
  email: string;
  businessName: string;
  domain: string;
  scan: { scanCompletedAt: string; findings: Finding[] };
  overview: ExposureOverview;
  executiveSummary: ExecutiveSummary;
  issuedAt: number;
}

function getSigningKey(): Buffer | null {
  const explicit = process.env.REPORT_SIGNING_SECRET;
  if (explicit) return Buffer.from(explicit, "utf8");
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    return createHash("sha256").update(`pharos-report-token-v1:${resendKey}`).digest();
  }
  return null;
}

function sign(data: string, key: Buffer): string {
  return createHmac("sha256", key).update(data).digest("base64url");
}

export function createReportToken(
  payload: Omit<ReportTokenPayload, "v" | "issuedAt">,
  now: number = Date.now()
): string | null {
  const key = getSigningKey();
  if (!key) return null;
  const full: ReportTokenPayload = { v: 1, ...payload, issuedAt: now };
  const data = Buffer.from(JSON.stringify(full), "utf8").toString("base64url");
  return `${data}.${sign(data, key)}`;
}

export type VerifyResult =
  | { ok: true; payload: ReportTokenPayload }
  | { ok: false; reason: "not-configured" | "malformed" | "bad-signature" | "expired" };

export function verifyReportToken(token: unknown, now: number = Date.now()): VerifyResult {
  const key = getSigningKey();
  if (!key) return { ok: false, reason: "not-configured" };
  if (typeof token !== "string" || token.length > 500_000) return { ok: false, reason: "malformed" };

  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return { ok: false, reason: "malformed" };
  const [data, signature] = parts;

  const expected = Buffer.from(sign(data, key), "utf8");
  const received = Buffer.from(signature, "utf8");
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return { ok: false, reason: "bad-signature" };
  }

  let payload: ReportTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }
  if (payload?.v !== 1 || typeof payload.issuedAt !== "number") {
    return { ok: false, reason: "malformed" };
  }
  if (now - payload.issuedAt > REPORT_TOKEN_TTL_MS || payload.issuedAt > now + 60_000) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true, payload };
}
