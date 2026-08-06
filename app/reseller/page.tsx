import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  FaComments,
  FaCogs,
  FaHeadset,
  FaLayerGroup,
  FaStore,
  FaUserFriends,
  FaUserTie,
  FaWhatsapp,
} from "react-icons/fa";
import { HiOutlineBadgeCheck, HiOutlineOfficeBuilding, HiOutlineUserGroup } from "react-icons/hi";
import ResellerFaqAccordion from "@/components/reseller/ResellerFaqAccordion";
import ResellerPackageCards from "@/components/reseller/ResellerPackageCards";
import { TrackedAnchor } from "@/components/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { ctaMotionFeaturedClass, ctaSolidGreenClass } from "@/lib/cta-motion";
import {
  buildResellerServiceSchema,
  RESELLER_ADVANTAGES,
  RESELLER_CONSULTATION_WHATSAPP_URL,
  RESELLER_CREDIT_EXAMPLE,
  RESELLER_CREDIT_MAPPING,
  RESELLER_FAQ,
  RESELLER_HERO_TRUST,
  RESELLER_INTRO_BENEFITS,
  RESELLER_PAGE,
  RESELLER_PANEL_FEATURES,
  RESELLER_STEPS,
  RESELLER_TARGET_GROUPS,
} from "@/lib/reseller";
import {
  SITE_URL,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: RESELLER_PAGE.title,
  description: RESELLER_PAGE.description,
  path: RESELLER_PAGE.path,
  image: "/brand/iptv-kaufen-logo.webp",
  imageAlt: "iptvkaufenX IPTV Reseller Programm",
});

const breadcrumbItems = [
  { name: "Startseite", path: "/" },
  { name: "Reseller", path: "/reseller" },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/reseller#webpage`,
  url: `${SITE_URL}/reseller`,
  name: RESELLER_PAGE.title,
  description: RESELLER_PAGE.description,
  inLanguage: "de-DE",
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  about: {
    "@type": "Thing",
    name: "IPTV Reseller Deutschland",
  },
};

const faqSchema = buildFaqSchema([...RESELLER_FAQ]);

function IntroIcon({ icon }: { icon: (typeof RESELLER_INTRO_BENEFITS)[number]["icon"] }) {
  const className = "h-8 w-8 text-[#A6FF00] sm:h-9 sm:w-9";

  if (icon === "brand") {
    return <FaStore className={className} aria-hidden="true" />;
  }

  if (icon === "credits") {
    return <FaLayerGroup className={className} aria-hidden="true" />;
  }

  return <FaCogs className={className} aria-hidden="true" />;
}

const advantageIcons = [FaHeadset, FaLayerGroup, HiOutlineBadgeCheck, FaComments] as const;
const targetIcons = [FaUserTie, HiOutlineOfficeBuilding, FaUserFriends, HiOutlineUserGroup] as const;

const secondaryButtonClass =
  "inline-flex min-h-11 w-[calc(100%_-_48px)] max-w-[300px] items-center justify-center gap-2 rounded-full border border-[#A6FF00]/35 bg-[#111111]/55 px-5 py-2.5 text-center text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#F5F5F5] backdrop-blur-xl transition duration-300 hover:border-[#A6FF00] hover:bg-[#111111]/70 hover:text-[#A6FF00] sm:w-auto sm:max-w-none sm:text-[12px]";

const primaryButtonClass = `${ctaMotionFeaturedClass} ${ctaSolidGreenClass} inline-flex min-h-11 w-[calc(100%_-_48px)] max-w-[300px] items-center justify-center rounded-full bg-[#A6FF00] px-5 py-2.5 text-center text-[11px] font-extrabold uppercase tracking-[0.1em] sm:w-auto sm:max-w-none sm:text-[12px]`;

export default function ResellerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildResellerServiceSchema(SITE_URL)),
        }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <main className="min-h-screen overflow-x-hidden bg-[#000000] text-[#F5F5F5]">
        {/* Hero */}
        <section
          aria-labelledby="reseller-hero-heading"
          className="relative isolate overflow-hidden px-5 pb-12 pt-[clamp(5.5rem,calc(4.5rem+3vh),9rem)] sm:px-8 sm:pb-16 lg:px-0 lg:pb-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(166,255,0,0.12),transparent_42%),radial-gradient(ellipse_at_85%_20%,rgba(40,90,20,0.28),transparent_40%),linear-gradient(180deg,#050805_0%,#000000_72%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-[280px] max-w-5xl rounded-[40%] bg-[#A6FF00]/[0.04] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-8%] top-[28%] hidden h-64 w-64 rounded-3xl border border-[#A6FF00]/10 bg-[linear-gradient(145deg,rgba(166,255,0,0.06),transparent)] lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-4%] bottom-[18%] hidden h-40 w-72 rounded-2xl border border-[#1F1F1F] bg-[#0A0F0A]/60 lg:block"
          />

          <div className="relative z-10 mx-auto max-w-[1360px] text-center lg:px-12">
            <p className="mb-4 inline-flex rounded-full border border-[#A6FF00]/30 bg-[#111111]/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] sm:text-[11px]">
              IPTV RESELLER PROGRAMM
            </p>
            <h1
              id="reseller-hero-heading"
              className="mx-auto max-w-[920px] text-balance text-[clamp(2rem,3.8vw+1rem,3.75rem)] font-black leading-[1.02] tracking-[-0.055em] text-[#F5F5F5]"
            >
              {RESELLER_PAGE.h1}
            </h1>
            <p className="mx-auto mt-5 max-w-[720px] text-pretty text-[15px] leading-7 text-[#E6E6E6]/90 sm:text-[16px] sm:leading-8">
              Starten Sie Ihr eigenes Reseller-Projekt mit flexiblen Credits, einer übersichtlichen
              Kundenverwaltung und deutschsprachigem Support.
            </p>

            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={`#${RESELLER_PAGE.packagesSectionId}`}
                className={primaryButtonClass}
                style={{ "--cta-motion-delay": "-0.4s" } as CSSProperties}
              >
                Reseller-Angebote ansehen
              </a>
              <TrackedAnchor
                href={RESELLER_CONSULTATION_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                analyticsEvent={ANALYTICS_EVENTS.whatsappClick}
                analyticsParams={{
                  source: "reseller_hero",
                  page_path: "/reseller",
                  button_location: "reseller_hero",
                }}
                data-analytics="whatsapp_click"
                data-analytics-source="reseller_hero"
                className={secondaryButtonClass}
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                Beratung per WhatsApp
              </TrackedAnchor>
            </div>

            <ul
              className="mx-auto mt-10 grid max-w-[920px] grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
              aria-label="Reseller Vorteile auf einen Blick"
            >
              {RESELLER_HERO_TRUST.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[#1F1F1F]/90 bg-[#111111]/48 px-3 py-3 text-[11px] font-medium text-[#F5F5F5]/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-md sm:text-xs"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Introduction */}
        <section
          aria-labelledby="reseller-intro-heading"
          className="relative px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16"
        >
          <div className="mx-auto max-w-[1360px] lg:px-12">
            <div className="mx-auto max-w-[820px] text-center">
              <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] sm:text-[11px]">
                RESELLER BUSINESS
              </p>
              <h2
                id="reseller-intro-heading"
                className="text-balance text-[2rem] font-black leading-[1.05] tracking-[-0.055em] text-[#F5F5F5] sm:text-[2.5rem] lg:text-[2.85rem]"
              >
                Starten Sie Ihr eigenes IPTV Reseller Business
              </h2>
              <div className="mx-auto mt-5 max-w-[760px] space-y-4 text-[14px] leading-7 text-[#E6E6E6]/88 sm:text-[15px]">
                <p>
                  Als IPTV Reseller betreiben Sie Ihr eigenes Wiederverkaufsmodell: Sie erwerben
                  Credits, erstellen Kundenzugänge und betreuen Ihre Kunden über ein übersichtliches
                  Reseller-Panel.
                </p>
                <p>
                  Das Credit-System ordnet jeder Laufzeit eine feste Credit-Anzahl zu. So setzen Sie
                  Ihr Guthaben flexibel für kurze oder längere Zugänge ein – passend zu den
                  Anforderungen Ihrer Kunden.
                </p>
                <p>
                  Welches Paket sinnvoll ist, hängt vom erwarteten Kundenvolumen ab. Kleinere Starts
                  beginnen oft mit Starter; wachsendes Volumen lässt sich mit Business oder
                  Professional abdecken.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-9 grid max-w-[1180px] gap-5 sm:mt-11 lg:grid-cols-3 lg:gap-6">
              {RESELLER_INTRO_BENEFITS.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-[22px] border border-[#1F1F1F] bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,0,0.07),transparent_45%),linear-gradient(155deg,#121912_0%,#080B08_100%)] p-6 text-center shadow-[0_14px_34px_rgba(0,0,0,0.3)]"
                >
                  <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#A6FF00]/45 bg-[#A6FF00]/8">
                    <IntroIcon icon={benefit.icon} />
                  </div>
                  <h3 className="mt-4 text-[1.15rem] font-extrabold tracking-[-0.03em] text-[#F5F5F5]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-6 text-[#F5F5F5]/80">{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section
          id={RESELLER_PAGE.packagesSectionId}
          aria-labelledby="reseller-packages-heading"
          className="relative scroll-mt-[90px] px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16"
        >
          <div className="mx-auto max-w-[1360px] lg:px-12">
            <div className="mx-auto max-w-[820px] text-center">
              <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] sm:text-[11px]">
                RESELLER-PAKETE
              </p>
              <h2
                id="reseller-packages-heading"
                className="text-balance text-[2rem] font-black leading-[1.05] tracking-[-0.055em] text-[#F5F5F5] sm:text-[2.5rem] lg:text-[2.85rem]"
              >
                Wählen Sie Ihr Credit-Paket
              </h2>
              <p className="mx-auto mt-4 max-w-[720px] text-[14px] leading-7 text-[#E6E6E6]/88 sm:text-[15px]">
                Wählen Sie das Paket passend zu Ihrem geplanten Kundenvolumen. Credits können für
                verschiedene Laufzeiten eingesetzt werden.
              </p>
            </div>

            <ResellerPackageCards />
          </div>
        </section>

        {/* How it works */}
        <section
          aria-labelledby="reseller-steps-heading"
          className="relative px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16"
        >
          <div className="mx-auto max-w-[1360px] lg:px-12">
            <div className="mx-auto max-w-[820px] text-center">
              <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] sm:text-[11px]">
                SO FUNKTIONIERT ES
              </p>
              <h2
                id="reseller-steps-heading"
                className="text-balance text-[2rem] font-black leading-[1.05] tracking-[-0.055em] text-[#F5F5F5] sm:text-[2.5rem] lg:text-[2.85rem]"
              >
                In 4 Schritten zum Reseller-Zugang
              </h2>
            </div>

            <div className="mx-auto mt-9 grid max-w-[1120px] gap-5 sm:mt-11 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {RESELLER_STEPS.map((step) => (
                <article
                  key={step.number}
                  className="rounded-[22px] border border-[#1F1F1F] bg-[#0A0F0A] p-5 text-center shadow-[0_12px_28px_rgba(0,0,0,0.28)] sm:p-6"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#A6FF00]/45 bg-[#A6FF00]/10 text-[12px] font-bold text-[#A6FF00]">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-extrabold tracking-[-0.03em] text-[#F5F5F5]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-6 text-[#F5F5F5]/78 sm:text-[14px]">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Panel features */}
        <section
          aria-labelledby="reseller-panel-heading"
          className="relative px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16"
        >
          <div className="mx-auto max-w-[1360px] lg:px-12">
            <div className="mx-auto max-w-[820px] text-center">
              <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] sm:text-[11px]">
                RESELLER PANEL
              </p>
              <h2
                id="reseller-panel-heading"
                className="text-balance text-[2rem] font-black leading-[1.05] tracking-[-0.055em] text-[#F5F5F5] sm:text-[2.5rem] lg:text-[2.85rem]"
              >
                Alles für Ihre Kundenverwaltung
              </h2>
            </div>

            <div className="mx-auto mt-9 grid max-w-[1180px] gap-4 sm:mt-11 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {RESELLER_PANEL_FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-[#263026] bg-[#080B08] p-5 sm:p-6"
                >
                  <h3 className="text-[1.05rem] font-bold tracking-[-0.02em] text-[#A6FF00]">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-6 text-[#F5F5F5]/78">{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Credit system */}
        <section
          aria-labelledby="reseller-credits-heading"
          className="relative px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16"
        >
          <div className="mx-auto max-w-[1360px] lg:px-12">
            <div className="mx-auto max-w-[820px] text-center">
              <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] sm:text-[11px]">
                CREDIT-SYSTEM
              </p>
              <h2
                id="reseller-credits-heading"
                className="text-balance text-[2rem] font-black leading-[1.05] tracking-[-0.055em] text-[#F5F5F5] sm:text-[2.5rem] lg:text-[2.85rem]"
              >
                So funktioniert das Credit-System
              </h2>
              <p className="mx-auto mt-4 max-w-[720px] text-[14px] leading-7 text-[#E6E6E6]/88 sm:text-[15px]">
                Credits werden entsprechend der gewählten Laufzeit verwendet. Je länger die Laufzeit,
                desto mehr Credits werden für den jeweiligen Zugang benötigt.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-[640px] overflow-hidden rounded-2xl border border-[#A6FF00]/25 bg-[#0A0F0A] shadow-[0_14px_34px_rgba(0,0,0,0.32)] sm:mt-10">
              <table className="w-full border-collapse text-left text-[14px] sm:text-[15px]">
                <caption className="sr-only">Credit-Zuordnung nach Laufzeit</caption>
                <thead>
                  <tr className="border-b border-[#A6FF00]/25 bg-[#111911]">
                    <th scope="col" className="px-4 py-3.5 font-bold text-[#A6FF00] sm:px-6">
                      Laufzeit
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-bold text-[#A6FF00] sm:px-6">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RESELLER_CREDIT_MAPPING.map((row) => (
                    <tr key={row.duration} className="border-b border-[#1F1F1F] last:border-b-0">
                      <td className="px-4 py-3.5 text-[#F5F5F5] sm:px-6">{row.duration}</td>
                      <td className="px-4 py-3.5 font-semibold text-[#F5F5F5] sm:px-6">
                        {row.credits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mx-auto mt-5 max-w-[640px] text-center text-[14px] leading-6 text-[#F5F5F5]/82 sm:text-[15px]">
              {RESELLER_CREDIT_EXAMPLE}
            </p>
          </div>
        </section>

        {/* Why iptvkaufenX */}
        <section
          aria-labelledby="reseller-advantages-heading"
          className="relative px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16"
        >
          <div className="mx-auto max-w-[1360px] lg:px-12">
            <div className="mx-auto max-w-[820px] text-center">
              <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] sm:text-[11px]">
                IHRE VORTEILE
              </p>
              <h2
                id="reseller-advantages-heading"
                className="text-balance text-[2rem] font-black leading-[1.05] tracking-[-0.055em] text-[#F5F5F5] sm:text-[2.5rem] lg:text-[2.85rem]"
              >
                Warum iptvkaufenX als Reseller-Partner?
              </h2>
            </div>

            <div className="mx-auto mt-9 grid max-w-[1180px] gap-5 sm:mt-11 sm:grid-cols-2 lg:grid-cols-4">
              {RESELLER_ADVANTAGES.map((item, index) => {
                const Icon = advantageIcons[index];
                return (
                  <article
                    key={item.title}
                    className="rounded-[22px] border border-[#1F1F1F] bg-[#0A0F0A] p-5 text-center sm:p-6"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#A6FF00]/40 bg-[#A6FF00]/8 text-[#A6FF00]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-[1.05rem] font-extrabold text-[#F5F5F5]">{item.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-6 text-[#F5F5F5]/78 sm:text-[14px]">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Target groups */}
        <section
          aria-labelledby="reseller-audience-heading"
          className="relative px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16"
        >
          <div className="mx-auto max-w-[1360px] lg:px-12">
            <div className="mx-auto max-w-[820px] text-center">
              <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] sm:text-[11px]">
                FÜR WEN GEEIGNET
              </p>
              <h2
                id="reseller-audience-heading"
                className="text-balance text-[2rem] font-black leading-[1.05] tracking-[-0.055em] text-[#F5F5F5] sm:text-[2.5rem] lg:text-[2.85rem]"
              >
                Für wen eignet sich das Reseller-Programm?
              </h2>
            </div>

            <div className="mx-auto mt-9 grid max-w-[1180px] gap-5 sm:mt-11 sm:grid-cols-2 lg:grid-cols-4">
              {RESELLER_TARGET_GROUPS.map((item, index) => {
                const Icon = targetIcons[index];
                return (
                  <article
                    key={item.title}
                    className="rounded-[22px] border border-[#263026] bg-[linear-gradient(160deg,#101610_0%,#080B08_100%)] p-5 sm:p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#A6FF00]/35 text-[#A6FF00]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-[1.05rem] font-extrabold text-[#F5F5F5]">{item.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-6 text-[#F5F5F5]/78 sm:text-[14px]">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="reseller-faq-heading"
          className="relative px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16"
        >
          <div className="mx-auto max-w-[1360px] lg:px-12">
            <div className="mx-auto max-w-[820px] text-center">
              <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] sm:text-[11px]">
                RESELLER FAQ
              </p>
              <h2
                id="reseller-faq-heading"
                className="text-balance text-[2rem] font-black leading-[1.05] tracking-[-0.055em] text-[#F5F5F5] sm:text-[2.5rem] lg:text-[2.85rem]"
              >
                Häufig gestellte Fragen
              </h2>
            </div>

            <div className="mx-auto max-w-[860px]">
              <ResellerFaqAccordion />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          aria-labelledby="reseller-final-cta-heading"
          className="relative px-5 pb-16 pt-6 sm:px-8 sm:pb-20 lg:px-0 lg:pb-24"
        >
          <div className="mx-auto max-w-[1360px] lg:px-12">
            <div className="relative overflow-hidden rounded-[28px] border border-[#A6FF00]/30 bg-[radial-gradient(ellipse_at_30%_0%,rgba(166,255,0,0.16),transparent_50%),linear-gradient(145deg,#102010_0%,#071007_55%,#040804_100%)] px-6 py-10 text-center shadow-[0_0_40px_rgba(166,255,0,0.08),0_22px_50px_rgba(0,0,0,0.4)] sm:px-10 sm:py-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#A6FF00]/50 to-transparent"
              />
              <h2
                id="reseller-final-cta-heading"
                className="text-balance text-[1.75rem] font-black tracking-[-0.045em] text-[#F5F5F5] sm:text-[2.25rem]"
              >
                Bereit für Ihr eigenes Reseller-Projekt?
              </h2>
              <p className="mx-auto mt-4 max-w-[620px] text-[14px] leading-7 text-[#E6E6E6]/88 sm:text-[15px]">
                Wählen Sie ein Credit-Paket oder kontaktieren Sie uns für eine persönliche Beratung.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <a
                  href={`#${RESELLER_PAGE.packagesSectionId}`}
                  className={primaryButtonClass}
                  style={{ "--cta-motion-delay": "-0.5s" } as CSSProperties}
                >
                  Reseller-Angebote ansehen
                </a>
                <TrackedAnchor
                  href={RESELLER_CONSULTATION_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  analyticsEvent={ANALYTICS_EVENTS.whatsappClick}
                  analyticsParams={{
                    source: "reseller_final_cta",
                    page_path: "/reseller",
                    button_location: "reseller_final_cta",
                  }}
                  data-analytics="whatsapp_click"
                  data-analytics-source="reseller_final_cta"
                  className={secondaryButtonClass}
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                  WhatsApp kontaktieren
                </TrackedAnchor>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
