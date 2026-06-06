const benefits = [
  {
    icon: "channels",
    title: "22.000+ Sender",
    text: "Live-TV aus Deutschland und weltweit.",
  },
  {
    icon: "media",
    title: "Filme & Serien",
    text: "Aktuelle Inhalte jederzeit abrufbar.",
  },
  {
    icon: "quality",
    title: "4K Qualität",
    text: "HD, Full HD und 4K Streaming.",
  },
  {
    icon: "devices",
    title: "Alle Geräte",
    text: "Smart TV, Android, iOS und PC.",
  },
  {
    icon: "instant",
    title: "Sofort Aktiv",
    text: "Schneller Zugriff nach der Bestellung.",
  },
  {
    icon: "stable",
    title: "Stabil & Sicher",
    text: "Optimierte Streams mit hoher Verfügbarkeit.",
  },
] as const;

function BenefitIcon({ icon }: { icon: (typeof benefits)[number]["icon"] }) {
  const iconClass = "h-9 w-9 text-[#A6FF00] sm:h-10 sm:w-10";

  if (icon === "channels") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="11" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M7.6 10.2h.01M10.6 10.2h.01M13.6 10.2h.01M16.6 10.2h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "media") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4.8" width="16" height="14.4" rx="2.3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 4.8v14.4M16 4.8v14.4M4 9h4M16 9h4M4 15h4M16 15h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="m11 10.1 3.3 1.9-3.3 1.9v-3.8Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "quality") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 7.5h14v9H5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M8 11.3V9.8h2.7v4.4M8 12h3.1M14 9.8v4.4M16.8 9.8 14 12.5l3 1.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "devices") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="12.8" height="9.2" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
        <rect x="17" y="8.5" width="4" height="8.5" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7 18h5M9.5 14.2V18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "instant") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 3.8 5.5 13h5.4L10 20.2l8.5-10.4h-5.7L13 3.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 19 6v5.4c0 4.2-2.7 7.5-7 9.1-4.3-1.6-7-4.9-7-9.1V6l7-2.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m8.7 12.2 2.1 2.1 4.7-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function IptvBenefits() {
  return (
    <section
      aria-labelledby="iptv-benefits-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[760px] text-center">
          <h2
            id="iptv-benefits-heading"
            className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.65rem] lg:text-[3rem]"
          >
            Warum{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              iptvkaufenX?
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[690px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Alles, was Sie für ein modernes IPTV Kaufen Erlebnis brauchen – schnell, stabil und auf
            allen Geräten verfügbar.
          </p>
        </div>

        <div className="mx-auto mt-7 grid max-w-[1120px] gap-2.5 sm:mt-9 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group relative overflow-hidden rounded-[15px] border border-[#A6FF00]/14 bg-[linear-gradient(145deg,rgba(17,17,17,0.76),rgba(6,6,6,0.9))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-[#A6FF00]/36 sm:p-5"
            >
              <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#A6FF00]/45 to-transparent" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#A6FF00]/16 bg-[#A6FF00]/6 sm:h-[3.25rem] sm:w-[3.25rem]">
                <BenefitIcon icon={benefit.icon} />
              </div>
              <h3 className="mt-3 text-[1rem] font-extrabold leading-tight tracking-[-0.035em] text-[#F5F5F5] sm:text-[1.08rem]">
                {benefit.title}
              </h3>
              <p className="mt-1.5 text-[12.5px] font-medium leading-5 text-[#F5F5F5]/72 sm:text-[13px]">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
