import BlogCard from "@/components/blog/BlogCard";
import { BLOG_CATEGORIES, type BlogCategory } from "@/lib/blog/types";
import type { BlogPostSummary } from "@/lib/blog/types";

type BlogClusterSectionProps = {
  category: BlogCategory;
  posts: BlogPostSummary[];
};

export default function BlogClusterSection({ category, posts }: BlogClusterSectionProps) {
  if (!posts.length) return null;

  const cluster = BLOG_CATEGORIES[category];

  return (
    <section aria-labelledby={`cluster-${category}`} className="scroll-mt-32">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id={`cluster-${category}`}
            className="text-[1.25rem] font-bold tracking-[-0.02em] text-[#F5F5F5] sm:text-[1.4rem]"
          >
            {cluster.label}
          </h2>
          <p className="mt-1 max-w-[640px] text-[14px] leading-6 text-[#E6E6E6]/68">
            {cluster.description}
          </p>
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5F5F5]/42">
          {posts.length} {posts.length === 1 ? "Artikel" : "Artikel"}
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
