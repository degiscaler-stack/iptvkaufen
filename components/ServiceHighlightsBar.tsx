const serviceHighlights = [
  { label: "22.000+ Sender", icon: "broadcast" },
  { label: "HD, Full HD & 4K", icon: "quality" },
  { label: "Alle Geräte", icon: "devices" },
  { label: "Stabil & Sicher", icon: "shield" },
  { label: "24/7 Support", icon: "support" },
] as const;

function HighlightIcon({ icon }: { icon: (typeof serviceHighlights)[number]["icon"] }) {
  const iconClass = "h-7 w-7 text-[#A6FF00] sm:h-8 sm:w-8";

  if (icon === "broadcast") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 18.5v-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M8.5 21h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7.1 14.2a6.6 6.6 0 0 1 0-8.4M16.9 5.8a6.6 6.6 0 0 1 0 8.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M4.3 17a10.6 10.6 0 0 1 0-14M19.7 3a10.6 10.6 0 0 1 0 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "quality") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="11.5" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 20h8M12 16.5V20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="m9 11 2 2 4-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "devices") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="13" height="9" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
        <rect x="17" y="9" width="4" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7 18h6M10 14v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.5 19 6v5.4c0 4.2-2.7 7.5-7 9.1-4.3-1.6-7-4.9-7-9.1V6l7-2.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="m8.8 12.1 2.1 2.1 4.4-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13.5V12a7 7 0 0 1 14 0v1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5 13h2.2c.7 0 1.3.6 1.3 1.3v2.4c0 .7-.6 1.3-1.3 1.3H6.5A2.5 2.5 0 0 1 4 15.5v-1A1.5 1.5 0 0 1 5.5 13H5Zm14 0h-2.2c-.7 0-1.3.6-1.3 1.3v2.4c0 .7.6 1.3 1.3 1.3h.7a2.5 2.5 0 0 0 2.5-2.5v-1A1.5 1.5 0 0 0 18.5 13H19Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15.5 18c-.7 1.4-1.9 2-3.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function ServiceHighlightsBar() {
  return (
    <section
      aria-label="IPTV Kaufen Service Highlights"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-5 sm:px-8 sm:py-6 lg:px-0 lg:py-7"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[1240px] rounded-[22px] border border-[#A6FF00]/18 bg-[#111111]/30 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {serviceHighlights.map((highlight, index) => (
              <div
                key={highlight.label}
                className={`flex min-h-[4.25rem] items-center justify-center gap-2.5 rounded-[16px] border border-[#1F1F1F]/85 bg-[#090909]/52 px-3 py-3 text-center text-[12.5px] font-semibold leading-tight text-[#F5F5F5]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition duration-300 hover:border-[#A6FF00]/35 sm:min-h-[4.5rem] sm:text-[13px] ${
                  index === serviceHighlights.length - 1
                    ? "col-span-2 mx-auto w-full max-w-[15rem] sm:col-span-1 sm:mx-0 sm:max-w-none"
                    : ""
                }`}
              >
                <HighlightIcon icon={highlight.icon} />
                <span>{highlight.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
