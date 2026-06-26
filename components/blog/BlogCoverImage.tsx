import Image from "next/image";
import type { BlogCategory } from "@/lib/blog/types";
import { resolveBlogCover } from "@/lib/blog/images";

type BlogCoverImageProps = {
  image?: string;
  category: BlogCategory;
  alt: string;
  featured?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export default function BlogCoverImage({
  image,
  category,
  alt,
  featured = false,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className = "",
}: BlogCoverImageProps) {
  const cover = resolveBlogCover({ image, category, featured });

  if (cover.type === "image") {
    return (
      <Image
        src={cover.src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover absolute inset-0 ${className}`}
        priority={priority}
        loading={priority ? undefined : "lazy"}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`blog-cover-placeholder blog-cover-variant-${cover.variant} absolute inset-0 ${className}`}
    />
  );
}
