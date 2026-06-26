import Link from "next/link";
import Image from "next/image";
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
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#1F1F1F] bg-[#0A0F0A] shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[#A6FF00]/35 hover:shadow-[0_24px_60px_rgba(166,255,0,0.08)]">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-[#A6FF00]/30 bg-[#050505]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A6FF00] backdrop-blur-sm">
          {category.label}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#F5F5F5]/55">
          <time dateTime={post.updatedAt}>{formatGermanDate(post.updatedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeMinutes} Min. Lesezeit</span>
        </div>

        <h2 className="mt-3 text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-[#F5F5F5] transition duration-300 group-hover:text-[#A6FF00] sm:text-[1.25rem]">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="mt-3 flex-1 text-[14px] leading-7 text-[#E6E6E6]/78">{post.description}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex w-fit items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#A6FF00] transition duration-300 hover:gap-3 hover:text-[#C7FF62]"
        >
          Weiterlesen
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
