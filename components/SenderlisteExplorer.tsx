"use client";

import Link from "next/link";
import type { CSSProperties, KeyboardEvent } from "react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import {
  buildSenderlisteCountryInquiryMessage,
  buildWhatsAppUrl,
  WHATSAPP_MESSAGES,
} from "@/lib/contact";
import { CTA_MOTION_DELAYS, ctaMotionStandardClass, ctaSolidGreenClass } from "@/lib/cta-motion";
import {
  getCachedCountryChannels,
  loadCatalogIndex,
  loadCountryChannels,
  loadPageSearchIndex,
} from "@/lib/senderliste/loader";
import { TOPIC_CATEGORIES } from "@/lib/senderliste/topics";
import type {
  CatalogChannel,
  CatalogCountryFile,
  PageSearchIndex,
  SenderCard,
  TopicChannel,
} from "@/lib/senderliste/types";
import { CHANNEL_BATCH_SIZE, INITIAL_CHANNEL_BATCH } from "@/lib/senderliste/types";
import {
  buildSenderCards,
  cardMatchesPageSearch,
  filterChannels,
  formatMatchCount,
  formatSenderCount,
  getMatchingChannelNames,
  groupChannelsByCategory,
  normalizeSearchValue,
} from "@/lib/senderliste/utils";

const MID_BANNER_AFTER = 32;

const whatsappLinkClass =
  "font-medium text-[#A6FF00] underline-offset-4 transition duration-300 hover:text-[#A6FF00] hover:underline focus:text-[#A6FF00] focus-visible:text-[#A6FF00] active:text-[#A6FF00] visited:text-[#A6FF00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]";

function formatCategoryCount(count: number) {
  return count === 1 ? "1 Kategorie gefunden" : `${count} Kategorien gefunden`;
}

type ChannelListItem = CatalogChannel | TopicChannel;

type OpenPanelProps = {
  card: SenderCard;
  channels: ChannelListItem[] | null;
  isLoading: boolean;
  loadError: boolean;
  pageQuery: string;
  panelId: string;
  onRetry: () => void;
};

function OpenCountryPanel({
  card,
  channels,
  isLoading,
  loadError,
  pageQuery,
  panelId,
  onRetry,
}: OpenPanelProps) {
  const [localQuery, setLocalQuery] = useState(pageQuery);
  const [visibleCount, setVisibleCount] = useState(INITIAL_CHANNEL_BATCH);
  const panelTopRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const localSearchTrackedRef = useRef(false);

  useEffect(() => {
    setLocalQuery(pageQuery);
    setVisibleCount(INITIAL_CHANNEL_BATCH);
    localSearchTrackedRef.current = false;
  }, [card.id, pageQuery]);

  const allChannels = channels ?? [];
  const filteredChannels = useMemo(
    () => filterChannels(allChannels, localQuery),
    [allChannels, localQuery],
  );
  const visibleChannels = filteredChannels.slice(0, visibleCount);
  const groupedChannels = useMemo(
    () => groupChannelsByCategory(visibleChannels),
    [visibleChannels],
  );
  const matchingNames = useMemo(
    () => getMatchingChannelNames(filteredChannels, localQuery || pageQuery),
    [filteredChannels, localQuery, pageQuery],
  );

  useEffect(() => {
    setVisibleCount(INITIAL_CHANNEL_BATCH);
  }, [localQuery]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || filteredChannels.length <= visibleCount) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisibleCount((current) =>
            Math.min(current + CHANNEL_BATCH_SIZE, filteredChannels.length),
          );
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredChannels.length, visibleCount, card.id, localQuery]);

  useEffect(() => {
    const query = localQuery.trim();
    if (!query || localSearchTrackedRef.current) {
      return;
    }

    localSearchTrackedRef.current = true;
    trackEvent(ANALYTICS_EVENTS.senderlisteCountrySearch, {
      country_code: card.countryCode ?? card.id,
      country_name: card.name,
      channel_count: card.channelCount,
      results_count: filteredChannels.length,
      search_term_length: query.length,
      page_path: "/senderliste",
    });
    trackEvent(ANALYTICS_EVENTS.senderlisteChannelResults, {
      country_code: card.countryCode ?? card.id,
      country_name: card.name,
      channel_count: card.channelCount,
      results_count: filteredChannels.length,
      search_term_length: query.length,
      page_path: "/senderliste",
    });
  }, [card.channelCount, card.countryCode, card.id, card.name, filteredChannels.length, localQuery]);

  const countryWhatsAppUrl = buildWhatsAppUrl(
    buildSenderlisteCountryInquiryMessage(card.name),
  );

  const handleWhatsAppRequest = (buttonLocation: string) => {
    trackEvent(ANALYTICS_EVENTS.senderlisteWhatsappRequest, {
      country_code: card.countryCode ?? card.id,
      country_name: card.name,
      channel_count: card.channelCount,
      page_path: "/senderliste",
      button_location: buttonLocation,
    });
    trackEvent(ANALYTICS_EVENTS.senderlisteChannelWhatsappClick, {
      country_name: card.name,
      region: card.region,
      channel_count: card.channelCount,
      page_path: "/senderliste",
      button_location: buttonLocation,
    });
  };

  const resultLabel = localQuery.trim()
    ? formatMatchCount(filteredChannels.length)
    : formatSenderCount(card.channelCount);

  return (
    <div
      id={panelId}
      ref={panelTopRef}
      className="border-t border-[#1F1F1F] px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
    >
      <h3 className="text-[15px] font-bold text-[#F5F5F5] sm:text-[16px]">
        Sender aus {card.name}
      </h3>
      <p className="mt-1 text-[13px] leading-6 text-[#E6E6E6]/78">
        Senderkatalog für {card.name}
      </p>
      <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[#A6FF00]/80">
        {resultLabel}
      </p>

      <div className="relative mt-4">
        <label htmlFor={`senderliste-country-search-${card.id}`} className="sr-only">
          Sender in {card.name} suchen
        </label>
        <input
          id={`senderliste-country-search-${card.id}`}
          type="search"
          value={localQuery}
          onChange={(event) => {
            localSearchTrackedRef.current = false;
            setLocalQuery(event.target.value);
          }}
          placeholder={`Sender in ${card.name} suchen...`}
          className="h-11 w-full rounded-xl border border-[#A6FF00]/24 bg-[#050806] px-4 pr-12 text-[14px] font-medium text-[#F5F5F5] outline-none transition duration-300 placeholder:text-[#F5F5F5]/42 focus:border-[#A6FF00]/70"
        />
        {localQuery ? (
          <button
            type="button"
            aria-label="Suche löschen"
            onClick={() => {
              setLocalQuery("");
              panelTopRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#A6FF00] transition duration-300 hover:bg-[#A6FF00]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]"
          >
            Suche löschen
          </button>
        ) : null}
      </div>

      {isLoading ? (
        <p className="mt-4 text-[13px] text-[#E6E6E6]/72">Senderkatalog wird geladen…</p>
      ) : null}

      {loadError ? (
        <div className="mt-4">
          <p className="text-[13px] text-[#E6E6E6]/82">
            Die Senderdaten konnten nicht geladen werden.
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#A6FF00] transition duration-300 hover:text-[#B8FF4D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]"
          >
            Erneut versuchen
          </button>
        </div>
      ) : null}

      {channels ? (
        <>
          {groupedChannels.length > 0 ? (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groupedChannels.map((group) => (
                <section key={group.category} className="min-w-0">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A6FF00]/88">
                    {group.category}
                  </h4>
                  <ul className="mt-2.5 grid gap-1.5">
                    {group.channels.map((channel) => {
                      const isMatch = matchingNames.has(channel.name);
                      const key =
                        "id" in channel ? channel.id : `${card.id}-${channel.name}`;

                      return (
                        <li
                          key={key}
                          className="flex min-w-0 gap-2.5 text-[13px] leading-6 text-[#E6E6E6]/82"
                        >
                          <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00]" />
                          <span
                            className={`min-w-0 break-words ${
                              isMatch
                                ? "rounded-sm bg-[#A6FF00]/16 px-1 font-semibold text-[#F5F5F5]"
                                : ""
                            }`}
                          >
                            {channel.name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[13px] text-[#E6E6E6]/72">Keine passenden Sender gefunden.</p>
          )}

          {visibleCount < filteredChannels.length ? (
            <div ref={sentinelRef} className="mt-4 h-8" aria-hidden="true" />
          ) : null}

          {filteredChannels.length > INITIAL_CHANNEL_BATCH ? (
            <p className="mt-3 text-[12px] text-[#E6E6E6]/58">
              {Math.min(visibleCount, filteredChannels.length)} von {filteredChannels.length}{" "}
              Sendern geladen
            </p>
          ) : null}

          <p className="mt-5 text-[12px] leading-6 text-[#E6E6E6]/68">
            Die Senderauswahl kann je nach Paket, Region und technischer Aktualisierung variieren.
            Sie suchen einen bestimmten Sender? Fragen Sie uns{" "}
            <a
              href={countryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={whatsappLinkClass}
              onClick={() => handleWhatsAppRequest("senderliste_availability_notice")}
            >
              über WhatsApp
            </a>
            .
          </p>

          <div className="mt-5 border-t border-[#1F1F1F] pt-4">
            <p className="text-[13px] text-[#E6E6E6]/78">Fehlt ein bestimmter Sender?</p>
            <a
              href={countryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center rounded-full border border-[#A6FF00]/35 px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#A6FF00] transition duration-300 hover:border-[#A6FF00]/60 hover:bg-[#A6FF00]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00] sm:text-[12px]"
              onClick={() => handleWhatsAppRequest("senderliste_country_whatsapp")}
            >
              SENDER ÜBER WHATSAPP ANFRAGEN
            </a>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default function SenderlisteExplorer() {
  const [cards, setCards] = useState<SenderCard[]>([]);
  const [pageSearchIndex, setPageSearchIndex] = useState<PageSearchIndex | null>(null);
  const [indexError, setIndexError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [countryDataMap, setCountryDataMap] = useState<Record<string, CatalogCountryFile>>({});
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});
  const [errorIds, setErrorIds] = useState<Record<string, boolean>>({});
  const whatsappInquiryUrl = buildWhatsAppUrl(WHATSAPP_MESSAGES.senderlisteInquiry);
  const noResultsTrackedRef = useRef(false);
  const globalSearchTrackedLengthRef = useRef(0);

  useEffect(() => {
    let active = true;

    Promise.all([loadCatalogIndex(), loadPageSearchIndex()])
      .then(([index, searchIndex]) => {
        if (!active) {
          return;
        }

        setCards(buildSenderCards(index));
        setPageSearchIndex(searchIndex);
      })
      .catch(() => {
        if (active) {
          setIndexError(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const searchQuery = normalizeSearchValue(searchTerm.trim());

  const filteredCards = useMemo(() => {
    return cards
      .map((card) => {
        const result = cardMatchesPageSearch(card, searchTerm, pageSearchIndex);
        return { card, ...result };
      })
      .filter((item) => item.matches);
  }, [cards, pageSearchIndex, searchTerm]);

  useEffect(() => {
    if (openId !== null && !filteredCards.some(({ card }) => card.id === openId)) {
      setOpenId(null);
    }
  }, [filteredCards, openId]);

  useEffect(() => {
    const query = searchTerm.trim();

    if (!query) {
      noResultsTrackedRef.current = false;
      globalSearchTrackedLengthRef.current = 0;
      return;
    }

    if (globalSearchTrackedLengthRef.current !== query.length) {
      globalSearchTrackedLengthRef.current = query.length;
      trackEvent(ANALYTICS_EVENTS.senderlisteGlobalSearch, {
        search_term_length: query.length,
        results_count: filteredCards.length,
        page_path: "/senderliste",
      });
      trackEvent(ANALYTICS_EVENTS.senderlisteSearch, {
        search_term_length: query.length,
        page_path: "/senderliste",
        button_location: "senderliste_search",
      });
    }
  }, [filteredCards.length, searchTerm]);

  useEffect(() => {
    const query = searchTerm.trim();
    const hasResults = filteredCards.length > 0;

    if (query && !hasResults && !noResultsTrackedRef.current) {
      noResultsTrackedRef.current = true;
      trackEvent(ANALYTICS_EVENTS.senderlisteZeroResults, {
        search_term_length: query.length,
        page_path: "/senderliste",
      });
      trackEvent(ANALYTICS_EVENTS.senderlisteNoResults, {
        search_term_length: query.length,
        page_path: "/senderliste",
        button_location: "senderliste_search",
      });
    }

    if (hasResults || !query) {
      noResultsTrackedRef.current = false;
    }
  }, [filteredCards.length, searchTerm]);

  const loadCountry = async (code: string, options?: { force?: boolean }) => {
    const normalized = code.toLowerCase();

    if (!options?.force && (countryDataMap[normalized] || loadingIds[normalized])) {
      return;
    }

    setLoadingIds((current) => ({ ...current, [normalized]: true }));
    setErrorIds((current) => ({ ...current, [normalized]: false }));

    try {
      const data = await loadCountryChannels(normalized);
      setCountryDataMap((current) => ({ ...current, [normalized]: data }));
    } catch {
      setErrorIds((current) => ({ ...current, [normalized]: true }));
    } finally {
      setLoadingIds((current) => ({ ...current, [normalized]: false }));
    }
  };

  const handleWhatsAppClick = (buttonLocation: string) => {
    trackEvent(ANALYTICS_EVENTS.senderlisteWhatsappClick, {
      page_path: "/senderliste",
      button_location: buttonLocation,
    });
  };

  const toggleCard = (card: SenderCard) => {
    setOpenId((current) => {
      if (current === card.id) {
        trackEvent(ANALYTICS_EVENTS.senderlisteCountryClose, {
          country_code: card.countryCode ?? card.id,
          country_name: card.name,
          channel_count: card.channelCount,
          page_path: "/senderliste",
          button_location: "senderliste_category",
        });
        return null;
      }

      if (current) {
        const previous = cards.find((item) => item.id === current);
        if (previous) {
          trackEvent(ANALYTICS_EVENTS.senderlisteCountryClose, {
            country_code: previous.countryCode ?? previous.id,
            country_name: previous.name,
            channel_count: previous.channelCount,
            page_path: "/senderliste",
            button_location: "senderliste_category",
          });
        }
      }

      trackEvent(ANALYTICS_EVENTS.senderlisteCountryOpen, {
        country_code: card.countryCode ?? card.id,
        country_name: card.name,
        channel_count: card.channelCount,
        page_path: "/senderliste",
        button_location: "senderliste_category",
      });
      trackEvent(ANALYTICS_EVENTS.senderlisteCategoryOpen, {
        category_name: card.name,
        category_group: card.region,
        page_path: "/senderliste",
        button_location: "senderliste_category",
      });

      if (card.kind === "country" && card.countryCode) {
        void loadCountry(card.countryCode);
      }

      return card.id;
    });
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>, card: SenderCard) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard(card);
    }
  };

  const getOpenChannels = (card: SenderCard): ChannelListItem[] | null => {
    if (card.kind === "topic") {
      const topic = TOPIC_CATEGORIES.find((item) => item.id === card.id);
      return topic?.channels ?? [];
    }

    const code = card.countryCode ?? card.id;
    return countryDataMap[code]?.channels ?? getCachedCountryChannels(code)?.channels ?? null;
  };

  const renderMidBanner = () => (
    <div
      key="senderliste-mid-banner"
      className="col-span-full my-3 rounded-[24px] border border-[#A6FF00]/28 bg-[linear-gradient(180deg,#071006_0%,#030503_100%)] p-6 text-center shadow-[0_20px_56px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-8"
    >
      <h2 className="text-[1.35rem] font-black leading-tight tracking-[-0.04em] text-[#F5F5F5] sm:text-[1.75rem]">
        Über 22.000 Sender, Filme und Serien verfügbar
      </h2>
      <p className="mx-auto mt-3 max-w-[680px] text-[14px] leading-7 text-[#E6E6E6]/84 sm:text-[15px]">
        Wählen Sie jetzt das passende IPTV-Paket und genießen Sie Ihre Lieblingsinhalte auf allen
        kompatiblen Geräten.
      </p>
      <Link
        href="/#preise"
        className={`${ctaMotionStandardClass} ${ctaSolidGreenClass} mt-5 inline-flex items-center justify-center rounded-full bg-[#A6FF00] px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.12em] hover:bg-[#B8FF4D] sm:text-[13px]`}
        style={{ "--cta-motion-delay": CTA_MOTION_DELAYS.senderlisteMid } as CSSProperties}
        onClick={() => {
          trackEvent(ANALYTICS_EVENTS.senderlisteMidCtaClick, {
            page_path: "/senderliste",
            button_location: "senderliste_mid_banner",
          });
        }}
      >
        JETZT IPTV PAKET WÄHLEN
      </Link>
      <p className="mt-4 text-[13px] leading-6 text-[#E6E6E6]/78 sm:text-[14px]">
        Sie suchen einen bestimmten Sender?{" "}
        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={whatsappLinkClass}
          onClick={() => handleWhatsAppClick("senderliste_mid_banner_whatsapp")}
        >
          Über WhatsApp nachfragen
        </a>
      </p>
    </div>
  );

  return (
    <section className="bg-[#000000] px-5 pb-14 pt-4 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-5 lg:px-0 lg:pb-20">
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="sticky top-[76px] z-40 -mx-5 border-b border-[#1F1F1F]/80 bg-[#000000]/96 px-5 pb-4 pt-2 backdrop-blur-sm sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:backdrop-blur-none">
          <div className="mx-auto max-w-[760px]">
            <label htmlFor="senderliste-search" className="sr-only">
              Land, Sender oder Kategorie suchen
            </label>
            <div className="relative">
              <input
                id="senderliste-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Land, Sender oder Kategorie suchen..."
                className="h-14 w-full rounded-2xl border border-[#A6FF00]/28 bg-[#050806] px-5 pr-12 text-[15px] font-medium text-[#F5F5F5] outline-none shadow-[0_18px_42px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-300 placeholder:text-[#F5F5F5]/42 focus:border-[#A6FF00]/70"
              />
              {searchTerm ? (
                <button
                  type="button"
                  aria-label="Suche löschen"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[18px] leading-none text-[#F5F5F5]/62 transition duration-300 hover:bg-[#111111] hover:text-[#A6FF00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]"
                >
                  ×
                </button>
              ) : null}
            </div>
            <p className="mt-3 text-center text-[13px] leading-6 text-[#E6E6E6]/78 sm:text-[14px]">
              Die Senderliste wird regelmäßig aktualisiert. Sie suchen einen bestimmten Sender?{" "}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={whatsappLinkClass}
                onClick={() => handleWhatsAppClick("senderliste_search_whatsapp")}
              >
                Über WhatsApp nachfragen
              </a>
            </p>
            <p className="mt-2 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-[#F5F5F5]/52">
              {formatCategoryCount(filteredCards.length)}
            </p>
          </div>
        </div>

        {indexError ? (
          <div className="mt-8 rounded-[22px] border border-[#A6FF00]/20 bg-[#050806] p-6 text-center sm:p-8">
            <p className="text-[16px] font-bold text-[#F5F5F5]">
              Der Senderkatalog konnte nicht geladen werden.
            </p>
          </div>
        ) : null}

        {!indexError && cards.length === 0 ? (
          <p className="mt-8 text-center text-[14px] text-[#E6E6E6]/72">Senderkatalog wird geladen…</p>
        ) : null}

        {filteredCards.length > 0 ? (
          <div className="mt-6 grid items-start gap-3 md:grid-cols-2 md:gap-3.5 lg:grid-cols-4 lg:gap-3.5">
            {filteredCards.map(({ card, matchCount }, listIndex) => {
              const isOpen = openId === card.id;
              const panelId = `sender-category-${card.id}`;
              const showMatchCount = Boolean(searchQuery) && matchCount !== card.channelCount;

              return (
                <Fragment key={card.id}>
                  {listIndex === MID_BANNER_AFTER ? renderMidBanner() : null}
                  <article
                    className={`overflow-hidden rounded-[22px] border bg-[#050806] shadow-[0_18px_48px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-300 ${
                      isOpen
                        ? "col-span-full border-[#A6FF00]/52 bg-[#060a07]"
                        : "border-[#A6FF00]/20 hover:border-[#A6FF00]/42 hover:bg-[#060907]"
                    }`}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleCard(card)}
                      onKeyDown={(event) => handleCardKeyDown(event, card)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left sm:px-5 sm:py-4"
                    >
                      <span className="min-w-0">
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#A6FF00]/78">
                          {card.region}
                        </span>
                        <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span className="truncate text-[15px] font-bold text-[#F5F5F5] sm:text-[16px]">
                            {card.name}
                          </span>
                          <span className="shrink-0 text-[11px] font-medium text-[#F5F5F5]/48">
                            {formatSenderCount(card.channelCount)}
                          </span>
                          {showMatchCount ? (
                            <span className="shrink-0 text-[11px] font-medium text-[#A6FF00]/75">
                              {matchCount} Treffer
                            </span>
                          ) : null}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#A6FF00]/28 bg-[#A6FF00]/8 text-[20px] font-light leading-none text-[#A6FF00] transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </div>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        {isOpen ? (
                          <OpenCountryPanel
                            card={card}
                            channels={getOpenChannels(card)}
                            isLoading={Boolean(
                              card.kind === "country" &&
                                card.countryCode &&
                                loadingIds[card.countryCode],
                            )}
                            loadError={Boolean(
                              card.kind === "country" &&
                                card.countryCode &&
                                errorIds[card.countryCode],
                            )}
                            pageQuery={searchTerm}
                            panelId={panelId}
                            onRetry={() => {
                              if (card.countryCode) {
                                void loadCountry(card.countryCode, { force: true });
                              }
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Fragment>
              );
            })}
            {filteredCards.length <= MID_BANNER_AFTER ? renderMidBanner() : null}
          </div>
        ) : cards.length > 0 ? (
          <div className="mt-8 rounded-[22px] border border-[#A6FF00]/20 bg-[#050806] p-6 text-center sm:p-8">
            <p className="text-[16px] font-bold text-[#F5F5F5]">Keine passende Kategorie gefunden.</p>
            <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-7 text-[#E6E6E6]/82">
              Fragen Sie uns über WhatsApp, ob Ihr gewünschter Sender verfügbar ist.
            </p>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${whatsappLinkClass} mt-4 inline-block text-[14px]`}
              onClick={() => handleWhatsAppClick("senderliste_no_results")}
            >
              Sender über WhatsApp anfragen
            </a>
          </div>
        ) : null}

        <p className="mx-auto mt-10 max-w-[920px] text-center text-[12px] font-medium tracking-[0.02em] text-[#F5F5F5]/62 sm:text-[13px]">
          22.000+ Sender · Regelmäßig aktualisiert · Alle Geräte · Support auf Deutsch
        </p>

        <div className="mx-auto mt-6 max-w-[920px] rounded-[28px] border border-[#A6FF00]/28 bg-[linear-gradient(180deg,#071006_0%,#030503_100%)] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-8 lg:p-10">
          <h2 className="text-[1.75rem] font-black leading-tight tracking-[-0.045em] text-[#F5F5F5] sm:text-[2.35rem]">
            Nicht gefunden, was Sie suchen?
          </h2>
          <p className="mx-auto mt-4 max-w-[720px] text-[14px] leading-7 text-[#E6E6E6]/84 sm:text-[15px]">
            Unsere IPTV Senderliste umfasst zahlreiche internationale Sender und wird regelmäßig
            aktualisiert. Fragen Sie uns über WhatsApp nach einem bestimmten Sender oder wählen Sie
            direkt ein passendes Paket.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/#preise"
              className={`${ctaMotionStandardClass} ${ctaSolidGreenClass} inline-flex items-center justify-center rounded-full bg-[#A6FF00] px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.12em] hover:bg-[#B8FF4D] sm:text-[13px]`}
              style={{ "--cta-motion-delay": CTA_MOTION_DELAYS.senderlisteBottom } as CSSProperties}
              onClick={() => {
                trackEvent(ANALYTICS_EVENTS.senderlisteBottomCtaClick, {
                  page_path: "/senderliste",
                  button_location: "senderliste_bottom_cta",
                });
              }}
            >
              JETZT PAKET AUSWÄHLEN
            </Link>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#A6FF00]/35 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#A6FF00] transition duration-300 hover:border-[#A6FF00]/60 hover:bg-[#A6FF00]/8 sm:text-[12px]"
              onClick={() => handleWhatsAppClick("senderliste_bottom_whatsapp")}
            >
              SENDER ÜBER WHATSAPP ANFRAGEN
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
