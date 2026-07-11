import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://iptvkaufenx.de";

const ALLOWED_SITEMAP_URLS = [
  `${SITE_URL}/`,
  `${SITE_URL}/senderliste`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/ueber-uns`,
  `${SITE_URL}/autor`,
  `${SITE_URL}/redaktionelle-richtlinien`,
  `${SITE_URL}/inhaltsrichtlinien`,
  `${SITE_URL}/blog/german-iptv`,
  `${SITE_URL}/blog/iptv-anbieter`,
  `${SITE_URL}/blog/iptv-box`,
  `${SITE_URL}/blog/iptv-free-trial`,
  `${SITE_URL}/blog/iptv-abo`,
  `${SITE_URL}/blog/iptv-receiver`,
  `${SITE_URL}/blog/iptv-provider`,
  `${SITE_URL}/blog/iptv-premium-4k`,
  `${SITE_URL}/blog/iptv-alle-sender`,
  `${SITE_URL}/blog/iptv-smarters-pro`,
  `${SITE_URL}/blog/tivimate-iptv`,
  `${SITE_URL}/blog/iptv-m3u`,
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ALLOWED_SITEMAP_URLS.map((url) => {
    const isHome = url === `${SITE_URL}/`;
    const isHub =
      url === `${SITE_URL}/blog` ||
      url === `${SITE_URL}/senderliste` ||
      url === `${SITE_URL}/ueber-uns`;

    return {
      url,
      lastModified,
      changeFrequency: isHome || isHub ? ("daily" as const) : ("weekly" as const),
      priority: isHome ? 1 : isHub ? 0.9 : url.includes("/blog/") ? 0.8 : 0.7,
    };
  });
}
