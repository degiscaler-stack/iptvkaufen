import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import PackageHashScroll from "@/components/PackageHashScroll";
import CompactTrustStrip from "@/components/CompactTrustStrip";
import HomeSeoContent, { HOME_SEO_FAQ } from "@/components/HomeSeoContent";
import {
  buildProductAggregateRating,
  buildProductReviews,
} from "@/lib/customer-reviews";
import { FAQ_ITEMS } from "@/lib/faq";
import {
  buildDigitalOfferShippingDetails,
  buildMerchantReturnPolicy,
  buildMerchantReturnPolicyRef,
} from "@/lib/merchant-listing";
import {
  getAllProductOffers,
  getOfferSchemaId,
  getOfferSchemaName,
} from "@/lib/pricing";
import {
  SITE_URL,
  buildPageMetadata,
} from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

const IptvBenefits = dynamic(() => import("@/components/IptvBenefits"));
const IptvHowItWorks = dynamic(() => import("@/components/IptvHowItWorks"));
const IptvFaq = dynamic(() => import("@/components/IptvFaq"));
const IptvPricing = dynamic(() => import("@/components/IptvPricing"));
const CompatibleDevicesSlider = dynamic(() => import("@/components/CompatibleDevicesSlider"));
const PremiumEntertainment = dynamic(() => import("@/components/PremiumEntertainment"));
const PremiumExperience = dynamic(() => import("@/components/PremiumExperience"));
const ServiceHighlightsBar = dynamic(() => import("@/components/ServiceHighlightsBar"));
const CustomerReviews = dynamic(() => import("@/components/CustomerReviews"));
const MobileStickyPurchaseBar = dynamic(() => import("@/components/MobileStickyPurchaseBar"));

const seoDescription =
  "IPTV kaufen in Deutschland: flexible Pakete, einfache Einrichtung, Unterstützung für verschiedene Geräte und deutschsprachiger Support bei iptvkaufenX.";

const HOME_OG_IMAGE = "/images/iptv-kaufen-premium-streaming-deutschland.webp";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.home,
  description: seoDescription,
  path: "/",
  image: HOME_OG_IMAGE,
  imageAlt: "IPTV kaufen in Deutschland – flexible Pakete und einfache Einrichtung",
});

const productDescription =
  "IPTV kaufen in Deutschland: flexible Pakete, Nutzung auf mehreren Geräten, einfache Einrichtung und deutschsprachiger Support."

const PRODUCT_ID = `${SITE_URL}/#product`;
const productAggregateRating = buildProductAggregateRating();

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
          telephone: "+447832620735",
          email: "support@iptvkaufenx.de",
          availableLanguage: ["German", "de"],
          url: `${SITE_URL}/kontakt`,
        },
      ],
      sameAs: [
        "https://web.facebook.com/IptvkaufenX/",
        "https://www.instagram.com/ptvkaufenx/",
        "https://www.tiktok.com/@iptvkaufenx",
        "https://x.com/iptvkaufenx",
        "https://www.pinterest.com/iptvkaufenx/",
        "https://www.youtube.com/@iptvkaufenx",
      ],
      hasMerchantReturnPolicy: buildMerchantReturnPolicyRef(),
    },
    buildMerchantReturnPolicy(),
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
        url: `${SITE_URL}${HOME_OG_IMAGE}`,
      },
    },
    {
      "@type": "Product",
      "@id": PRODUCT_ID,
      name: "IPTV Kaufen Deutschland",
      description: productDescription,
      image: `${SITE_URL}${HOME_OG_IMAGE}`,
      url: `${SITE_URL}/`,
      brand: {
        "@type": "Brand",
        name: "iptvkaufenX",
      },
      ...(productAggregateRating ? { aggregateRating: productAggregateRating } : {}),
      review: buildProductReviews(PRODUCT_ID),
      offers: getAllProductOffers().map((pkg) => ({
        "@type": "Offer",
        "@id": `${SITE_URL}/#${getOfferSchemaId(pkg)}`,
        name: getOfferSchemaName(pkg),
        price: Number(pkg.priceNumeric.toFixed(2)),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/#preise`,
        itemOffered: { "@id": PRODUCT_ID },
        shippingDetails: buildDigitalOfferShippingDetails(),
        hasMerchantReturnPolicy: buildMerchantReturnPolicyRef(),
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
