import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.ueberUns,
  description:
    "Über iptvkaufenX: redaktionelle Website mit technischen Informationen zu IPTV, Apps, Geräten und Einrichtung.",
  path: "/ueber-uns",
});

const sections: LegalSection[] = [
  {
    title: "Wer wir sind",
    paragraphs: [
      "iptvkaufenX ist die Marke hinter den redaktionellen Inhalten auf [iptvkaufenx.de](https://iptvkaufenx.de). Wir veröffentlichen technische Informationen zu IPTV in Deutschland – zu Apps, Geräten, Playlisten, Einrichtung und Fehlerbehebung.",
      "Diese Seite beschreibt den redaktionellen Zweck der Website. Gesetzliche Anbieterinformationen finden Sie im [Impressum](/impressum).",
    ],
  },
  {
    title: "Was wir veröffentlichen",
    paragraphs: [
      "iptvkaufenX erklärt IPTV als Technik: Übertragung über das Internet Protocol, Player-Apps, M3U/M3U8-Playlisten und typische Geräte. Die Beiträge dienen der Orientierung, nicht dem Verkauf von Zugängen.",
      "Die Website verkauft keine IPTV-Abonnements, stellt keine Senderkataloge bereit und vermittelt keinen Zugang zu Pay-TV, Sportrechten, Filmen oder Serien Dritter. Eine Lizenz, Partnerschaft oder Autorisierung durch Sender oder Streaming-Dienste besteht nicht.",
    ],
  },
  {
    title: "Redaktion und Kontakt",
    paragraphs: [
      "Fachbeiträge erscheinen im [Blog](/blog) unter dem Autorenhinweis [iptvkaufenX Redaktion](/autor). Standards sind in den [redaktionellen Richtlinien](/redaktionelle-richtlinien) und den [Inhaltsrichtlinien](/inhaltsrichtlinien) beschrieben.",
      "Redaktionelle Fragen, Korrekturhinweise und allgemeine Anliegen erreichen uns über [Kontakt](/kontakt), per E-Mail an support@iptvkaufenx.de und contact@iptvkaufenx.de sowie über WhatsApp (+44 7832 620735, Kontakt auf Deutsch).",
    ],
  },
  {
    title: "Transparenz",
    paragraphs: [
      "Die Inhalte dieser Website werden mit Sorgfalt erstellt und regelmäßig geprüft. Dennoch kann keine Gewähr für Vollständigkeit, Aktualität und Richtigkeit aller Angaben übernommen werden – wie im [Impressum](/impressum) beschrieben.",
      "Wir erfinden keine Unternehmenslizenzen, Senderpartnerschaften oder Rechteinhaberschaften. Wo solche Nachweise fehlen, bleiben sie ungenannt.",
    ],
  },
  {
    title: "Weiterführende Seiten",
    items: [
      "[Blog](/blog) – technische Ratgeber und Guides",
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
        updatedAt="28. August 2026"
        intro="iptvkaufenX veröffentlicht technische Informationen zu IPTV in Deutschland – zu Apps, Geräten, Playlisten, Einrichtung und Fehlerbehebung. Die Website verkauft keine IPTV-Zugänge."
        sections={sections}
      />
    </>
  );
}
