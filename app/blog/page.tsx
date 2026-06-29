import type { Metadata } from "next";
import Link from "next/link";
import BlogArticleCard from "@/components/blog/BlogArticleCard";
import BlogSearchBox from "@/components/blog/BlogSearchBox";
import { getAllPostSummaries } from "@/lib/blog/posts";
import { buildBlogSchema, buildPageMetadata } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.blog,
  description:
    "Der iptvkaufenX Blog mit klaren IPTV-Leitfäden für Deutschland – German IPTV, Tests, Geräte und Premium Live-TV.",
  path: "/blog",
});

export default function BlogHomePage() {
  const posts = getAllPostSummaries();
  const blogSchema = buildBlogSchema();

  return (
    <main className="min-h-screen bg-[#000000] px-5 pb-14 pt-28 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-32 lg:px-0 lg:pb-20 lg:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="mx-auto max-w-[1360px] lg:px-12">
        <header className="mb-12 text-center sm:mb-14">
          <p className="mb-4 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
            IPTVKAUFENX BLOG
          </p>
          <h1 className="text-balance text-[2.2rem] font-black leading-[1.02] tracking-[-0.055em] sm:text-[3rem] lg:text-[3.5rem]">
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent">
              IPTV Ratgeber
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[15px] leading-7 text-[#E6E6E6]/82 sm:text-[16px]">
            Klare Leitfäden und praxisnahe Informationen rund um IPTV in Deutschland.
          </p>
          <div className="mx-auto mt-8 max-w-[520px]">
            <BlogSearchBox />
          </div>
        </header>

        <section aria-label="Blog Artikel" id="alle-artikel" className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post, index) => (
            <BlogArticleCard key={post.slug} post={post} priority={index < 4} />
          ))}
        </section>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/blog#alle-artikel"
            className="inline-flex items-center gap-2 rounded-full border border-[#A6FF00]/30 bg-[#0A0F0A] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#A6FF00] transition duration-300 hover:border-[#A6FF00]/55 hover:bg-[#0F140F] hover:text-[#C7FF62]"
          >
            Alle Artikel ansehen
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
