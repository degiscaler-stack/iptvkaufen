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
        <rect x="3.5" y="6" width="17" height="10.8" rx="2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 20h6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "media") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8.2 5.4v13.2c0 1.1 1.2 1.8 2.2 1.2l9.4-6.6c.9-.6.9-1.9 0-2.5l-9.4-6.5c-1-.7-2.2 0-2.2 1.2Z" />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="text-[1.35rem] font-black leading-none tracking-[-0.08em] text-[#000000] sm:text-[1.55rem]"
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
