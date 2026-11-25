/**
 * Best-effort client IP for rate-limiting keys.
 *
 * The leftmost X-Forwarded-For value is supplied by the client and can be
 * set to anything, so keying a rate limit on it lets a requester bypass the
 * limit by sending a fresh fake value with each request. Prefer, in order:
 *
 * 1. x-nf-client-connection-ip: set by Netlify's edge from the actual TCP
 *    connection, not forwardable by the client.
 * 2. The rightmost X-Forwarded-For entry: appended by the nearest proxy,
 *    so it reflects whoever actually connected to that proxy.
 * 3. x-real-ip, then a shared "unknown" bucket.
 */
export function getClientIp(headers: Headers): string {
  const netlifyIp = headers.get("x-nf-client-connection-ip");
  if (netlifyIp && netlifyIp.trim()) return netlifyIp.trim();

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const parts = forwardedFor
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }

  const realIp = headers.get("x-real-ip");
  if (realIp && realIp.trim()) return realIp.trim();

  return "unknown";
}
