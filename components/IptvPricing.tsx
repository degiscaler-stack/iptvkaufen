"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { TrackedAnchor } from "@/components/TrackedLink";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import {
  buildWhatsAppUrl,
  WHATSAPP_MESSAGES,
  WHATSAPP_PHONE_DISPLAY,
  WHATSAPP_SUPPORT_LABEL,
} from "@/lib/contact";
import { IPTV_PACKAGE_FEATURES, IPTV_PACKAGES } from "@/lib/pricing";

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-[#AFFF00]" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="m4.5 10.3 3.3 3.2 7.7-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({
  number,
  highlighted,
}: {
  number: string;
  highlighted: boolean;
}) {
  return (
    <div
      className={
        highlighted
          ? "flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#AFFF00]/85 bg-[#AFFF00]/8 shadow-[0_0_6px_rgba(175,255,0,0.09)]"
          : "flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#AFFF00]/68 bg-[#AFFF00]/5 shadow-[0_0_4px_rgba(175,255,0,0.06)]"
      }
    >
      <svg className="h-9 w-9 text-[#AFFF00] sm:h-8 sm:w-8" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="8.5" y="9.5" width="23" height="22" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M8.5 16.5h23M14.5 7.5v5M25.5 7.5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <text
          x="20"
          y="26.5"
          textAnchor="middle"
          className="fill-[#AFFF00] text-[10px] font-semibold tracking-[-0.08em]"
        >
          {number}
        </text>
      </svg>
    </div>
  );
}

const reassurancePoints = [
  "Sichere Bestellung",
  "Zugangsdaten per E-Mail oder WhatsApp",
  "Schnelle Aktivierung nach Zahlungseingang",
  "Hilfe bei der Einrichtung",
  "Deutschsprachiger Support",
  "30 Tage Geld-zurück-Garantie",
] as const;

export default function IptvPricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          trackEvent(ANALYTICS_EVENTS.pricingSectionView, undefined, {
            onceKey: "pricing_section_view",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="preise"
      aria-labelledby="iptv-pricing-heading"
      className="relative isolate scroll-mt-28 overflow-hidden bg-[#000000] px-5 pb-12 pt-4 sm:px-8 sm:pb-14 sm:pt-5 lg:px-0 lg:pb-16 lg:pt-6"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mb-4 sm:text-[11px]">
            IPTV KAUFEN PAKETE
          </p>
          <h2
            id="iptv-pricing-heading"
            className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.65rem] lg:text-[3rem]"
          >
            Wählen Sie Ihr{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              IPTV Paket
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[720px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Flexible IPTV Pakete für jeden Bedarf – sofort aktiv, stabil und kompatibel mit allen Geräten.
          </p>
        </div>

        <div className="mx-auto mt-6 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-1 rounded-full border border-[#A6FF00]/20 bg-[#0A0F0A]/82 px-3 py-1.5 text-center text-[11px] font-medium leading-5 text-[#F5F5F5]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:mt-7 sm:px-3.5 sm:text-[12px]">
          <span className="tracking-[0.06em] text-[#FFD84D]" aria-label="5 Sterne">
            ★★★★★
          </span>
          <span>
            4,9/5 · <span className="text-[#A6FF00]">1150+ Bewertungen</span> · Schnell & sicher
          </span>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1240px] gap-7 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:items-stretch lg:gap-5">
          {IPTV_PACKAGES.map((item) => (
            <article
              key={item.id}
              data-package={item.id}
              className={
                item.highlighted
                  ? "group relative mx-auto h-full w-[calc(100vw-48px)] max-w-[340px] rounded-[22px] bg-[linear-gradient(135deg,#AFFF00_0%,#7DFF00_100%)] p-[0.75px] shadow-[0_0_3px_rgba(175,255,0,0.05),0_14px_32px_rgba(0,0,0,0.36)] transition duration-500 ease-out hover:shadow-[0_0_5px_rgba(175,255,0,0.08),0_18px_38px_rgba(0,0,0,0.4)] sm:w-full sm:max-w-none sm:p-px sm:shadow-[0_0_5px_rgba(175,255,0,0.08),0_18px_42px_rgba(0,0,0,0.4)] sm:hover:shadow-[0_0_8px_rgba(175,255,0,0.11),0_22px_52px_rgba(0,0,0,0.44)]"
                  : "group relative mx-auto h-full w-[calc(100vw-48px)] max-w-[340px] rounded-[22px] bg-[linear-gradient(135deg,#AFFF00_0%,#7DFF00_100%)] p-[0.75px] shadow-[0_0_2px_rgba(175,255,0,0.025),0_12px_30px_rgba(0,0,0,0.3)] transition duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_3px_rgba(175,255,0,0.04),0_16px_36px_rgba(0,0,0,0.34)] sm:w-full sm:max-w-none sm:p-px sm:shadow-[0_0_3px_rgba(175,255,0,0.04),0_16px_38px_rgba(0,0,0,0.34)] sm:hover:-translate-y-1 sm:hover:shadow-[0_0_5px_rgba(175,255,0,0.07),0_20px_48px_rgba(0,0,0,0.38)]"
              }
            >
              <div
                className={
                  item.highlighted
                    ? "relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-[21px] bg-[radial-gradient(circle_at_50%_0%,rgba(175,255,0,0.11),transparent_40%),linear-gradient(160deg,rgba(15,26,11,0.98)_0%,rgba(8,13,8,1)_54%,rgba(3,7,5,1)_100%)] px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:min-h-[512px] sm:px-5 sm:py-6 lg:px-6"
                    : "relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-[21px] bg-[radial-gradient(circle_at_50%_0%,rgba(175,255,0,0.045),transparent_40%),linear-gradient(160deg,rgba(13,19,10,0.98)_0%,rgba(7,11,8,1)_56%,rgba(3,6,5,1)_100%)] px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.065)] sm:min-h-[512px] sm:px-5 sm:py-6 lg:px-6"
                }
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#AFFF00]/45 to-transparent" />

                <div className={item.badge ? "mb-5 flex h-5 items-center justify-center sm:mb-2.5 sm:h-[24px]" : "mb-1 flex h-5 items-center justify-center sm:mb-2.5 sm:h-[24px]"}>
                  {item.badge ? (
                    <span className="inline-flex whitespace-nowrap rounded-full bg-[#AFFF00] px-3.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#050505] shadow-[0_0_6px_rgba(175,255,0,0.12)]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>

                <div className="flex justify-center">
                  <CalendarIcon number={item.iconNumber} highlighted={item.highlighted} />
                </div>

                <h3 className="mt-2.5 text-center text-[1.18rem] font-semibold leading-tight tracking-[-0.025em] text-[#F5F5F5] sm:mt-4 sm:text-[1.3rem]">
                  {item.duration}
                </h3>

                <div className="mx-auto mt-2.5 h-px w-16 rounded-full bg-[#AFFF00]/90 shadow-[0_0_4px_rgba(175,255,0,0.1)] sm:mt-3" />

                <p className="mt-3 flex h-12 items-end justify-center sm:mt-4 sm:h-[54px]">
                  <span
                    className={
                      item.highlighted
                        ? "text-[2.88rem] font-semibold leading-none tracking-[-0.055em] text-[#AFFF00] [text-shadow:0_0_4px_rgba(175,255,0,0.1)] sm:text-[3.02rem]"
                        : "text-[2.48rem] font-semibold leading-none tracking-[-0.045em] text-[#F5F5F5] sm:text-[2.64rem]"
                    }
                  >
                    {item.price}
                  </span>
                </p>

                <p className="mx-auto mt-2.5 h-[3.85rem] w-full max-w-[250px] text-left text-[13.5px] font-normal leading-[1.55] text-[#F5F5F5]/80 sm:mt-3.5 sm:h-[4.75rem] sm:max-w-[215px] sm:text-[14px] sm:leading-[1.7]">
                  {item.description}
                </p>

                <ul className="mx-auto mb-5 mt-1.5 w-full max-w-[250px] space-y-1.5 text-left text-[13px] font-normal leading-snug text-[#F5F5F5]/88 sm:mb-9 sm:mt-4 sm:max-w-[215px] sm:space-y-2.5">
                  {IPTV_PACKAGE_FEATURES.map((feature) => (
                    <li key={feature} className="grid grid-cols-[15px_1fr] items-center gap-2.5 sm:gap-3">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <TrackedAnchor
                  href={buildWhatsAppUrl(item.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  analyticsEvent={item.analyticsEvent}
                  analyticsParams={{ package: item.id }}
                  alsoTrackCheckout
                  data-analytics={item.analyticsEvent}
                  data-package={item.id}
                  className={
                    item.highlighted
                      ? "mx-auto mt-auto inline-flex min-h-9 w-full max-w-[270px] items-center justify-center rounded-full bg-[#AFFF00] px-3 py-2 text-center text-[10.5px] font-semibold uppercase tracking-[0.08em] !text-[#050505] shadow-[0_0_4px_rgba(175,255,0,0.09)] transition duration-300 hover:-translate-y-1 hover:bg-[#B8FF4D] hover:shadow-[0_0_6px_rgba(175,255,0,0.14)] sm:min-h-11 sm:max-w-none sm:px-4 sm:text-[11px] sm:tracking-[0.1em] sm:shadow-[0_0_6px_rgba(175,255,0,0.12)] sm:hover:shadow-[0_0_9px_rgba(175,255,0,0.18)]"
                      : "mx-auto mt-auto inline-flex min-h-9 w-full max-w-[270px] items-center justify-center rounded-full bg-[#AFFF00] px-3 py-2 text-center text-[10.5px] font-semibold uppercase tracking-[0.08em] !text-[#050505] shadow-[0_0_3px_rgba(175,255,0,0.06)] transition duration-300 hover:-translate-y-1 hover:bg-[#B8FF4D] hover:shadow-[0_0_5px_rgba(175,255,0,0.1)] sm:min-h-11 sm:max-w-none sm:px-4 sm:text-[11px] sm:tracking-[0.1em] sm:shadow-[0_0_4px_rgba(175,255,0,0.08)] sm:hover:shadow-[0_0_7px_rgba(175,255,0,0.12)]"
                  }
                >
                  {item.buttonLabel}
                </TrackedAnchor>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-[820px] rounded-[20px] border border-[#A6FF00]/18 bg-[#0A0F0A]/82 p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:mt-10 sm:p-5">
          <p className="text-[15px] font-semibold text-[#F5F5F5] sm:text-[16px]">Noch unsicher?</p>
          <p className="mt-2 text-[14px] leading-6 text-[#E6E6E6]/86 sm:text-[15px]">
            Testen Sie unseren IPTV-Service 24 Stunden für nur 3€.
          </p>
          <TrackedAnchor
            href={buildWhatsAppUrl(WHATSAPP_MESSAGES.trial24h)}
            target="_blank"
            rel="noopener noreferrer"
            analyticsEvent={ANALYTICS_EVENTS.trial3EuroClick}
            alsoTrackCheckout
            data-analytics="trial_3_euro_click"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#A6FF00] px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.14em] !text-[#000000] shadow-[0_0_12px_rgba(166,255,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#B8FF4D] sm:px-6 sm:text-[12px]"
          >
            24H-TEST FÜR 3€ STARTEN
          </TrackedAnchor>
        </div>

        <div className="mx-auto mt-6 max-w-[920px] rounded-[20px] border border-[#1F1F1F]/90 bg-[#090909]/55 p-4 sm:mt-8 sm:p-5">
          <h3 className="text-center text-[14px] font-bold uppercase tracking-[0.14em] text-[#A6FF00] sm:text-[15px]">
            So geht es nach der Bestellung weiter
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
            {reassurancePoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 rounded-[14px] border border-[#1F1F1F]/80 bg-[#080808]/70 px-3 py-2.5 text-left text-[13px] leading-5 text-[#F5F5F5]/88 sm:text-[14px]"
              >
                <CheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-6 max-w-[820px] rounded-[20px] border border-[#A6FF00]/16 bg-[#0A0F0A]/78 p-4 text-center sm:mt-8 sm:p-5">
          <h3 className="text-[15px] font-bold text-[#F5F5F5] sm:text-[16px]">30 Tage Geld-zurück-Garantie</h3>
          <p className="mt-2 text-[14px] leading-6 text-[#E6E6E6]/86 sm:text-[15px]">
            Wenn Sie mit dem Service nicht zufrieden sind, können Sie innerhalb von 30 Tagen nach dem Kauf eine
            Rückerstattung beantragen – gemäß unserer Rückerstattungsrichtlinie.
          </p>
          <Link
            href="/rueckerstattung"
            className="mt-3 inline-flex text-[13px] font-semibold text-[#A6FF00] underline decoration-[#A6FF00]/35 underline-offset-4 transition duration-300 hover:text-[#B8FF4D] sm:text-[14px]"
          >
            Rückerstattungsrichtlinie ansehen
          </Link>
        </div>

        <div className="mx-auto mt-6 max-w-[820px] rounded-[20px] border border-[#1F1F1F]/90 bg-[#090909]/55 p-4 text-center sm:mt-8 sm:p-5">
          <p className="text-[14px] font-semibold text-[#F5F5F5] sm:text-[15px]">Fragen vor dem Kauf?</p>
          <p className="mt-1 text-[12px] text-[#F5F5F5]/62 sm:text-[13px]">
            {WHATSAPP_PHONE_DISPLAY} · {WHATSAPP_SUPPORT_LABEL}
          </p>
          <TrackedAnchor
            href={buildWhatsAppUrl(WHATSAPP_MESSAGES.packageHelp)}
            target="_blank"
            rel="noopener noreferrer"
            analyticsEvent={ANALYTICS_EVENTS.whatsappClick}
            analyticsParams={{ source: "pricing_support_cta" }}
            data-analytics="whatsapp_click"
            data-analytics-source="pricing_support_cta"
            className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#0A0F0A] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#F5F5F5] transition duration-300 hover:border-[#25D366] hover:text-[#25D366] sm:text-[13px]"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
            Auf WhatsApp schreiben
          </TrackedAnchor>
        </div>
      </div>
    </section>
  );
}
