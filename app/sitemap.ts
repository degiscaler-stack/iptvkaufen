import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import type { BlogPost } from "@/lib/blog/types";

export const dynamic = "force-static";

const SITE_URL = "https://iptvkaufenx.de";

/** Indexable static routes intentionally included in the sitemap. */
const STATIC_SITEMAP_URLS = [
  `${SITE_URL}/`,
  `${SITE_URL}/senderliste`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/reseller`,
  `${SITE_URL}/kontakt`,
  `${SITE_URL}/ueber-uns`,
  `${SITE_URL}/autor`,
  `${SITE_URL}/redaktionelle-richtlinien`,
  `${SITE_URL}/inhaltsrichtlinien`,
] as const;

function parseContentDate(value: string | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}

/** Prefer a valid updatedAt; otherwise fall back to publishedAt. Never use build time. */
function getPostLastModified(post: BlogPost): Date | undefined {
  return parseContentDate(post.updatedAt) ?? parseContentDate(post.publishedAt);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = getAllPosts().filter((post) => post.status === "published");

  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_URLS.map((url) => {
    const isHome = url === `${SITE_URL}/`;
    const isHub =
      url === `${SITE_URL}/blog` ||
      url === `${SITE_URL}/senderliste` ||
      url === `${SITE_URL}/ueber-uns`;

    return {
      url,
      // No trustworthy content dates exist for these static marketing/info pages.
      changeFrequency: isHome || isHub ? ("daily" as const) : ("weekly" as const),
      priority: isHome ? 1 : isHub ? 0.9 : 0.7,
    };
  });

  const articleEntries: MetadataRoute.Sitemap = publishedPosts.map((post) => {
    const lastModified = getPostLastModified(post);

    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  for (const entry of [...staticEntries, ...articleEntries]) {
    if (seen.has(entry.url)) {
      continue;
    }

    seen.add(entry.url);
    entries.push(entry);
  }

  return entries;
}
