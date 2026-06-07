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
  const iconClass = "h-11 w-11 text-[#000000]/90 sm:h-12 sm:w-12";

  if (icon === "channels") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.75" y="5.25" width="16.5" height="11" rx="2.1" stroke="currentColor" strokeWidth="2.35" />
        <path d="M9.25 19.25h5.5M12 16.5v2.75" stroke="currentColor" strokeWidth="2.35" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "media") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.75" y="5" width="16.5" height="14" rx="2.2" stroke="currentColor" strokeWidth="2.25" />
        <path d="M8 5v14M16 5v14M4 9h4M16 9h4M4 15h4M16 15h4" stroke="currentColor" strokeWidth="2.05" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="text-[1.7rem] font-black leading-none tracking-[-0.08em] text-[#000000]/90 sm:text-[1.9rem]"
    >
      4K
    </span>
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

        <div className="mx-auto mt-7 grid max-w-[1160px] justify-items-center gap-5 sm:mt-9 sm:grid-cols-3 lg:gap-6">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group relative h-full w-full max-w-[350px] rounded-[22px] bg-[linear-gradient(135deg,#A6FF00_0%,#CFFF5A_45%,#8DFF00_100%)] p-px shadow-[0_0_10px_rgba(166,255,0,0.11),0_16px_38px_rgba(0,0,0,0.34)] transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-[linear-gradient(135deg,#CFFF5A_0%,#A6FF00_48%,#8DFF00_100%)] hover:shadow-[0_0_14px_rgba(166,255,0,0.17),0_20px_46px_rgba(0,0,0,0.38)]"
            >
              <div className="relative flex h-full min-h-[226px] flex-col items-center justify-center overflow-hidden rounded-[21px] bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,0,0.1),transparent_42%),linear-gradient(155deg,rgba(17,25,12,0.98)_0%,rgba(7,12,8,0.99)_54%,rgba(3,7,5,1)_100%)] px-5 py-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-16px_30px_rgba(0,0,0,0.24)] sm:min-h-[238px] sm:px-7 sm:py-8">
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#A6FF00]/70 to-transparent" />
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#A6FF00] shadow-[0_8px_18px_rgba(166,255,0,0.16),inset_0_1px_0_rgba(255,255,255,0.36)] transition duration-300 group-hover:bg-[#9DFF18] group-hover:shadow-[0_0_14px_rgba(166,255,0,0.22),inset_0_1px_0_rgba(255,255,255,0.4)] sm:h-[58px] sm:w-[58px]">
                  <BenefitIcon icon={benefit.icon} />
                </div>
                <h3 className="mt-5 text-[1.08rem] font-extrabold leading-tight tracking-[-0.035em] text-[#F5F5F5] sm:text-[1.22rem]">
                  {benefit.title}
                </h3>
                <div className="mt-3 h-px w-14 rounded-full bg-gradient-to-r from-transparent via-[#A6FF00] to-transparent" />
                <p className="mt-3 max-w-[230px] text-[13.5px] font-medium leading-6 text-[#F5F5F5]/78 sm:text-[14px]">
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
