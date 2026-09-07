import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.ueberUns,
  description:
    "Über iptvkaufenX: Marke und digitaler IPTV-Service für Deutschland – Leistungen, Support und transparente Informationen auf iptvkaufenx.de.",
  path: "/ueber-uns",
});

const sections: LegalSection[] = [
  {
    title: "Wer wir sind",
    paragraphs: [
      "iptvkaufenX ist die Marke und Website hinter dem digitalen IPTV-Angebot auf [iptvkaufenx.de](https://iptvkaufenx.de). Wir richten uns an Nutzerinnen und Nutzer in Deutschland, die Live-TV, Filme und Serien über das Internet auf kompatiblen Geräten nutzen möchten.",
      "Auf dieser Seite erfahren Sie, was der Service umfasst, wie Sie uns erreichen und wo Sie rechtliche sowie redaktionelle Informationen finden. Gesetzliche Anbieterangaben stehen im [Impressum](/impressum).",
    ],
  },
  {
    title: "Was Nutzer erwarten können",
    paragraphs: [
      "iptvkaufenX bietet einen digitalen IPTV-Dienst mit flexiblen Paketlaufzeiten. Je nach gewähltem Paket sind Inhalte in HD, Full HD und 4K verfügbar; die gleichzeitige Nutzung auf mehreren Geräten richtet sich nach dem gebuchten Tarif.",
      "Die Einrichtung erfolgt digital – in der Regel mit Zugangsdaten und einer passenden App auf dem gewünschten Gerät. Aktuelle Pakete, Geräteoptionen und Preise sind auf der Website unter [Preise](/#pakete-start) einsehbar.",
      "Zum Kennenlernen steht ein 24-Stunden-Test für 3 € zur Verfügung. Für gebuchte Pakete gilt eine 30-Tage-Geld-zurück-Garantie gemäß unserer [Rückerstattungsrichtlinie](/rueckerstattung).",
    ],
  },
  {
    title: "Support",
    paragraphs: [
      "Bei Fragen zu Bestellung, Aktivierung, Einrichtung oder Nutzung erreichen Sie uns digital. Unser internationaler WhatsApp-Support ist auf Deutsch unter +44 7832 620735 erreichbar.",
      "Per E-Mail wenden Sie sich an support@iptvkaufenx.de oder contact@iptvkaufenx.de. Formular, weitere Kontaktwege und Hinweise finden Sie auf der Seite [Kontakt](/kontakt).",
    ],
  },
  {
    title: "Transparenz",
    paragraphs: [
      "Paketdetails, Preise und Leistungsangaben werden auf der Website ausgewiesen. Rechtliche Informationen zum Anbieter finden Sie im [Impressum](/impressum); zum Datenschutz in der [Datenschutzrichtlinie](/datenschutz). Nutzungsbedingungen und Rückerstattungsregeln sind unter [Nutzungsbedingungen](/nutzungsbedingungen) bzw. [Rückerstattungsrichtlinie](/rueckerstattung) abrufbar.",
      "Die Inhalte dieser Website werden mit Sorgfalt erstellt und regelmäßig geprüft. Dennoch kann keine Gewähr für Vollständigkeit, Aktualität und Richtigkeit aller Angaben übernommen werden – wie im [Impressum](/impressum) beschrieben.",
      "Ratgeber und Fachbeiträge erscheinen im [Blog](/blog) unter dem Autorenhinweis [iptvkaufenX Redaktion](/autor). Standards für redaktionelle und veröffentlichte Inhalte sind in den [redaktionellen Richtlinien](/redaktionelle-richtlinien) und [Inhaltsrichtlinien](/inhaltsrichtlinien) beschrieben.",
    ],
  },
  {
    title: "Weiterführende Seiten",
    items: [
      "[Blog](/blog) – Ratgeber und Guides zu IPTV",
      "[Preise](/#pakete-start) – Pakete, Test und Konditionen",
      "[Kontakt](/kontakt) – E-Mail, WhatsApp und Formular",
      "[Impressum](/impressum) – Anbieter- und Kontaktinformationen",
      "[Autor](/autor) – iptvkaufenX Redaktion",
      "[Datenschutz](/datenschutz) – Datenschutzrichtlinie",
      "[Nutzungsbedingungen](/nutzungsbedingungen) – Nutzungsbedingungen",
      "[Rückerstattung](/rueckerstattung) – Rückerstattungsrichtlinie",
    ],
  },
];

const breadcrumbItems = [
  { name: "Startseite", path: "/" },
  { name: "Über uns", path: "/ueber-uns" },
];

export default function UeberUnsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      <LegalPage
        eyebrow="Über uns"
        title="Über uns"
        updatedAt="7. September 2026"
        intro="iptvkaufenX ist die Marke hinter iptvkaufenx.de – ein digitaler IPTV-Service für Deutschland mit ausgewiesenen Paketen, erreichbarem Support und verlinkten Rechts- sowie Richtlinien-Seiten."
        sections={sections}
      />
    </>
  );
}
