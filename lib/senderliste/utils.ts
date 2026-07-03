import type {
  CatalogChannel,
  CatalogIndex,
  PageSearchCountry,
  PageSearchIndex,
  SenderCard,
  TopicChannel,
} from "@/lib/senderliste/types";
import { CATALOG_CATEGORY_ORDER } from "@/lib/senderliste/types";
import { COUNTRY_CARD_DEFINITIONS } from "@/lib/senderliste/country-map";
import { TOPIC_CATEGORIES } from "@/lib/senderliste/topics";

export function normalizeSearchValue(value: string) {
  return value.toLocaleLowerCase("de-DE");
}

export function formatSenderCount(count: number) {
  return count === 1 ? "1 Sender" : `${count} Sender`;
}

export function formatMatchCount(count: number) {
  if (count === 1) {
    return "1 passender Sender gefunden";
  }

  return `${count} passende Sender gefunden`;
}

export function buildSenderCards(index: CatalogIndex): SenderCard[] {
  const byCode = new Map(
    index.countries.map((country) => [country.country_code.toLowerCase(), country]),
  );

  const countryCards: SenderCard[] = COUNTRY_CARD_DEFINITIONS.flatMap((definition) => {
    const entry = byCode.get(definition.countryCode.toLowerCase());

    if (!entry) {
      return [];
    }

    return [
      {
        id: definition.countryCode.toLowerCase(),
        kind: "country" as const,
        name: definition.name,
        region: definition.region,
        countryCode: definition.countryCode.toLowerCase(),
        channelCount: entry.channels_exported,
      },
    ];
  });

  const topicCards: SenderCard[] = TOPIC_CATEGORIES.map((topic) => ({
    id: topic.id,
    kind: "topic" as const,
    name: topic.name,
    region: topic.region,
    channelCount: topic.channels.length,
  }));

  const insertAfterSaudi = countryCards.findIndex((card) => card.id === "sa");
  const middleEastTopics = topicCards.filter((card) =>
    ["arabische-sender", "mbc", "osn", "bein-arab"].includes(card.id),
  );
  const otherTopics = topicCards.filter(
    (card) => !["arabische-sender", "mbc", "osn", "bein-arab"].includes(card.id),
  );

  const cards = [...countryCards];

  if (insertAfterSaudi >= 0) {
    cards.splice(insertAfterSaudi, 0, ...middleEastTopics);
  } else {
    cards.push(...middleEastTopics);
  }

  const insertAfterRussia = cards.findIndex((card) => card.id === "ru");
  const skandinavien = otherTopics.find((card) => card.id === "skandinavien");
  const remainingTopics = otherTopics.filter((card) => card.id !== "skandinavien");

  if (skandinavien && insertAfterRussia >= 0) {
    cards.splice(insertAfterRussia + 1, 0, skandinavien);
  } else if (skandinavien) {
    cards.push(skandinavien);
  }

  cards.push(...remainingTopics);
  return cards;
}

export function getChannelCategory(channel: CatalogChannel | TopicChannel) {
  if ("categories_de" in channel) {
    return channel.categories_de[0] || channel.categories[0] || "Allgemein";
  }

  return channel.category || "Allgemein";
}

export function groupChannelsByCategory<T extends CatalogChannel | TopicChannel>(channels: T[]) {
  const groups = new Map<string, T[]>();

  for (const channel of channels) {
    const category = getChannelCategory(channel);
    const current = groups.get(category);

    if (current) {
      current.push(channel);
    } else {
      groups.set(category, [channel]);
    }
  }

  const ordered: { category: string; channels: T[] }[] = [];

  for (const category of CATALOG_CATEGORY_ORDER) {
    const categoryChannels = groups.get(category);
    if (categoryChannels?.length) {
      ordered.push({ category, channels: categoryChannels });
      groups.delete(category);
    }
  }

  for (const [category, categoryChannels] of groups) {
    ordered.push({ category, channels: categoryChannels });
  }

  return ordered;
}

export function channelMatchesQuery(channel: CatalogChannel | TopicChannel, query: string) {
  if (!query) {
    return true;
  }

  if ("categories_de" in channel) {
    const haystack = normalizeSearchValue(
      [
        channel.name,
        ...(channel.alt_names ?? []),
        channel.network ?? "",
        ...(channel.categories_de ?? []),
        ...(channel.categories ?? []),
      ].join(" "),
    );

    return haystack.includes(query);
  }

  return normalizeSearchValue(`${channel.name} ${channel.category}`).includes(query);
}

export function filterChannels<T extends CatalogChannel | TopicChannel>(channels: T[], query: string) {
  const normalized = normalizeSearchValue(query.trim());

  if (!normalized) {
    return channels;
  }

  return channels.filter((channel) => channelMatchesQuery(channel, normalized));
}

export function countMatchingChannels(entry: PageSearchCountry, query: string) {
  const normalized = normalizeSearchValue(query.trim());

  if (!normalized) {
    return entry.count;
  }

  return entry.channels.reduce(
    (total, channel) => (channel.q.includes(normalized) ? total + 1 : total),
    0,
  );
}

export function cardMatchesPageSearch(
  card: SenderCard,
  query: string,
  pageSearchIndex: PageSearchIndex | null,
) {
  const normalized = normalizeSearchValue(query.trim());

  if (!normalized) {
    return { matches: true, matchCount: card.channelCount };
  }

  const metaHaystack = normalizeSearchValue(`${card.name} ${card.region}`);
  if (metaHaystack.includes(normalized)) {
    return { matches: true, matchCount: card.channelCount };
  }

  if (card.kind === "topic") {
    const topic = TOPIC_CATEGORIES.find((item) => item.id === card.id);
    if (!topic) {
      return { matches: false, matchCount: 0 };
    }

    const matchCount = topic.channels.filter((channel) =>
      channelMatchesQuery(channel, normalized),
    ).length;

    return { matches: matchCount > 0, matchCount };
  }

  const entry = pageSearchIndex?.countries.find((item) => item.code === card.countryCode);
  if (!entry) {
    return { matches: false, matchCount: 0 };
  }

  const matchCount = countMatchingChannels(entry, normalized);
  return { matches: matchCount > 0, matchCount };
}

export function getMatchingChannelNames(
  channels: Array<CatalogChannel | TopicChannel>,
  query: string,
) {
  const normalized = normalizeSearchValue(query.trim());

  if (!normalized) {
    return new Set<string>();
  }

  return new Set(
    channels
      .filter((channel) => channelMatchesQuery(channel, normalized))
      .map((channel) => channel.name),
  );
}
