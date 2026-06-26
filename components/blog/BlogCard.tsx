import Link from "next/link";
import BlogCoverImage from "@/components/blog/BlogCoverImage";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import type { BlogPostSummary } from "@/lib/blog/types";
import { formatGermanDate } from "@/lib/blog/utils";

type BlogCardProps = {
  post: BlogPostSummary;
  priority?: boolean;
};

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  const category = BLOG_CATEGORIES[post.category];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#1F1F1F]/90 bg-[linear-gradient(180deg,#0B0F0B_0%,#070907_100%)] shadow-[0_16px_44px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:border-[#A6FF00]/30 hover:shadow-[0_22px_56px_rgba(166,255,0,0.07)]">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] shrink-0 overflow-hidden border-b border-[#1F1F1F]/80"
      >
        <BlogCoverImage
          image={post.image}
          category={post.category}
          alt={post.imageAlt}
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/75 via-[#050505]/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-[#A6FF00]/28 bg-[#050505]/82 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A6FF00] backdrop-blur-sm">
          {category.label}
        </span>
        {post.status === "planned" ? (
          <span className="absolute right-4 top-4 rounded-full border border-[#F5F5F5]/12 bg-[#050505]/78 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#F5F5F5]/62 backdrop-blur-sm">
            Geplant
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#F5F5F5]/52">
          <time dateTime={post.updatedAt}>{formatGermanDate(post.updatedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeMinutes} Min. Lesezeit</span>
        </div>

        <h2 className="mt-3 line-clamp-2 text-[1.12rem] font-bold leading-snug tracking-[-0.02em] text-[#F5F5F5] transition duration-300 group-hover:text-[#A6FF00] sm:text-[1.2rem]">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-7 text-[#E6E6E6]/76">
          {post.description}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex w-fit items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#A6FF00] transition duration-300 hover:gap-3 hover:text-[#C7FF62]"
        >
          Weiterlesen
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
