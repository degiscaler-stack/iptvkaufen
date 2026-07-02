import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { WHATSAPP_CHAT_URL } from "@/lib/contact";
import { buildPageMetadata } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.impressum,
  description: "Impressum und Kontaktinformationen von iptvkaufenX.",
  path: "/impressum",
  noIndex: true,
});

const sections: LegalSection[] = [
  {
    title: "Angaben gemäß § 5 TMG",
    paragraphs: [
      "Angaben gemäß § 5 TMG werden vom Betreiber bereitgestellt.",
      "Diese Seite dient als zentrale Anlaufstelle für gesetzliche Anbieterinformationen und Kontaktmöglichkeiten zur Website iptvkaufenx.de.",
    ],
  },
  {
    title: "Website",
    paragraphs: ["Website: iptvkaufenx.de"],
  },
  {
    title: "Kontakt",
    paragraphs: ["E-Mail: support@iptvkaufenx.de"],
    contactLinks: [
      {
        prefix: "WhatsApp",
        href: WHATSAPP_CHAT_URL,
        label: "Über WhatsApp kontaktieren",
        ariaLabel: "Über WhatsApp kontaktieren",
      },
    ],
  },
  {
    title: "Digitaler Service",
    paragraphs: [
      "iptvkaufenX bietet einen digitalen Dienst an. Die Bereitstellung, Aktivierung und Unterstützung erfolgen digital über die angegebenen Kontaktwege.",
      "Bei Fragen zur Bestellung, Aktivierung, Einrichtung oder Nutzung wenden Sie sich bitte an den Support.",
    ],
  },
  {
    title: "Verantwortung für Inhalte",
    paragraphs: [
      "Die Inhalte dieser Website werden mit Sorgfalt erstellt und regelmäßig geprüft. Dennoch kann keine Gewähr für Vollständigkeit, Aktualität und Richtigkeit aller Angaben übernommen werden.",
    ],
  },
  {
    title: "Externe Links",
    paragraphs: [
      "Diese Website kann Links zu externen Angeboten enthalten. Für Inhalte externer Seiten ist ausschließlich der jeweilige Betreiber verantwortlich.",
    ],
  },
  {
    title: "Streitbeilegung",
    paragraphs: [
      "Sofern gesetzlich erforderlich, werden Informationen zu Verbraucherstreitbeilegung und zuständigen Stellen durch den Betreiber bereitgestellt.",
    ],
  },
];

export default function ImpressumPage() {
  return (
    <LegalPage
      eyebrow="Impressum"
      title="Impressum"
      updatedAt="13. Juni 2026"
      intro="Hier finden Sie die Anbieter- und Kontaktinformationen zur Website iptvkaufenx.de."
      sections={sections}
    />
  );
}
