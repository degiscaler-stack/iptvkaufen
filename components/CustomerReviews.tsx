import Image from "next/image";
import {
  FEATURED_CUSTOMER_REVIEWS,
  PUBLIC_RATING_SUPPORTING,
  PUBLIC_RATING_VALUE,
  RATING_DISTRIBUTION,
  VERIFIED_REVIEW_BADGE,
  formatCustomerSince,
  formatGermanRatingValue,
  getAvatarStyleForReview,
  getCountryFlagAsset,
} from "@/lib/customer-reviews";

function GoldStars({
  rating = 5,
  className = "h-3.5 w-3.5",
}: {
  rating?: number;
  className?: string;
}) {
  const filled = Math.round(Math.min(Math.max(rating, 0), 5));

  return (
    <span className="inline-flex items-center gap-0.5 text-[#FBBF24]" aria-hidden="true">
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
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#A6FF00]/30 bg-[rgba(34,181,115,0.14)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.02em] text-[#A6FF00] sm:text-[11px]">
      <svg className="h-3 w-3 shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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

function CountryFlag({ countryCode }: { countryCode: string }) {
  const asset = getCountryFlagAsset(countryCode);
  if (!asset) return null;

  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={18}
      height={12}
      unoptimized
      className="inline-block h-[12px] w-[18px] shrink-0 rounded-[2px] object-cover"
    />
  );
}

export default function CustomerReviews() {
  const ratingDisplay = formatGermanRatingValue(PUBLIC_RATING_VALUE);

  return (
    <section
      aria-labelledby="customer-reviews-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16"
    >
      <div className="mx-auto max-w-[1120px] lg:px-4">
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

        <div className="mx-auto mt-8 flex max-w-[720px] flex-col items-center justify-center gap-6 sm:mt-10 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <span className="text-[56px] font-black leading-none tracking-[-0.06em] text-white sm:text-[64px]">
              {ratingDisplay}
            </span>
            <div className="mt-2.5">
              <GoldStars rating={PUBLIC_RATING_VALUE} className="h-5 w-5" />
            </div>
            <p className="mt-3 max-w-[260px] text-[14px] leading-6 text-[#9CA3AF] sm:text-[15px]">
              {PUBLIC_RATING_SUPPORTING}
            </p>
          </div>

          <div
            className="hidden h-[88px] w-px shrink-0 bg-[#2A2A2A] sm:block"
            aria-hidden="true"
          />

          <div
            className="w-full max-w-[280px] space-y-2.5"
            aria-label="Bewertungsverteilung"
          >
            {RATING_DISTRIBUTION.map((row) => (
              <div key={row.stars} className="grid grid-cols-[52px_1fr_36px] items-center gap-2.5">
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#FBBF24]">
                  {row.stars}
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 1.8 12.4 7l5.6.5-4.3 3.7 1.3 5.4L10 13.8 4.9 16.6l1.3-5.4L1.9 7.5 7.6 7 10 1.8Z" />
                  </svg>
                </span>
                <div className="h-2 overflow-hidden rounded-full bg-[#1F1F1F]">
                  <div
                    className="h-full rounded-full bg-[#FBBF24]"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <span className="text-right text-[12px] font-semibold text-[#D1D5DB]">
                  {row.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:mt-11 lg:grid-cols-3 lg:gap-6">
          {FEATURED_CUSTOMER_REVIEWS.map((review, index) => {
            const isFeaturedHighlight = index === 0;
            const paletteAvatar = getAvatarStyleForReview(review.id, index);
            const avatar = isFeaturedHighlight
              ? { background: "#A6FF00", color: "#050505" }
              : paletteAvatar;

            return (
              <article
                key={review.id}
                className={`flex h-full min-h-[280px] flex-col rounded-2xl bg-[#0D0D0D] p-6 transition duration-300 hover:border-[#3A3A3A] sm:min-h-[300px] sm:p-7 ${
                  isFeaturedHighlight
                    ? "border border-[#A6FF00]"
                    : "border border-[#272727]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1"
                    aria-label={`${formatGermanRatingValue(review.rating)} von 5 Sternen`}
                  >
                    <GoldStars rating={review.rating} className="h-3.5 w-3.5" />
                    <span className="text-[13px] font-bold text-white sm:text-[14px]">
                      {formatGermanRatingValue(review.rating)}/5
                    </span>
                  </div>
                  {review.verified ? <VerifiedBadge /> : null}
                </div>

                <blockquote className="mt-4 flex-1 text-[14px] italic leading-7 text-[#E5E7EB] sm:text-[15px] sm:leading-7">
                  <p lang={review.language}>„{review.text}“</p>
                </blockquote>

                <footer className="mt-5 flex items-center gap-3 border-t border-[#272727] pt-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-bold tracking-[0.04em]"
                    style={{ backgroundColor: avatar.background, color: avatar.color }}
                    aria-hidden="true"
                  >
                    {review.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold leading-tight text-white">{review.name}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[12px] leading-5 text-[#9CA3AF] sm:text-[13px]">
                      <CountryFlag countryCode={review.countryCode} />
                      <span>
                        {review.city} · {formatCustomerSince(review.customerSinceMonths)}
                      </span>
                    </p>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
