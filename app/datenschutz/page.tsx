import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildPageMetadata } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.datenschutz,
  description:
    "Datenschutzrichtlinie von iptvkaufenX: Informationen zur Verarbeitung von Kontakt- und Zugriffsdaten.",
  path: "/datenschutz",
  noIndex: true,
});

const sections: LegalSection[] = [
  {
    title: "Verantwortlicher",
    paragraphs: [
      "Verantwortlich für die Verarbeitung personenbezogener Daten im Zusammenhang mit dieser Website ist der Betreiber von iptvkaufenX.",
      "Angaben gemäß § 5 TMG und weitere Betreiberinformationen werden vom Betreiber bereitgestellt. Für Datenschutzanfragen erreichen Sie uns über die unten genannten Kontaktmöglichkeiten.",
    ],
  },
  {
    title: "Welche Daten verarbeitet werden",
    paragraphs: [
      "Wir verarbeiten nur Daten, die für den Betrieb der Website, Kontaktanfragen und gesetzliche Pflichten erforderlich sind.",
    ],
    items: [
      "Kontaktangaben, wenn Sie uns per Formular, WhatsApp oder E-Mail kontaktieren.",
      "Technische Zugriffsdaten, die beim Besuch der Website automatisch entstehen.",
      "Kommunikationsinhalte, wenn Sie redaktionelle oder technische Fragen stellen.",
    ],
  },
  {
    title: "Kontaktaufnahme per Formular, WhatsApp oder E-Mail",
    paragraphs: [
      "Wenn Sie uns kontaktieren, verarbeiten wir Ihre Nachricht, die verwendete Kontaktadresse sowie alle Informationen, die Sie freiwillig übermitteln.",
      "Diese Daten nutzen wir, um Ihre Anfrage zu beantworten.",
    ],
  },
  {
    title: "Keine Bestell- oder Zahlungsabwicklung auf der Website",
    paragraphs: [
      "Über diese Website werden derzeit keine IPTV-Abonnements verkauft. Es findet keine Zahlungsabwicklung für Programmpakete statt.",
      "iptvkaufenX speichert keine vollständigen Zahlungsdaten wie vollständige Kartennummern.",
    ],
  },
  {
    title: "Server- und Zugriffsdaten",
    paragraphs: [
      "Beim Besuch der Website können technische Daten verarbeitet werden, zum Beispiel IP-Adresse, Browsertyp, Betriebssystem, aufgerufene Seiten, Referrer-URL und Uhrzeit der Anfrage.",
      "Diese Daten dienen der Sicherheit, Stabilität, Fehleranalyse und technischen Bereitstellung der Website.",
    ],
  },
  {
    title: "Cookies / technische Funktionen",
    paragraphs: [
      "Die Website kann technisch notwendige Funktionen verwenden, die für Darstellung, Navigation, Sicherheit oder Performance erforderlich sind.",
      "Soweit Cookies oder vergleichbare Technologien eingesetzt werden, geschieht dies zur technisch stabilen Nutzung der Website oder auf Grundlage Ihrer Einwilligung, sofern eine solche rechtlich erforderlich ist.",
    ],
  },
  {
    title: "Zweck der Verarbeitung",
    items: [
      "Bereitstellung und Sicherheit der Website.",
      "Bearbeitung von Kontakt- und Korrekturanfragen.",
      "Erfüllung gesetzlicher Aufbewahrungs- und Nachweispflichten.",
    ],
  },
  {
    title: "Speicherdauer",
    paragraphs: [
      "Personenbezogene Daten werden nur so lange gespeichert, wie dies für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.",
      "Support- und Kommunikationsdaten können gelöscht werden, sobald die Anfrage abschließend bearbeitet wurde und keine rechtlichen Gründe für eine weitere Speicherung bestehen.",
    ],
  },
  {
    title: "Rechte der Nutzer",
    paragraphs: [
      "Sie haben im Rahmen der gesetzlichen Vorgaben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen.",
      "Wenn eine Verarbeitung auf Einwilligung beruht, können Sie diese Einwilligung mit Wirkung für die Zukunft widerrufen.",
    ],
  },
];

export default function DatenschutzPage() {
  return (
    <LegalPage
      eyebrow="Datenschutz"
      title="Datenschutzrichtlinie"
      updatedAt="28. August 2026"
      intro="Diese Datenschutzrichtlinie erklärt, welche Daten bei der Nutzung der Website iptvkaufenx.de verarbeitet werden."
      sections={sections}
    />
  );
}
