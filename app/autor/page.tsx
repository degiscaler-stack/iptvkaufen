import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { SITE_URL, buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.autor,
  description:
    "iptvkaufenX Redaktion – IPTV Experten hinter den Blog-Ratgebern zu Geräten, Apps, Anbietern und Einrichtung.",
  path: "/autor",
});

const sections: LegalSection[] = [
  {
    title: "Über die Redaktion",
    paragraphs: [
      "Die iptvkaufenX Redaktion ist das redaktionelle Team hinter den Blog-Beiträgen auf [iptvkaufenx.de](https://iptvkaufenx.de). In den Artikeln erscheint sie unter dem Namen „iptvkaufenX Redaktion“ mit der Rolle „IPTV Experten“.",
      "Es handelt sich um die Markenredaktion von iptvkaufenX – nicht um einzeln ausgewiesene Personenprofile. Individuelle Mitarbeiternamen werden hier bewusst nicht erfunden oder aufgeführt.",
    ],
  },
  {
    title: "Themen und Expertise",
    paragraphs: [
      "Die Redaktion erstellt praxisnahe Ratgeber zu IPTV für Nutzerinnen und Nutzer in Deutschland. Die Schwerpunkte entsprechen den Blog-Kategorien und veröffentlichten Guides:",
    ],
    items: [
      "IPTV in Deutschland und Grundlagen (German IPTV)",
      "Anbieter, Provider und Auswahlkriterien",
      "Abonnements, Preise und Testphasen",
      "Geräte: IPTV Box, Receiver und kompatible Hardware",
      "Apps und Player (u. a. IPTV Smarters Pro, TiviMate)",
      "Einrichtung mit M3U und Zugangsdaten",
      "Premium-Qualität (HD/4K) und Senderlisten",
    ],
  },
  {
    title: "Arbeitsweise",
    paragraphs: [
      "Inhalte werden mit Sorgfalt erstellt und regelmäßig geprüft. Veröffentlichungs- und Aktualisierungsdaten sind in den Beiträgen ausgewiesen. Standards zu Quellen, Korrekturen und kommerzieller Transparenz finden Sie in den [redaktionellen Richtlinien](/redaktionelle-richtlinien) und den [Inhaltsrichtlinien](/inhaltsrichtlinien).",
    ],
  },
  {
    title: "Artikel und Kontakt",
    paragraphs: [
      "Alle veröffentlichten Beiträge der Redaktion finden Sie im [Blog](/blog). Bei Fragen zu Inhalten, Korrekturhinweisen oder zum IPTV-Service erreichen Sie iptvkaufenX über [Kontakt](/kontakt), per E-Mail an support@iptvkaufenx.de oder contact@iptvkaufenx.de sowie über WhatsApp (+44 7832 620735, internationaler Support auf Deutsch).",
      "Mehr zur Marke und zum Angebot: [Über uns](/ueber-uns).",
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
  jobTitle: "IPTV Experten",
  url: `${SITE_URL}/autor`,
  description:
    "Redaktionelles Team von iptvkaufenX für Blog-Ratgeber zu IPTV in Deutschland.",
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
        updatedAt="11. Juli 2026"
        intro="Die iptvkaufenX Redaktion (IPTV Experten) erstellt die Ratgeber und Guides im Blog – als Markenredaktion ohne erfundene Personennamen."
        sections={sections}
      />
    </>
  );
}
