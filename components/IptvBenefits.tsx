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
  const iconClass = "h-[52px] w-[52px] text-[#000000] sm:h-[58px] sm:w-[58px]";

  if (icon === "channels") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v8.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15.25v-8.5A2.25 2.25 0 0 1 5.25 4.5Zm5.25 14.25h3a1.5 1.5 0 0 1 1.5 1.5v.25H9v-.25a1.5 1.5 0 0 1 1.5-1.5Z" />
      </svg>
    );
  }

  if (icon === "media") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75A2.75 2.75 0 0 1 5.75 4ZM6 6.4v2.2h2.2V6.4H6Zm0 4.5v2.2h2.2v-2.2H6Zm0 4.5v2.2h2.2v-2.2H6Zm3.95-8.15v9.5h4.1v-9.5h-4.1Zm5.85-.85v2.2H18V6.4h-2.2Zm0 4.5v2.2H18v-2.2h-2.2Zm0 4.5v2.2H18v-2.2h-2.2Z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="text-[1.9rem] font-black leading-none tracking-[-0.09em] text-[#000000] sm:text-[2.1rem]"
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

        <div className="mx-auto mt-7 grid max-w-[880px] justify-items-center gap-5 sm:mt-9 sm:grid-cols-3 lg:gap-6">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group relative h-full w-full max-w-[270px] rounded-[22px] bg-[linear-gradient(135deg,#6BFF2A_0%,#A6FF00_42%,#8DFF00_70%,#A6FF00_100%)] p-[2px] shadow-[0_0_18px_rgba(166,255,0,0.16),0_18px_45px_rgba(0,0,0,0.38)] transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-[linear-gradient(135deg,#A6FF00_0%,#8DFF00_38%,#6BFF2A_68%,#A6FF00_100%)] hover:shadow-[0_0_26px_rgba(166,255,0,0.24),0_24px_58px_rgba(0,0,0,0.44)]"
            >
              <div className="relative flex h-full min-h-[236px] flex-col items-center justify-center overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,0,0.12),transparent_40%),linear-gradient(155deg,rgba(18,27,13,0.98)_0%,rgba(7,12,8,0.99)_50%,rgba(3,7,5,1)_100%)] px-4 py-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-18px_34px_rgba(0,0,0,0.28)] sm:min-h-[252px] sm:px-5 sm:py-8">
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#A6FF00]/70 to-transparent" />
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#A6FF00] shadow-[0_10px_26px_rgba(166,255,0,0.18),inset_0_1px_0_rgba(255,255,255,0.38)] transition duration-300 group-hover:bg-[#8DFF00] group-hover:shadow-[0_0_18px_rgba(166,255,0,0.28),inset_0_1px_0_rgba(255,255,255,0.42)] sm:h-[61px] sm:w-[61px]">
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
