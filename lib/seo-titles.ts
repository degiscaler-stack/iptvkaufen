import type { BlogCategory } from "@/lib/blog/types";

export const SEO_TITLES = {
  home: "IPTV kaufen Deutschland – 22.000+ Sender | iptvkaufenX",
  siteDefault: "IPTV Kaufen Deutschland: Premium IPTV | iptvkaufenX",
  blog: "IPTV Blog: Ratgeber & Guides (2026) | iptvkaufenX",
  preise: "IPTV Preise: Pakete ab 9,99 € | iptvkaufenX",
  faq: "IPTV FAQ: Häufige Fragen beantwortet | iptvkaufenX",
  senderliste: "IPTV Senderliste: DE & International | iptvkaufenX",
  kontakt: "IPTV Kontakt: Support & Beratung | iptvkaufenX",
  datenschutz: "Datenschutz & DSGVO | iptvkaufenX",
  impressum: "Impressum & Anbieterkennzeichnung | iptvkaufenX",
  nutzungsbedingungen: "AGB & Nutzungsbedingungen | iptvkaufenX",
  rueckerstattung: "Rückerstattung: IPTV Richtlinie | iptvkaufenX",
  blogSuche: "Blog Suche: IPTV Guides finden | iptvkaufenX",
  blogArticleNotFound: "Blog Artikel nicht gefunden | iptvkaufenX",
  blogCategoryNotFound: "Blog Kategorie nicht gefunden | iptvkaufenX",
  blogTagNotFound: "Blog Tag nicht gefunden | iptvkaufenX",
  articles: {
    "german-iptv": "German IPTV (2026): Premium Guide | iptvkaufenX",
    "iptv-anbieter": "IPTV Anbieter Deutschland (2026) | iptvkaufenX",
    "iptv-box": "IPTV Box kaufen: Beste Geräte (2026) | iptvkaufenX",
    "iptv-free-trial": "IPTV Free Trial Deutschland | iptvkaufenX",
    "iptv-abo": "IPTV Abo (2026): Bestes Abonnement | iptvkaufenX",
    "iptv-receiver": "IPTV Receiver: Beste Geräte (2026) | iptvkaufenX",
    "iptv-provider": "IPTV Provider (2026): Besten finden | iptvkaufenX",
  },
} as const;

const CATEGORY_TITLES: Record<BlogCategory, string> = {
  "iptv-deutschland": "IPTV Deutschland: Blog Artikel | iptvkaufenX",
  "iptv-anbieter": "IPTV Anbieter: Blog Kategorie | iptvkaufenX",
  "iptv-abonnement": "IPTV Abonnement: Blog Kategorie | iptvkaufenX",
  "iptv-geraete": "IPTV Geräte: Blog Kategorie | iptvkaufenX",
  "iptv-apps": "IPTV Apps: Blog Kategorie | iptvkaufenX",
  "iptv-vergleich": "IPTV Vergleich: Blog Artikel | iptvkaufenX",
  "iptv-test": "IPTV Test: Blog Kategorie | iptvkaufenX",
};

const TAG_TITLES: Record<string, string> = {
  "German IPTV": "German IPTV: Blog Tag | iptvkaufenX",
  "IPTV Anbieter": "IPTV Anbieter: Blog Tag | iptvkaufenX",
  "IPTV Box": "IPTV Box: Blog Tag | iptvkaufenX",
  "IPTV Free Trial": "IPTV Free Trial: Blog Tag | iptvkaufenX",
  "IPTV Abo": "IPTV Abo: Blog Tag | iptvkaufenX",
  "IPTV Receiver": "IPTV Receiver: Blog Tag | iptvkaufenX",
  "IPTV Provider": "IPTV Provider: Blog Tag | iptvkaufenX",
};

export function getBlogCategoryTitle(slug: BlogCategory): string {
  return CATEGORY_TITLES[slug];
}

export function getBlogTagTitle(tag: string): string {
  return TAG_TITLES[tag] ?? truncateTagTitle(tag);
}

export function getBlogPaginationTitle(pageNum: number): string {
  return `IPTV Blog: Seite ${pageNum} | iptvkaufenX`;
}

function truncateTagTitle(tag: string): string {
  const suffix = " | iptvkaufenX";
  const prefix = `${tag}: Blog Tag`;
  const title = `${prefix}${suffix}`;

  if (title.length <= 60) {
    return title;
  }

  const maxTagLength = 60 - suffix.length - ": Blog Tag".length;
  return `${tag.slice(0, Math.max(maxTagLength, 1))}: Blog Tag${suffix}`;
}

export function assertSeoTitleLimits(): void {
  const entries: Array<[string, string]> = [
    ["home", SEO_TITLES.home],
    ["siteDefault", SEO_TITLES.siteDefault],
    ["blog", SEO_TITLES.blog],
    ["preise", SEO_TITLES.preise],
    ["faq", SEO_TITLES.faq],
    ["senderliste", SEO_TITLES.senderliste],
    ["kontakt", SEO_TITLES.kontakt],
    ["datenschutz", SEO_TITLES.datenschutz],
    ["impressum", SEO_TITLES.impressum],
    ["nutzungsbedingungen", SEO_TITLES.nutzungsbedingungen],
    ["rueckerstattung", SEO_TITLES.rueckerstattung],
    ["blogSuche", SEO_TITLES.blogSuche],
    ["blogArticleNotFound", SEO_TITLES.blogArticleNotFound],
    ["blogCategoryNotFound", SEO_TITLES.blogCategoryNotFound],
    ["blogTagNotFound", SEO_TITLES.blogTagNotFound],
    ...Object.entries(SEO_TITLES.articles).map(([slug, title]) => [`article:${slug}`, title] as [string, string]),
    ...Object.entries(CATEGORY_TITLES).map(([slug, title]) => [`category:${slug}`, title] as [string, string]),
    ...Object.entries(TAG_TITLES).map(([tag, title]) => [`tag:${tag}`, title] as [string, string]),
    ["blogPagination:2", getBlogPaginationTitle(2)],
  ];

  const seen = new Map<string, string>();

  for (const [key, title] of entries) {
    if (title.length > 60) {
      throw new Error(`SEO title too long (${title.length}): ${key} -> ${title}`);
    }

    const existing = seen.get(title);
    if (existing) {
      throw new Error(`Duplicate SEO title: "${title}" used by ${existing} and ${key}`);
    }

    seen.set(title, key);
  }
}

assertSeoTitleLimits();
