/**
 * Site-wide constants used for metadata, canonical URLs, the sitemap and
 * structured data.
 *
 * The production domain is not registered yet (decisions-required.md
 * question 5). Set NEXT_PUBLIC_SITE_URL once it is; until then this falls
 * back to the working placeholder already used across the repository.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://pharossecurity.co.nz").replace(
  /\/+$/,
  ""
);

export const SITE_NAME = "Pharos Security";
export const CONTACT_EMAIL = "pharos.security.nz@gmail.com";

/** Serialise JSON-LD safely for an inline script tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
