export const ANALYTICS_EVENTS = {
  heroBuyClick: "hero_buy_click",
  pricingScrollClick: "pricing_scroll_click",
  heroTrialClick: "hero_trial_click",
  viewItemList: "view_item_list",
  selectItem: "select_item",
  package1MonthClick: "package_1_month_click",
  package3MonthClick: "package_3_month_click",
  package6MonthClick: "package_6_month_click",
  package12MonthClick: "package_12_month_click",
  packageWhatsappClick: "package_whatsapp_click",
  trialClick: "trial_click",
  trial3EuroClick: "trial_3_euro_click",
  trialWhatsappClick: "trial_whatsapp_click",
  whatsappClick: "whatsapp_click",
  chatOpen: "chat_open",
  beginCheckout: "begin_checkout",
  checkoutOpen: "checkout_open",
  checkoutError: "checkout_error",
  refundPolicyClick: "refund_policy_click",
  purchase: "purchase",
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

  if (typeof window.gtag === "function" && getGaMeasurementId()) {
    window.gtag("event", name, params ?? {});
  }
}

/**
 * GA4 Measurement IDs are public (visible in page source), so a code-level fallback is safe.
 * NEXT_PUBLIC_GA_MEASUREMENT_ID, when set at build time, takes precedence.
 */
const GA_MEASUREMENT_ID_FALLBACK = "G-4M2PC3JMKJ";

export function getGaMeasurementId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || GA_MEASUREMENT_ID_FALLBACK || undefined;
}

export function trackCheckoutError(params?: AnalyticsParams): void {
  trackEvent(ANALYTICS_EVENTS.checkoutError, params);
}

export function trackPurchaseComplete(params?: AnalyticsParams): void {
  trackEvent(ANALYTICS_EVENTS.purchaseComplete, params);
}
