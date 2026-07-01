import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import HeroImagePreload from "@/components/preloads/HeroImagePreload";
import CompactTrustStrip from "@/components/CompactTrustStrip";
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
  "IPTV Kaufen in Deutschland: 22.000+ Live-TV Sender, Filme, Serien und Sport in HD, Full HD & 4K. Sofort aktiviert, stabil und kompatibel mit allen Geräten.";
const productDescription =
  "Premium IPTV Zugang mit Live-TV Sendern, Filmen, Serien, Sport und internationaler Senderliste in HD, Full HD und 4K.";

const faqSchemaItems = [
  {
    question: "Was ist bei IPTV Kaufen enthalten?",
    answer:
      "Sie erhalten Zugriff auf Live-TV Sender, Filme, Serien, Sport und weitere Inhalte. Die Nutzung ist auf verschiedenen Geräten möglich, darunter Smart TV, Android TV, Fire TV, Smartphone, Tablet, PC und TV Box.",
  },
  {
    question: "Auf welchen Geräten kann ich IPTV nutzen?",
    answer:
      "IPTV Kaufen funktioniert auf vielen modernen Geräten, zum Beispiel Smart TV, Android TV, Fire TV, MAG Box, Windows, Smartphone, Tablet, TV Box und weiteren kompatiblen Geräten.",
  },
  {
    question: "Wie schnell erhalte ich meinen Zugang nach der Bestellung?",
    answer:
      "Nach der Bestellung werden Ihre Zugangsdaten schnell bereitgestellt. Danach können Sie die Einrichtung auf Ihrem bevorzugten Gerät starten.",
  },
  {
    question: "Welche Zahlungsmethoden werden unterstützt?",
    answer:
      "Sie können Ihre Bestellung über die verfügbaren Zahlungsmethoden auf der Website abschließen. Nach erfolgreicher Zahlung erhalten Sie die nächsten Schritte und Ihre Zugangsdaten.",
  },
  {
    question: "Gibt es Support bei der Einrichtung?",
    answer:
      "Ja. Bei Fragen zur Einrichtung oder Nutzung steht Ihnen Support zur Verfügung, damit Sie IPTV schnell und korrekt auf Ihrem Gerät verwenden können.",
  },
  {
    question: "Gibt es eine Geld-zurück-Garantie?",
    answer:
      "Ja. Sie können innerhalb von 30 Tagen nach dem Kauf eine Rückerstattung beantragen, wenn Sie mit dem Service nicht zufrieden sind – gemäß unserer Rückerstattungsrichtlinie.",
  },
] as const;

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
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.9,
        reviewCount: 1150,
        bestRating: 5,
        worstRating: 1,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqSchemaItems.map((item) => ({
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
