import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.redaktionelleRichtlinien,
  description:
    "Redaktionelle Richtlinien von iptvkaufenX: Erstellung, Prüfung und Aktualisierung technischer Blog-Inhalte.",
  path: "/redaktionelle-richtlinien",
});

const sections: LegalSection[] = [
  {
    title: "Zweck dieser Richtlinien",
    paragraphs: [
      "Diese redaktionellen Richtlinien beschreiben, wie Inhalte im [Blog](/blog) von iptvkaufenX entstehen, geprüft und aktualisiert werden. Sie gelten für Beiträge der [iptvkaufenX Redaktion](/autor) und ergänzen die [Inhaltsrichtlinien](/inhaltsrichtlinien).",
    ],
  },
  {
    title: "Erstellung von Inhalten",
    paragraphs: [
      "Blog-Artikel werden von der iptvkaufenX Redaktion erstellt. Themen orientieren sich an praxisrelevanten Fragen zu IPTV-Technik in Deutschland – etwa Player-Apps, Geräte, M3U-Playlisten, Einrichtung und Fehlerbehebung.",
      "Texte sollen verständlich und nachvollziehbar sein. iptvkaufenX verkauft keine IPTV-Zugänge; redaktionelle Beiträge dürfen das nicht nahelegen.",
    ],
  },
  {
    title: "Prüfung und Aktualisierung",
    paragraphs: [
      "Die Inhalte dieser Website werden mit Sorgfalt erstellt und regelmäßig geprüft. Bei Blog-Beiträgen werden Veröffentlichungs- und Aktualisierungsdaten ausgewiesen.",
      "Wenn sich technische Hinweise oder verlinkte Seiten ändern, prüfen wir betroffene Beiträge und passen sie bei Bedarf an. Eine lückenlose Garantie für Vollständigkeit und Aktualität aller Angaben kann dennoch nicht übernommen werden.",
    ],
  },
  {
    title: "Quellen und Belege",
    paragraphs: [
      "Redaktionelle Beiträge stützen sich auf allgemein zugängliches Fachwissen zu IPTV-Technik, Geräten und Apps sowie auf die auf dieser Website dokumentierten redaktionellen Hinweise.",
      "Wir erfinden keine Unternehmensdaten, Zertifikate, Auszeichnungen, Lizenzen oder Personenangaben. Wo wir auf externe Angebote oder Tools verweisen, bleibt die Verantwortung für deren Inhalte beim jeweiligen Betreiber.",
    ],
  },
  {
    title: "Korrekturen",
    paragraphs: [
      "Stellen Sie einen sachlichen Fehler in einem Blog-Beitrag fest, melden Sie ihn bitte über [Kontakt](/kontakt), per E-Mail an support@iptvkaufenx.de oder contact@iptvkaufenx.de.",
      "Bestätigte Fehler korrigieren wir zeitnah und aktualisieren den Beitrag entsprechend.",
    ],
  },
  {
    title: "Unabhängigkeit",
    paragraphs: [
      "iptvkaufenX veröffentlicht technische Informationen. Die Website verkauft derzeit keine IPTV-Abonnements und stellt keine Senderkataloge bereit.",
      "Markennamen von Geräten oder Apps dienen der technischen Einordnung. Sie bedeuten keine Partnerschaft, Lizenz oder Autorisierung.",
    ],
  },
  {
    title: "Verwandte Seiten",
    items: [
      "[Blog](/blog) – veröffentlichte Ratgeber und Guides",
      "[Autor](/autor) – iptvkaufenX Redaktion",
      "[Inhaltsrichtlinien](/inhaltsrichtlinien) – Standards für veröffentlichte Inhalte",
    ],
  },
];

const breadcrumbItems = [
  { name: "Startseite", path: "/" },
  { name: "Redaktionelle Richtlinien", path: "/redaktionelle-richtlinien" },
];

export default function RedaktionelleRichtlinienPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      <LegalPage
        eyebrow="Redaktion"
        title="Redaktionelle Richtlinien"
        updatedAt="28. August 2026"
        intro="So entstehen, prüfen und aktualisieren wir Blog-Inhalte bei iptvkaufenX – als technische Information, ohne Verkauf von IPTV-Zugängen."
        sections={sections}
      />
    </>
  );
}
