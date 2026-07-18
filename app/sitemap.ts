import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";

export const dynamic = "force-static";

const SITE_URL = "https://iptvkaufenx.de";

/** Indexable static routes intentionally included in the sitemap. */
const STATIC_SITEMAP_URLS = [
  `${SITE_URL}/`,
  `${SITE_URL}/senderliste`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/ueber-uns`,
  `${SITE_URL}/autor`,
  `${SITE_URL}/redaktionelle-richtlinien`,
  `${SITE_URL}/inhaltsrichtlinien`,
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const publishedArticleUrls = getAllPosts()
    .filter((post) => post.status === "published")
    .map((post) => `${SITE_URL}/blog/${post.slug}`);

  const urls = Array.from(new Set<string>([...STATIC_SITEMAP_URLS, ...publishedArticleUrls]));

  return urls.map((url) => {
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
