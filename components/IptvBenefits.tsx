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
  const iconClass = "h-8 w-8 text-[#000000] sm:h-9 sm:w-9";

  if (icon === "channels") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="5.5" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="2.85" />
        <path d="M8 20h8M12 16.5V20" stroke="currentColor" strokeWidth="2.85" strokeLinecap="round" />
        <path d="M8 10.7h8" stroke="currentColor" strokeWidth="2.85" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "media") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 8h16v10.5a1.7 1.7 0 0 1-1.7 1.7H5.7A1.7 1.7 0 0 1 4 18.5V8Z" stroke="currentColor" strokeWidth="2.75" strokeLinejoin="round" />
        <path d="M4.6 8 7.2 4h4L8.6 8M12.6 8 15.2 4h4L16.6 8" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m10.8 10.9 3.9 2.3-3.9 2.3v-4.6Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="2.75" />
      <path d="M8 20h8M12 16.5V20" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M7.4 11h3.3v4.2M7.4 13h3.6M14 11v4.2M17.1 11 14.2 13l3.1 2.2" stroke="currentColor" strokeWidth="2.45" strokeLinecap="round" strokeLinejoin="round" />
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

        <div className="mx-auto mt-7 grid max-w-[880px] justify-items-center gap-3.5 sm:mt-9 sm:grid-cols-3 lg:gap-4">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group relative h-full w-full max-w-[270px] overflow-hidden rounded-[18px] border border-[#A6FF00]/28 bg-[#050805] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-[#A6FF00]/48 hover:shadow-[0_0_18px_rgba(166,255,0,0.12)]"
            >
              <div className="relative flex h-full min-h-[194px] flex-col items-center rounded-[17px] bg-[linear-gradient(145deg,rgba(13,17,11,0.88),rgba(5,8,5,0.98))] px-3.5 py-5 text-center sm:min-h-[212px] sm:px-4 sm:py-6">
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#A6FF00] transition duration-300 group-hover:shadow-[0_0_14px_rgba(166,255,0,0.22)] sm:h-[72px] sm:w-[72px]">
                  <BenefitIcon icon={benefit.icon} />
                </div>
                <h3 className="mt-4 text-[1rem] font-extrabold leading-tight tracking-[-0.035em] text-[#F5F5F5] sm:text-[1.12rem]">
                  {benefit.title}
                </h3>
                <div className="mt-2.5 h-px w-10 rounded-full bg-[#A6FF00]/80" />
                <p className="mt-2.5 max-w-[230px] text-[12.5px] font-medium leading-5 text-[#F5F5F5]/72 sm:text-[13px]">
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
