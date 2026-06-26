import Link from "next/link";
import BlogCoverImage from "@/components/blog/BlogCoverImage";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import type { BlogPostSummary } from "@/lib/blog/types";
import { formatGermanDate } from "@/lib/blog/utils";

type BlogFeaturedArticleProps = {
  post: BlogPostSummary;
};

export default function BlogFeaturedArticle({ post }: BlogFeaturedArticleProps) {
  const category = BLOG_CATEGORIES[post.category];

  return (
    <article className="group overflow-hidden rounded-[28px] border border-[#1F1F1F] bg-[linear-gradient(135deg,#0A0F0A_0%,#060806_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.36)]">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <Link
          href={`/blog/${post.slug}`}
          className="relative block aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px]"
        >
          <BlogCoverImage
            image={post.image}
            category={post.category}
            alt={post.imageAlt}
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
            className="transition duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#050505]/55" />
        </Link>

        <div className="flex flex-col justify-center border-t border-[#1F1F1F]/80 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <p className="mb-3 inline-flex w-fit rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
            Featured · {category.label}
          </p>
          {post.status === "planned" ? (
            <p className="mb-3 inline-flex w-fit rounded-full border border-[#F5F5F5]/12 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F5F5]/58">
              Geplant
            </p>
          ) : null}

          <h2 className="text-balance text-[1.55rem] font-black leading-[1.06] tracking-[-0.04em] text-[#F5F5F5] sm:text-[1.9rem] lg:text-[2.15rem]">
            <Link href={`/blog/${post.slug}`} className="transition duration-300 hover:text-[#A6FF00]">
              {post.title}
            </Link>
          </h2>

          <p className="mt-4 line-clamp-4 text-[15px] leading-7 text-[#E6E6E6]/80 sm:text-[16px]">
            {post.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#F5F5F5]/55">
            <span>{post.author.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.updatedAt}>{formatGermanDate(post.updatedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} Min.</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="mt-7 inline-flex w-fit rounded-full bg-[#A6FF00] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[#050505] transition duration-300 hover:bg-[#C7FF62]"
          >
            Artikel lesen
          </Link>
        </div>
      </div>
    </article>
  );
}
