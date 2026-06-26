import type { MetadataRoute } from "next";
import { getAllPostSummaries, getAllTags, getTotalPages } from "@/lib/blog/posts";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import { tagToSlug } from "@/lib/blog/utils";

export const dynamic = "force-static";

const SITE_URL = "https://iptvkaufenx.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostSummaries();
  const totalPages = getTotalPages();
  const tags = getAllTags();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog/suche`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const paginationPages: MetadataRoute.Sitemap = Array.from(
    { length: totalPages - 1 },
    (_, index) => ({
      url: `${SITE_URL}/blog/seite/${index + 2}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }),
  );

  const categoryPages: MetadataRoute.Sitemap = Object.keys(BLOG_CATEGORIES).map(
    (slug) => ({
      url: `${SITE_URL}/blog/kategorie/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${SITE_URL}/blog/tag/${tagToSlug(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...blogPosts, ...paginationPages, ...categoryPages, ...tagPages];
}
