import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import BlogCard from "@/components/blog/BlogCard";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogCTA from "@/components/blog/BlogCTA";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import BlogPopularArticles from "@/components/blog/BlogPopularArticles";
import BlogSearchBox from "@/components/blog/BlogSearchBox";
import { getPopularPosts, getPostsByCategory } from "@/lib/blog/posts";
import { BLOG_CATEGORIES, type BlogCategory } from "@/lib/blog/types";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import { getBlogCategoryTitle, SEO_TITLES } from "@/lib/seo-titles";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(BLOG_CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = BLOG_CATEGORIES[slug as BlogCategory];

  if (!category) {
    return buildPageMetadata({
      title: SEO_TITLES.blogCategoryNotFound,
      description: "Die gesuchte Blog-Kategorie wurde nicht gefunden.",
      path: `/blog/kategorie/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: getBlogCategoryTitle(slug as BlogCategory),
    description: category.description,
    path: `/blog/kategorie/${slug}`,
    noIndex: true,
  });
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = BLOG_CATEGORIES[slug as BlogCategory];

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(slug as BlogCategory);
  const popular = getPopularPosts(5);

  const breadcrumbItems = [
    { name: "Startseite", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.label, path: `/blog/kategorie/${slug}` },
  ];

  return (
    <main className="min-h-screen bg-[#000000] px-5 pb-14 pt-28 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-32 lg:px-0 lg:pb-20 lg:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      <div className="mx-auto max-w-[1360px] lg:px-12">
        <BlogBreadcrumb
          items={[
            { label: "Startseite", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: category.label },
          ]}
        />

        <header className="mb-10">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
            Kategorie
          </p>
          <h1 className="text-[1.85rem] font-black tracking-[-0.04em] text-[#F5F5F5] sm:text-[2.6rem]">
            {category.label}
          </h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-[#E6E6E6]/82">
            {category.description}
          </p>
          <div className="mt-6 max-w-[520px]">
            <BlogSearchBox />
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
          <div>
            {posts.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-[#1F1F1F] bg-[#0A0F0A] p-6 text-[15px] text-[#E6E6E6]/78">
                In dieser Kategorie sind noch keine Artikel verfügbar.
              </p>
            )}

            <div className="mt-14">
              <BlogCTA />
            </div>
            <BlogFooter />
          </div>

          <aside className="grid gap-8 lg:sticky lg:top-32 lg:self-start">
            <BlogCategories activeCategory={slug as BlogCategory} />
            <BlogPopularArticles posts={popular} />
            <BlogNewsletter />
          </aside>
        </div>
      </div>
    </main>
  );
}
