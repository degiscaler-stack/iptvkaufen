import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzrichtlinie | iptvkaufenX",
  description:
    "Datenschutzrichtlinie von iptvkaufenX: Informationen zur Verarbeitung von Kontakt-, Bestell-, Zahlungs- und Zugriffsdaten.",
  robots: {
    index: false,
    follow: true,
  },
};

const sections: LegalSection[] = [
  {
    title: "Verantwortlicher",
    paragraphs: [
      "Verantwortlich für die Verarbeitung personenbezogener Daten im Zusammenhang mit dieser Website und dem digitalen IPTV-Service ist der Betreiber von iptvkaufenX.",
      "Angaben gemäß § 5 TMG und weitere Betreiberinformationen werden vom Betreiber bereitgestellt. Für Datenschutzanfragen erreichen Sie uns über die unten genannten Kontaktmöglichkeiten.",
    ],
  },
  {
    title: "Welche Daten verarbeitet werden",
    paragraphs: [
      "Wir verarbeiten nur Daten, die für die Bereitstellung, Nutzung, Abwicklung und Verbesserung unseres digitalen Dienstes erforderlich sind.",
    ],
    items: [
      "Kontaktangaben, wenn Sie uns per WhatsApp oder E-Mail kontaktieren.",
      "Bestell- und Zugangsdaten, die für die Aktivierung des digitalen IPTV-Dienstes benötigt werden.",
      "Technische Zugriffsdaten, die beim Besuch der Website automatisch entstehen.",
      "Kommunikationsinhalte, wenn Sie Support oder Hilfe zur Einrichtung anfragen.",
    ],
  },
  {
    title: "Kontaktaufnahme per WhatsApp/E-Mail",
    paragraphs: [
      "Wenn Sie uns über WhatsApp oder E-Mail kontaktieren, verarbeiten wir Ihre Nachricht, die verwendete Kontaktadresse sowie alle Informationen, die Sie freiwillig übermitteln.",
      "Diese Daten nutzen wir, um Ihre Anfrage zu beantworten, Support zu leisten, Bestellungen zuzuordnen oder technische Hinweise zur Nutzung des digitalen Dienstes zu geben.",
    ],
  },
  {
    title: "Zahlungs- und Bestelldaten",
    paragraphs: [
      "Bei einer Bestellung können Daten zur gewählten Laufzeit, zum Status der Zahlung, zur Aktivierung und zur Bereitstellung des Zugangs verarbeitet werden.",
      "Zahlungsinformationen werden, soweit externe Zahlungsdienste eingesetzt werden, durch den jeweiligen Zahlungsanbieter nach dessen Datenschutzregeln verarbeitet. iptvkaufenX speichert keine vollständigen Zahlungsdaten wie vollständige Kartennummern.",
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
      "Bereitstellung und Aktivierung des digitalen IPTV-Dienstes.",
      "Bearbeitung von Bestellungen, Supportanfragen und technischen Problemen.",
      "Verbesserung der Website, Sicherheit und Missbrauchsvermeidung.",
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
  {
    title: "Hinweis zum digitalen Dienst",
    paragraphs: [
      "iptvkaufenX bietet einen digitalen Dienst an. Für Aktivierung, technische Bereitstellung, Support und Verwaltung des Zugangs können die dafür erforderlichen Daten verarbeitet werden.",
    ],
  },
];

export default function DatenschutzPage() {
  return (
    <LegalPage
      eyebrow="Datenschutz"
      title="Datenschutzrichtlinie"
      updatedAt="13. Juni 2026"
      intro="Diese Datenschutzrichtlinie erklärt, welche Daten bei der Nutzung von iptvkaufenX verarbeitet werden und zu welchen Zwecken dies geschieht."
      sections={sections}
    />
  );
}
