import Link from "next/link";
import BlogCoverImage from "@/components/blog/BlogCoverImage";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import type { BlogPostSummary } from "@/lib/blog/types";
import { formatGermanDate } from "@/lib/blog/utils";

type BlogArticleCardProps = {
  post: BlogPostSummary;
  priority?: boolean;
};

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 shrink-0 text-[#6B7280]"
    >
      <path
        d="M6 2v2M14 2v2M3.5 7h13M5 4h10a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 15 17H5a1.5 1.5 0 0 1-1.5-1.5v-10A1.5 1.5 0 0 1 5 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BlogArticleCard({ post, priority = true }: BlogArticleCardProps) {
  const category = BLOG_CATEGORIES[post.category];

  return (
    <article className="group overflow-hidden rounded-[20px] bg-[#FAFAFA] shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_60px_rgba(0,0,0,0.34)]">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#050505]"
      >
        <BlogCoverImage
          image={post.image}
          category={post.category}
          alt={post.imageAlt}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 560px"
        />
      </Link>

      <div className="p-6 sm:p-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B7280]">
          {category.label}
        </p>

        <h2 className="mt-3 text-[1.35rem] font-bold leading-snug tracking-[-0.02em] text-[#111111] transition duration-300 group-hover:text-[#1F2937] sm:text-[1.45rem]">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <div className="mt-3 flex items-center gap-2 text-[13px] text-[#6B7280]">
          <CalendarIcon />
          <time dateTime={post.updatedAt}>{formatGermanDate(post.updatedAt)}</time>
        </div>

        <p className="mt-4 text-[15px] leading-7 text-[#374151]">{post.description}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#111111] transition duration-300 hover:gap-3"
        >
          Artikel lesen
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
