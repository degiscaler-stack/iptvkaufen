import { ANALYTICS_EVENTS, type AnalyticsEventName } from "@/lib/analytics";

export type DeviceCount = 1 | 2 | 3 | 4;
export type PackageId = "1-month" | "3-months" | "6-months" | "12-months";

export const DEVICE_COUNTS: readonly DeviceCount[] = [1, 2, 3, 4] as const;
export const DEFAULT_DEVICE_COUNT: DeviceCount = 1;

/** Package prices in euro cents — single source of truth. */
export const PACKAGE_PRICES_CENTS: Record<DeviceCount, Record<PackageId, number>> = {
  1: {
    "1-month": 999,
    "3-months": 1999,
    "6-months": 2999,
    "12-months": 4999,
  },
  2: {
    "1-month": 1499,
    "3-months": 2999,
    "6-months": 4499,
    "12-months": 7499,
  },
  3: {
    "1-month": 1999,
    "3-months": 3999,
    "6-months": 5999,
    "12-months": 9999,
  },
  4: {
    "1-month": 2499,
    "3-months": 4999,
    "6-months": 7499,
    "12-months": 12499,
  },
};

const PACKAGE_MONTHS: Record<PackageId, number> = {
  "1-month": 1,
  "3-months": 3,
  "6-months": 6,
  "12-months": 12,
};

type PackageMeta = {
  id: PackageId;
  duration: string;
  iconNumber: string;
  buttonLabel: string;
  badge?: string;
  highlighted: boolean;
  analyticsEvent: AnalyticsEventName;
};

const PACKAGE_META: readonly PackageMeta[] = [
  {
    id: "1-month",
    duration: "1 Monat",
    iconNumber: "1",
    buttonLabel: "1 MONAT WÄHLEN",
    highlighted: false,
    analyticsEvent: ANALYTICS_EVENTS.package1MonthClick,
  },
  {
    id: "3-months",
    duration: "3 Monate",
    iconNumber: "3",
    buttonLabel: "3 MONATE WÄHLEN",
    highlighted: false,
    analyticsEvent: ANALYTICS_EVENTS.package3MonthClick,
  },
  {
    id: "6-months",
    duration: "6 Monate",
    iconNumber: "6",
    buttonLabel: "6 MONATE WÄHLEN",
    highlighted: false,
    analyticsEvent: ANALYTICS_EVENTS.package6MonthClick,
  },
  {
    id: "12-months",
    duration: "12 Monate",
    iconNumber: "12",
    buttonLabel: "12 MONATE WÄHLEN",
    badge: "BESTES ANGEBOT",
    highlighted: true,
    analyticsEvent: ANALYTICS_EVENTS.package12MonthClick,
  },
] as const;

export type IptvPackage = {
  id: PackageId;
  duration: string;
  iconNumber: string;
  price: string;
  priceLabel: string;
  priceNumeric: number;
  priceCents: number;
  comparisonPrice?: string;
  monthlyEquivalent: string;
  savingsAmount?: string;
  savingsPercentage?: string;
  savingsBadge?: string;
  buttonLabel: string;
  badge?: string;
  highlighted: boolean;
  analyticsEvent: AnalyticsEventName;
  deviceCount: DeviceCount;
  deviceBadgeText: string;
  deviceSupportText: string;
  whatsappMessage: string;
};

export function formatEuroFromCents(cents: number): string {
  return `${(cents / 100).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}€`;
}

export function getDeviceCountLabel(count: DeviceCount): string {
  return count === 1 ? "1 Gerät" : `${count} Geräte`;
}

export function getSimultaneousDevicesLabel(count: DeviceCount): string {
  return count === 1 ? "1 Gerät gleichzeitig" : `${count} Geräte gleichzeitig`;
}

export function getDeviceBadgeText(count: DeviceCount): string {
  return getSimultaneousDevicesLabel(count).toUpperCase();
}

export function getDeviceSupportText(count: DeviceCount): string {
  if (count === 1) {
    return "Streamen Sie auf einem Gerät Ihrer Wahl";
  }
  return `Gleichzeitig auf bis zu ${count} Geräten streamen`;
}

/**
 * Multi-device savings vs buying the same number of separate 1-device subscriptions.
 * Percentages are identical across durations with the current price table.
 */
export function getMultiDeviceSavingsPercent(deviceCount: DeviceCount): number | null {
  if (deviceCount === 1) return null;

  const separateCents = PACKAGE_PRICES_CENTS[1]["12-months"] * deviceCount;
  const bundledCents = PACKAGE_PRICES_CENTS[deviceCount]["12-months"];
  return Math.round((1 - bundledCents / separateCents) * 100);
}

export function buildPackageWhatsAppMessage(
  duration: string,
  deviceCount: DeviceCount,
  priceLabel: string,
): string {
  return [
    "Hallo, ich möchte folgendes IPTV-Paket bestellen:",
    "",
    `Laufzeit: ${duration}`,
    `Geräte: ${getSimultaneousDevicesLabel(deviceCount)}`,
    `Preis: ${priceLabel}`,
  ].join("\n");
}

function buildPackageForDevices(meta: PackageMeta, deviceCount: DeviceCount): IptvPackage {
  const months = PACKAGE_MONTHS[meta.id];
  const priceCents = PACKAGE_PRICES_CENTS[deviceCount][meta.id];
  const monthlyCents = PACKAGE_PRICES_CENTS[deviceCount]["1-month"];
  const comparisonCents = months > 1 ? monthlyCents * months : undefined;
  const savingsCents =
    comparisonCents !== undefined ? comparisonCents - priceCents : undefined;
  const savingsPercent =
    comparisonCents && savingsCents !== undefined
      ? Math.round((savingsCents / comparisonCents) * 100)
      : undefined;

  const priceLabel = formatEuroFromCents(priceCents);
  const priceNumeric = priceCents / 100;

  return {
    id: meta.id,
    duration: meta.duration,
    iconNumber: meta.iconNumber,
    price: `€${priceNumeric.toFixed(2)}`,
    priceLabel,
    priceNumeric,
    priceCents,
    comparisonPrice:
      comparisonCents !== undefined ? formatEuroFromCents(comparisonCents) : undefined,
    monthlyEquivalent:
      months === 1
        ? `${formatEuroFromCents(priceCents)} pro Monat`
        : `Nur ${formatEuroFromCents(Math.round(priceCents / months))} pro Monat`,
    savingsAmount:
      savingsCents !== undefined ? `Sie sparen ${formatEuroFromCents(savingsCents)}` : undefined,
    savingsPercentage:
      savingsPercent !== undefined ? `${savingsPercent} % günstiger` : undefined,
    savingsBadge:
      savingsCents !== undefined
        ? `SIE SPAREN ${formatEuroFromCents(savingsCents).toUpperCase()}`
        : undefined,
    buttonLabel: meta.buttonLabel,
    badge: meta.badge,
    highlighted: meta.highlighted,
    analyticsEvent: meta.analyticsEvent,
    deviceCount,
    deviceBadgeText: getDeviceBadgeText(deviceCount),
    deviceSupportText: getDeviceSupportText(deviceCount),
    whatsappMessage: buildPackageWhatsAppMessage(meta.duration, deviceCount, priceLabel),
  };
}

export function getPackagesForDevices(deviceCount: DeviceCount): IptvPackage[] {
  return PACKAGE_META.map((meta) => buildPackageForDevices(meta, deviceCount));
}

/** Default 1-device packages — used by static schema and backwards-compatible imports. */
export const IPTV_PACKAGES: IptvPackage[] = getPackagesForDevices(1);

/** All device × duration offers for Product schema. */
export function getAllProductOffers(): IptvPackage[] {
  return DEVICE_COUNTS.flatMap((deviceCount) => getPackagesForDevices(deviceCount));
}

const OFFER_DURATION_SLUG: Record<PackageId, string> = {
  "1-month": "1m",
  "3-months": "3m",
  "6-months": "6m",
  "12-months": "12m",
};

/** Stable Offer @id fragment, e.g. offer-12m-4d */
export function getOfferSchemaId(pkg: IptvPackage): string {
  return `offer-${OFFER_DURATION_SLUG[pkg.id]}-${pkg.deviceCount}d`;
}

/**
 * Canonical Offer name: duration first, then simultaneous devices.
 * Example: "12 Monate – 3 Geräte gleichzeitig"
 */
export function getOfferSchemaName(pkg: IptvPackage): string {
  return `${pkg.duration} – ${getSimultaneousDevicesLabel(pkg.deviceCount)}`;
}

export const MULTI_DEVICE_BADGE_TEXT = getDeviceBadgeText(1);
export const MULTI_DEVICE_BADGE_SUPPORT = getDeviceSupportText(1);

export const PRICING_TRUST_LINE =
  "Bis zu 4 Geräte gleichzeitig · 22.000+ Sender · HD, Full HD & 4K · Support auf Deutsch";

export const IPTV_PACKAGE_FEATURES = [
  "22.000+ Live-TV Sender",
  "Filme & Serien auf Abruf",
  "HD, Full HD & 4K Qualität",
  "Schnelle Aktivierung",
  "24/7 Support",
] as const;

export const COMPARISON_PRICE_LABEL = "Vergleichspreis bei monatlicher Buchung";

export const PRICE_COMPARISON_NOTE =
  "Die Vergleichspreise basieren auf dem aktuellen Monatspreis des gewählten Gerätepakets bei wiederholter monatlicher Buchung.";

export const TRIAL_PRICE_LABEL = "3€";
export const TRIAL_PRICE_NUMERIC = 3;

export const TRIAL_SUPPORTING_TEXT =
  "Testen Sie Qualität, Stabilität und Gerätekompatibilität 24 Stunden lang für nur 3€, bevor Sie sich für ein längeres Paket entscheiden.";

export const TRIAL_REASSURANCE_TEXT =
  "Ideal zum schnellen Testen vor dem Kauf eines längeren Pakets. Der 24-Stunden-Test gilt für 1 Gerät.";

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
    title: "Paket und Geräteanzahl auswählen",
    description: "Wählen Sie Laufzeit und die gewünschte Anzahl gleichzeitiger Verbindungen.",
  },
  {
    title: "Bestellung über WhatsApp bestätigen",
    description:
      "Nach dem Klick öffnet sich WhatsApp mit dem ausgewählten Paket, der Geräteanzahl und dem Preis.",
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
