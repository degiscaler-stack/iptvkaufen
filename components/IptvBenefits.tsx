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
  const iconClass = "h-8 w-8 text-[#AFFF00] sm:h-9 sm:w-9";

  if (icon === "channels") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 18.5v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8.5 21h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7.1 14.2a6.6 6.6 0 0 1 0-8.4M16.9 5.8a6.6 6.6 0 0 1 0 8.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4.3 17a10.6 10.6 0 0 1 0-14M19.7 3a10.6 10.6 0 0 1 0 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "media") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.4 9.7h15.2v8.05A2.15 2.15 0 0 1 17.45 19.9H6.55a2.15 2.15 0 0 1-2.15-2.15V9.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4.9 6.55 18.65 4.1l.58 3.25L5.48 9.8 4.9 6.55Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m8.1 6 2.35 3.05m2.2-3.85L15 8.25M7.7 13h8.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.8" y="5.2" width="16.4" height="11.2" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 19.5h6M12 16.4v3.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <text
        x="12"
        y="12.6"
        textAnchor="middle"
        className="fill-[#AFFF00] text-[6.5px] font-bold tracking-[-0.08em]"
      >
        4K
      </text>
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

        <div className="mx-auto mt-7 grid max-w-[1180px] justify-items-center gap-5 sm:mt-9 lg:grid-cols-3 lg:gap-6">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group relative h-full w-full max-w-[365px] rounded-[22px] bg-[linear-gradient(135deg,rgba(166,255,0,0.42)_0%,rgba(207,255,90,0.58)_46%,rgba(141,255,0,0.42)_100%)] p-px shadow-[0_0_8px_rgba(166,255,0,0.08),0_14px_34px_rgba(0,0,0,0.34)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-[linear-gradient(135deg,rgba(207,255,90,0.72)_0%,rgba(166,255,0,0.62)_48%,rgba(141,255,0,0.58)_100%)] hover:shadow-[0_0_16px_rgba(166,255,0,0.14),0_20px_46px_rgba(0,0,0,0.38)]"
            >
              <div className="relative flex h-full min-h-[182px] flex-col items-center justify-center overflow-hidden rounded-[21px] bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,0,0.08),transparent_44%),linear-gradient(155deg,rgba(18,25,13,0.98)_0%,rgba(8,12,9,0.99)_56%,rgba(4,7,5,1)_100%)] px-6 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.075),inset_0_-14px_26px_rgba(0,0,0,0.2)] sm:min-h-[190px] sm:px-8 sm:py-6">
                <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#CFFF5A]/45 to-transparent" />
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#AFFF00]/60 bg-[#AFFF00]/5 shadow-[0_0_5px_rgba(175,255,0,0.06)] transition duration-500 group-hover:border-[#AFFF00]/80 group-hover:bg-[#AFFF00]/8 sm:h-[54px] sm:w-[54px]">
                  <BenefitIcon icon={benefit.icon} />
                </div>
                <h3 className="mt-4 text-[1.08rem] font-extrabold leading-tight tracking-[-0.035em] text-[#F5F5F5] sm:text-[1.23rem]">
                  {benefit.title}
                </h3>
                <div className="mt-2.5 h-px w-14 rounded-full bg-gradient-to-r from-transparent via-[#A6FF00]/90 to-transparent" />
                <p className="mt-2.5 max-w-[310px] text-[14px] font-medium leading-6 text-[#F5F5F5]/82 sm:text-[15px]">
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
