import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ChannelLogos from "@/components/ChannelLogos";
import IptvBenefits from "@/components/IptvBenefits";
import IptvHowItWorks from "@/components/IptvHowItWorks";
import IptvFaq from "@/components/IptvFaq";
import IptvPricing from "@/components/IptvPricing";
import MoviesSeriesSlider from "@/components/MoviesSeriesSlider";
import SportsTeamsSlider from "@/components/SportsTeamsSlider";
import CompatibleDevicesSlider from "@/components/CompatibleDevicesSlider";
import PremiumEntertainment from "@/components/PremiumEntertainment";
import PremiumExperience from "@/components/PremiumExperience";
import ServiceHighlightsBar from "@/components/ServiceHighlightsBar";
import CustomerReviews from "@/components/CustomerReviews";

const seoTitle = "IPTV Kaufen Deutschland – 22.000+ Sender, Filme & Sport in 4K";
const seoDescription =
  "IPTV Kaufen in Deutschland: 22.000+ Live-TV Sender, Filme, Serien und Sport in HD, Full HD & 4K. Sofort aktiviert, stabil auf allen Geräten – ab 9,99€.";

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
        url: "/images/iptv-kaufen-hero-football.webp",
        alt: "IPTV Kaufen Deutschland Premium Streaming",
      },
    ],
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
      description: seoDescription,
      image: "https://iptvkaufenx.de/images/iptv-kaufen-hero-football.webp",
      brand: {
        "@type": "Brand",
        name: "iptvkaufenX",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.9,
        reviewCount: 1150,
      },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <PremiumExperience />
      <IptvBenefits />
      <ChannelLogos />
      <MoviesSeriesSlider />
      <SportsTeamsSlider />
      <ServiceHighlightsBar />
      <PremiumEntertainment />
      <CompatibleDevicesSlider />
      <IptvPricing />
      <IptvHowItWorks />
      <CustomerReviews />
      <IptvFaq />
    </main>
  );
}
