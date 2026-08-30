/**
 * The shared contract every Exposure Snapshot provider implements.
 * See docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md ("Provider contract").
 *
 * A provider that fails, times out, or has no credentials returns
 * status "unavailable" or "not-configured" with findings: null. It never
 * throws past this boundary, and it never causes the whole scan to fail.
 */

export type ProviderStatus = "ok" | "unavailable" | "error" | "not-configured";

export interface ProviderResult<T> {
  provider: string;
  status: ProviderStatus;
  checkedAt: string;
  findings: T | null;
  evidence: string;
  confidence: "high" | "medium" | "low";
  errors: string[];
}

export function providerOk<T>(
  provider: string,
  findings: T,
  evidence: string,
  confidence: ProviderResult<T>["confidence"] = "high"
): ProviderResult<T> {
  return {
    provider,
    status: "ok",
    checkedAt: new Date().toISOString(),
    findings,
    evidence,
    confidence,
    errors: [],
  };
}

export function providerUnavailable<T>(
  provider: string,
  reason: string
): ProviderResult<T> {
  return {
    provider,
    status: "unavailable",
    checkedAt: new Date().toISOString(),
    findings: null,
    evidence: "",
    confidence: "low",
    errors: [reason],
  };
}

export function providerNotConfigured<T>(provider: string): ProviderResult<T> {
  return {
    provider,
    status: "not-configured",
    checkedAt: new Date().toISOString(),
    findings: null,
    evidence: "",
    confidence: "low",
    errors: ["No credentials configured for this provider."],
  };
}

export function providerError<T>(provider: string, error: unknown): ProviderResult<T> {
  const message = error instanceof Error ? error.message : String(error);
  return {
    provider,
    status: "error",
    checkedAt: new Date().toISOString(),
    findings: null,
    evidence: "",
    confidence: "low",
    errors: [message],
  };
}
