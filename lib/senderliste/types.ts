export const CHANNEL_CATEGORIES = [
  "Öffentlich-rechtliche Sender",
  "Allgemeine Sender",
  "Nachrichten",
  "Sport",
  "Filme & Serien",
  "Unterhaltung",
  "Kinder",
  "Dokumentationen",
  "Musik",
  "Regional",
  "Lifestyle",
  "Kultur",
  "Wirtschaft",
  "Religion",
] as const;

export type ChannelCategory = (typeof CHANNEL_CATEGORIES)[number];

export type SenderChannel = {
  name: string;
  category: ChannelCategory;
  verified: true;
  language?: string;
};

export type SenderCountryData = {
  id: string;
  name: string;
  region: string;
  channels: SenderChannel[];
};

export type SenderCountryMeta = {
  id: string;
  name: string;
  region: string;
  channelCount: number;
  categories: ChannelCategory[];
};

export type SenderSearchIndexEntry = {
  id: string;
  name: string;
  region: string;
  channelCount: number;
  categories: ChannelCategory[];
  channels: string[];
};

export type SenderSearchIndex = {
  countries: SenderSearchIndexEntry[];
};

export const FILTER_CHIPS = [
  { id: "alle", label: "Alle", categories: null },
  {
    id: "allgemein",
    label: "Allgemein",
    categories: ["Öffentlich-rechtliche Sender", "Allgemeine Sender"] as ChannelCategory[],
  },
  { id: "nachrichten", label: "Nachrichten", categories: ["Nachrichten"] as ChannelCategory[] },
  { id: "sport", label: "Sport", categories: ["Sport"] as ChannelCategory[] },
  {
    id: "filme-serien",
    label: "Filme & Serien",
    categories: ["Filme & Serien"] as ChannelCategory[],
  },
  { id: "kinder", label: "Kinder", categories: ["Kinder"] as ChannelCategory[] },
  {
    id: "dokumentation",
    label: "Dokumentation",
    categories: ["Dokumentationen"] as ChannelCategory[],
  },
  { id: "musik", label: "Musik", categories: ["Musik"] as ChannelCategory[] },
  { id: "regional", label: "Regional", categories: ["Regional"] as ChannelCategory[] },
] as const;

export type FilterChipId = (typeof FILTER_CHIPS)[number]["id"];

export const PREVIEW_CHANNEL_LIMIT = 12;
