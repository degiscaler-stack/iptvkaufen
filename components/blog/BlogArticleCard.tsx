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
      className="h-3.5 w-3.5 shrink-0 text-[#F5F5F5]/45"
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

export default function BlogArticleCard({ post, priority = false }: BlogArticleCardProps) {
  const category = BLOG_CATEGORIES[post.category];

  return (
    <article className="group h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[#1F1F1F] bg-[linear-gradient(180deg,#0B0F0B_0%,#070907_100%)] shadow-[0_16px_40px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:border-[#A6FF00]/28 hover:shadow-[0_22px_52px_rgba(166,255,0,0.08)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-[#1F1F1F]/80">
          <BlogCoverImage
            image={post.image}
            category={post.category}
            alt={post.imageAlt}
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/55 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-[#A6FF00]/28 bg-[#050505]/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#A6FF00] backdrop-blur-sm sm:left-3.5 sm:top-3.5 sm:px-3 sm:py-1.5 sm:text-[10px]">
            {category.label}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h2 className="line-clamp-3 text-[0.95rem] font-bold leading-snug tracking-[-0.02em] text-[#F5F5F5] transition duration-300 group-hover:text-[#A6FF00] sm:text-[1.05rem]">
            {post.title}
          </h2>

          <div className="mt-3 flex items-center gap-2 text-[12px] text-[#F5F5F5]/52">
            <CalendarIcon />
            <time dateTime={post.updatedAt}>{formatGermanDate(post.updatedAt)}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
