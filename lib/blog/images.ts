import type { BlogCategory } from "@/lib/blog/types";

const SITE_URL = "https://iptvkaufenx.de";
const BLOG_OG_IMAGE = `${SITE_URL}/brand/iptv-kaufen-logo.webp`;
const BLOG_IMAGE_PREFIX = "/images/blog/";

type CoverInput = {
  image?: string | null;
  category: BlogCategory;
};

export type BlogCover =
  | { type: "image"; src: string }
  | { type: "placeholder"; variant: BlogCategory };

export function hasCustomBlogImage(image?: string | null): image is string {
  return Boolean(image && image.startsWith(BLOG_IMAGE_PREFIX));
}

export function resolveBlogCover({ image, category }: CoverInput): BlogCover {
  if (hasCustomBlogImage(image)) {
    return { type: "image", src: image };
  }

  return { type: "placeholder", variant: category };
}

export function resolveBlogOgImage(input: CoverInput): string {
  const cover = resolveBlogCover(input);

  if (cover.type === "image") {
    return cover.src.startsWith("http") ? cover.src : `${SITE_URL}${cover.src}`;
  }

  return BLOG_OG_IMAGE;
}
