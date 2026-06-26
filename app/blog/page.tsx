import type { Metadata } from "next";
import BlogCard from "@/components/blog/BlogCard";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogCTA from "@/components/blog/BlogCTA";
import BlogFeaturedArticle from "@/components/blog/BlogFeaturedArticle";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import BlogPagination from "@/components/blog/BlogPagination";
import BlogPopularArticles from "@/components/blog/BlogPopularArticles";
import BlogSearchBox from "@/components/blog/BlogSearchBox";
import {
  getFeaturedPost,
  getPaginatedPosts,
  getPopularPosts,
} from "@/lib/blog/posts";
import { buildBlogSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "IPTV Blog | Guides, Tipps & News – iptvkaufenX",
  description:
    "Der iptvkaufenX Blog: Experten-Guides zu IPTV Einrichtung, Geräten, Sport, Streaming und Sicherheit. Alles für perfektes IPTV in Deutschland.",
  path: "/blog",
});

export default function BlogHomePage() {
  const featured = getFeaturedPost();
  const { posts, totalPages, currentPage } = getPaginatedPosts(1);
  const popular = getPopularPosts(5);
  const latestWithoutFeatured = featured
    ? posts.filter((post) => post.slug !== featured.slug)
    : posts;

  const blogSchema = buildBlogSchema();

  return (
    <main className="min-h-screen bg-[#000000] px-5 pb-14 pt-28 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-32 lg:px-0 lg:pb-20 lg:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="mx-auto max-w-[1360px] lg:px-12">
        {/* Hero */}
        <header className="mb-10 text-center sm:mb-14">
          <p className="mb-4 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
            iptvkaufenX Blog
          </p>
          <h1 className="text-balance text-[2.2rem] font-black leading-[1.02] tracking-[-0.055em] sm:text-[3.2rem] lg:text-[3.8rem]">
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent">
              IPTV Wissen &amp; Streaming Guides
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-7 text-[#E6E6E6]/82 sm:text-[16px]">
            Professionelle Anleitungen, Geräte-Tests und Experten-Tipps für IPTV in Deutschland –
            von der Einrichtung bis zum perfekten Streaming-Erlebnis.
          </p>
          <div className="mx-auto mt-8 max-w-[520px]">
            <BlogSearchBox />
          </div>
        </header>

        {/* Featured */}
        {featured ? (
          <section aria-label="Featured Artikel" className="mb-12 sm:mb-16">
            <BlogFeaturedArticle post={featured} />
          </section>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* Main content */}
          <div>
            <section aria-labelledby="latest-articles-heading">
              <h2
                id="latest-articles-heading"
                className="text-[1.35rem] font-bold tracking-[-0.02em] text-[#F5F5F5] sm:text-[1.55rem]"
              >
                Neueste Artikel
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {latestWithoutFeatured.map((post, index) => (
                  <BlogCard key={post.slug} post={post} priority={index < 3} />
                ))}
              </div>
              <BlogPagination currentPage={currentPage} totalPages={totalPages} />
            </section>

            <div className="mt-14">
              <BlogCTA />
            </div>

            <BlogFooter />
          </div>

          {/* Sidebar */}
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
