import { WHATSAPP_MESSAGES } from "@/lib/contact";
import { ANALYTICS_EVENTS, type AnalyticsEventName } from "@/lib/analytics";

export const IPTV_PACKAGE_FEATURES = [
  "22.000+ Live-TV Sender",
  "Filme & Serien auf Abruf",
  "HD, Full HD & 4K Qualität",
  "Alle Geräte kompatibel",
  "Schnelle Aktivierung",
  "24/7 Support",
] as const;

export const COMPARISON_PRICE_LABEL = "Vergleichspreis bei monatlicher Buchung";

export const PRICE_COMPARISON_NOTE =
  "Die Vergleichspreise basieren auf dem aktuellen Preis des 1-Monats-Pakets von 9,99€ bei wiederholter monatlicher Buchung.";

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
    price: "€9.99",
    priceLabel: "9,99€",
    priceNumeric: 9.99,
    monthlyEquivalent: "9,99€ pro Monat",
    buttonLabel: "1 MONAT WÄHLEN",
    badge: "FLEXIBEL TESTEN",
    highlighted: false,
    analyticsEvent: ANALYTICS_EVENTS.package1MonthClick,
    whatsappMessage: WHATSAPP_MESSAGES.package1Month,
  },
  {
    id: "3-months",
    duration: "3 Monate",
    iconNumber: "3",
    price: "€19.99",
    priceLabel: "19,99€",
    priceNumeric: 19.99,
    comparisonPrice: "29,97€",
    monthlyEquivalent: "Nur 6,66€ pro Monat",
    savingsAmount: "Sie sparen 9,98€",
    savingsPercentage: "33 % günstiger",
    savingsBadge: "SIE SPAREN 9,98€",
    buttonLabel: "3 MONATE WÄHLEN",
    highlighted: false,
    analyticsEvent: ANALYTICS_EVENTS.package3MonthClick,
    whatsappMessage: WHATSAPP_MESSAGES.package3Months,
  },
  {
    id: "6-months",
    duration: "6 Monate",
    iconNumber: "6",
    price: "€29.99",
    priceLabel: "29,99€",
    priceNumeric: 29.99,
    comparisonPrice: "59,94€",
    monthlyEquivalent: "Nur 5,00€ pro Monat",
    savingsAmount: "Sie sparen 29,95€",
    savingsPercentage: "50 % günstiger",
    savingsBadge: "SIE SPAREN 29,95€",
    buttonLabel: "6 MONATE WÄHLEN",
    highlighted: false,
    analyticsEvent: ANALYTICS_EVENTS.package6MonthClick,
    whatsappMessage: WHATSAPP_MESSAGES.package6Months,
  },
  {
    id: "12-months",
    duration: "12 Monate",
    iconNumber: "12",
    price: "€49.99",
    priceLabel: "49,99€",
    priceNumeric: 49.99,
    comparisonPrice: "119,88€",
    monthlyEquivalent: "Nur 4,17€ pro Monat",
    savingsAmount: "Sie sparen 69,89€",
    savingsPercentage: "58 % günstiger",
    savingsBadge: "SIE SPAREN 69,89€",
    buttonLabel: "12 MONATE WÄHLEN",
    badge: "BESTES ANGEBOT",
    highlighted: true,
    analyticsEvent: ANALYTICS_EVENTS.package12MonthClick,
    whatsappMessage: WHATSAPP_MESSAGES.package12Months,
  },
];
