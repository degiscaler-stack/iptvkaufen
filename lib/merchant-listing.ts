import { SITE_URL } from "@/lib/seo";

export const REFUND_POLICY_PATH = "/rueckerstattung";
export const REFUND_POLICY_URL = `${SITE_URL}${REFUND_POLICY_PATH}`;

export function buildDigitalOfferShippingDetails() {
  return {
    "@type": "OfferShippingDetails" as const,
    shippingRate: {
      "@type": "MonetaryAmount" as const,
      value: "0",
      currency: "EUR",
    },
    shippingDestination: {
      "@type": "DefinedRegion" as const,
      addressCountry: "DE",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime" as const,
      handlingTime: {
        "@type": "QuantitativeValue" as const,
        minValue: 0,
        maxValue: 1,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue" as const,
        minValue: 0,
        maxValue: 0,
        unitCode: "DAY",
      },
    },
  };
}

// MerchantReturnPolicy intentionally omitted: the guarantee covers each customer's entire subscription period,
// which schema.org MerchantReturnPolicy cannot express as a fixed return window.
