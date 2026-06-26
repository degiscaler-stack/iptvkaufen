import type { Metadata } from "next";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogClusterSection from "@/components/blog/BlogClusterSection";
import BlogCTA from "@/components/blog/BlogCTA";
import BlogFeaturedArticle from "@/components/blog/BlogFeaturedArticle";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import BlogPopularArticles from "@/components/blog/BlogPopularArticles";
import BlogSearchBox from "@/components/blog/BlogSearchBox";
import { getFeaturedPost, getPopularPosts, getPostsGroupedByCluster } from "@/lib/blog/posts";
import { buildBlogSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "IPTV Blog | SEO Leitfäden & Ratgeber – iptvkaufenX",
  description:
    "Geplante IPTV SEO-Leitfäden zu German IPTV, IPTV Anbietern, Apps, Geräten, Vergleich und Free Trial – strukturiert für Deutschland.",
  path: "/blog",
});

export default function BlogHomePage() {
  const featured = getFeaturedPost();
  const clusters = getPostsGroupedByCluster();
  const popular = getPopularPosts(5);

  const blogSchema = buildBlogSchema();

  return (
    <main className="min-h-screen bg-[#000000] px-5 pb-14 pt-28 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-32 lg:px-0 lg:pb-20 lg:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="mx-auto max-w-[1360px] lg:px-12">
        <header className="relative mb-12 overflow-hidden rounded-[28px] border border-[#1F1F1F] bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,0,0.1),transparent_42%),linear-gradient(180deg,#0A0F0A_0%,#050505_100%)] px-5 py-10 text-center sm:mb-14 sm:px-8 sm:py-12">
          <p className="mb-4 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
            iptvkaufenX SEO Blog
          </p>
          <h1 className="text-balance text-[2rem] font-black leading-[1.03] tracking-[-0.055em] sm:text-[3rem] lg:text-[3.5rem]">
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent">
              IPTV Leitfäden für Deutschland
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-[#E6E6E6]/82 sm:text-[16px]">
            Strukturierte SEO-Ratgeber zu German IPTV, Anbietern, Apps, Geräten, Vergleich und
            Testangeboten – redaktionell vorbereitet und klar nach Themenclustern sortiert.
          </p>
          <div className="mx-auto mt-8 max-w-[520px]">
            <BlogSearchBox />
          </div>
        </header>

        {featured ? (
          <section aria-label="Featured Artikel" className="mb-12 sm:mb-16">
            <BlogFeaturedArticle post={featured} />
          </section>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <div className="grid gap-12">
              {clusters.map(({ category, posts }) => (
                <BlogClusterSection key={category} category={category} posts={posts} />
              ))}
            </div>

            <div className="mt-14">
              <BlogCTA />
            </div>

            <BlogFooter />
          </div>

          <aside className="grid gap-6 lg:sticky lg:top-32 lg:gap-8">
            <BlogCategories />
            <BlogPopularArticles posts={popular} />
            <BlogNewsletter />
          </aside>
        </div>
      </div>
    </main>
  );
}
