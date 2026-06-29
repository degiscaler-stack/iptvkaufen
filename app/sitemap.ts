import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://iptvkaufenx.de";

const ALLOWED_SITEMAP_URLS = [
  `${SITE_URL}/`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/blog/german-iptv`,
  `${SITE_URL}/blog/iptv-anbieter`,
  `${SITE_URL}/blog/iptv-box`,
  `${SITE_URL}/blog/iptv-free-trial`,
  `${SITE_URL}/blog/iptv-abo`,
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ALLOWED_SITEMAP_URLS.map((url) => ({
    url,
    lastModified,
    changeFrequency:
      url === `${SITE_URL}/` ? ("weekly" as const) : url === `${SITE_URL}/blog` ? ("daily" as const) : ("weekly" as const),
    priority: url === `${SITE_URL}/` ? 1 : url === `${SITE_URL}/blog` ? 0.9 : 0.8,
  }));
}
