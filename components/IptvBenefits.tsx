const benefits = [
  {
    icon: "broadcast",
    title: "22.000+ Live-TV Sender",
    text: "Deutsche, internationale und Premium-Sender auf einer Plattform.",
  },
  {
    icon: "media",
    title: "Filme & Serien auf Abruf",
    text: "Tausende Blockbuster, deutsche Serien und internationale Inhalte jederzeit verfügbar.",
  },
  {
    icon: "quality",
    title: "HD, Full HD & 4K Qualität",
    text: "Stabile Streams mit schneller Ladezeit und hoher Bildqualität.",
  },
] as const;

function BenefitIcon({ icon }: { icon: (typeof benefits)[number]["icon"] }) {
  const iconClass = "h-8 w-8 text-[#A6FF00] sm:h-9 sm:w-9";

  if (icon === "broadcast") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 19h8M12 15.5V19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M8.4 10.2h.01M11.2 10.2h.01M14 10.2h.01M16.8 10.2h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "media") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4.5" width="16" height="15" rx="2.4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 4.5v15M16 4.5v15M4 9h4M16 9h4M4 15h4M16 15h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="m11 10 3.4 2-3.4 2v-4Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 19 6v5.4c0 4.2-2.7 7.5-7 9.1-4.3-1.6-7-4.9-7-9.1V6l7-2.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8 13.2h2.7L12.1 10l1.8 5 1.3-2.8H18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function IptvBenefits() {
  return (
    <section
      aria-labelledby="iptv-benefits-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-14 sm:px-8 sm:py-16 lg:px-0 lg:py-[4.5rem]"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[820px] text-center">
          <h2
            id="iptv-benefits-heading"
            className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.8rem] lg:text-[3.2rem]"
          >
            Warum IPTV Kaufen bei{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              iptvkaufenX?
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[720px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Entdecken Sie die wichtigsten Vorteile von iptvkaufenX – stabile Streams, große Auswahl
            und ein modernes IPTV Kaufen Erlebnis auf allen Geräten.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group relative overflow-hidden rounded-[16px] border border-[#A6FF00]/18 bg-[#0B0B0B]/72 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#A6FF00]/34 sm:px-6 sm:py-6"
            >
              <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#A6FF00]/55 to-transparent" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#A6FF00]/20 bg-[#A6FF00]/7 sm:h-14 sm:w-14">
                <BenefitIcon icon={benefit.icon} />
              </div>
              <h3 className="mt-4 text-[1.05rem] font-extrabold leading-tight tracking-[-0.035em] text-[#F5F5F5] sm:text-[1.18rem]">
                {benefit.title}
              </h3>
              <p className="mt-2 text-[13px] font-medium leading-6 text-[#F5F5F5]/74 sm:text-[14px]">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
