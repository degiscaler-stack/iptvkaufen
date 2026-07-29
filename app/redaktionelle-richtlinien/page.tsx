import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.redaktionelleRichtlinien,
  description:
    "Redaktionelle Richtlinien von iptvkaufenX: Erstellung, Prüfung und Aktualisierung von Blog-Inhalten.",
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
      "Blog-Artikel werden von der iptvkaufenX Redaktion (Rolle: IPTV Experten) erstellt. Themen orientieren sich an praxisrelevanten Fragen zu IPTV in Deutschland – etwa Anbieterwahl, Abonnements, Geräte, Apps, Einrichtung, Tests, Premium-Qualität und Senderlisten.",
      "Texte sollen verständlich, nachvollziehbar und an den auf der Website dokumentierten Leistungen ausgerichtet sein. Marketingaussagen werden von redaktioneller Erklärung getrennt, soweit der Beitragskontext dies zulässt.",
    ],
  },
  {
    title: "Prüfung und Aktualisierung",
    paragraphs: [
      "Die Inhalte dieser Website werden mit Sorgfalt erstellt und regelmäßig geprüft. Bei Blog-Beiträgen werden Veröffentlichungs- und Aktualisierungsdaten ausgewiesen.",
      "Wenn sich technische Hinweise, Produktangaben oder verlinkte Seiten ändern, prüfen wir betroffene Beiträge und passen sie bei Bedarf an. Eine lückenlose Garantie für Vollständigkeit und Aktualität aller Angaben kann dennoch nicht übernommen werden.",
    ],
  },
  {
    title: "Quellen und Belege",
    paragraphs: [
      "Redaktionelle Beiträge stützen sich auf die auf iptvkaufenx.de veröffentlichten Produkt- und Serviceinformationen sowie auf allgemein zugängliches Fachwissen zu IPTV-Technik, Geräten und Apps.",
      "Wir erfinden keine Unternehmensdaten, Zertifikate, Auszeichnungen oder Personenangaben. Wo wir auf externe Angebote oder Tools verweisen, bleibt die Verantwortung für deren Inhalte beim jeweiligen Betreiber.",
    ],
  },
  {
    title: "Korrekturen",
    paragraphs: [
      "Stellen Sie einen sachlichen Fehler in einem Blog-Beitrag fest, melden Sie ihn bitte über [Kontakt](/kontakt), per E-Mail an support@iptvkaufenx.de oder contact@iptvkaufenx.de beziehungsweise über WhatsApp (+44 7832 620735, internationaler Support auf Deutsch).",
      "Bestätigte Fehler korrigieren wir zeitnah und aktualisieren den Beitrag entsprechend.",
    ],
  },
  {
    title: "Kommerzielle Absicht",
    paragraphs: [
      "iptvkaufenX verkauft einen digitalen IPTV-Dienst. Blog-Inhalte dienen der Information und Orientierung; sie können auf Angebote wie [Preise](/preise), [Senderliste](/senderliste) oder den 24-Stunden-Test hinweisen.",
      "Diese kommerzielle Absicht wird hier offen benannt. Redaktionelle Ratgeber ersetzen keine individuelle Beratung; bei konkreten Bestell- oder Einrichtungsfragen hilft der Support unter [Kontakt](/kontakt).",
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
        updatedAt="11. Juli 2026"
        intro="So entstehen, prüfen und aktualisieren wir Blog-Inhalte bei iptvkaufenX – transparent und mit klarer Trennung von Information und Angebot."
        sections={sections}
      />
    </>
  );
}
