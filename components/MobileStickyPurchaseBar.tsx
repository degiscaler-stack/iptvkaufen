"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/contact";

const STICKY_OFFSET = "5.75rem";

export default function MobileStickyPurchaseBar() {
  useEffect(() => {
    document.documentElement.style.setProperty("--sticky-purchase-offset", STICKY_OFFSET);

    return () => {
      document.documentElement.style.removeProperty("--sticky-purchase-offset");
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[9997] border-t border-[#A6FF00]/20 bg-[#050505]/96 px-3 py-2.5 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      aria-label="Schnellkauf"
    >
      <div className="mx-auto flex max-w-[520px] items-center gap-2.5">
        <Link
          href="/#preise"
          data-analytics="sticky_buy_click"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#A6FF00] px-4 text-center text-[11px] font-extrabold uppercase tracking-[0.12em] !text-[#000000] shadow-[0_0_12px_rgba(166,255,0,0.2)] transition duration-300 hover:bg-[#B8FF4D]"
          aria-label="Jetzt kaufen"
          onClick={() => {
            trackEvent(ANALYTICS_EVENTS.heroBuyClick, {
              source: "mobile_sticky_bar",
              button_location: "mobile_sticky",
            });
          }}
        >
          JETZT KAUFEN
        </Link>
        <a
          href={buildWhatsAppUrl(WHATSAPP_MESSAGES.packageHelp)}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="sticky_whatsapp_click"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#25D366]/45 bg-[#0A0F0A] px-4 text-center text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#F5F5F5] transition duration-300 hover:border-[#25D366] hover:text-[#25D366]"
          onClick={() => {
            trackEvent(ANALYTICS_EVENTS.whatsappClick, {
              source: "mobile_sticky_bar",
              button_location: "mobile_sticky",
            });
          }}
        >
          <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
          WHATSAPP
        </a>
      </div>
    </div>
  );
}
