"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const ALLOWED_DURATIONS = [6, 12] as const;

type AllowedDuration = (typeof ALLOWED_DURATIONS)[number];

type NotificationPackage = {
  durationMonths: AllowedDuration;
  label: "6 Monate" | "12 Monate";
  src: string;
  alt: string;
  title: string;
  message: string;
};

const ALL_PACKAGES: NotificationPackage[] = [
  {
    durationMonths: 6,
    label: "6 Monate",
    src: "/images/packages/iptv-kaufen-6-monate.webp",
    alt: "6 Monate IPTV Paket von iptvkaufenX",
    title: "6 Monate IPTV Paket – iptvkaufenX",
    message: "Beliebtes Paket: 6 Monate",
  },
  {
    durationMonths: 12,
    label: "12 Monate",
    src: "/images/packages/iptv-kaufen-12-monate.webp",
    alt: "12 Monate IPTV Paket von iptvkaufenX",
    title: "12 Monate IPTV Paket – iptvkaufenX",
    message: "Besonders beliebt: 12 Monate",
  },
];

const PACKAGES = ALL_PACKAGES.filter((pkg) =>
  (ALLOWED_DURATIONS as readonly number[]).includes(pkg.durationMonths),
);

const GAP_AFTER_PRELOAD_MS = 5000;
const VISIBLE_MS = 8000;
const GAP_BETWEEN_MS = 10000;
const EXIT_ANIMATION_MS = 500;
const MAX_IDENTICAL_IN_A_ROW = 2;

type NotificationState = {
  packageIndex: number;
};

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickPackageIndex(
  previousIndex: number | null,
  consecutiveCount: number,
): number {
  if (PACKAGES.length === 0) {
    return 0;
  }

  if (PACKAGES.length === 1) {
    return 0;
  }

  if (previousIndex !== null && consecutiveCount >= MAX_IDENTICAL_IN_A_ROW) {
    return previousIndex === 0 ? 1 : 0;
  }

  return randomBetween(0, PACKAGES.length - 1);
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
  const previousPackageIndex = useRef<number | null>(null);
  const consecutiveCount = useRef(0);

  const clearTimer = (timerRef: { current: ReturnType<typeof setTimeout> | null }) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const createNotificationState = useCallback((): NotificationState => {
    const packageIndex = pickPackageIndex(
      previousPackageIndex.current,
      consecutiveCount.current,
    );

    if (previousPackageIndex.current === packageIndex) {
      consecutiveCount.current += 1;
    } else {
      consecutiveCount.current = 1;
    }

    previousPackageIndex.current = packageIndex;
    return { packageIndex };
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimer(nextTimer);
    nextTimer.current = setTimeout(() => {
      setDisplay(createNotificationState());
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
  }, [createNotificationState]);

  const presentNotification = useCallback(() => {
    setDisplay(createNotificationState());
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
  }, [createNotificationState, scheduleNext]);

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

  if (!currentPackage || !(ALLOWED_DURATIONS as readonly number[]).includes(currentPackage.durationMonths)) {
    return null;
  }

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
            {currentPackage.message}
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
