import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import PackageHashScroll from "@/components/PackageHashScroll";
import HeroImagePreload from "@/components/preloads/HeroImagePreload";
import CompactTrustStrip from "@/components/CompactTrustStrip";
import HomeSeoContent, { HOME_SEO_FAQ } from "@/components/HomeSeoContent";
import {
  buildProductAggregateRating,
  buildProductReviews,
} from "@/lib/customer-reviews";
import { FAQ_ITEMS } from "@/lib/faq";
import { IPTV_PACKAGES } from "@/lib/pricing";
import {
  SITE_URL,
  buildPageMetadata,
} from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

const ChannelLogos = dynamic(() => import("@/components/ChannelLogos"));
const IptvBenefits = dynamic(() => import("@/components/IptvBenefits"));
const IptvHowItWorks = dynamic(() => import("@/components/IptvHowItWorks"));
const IptvFaq = dynamic(() => import("@/components/IptvFaq"));
const IptvPricing = dynamic(() => import("@/components/IptvPricing"));
const MoviesSeriesSlider = dynamic(() => import("@/components/MoviesSeriesSlider"));
const SportsTeamsSlider = dynamic(() => import("@/components/SportsTeamsSlider"));
const CompatibleDevicesSlider = dynamic(() => import("@/components/CompatibleDevicesSlider"));
const PremiumEntertainment = dynamic(() => import("@/components/PremiumEntertainment"));
const PremiumExperience = dynamic(() => import("@/components/PremiumExperience"));
const ServiceHighlightsBar = dynamic(() => import("@/components/ServiceHighlightsBar"));
const CustomerReviews = dynamic(() => import("@/components/CustomerReviews"));
const MobileStickyPurchaseBar = dynamic(() => import("@/components/MobileStickyPurchaseBar"));

const seoDescription =
  "IPTV kaufen in DE: 22.000+ Sender, Sport & Filme in HD/4K. Test für 3€, 30 Tage Geld-zurück – jetzt bei iptvkaufenX.";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.home,
  description: seoDescription,
  path: "/",
  image: "/images/iptv-kaufen-hero-football.webp",
  imageAlt: "IPTV kaufen in Deutschland – Premium Live-TV Streaming",
});

const productDescription =
  "Premium IPTV Zugang mit Live-TV Sendern, Filmen, Serien, Sport und internationaler Senderliste in HD, Full HD und 4K.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "iptvkaufenX",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/iptv-kaufen-logo.webp`,
      },
      email: "support@iptvkaufenx.de",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@iptvkaufenx.de",
          availableLanguage: ["German", "de"],
          url: `${SITE_URL}/kontakt`,
        },
      ],
      sameAs: [
        "https://web.facebook.com/people/VisionHub/61588587400682/",
        "https://www.instagram.com/visionhub.media/",
        "https://x.com/cod_jss27918",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "iptvkaufenX",
      url: `${SITE_URL}/`,
      inLanguage: "de-DE",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SEO_TITLES.home,
      description: seoDescription,
      inLanguage: "de-DE",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Thing",
        name: "IPTV Kaufen",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/iptv-kaufen-hero-football.webp`,
      },
    },
    {
      "@type": "Product",
      name: "IPTV Kaufen Deutschland",
      description: productDescription,
      image: `${SITE_URL}/images/iptv-kaufen-hero-football.webp`,
      brand: {
        "@type": "Brand",
        name: "iptvkaufenX",
      },
      aggregateRating: buildProductAggregateRating(),
      review: buildProductReviews(),
      offers: IPTV_PACKAGES.map((pkg) => ({
        "@type": "Offer",
        name: pkg.duration,
        price: pkg.priceNumeric.toFixed(2),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/#preise`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: [...FAQ_ITEMS, ...HOME_SEO_FAQ].map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: `${SITE_URL}/`,
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <main className="pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
      <HeroImagePreload />
      <PackageHashScroll />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <CompactTrustStrip />
      <IptvPricing />
      <PremiumExperience />
      <IptvBenefits />
      <ChannelLogos />
      <MoviesSeriesSlider />
      <SportsTeamsSlider />
      <ServiceHighlightsBar />
      <PremiumEntertainment />
      <CompatibleDevicesSlider />
      <IptvHowItWorks />
      <HomeSeoContent />
      <CustomerReviews />
      <IptvFaq />
      <MobileStickyPurchaseBar />
    </main>
  );
}
