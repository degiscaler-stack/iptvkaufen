export type CatalogChannel = {
  id: string;
  name: string;
  alt_names: string[];
  network: string | null;
  categories: string[];
  categories_de: string[];
};

export type CatalogCountryFile = {
  country_code: string;
  country_name_de: string;
  country_name_en: string;
  channel_count_exported: number;
  recommended_initial_display_count: number;
  channels: CatalogChannel[];
};

export type CatalogIndexCountry = {
  country_code: string;
  country_name_de: string;
  country_name_en: string;
  channels_exported: number;
  recommended_initial_display_count: number;
  file: string;
};

export type CatalogIndex = {
  country_count: number;
  total_channels_exported: number;
  max_channels_per_country: number;
  countries: CatalogIndexCountry[];
};

export type SenderCardKind = "country" | "topic";

export type SenderCard = {
  id: string;
  kind: SenderCardKind;
  name: string;
  region: string;
  /** ISO-like country code for catalogue countries. */
  countryCode?: string;
  channelCount: number;
};

export type TopicChannel = {
  name: string;
  category: string;
};

export type TopicCategory = {
  id: string;
  name: string;
  region: string;
  channels: TopicChannel[];
};

export type PageSearchChannel = {
  n: string;
  q: string;
};

export type PageSearchCountry = {
  code: string;
  name: string;
  region: string;
  count: number;
  channels: PageSearchChannel[];
};

export type PageSearchIndex = {
  countries: PageSearchCountry[];
};

export const CATALOG_CATEGORY_ORDER = [
  "Allgemein",
  "Nachrichten",
  "Sport",
  "Filme",
  "Serien",
  "Unterhaltung",
  "Kinder",
  "Dokumentation",
  "Wirtschaft",
  "Kultur",
  "Musik",
  "Bildung",
  "Reisen",
  "Lifestyle",
  "Regional",
  "Religion",
] as const;

export const INITIAL_CHANNEL_BATCH = 200;
export const CHANNEL_BATCH_SIZE = 100;
