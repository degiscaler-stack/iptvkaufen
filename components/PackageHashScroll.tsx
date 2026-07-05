"use client";

import { useEffect } from "react";
import { PACKAGE_SELECTION_ID, scrollToPackages } from "@/lib/scroll-to-pricing";

export default function PackageHashScroll() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");

    if (hash !== PACKAGE_SELECTION_ID && hash !== "preise") {
      return;
    }

    const alignToPackages = () => {
      scrollToPackages();
    };

    requestAnimationFrame(alignToPackages);

    const timers = [150, 400, 800, 1500].map((delay) =>
      window.setTimeout(alignToPackages, delay),
    );

    return () => {
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, []);

  return null;
}
