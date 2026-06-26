import type { BlogCategory } from "@/lib/blog/types";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

export const BLOG_SAFE_IMAGES = {
  sport: "/images/iptv-kaufen-hero-football.webp",
  streaming: "/images/iptv-kaufen-premium-streaming.webp",
  premium: "/images/iptv-kaufen-premium-streaming-deutschland.webp",
  senderliste: "/images/iptv-kaufen-senderliste-hero.webp",
} as const;

const SAFE_IMAGE_PATHS = new Set<string>(Object.values(BLOG_SAFE_IMAGES));

export function isSafeBlogImage(path?: string): path is string {
  return Boolean(path && SAFE_IMAGE_PATHS.has(path));
}

type CoverInput = {
  image?: string;
  category: BlogCategory;
  featured?: boolean;
};

export type BlogCover =
  | { type: "image"; src: string }
  | { type: "placeholder"; variant: BlogCategory };

export function resolveBlogCover({
  image,
  category,
  featured = false,
}: CoverInput): BlogCover {
  if (isSafeBlogImage(image)) {
    return { type: "image", src: image };
  }

  if (category === "sport") {
    return { type: "image", src: BLOG_SAFE_IMAGES.sport };
  }

  if (category === "streaming") {
    return { type: "image", src: BLOG_SAFE_IMAGES.streaming };
  }

  if (featured) {
    return { type: "image", src: BLOG_SAFE_IMAGES.premium };
  }

  return { type: "placeholder", variant: category };
}

export function resolveBlogOgImage(input: CoverInput): string {
  const cover = resolveBlogCover(input);

  if (cover.type === "image") {
    return cover.src.startsWith("http") ? cover.src : `${SITE_URL}${cover.src}`;
  }

  return DEFAULT_OG_IMAGE;
}
