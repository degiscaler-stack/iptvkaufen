import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { SITE_URL, buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.autor,
  description:
    "iptvkaufenX Redaktion – Team hinter den technischen Blog-Ratgebern zu IPTV-Apps, Geräten und Einrichtung.",
  path: "/autor",
});

const sections: LegalSection[] = [
  {
    title: "Über die Redaktion",
    paragraphs: [
      "Die iptvkaufenX Redaktion ist das redaktionelle Team hinter den Blog-Beiträgen auf [iptvkaufenx.de](https://iptvkaufenx.de). In den Artikeln erscheint sie unter dem Namen „iptvkaufenX Redaktion“ mit der Rolle „IPTV-Technikredaktion“.",
      "Es handelt sich um die Markenredaktion von iptvkaufenX – nicht um einzeln ausgewiesene Personenprofile. Individuelle Mitarbeiternamen werden hier bewusst nicht erfunden oder aufgeführt.",
    ],
  },
  {
    title: "Themen",
    paragraphs: [
      "Die Redaktion erstellt praxisnahe Ratgeber zu IPTV-Technik für Leserinnen und Leser in Deutschland. Die Schwerpunkte entsprechen den veröffentlichten Guides:",
    ],
    items: [
      "IPTV als Übertragungsweg und Grundlagen",
      "Player-Apps (u. a. IPTV Smarters Pro, TiviMate)",
      "Geräte: IPTV Box, Receiver und Sticks",
      "Playlisten (M3U/M3U8) und Einrichtung",
      "Streaming-Qualität (Bitrate, Codec, 4K-Anforderungen)",
    ],
  },
  {
    title: "Arbeitsweise",
    paragraphs: [
      "Inhalte werden mit Sorgfalt erstellt und regelmäßig geprüft. Veröffentlichungs- und Aktualisierungsdaten sind in den Beiträgen ausgewiesen. Standards zu Quellen, Korrekturen und Unabhängigkeit finden Sie in den [redaktionellen Richtlinien](/redaktionelle-richtlinien) und den [Inhaltsrichtlinien](/inhaltsrichtlinien).",
      "Die Redaktion verkauft keine IPTV-Zugänge und beansprucht keine Lizenzen, Senderpartnerschaften oder Rechte an Programminhalten Dritter.",
    ],
  },
  {
    title: "Artikel und Kontakt",
    paragraphs: [
      "Alle veröffentlichten Beiträge finden Sie im [Blog](/blog). Bei Fragen zu Inhalten oder Korrekturhinweisen erreichen Sie iptvkaufenX über [Kontakt](/kontakt), per E-Mail an support@iptvkaufenx.de oder contact@iptvkaufenx.de sowie über WhatsApp (+44 7832 620735).",
      "Mehr zur Marke: [Über uns](/ueber-uns).",
    ],
  },
];

const breadcrumbItems = [
  { name: "Startseite", path: "/" },
  { name: "Autor", path: "/autor" },
];

const authorSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "iptvkaufenX Redaktion",
  jobTitle: "IPTV-Technikredaktion",
  url: `${SITE_URL}/autor`,
  description:
    "Redaktionelles Team von iptvkaufenX für technische Blog-Ratgeber zu IPTV in Deutschland.",
  worksFor: {
    "@type": "Organization",
    name: "iptvkaufenX",
    url: SITE_URL,
  },
  email: "support@iptvkaufenx.de",
};

export default function AutorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(authorSchema),
        }}
      />
      <LegalPage
        eyebrow="Autor"
        title="iptvkaufenX Redaktion"
        updatedAt="28. August 2026"
        intro="Die iptvkaufenX Redaktion erstellt die technischen Ratgeber im Blog – als Markenredaktion ohne erfundene Personennamen und ohne Verkauf von IPTV-Zugängen."
        sections={sections}
      />
    </>
  );
}
