import { WHATSAPP_MESSAGES } from "@/lib/contact";
import { ANALYTICS_EVENTS, type AnalyticsEventName } from "@/lib/analytics";

export const MULTI_DEVICE_FEATURE =
  "Auf mehreren Geräten gleichzeitig nutzbar" as const;

export const MULTI_DEVICE_BADGE_TEXT = "MEHRERE GERÄTE GLEICHZEITIG";

export const MULTI_DEVICE_BADGE_SUPPORT =
  "Gleichzeitig auf TV, Smartphone & Tablet streamen";

export const PRICING_TRUST_LINE =
  "Mehrere Geräte gleichzeitig · 22.000+ Sender · HD, Full HD & 4K · Support auf Deutsch";

export const IPTV_PACKAGE_FEATURES = [
  "22.000+ Live-TV Sender",
  "Filme & Serien auf Abruf",
  "HD, Full HD & 4K Qualität",
  MULTI_DEVICE_FEATURE,
  "Schnelle Aktivierung",
  "24/7 Support",
] as const;

export const COMPARISON_PRICE_LABEL = "Vergleichspreis bei monatlicher Buchung";

export const PRICE_COMPARISON_NOTE =
  "Die Vergleichspreise basieren auf dem aktuellen Preis des 1-Monats-Pakets von 12,99€ bei wiederholter monatlicher Buchung.";

export const TRIAL_PRICE_LABEL = "3€";
export const TRIAL_PRICE_NUMERIC = 3;

export const TRIAL_SUPPORTING_TEXT =
  "Testen Sie Qualität, Stabilität und Gerätekompatibilität 24 Stunden lang für nur 3€, bevor Sie sich für ein längeres Paket entscheiden.";

export const TRIAL_REASSURANCE_TEXT =
  "Ideal zum schnellen Testen vor dem Kauf eines längeren Pakets.";

export type IptvPackage = {
  id: "1-month" | "3-months" | "6-months" | "12-months";
  duration: string;
  iconNumber: string;
  price: string;
  priceLabel: string;
  priceNumeric: number;
  comparisonPrice?: string;
  monthlyEquivalent: string;
  savingsAmount?: string;
  savingsPercentage?: string;
  savingsBadge?: string;
  buttonLabel: string;
  badge?: string;
  highlighted: boolean;
  analyticsEvent: AnalyticsEventName;
  whatsappMessage: string;
};

export const IPTV_PACKAGES: IptvPackage[] = [
  {
    id: "1-month",
    duration: "1 Monat",
    iconNumber: "1",
    price: "€12.99",
    priceLabel: "12,99€",
    priceNumeric: 12.99,
    monthlyEquivalent: "12,99€ pro Monat",
    buttonLabel: "1 MONAT WÄHLEN",
    highlighted: false,
    analyticsEvent: ANALYTICS_EVENTS.package1MonthClick,
    whatsappMessage: WHATSAPP_MESSAGES.package1Month,
  },
  {
    id: "3-months",
    duration: "3 Monate",
    iconNumber: "3",
    price: "€24.99",
    priceLabel: "24,99€",
    priceNumeric: 24.99,
    comparisonPrice: "38,97€",
    monthlyEquivalent: "Nur 8,33€ pro Monat",
    savingsAmount: "Sie sparen 13,98€",
    savingsPercentage: "36 % günstiger",
    savingsBadge: "SIE SPAREN 13,98€",
    buttonLabel: "3 MONATE WÄHLEN",
    highlighted: false,
    analyticsEvent: ANALYTICS_EVENTS.package3MonthClick,
    whatsappMessage: WHATSAPP_MESSAGES.package3Months,
  },
  {
    id: "6-months",
    duration: "6 Monate",
    iconNumber: "6",
    price: "€39.99",
    priceLabel: "39,99€",
    priceNumeric: 39.99,
    comparisonPrice: "77,94€",
    monthlyEquivalent: "Nur 6,67€ pro Monat",
    savingsAmount: "Sie sparen 37,95€",
    savingsPercentage: "49 % günstiger",
    savingsBadge: "SIE SPAREN 37,95€",
    buttonLabel: "6 MONATE WÄHLEN",
    highlighted: false,
    analyticsEvent: ANALYTICS_EVENTS.package6MonthClick,
    whatsappMessage: WHATSAPP_MESSAGES.package6Months,
  },
  {
    id: "12-months",
    duration: "12 Monate",
    iconNumber: "12",
    price: "€59.99",
    priceLabel: "59,99€",
    priceNumeric: 59.99,
    comparisonPrice: "155,88€",
    monthlyEquivalent: "Nur 5,00€ pro Monat",
    savingsAmount: "Sie sparen 95,89€",
    savingsPercentage: "62 % günstiger",
    savingsBadge: "SIE SPAREN 95,89€",
    buttonLabel: "12 MONATE WÄHLEN",
    badge: "BESTES ANGEBOT",
    highlighted: true,
    analyticsEvent: ANALYTICS_EVENTS.package12MonthClick,
    whatsappMessage: WHATSAPP_MESSAGES.package12Months,
  },
];

export const PAYMENT_METHODS_HEADING = "Flexible Zahlungsmöglichkeiten";
export const PAYMENT_METHODS_PRIMARY =
  "PayPal · Visa · Mastercard · Weitere gängige Zahlungsarten";
export const PAYMENT_METHODS_SUPPORTING =
  "Die verfügbaren Zahlungsinformationen erhalten Sie nach Bestätigung Ihrer Bestellung über WhatsApp.";
export const PAYMENT_METHODS_NO_DATA_ON_SITE =
  "Keine Zahlungsdaten werden direkt auf dieser Website eingegeben.";

export const ORDER_PROCESS_HEADING = "So funktioniert Ihre Bestellung";

export const ORDER_PROCESS_STEPS = [
  {
    title: "Paket auswählen",
    description: "Wählen Sie das gewünschte Paket aus.",
  },
  {
    title: "Bestellung über WhatsApp bestätigen",
    description:
      "Nach dem Klick öffnet sich WhatsApp mit dem ausgewählten Paket und Preis.",
  },
  {
    title: "Zahlungsmethode auswählen",
    description:
      "Sie erhalten die verfügbaren Zahlungsinformationen und wählen die passende Zahlungsart.",
  },
  {
    title: "Zugang erhalten",
    description:
      "Nach erfolgreichem Zahlungseingang erhalten Sie Ihre Zugangsdaten und Unterstützung bei der Einrichtung.",
  },
] as const;
