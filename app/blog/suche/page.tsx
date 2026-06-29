import type { Metadata } from "next";
import { Suspense } from "react";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogCTA from "@/components/blog/BlogCTA";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import BlogPopularArticles from "@/components/blog/BlogPopularArticles";
import BlogSearchBox from "@/components/blog/BlogSearchBox";
import BlogSearchResults from "@/components/blog/BlogSearchResults";
import { getAllPostSummaries, getPopularPosts } from "@/lib/blog/posts";
import { buildPageMetadata } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.blogSuche,
  description: "Durchsuchen Sie den iptvkaufenX Blog nach IPTV Guides, Tipps und Anleitungen.",
  path: "/blog/suche",
  noIndex: true,
});

export default function BlogSearchPage() {
  const popular = getPopularPosts(5);
  const allPosts = getAllPostSummaries();

  return (
    <main className="min-h-screen bg-[#000000] px-5 pb-14 pt-28 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-32 lg:px-0 lg:pb-20 lg:pt-36">
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <BlogBreadcrumb
          items={[
            { label: "Startseite", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Suche" },
          ]}
        />

        <header className="mb-10">
          <h1 className="text-[1.85rem] font-black tracking-[-0.04em] text-[#F5F5F5] sm:text-[2.4rem]">
            Blog durchsuchen
          </h1>
          <div className="mt-6 max-w-[520px]">
            <BlogSearchBox />
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
          <div>
            <Suspense
              fallback={
                <p className="rounded-2xl border border-[#1F1F1F] bg-[#0A0F0A] p-6 text-[15px] text-[#E6E6E6]/78">
                  Suche wird geladen…
                </p>
              }
            >
              <BlogSearchResults posts={allPosts} />
            </Suspense>
            <div className="mt-14">
              <BlogCTA />
            </div>
            <BlogFooter />
          </div>

          <aside className="grid gap-8 lg:sticky lg:top-32 lg:self-start">
            <BlogCategories />
            <BlogPopularArticles posts={popular} />
            <BlogNewsletter />
          </aside>
        </div>
      </div>
    </main>
  );
}
