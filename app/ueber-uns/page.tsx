import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.ueberUns,
  description:
    "Über iptvkaufenX: digitaler IPTV-Service mit 22.000+ Sendern, Support und transparenten Informationen.",
  path: "/ueber-uns",
});

const sections: LegalSection[] = [
  {
    title: "Wer wir sind",
    paragraphs: [
      "iptvkaufenX ist die Marke hinter dem digitalen IPTV-Angebot auf [iptvkaufenx.de](https://iptvkaufenx.de). Wir betreiben die Website und den zugehörigen Service für Nutzerinnen und Nutzer, die Live-TV, Filme, Serien und Sport über das Internet nutzen möchten.",
      "Diese Seite stellt dar, was wir anbieten und wie Sie uns erreichen – ohne erfundene Unternehmensangaben. Gesetzliche Anbieterinformationen finden Sie im [Impressum](/impressum).",
    ],
  },
  {
    title: "Was wir anbieten",
    paragraphs: [
      "iptvkaufenX bietet einen digitalen IPTV-Dienst mit über 22.000 Sendern, Inhalten in HD und 4K sowie Filmen, Serien und Sport. Die Nutzung ist auf bis zu zwei Geräten gleichzeitig vorgesehen.",
      "Zum Kennenlernen steht ein 24-Stunden-Test für 3 € zur Verfügung. Für gebuchte Pakete gilt eine 30-Tage-Geld-zurück-Garantie gemäß unserer [Rückerstattungsrichtlinie](/rueckerstattung). Aktuelle Pakete und Preise finden Sie unter [Preise](/preise); eine Übersicht der Kanäle unter [Senderliste](/senderliste).",
    ],
  },
  {
    title: "Support",
    paragraphs: [
      "Bei Fragen zu Bestellung, Aktivierung, Einrichtung oder Nutzung erreichen Sie uns digital. Unser internationaler WhatsApp-Support steht auf Deutsch unter +44 7832 620735 zur Verfügung.",
      "Per E-Mail erreichen Sie uns unter support@iptvkaufenx.de und contact@iptvkaufenx.de. Weitere Wege und Hinweise finden Sie auf der Seite [Kontakt](/kontakt).",
    ],
  },
  {
    title: "Transparenz",
    paragraphs: [
      "Die Inhalte dieser Website werden mit Sorgfalt erstellt und regelmäßig geprüft. Dennoch kann keine Gewähr für Vollständigkeit, Aktualität und Richtigkeit aller Angaben übernommen werden – wie im [Impressum](/impressum) beschrieben.",
      "Fachbeiträge und Ratgeber erscheinen im [Blog](/blog) unter dem Autorenhinweis [iptvkaufenX Redaktion](/autor). Redaktionelle und inhaltliche Standards sind in den [redaktionellen Richtlinien](/redaktionelle-richtlinien) und den [Inhaltsrichtlinien](/inhaltsrichtlinien) dargelegt.",
      "Auf der Website sind zudem veröffentlichte Kontaktkanäle zu Facebook (VisionHub), Instagram (visionhub.media) und X hinterlegt. Diese dienen der Erreichbarkeit; nähere Angaben dazu finden Sie unter [Kontakt](/kontakt).",
    ],
  },
  {
    title: "Weiterführende Seiten",
    items: [
      "[Senderliste](/senderliste) – Kanalübersicht und Verfügbarkeit",
      "[Blog](/blog) – Ratgeber und Guides zu IPTV",
      "[Preise](/preise) – Pakete, Test und Konditionen",
      "[Kontakt](/kontakt) – E-Mail, WhatsApp und Formular",
      "[Impressum](/impressum) – Anbieter- und Kontaktinformationen",
      "[Autor](/autor) – iptvkaufenX Redaktion",
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
        updatedAt="11. Juli 2026"
        intro="iptvkaufenX bietet einen digitalen IPTV-Service für Deutschland – mit klaren Leistungsangaben, erreichbarem Support und transparenten Informationen auf iptvkaufenx.de."
        sections={sections}
      />
    </>
  );
}
