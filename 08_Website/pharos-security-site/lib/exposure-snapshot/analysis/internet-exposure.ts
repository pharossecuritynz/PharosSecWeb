/**
 * Classifies Shodan/Censys-style "previously observed internet services"
 * results. Attribution is treated cautiously throughout — an IP can belong
 * to shared hosting, a CDN, or cloud infrastructure, not the business
 * itself, so findings are worded as "previously observed", never "your
 * server exposes X". See docs/EXPOSURE_SNAPSHOT_ARCHITECTURE.md.
 */

/** RDP and Telnet are disproportionately common ransomware/mass-exploitation
 * entry points and are called out more strongly than other sensitive ports. */
const CRITICAL_PORTS = new Set([3389, 23]);

/** Other commonly-targeted admin/management/database ports, worth a look
 * but not urgent on their own — exposure alone isn't proof of a weakness. */
const SENSITIVE_PORTS = new Set([21, 22, 25, 110, 135, 139, 143, 445, 1433, 1521, 3306, 5432, 5900, 6379, 27017, 9200]);

export type InternetExposureLevel = "none-sensitive" | "sensitive" | "critical";

export interface InternetExposureClassification {
  level: InternetExposureLevel;
  criticalPorts: number[];
  sensitivePorts: number[];
}

export function classifyInternetExposure(ports: number[]): InternetExposureClassification {
  const criticalPorts = ports.filter((p) => CRITICAL_PORTS.has(p));
  const sensitivePorts = ports.filter((p) => SENSITIVE_PORTS.has(p));

  const level: InternetExposureLevel =
    criticalPorts.length > 0 ? "critical" : sensitivePorts.length > 0 ? "sensitive" : "none-sensitive";

  return { level, criticalPorts, sensitivePorts };
}
