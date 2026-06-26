import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blog/types";
import { formatGermanDate } from "@/lib/blog/utils";

type BlogPopularArticlesProps = {
  posts: BlogPostSummary[];
};

export default function BlogPopularArticles({ posts }: BlogPopularArticlesProps) {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="popular-articles-heading">
      <h2
        id="popular-articles-heading"
        className="text-[15px] font-bold uppercase tracking-[0.16em] text-[#A6FF00]"
      >
        Beliebte Artikel
      </h2>
      <ol className="mt-4 grid gap-3">
        {posts.map((post, index) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex gap-3 rounded-2xl border border-[#1F1F1F] bg-[#050806]/60 p-3 transition duration-300 hover:border-[#A6FF00]/25"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A6FF00]/12 text-[12px] font-bold text-[#A6FF00]">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="line-clamp-2 text-[14px] font-semibold leading-snug text-[#F5F5F5] transition duration-300 group-hover:text-[#A6FF00]">
                  {post.title}
                </p>
                <p className="mt-1 text-[12px] text-[#F5F5F5]/48">
                  {formatGermanDate(post.updatedAt)} · {post.readingTimeMinutes} Min.
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
