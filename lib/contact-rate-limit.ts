import { isIP } from "node:net";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

function normalizeIp(value: string): string | null {
  let candidate = value.trim();
  if (!candidate || candidate.length > 128) {
    return null;
  }

  if (candidate.startsWith("[") && candidate.includes("]")) {
    candidate = candidate.slice(1, candidate.indexOf("]"));
  } else if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(candidate)) {
    candidate = candidate.slice(0, candidate.lastIndexOf(":"));
  }

  return isIP(candidate) ? candidate : null;
}

/**
 * Hostinger's LiteSpeed proxy appends the connecting client to X-Forwarded-For.
 * The left-most value is caller-controlled, so the limit uses the right-most hop.
 * X-Real-IP is only a fallback when it is a single address, not a forwarded list.
 */
export function getTrustedClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const trustedHop = hops.length > 0 ? hops[hops.length - 1] : "";
    const ip = normalizeIp(trustedHop);
    if (ip) {
      return ip;
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp && !realIp.includes(",")) {
    const ip = normalizeIp(realIp);
    if (ip) {
      return ip;
    }
  }

  return "unknown";
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

const buckets = new Map<string, RateLimitEntry>();

export function checkContactRateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { allowed: true, retryAfterSeconds: 0 };
}
