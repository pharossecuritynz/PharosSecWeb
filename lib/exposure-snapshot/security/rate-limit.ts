/**
 * In-memory, per-IP fixed-window rate limiter for the scan API route.
 *
 * IMPORTANT LIMITATION, documented rather than hidden: this only protects
 * within a single warm serverless function instance. Netlify may run
 * multiple instances concurrently, each with its own memory, so this does
 * NOT provide a hard global limit in production — a determined requester
 * spread across instances could exceed it. It's a real, working stopgap
 * against casual/accidental abuse, not the final answer. Proper per-IP/
 * per-domain limiting needs shared state (the Postgres or KV store noted
 * in EXPOSURE_SNAPSHOT_ROADMAP.md's Milestone 4 entry) — not added yet
 * because no persistence layer exists in this pass. Revisit before this
 * tool is genuinely public and under real load.
 */

interface WindowState {
  count: number;
  windowStartedAt: number;
}

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const state = new Map<string, WindowState>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
}

export function checkRateLimit(key: string, now: number = Date.now()): RateLimitResult {
  const existing = state.get(key);

  if (!existing || now - existing.windowStartedAt >= WINDOW_MS) {
    state.set(key, { count: 1, windowStartedAt: now });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((existing.windowStartedAt + WINDOW_MS - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  existing.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - existing.count };
}

/** Exposed for tests. */
export function _resetRateLimitStateForTests(): void {
  state.clear();
}
