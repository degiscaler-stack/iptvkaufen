import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.inhaltsrichtlinien,
  description:
    "Inhaltsrichtlinien von iptvkaufenX: Genauigkeit, erlaubte Aussagen und Hinweise zur technischen Information.",
  path: "/inhaltsrichtlinien",
});

const sections: LegalSection[] = [
  {
    title: "Welche Inhalte wir veröffentlichen",
    paragraphs: [
      "Auf iptvkaufenx.de veröffentlichen wir redaktionelle Beiträge im [Blog](/blog) sowie Informationen zur Website, zum Kontakt und zu rechtlichen Hinweisen wie [Impressum](/impressum), Datenschutz und Nutzungsbedingungen.",
      "Blog-Themen decken unter anderem IPTV-Technik in Deutschland, Geräte und Apps, M3U-Playlisten und Einrichtung ab. Autorin der Beiträge ist die [iptvkaufenX Redaktion](/autor).",
    ],
  },
  {
    title: "Genauigkeitsstandards",
    paragraphs: [
      "Inhalte werden mit Sorgfalt erstellt und regelmäßig geprüft. Technische Tipps beschreiben typische Setups und Vorgehensweisen. Die tatsächliche Funktion hängt von Gerät, App, Internetverbindung und korrekter Einrichtung ab.",
      "iptvkaufenX verkauft keine IPTV-Zugänge und stellt keine Senderkataloge, Pay-TV- oder Sportrechte Dritter bereit. Leistungsangaben zu Abonnements oder Programmpaketen gehören nicht zu den veröffentlichten Inhalten.",
    ],
  },
  {
    title: "Keine erfundenen Angaben",
    paragraphs: [
      "Wir erfinden keine Firmenadresse, Rechtsform, Erfahrungsjahre, Auszeichnungen, Zertifikate, Lizenzen, Senderpartnerschaften oder Mitarbeiternamen. Wo solche Angaben fehlen, bleiben sie bewusst ungenannt.",
      "Soziale Kanäle (Facebook, Instagram, TikTok, X, Pinterest und YouTube), die auf der Website als Kontaktwege veröffentlicht sind, werden als solche genannt – ohne darüber hinausgehende Eigentums- oder Partnerschaftsbehauptungen.",
    ],
  },
  {
    title: "Hinweise zur Nutzung der Informationen",
    paragraphs: [
      "Die Ratgeber ersetzen keine individuelle Beratung und keine rechtliche Prüfung eines IPTV-Angebots Dritter. Prüfen Sie Rechte, Verträge und technische Voraussetzungen selbst.",
      "Bei Fragen zu Artikeln wenden Sie sich an [Kontakt](/kontakt) oder die E-Mail-Adressen support@iptvkaufenx.de und contact@iptvkaufenx.de.",
    ],
  },
  {
    title: "Redaktionelle Einordnung",
    paragraphs: [
      "Wie Inhalte entstehen, geprüft und korrigiert werden, ist in den [redaktionellen Richtlinien](/redaktionelle-richtlinien) beschrieben.",
    ],
  },
  {
    title: "Verwandte Seiten",
    items: [
      "[Redaktionelle Richtlinien](/redaktionelle-richtlinien)",
      "[Autor](/autor) – iptvkaufenX Redaktion",
      "[Blog](/blog)",
      "[Über uns](/ueber-uns)",
    ],
  },
];

const breadcrumbItems = [
  { name: "Startseite", path: "/" },
  { name: "Inhaltsrichtlinien", path: "/inhaltsrichtlinien" },
];

export default function InhaltsrichtlinienPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      <LegalPage
        eyebrow="Inhalte"
        title="Inhaltsrichtlinien"
        updatedAt="28. August 2026"
        intro="Diese Inhaltsrichtlinien legen fest, welche Angaben iptvkaufenX veröffentlicht und dass die Website technische Information bietet – keine IPTV-Zugänge."
        sections={sections}
      />
    </>
  );
}
