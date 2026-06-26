import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blog/types";
import BlogCard from "./BlogCard";

type BlogRelatedPostsProps = {
  posts: BlogPostSummary[];
};

export default function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="related-posts-heading" className="mt-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2
          id="related-posts-heading"
          className="text-[1.35rem] font-bold tracking-[-0.02em] text-[#F5F5F5] sm:text-[1.55rem]"
        >
          Ähnliche Artikel
        </h2>
        <Link
          href="/blog"
          className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#A6FF00] transition duration-300 hover:text-[#C7FF62]"
        >
          Alle Artikel
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
