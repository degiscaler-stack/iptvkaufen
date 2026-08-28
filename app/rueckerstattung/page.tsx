import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildPageMetadata } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.rueckerstattung,
  description:
    "Hinweise zu Rückerstattungen: iptvkaufenX verkauft derzeit keine IPTV-Abonnements über diese Website.",
  path: "/rueckerstattung",
  noIndex: true,
});

const sections: LegalSection[] = [
  {
    title: "Kein Verkauf über diese Website",
    paragraphs: [
      "iptvkaufenX veröffentlicht technische Informationen zu IPTV. Über diese Website werden derzeit keine IPTV-Abonnements, Tests oder Programmpakete verkauft.",
      "Eine Rückerstattung für neue Käufe über iptvkaufenx.de entfällt daher, weil keine solchen Käufe angeboten werden.",
    ],
  },
  {
    title: "Bestehende Anfragen",
    paragraphs: [
      "Falls Sie eine historische Zahlungsfrage haben, beschreiben Sie den Vorgang über [Kontakt](/kontakt) oder per E-Mail an support@iptvkaufenx.de. Jede Anfrage wird einzeln geprüft.",
      "Bitte geben Sie nach Möglichkeit Datum, verwendeten Kontaktweg und eine kurze Beschreibung an.",
    ],
  },
  {
    title: "Redaktionelle Inhalte",
    paragraphs: [
      "Blog-Artikel, Ratgeber und technische Erklärungen sind kostenfrei zugänglich. Sie begründen keinen Kaufvertrag und keine Zugriffsberechtigung auf Programme Dritter.",
    ],
  },
];

export default function RueckerstattungPage() {
  return (
    <LegalPage
      eyebrow="Rückerstattung"
      title="Hinweise zu Rückerstattungen"
      updatedAt="28. August 2026"
      intro="Diese Seite klärt, dass iptvkaufenX derzeit keine IPTV-Abonnements über die Website verkauft. Neue Käufe und damit verbundene Rückerstattungen werden hier nicht angeboten."
      sections={sections}
    />
  );
}
