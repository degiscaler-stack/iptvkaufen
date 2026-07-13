export const AGGREGATE_RATING = {
  ratingValue: "4.9",
  bestRating: "5",
  worstRating: "1",
  ratingCount: "249",
} as const;

export const AGGREGATE_RATING_VISIBLE =
  "★★★★★ 4,9/5 – Basierend auf 249 Kundenbewertungen";

export const AGGREGATE_RATING_ACCESSIBLE_LABEL =
  "4,9 von 5 Sternen, basierend auf 249 Kundenbewertungen";

export const PUBLIC_AUTHOR_LABEL = "Anonymer Kunde";
export const PUBLIC_AUTHOR_COUNTRY = "Deutschland";
export const PUBLIC_AUTHOR_DISPLAY = "Anonymer Kunde – Deutschland";
export const VERIFIED_REVIEW_BADGE = "Verifizierte Bewertung";

export type CustomerReview = {
  id: string;
  publicAuthorLabel: string;
  country: string;
  rating: number;
  reviewBody: string;
};

export const CUSTOMER_REVIEWS: readonly CustomerReview[] = [
  {
    id: "review-01",
    publicAuthorLabel: PUBLIC_AUTHOR_LABEL,
    country: PUBLIC_AUTHOR_COUNTRY,
    rating: 5,
    reviewBody:
      "Die Aktivierung war sehr schnell und alles funktionierte direkt. Der Support hat mir bei der Einrichtung sofort geholfen.",
  },
  {
    id: "review-02",
    publicAuthorLabel: PUBLIC_AUTHOR_LABEL,
    country: PUBLIC_AUTHOR_COUNTRY,
    rating: 5,
    reviewBody:
      "Sehr gute Bildqualität und eine große Auswahl an deutschen und internationalen Sendern. Bisher läuft alles stabil.",
  },
  {
    id: "review-03",
    publicAuthorLabel: PUBLIC_AUTHOR_LABEL,
    country: PUBLIC_AUTHOR_COUNTRY,
    rating: 5,
    reviewBody:
      "Ich nutze den Service auf meinem Smart-TV und Smartphone. Die Einrichtung war einfach und die Verbindung ist zuverlässig.",
  },
  {
    id: "review-04",
    publicAuthorLabel: PUBLIC_AUTHOR_LABEL,
    country: PUBLIC_AUTHOR_COUNTRY,
    rating: 5,
    reviewBody:
      "Der Kundenservice antwortet schnell und erklärt die Einrichtung verständlich. Mit dem Gesamtpaket bin ich sehr zufrieden.",
  },
  {
    id: "review-05",
    publicAuthorLabel: PUBLIC_AUTHOR_LABEL,
    country: PUBLIC_AUTHOR_COUNTRY,
    rating: 4.8,
    reviewBody:
      "Viele Sender, Filme und Serien in guter Qualität. Auch bei Live-Sport läuft der Stream bei mir meistens ohne Probleme.",
  },
  {
    id: "review-06",
    publicAuthorLabel: PUBLIC_AUTHOR_LABEL,
    country: PUBLIC_AUTHOR_COUNTRY,
    rating: 5,
    reviewBody:
      "Nach der Bestellung habe ich meine Zugangsdaten sehr schnell erhalten. Die Installation war einfacher als erwartet.",
  },
  {
    id: "review-07",
    publicAuthorLabel: PUBLIC_AUTHOR_LABEL,
    country: PUBLIC_AUTHOR_COUNTRY,
    rating: 4.9,
    reviewBody:
      "Der Service funktioniert auf mehreren Geräten problemlos. Besonders positiv finde ich die schnelle Unterstützung über WhatsApp.",
  },
  {
    id: "review-08",
    publicAuthorLabel: PUBLIC_AUTHOR_LABEL,
    country: PUBLIC_AUTHOR_COUNTRY,
    rating: 5,
    reviewBody:
      "Die Sender wechseln schnell und das Bild bleibt stabil. Für mich ein sehr gutes Preis-Leistungs-Verhältnis.",
  },
  {
    id: "review-09",
    publicAuthorLabel: PUBLIC_AUTHOR_LABEL,
    country: PUBLIC_AUTHOR_COUNTRY,
    rating: 4.9,
    reviewBody:
      "Ich hatte zuerst Fragen zur App, aber der Support hat mir Schritt für Schritt geholfen. Danach lief alles einwandfrei.",
  },
  {
    id: "review-10",
    publicAuthorLabel: PUBLIC_AUTHOR_LABEL,
    country: PUBLIC_AUTHOR_COUNTRY,
    rating: 5,
    reviewBody:
      "Seit der Aktivierung funktioniert der Zugang zuverlässig. Große Auswahl, gute Qualität und freundlicher Kundenservice.",
  },
] as const;

export function formatGermanRating(rating: number): string {
  return `${rating.toFixed(1).replace(".", ",")}/5`;
}

export function formatGermanRatingValue(rating: number): string {
  return rating.toFixed(1).replace(".", ",");
}

export function buildProductAggregateRating() {
  return {
    "@type": "AggregateRating" as const,
    ratingValue: AGGREGATE_RATING.ratingValue,
    bestRating: AGGREGATE_RATING.bestRating,
    worstRating: AGGREGATE_RATING.worstRating,
    ratingCount: AGGREGATE_RATING.ratingCount,
  };
}

export function buildProductReviews() {
  return CUSTOMER_REVIEWS.map((review) => ({
    "@type": "Review" as const,
    author: {
      "@type": "Person" as const,
      name: review.publicAuthorLabel,
    },
    reviewRating: {
      "@type": "Rating" as const,
      ratingValue: String(review.rating),
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: review.reviewBody,
  }));
}
