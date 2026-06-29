import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import BlogArticleContent, {
  BlogArticleHeroImage,
} from "@/components/blog/BlogArticleContent";
import BlogCTA from "@/components/blog/BlogCTA";
import BlogFaq from "@/components/blog/BlogFaq";
import BlogPlannedNotice from "@/components/blog/BlogPlannedNotice";
import BlogPostNavigation from "@/components/blog/BlogPostNavigation";
import BlogRelatedPosts from "@/components/blog/BlogRelatedPosts";
import BlogShareButtons from "@/components/blog/BlogShareButtons";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import {
  getAdjacentPosts,
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog/posts";
import { formatGermanDate } from "@/lib/blog/utils";
import { resolveBlogOgImage } from "@/lib/blog/images";
import { BLOG_CATEGORIES, isPlannedPost } from "@/lib/blog/types";
import {
  buildBreadcrumbSchema,
  buildBlogPostingSchema,
  buildFaqSchema,
  buildPageMetadata,
} from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildPageMetadata({
      title: SEO_TITLES.blogArticleNotFound,
      description: "Der gesuchte Blog-Artikel wurde nicht gefunden.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  const pageTitle =
    SEO_TITLES.articles[post.slug as keyof typeof SEO_TITLES.articles] ??
    post.seoTitle ??
    `${post.title} | iptvkaufenX`;

  return buildPageMetadata({
    title: pageTitle,
    description: post.seoDescription ?? post.description,
    path: `/blog/${post.slug}`,
    image: resolveBlogOgImage({
      image: post.image,
      category: post.category,
    }),
    imageAlt: post.imageAlt,
    type: "article",
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const category = BLOG_CATEGORIES[post.category];
  const related = getRelatedPosts(post.relatedSlugs);
  const { previous, next } = getAdjacentPosts(slug);
  const planned = isPlannedPost(post);

  const breadcrumbItems = [
    { name: "Startseite", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.label, path: `/blog/kategorie/${post.category}` },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const schemas = [
    buildBlogPostingSchema(post),
    buildBreadcrumbSchema(breadcrumbItems),
    buildFaqSchema(post.faq),
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#000000] px-5 pb-14 pt-28 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-32 lg:px-0 lg:pb-20 lg:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <article className="mx-auto max-w-[1120px] lg:px-12">
        <BlogBreadcrumb
          items={[
            { label: "Startseite", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: category.label, href: `/blog/kategorie/${post.category}` },
            { label: post.title },
          ]}
        />

        <header className="mb-8 max-w-[820px]">
          <div className="mb-3 flex flex-wrap gap-2">
            <p className="inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
              {category.label}
            </p>
            {planned ? (
              <p className="inline-flex rounded-full border border-[#F5F5F5]/12 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F5F5]/58">
                Geplant
              </p>
            ) : null}
          </div>
          <h1 className="text-balance text-[2rem] font-black leading-[1.04] tracking-[-0.05em] text-[#F5F5F5] sm:text-[2.65rem] lg:text-[3rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-[#E6E6E6]/84 sm:text-[16px]">
            {post.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#F5F5F5]/58">
            <span>
              Von <strong className="font-semibold text-[#F5F5F5]/82">{post.author.name}</strong>
              {post.author.role ? ` · ${post.author.role}` : ""}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.updatedAt}>
              Aktualisiert: {formatGermanDate(post.updatedAt)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} Min. Lesezeit</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#A6FF00]/72">{post.keyword}</span>
          </div>
        </header>

        <BlogArticleHeroImage
          image={post.image}
          category={post.category}
          alt={post.imageAlt}
          title={post.imageAlt}
        />

        <div className={planned ? "max-w-[820px]" : "grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12"}>
          {!planned ? (
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <BlogTableOfContents sections={post.sections} />
            </aside>
          ) : null}

          <div>
            {planned ? (
              <BlogPlannedNotice />
            ) : (
              <BlogArticleContent sections={post.sections} />
            )}
            <BlogShareButtons title={post.title} slug={post.slug} />
            {!planned ? <BlogFaq items={post.faq} /> : null}
            <BlogPostNavigation previous={previous} next={next} />
            <div className="mt-12">
              <BlogCTA />
            </div>
            <BlogRelatedPosts posts={related} />
          </div>
        </div>
      </article>
    </main>
  );
}
