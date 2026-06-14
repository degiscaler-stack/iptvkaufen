import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Rückerstattungsrichtlinie | iptvkaufenX",
  description:
    "Rückerstattungsrichtlinie von iptvkaufenX für digitale IPTV-Dienste, Aktivierung, Bereitstellung und Supportanfragen.",
  robots: {
    index: false,
    follow: true,
  },
};

const sections: LegalSection[] = [
  {
    title: "Digitale Dienstleistung",
    paragraphs: [
      "iptvkaufenX stellt einen digitalen Dienst bereit. Nach der Bereitstellung von Zugangsdaten, Aktivierung oder technischen Nutzungsinformationen beginnt die Leistungserbringung.",
      "Da digitale Dienste unmittelbar nach Bereitstellung genutzt werden können, werden Rückerstattungen sorgfältig geprüft und hängen vom Einzelfall ab.",
    ],
  },
  {
    title: "Aktivierung und Bereitstellung",
    paragraphs: [
      "Nach erfolgreicher Bestellung werden die Zugangsdaten oder die notwendigen Aktivierungsinformationen schnell bereitgestellt.",
      "Sobald ein digitaler Zugang erstellt, übermittelt oder aktiviert wurde, gilt die Leistung grundsätzlich als begonnen.",
    ],
  },
  {
    title: "Rückerstattungsprüfung",
    paragraphs: [
      "Jede Rückerstattungsanfrage wird einzeln geprüft. Für die Prüfung können Angaben zur Bestellung, zur Zahlung, zum Aktivierungszeitpunkt, zum verwendeten Gerät und zur technischen Situation erforderlich sein.",
      "Bitte kontaktieren Sie den Support zeitnah, wenn ein Problem mit der Aktivierung oder Nutzung auftritt, damit eine technische Prüfung möglich ist.",
    ],
  },
  {
    title: "Fälle, in denen Rückerstattung möglich ist",
    items: [
      "Wenn der digitale Zugang trotz erfolgreicher Zahlung nicht bereitgestellt wurde.",
      "Wenn ein technischer Fehler auf Seiten des Dienstes die Aktivierung dauerhaft verhindert und keine Lösung angeboten werden kann.",
      "Wenn versehentlich eine doppelte Zahlung für dieselbe Bestellung erfolgt ist.",
      "Wenn vor Bereitstellung oder Aktivierung des digitalen Zugangs eine berechtigte Stornierungsanfrage eingeht.",
    ],
  },
  {
    title: "Fälle, in denen keine Rückerstattung möglich ist",
    items: [
      "Wenn der digitale Zugang bereits bereitgestellt, aktiviert oder genutzt wurde.",
      "Wenn die Nutzung wegen falscher App, ungeeignetem Gerät, instabiler Internetverbindung oder fehlerhafter Einrichtung auf Nutzerseite nicht funktioniert.",
      "Wenn Zugangsdaten weitergegeben, mehrfach verwendet oder entgegen den Nutzungsbedingungen eingesetzt wurden.",
      "Wenn der Nutzer die notwendige technische Prüfung oder Supportunterstützung nicht ermöglicht.",
    ],
  },
  {
    title: "Kontakt für Rückerstattungsanfragen",
    paragraphs: [
      "Rückerstattungsanfragen müssen nachvollziehbar gestellt werden. Bitte geben Sie nach Möglichkeit Bestellinformationen, Zahlungsdatum, verwendetes Gerät und eine kurze Fehlerbeschreibung an.",
      "Der Support prüft die Anfrage und informiert Sie über das Ergebnis sowie mögliche nächste Schritte.",
    ],
  },
  {
    title: "Hinweis zum digitalen Dienst",
    paragraphs: [
      "Der Service von iptvkaufenX ist ein digital bereitgestellter Dienst. Rückerstattungen werden daher insbesondere danach beurteilt, ob die digitale Leistung bereits bereitgestellt, aktiviert oder genutzt wurde.",
    ],
  },
];

export default function RueckerstattungPage() {
  return (
    <LegalPage
      eyebrow="Rückerstattung"
      title="Rückerstattungsrichtlinie"
      updatedAt="13. Juni 2026"
      intro="Diese Richtlinie beschreibt, wie Rückerstattungsanfragen bei iptvkaufenX geprüft werden und welche Besonderheiten für digitale Dienste gelten."
      sections={sections}
    />
  );
}
