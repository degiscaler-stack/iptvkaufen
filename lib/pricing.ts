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

export type IptvPackage = {
  id: "1-month" | "3-months" | "6-months" | "12-months";
  duration: string;
  iconNumber: string;
  price: string;
  priceLabel: string;
  description: string;
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
    description: "Perfekt zum Testen unseres IPTV Services.",
    buttonLabel: "1 Monat für 9,99€ wählen",
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
    description: "Mehr Streaming zum besten Preis-Leistungs-Verhältnis.",
    buttonLabel: "3 Monate für 19,99€ wählen",
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
    description: "Ideal für regelmäßiges Streaming über mehrere Monate.",
    buttonLabel: "6 Monate für 29,99€ wählen",
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
    description: "Die beste Wahl für maximale Ersparnis und 12 Monate Premium IPTV Zugang.",
    badge: "★ BESTES ANGEBOT",
    buttonLabel: "12 Monate für 49,99€ wählen",
    highlighted: true,
    analyticsEvent: ANALYTICS_EVENTS.package12MonthClick,
    whatsappMessage: WHATSAPP_MESSAGES.package12Months,
  },
];
