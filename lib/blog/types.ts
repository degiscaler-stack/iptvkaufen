export type BlogCategory =
  | "einrichtung"
  | "geraete"
  | "sport"
  | "streaming"
  | "sicherheit"
  | "vergleich";

export type BlogAuthor = {
  name: string;
  role: string;
};

export type BlogSection = {
  id: string;
  heading: string;
  level: 2 | 3;
  paragraphs: string[];
  list?: string[];
};

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  image?: string;
  imageAlt: string;
  featured: boolean;
  popular: boolean;
  sections: BlogSection[];
  faq: BlogFaqItem[];
  relatedSlugs: string[];
};

export type BlogPostSummary = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "description"
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
>;

export const BLOG_CATEGORIES: Record<
  BlogCategory,
  { label: string; description: string }
> = {
  einrichtung: {
    label: "Einrichtung",
    description: "Schritt-für-Schritt Anleitungen zur IPTV Installation",
  },
  geraete: {
    label: "Geräte",
    description: "IPTV auf Smart TV, Fire TV, Android und mehr",
  },
  sport: {
    label: "Sport",
    description: "Bundesliga, Champions League und Live-Sport per IPTV",
  },
  streaming: {
    label: "Streaming",
    description: "Filme, Serien und Entertainment in bester Qualität",
  },
  sicherheit: {
    label: "Sicherheit",
    description: "Tipps für stabiles und sicheres IPTV Streaming",
  },
  vergleich: {
    label: "Vergleich",
    description: "IPTV im Vergleich mit Kabel, Satellit und OTT",
  },
};

export const POSTS_PER_PAGE = 9;
