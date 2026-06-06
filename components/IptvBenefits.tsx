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
] as const;

function BenefitIcon({ icon }: { icon: (typeof benefits)[number]["icon"] }) {
  const iconClass = "h-10 w-10 text-[#000000] sm:h-11 sm:w-11";

  if (icon === "channels") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.4" y="5.1" width="17.2" height="11.1" rx="2.2" stroke="currentColor" strokeWidth="2.35" />
        <path d="M8 20h8M12 16.2V20" stroke="currentColor" strokeWidth="2.35" strokeLinecap="round" />
        <path d="M7.8 10.5h.01M10.6 10.5h.01M13.4 10.5h.01M16.2 10.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "media") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4.8" width="16" height="14.4" rx="2.3" stroke="currentColor" strokeWidth="2.25" />
        <path d="M8.2 4.8v14.4M15.8 4.8v14.4M4 9h4.2M15.8 9H20M4 15h4.2M15.8 15H20" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
        <path d="m10.7 9.8 3.8 2.2-3.8 2.2V9.8Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="6.5" width="15" height="9.8" rx="1.6" stroke="currentColor" strokeWidth="2.25" />
      <path d="M8 20h8M12 16.3V20" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M7.7 11.4V9.8h3v4.5M7.7 12h3.4M13.9 9.8v4.5M16.9 9.8 14 12.5l3.1 1.8" stroke="currentColor" strokeWidth="2.05" strokeLinecap="round" strokeLinejoin="round" />
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

        <div className="mx-auto mt-8 grid max-w-[1120px] gap-4 sm:mt-10 sm:grid-cols-3 lg:gap-5">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group relative h-full overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,rgba(166,255,0,0.95),rgba(219,255,86,0.48),rgba(117,255,0,0.86))] p-px shadow-[0_0_28px_rgba(166,255,0,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-[linear-gradient(135deg,rgba(190,255,35,1),rgba(230,255,106,0.72),rgba(117,255,0,0.98))] hover:shadow-[0_0_36px_rgba(166,255,0,0.22)]"
            >
              <div className="relative flex h-full min-h-[238px] flex-col items-center overflow-hidden rounded-[21px] bg-[linear-gradient(145deg,rgba(16,21,12,0.96),rgba(4,5,4,0.98))] px-5 py-7 text-center sm:min-h-[258px] sm:px-5 sm:py-8 lg:px-6">
                <div className="pointer-events-none absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-[#A6FF00] shadow-[0_0_18px_rgba(166,255,0,0.5)]" />
                <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-28 -translate-x-1/2 bg-[#A6FF00]/80 shadow-[0_0_16px_rgba(166,255,0,0.38)]" />
                <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#A6FF00] shadow-[0_0_22px_rgba(166,255,0,0.2)] transition duration-300 group-hover:shadow-[0_0_28px_rgba(166,255,0,0.36)] sm:h-[94px] sm:w-[94px]">
                  <BenefitIcon icon={benefit.icon} />
                </div>
                <h3 className="mt-5 text-[1.08rem] font-extrabold leading-tight tracking-[-0.035em] text-[#F5F5F5] sm:text-[1.2rem]">
                  {benefit.title}
                </h3>
                <div className="mt-3 h-0.5 w-12 rounded-full bg-[#A6FF00] shadow-[0_0_12px_rgba(166,255,0,0.35)]" />
                <p className="mt-3 max-w-[240px] text-[13px] font-medium leading-6 text-[#F5F5F5]/74 sm:text-[14px]">
                  {benefit.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
