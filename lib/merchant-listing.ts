import { SITE_URL } from "@/lib/seo";

export const MERCHANT_RETURN_POLICY_ID = `${SITE_URL}/#merchant-return-policy`;
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

/**
 * Canonical MerchantReturnPolicy for the digitally delivered IPTV service.
 *
 * Intentionally omits returnMethod: Google Merchant Listing only documents
 * ReturnByMail / ReturnInStore / ReturnAtKiosk, which would falsely imply
 * a physical-product return workflow.
 *
 * returnFees FreeReturn is used because the customer incurs no return /
 * cancellation shipping fee when a digital refund/cancellation is processed.
 */
export function buildMerchantReturnPolicy() {
  return {
    "@type": "MerchantReturnPolicy" as const,
    "@id": MERCHANT_RETURN_POLICY_ID,
    applicableCountry: {
      "@type": "Country" as const,
      name: "DE",
    },
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 30,
    returnFees: "https://schema.org/FreeReturn",
    merchantReturnLink: REFUND_POLICY_URL,
  };
}

export function buildMerchantReturnPolicyRef() {
  return {
    "@id": MERCHANT_RETURN_POLICY_ID,
  };
}
