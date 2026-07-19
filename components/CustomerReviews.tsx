import {
  FEATURED_CUSTOMER_REVIEWS,
  PUBLIC_RATING_SUPPORTING,
  PUBLIC_RATING_VALUE,
  PUBLIC_REVIEW_COUNT_DISPLAY,
  PUBLIC_TRUST_LINE,
  VERIFIED_REVIEW_BADGE,
  formatCustomerSince,
  formatGermanRatingValue,
  getCountryFlag,
} from "@/lib/customer-reviews";

const TRUST_CHIPS = [
  "Deutscher Support",
  "Verifizierte Kundenbewertungen",
  "Kunden aus Deutschland und Europa",
] as const;

function GoldStars({
  rating = 5,
  className = "h-3.5 w-3.5",
}: {
  rating?: number;
  className?: string;
}) {
  const filled = Math.round(Math.min(Math.max(rating, 0), 5));

  return (
    <span className="inline-flex items-center gap-0.5 text-[#F5C542]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className={className}
          viewBox="0 0 20 20"
          fill={index < filled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={index < filled ? 0 : 1.4}
        >
          <path d="M10 1.8 12.4 7l5.6.5-4.3 3.7 1.3 5.4L10 13.8 4.9 16.6l1.3-5.4L1.9 7.5 7.6 7 10 1.8Z" />
        </svg>
      ))}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A6FF00]/35 bg-[#A6FF00]/10 px-2 py-0.5 text-[11px] font-semibold text-[#A6FF00]">
      <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="m6.4 10.2 2.2 2.2 5-5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {VERIFIED_REVIEW_BADGE}
    </span>
  );
}

export default function CustomerReviews() {
  const ratingDisplay = formatGermanRatingValue(PUBLIC_RATING_VALUE);

  return (
    <section
      aria-labelledby="customer-reviews-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mb-4 sm:text-[11px]">
            KUNDENBEWERTUNGEN
          </p>
          <h2
            id="customer-reviews-heading"
            className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.8rem] lg:text-[3.2rem]"
          >
            Was unsere Kunden über{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              iptvkaufenX
            </span>{" "}
            sagen
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Verifizierte Kundenbewertungen aus Deutschland und Europa.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-[980px] flex-col items-center gap-6 rounded-[22px] border border-[#A6FF00]/20 bg-[radial-gradient(circle_at_18%_0%,rgba(166,255,0,0.07),transparent_42%),linear-gradient(160deg,rgba(10,15,10,0.98)_0%,rgba(5,8,5,1)_100%)] p-5 sm:mt-10 sm:flex-row sm:items-stretch sm:justify-between sm:gap-8 sm:p-6">
          <div className="text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start">
              <span className="text-[3rem] font-black leading-none tracking-[-0.06em] text-[#F5F5F5] sm:text-[3.4rem]">
                {ratingDisplay}
              </span>
              <GoldStars rating={PUBLIC_RATING_VALUE} className="h-5 w-5" />
            </div>
            <p className="mt-3 text-[15px] font-semibold text-[#F5F5F5] sm:text-[16px]">
              {PUBLIC_REVIEW_COUNT_DISPLAY}
            </p>
            <p className="mt-1.5 text-[13px] leading-6 text-[#E6E6E6]/82 sm:text-[14px]">
              {PUBLIC_RATING_SUPPORTING}
            </p>
            <p className="mt-1 text-[13px] leading-6 text-[#F5F5F5]/70 sm:text-[14px]">
              {PUBLIC_TRUST_LINE}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-2.5 sm:min-w-[240px] sm:items-end">
            {TRUST_CHIPS.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center justify-center rounded-full border border-[#A6FF00]/28 bg-[#050806] px-3.5 py-2 text-[12px] font-semibold text-[#F5F5F5] sm:text-[13px]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:mt-10 lg:grid-cols-3 lg:gap-5">
          {FEATURED_CUSTOMER_REVIEWS.map((review) => (
            <article
              key={review.id}
              className="flex h-full min-h-[240px] flex-col rounded-[20px] border border-[#A6FF00]/35 bg-[#050806] p-5 shadow-[0_14px_34px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.035)] sm:min-h-[260px] sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                <div
                  className="flex flex-wrap items-center gap-x-2 gap-y-1"
                  aria-label={`${formatGermanRatingValue(review.rating)} von 5 Sternen`}
                >
                  <GoldStars rating={review.rating} />
                  <span className="text-[13px] font-bold text-[#F5F5F5] sm:text-[14px]">
                    {formatGermanRatingValue(review.rating)}/5
                  </span>
                </div>
                {review.verified ? <VerifiedBadge /> : null}
              </div>

              <blockquote className="mt-4 flex-1 text-[14px] leading-6 text-[#EDEDED]/92 sm:text-[15px] sm:leading-7">
                <p lang={review.language}>„{review.text}“</p>
              </blockquote>

              <footer className="mt-5 flex items-center gap-3 border-t border-[#A6FF00]/15 pt-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#A6FF00]/35 bg-[#A6FF00]/12 text-[12px] font-bold tracking-[0.04em] text-[#A6FF00]"
                  aria-hidden="true"
                >
                  {review.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[#F5F5F5] sm:text-[14px]">{review.name}</p>
                  <p className="mt-0.5 text-[12px] text-[#E6E6E6]/78 sm:text-[13px]">
                    <span aria-hidden="true">{getCountryFlag(review.countryCode)} </span>
                    {review.city}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#F5F5F5]/55 sm:text-[12px]">
                    {formatCustomerSince(review.customerSinceMonths)}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
