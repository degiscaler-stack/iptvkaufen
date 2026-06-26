import type { Metadata } from "next";
import BlogArticleCard from "@/components/blog/BlogArticleCard";
import { getAllPostSummaries } from "@/lib/blog/posts";
import { buildBlogSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "IPTV Blog | Ratgeber & Leitfäden – iptvkaufenX",
  description:
    "Der iptvkaufenX Blog mit klaren IPTV-Leitfäden für Deutschland – German IPTV, Anbieter, Geräte und Qualität.",
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
        <header className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
            iptvkaufenX Blog
          </p>
          <h1 className="text-balance text-[2rem] font-black tracking-[-0.04em] text-[#F5F5F5] sm:text-[2.6rem]">
            IPTV Ratgeber
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-7 text-[#E6E6E6]/76">
            Klare Leitfäden und praxisnahe Informationen rund um IPTV in Deutschland.
          </p>
        </header>

        <section aria-label="Blog Artikel" className="mx-auto max-w-[560px]">
          {posts.map((post) => (
            <BlogArticleCard key={post.slug} post={post} />
          ))}
        </section>
      </div>
    </main>
  );
}
