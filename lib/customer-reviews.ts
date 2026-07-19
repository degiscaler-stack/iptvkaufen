import reviewsData from "@/lib/customer-reviews-data.json";

export type CustomerReview = {
  id: string;
  name: string;
  initials: string;
  city: string;
  country: string;
  countryCode: string;
  language: string;
  customerSinceMonths: number;
  package: string;
  source: string;
  rating: number;
  verified: boolean;
  text: string;
};

type ReviewsFile = {
  publicSummary: {
    ratingValue: number;
    reviewCountDisplay: string;
    reviewCountExact: number | null;
    distribution: null;
  };
  featuredReviewIds: string[];
  reviews: CustomerReview[];
};

const data = reviewsData as ReviewsFile;

export const CUSTOMER_REVIEWS: readonly CustomerReview[] = data.reviews;

export const FEATURED_REVIEW_IDS: readonly string[] = data.featuredReviewIds;

export const FEATURED_CUSTOMER_REVIEWS: readonly CustomerReview[] =
  FEATURED_REVIEW_IDS.map((id) => {
    const review = CUSTOMER_REVIEWS.find((item) => item.id === id);
    if (!review) {
      throw new Error(`Missing featured customer review: ${id}`);
    }
    return review;
  });

/** Public marketing summary — not derived from the 30 featured examples. */
export const PUBLIC_RATING_VALUE = data.publicSummary.ratingValue;
export const PUBLIC_REVIEW_COUNT_DISPLAY = "Über 5.000 Kundenbewertungen";
export const PUBLIC_REVIEW_COUNT_EXACT = data.publicSummary.reviewCountExact;
export const PUBLIC_RATING_SUPPORTING =
  "Basierend auf über 5.000 Kundenbewertungen";
export const PUBLIC_TRUST_LINE = "Über 5.000 Kunden vertrauen iptvkaufenX";

export const AGGREGATE_RATING = {
  ratingValue: String(PUBLIC_RATING_VALUE),
  bestRating: "5",
  worstRating: "1",
} as const;

export const VERIFIED_REVIEW_BADGE = "Verifiziert";

/**
 * Convert ISO 3166-1 alpha-2 country codes into Unicode regional-indicator flag emoji.
 * Example: "DE" → 🇩🇪
 */
export function countryCodeToFlag(countryCode: string): string {
  const code = countryCode.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) {
    return "";
  }

  const A = 0x1f1e6;
  const base = "A".charCodeAt(0);
  return String.fromCodePoint(
    A + (code.charCodeAt(0) - base),
    A + (code.charCodeAt(1) - base),
  );
}

export function getCountryFlag(countryCode: string): string {
  return countryCodeToFlag(countryCode);
}

export const AVATAR_PALETTE = [
  { background: "#F43F4E", color: "#FFFFFF" },
  { background: "#FACC15", color: "#111111" },
  { background: "#2563EB", color: "#FFFFFF" },
  { background: "#22B573", color: "#FFFFFF" },
  { background: "#B84ACB", color: "#FFFFFF" },
  { background: "#20A966", color: "#FFFFFF" },
] as const;

export function getAvatarStyleForReview(_reviewId: string, index: number) {
  // Featured cards use stable palette order so the first six colors stay distinct.
  return AVATAR_PALETTE[index % AVATAR_PALETTE.length];
}

export function formatCustomerSince(months: number): string {
  if (months === 1) return "Kunde seit 1 Monat";
  return `Kunde seit ${months} Monaten`;
}

export function formatGermanRatingValue(rating: number): string {
  return rating.toFixed(1).replace(".", ",");
}

export function formatGermanRating(rating: number): string {
  return `${formatGermanRatingValue(rating)}/5`;
}

export const AGGREGATE_RATING_VISIBLE = `★★★★★ ${formatGermanRatingValue(PUBLIC_RATING_VALUE)}/5 – ${PUBLIC_RATING_SUPPORTING}`;

export const AGGREGATE_RATING_ACCESSIBLE_LABEL =
  "4,9 von 5 Sternen, basierend auf über 5.000 Kundenbewertungen";

export function buildProductAggregateRating() {
  // Google requires reviewCount or ratingCount. We only emit AggregateRating
  // when an exact verified numeric archive count exists — never invent values.
  if (PUBLIC_REVIEW_COUNT_EXACT === null) {
    return null;
  }

  return {
    "@type": "AggregateRating" as const,
    ratingValue: PUBLIC_RATING_VALUE,
    bestRating: 5,
    worstRating: 1,
    reviewCount: PUBLIC_REVIEW_COUNT_EXACT,
  };
}

export function buildProductReviews(productId?: string) {
  return FEATURED_CUSTOMER_REVIEWS.map((review) => ({
    "@type": "Review" as const,
    author: {
      "@type": "Person" as const,
      name: review.name,
    },
    reviewRating: {
      "@type": "Rating" as const,
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.text,
    ...(productId
      ? {
          itemReviewed: {
            "@id": productId,
          },
        }
      : {}),
  }));
}
