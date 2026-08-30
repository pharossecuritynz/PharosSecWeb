import { describe, expect, it } from "vitest";
import { _testables } from "@/lib/exposure-snapshot/providers/whois";

const { parseReferralServer, extractField, extractNameservers, extractStatuses } = _testables;

describe("parseReferralServer", () => {
  it("parses the 'refer:' field format (most gTLDs)", () => {
    const response = "domain: COM\nrefer: whois.verisign-grs.com\nsource: IANA";
    expect(parseReferralServer(response)).toBe("whois.verisign-grs.com");
  });

  it("parses the 'whois:' field format used by .nz and other ccTLDs — regression test for a real bug caught during manual verification", () => {
    const response = [
      "domain:       NZ",
      "organisation: InternetNZ",
      "nserver:      NS1.DNS.NET.NZ",
      "whois:        whois.irs.net.nz",
      "status:       ACTIVE",
      "source:       IANA",
    ].join("\n");
    expect(parseReferralServer(response)).toBe("whois.irs.net.nz");
  });

  it("prefers 'refer:' over 'whois:' when both are present", () => {
    const response = "refer: whois.example-refer.com\nwhois: whois.example-whois.com";
    expect(parseReferralServer(response)).toBe("whois.example-refer.com");
  });

  it("returns null when neither field is present", () => {
    expect(parseReferralServer("domain: XYZ\nsource: IANA")).toBeNull();
  });
});

describe("extractField", () => {
  it("finds the first matching label, tolerant of label casing", () => {
    const raw = "Registrar: Example Registrar Inc.\nCreation Date: 2020-01-01T00:00:00Z";
    expect(extractField(raw, ["Registrar"])).toBe("Example Registrar Inc.");
    expect(extractField(raw, ["Creation Date", "created"])).toBe("2020-01-01T00:00:00Z");
  });

  it("returns null when no candidate label matches — never fabricates a value", () => {
    const raw = "Registrar: Example Registrar Inc.";
    expect(extractField(raw, ["Registry Expiry Date", "Expiry Date"])).toBeNull();
  });
});

describe("extractNameservers", () => {
  it("extracts and dedupes both 'Name Server' and 'nserver' label formats", () => {
    const raw = "Name Server: NS1.EXAMPLE.COM\nName Server: ns1.example.com\nnserver: ns2.example.com";
    expect(extractNameservers(raw)).toEqual(["ns1.example.com", "ns2.example.com"]);
  });
});

describe("extractStatuses", () => {
  it("extracts both 'Domain Status' and 'status' label formats", () => {
    const raw = "Domain Status: clientTransferProhibited\nstatus: ok";
    expect(extractStatuses(raw)).toEqual(["clientTransferProhibited", "ok"]);
  });
});
