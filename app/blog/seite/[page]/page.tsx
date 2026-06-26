import type { Metadata } from "next";
import BlogCard from "@/components/blog/BlogCard";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogCTA from "@/components/blog/BlogCTA";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import BlogPagination from "@/components/blog/BlogPagination";
import BlogPopularArticles from "@/components/blog/BlogPopularArticles";
import BlogSearchBox from "@/components/blog/BlogSearchBox";
import { getPaginatedPosts, getPopularPosts, getTotalPages } from "@/lib/blog/posts";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ page: string }>;
};

export async function generateStaticParams() {
  const totalPages = getTotalPages();
  return Array.from({ length: totalPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNum = Number(page);

  return buildPageMetadata({
    title: `IPTV Blog – Seite ${pageNum} | iptvkaufenX`,
    description: `IPTV Guides und Streaming-Tipps – Seite ${pageNum} des iptvkaufenX Blogs.`,
    path: `/blog/seite/${page}`,
  });
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { page } = await params;
  const pageNum = Number(page);
  const { posts, totalPages, currentPage } = getPaginatedPosts(pageNum);
  const popular = getPopularPosts(5);

  return (
    <main className="min-h-screen bg-[#000000] px-5 pb-14 pt-28 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-32 lg:px-0 lg:pb-20 lg:pt-36">
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <header className="mb-10">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
            Seite {currentPage} von {totalPages}
          </p>
          <h1 className="text-[1.85rem] font-black tracking-[-0.04em] text-[#F5F5F5] sm:text-[2.4rem]">
            Alle Blog-Artikel
          </h1>
          <div className="mt-6 max-w-[520px]">
            <BlogSearchBox />
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
          <div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <BlogPagination currentPage={currentPage} totalPages={totalPages} />
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
