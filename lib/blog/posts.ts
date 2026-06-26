import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { BlogCategory, BlogPost, BlogPostSummary } from "./types";
import { BLOG_CLUSTER_ORDER, POSTS_PER_PAGE } from "./types";

const CONTENT_DIR = join(process.cwd(), "content", "blog");

function toSummary(post: BlogPost): BlogPostSummary {
  const {
    slug,
    title,
    description,
    keyword,
    category,
    tags,
    author,
    publishedAt,
    updatedAt,
    readingTimeMinutes,
    image,
    imageAlt,
    featured,
    popular,
    status,
  } = post;
  return {
    slug,
    title,
    description,
    keyword,
    category,
    tags,
    author,
    publishedAt,
    updatedAt,
    readingTimeMinutes,
    image,
    imageAlt,
    featured,
    popular,
    status,
  };
}

let cachedPosts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts;

  const files = readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".json"));
  const posts = files.map((file) => {
    const raw = readFileSync(join(CONTENT_DIR, file), "utf8");
    return JSON.parse(raw) as BlogPost;
  });

  cachedPosts = posts.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return cachedPosts;
}

export function getAllPostSummaries(): BlogPostSummary[] {
  return getAllPosts().map(toSummary);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getFeaturedPost(): BlogPostSummary | undefined {
  return getAllPostSummaries().find((post) => post.featured);
}

export function getPopularPosts(limit = 5): BlogPostSummary[] {
  return getAllPostSummaries()
    .filter((post) => post.popular)
    .slice(0, limit);
}

export function getLatestPosts(limit?: number): BlogPostSummary[] {
  const posts = getAllPostSummaries();
  return limit ? posts.slice(0, limit) : posts;
}

export function getPostsByCategory(category: BlogCategory): BlogPostSummary[] {
  return getAllPostSummaries().filter((post) => post.category === category);
}

export function getPostsByCluster(category: BlogCategory): BlogPostSummary[] {
  return getPostsByCategory(category);
}

export function getPostsGroupedByCluster(): {
  category: BlogCategory;
  posts: BlogPostSummary[];
}[] {
  return BLOG_CLUSTER_ORDER.map((category) => ({
    category,
    posts: getPostsByCategory(category).filter((post) => !post.featured),
  })).filter((group) => group.posts.length > 0);
}

export function getPostsByTag(tag: string): BlogPostSummary[] {
  const normalized = tag.toLowerCase();
  return getAllPostSummaries().filter((post) =>
    post.tags.some((item) => item.toLowerCase() === normalized),
  );
}

export function searchPosts(query: string): BlogPostSummary[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return getAllPostSummaries().filter((post) => {
    const haystack = [
      post.title,
      post.description,
      post.keyword,
      post.category,
      ...post.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export function getRelatedPosts(slugs: string[]): BlogPostSummary[] {
  const summaries = getAllPostSummaries();
  return slugs
    .map((slug) => summaries.find((post) => post.slug === slug))
    .filter((post): post is BlogPostSummary => Boolean(post));
}

export function getAdjacentPosts(slug: string): {
  previous: BlogPostSummary | null;
  next: BlogPostSummary | null;
} {
  const posts = getAllPostSummaries();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getTotalPages(): number {
  return Math.ceil(getAllPostSummaries().length / POSTS_PER_PAGE);
}

export function getPaginatedPosts(page: number): {
  posts: BlogPostSummary[];
  totalPages: number;
  currentPage: number;
} {
  const allPosts = getAllPostSummaries();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;

  return {
    posts: allPosts.slice(start, start + POSTS_PER_PAGE),
    totalPages,
    currentPage,
  };
}

export function getAllCategories(): BlogCategory[] {
  const categories = new Set(getAllPosts().map((post) => post.category));
  return BLOG_CLUSTER_ORDER.filter((category) => categories.has(category));
}

export function getAllTags(): string[] {
  const tags = new Set(getAllPosts().flatMap((post) => post.tags));
  return Array.from(tags).sort((a, b) => a.localeCompare(b, "de"));
}
