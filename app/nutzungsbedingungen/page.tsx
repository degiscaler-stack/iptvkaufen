import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen | iptvkaufenX",
  description:
    "Nutzungsbedingungen von iptvkaufenX für Nutzung, Zugangsdaten, Gerätekompatibilität, Zahlungen und Support.",
  robots: {
    index: false,
    follow: true,
  },
};

const sections: LegalSection[] = [
  {
    title: "Nutzung des Services",
    paragraphs: [
      "iptvkaufenX bietet einen digitalen Dienst zur Nutzung von IPTV-Inhalten auf kompatiblen Geräten an. Die Nutzung setzt eine geeignete App, ein kompatibles Gerät und eine stabile Internetverbindung voraus.",
      "Mit der Bestellung und Nutzung des Dienstes akzeptieren Sie diese Nutzungsbedingungen.",
    ],
  },
  {
    title: "Zugangsdaten",
    paragraphs: [
      "Zugangsdaten werden nach erfolgreicher Bestellung bereitgestellt. Sie sind sorgfältig aufzubewahren und dürfen nicht unbefugt weitergegeben, verkauft oder öffentlich veröffentlicht werden.",
      "Der Nutzer ist dafür verantwortlich, Zugangsdaten vor dem Zugriff Dritter zu schützen.",
    ],
  },
  {
    title: "Gerätekompatibilität",
    paragraphs: [
      "Der Dienst kann auf vielen modernen Geräten genutzt werden, darunter Smart TV, Android TV, Fire TV, MAG Box, Windows, Smartphone, Tablet und TV Box.",
      "Die tatsächliche Funktion hängt vom Gerät, der App-Version, dem Betriebssystem, der Internetverbindung und der korrekten Einrichtung ab.",
    ],
  },
  {
    title: "Verantwortung des Nutzers",
    items: [
      "Der Nutzer stellt sicher, dass die verwendete App und das Gerät korrekt eingerichtet sind.",
      "Der Nutzer verwendet den Zugang nur im Rahmen des gewählten Pakets.",
      "Der Nutzer unterlässt missbräuchliche Nutzung, Weitergabe, Weiterverkauf oder technische Manipulation.",
      "Der Nutzer informiert den Support zeitnah, wenn technische Probleme auftreten.",
    ],
  },
  {
    title: "Verfügbarkeit",
    paragraphs: [
      "iptvkaufenX bemüht sich um eine stabile Bereitstellung des digitalen Dienstes. Kurzzeitige Unterbrechungen durch Wartung, technische Störungen, Drittanbieter, Internetprobleme oder höhere Gewalt können jedoch nicht vollständig ausgeschlossen werden.",
      "Eine dauerhaft unterbrechungsfreie Verfügbarkeit kann nicht garantiert werden.",
    ],
  },
  {
    title: "Zahlungen",
    paragraphs: [
      "Die Zahlung erfolgt vor Bereitstellung des digitalen Zugangs. Preise, Laufzeiten und Paketdetails ergeben sich aus den zum Zeitpunkt der Bestellung angezeigten Angaben.",
      "Nach erfolgreicher Zahlung wird die Aktivierung beziehungsweise Bereitstellung eingeleitet.",
    ],
  },
  {
    title: "Support",
    paragraphs: [
      "Bei Fragen zur Einrichtung oder Nutzung steht Support zur Verfügung. Support kann Hinweise zu Apps, Geräten, Zugangsdaten und allgemeinen Einrichtungsschritten geben.",
      "Der Nutzer muss bei der Fehleranalyse angemessen mitwirken, zum Beispiel durch Angabe des Geräts, der App und einer Beschreibung des Problems.",
    ],
  },
  {
    title: "Einschränkungen",
    items: [
      "Der Dienst darf nicht für rechtswidrige Zwecke genutzt werden.",
      "Zugangsdaten dürfen nicht weiterverkauft oder öffentlich geteilt werden.",
      "Technische Schutzmaßnahmen, Limits oder Paketbedingungen dürfen nicht umgangen werden.",
      "Bei missbräuchlicher Nutzung kann der Zugang eingeschränkt oder gesperrt werden.",
    ],
  },
  {
    title: "Änderungen der Bedingungen",
    paragraphs: [
      "iptvkaufenX kann diese Nutzungsbedingungen anpassen, wenn technische, rechtliche oder organisatorische Gründe dies erforderlich machen.",
      "Es gilt die jeweils auf dieser Website veröffentlichte Fassung.",
    ],
  },
  {
    title: "Hinweis zum digitalen Dienst",
    paragraphs: [
      "Der Service wird digital bereitgestellt. Nach Aktivierung oder Übermittlung der Zugangsdaten kann die Leistung unmittelbar genutzt werden.",
    ],
  },
];

export default function NutzungsbedingungenPage() {
  return (
    <LegalPage
      eyebrow="Bedingungen"
      title="Nutzungsbedingungen"
      updatedAt="13. Juni 2026"
      intro="Diese Nutzungsbedingungen regeln die Nutzung des digitalen IPTV-Dienstes von iptvkaufenX."
      sections={sections}
    />
  );
}
