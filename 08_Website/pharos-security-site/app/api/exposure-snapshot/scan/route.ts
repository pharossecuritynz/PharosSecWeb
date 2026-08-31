import { NextRequest, NextResponse } from "next/server";
import { runExposureSnapshotScan } from "@/lib/exposure-snapshot/scan";
import { checkRateLimit } from "@/lib/exposure-snapshot/security/rate-limit";

/**
 * POST /api/exposure-snapshot/scan
 *
 * Runs a Level 1 (public) Exposure Snapshot scan and returns the result
 * directly — no persistence yet (see docs/EXPOSURE_SNAPSHOT_ROADMAP.md).
 * The result exists only for this request/response; there is no
 * shareable report link, no history, and no email delivery yet.
 *
 * Rate limiting here is a documented, honest stopgap — see
 * lib/exposure-snapshot/security/rate-limit.ts for its real limitations
 * in a multi-instance serverless environment.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 200;

interface ScanRequestBody {
  businessName?: string;
  domain?: string;
  workEmail?: string;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  let body: ScanRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const businessName = (body.businessName ?? "").trim();
  const domain = (body.domain ?? "").trim();
  const workEmail = (body.workEmail ?? "").trim();

  if (!businessName || businessName.length > MAX_FIELD_LENGTH) {
    return NextResponse.json({ error: "Please provide a business name." }, { status: 400 });
  }
  if (!domain || domain.length > MAX_FIELD_LENGTH) {
    return NextResponse.json({ error: "Please provide a domain to check." }, { status: 400 });
  }
  if (!workEmail || workEmail.length > MAX_FIELD_LENGTH || !EMAIL_PATTERN.test(workEmail)) {
    return NextResponse.json({ error: "Please provide a valid work email address." }, { status: 400 });
  }

  const result = await runExposureSnapshotScan(domain);

  if (result.status === "invalid-domain") {
    return NextResponse.json(
      { error: "That doesn't look like a domain we can check.", reason: result.domainError },
      { status: 400 }
    );
  }

  // businessName and workEmail are not yet persisted anywhere — no database
  // exists in this pass (see docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md, "No
  // database in this pass"). businessName is echoed back for the report
  // header only; workEmail is validated but not stored, logged, or emailed.
  return NextResponse.json({
    businessName,
    domain: result.scan!.domain,
    scan: result.scan,
    overview: result.overview,
    executiveSummary: result.executiveSummary,
  });
}
