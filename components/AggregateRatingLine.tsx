import {
  AGGREGATE_RATING_ACCESSIBLE_LABEL,
  formatGermanRatingValue,
} from "@/lib/customer-reviews";

function GoldStars({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[#F5C542]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} className={className} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.8 12.4 7l5.6.5-4.3 3.7 1.3 5.4L10 13.8 4.9 16.6l1.3-5.4L1.9 7.5 7.6 7 10 1.8Z" />
        </svg>
      ))}
    </span>
  );
}

export default function AggregateRatingLine() {
  return (
    <p
      className="mx-auto mt-7 flex max-w-[720px] flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[13px] leading-5 sm:mt-8 sm:text-[14px] sm:leading-6"
      aria-label={AGGREGATE_RATING_ACCESSIBLE_LABEL}
    >
      <GoldStars />
      <span className="font-bold text-[#F5F5F5]">{formatGermanRatingValue(4.9)}/5</span>
      <span className="text-[#F5F5F5]/72">– Basierend auf 249 Kundenbewertungen</span>
      <span
        className="inline-flex items-center gap-1 rounded-full border border-[#A6FF00]/35 bg-[#A6FF00]/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A6FF00]"
        aria-hidden="true"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#A6FF00]" />
        Verifiziert
      </span>
    </p>
  );
}
