import {
  CHANNEL_CATEGORIES,
  FILTER_CHIPS,
  PREVIEW_CHANNEL_LIMIT,
  type ChannelCategory,
  type FilterChipId,
  type SenderChannel,
  type SenderCountryData,
  type SenderCountryMeta,
  type SenderSearchIndexEntry,
} from "@/lib/senderliste/types";

export function normalizeSearchValue(value: string) {
  return value.toLocaleLowerCase("de-DE");
}

export function formatSenderCount(count: number) {
  return count === 1 ? "1 Sender" : `${count} Sender`;
}

export function formatFilteredSenderCount(count: number, filterId: FilterChipId) {
  if (filterId === "alle") {
    return formatSenderCount(count);
  }

  const labels: Record<Exclude<FilterChipId, "alle">, [string, string]> = {
    allgemein: ["Allgemeiner Sender", "Allgemeine Sender"],
    nachrichten: ["Nachrichtensender", "Nachrichtensender"],
    sport: ["Sportsender", "Sportsender"],
    "filme-serien": ["Film- & Seriensender", "Film- & Seriensender"],
    kinder: ["Kindersender", "Kindersender"],
    dokumentation: ["Dokumentationssender", "Dokumentationssender"],
    musik: ["Musiksender", "Musiksender"],
    regional: ["Regionalsender", "Regionalsender"],
  };

  const [singular, plural] = labels[filterId];
  return count === 1 ? `1 ${singular}` : `${count} ${plural}`;
}

export function formatShowAllLabel(count: number) {
  return count === 100 ? "ALLE 100 SENDER ANZEIGEN" : `ALLE ${count} SENDER ANZEIGEN`;
}

export function getAvailableFilterChips(categories: ChannelCategory[]) {
  return FILTER_CHIPS.filter((chip) => {
    if (chip.categories === null) {
      return true;
    }

    return chip.categories.some((category) => categories.includes(category));
  });
}

export function filterChannelsByChip(channels: SenderChannel[], filterId: FilterChipId) {
  const chip = FILTER_CHIPS.find((item) => item.id === filterId);

  if (!chip || chip.categories === null) {
    return channels;
  }

  return channels.filter((channel) => chip.categories.includes(channel.category));
}

export function groupChannelsByCategory(channels: SenderChannel[]) {
  const groups: { category: ChannelCategory; channels: SenderChannel[] }[] = [];

  for (const category of CHANNEL_CATEGORIES) {
    const categoryChannels = channels.filter((channel) => channel.category === category);

    if (categoryChannels.length > 0) {
      groups.push({ category, channels: categoryChannels });
    }
  }

  return groups;
}

/**
 * Build a balanced 12-channel preview across categories when inventory allows.
 */
export function buildChannelPreview(channels: SenderChannel[], limit = PREVIEW_CHANNEL_LIMIT) {
  if (channels.length <= limit) {
    return channels;
  }

  const groups = groupChannelsByCategory(channels);
  const selected: SenderChannel[] = [];
  const selectedNames = new Set<string>();

  const preferredOrder: ChannelCategory[] = [
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
  ];

  const preferredTargets: Partial<Record<ChannelCategory, number>> = {
    "Öffentlich-rechtliche Sender": 2,
    "Allgemeine Sender": 2,
    Nachrichten: 2,
    Sport: 2,
    "Filme & Serien": 2,
    Kinder: 1,
    Dokumentationen: 1,
  };

  for (const category of preferredOrder) {
    const target = preferredTargets[category] ?? 0;
    if (target === 0) {
      continue;
    }

    const group = groups.find((item) => item.category === category);
    if (!group) {
      continue;
    }

    for (const channel of group.channels) {
      if (selected.length >= limit) {
        break;
      }

      if (selectedNames.has(channel.name)) {
        continue;
      }

      const alreadyFromCategory = selected.filter((item) => item.category === category).length;
      if (alreadyFromCategory >= target) {
        break;
      }

      selected.push(channel);
      selectedNames.add(channel.name);
    }
  }

  if (selected.length < limit) {
    for (const channel of channels) {
      if (selected.length >= limit) {
        break;
      }

      if (selectedNames.has(channel.name)) {
        continue;
      }

      selected.push(channel);
      selectedNames.add(channel.name);
    }
  }

  return selected;
}

export function countryMatchesQuery(entry: SenderSearchIndexEntry | SenderCountryMeta, query: string) {
  if (!query) {
    return true;
  }

  const haystack = normalizeSearchValue(
    [
      entry.name,
      entry.region,
      entry.categories.join(" "),
      "channels" in entry ? entry.channels.join(" ") : "",
    ].join(" "),
  );

  return haystack.includes(query);
}

export function getMatchingChannelNames(channels: string[], query: string) {
  if (!query) {
    return new Set<string>();
  }

  return new Set(
    channels.filter((channel) => normalizeSearchValue(channel).includes(query)),
  );
}

export async function loadCountryData(id: string): Promise<SenderCountryData> {
  const response = await fetch(`/data/senderliste/${id}.json`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Senderdaten für ${id} konnten nicht geladen werden.`);
  }

  return response.json() as Promise<SenderCountryData>;
}
