import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildPageMetadata } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.nutzungsbedingungen,
  description:
    "Nutzungsbedingungen von iptvkaufenX für die Nutzung der informationalen Website.",
  path: "/nutzungsbedingungen",
  noIndex: true,
});

const sections: LegalSection[] = [
  {
    title: "Nutzung der Website",
    paragraphs: [
      "iptvkaufenX betreibt eine redaktionelle Website mit technischen Informationen zu IPTV. Die Nutzung der Inhalte setzt ein kompatibles Endgerät und eine Internetverbindung voraus.",
      "Mit dem Aufruf der Website akzeptieren Sie diese Nutzungsbedingungen.",
    ],
  },
  {
    title: "Keine IPTV-Zugänge",
    paragraphs: [
      "Diese Website verkauft keine IPTV-Abonnements, stellt keine Senderkataloge bereit und vermittelt keinen Zugang zu urheberrechtlich geschützten Programmen Dritter.",
      "Technische Erklärungen zu Playern, Playlisten und Geräten sind allgemein gehalten und ersetzen keine individuelle Beratung.",
    ],
  },
  {
    title: "Verantwortung der Nutzer",
    items: [
      "Nutzerinnen und Nutzer verwenden die Informationen eigenverantwortlich.",
      "Die Website darf nicht für rechtswidrige Zwecke genutzt werden.",
      "Inhalte dürfen nicht so dargestellt werden, als biete iptvkaufenX lizenzierte Programmpakete oder Pay-TV-Zugänge an.",
    ],
  },
  {
    title: "Verfügbarkeit",
    paragraphs: [
      "iptvkaufenX bemüht sich um eine stabile Bereitstellung der Website. Kurzzeitige Unterbrechungen durch Wartung, technische Störungen oder höhere Gewalt können nicht vollständig ausgeschlossen werden.",
      "Eine dauerhaft unterbrechungsfreie Verfügbarkeit kann nicht garantiert werden.",
    ],
  },
  {
    title: "Kontakt",
    paragraphs: [
      "Bei Fragen zu diesen Bedingungen oder zu den veröffentlichten Inhalten erreichen Sie uns über die Seite [Kontakt](/kontakt).",
    ],
  },
  {
    title: "Änderungen der Bedingungen",
    paragraphs: [
      "iptvkaufenX kann diese Nutzungsbedingungen anpassen, wenn technische, rechtliche oder organisatorische Gründe dies erforderlich machen.",
      "Es gilt die jeweils auf dieser Website veröffentlichte Fassung.",
    ],
  },
];

export default function NutzungsbedingungenPage() {
  return (
    <LegalPage
      eyebrow="Bedingungen"
      title="Nutzungsbedingungen"
      updatedAt="28. August 2026"
      intro="Diese Nutzungsbedingungen regeln die Nutzung der informationalen Website iptvkaufenx.de."
      sections={sections}
    />
  );
}
