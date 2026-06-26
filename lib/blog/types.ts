export type BlogCategory =
  | "iptv-deutschland"
  | "iptv-anbieter"
  | "iptv-geraete"
  | "iptv-apps"
  | "iptv-vergleich"
  | "iptv-test";

export type BlogPostStatus = "planned" | "published";

export type BlogAuthor = {
  name: string;
  role: string;
};

export type BlogSectionImage = {
  src: string;
  alt: string;
  title: string;
};

export type BlogSubsection = {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogSection = {
  id: string;
  heading: string;
  level: 2 | 3;
  paragraphs: string[];
  list?: string[];
  image?: BlogSectionImage;
  subsections?: BlogSubsection[];
};

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  description: string;
  keyword: string;
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  image?: string | null;
  imageAlt: string;
  featured: boolean;
  popular: boolean;
  status: BlogPostStatus;
  sections: BlogSection[];
  faq: BlogFaqItem[];
  relatedSlugs: string[];
};

export type BlogPostSummary = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "description"
  | "keyword"
  | "category"
  | "tags"
  | "author"
  | "publishedAt"
  | "updatedAt"
  | "readingTimeMinutes"
  | "image"
  | "imageAlt"
  | "featured"
  | "popular"
  | "status"
>;

export const BLOG_CATEGORIES: Record<
  BlogCategory,
  { label: string; description: string }
> = {
  "iptv-deutschland": {
    label: "IPTV Deutschland",
    description: "German IPTV, Germany IPTV und Deutschland IPTV im Überblick",
  },
  "iptv-anbieter": {
    label: "IPTV Anbieter",
    description: "Seriöse IPTV Anbieter und Auswahlkriterien für Deutschland",
  },
  "iptv-geraete": {
    label: "IPTV Geräte",
    description: "IPTV Box, Smart TV und kompatible Hardware",
  },
  "iptv-apps": {
    label: "IPTV Apps",
    description: "IPTV Player und IPTV Smart Player für alle Geräte",
  },
  "iptv-vergleich": {
    label: "IPTV Vergleich",
    description: "Best IPTV und IPTV Anbieter Vergleich für Deutschland",
  },
  "iptv-test": {
    label: "IPTV Test",
    description: "IPTV Free Trial und risikofreies Testen",
  },
};

export const BLOG_CLUSTER_ORDER: BlogCategory[] = [
  "iptv-deutschland",
  "iptv-anbieter",
  "iptv-geraete",
  "iptv-apps",
  "iptv-vergleich",
  "iptv-test",
];

export const POSTS_PER_PAGE = 12;

export function isPlannedPost(post: Pick<BlogPost, "status" | "sections">): boolean {
  return post.status === "planned" || post.sections.length === 0;
}
