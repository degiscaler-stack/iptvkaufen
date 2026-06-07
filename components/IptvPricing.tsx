import Link from "next/link";

const features = [
  "22.000+ Live-TV Sender",
  "Filme & Serien auf Abruf",
  "HD, Full HD & 4K Qualität",
  "Alle Geräte kompatibel",
  "Schnelle Aktivierung",
  "24/7 Support",
] as const;

const packages = [
  {
    duration: "1 Monat",
    iconNumber: "1",
    price: "€9.99",
    description: "Perfekt zum Testen unseres IPTV Services.",
    buttonLabel: "JETZT AUSWÄHLEN",
    badge: undefined,
    highlighted: false,
  },
  {
    duration: "3 Monate",
    iconNumber: "3",
    price: "€19.99",
    description: "Mehr Streaming zum besten Preis-Leistungs-Verhältnis.",
    buttonLabel: "JETZT AUSWÄHLEN",
    badge: undefined,
    highlighted: false,
  },
  {
    duration: "12 Monate",
    iconNumber: "12",
    price: "€49.99",
    description: "Die beste Wahl für maximale Ersparnis und 12 Monate Premium IPTV Zugang.",
    badge: "★ BESTES ANGEBOT",
    buttonLabel: "JETZT SPAREN",
    highlighted: true,
  },
  {
    duration: "6 Monate",
    iconNumber: "6",
    price: "€29.99",
    description: "Ideal für regelmäßiges Streaming über mehrere Monate.",
    buttonLabel: "JETZT AUSWÄHLEN",
    badge: undefined,
    highlighted: false,
  },
] as const;

function CheckIcon() {
  return (
    <svg className="h-[15px] w-[15px] shrink-0 text-[#A6FF00]" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="m4.5 10.3 3.3 3.2 7.7-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({
  number,
  highlighted,
}: {
  number: string;
  highlighted: boolean;
}) {
  return (
    <div
      className={
        highlighted
          ? "flex h-[66px] w-[66px] items-center justify-center rounded-full border border-[#B8FF4D]/90 bg-[#A6FF00]/9 shadow-[0_0_8px_rgba(166,255,0,0.1)]"
          : "flex h-[66px] w-[66px] items-center justify-center rounded-full border border-[#A6FF00]/78 bg-[#A6FF00]/5 shadow-[0_0_6px_rgba(166,255,0,0.07)]"
      }
    >
      <svg className="h-9 w-9 text-[#A6FF00]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="8.5" y="9.5" width="23" height="22" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M8.5 16.5h23M14.5 7.5v5M25.5 7.5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <text
          x="20"
          y="26.5"
          textAnchor="middle"
          className="fill-[#A6FF00] text-[10px] font-bold tracking-[-0.08em]"
        >
          {number}
        </text>
      </svg>
    </div>
  );
}

export default function IptvPricing() {
  return (
    <section
      id="iptv-pakete"
      aria-labelledby="iptv-pricing-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-14 sm:px-8 sm:py-16 lg:px-0 lg:py-[4.5rem]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(166,255,0,0.1),transparent_34rem)]" />
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mb-4 sm:text-[11px]">
            IPTV KAUFEN PAKETE
          </p>
          <h2
            id="iptv-pricing-heading"
            className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.65rem] lg:text-[3rem]"
          >
            Wählen Sie Ihr{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              IPTV Paket
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[720px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Flexible IPTV Pakete für jeden Bedarf – sofort aktiv, stabil und kompatibel mit allen Geräten.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1260px] gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch lg:gap-5">
          {packages.map((item) => (
            <article
              key={item.duration}
              className={
                item.highlighted
                  ? "group relative h-full rounded-[22px] bg-[linear-gradient(135deg,#7FFF00_0%,#B8FF4D_48%,#7FFF00_100%)] p-[1.4px] shadow-[0_0_7px_rgba(166,255,0,0.09),0_18px_44px_rgba(0,0,0,0.4)] transition duration-500 ease-out hover:shadow-[0_0_11px_rgba(166,255,0,0.13),0_24px_58px_rgba(0,0,0,0.44)] lg:-translate-y-5"
                  : "group relative h-full rounded-[22px] bg-[linear-gradient(135deg,#7FFF00_0%,#B8FF4D_48%,#7FFF00_100%)] p-[1.4px] shadow-[0_0_5px_rgba(166,255,0,0.05),0_16px_40px_rgba(0,0,0,0.34)] transition duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_0_8px_rgba(166,255,0,0.08),0_22px_52px_rgba(0,0,0,0.38)]"
              }
            >
              {item.badge ? (
                <span className="absolute left-1/2 top-0 z-20 inline-flex -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#A6FF00] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#050505] shadow-[0_0_8px_rgba(166,255,0,0.14)]">
                  {item.badge}
                </span>
              ) : null}
              <div
                className={
                  item.highlighted
                    ? "relative flex h-full min-h-[545px] flex-col overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,0,0.13),transparent_42%),linear-gradient(160deg,rgba(17,29,12,0.98)_0%,rgba(8,13,8,1)_54%,rgba(3,7,5,1)_100%)] px-5 py-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.09)] lg:px-6"
                    : "relative flex h-full min-h-[545px] flex-col overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,0,0.065),transparent_42%),linear-gradient(160deg,rgba(14,21,11,0.98)_0%,rgba(7,11,8,1)_56%,rgba(3,6,5,1)_100%)] px-5 py-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] lg:px-6"
                }
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#B8FF4D]/65 to-transparent" />

                <div className="flex justify-center">
                  <CalendarIcon number={item.iconNumber} highlighted={item.highlighted} />
                </div>

                <h3 className="mt-5 text-center text-[1.22rem] font-bold leading-tight tracking-[-0.03em] text-[#F5F5F5] sm:text-[1.34rem]">
                  {item.duration}
                </h3>

                <div className="mx-auto mt-3.5 h-px w-16 rounded-full bg-[#A6FF00] shadow-[0_0_6px_rgba(166,255,0,0.16)]" />

                <p className="mt-5 flex h-[56px] items-end justify-center">
                  <span
                    className={
                      item.highlighted
                        ? "text-[2.92rem] font-bold leading-none tracking-[-0.06em] text-[#A6FF00] [text-shadow:0_0_6px_rgba(166,255,0,0.12)] sm:text-[3.08rem]"
                        : "text-[2.48rem] font-bold leading-none tracking-[-0.05em] text-[#F5F5F5] sm:text-[2.68rem]"
                    }
                  >
                    {item.price}
                  </span>
                </p>

                <p className="mx-auto mt-4 min-h-[4.85rem] max-w-[192px] text-left text-[13.5px] font-normal leading-[1.78] text-[#F5F5F5]/80 sm:text-[14px]">
                  {item.description}
                </p>

                <ul className="mb-8 mt-4 space-y-3 text-left text-[13px] font-normal leading-snug text-[#F5F5F5]/88">
                  {features.map((feature) => (
                    <li key={feature} className="grid grid-cols-[15px_1fr] items-center gap-3">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#iptv-kaufen"
                  className={
                    item.highlighted
                      ? "mt-auto inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#A6FF00] px-5 py-3 text-center text-[12.5px] font-bold uppercase tracking-[0.14em] !text-[#050505] shadow-[0_0_8px_rgba(166,255,0,0.16)] transition duration-300 hover:-translate-y-1 hover:bg-[#B8FF4D] hover:shadow-[0_0_12px_rgba(166,255,0,0.22)]"
                      : "mt-auto inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#A6FF00] px-5 py-3 text-center text-[12px] font-bold uppercase tracking-[0.12em] !text-[#050505] shadow-[0_0_6px_rgba(166,255,0,0.1)] transition duration-300 hover:-translate-y-1 hover:bg-[#B8FF4D] hover:shadow-[0_0_10px_rgba(166,255,0,0.16)]"
                  }
                >
                  {item.buttonLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
