"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const RecentPurchaseNotification = dynamic(() => import("@/components/RecentPurchaseNotification"), {
  ssr: false,
});

function scheduleAfterLoad(callback: () => void) {
  const run = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(callback, { timeout: 4000 });
      return;
    }

    setTimeout(callback, 2000);
  };

  if (document.readyState === "complete") {
    run();
    return;
  }

  window.addEventListener("load", run, { once: true });
}

export default function DeferredRecentPurchaseNotification() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    scheduleAfterLoad(() => {
      if (active) {
        setReady(true);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  if (!ready) {
    return null;
  }

  return <RecentPurchaseNotification />;
}
