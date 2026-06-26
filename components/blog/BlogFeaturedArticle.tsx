import Link from "next/link";
import Image from "next/image";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import type { BlogPostSummary } from "@/lib/blog/types";
import { formatGermanDate } from "@/lib/blog/utils";

type BlogFeaturedArticleProps = {
  post: BlogPostSummary;
};

export default function BlogFeaturedArticle({ post }: BlogFeaturedArticleProps) {
  const category = BLOG_CATEGORIES[post.category];

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-[#1F1F1F] bg-[#0A0F0A] shadow-[0_24px_70px_rgba(0,0,0,0.38)]">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <Link
          href={`/blog/${post.slug}`}
          className="relative block min-h-[260px] overflow-hidden sm:min-h-[320px] lg:min-h-[420px]"
        >
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/20 via-transparent to-[#050505]/60 lg:bg-gradient-to-t lg:from-[#050505]/70 lg:via-[#050505]/20 lg:to-transparent" />
        </Link>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="mb-3 inline-flex w-fit rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
            Featured · {category.label}
          </p>

          <h2 className="text-balance text-[1.65rem] font-black leading-[1.05] tracking-[-0.04em] text-[#F5F5F5] sm:text-[2rem] lg:text-[2.35rem]">
            <Link href={`/blog/${post.slug}`} className="transition duration-300 hover:text-[#A6FF00]">
              {post.title}
            </Link>
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-[#E6E6E6]/82 sm:text-[16px]">{post.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#F5F5F5]/58">
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
