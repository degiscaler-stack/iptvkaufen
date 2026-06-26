import type { Metadata } from "next";
import type { BlogFaqItem, BlogPost } from "@/lib/blog/types";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import { resolveBlogOgImage } from "@/lib/blog/images";

const SITE_URL = "https://iptvkaufenx.de";
const SITE_NAME = "iptvkaufenX";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/iptv-kaufen-hero-football.webp`;

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  publishedAt,
  updatedAt,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots: {
      index: !noIndex,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "de_DE",
      type,
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          alt: imageAlt ?? title,
        },
      ],
      ...(type === "article" && publishedAt
        ? {
            publishedTime: publishedAt,
            modifiedTime: updatedAt ?? publishedAt,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
    },
  };
}

export function buildBlogPostingSchema(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = resolveBlogOgImage({
    image: post.image,
    category: post.category,
    featured: post.featured,
  });

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/iptv-kaufen-logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: BLOG_CATEGORIES[post.category].label,
    keywords: post.tags.join(", "),
    url,
  };
}

export function buildFaqSchema(faq: BlogFaqItem[]) {
  if (!faq.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildBlogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description:
      "Expertenwissen zu IPTV in Deutschland: Einrichtung, Geräte, Sport, Streaming und Sicherheit.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/iptv-kaufen-logo.webp`,
      },
    },
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
