import { WHATSAPP_PHONE_E164 } from "@/lib/contact";

export const RESELLER_PAGE = {
  path: "/reseller",
  title: "IPTV Reseller Deutschland – Credits & Reseller Panel | iptvkaufenX",
  description:
    "IPTV Reseller Deutschland: Credit-Pakete, Kundenverwaltung und deutschsprachiger Support. Reseller-Zugang bei iptvkaufenX anfragen.",
  h1: "IPTV Reseller Programm für Deutschland",
  packagesSectionId: "reseller-pakete",
} as const;

export const RESELLER_PACKAGE_FEATURES = [
  "Reseller-Panel",
  "Kundenverwaltung",
  "Zugänge erstellen und verwalten",
  "Credits flexibel einsetzen",
  "Deutschsprachiger Support",
  "Credits später nachladbar",
] as const;

export type ResellerPackageId = "starter" | "business" | "professional";

export type ResellerPackage = {
  id: ResellerPackageId;
  name: string;
  credits: number;
  creditsLabel: string;
  priceEuro: number;
  priceLabel: string;
  description: string;
  badge?: string;
  highlighted: boolean;
  whatsappMessage: string;
  buttonLabel: string;
};

export const RESELLER_PACKAGES: readonly ResellerPackage[] = [
  {
    id: "starter",
    name: "Starter",
    credits: 120,
    creditsLabel: "120 Credits",
    priceEuro: 339,
    priceLabel: "339 €",
    description: "Bis zu 10 Jahresabonnements",
    highlighted: false,
    whatsappMessage:
      "Hallo, ich interessiere mich für das Starter Reseller-Paket mit 120 Credits für 339 €. Bitte senden Sie mir weitere Informationen.",
    buttonLabel: "DIESES PAKET ANFRAGEN",
  },
  {
    id: "business",
    name: "Business",
    credits: 240,
    creditsLabel: "240 Credits",
    priceEuro: 559,
    priceLabel: "559 €",
    description: "Bis zu 20 Jahresabonnements",
    badge: "EMPFOHLEN",
    highlighted: true,
    whatsappMessage:
      "Hallo, ich interessiere mich für das Business Reseller-Paket mit 240 Credits für 559 €. Bitte senden Sie mir weitere Informationen.",
    buttonLabel: "DIESES PAKET ANFRAGEN",
  },
  {
    id: "professional",
    name: "Professional",
    credits: 720,
    creditsLabel: "720 Credits",
    priceEuro: 1549,
    priceLabel: "1.549 €",
    description: "Bis zu 60 Jahresabonnements",
    highlighted: false,
    whatsappMessage:
      "Hallo, ich interessiere mich für das Professional Reseller-Paket mit 720 Credits für 1.549 €. Bitte senden Sie mir weitere Informationen.",
    buttonLabel: "DIESES PAKET ANFRAGEN",
  },
] as const;

export function getResellerWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(message)}`;
}

export const RESELLER_CONSULTATION_WHATSAPP_MESSAGE =
  "Hallo, ich interessiere mich für das IPTV Reseller Programm und benötige eine Beratung.";

export const RESELLER_CONSULTATION_WHATSAPP_URL = getResellerWhatsAppUrl(
  RESELLER_CONSULTATION_WHATSAPP_MESSAGE,
);

export const RESELLER_CREDIT_MAPPING = [
  { duration: "1 Monat", credits: "1 Credit" },
  { duration: "3 Monate", credits: "3 Credits" },
  { duration: "6 Monate", credits: "6 Credits" },
  { duration: "12 Monate", credits: "12 Credits" },
  { duration: "24 Monate", credits: "24 Credits" },
] as const;

export const RESELLER_CREDIT_EXAMPLE =
  "Beispiel: Ein Zugang mit 12 Monaten Laufzeit benötigt 12 Credits.";

export const RESELLER_HERO_TRUST = [
  "Flexible Credit-Pakete",
  "Eigene Kundenverwaltung",
  "Deutschsprachiger Support",
  "Für Deutschland und Europa",
] as const;

export const RESELLER_INTRO_BENEFITS = [
  {
    title: "Eigene Marke",
    text: "Bauen Sie Ihr eigenes Kundenangebot auf und gestalten Sie Ihre Preise und Laufzeiten passend zu Ihrem Geschäftsmodell.",
    icon: "brand" as const,
  },
  {
    title: "Flexible Credits",
    text: "Nutzen Sie Credits für unterschiedliche Laufzeiten und laden Sie Ihr Guthaben bei Bedarf erneut auf.",
    icon: "credits" as const,
  },
  {
    title: "Zentrale Verwaltung",
    text: "Erstellen und verwalten Sie Kundenzugänge über eine übersichtliche Reseller-Lösung.",
    icon: "panel" as const,
  },
] as const;

export const RESELLER_STEPS = [
  {
    number: "01",
    title: "Paket auswählen",
    text: "Wählen Sie das Credit-Paket, das zu Ihrem geplanten Kundenvolumen passt.",
  },
  {
    number: "02",
    title: "Beratung über WhatsApp",
    text: "Kontaktieren Sie uns mit Ihrem gewünschten Paket und klären Sie offene Fragen.",
  },
  {
    number: "03",
    title: "Reseller-Zugang erhalten",
    text: "Nach der Einrichtung erhalten Sie Ihren Zugang zur Reseller-Verwaltung.",
  },
  {
    number: "04",
    title: "Kunden und Credits verwalten",
    text: "Erstellen Sie Kundenzugänge und setzen Sie Credits für die gewünschten Laufzeiten ein.",
  },
] as const;

export const RESELLER_PANEL_FEATURES = [
  {
    title: "Kundenzugänge erstellen",
    text: "Legen Sie neue Zugänge an und weisen Sie Laufzeiten über Credits zu.",
  },
  {
    title: "Laufzeiten verwalten",
    text: "Steuern Sie Monat-, Quartals- und Jahreszugänge über das Credit-System.",
  },
  {
    title: "Credit-Guthaben einsehen",
    text: "Behalten Sie Ihr aktuelles Guthaben und eingesetzte Credits im Überblick.",
  },
  {
    title: "Credits nachladen",
    text: "Ergänzen Sie Ihr Guthaben später, wenn Ihr Kundenvolumen wächst.",
  },
  {
    title: "Kunden übersichtlich organisieren",
    text: "Verwalten Sie bestehende Zugänge zentral in Ihrer Reseller-Oberfläche.",
  },
  {
    title: "Unterstützung auf Deutsch",
    text: "Bei Fragen zur Einrichtung und Nutzung steht deutschsprachiger Support bereit.",
  },
] as const;

export const RESELLER_ADVANTAGES = [
  {
    title: "Deutschsprachige Beratung",
    text: "Erhalten Sie Unterstützung bei Paketwahl, Einrichtung und Einstieg ins Reseller-Modell.",
  },
  {
    title: "Flexible Paketgrößen",
    text: "Starten Sie mit Starter, Business oder Professional – je nach geplantem Volumen.",
  },
  {
    title: "Klare Credit-Struktur",
    text: "Jede Laufzeit entspricht einer festen Credit-Anzahl – ohne versteckte Regeln.",
  },
  {
    title: "Unterstützung bei der Einrichtung",
    text: "Wir begleiten Sie beim Start, damit Sie Zugänge und Credits sicher verwalten können.",
  },
] as const;

export const RESELLER_TARGET_GROUPS = [
  {
    title: "Online-Unternehmer",
    text: "Für Anbieter, die IPTV-Zugänge als eigenes digitales Angebot aufbauen möchten.",
  },
  {
    title: "Agenturen und Dienstleister",
    text: "Für Teams, die Kunden betreuen und Zugänge zentral verwalten wollen.",
  },
  {
    title: "Technik- und Streaming-Berater",
    text: "Für Fachleute, die Einrichtung und Betreuung von Streaming-Zugängen anbieten.",
  },
  {
    title: "Bestehende Kundenbetreuer",
    text: "Für Betreuer mit bestehendem Kundenstamm, die Laufzeiten flexibel zuweisen möchten.",
  },
] as const;

export type ResellerFaqItem = {
  question: string;
  answer: string;
};

export const RESELLER_FAQ: readonly ResellerFaqItem[] = [
  {
    question: "Was ist ein IPTV Reseller?",
    answer:
      "Ein IPTV Reseller vertreibt IPTV-Zugänge an eigene Kunden. Über Credits und ein Reseller-Panel erstellen und verwalten Sie Kundenzugänge selbstständig.",
  },
  {
    question: "Wie funktioniert das Credit-System?",
    answer:
      "Credits werden entsprechend der gewählten Laufzeit verwendet. 1 Monat entspricht 1 Credit, 3 Monate 3 Credits, 6 Monate 6 Credits, 12 Monate 12 Credits und 24 Monate 24 Credits.",
  },
  {
    question: "Wie viele Credits benötige ich?",
    answer:
      "Das hängt von Ihrem geplanten Kundenvolumen und den angebotenen Laufzeiten ab. Starter bietet 120 Credits, Business 240 Credits und Professional 720 Credits.",
  },
  {
    question: "Kann ich Credits später nachladen?",
    answer:
      "Ja. Credits können bei Bedarf nachgeladen werden, wenn Ihr Kundenvolumen steigt oder Guthaben aufgebraucht ist.",
  },
  {
    question: "Welche Laufzeiten kann ich anbieten?",
    answer:
      "Sie können Zugänge mit 1, 3, 6, 12 oder 24 Monaten Laufzeit erstellen. Die benötigten Credits entsprechen jeweils der Monatanzahl.",
  },
  {
    question: "Benötige ich technische Erfahrung?",
    answer:
      "Grundkenntnisse im Umgang mit Online-Tools reichen in der Regel aus. Für die Einrichtung und Bedienung steht deutschsprachiger Support zur Verfügung.",
  },
  {
    question: "Gibt es deutschsprachigen Support?",
    answer:
      "Ja. Beratung und Unterstützung erfolgen auf Deutsch – über WhatsApp und die bekannten Kontaktwege von iptvkaufenX.",
  },
  {
    question: "Wie erhalte ich meinen Reseller-Zugang?",
    answer:
      "Wählen Sie ein Paket, kontaktieren Sie uns per WhatsApp und wir richten Ihren Reseller-Zugang nach der Bestätigung ein.",
  },
] as const;

export function buildResellerServiceSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/reseller#service`,
    name: "IPTV Reseller Programm Deutschland",
    description: RESELLER_PAGE.description,
    url: `${siteUrl}/reseller`,
    provider: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "iptvkaufenX",
    },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Place", name: "Europe" },
    ],
    serviceType: "IPTV Reseller Programm",
    offers: {
      "@type": "OfferCatalog",
      name: "IPTV Reseller Credit-Pakete",
      itemListElement: RESELLER_PACKAGES.map((pkg, index) => ({
        "@type": "Offer",
        position: index + 1,
        name: `${pkg.name} Reseller-Paket`,
        description: `${pkg.creditsLabel} – ${pkg.description}`,
        price: pkg.priceEuro.toFixed(2),
        priceCurrency: "EUR",
        url: `${siteUrl}/reseller#reseller-pakete`,
        availability: "https://schema.org/InStock",
      })),
    },
  };
}
