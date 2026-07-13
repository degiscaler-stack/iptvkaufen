"use client";

import { type PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  CUSTOMER_REVIEWS,
  PUBLIC_AUTHOR_DISPLAY,
  VERIFIED_REVIEW_BADGE,
  formatGermanRating,
  formatGermanRatingValue,
} from "@/lib/customer-reviews";

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "previous" ? "m15 18-6-6 6-6" : "m9 6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#A6FF00]/90">
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const dragStartRef = useRef<number | null>(null);
  const dragDeltaRef = useRef(0);

  const maxIndex = useMemo(
    () => Math.max(CUSTOMER_REVIEWS.length - visibleSlides, 0),
    [visibleSlides],
  );

  useEffect(() => {
    const tabletQuery = window.matchMedia("(min-width: 768px)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const updateVisibleSlides = () => {
      if (desktopQuery.matches) {
        setVisibleSlides(3);
        return;
      }

      setVisibleSlides(tabletQuery.matches ? 2 : 1);
    };

    updateVisibleSlides();
    tabletQuery.addEventListener("change", updateVisibleSlides);
    desktopQuery.addEventListener("change", updateVisibleSlides);

    return () => {
      tabletQuery.removeEventListener("change", updateVisibleSlides);
      desktopQuery.removeEventListener("change", updateVisibleSlides);
    };
  }, []);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current <= 0 ? maxIndex : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = event.clientX;
    dragDeltaRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) {
      return;
    }

    dragDeltaRef.current = event.clientX - dragStartRef.current;
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const dragDistance = dragDeltaRef.current;

    if (Math.abs(dragDistance) > 48) {
      if (dragDistance < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    dragStartRef.current = null;
    dragDeltaRef.current = 0;
  };

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
            Was unsere{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              Kunden
            </span>{" "}
            sagen
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Anonyme und verifizierte Rückmeldungen von Kunden aus Deutschland.
          </p>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div
            className="overflow-hidden"
            onPointerCancel={handlePointerEnd}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onLostPointerCapture={handlePointerEnd}
            style={{ touchAction: "pan-y" }}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                width: `${(CUSTOMER_REVIEWS.length / visibleSlides) * 100}%`,
                transform: `translate3d(-${(activeIndex / CUSTOMER_REVIEWS.length) * 100}%, 0, 0)`,
              }}
            >
              {CUSTOMER_REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className="shrink-0 px-1.5 sm:px-2"
                  style={{ width: `${100 / CUSTOMER_REVIEWS.length}%` }}
                >
                  <div className="flex h-full min-h-[220px] flex-col rounded-[20px] border border-[#A6FF00]/45 bg-[#050806] p-5 shadow-[0_14px_34px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.035)] sm:min-h-[236px] sm:p-6">
                    <div
                      className="flex flex-wrap items-center gap-x-2 gap-y-1"
                      aria-label={`${formatGermanRatingValue(review.rating)} von 5 Sternen`}
                    >
                      <GoldStars />
                      <span className="text-[13px] font-bold text-[#F5F5F5] sm:text-[14px]">
                        {formatGermanRating(review.rating)}
                      </span>
                    </div>

                    <blockquote className="mt-4 flex-1 text-[14px] leading-6 text-[#EDEDED]/92 sm:text-[15px] sm:leading-7">
                      <p>„{review.reviewBody}“</p>
                    </blockquote>

                    <footer className="mt-5 space-y-1.5 border-t border-[#A6FF00]/15 pt-4">
                      <p className="text-[13px] font-semibold text-[#F5F5F5]">
                        {PUBLIC_AUTHOR_DISPLAY}
                      </p>
                      <VerifiedBadge />
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#A6FF00]/45 bg-[#050806]/92 text-[#A6FF00] shadow-[0_14px_34px_rgba(0,0,0,0.38)] backdrop-blur transition duration-300 hover:border-[#A6FF00]/70 hover:bg-[#A6FF00] hover:text-[#050505] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00] sm:left-3 sm:h-11 sm:w-11 lg:-left-2"
            aria-label="Vorherige Kundenbewertung"
          >
            <ArrowIcon direction="previous" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#A6FF00]/45 bg-[#050806]/92 text-[#A6FF00] shadow-[0_14px_34px_rgba(0,0,0,0.38)] backdrop-blur transition duration-300 hover:border-[#A6FF00]/70 hover:bg-[#A6FF00] hover:text-[#050505] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00] sm:right-3 sm:h-11 sm:w-11 lg:-right-2"
            aria-label="Nächste Kundenbewertung"
          >
            <ArrowIcon direction="next" />
          </button>

          <div
            className="mt-6 flex items-center justify-center gap-2"
            aria-label="Kundenbewertungen Pagination"
          >
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00] ${
                  activeIndex === index
                    ? "w-7 bg-[#A6FF00]"
                    : "w-2 bg-[#A6FF00]/28 hover:bg-[#A6FF00]/55"
                }`}
                aria-label={`Kundenbewertung Gruppe ${index + 1} anzeigen`}
                aria-current={activeIndex === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
