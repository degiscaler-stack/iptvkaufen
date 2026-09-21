import type { CSSProperties } from "react";
import Image from "next/image";
import PricingScrollLink from "@/components/PricingScrollLink";
import PurchaseIntentButton from "@/components/PurchaseIntentButton";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { CTA_MOTION_DELAYS, ctaMotionFeaturedClass, ctaSolidGreenClass } from "@/lib/cta-motion";

const trustBadges = ["Einfache Einrichtung", "Ultra HD & 4K", "Mehrere Geräte", "Sofortiger Zugang"];

export default function Hero() {
  return (
    <section
      id="iptv-kaufen"
      aria-label="IPTV kaufen in Deutschland"
      className="relative isolate flex min-h-0 items-center justify-center overflow-hidden bg-[#000000] px-5 pb-[clamp(1.5rem,3vh,2.5rem)] pt-[clamp(5.5rem,calc(4.5rem+3vh),9rem)] text-center sm:min-h-[clamp(620px,88vh,900px)] sm:px-8 lg:min-h-[clamp(740px,calc(88vh+110px),1040px)]"
    >
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <Image
          src="/images/iptv-kaufen-hero-football.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="h-full w-full scale-[1.02] object-cover object-[42%_center] sm:object-center lg:object-[center_58%]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.22)_0%,rgba(5,5,5,0.42)_48%,rgba(5,5,5,0.78)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.08)_42%,rgba(5,5,5,0.62)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#000000] to-transparent" />
      <div
        aria-hidden="true"
        className="hero-shine pointer-events-none absolute inset-y-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-2xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[950px] py-[clamp(0.25rem,1.5vh,1rem)]">
        <p className="hero-fade-up hero-fade-up-1 mx-auto mb-[18px] inline-flex rounded-full border border-[#A6FF00]/30 bg-[#111111]/70 px-4 py-[9px] text-[11px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] [text-shadow:0_2px_20px_rgba(0,0,0,0.45)] sm:mb-5 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em]">
          Premium IPTV Deutschland
        </p>

        <h1 className="hero-fade-up hero-fade-up-2 text-balance text-[clamp(2.25rem,4.2vw+1.1rem,5.25rem)] font-black leading-[0.95] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
          IPTV Kaufen in Deutschland
          <span className="mt-2 block bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none] sm:mt-3">
            Premium Streaming in Ultra HD
          </span>
        </h1>

        <p className="hero-fade-up hero-fade-up-3 mx-auto mt-[clamp(1rem,2.5vh,1.75rem)] max-w-[92%] text-pretty text-[clamp(0.9rem,0.35vw+0.8rem,1.25rem)] leading-[1.55] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.55)] sm:max-w-3xl sm:leading-8">
          Flexible IPTV-Pakete für verschiedene Geräte, einfache Einrichtung und deutschsprachigen Support.
        </p>

        <div className="hero-fade-up hero-fade-up-4 relative mt-[clamp(1.5rem,3vh,2.5rem)] flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <PricingScrollLink
            buttonLocation="hero"
            pagePath="/"
            data-analytics="pricing_scroll_click"
            data-analytics-source="hero"
            className={`${ctaMotionFeaturedClass} ${ctaSolidGreenClass} inline-flex min-h-11 w-[calc(100%_-_88px)] max-w-[285px] items-center justify-center rounded-full bg-[#A6FF00] px-[18px] py-2.5 text-center text-[11px] font-extrabold leading-none uppercase tracking-[0.10em] whitespace-nowrap sm:w-auto sm:min-h-0 sm:max-w-none sm:px-[22px] sm:py-3 sm:text-[13px] sm:tracking-[0.16em] [&_*]:flex [&_*]:items-center [&_*]:justify-center`}
            style={{ "--cta-motion-delay": CTA_MOTION_DELAYS.heroBuy } as CSSProperties}
          >
            JETZT IPTV KAUFEN
          </PricingScrollLink>
          <PurchaseIntentButton
            intent={{ kind: "TRIAL" }}
            analyticsEvent={ANALYTICS_EVENTS.heroTrialClick}
            analyticsParams={{
              source: "hero_secondary",
              button_location: "hero",
              price: 3,
              currency: "EUR",
              page_path: "/",
            }}
            alsoTrackTrial
            data-analytics="hero_trial_click"
            className={`${ctaMotionFeaturedClass} inline-flex min-h-11 w-max max-w-full min-w-0 items-center justify-center rounded-full border border-[#A6FF00]/35 bg-[#111111]/55 px-3 py-2.5 text-center !text-[15px] font-extrabold leading-none uppercase tracking-[0.10em] text-[#F5F5F5] whitespace-nowrap backdrop-blur-xl transition-[background-color,border-color,color] duration-300 hover:border-[#A6FF00] hover:bg-[#111111]/70 hover:text-[#A6FF00] sm:w-auto sm:min-h-0 sm:max-w-none sm:px-[22px] sm:py-3 sm:!text-[16px] sm:tracking-[0.16em]`}
            style={{ "--cta-motion-delay": CTA_MOTION_DELAYS.heroTrial } as CSSProperties}
          >
            24H-TEST FÜR 3€ STARTEN
          </PurchaseIntentButton>
        </div>

        <p className="hero-fade-up hero-fade-up-4 mt-3 text-[11px] font-medium tracking-[0.02em] text-[#F5F5F5]/78 sm:text-xs">
          Ab 9,99€ · 24h-Test für 3€ · 30 Tage Geld-zurück
        </p>

        <ul
          className="hero-fade-up hero-fade-up-5 mx-auto mt-[clamp(1.25rem,3.5vh,3.5rem)] grid max-w-[92%] grid-cols-2 gap-2 sm:max-w-3xl sm:grid-cols-4 sm:gap-2.5"
          aria-label="Vorteile von Premium IPTV"
        >
          {trustBadges.map((badge) => (
            <li
              key={badge}
              className="rounded-2xl border border-[#1F1F1F]/90 bg-[#111111]/48 px-3 py-2.5 text-[11px] font-medium text-[#F5F5F5]/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-md transition duration-300 hover:border-[#A6FF00]/45 hover:text-[#F5F5F5] sm:px-3 sm:py-2 sm:text-xs"
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
