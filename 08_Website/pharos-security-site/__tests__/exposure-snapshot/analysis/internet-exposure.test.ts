import { describe, expect, it } from "vitest";
import { classifyInternetExposure } from "@/lib/exposure-snapshot/analysis/internet-exposure";

describe("classifyInternetExposure", () => {
  it("classifies routine web ports as none-sensitive", () => {
    const result = classifyInternetExposure([80, 443]);
    expect(result.level).toBe("none-sensitive");
    expect(result.criticalPorts).toEqual([]);
    expect(result.sensitivePorts).toEqual([]);
  });

  it("classifies an empty port list as none-sensitive", () => {
    expect(classifyInternetExposure([]).level).toBe("none-sensitive");
  });

  it("classifies SSH/database/admin ports as sensitive, not critical", () => {
    const result = classifyInternetExposure([80, 443, 22, 3306]);
    expect(result.level).toBe("sensitive");
    expect(result.sensitivePorts).toEqual(expect.arrayContaining([22, 3306]));
    expect(result.criticalPorts).toEqual([]);
  });

  it("classifies RDP (3389) as critical", () => {
    const result = classifyInternetExposure([443, 3389]);
    expect(result.level).toBe("critical");
    expect(result.criticalPorts).toEqual([3389]);
  });

  it("classifies Telnet (23) as critical", () => {
    expect(classifyInternetExposure([23]).level).toBe("critical");
  });

  it("critical takes precedence even when sensitive ports are also present", () => {
    const result = classifyInternetExposure([22, 3389, 3306]);
    expect(result.level).toBe("critical");
    expect(result.criticalPorts).toEqual([3389]);
    expect(result.sensitivePorts).toEqual(expect.arrayContaining([22, 3306]));
  });
});
