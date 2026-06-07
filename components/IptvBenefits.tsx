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
  const iconClass =
    "h-10 w-10 text-[#050505]/90 transition-transform duration-500 ease-out group-hover:scale-105 sm:h-11 sm:w-11";

  if (icon === "channels") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5.2 17.8c2.9-2.8 7.7-2.8 10.6 0" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M7.8 15.2a3.85 3.85 0 0 1 5.4 0" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
        <circle cx="10.5" cy="12.6" r="1.15" fill="currentColor" />
        <path d="M4.6 19.4 10.7 7.2c.35-.7 1.34-.73 1.73-.06l1.15 1.94" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.35 5.15 19.9 9.7m-.15-4.38-4.22 4.22" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "media") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.4 9.7h15.2v8.05A2.15 2.15 0 0 1 17.45 19.9H6.55a2.15 2.15 0 0 1-2.15-2.15V9.7Z" stroke="currentColor" strokeWidth="2.05" strokeLinejoin="round" />
        <path d="M4.9 6.55 18.65 4.1l.58 3.25L5.48 9.8 4.9 6.55Z" stroke="currentColor" strokeWidth="2.05" strokeLinejoin="round" />
        <path d="m8.1 6 2.35 3.05m2.2-3.85L15 8.25M7.7 13h8.6" stroke="currentColor" strokeWidth="2.05" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.8" y="5" width="16.4" height="11.2" rx="2.1" stroke="currentColor" strokeWidth="2.05" />
      <path d="M9 19.4h6M12 16.2v3.2" stroke="currentColor" strokeWidth="2.05" strokeLinecap="round" />
      <text
        x="12"
        y="12.6"
        textAnchor="middle"
        className="fill-[#050505] text-[6.5px] font-black tracking-[-0.08em]"
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
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#A6FF00] shadow-[0_8px_18px_rgba(166,255,0,0.13),inset_0_1px_0_rgba(255,255,255,0.38)] transition duration-500 ease-out group-hover:bg-[#9DFF18] group-hover:shadow-[0_0_14px_rgba(166,255,0,0.2),inset_0_1px_0_rgba(255,255,255,0.42)] sm:h-[54px] sm:w-[54px]">
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
