export const ANALYTICS_EVENTS = {
  heroBuyClick: "hero_buy_click",
  heroTrialClick: "hero_trial_click",
  pricingSectionView: "pricing_section_view",
  package1MonthClick: "package_1_month_click",
  package3MonthClick: "package_3_month_click",
  package6MonthClick: "package_6_month_click",
  package12MonthClick: "package_12_month_click",
  trial3EuroClick: "trial_3_euro_click",
  whatsappClick: "whatsapp_click",
  checkoutOpen: "checkout_open",
  checkoutError: "checkout_error",
  purchaseComplete: "purchase_complete",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const firedOnceKeys = new Set<string>();

export function trackEvent(
  name: AnalyticsEventName,
  params?: AnalyticsParams,
  options?: { onceKey?: string },
): void {
  if (typeof window === "undefined") {
    return;
  }

  if (options?.onceKey) {
    if (firedOnceKeys.has(options.onceKey)) {
      return;
    }

    firedOnceKeys.add(options.onceKey);
  }

  if (typeof window.gtag === "function" && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    window.gtag("event", name, params ?? {});
  }
}

export function getGaMeasurementId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
}
