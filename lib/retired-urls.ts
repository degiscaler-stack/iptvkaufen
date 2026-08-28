export const RETIRED_BLOG_SLUGS = [
  "iptv-alle-sender",
  "iptv-line-kaufen",
  "iptv-abo",
  "iptv-free-trial",
  "iptv-sport",
  "iptv-tuerkische-sender",
  "iptv-balkan",
  "iptv-greek",
  "polish-iptv",
  "iptv-arab",
  "iptv-nordic",
] as const;

export const RETIRED_STATIC_PATHS = ["/senderliste", "/reseller", "/preise"] as const;

const RETIRED_BLOG_PATHS = RETIRED_BLOG_SLUGS.map((slug) => `/blog/${slug}`);

const RETIRED_EXACT = new Set<string>([...RETIRED_STATIC_PATHS, ...RETIRED_BLOG_PATHS]);

export function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function isRetiredPath(pathname: string): boolean {
  const normalized = normalizePathname(pathname);

  if (RETIRED_EXACT.has(normalized)) {
    return true;
  }

  return (
    normalized.startsWith("/senderliste/") ||
    normalized.startsWith("/reseller/") ||
    normalized.startsWith("/preise/")
  );
}
