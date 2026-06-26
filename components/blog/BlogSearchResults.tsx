"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPostSummary } from "@/lib/blog/types";

type BlogSearchResultsProps = {
  posts: BlogPostSummary[];
};

export default function BlogSearchResults({ posts }: BlogSearchResultsProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return posts.filter((post) => {
      const haystack = [post.title, post.description, post.category, ...post.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [posts, query]);

  if (!query.trim()) {
    return (
      <p className="rounded-2xl border border-[#1F1F1F] bg-[#0A0F0A] p-6 text-[15px] text-[#E6E6E6]/78">
        Geben Sie einen Suchbegriff ein, um Artikel zu finden.
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <p className="rounded-2xl border border-[#1F1F1F] bg-[#0A0F0A] p-6 text-[15px] text-[#E6E6E6]/78">
        Keine Ergebnisse für &ldquo;{query}&rdquo;. Versuchen Sie andere Begriffe wie
        &ldquo;Smart TV&rdquo;, &ldquo;Fire TV&rdquo; oder &ldquo;Bundesliga&rdquo;.
      </p>
    );
  }

  return (
    <section aria-label="Suchergebnisse">
      <p className="mb-5 text-[14px] text-[#F5F5F5]/58">
        {results.length} {results.length === 1 ? "Ergebnis" : "Ergebnisse"} für &ldquo;{query}
        &rdquo;
      </p>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {results.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
