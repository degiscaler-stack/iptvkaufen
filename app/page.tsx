import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import HomeSeoContent, { HOME_SEO_FAQ } from "@/components/HomeSeoContent";
import { FAQ_ITEMS } from "@/lib/faq";
import { SITE_URL, buildPageMetadata } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

const IptvBenefits = dynamic(() => import("@/components/IptvBenefits"));
const IptvHowItWorks = dynamic(() => import("@/components/IptvHowItWorks"));
const IptvFaq = dynamic(() => import("@/components/IptvFaq"));
const CompatibleDevicesSlider = dynamic(() => import("@/components/CompatibleDevicesSlider"));

const seoDescription =
  "Informationen zu IPTV in Deutschland: Technik, Apps, Geräte, M3U, Einrichtung und Fehlerbehebung verständlich erklärt von iptvkaufenX.";

const HOME_OG_IMAGE = "/brand/iptv-kaufen-logo.webp";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.home,
  description: seoDescription,
  path: "/",
  image: HOME_OG_IMAGE,
  imageAlt: "iptvkaufenX – IPTV-Technik, Apps und Einrichtung",
});

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
          contactType: "editorial",
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
        name: "IPTV-Technik",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}${HOME_OG_IMAGE}`,
      },
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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <CompatibleDevicesSlider />
      <IptvHowItWorks />
      <IptvBenefits />
      <HomeSeoContent />
      <IptvFaq />
    </main>
  );
}
