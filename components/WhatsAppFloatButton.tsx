"use client";

import { FaWhatsapp } from "react-icons/fa";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { WHATSAPP_CHAT_URL } from "@/lib/contact";

export default function WhatsAppFloatButton() {
  return (
    <a
      href={WHATSAPP_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat öffnen"
      data-analytics="whatsapp_click"
      data-analytics-source="floating_button"
      className="fixed bottom-[calc(1rem+var(--sticky-purchase-offset,0px))] right-[25px] z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.32)] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_14px_34px_rgba(37,211,102,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:h-[60px] sm:w-[60px] lg:bottom-[25px]"
      onClick={() => {
        trackEvent(ANALYTICS_EVENTS.whatsappClick, { source: "floating_button" });
      }}
    >
      <FaWhatsapp className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden="true" />
    </a>
  );
}
