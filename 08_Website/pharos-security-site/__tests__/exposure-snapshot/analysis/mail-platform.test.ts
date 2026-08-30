import { describe, expect, it } from "vitest";
import { detectMailPlatform } from "@/lib/exposure-snapshot/analysis/mail-platform";

describe("detectMailPlatform", () => {
  it("detects Microsoft 365 from its documented MX pattern", () => {
    const result = detectMailPlatform(["example-co-nz.mail.protection.outlook.com"]);
    expect(result.provider).toBe("microsoft-365");
    expect(result.confidence).toBe("high");
  });

  it("detects Google Workspace from its documented MX pattern", () => {
    const result = detectMailPlatform(["aspmx.l.google.com"]);
    expect(result.provider).toBe("google-workspace");
  });

  it("detects Mimecast ahead of an underlying provider (gateway takes priority)", () => {
    const result = detectMailPlatform(["mx1.mimecast.com"]);
    expect(result.provider).toBe("mimecast");
  });

  it("detects Fastmail and Zoho", () => {
    expect(detectMailPlatform(["in1-smtp.messagingengine.com"]).provider).toBe("fastmail");
    expect(detectMailPlatform(["mx.zoho.com"]).provider).toBe("zoho");
  });

  it("reports unknown, low confidence, for an unrecognised MX pattern — never guesses", () => {
    const result = detectMailPlatform(["mail.some-custom-provider.example"]);
    expect(result.provider).toBe("unknown");
    expect(result.confidence).toBe("low");
  });

  it("reports unknown, low confidence, when there are no MX records at all", () => {
    const result = detectMailPlatform([]);
    expect(result.provider).toBe("unknown");
    expect(result.confidence).toBe("low");
  });

  it("never claims absolute certainty — every result includes evidence", () => {
    const result = detectMailPlatform(["aspmx.l.google.com"]);
    expect(result.evidence.length).toBeGreaterThan(0);
  });
});
