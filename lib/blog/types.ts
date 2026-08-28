export type BlogCategory =
  | "iptv-deutschland"
  | "iptv-anbieter"
  | "iptv-abonnement"
  | "iptv-geraete"
  | "iptv-apps"
  | "iptv-vergleich"
  | "iptv-test"
  | "iptv-premium"
  | "iptv-senderliste"
  | "iptv-einrichtung"
  | "iptv-sport";

export type BlogPostStatus = "planned" | "published";

export type BlogAuthor = {
  name: string;
  role: string;
};

export type BlogSectionImage = {
  src: string;
  alt: string;
  title: string;
  width?: number;
  height?: number;
  caption?: string;
};

export type BlogContentBlock =
  | { type: "summary"; title: string; items: string[] }
  | {
      type: "comparison-table";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | { type: "tip"; title: string; paragraphs: string[] }
  | { type: "info"; title: string; paragraphs: string[] }
  | { type: "process"; title: string; steps: string[] }
  | { type: "code"; caption?: string; content: string };

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
  blocks?: BlogContentBlock[];
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
    description: "IPTV als Technik in Deutschland: Grundlagen, Geräte und Einrichtung",
  },
  "iptv-anbieter": {
    label: "IPTV Anbieter",
    description: "Wie IPTV-Anbieter technisch arbeiten und woran sich Angebote unterscheiden",
  },
  "iptv-abonnement": {
    label: "IPTV Abonnement",
    description: "Technische Hintergründe zu Zugangsdaten, Playlisten und Laufzeiten",
  },
  "iptv-geraete": {
    label: "IPTV Geräte",
    description: "IPTV Box, Smart TV und kompatible Hardware",
  },
  "iptv-apps": {
    label: "IPTV Apps",
    description: "IPTV Player und IPTV Smart Player für typische Geräte",
  },
  "iptv-vergleich": {
    label: "IPTV Vergleich",
    description: "Technische Vergleiche von Playern, Geräten und Setups",
  },
  "iptv-test": {
    label: "IPTV Test",
    description: "Wie sich Player, Leitung und Einrichtung praktisch prüfen lassen",
  },
  "iptv-premium": {
    label: "IPTV Premium",
    description: "HD- und 4K-Streaming technisch erklärt",
  },
  "iptv-senderliste": {
    label: "Playlisten",
    description: "M3U-Playlisten, EPG und technische Kanallisten",
  },
  "iptv-einrichtung": {
    label: "IPTV Einrichtung",
    description: "IPTV einrichten mit M3U, Apps und Zugangsdaten",
  },
  "iptv-sport": {
    label: "Live-Streaming",
    description: "Technische Hinweise zu Live-Streams und Bandbreite",
  },
};

export const BLOG_CLUSTER_ORDER: BlogCategory[] = [
  "iptv-deutschland",
  "iptv-anbieter",
  "iptv-abonnement",
  "iptv-geraete",
  "iptv-apps",
  "iptv-vergleich",
  "iptv-test",
  "iptv-premium",
  "iptv-senderliste",
  "iptv-einrichtung",
  "iptv-sport",
];

export const POSTS_PER_PAGE = 12;

export function isPlannedPost(post: Pick<BlogPost, "status" | "sections">): boolean {
  return post.status === "planned" || post.sections.length === 0;
}
