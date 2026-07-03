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
import { COUNTRIES_META } from "@/lib/senderliste/generated/countries-meta";
import { SENDER_SEARCH_INDEX } from "@/lib/senderliste/generated/search-index";
import type {
  FilterChipId,
  SenderCountryData,
  SenderCountryMeta,
} from "@/lib/senderliste/types";
import { PREVIEW_CHANNEL_LIMIT } from "@/lib/senderliste/types";
import {
  buildChannelPreview,
  countryMatchesQuery,
  filterChannelsByChip,
  formatFilteredSenderCount,
  formatSenderCount,
  formatShowAllLabel,
  getAvailableFilterChips,
  getMatchingChannelNames,
  groupChannelsByCategory,
  loadCountryData,
  normalizeSearchValue,
} from "@/lib/senderliste/utils";

const MID_BANNER_AFTER = 32;

const whatsappLinkClass =
  "font-medium text-[#A6FF00] underline-offset-4 transition duration-300 hover:text-[#A6FF00] hover:underline focus:text-[#A6FF00] focus-visible:text-[#A6FF00] active:text-[#A6FF00] visited:text-[#A6FF00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]";

function formatCategoryCount(count: number) {
  if (count === 1) {
    return "1 Kategorie gefunden";
  }

  return `${count} Kategorien gefunden`;
}

type CountryPanelProps = {
  meta: SenderCountryMeta;
  data: SenderCountryData | null;
  isLoading: boolean;
  loadError: boolean;
  searchQuery: string;
  panelId: string;
  onRetry: () => void;
};

function CountryPanel({
  meta,
  data,
  isLoading,
  loadError,
  searchQuery,
  panelId,
  onRetry,
}: CountryPanelProps) {
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterChipId>("alle");
  const panelTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShowAll(false);
    setActiveFilter("alle");
  }, [meta.id]);

  const channels = data?.channels ?? [];
  const filteredChannels = useMemo(
    () => filterChannelsByChip(channels, activeFilter),
    [activeFilter, channels],
  );
  const previewChannels = useMemo(
    () => buildChannelPreview(filteredChannels, PREVIEW_CHANNEL_LIMIT),
    [filteredChannels],
  );
  const visibleChannels = showAll ? filteredChannels : previewChannels;
  const groupedChannels = useMemo(
    () => groupChannelsByCategory(visibleChannels),
    [visibleChannels],
  );
  const availableFilters = useMemo(
    () => getAvailableFilterChips(meta.categories),
    [meta.categories],
  );
  const matchingNames = useMemo(() => {
    if (!searchQuery || !data) {
      return new Set<string>();
    }

    return getMatchingChannelNames(
      data.channels.map((channel) => channel.name),
      searchQuery,
    );
  }, [data, searchQuery]);

  const totalCount = channels.length;
  const canExpand = filteredChannels.length > PREVIEW_CHANNEL_LIMIT;
  const countryWhatsAppUrl = buildWhatsAppUrl(buildSenderlisteCountryInquiryMessage(meta.name));

  const handleShowAllToggle = () => {
    if (showAll) {
      setShowAll(false);
      trackEvent(ANALYTICS_EVENTS.senderlisteShowLessChannels, {
        country_name: meta.name,
        region: meta.region,
        channel_count: totalCount,
        page_path: "/senderliste",
        button_location: "senderliste_show_less",
      });
      panelTopRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    setShowAll(true);
    trackEvent(ANALYTICS_EVENTS.senderlisteShowAllChannels, {
      country_name: meta.name,
      region: meta.region,
      channel_count: totalCount,
      page_path: "/senderliste",
      button_location: "senderliste_show_all",
    });
  };

  const handleFilterChange = (filterId: FilterChipId) => {
    setActiveFilter(filterId);
    setShowAll(filterId === "alle" ? false : true);
    trackEvent(ANALYTICS_EVENTS.senderlisteCategoryFilter, {
      country_name: meta.name,
      region: meta.region,
      category_name: filterId,
      channel_count: filterChannelsByChip(channels, filterId).length,
      page_path: "/senderliste",
      button_location: "senderliste_category_filter",
    });
  };

  const handleCountryWhatsAppClick = (buttonLocation: string) => {
    trackEvent(ANALYTICS_EVENTS.senderlisteChannelWhatsappClick, {
      country_name: meta.name,
      region: meta.region,
      channel_count: totalCount,
      page_path: "/senderliste",
      button_location: buttonLocation,
    });
  };

  return (
    <div
      id={panelId}
      ref={panelTopRef}
      className="border-t border-[#1F1F1F] px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
    >
      <h3 className="text-[15px] font-bold text-[#F5F5F5] sm:text-[16px]">
        Sender aus {meta.name}
      </h3>
      <p className="mt-1 text-[13px] leading-6 text-[#E6E6E6]/78">
        Eine Auswahl wichtiger Sender aus verschiedenen Bereichen.
      </p>
      <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[#A6FF00]/80">
        {showAll || activeFilter !== "alle"
          ? formatFilteredSenderCount(filteredChannels.length, activeFilter)
          : totalCount === 100
            ? "100 Sender aus verschiedenen Bereichen"
            : formatSenderCount(totalCount)}
      </p>

      {isLoading ? (
        <p className="mt-4 text-[13px] text-[#E6E6E6]/72">Sender werden geladen…</p>
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

      {data ? (
        <>
          {showAll && availableFilters.length > 1 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {availableFilters.map((chip) => {
                const isActive = activeFilter === chip.id;

                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => handleFilterChange(chip.id)}
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00] ${
                      isActive
                        ? "border-[#A6FF00] bg-[#A6FF00] text-[#041004]"
                        : "border-[#A6FF00]/28 bg-transparent text-[#A6FF00] hover:border-[#A6FF00]/55 hover:bg-[#A6FF00]/8"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          ) : null}

          {groupedChannels.length > 0 ? (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {groupedChannels.map((group) => (
                <section key={group.category} className="min-w-0">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A6FF00]/88">
                    {group.category}
                  </h4>
                  <ul className="mt-2.5 grid gap-1.5">
                    {group.channels.map((channel) => {
                      const isMatch = matchingNames.has(channel.name);

                      return (
                        <li
                          key={`${meta.id}-${channel.name}`}
                          className="flex min-w-0 gap-2.5 text-[13px] leading-6 text-[#E6E6E6]/82"
                        >
                          <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00]" />
                          <span
                            className={`min-w-0 break-words ${
                              isMatch ? "rounded-sm bg-[#A6FF00]/16 px-1 font-semibold text-[#F5F5F5]" : ""
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
            <p className="mt-4 text-[13px] text-[#E6E6E6]/72">
              Keine Sender in dieser Kategorie.
            </p>
          )}

          {canExpand || showAll ? (
            <div className="mt-5">
              <button
                type="button"
                onClick={handleShowAllToggle}
                className="inline-flex items-center justify-center rounded-full bg-[#A6FF00] px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#041004] transition duration-300 hover:bg-[#B8FF4D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00] sm:text-[12px]"
              >
                {showAll ? "WENIGER ANZEIGEN" : formatShowAllLabel(filteredChannels.length)}
              </button>
            </div>
          ) : null}

          <p className="mt-5 text-[12px] leading-6 text-[#E6E6E6]/68">
            Die Senderauswahl kann je nach Paket, Region und technischer Verfügbarkeit variieren.
            Fragen Sie uns bei einem bestimmten Sender{" "}
            <a
              href={countryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={whatsappLinkClass}
              onClick={() => handleCountryWhatsAppClick("senderliste_availability_notice")}
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
              onClick={() => handleCountryWhatsAppClick("senderliste_country_whatsapp")}
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
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [countryDataMap, setCountryDataMap] = useState<Record<string, SenderCountryData>>({});
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});
  const [errorIds, setErrorIds] = useState<Record<string, boolean>>({});
  const whatsappInquiryUrl = buildWhatsAppUrl(WHATSAPP_MESSAGES.senderlisteInquiry);
  const noResultsTrackedRef = useRef(false);
  const searchTrackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchQuery = normalizeSearchValue(searchTerm.trim());

  const filteredCategories = useMemo(() => {
    const metaById = new Map(COUNTRIES_META.map((item) => [item.id, item]));

    return SENDER_SEARCH_INDEX.countries
      .filter((entry) => countryMatchesQuery(entry, searchQuery))
      .flatMap((entry) => {
        const meta = metaById.get(entry.id);
        return meta ? [{ meta, entry }] : [];
      });
  }, [searchQuery]);

  useEffect(() => {
    if (openId !== null && !filteredCategories.some(({ meta }) => meta.id === openId)) {
      setOpenId(null);
    }
  }, [filteredCategories, openId]);

  useEffect(() => {
    const query = searchTerm.trim();

    if (searchTrackTimeoutRef.current) {
      clearTimeout(searchTrackTimeoutRef.current);
    }

    if (!query) {
      noResultsTrackedRef.current = false;
      return;
    }

    searchTrackTimeoutRef.current = setTimeout(() => {
      trackEvent(ANALYTICS_EVENTS.senderlisteChannelSearch, {
        search_term_length: query.length,
        page_path: "/senderliste",
        button_location: "senderliste_search",
      });
      trackEvent(ANALYTICS_EVENTS.senderlisteSearch, {
        search_term_length: query.length,
        page_path: "/senderliste",
        button_location: "senderliste_search",
      });
    }, 500);

    return () => {
      if (searchTrackTimeoutRef.current) {
        clearTimeout(searchTrackTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  useEffect(() => {
    const query = searchTerm.trim();
    const hasResults = filteredCategories.length > 0;

    if (query && !hasResults && !noResultsTrackedRef.current) {
      noResultsTrackedRef.current = true;
      trackEvent(ANALYTICS_EVENTS.senderlisteNoResults, {
        search_term_length: query.length,
        page_path: "/senderliste",
        button_location: "senderliste_search",
      });
    }

    if (hasResults || !query) {
      noResultsTrackedRef.current = false;
    }
  }, [filteredCategories.length, searchTerm]);

  const loadCountry = async (id: string, options?: { force?: boolean }) => {
    if (!options?.force && (countryDataMap[id] || loadingIds[id])) {
      return;
    }

    setLoadingIds((current) => ({ ...current, [id]: true }));
    setErrorIds((current) => ({ ...current, [id]: false }));

    try {
      const data = await loadCountryData(id);
      setCountryDataMap((current) => ({ ...current, [id]: data }));
    } catch {
      setErrorIds((current) => ({ ...current, [id]: true }));
    } finally {
      setLoadingIds((current) => ({ ...current, [id]: false }));
    }
  };

  const handleWhatsAppClick = (buttonLocation: string) => {
    trackEvent(ANALYTICS_EVENTS.senderlisteWhatsappClick, {
      page_path: "/senderliste",
      button_location: buttonLocation,
    });
  };

  const toggleCategory = (meta: SenderCountryMeta) => {
    setOpenId((current) => {
      if (current === meta.id) {
        trackEvent(ANALYTICS_EVENTS.senderlisteCountryClose, {
          country_name: meta.name,
          region: meta.region,
          channel_count: meta.channelCount,
          page_path: "/senderliste",
          button_location: "senderliste_category",
        });
        return null;
      }

      if (current) {
        const previous = COUNTRIES_META.find((item) => item.id === current);
        if (previous) {
          trackEvent(ANALYTICS_EVENTS.senderlisteCountryClose, {
            country_name: previous.name,
            region: previous.region,
            channel_count: previous.channelCount,
            page_path: "/senderliste",
            button_location: "senderliste_category",
          });
        }
      }

      trackEvent(ANALYTICS_EVENTS.senderlisteCountryOpen, {
        country_name: meta.name,
        region: meta.region,
        channel_count: meta.channelCount,
        page_path: "/senderliste",
        button_location: "senderliste_category",
      });
      trackEvent(ANALYTICS_EVENTS.senderlisteCategoryOpen, {
        category_name: meta.name,
        category_group: meta.region,
        page_path: "/senderliste",
        button_location: "senderliste_category",
      });

      void loadCountry(meta.id);
      return meta.id;
    });
  };

  const handleCategoryKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    meta: SenderCountryMeta,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCategory(meta);
    }
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
              {formatCategoryCount(filteredCategories.length)}
            </p>
          </div>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="mt-6 grid items-start gap-3 md:grid-cols-2 md:gap-3.5 lg:grid-cols-4 lg:gap-3.5">
            {filteredCategories.map(({ meta }, listIndex) => {
              const isOpen = openId === meta.id;
              const panelId = `sender-category-${meta.id}`;

              return (
                <Fragment key={meta.id}>
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
                      onClick={() => toggleCategory(meta)}
                      onKeyDown={(event) => handleCategoryKeyDown(event, meta)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left sm:px-5 sm:py-4"
                    >
                      <span className="min-w-0">
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#A6FF00]/78">
                          {meta.region}
                        </span>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate text-[15px] font-bold text-[#F5F5F5] sm:text-[16px]">
                            {meta.name}
                          </span>
                          <span className="shrink-0 text-[11px] font-medium text-[#F5F5F5]/48">
                            {formatSenderCount(meta.channelCount)}
                          </span>
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
                          <CountryPanel
                            meta={meta}
                            data={countryDataMap[meta.id] ?? null}
                            isLoading={Boolean(loadingIds[meta.id])}
                            loadError={Boolean(errorIds[meta.id])}
                            searchQuery={searchQuery}
                            panelId={panelId}
                            onRetry={() => {
                              void loadCountry(meta.id, { force: true });
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Fragment>
              );
            })}
            {filteredCategories.length <= MID_BANNER_AFTER ? renderMidBanner() : null}
          </div>
        ) : (
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
        )}

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
