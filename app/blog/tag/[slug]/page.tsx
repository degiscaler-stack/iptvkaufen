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
import { getAllTags, getPopularPosts, getPostsByTag } from "@/lib/blog/posts";
import { slugToTag, tagToSlug } from "@/lib/blog/utils";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({
    slug: tagToSlug(tag),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slugToTag(slug, getAllTags());

  if (!tag) {
    return buildPageMetadata({
      title: "Tag nicht gefunden | iptvkaufenX Blog",
      description: "Der gesuchte Blog-Tag wurde nicht gefunden.",
      path: `/blog/tag/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${tag} – IPTV Blog | iptvkaufenX`,
    description: `Alle iptvkaufenX Blog-Artikel zum Thema ${tag}.`,
    path: `/blog/tag/${slug}`,
    noIndex: true,
  });
}

export default async function BlogTagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = slugToTag(slug, getAllTags());

  if (!tag) {
    notFound();
  }

  const posts = getPostsByTag(tag);
  const popular = getPopularPosts(5);

  const breadcrumbItems = [
    { name: "Startseite", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: tag, path: `/blog/tag/${slug}` },
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
            { label: tag },
          ]}
        />

        <header className="mb-10">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
            Tag
          </p>
          <h1 className="text-[1.85rem] font-black tracking-[-0.04em] text-[#F5F5F5] sm:text-[2.6rem]">
            {tag}
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
