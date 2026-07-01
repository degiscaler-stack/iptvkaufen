"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const PACKAGES = [
  {
    label: "1 Monat",
    src: "/images/packages/iptv-kaufen-1-monat.webp",
    alt: "1 Monat IPTV Paket von iptvkaufenX",
    title: "1 Monat IPTV Paket – iptvkaufenX",
  },
  {
    label: "3 Monate",
    src: "/images/packages/iptv-kaufen-3-monate.webp",
    alt: "3 Monate IPTV Paket von iptvkaufenX",
    title: "3 Monate IPTV Paket – iptvkaufenX",
  },
  {
    label: "6 Monate",
    src: "/images/packages/iptv-kaufen-6-monate.webp",
    alt: "6 Monate IPTV Paket von iptvkaufenX",
    title: "6 Monate IPTV Paket – iptvkaufenX",
  },
  {
    label: "12 Monate",
    src: "/images/packages/iptv-kaufen-12-monate.webp",
    alt: "12 Monate IPTV Paket von iptvkaufenX",
    title: "12 Monate IPTV Paket – iptvkaufenX",
  },
] as const;

const CITIES = [
  "Berlin",
  "Hamburg",
  "München",
  "Köln",
  "Frankfurt",
  "Stuttgart",
  "Düsseldorf",
  "Dortmund",
  "Leipzig",
  "Bremen",
  "Hannover",
  "Nürnberg",
  "Essen",
  "Dresden",
  "Bonn",
] as const;

const GAP_AFTER_PRELOAD_MS = 5000;
const VISIBLE_MS = 8000;
const GAP_BETWEEN_MS = 10000;
const EXIT_ANIMATION_MS = 500;

type NotificationState = {
  packageIndex: number;
  city: (typeof CITIES)[number];
};

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickCity(): (typeof CITIES)[number] {
  return CITIES[randomBetween(0, CITIES.length - 1)];
}

function preloadPackageImages(): Promise<void> {
  return Promise.all(
    PACKAGES.map(
      (pkg) =>
        new Promise<void>((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to preload ${pkg.src}`));
          img.src = pkg.src;
        }),
    ),
  ).then(() => undefined);
}

export default function RecentPurchaseNotification() {
  const [mounted, setMounted] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [display, setDisplay] = useState<NotificationState | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = (timerRef: { current: ReturnType<typeof setTimeout> | null }) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scheduleNext = useCallback(() => {
    clearTimer(nextTimer);
    nextTimer.current = setTimeout(() => {
      const packageIndex = randomBetween(0, PACKAGES.length - 1);
      const city = pickCity();

      setDisplay({ packageIndex, city });
      requestAnimationFrame(() => {
        setIsVisible(true);
      });

      clearTimer(hideTimer);
      hideTimer.current = setTimeout(() => {
        setIsVisible(false);
        clearTimer(exitTimer);
        exitTimer.current = setTimeout(() => {
          setDisplay(null);
          scheduleNext();
        }, EXIT_ANIMATION_MS);
      }, VISIBLE_MS);
    }, GAP_BETWEEN_MS);
  }, []);

  const presentNotification = useCallback(() => {
    const packageIndex = randomBetween(0, PACKAGES.length - 1);
    const city = pickCity();

    setDisplay({ packageIndex, city });
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    clearTimer(hideTimer);
    hideTimer.current = setTimeout(() => {
      setIsVisible(false);
      clearTimer(exitTimer);
      exitTimer.current = setTimeout(() => {
        setDisplay(null);
        scheduleNext();
      }, EXIT_ANIMATION_MS);
    }, VISIBLE_MS);
  }, [scheduleNext]);

  const handleDismiss = useCallback(() => {
    clearTimer(hideTimer);
    setIsVisible(false);
    clearTimer(exitTimer);
    exitTimer.current = setTimeout(() => {
      setDisplay(null);
      scheduleNext();
    }, EXIT_ANIMATION_MS);
  }, [scheduleNext]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    let cancelled = false;

    const startPreload = () => {
      preloadPackageImages()
        .then(() => {
          if (cancelled) {
            return;
          }

          setImagesReady(true);
          initialTimer.current = setTimeout(() => {
            if (!cancelled) {
              presentNotification();
            }
          }, GAP_AFTER_PRELOAD_MS);
        })
        .catch(() => {
          if (!cancelled) {
            startPreload();
          }
        });
    };

    startPreload();

    return () => {
      cancelled = true;
      clearTimer(initialTimer);
      clearTimer(hideTimer);
      clearTimer(nextTimer);
      clearTimer(exitTimer);
    };
  }, [mounted, presentNotification]);

  if (!mounted || !imagesReady || !display) {
    return null;
  }

  const currentPackage = PACKAGES[display.packageIndex];
  const message = `Ein Kunde aus ${display.city} hat gerade das ${currentPackage.label} Paket gekauft.`;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`recent-purchase-notification fixed bottom-[calc(1rem+var(--sticky-purchase-offset,0px))] left-4 z-[9998] w-[min(100%,calc(100vw-2rem))] max-w-[340px] transition-all duration-500 ease-out sm:left-6 lg:bottom-6 ${
        isVisible
          ? "pointer-events-auto translate-x-0 translate-y-0 opacity-100"
          : "pointer-events-none -translate-x-3 translate-y-2 opacity-0"
      }`}
    >
      <div className="relative overflow-hidden rounded-[14px] border border-[#A6FF00]/35 bg-gradient-to-br from-[#0a0a0a]/95 via-[#111111]/92 to-[#0d1408]/95 shadow-[0_14px_42px_rgba(0,0,0,0.55),0_0_28px_rgba(166,255,0,0.1)] backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(166,255,0,0.14),transparent_55%)]"
        />

        <div className="relative flex items-center gap-3 p-3 pr-10 sm:gap-3.5 sm:p-3.5 sm:pr-11">
          <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#A6FF00]/20 bg-[#0a0a0a]">
            <Image
              src={currentPackage.src}
              alt={currentPackage.alt}
              title={currentPackage.title}
              width={72}
              height={72}
              loading="lazy"
              className="h-[72px] w-[72px] object-contain"
            />
          </div>

          <p className="text-[13px] font-medium leading-snug tracking-[0.01em] text-[#F0F0F0] sm:text-sm">
            {message}
          </p>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Benachrichtigung schließen"
            className="absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#A6FF00]/20 bg-[#0a0a0a]/80 text-[#B8B8B8] transition duration-300 hover:border-[#A6FF00]/45 hover:text-[#F5F5F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]"
          >
            <span aria-hidden="true" className="text-base leading-none">
              ×
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
