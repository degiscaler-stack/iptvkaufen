import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import HeroImagePreload from "@/components/preloads/HeroImagePreload";
import CompactTrustStrip from "@/components/CompactTrustStrip";
import { FAQ_ITEMS } from "@/lib/faq";
import { IPTV_PACKAGES } from "@/lib/pricing";
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

const seoTitle = SEO_TITLES.home;
const seoDescription =
  "IPTV kaufen in Deutschland: 22.000+ Sender, Filme, Serien und Sport in HD, Full HD und 4K. 24-Stunden-Test für 3€ und 30 Tage Geld-zurück.";
const productDescription =
  "Premium IPTV Zugang mit Live-TV Sendern, Filmen, Serien, Sport und internationaler Senderliste in HD, Full HD und 4K.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: "https://iptvkaufenx.de/",
    type: "website",
    images: [
      {
        url: "https://iptvkaufenx.de/images/iptv-kaufen-hero-football.webp",
        alt: "IPTV Kaufen Deutschland Premium Streaming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: ["https://iptvkaufenx.de/images/iptv-kaufen-hero-football.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://iptvkaufenx.de/#organization",
      name: "iptvkaufenX",
      url: "https://iptvkaufenx.de/",
      logo: "https://iptvkaufenx.de/brand/iptv-kaufen-logo.webp",
    },
    {
      "@type": "WebSite",
      "@id": "https://iptvkaufenx.de/#website",
      name: "iptvkaufenX",
      url: "https://iptvkaufenx.de/",
      inLanguage: "de-DE",
      publisher: {
        "@id": "https://iptvkaufenx.de/#organization",
      },
    },
    {
      "@type": "Product",
      name: "IPTV Kaufen Deutschland",
      description: productDescription,
      image: "https://iptvkaufenx.de/images/iptv-kaufen-hero-football.webp",
      brand: {
        "@type": "Brand",
        name: "iptvkaufenX",
      },
      offers: IPTV_PACKAGES.map((pkg) => ({
        "@type": "Offer",
        name: pkg.duration,
        price: pkg.priceNumeric.toFixed(2),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://iptvkaufenx.de/#preise",
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
      <HeroImagePreload />
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
      <CustomerReviews />
      <IptvFaq />
      <MobileStickyPurchaseBar />
    </main>
  );
}
