"use client";

import Image from "next/image";
import { type PointerEvent, useEffect, useMemo, useRef, useState } from "react";

const reviews = [
  {
    src: "/images/testimonials/iptv-kaufen-1.webp",
    alt: "iptv kaufen kundenbewertung",
  },
  {
    src: "/images/testimonials/iptv-kaufen-2.webp",
    alt: "iptv kaufen whatsapp bewertung",
  },
  {
    src: "/images/testimonials/iptv-kaufen-3.webp",
    alt: "iptv kaufen kunden erfahrung",
  },
  {
    src: "/images/testimonials/iptv-kaufen-4.webp",
    alt: "iptv kaufen kundenbewertung",
  },
  {
    src: "/images/testimonials/iptv-kaufen-5.webp",
    alt: "iptv kaufen whatsapp bewertung",
  },
] as const;

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

export default function CustomerReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const dragStartRef = useRef<number | null>(null);
  const dragDeltaRef = useRef(0);
  const suppressClickRef = useRef(false);

  const maxIndex = useMemo(() => Math.max(reviews.length - visibleSlides, 0), [visibleSlides]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateVisibleSlides = () => {
      setVisibleSlides(mediaQuery.matches ? 4 : 1);
    };

    updateVisibleSlides();
    mediaQuery.addEventListener("change", updateVisibleSlides);

    return () => mediaQuery.removeEventListener("change", updateVisibleSlides);
  }, []);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current <= 0 ? maxIndex : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = event.clientX;
    dragDeltaRef.current = 0;
    suppressClickRef.current = false;
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
    suppressClickRef.current = Math.abs(dragDistance) > 8;

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
            WAS UNSERE{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              KUNDEN
            </span>{" "}
            SAGEN
          </h2>
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
                transform: `translate3d(-${activeIndex * (100 / reviews.length)}%, 0, 0)`,
              }}
            >
              {reviews.map((review, index) => (
                <article key={review.src} className="shrink-0 basis-full px-1.5 sm:px-2 lg:basis-1/4">
                  <button
                    type="button"
                    onClick={() => {
                      if (!suppressClickRef.current) {
                        setLightboxIndex(index);
                      }

                      suppressClickRef.current = false;
                    }}
                    className="group block w-full rounded-[22px] border border-[#A6FF00]/28 bg-[#050806] p-2 text-left shadow-[0_18px_44px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-300 hover:-translate-y-1 hover:border-[#A6FF00]/55 hover:shadow-[0_22px_54px_rgba(0,0,0,0.42),0_0_20px_rgba(166,255,0,0.08)] focus:outline-none focus:ring-2 focus:ring-[#A6FF00]/70"
                    aria-label={`${review.alt} fullscreen öffnen`}
                  >
                    <span className="relative block aspect-[9/16] overflow-hidden rounded-[16px] bg-[#080B08]">
                      <Image
                        src={review.src}
                        alt={review.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        loading="lazy"
                        draggable={false}
                        className="object-contain transition duration-300 group-hover:scale-[1.015]"
                      />
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#A6FF00]/35 bg-[#050806]/90 text-[#A6FF00] shadow-[0_14px_34px_rgba(0,0,0,0.38)] backdrop-blur transition duration-300 hover:border-[#A6FF00]/70 hover:bg-[#A6FF00] hover:text-[#050505] sm:left-3"
            aria-label="Vorherige Kundenbewertung"
          >
            <ArrowIcon direction="previous" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#A6FF00]/35 bg-[#050806]/90 text-[#A6FF00] shadow-[0_14px_34px_rgba(0,0,0,0.38)] backdrop-blur transition duration-300 hover:border-[#A6FF00]/70 hover:bg-[#A6FF00] hover:text-[#050505] sm:right-3"
            aria-label="Nächste Kundenbewertung"
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>

      {lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#000000]/92 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Kundenbewertung fullscreen"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#A6FF00]/45 bg-[#050806] text-2xl leading-none text-[#A6FF00] transition duration-300 hover:bg-[#A6FF00] hover:text-[#050505]"
            onClick={() => setLightboxIndex(null)}
            aria-label="Lightbox schließen"
          >
            ×
          </button>
          <div
            className="relative h-[86vh] w-full max-w-[620px] overflow-hidden rounded-[24px] border border-[#A6FF00]/35 bg-[#050806] p-2"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={reviews[lightboxIndex].src}
              alt={reviews[lightboxIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
