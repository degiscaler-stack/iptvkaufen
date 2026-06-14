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
    <svg className="h-3.5 w-3.5 shrink-0 text-[#AFFF00]" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
          ? "flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#AFFF00]/85 bg-[#AFFF00]/8 shadow-[0_0_6px_rgba(175,255,0,0.09)]"
          : "flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#AFFF00]/68 bg-[#AFFF00]/5 shadow-[0_0_4px_rgba(175,255,0,0.06)]"
      }
    >
      <svg className="h-9 w-9 text-[#AFFF00] sm:h-8 sm:w-8" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="8.5" y="9.5" width="23" height="22" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M8.5 16.5h23M14.5 7.5v5M25.5 7.5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <text
          x="20"
          y="26.5"
          textAnchor="middle"
          className="fill-[#AFFF00] text-[10px] font-semibold tracking-[-0.08em]"
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
      id="preise"
      aria-labelledby="iptv-pricing-heading"
      className="relative isolate scroll-mt-28 overflow-hidden bg-[#000000] px-5 pb-12 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:px-0 lg:pb-16 lg:pt-11"
    >
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

        <div className="mx-auto mt-7 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-[#A6FF00]/22 bg-[#0A0F0A]/88 px-4 py-2.5 text-center text-[12px] font-semibold leading-5 text-[#F5F5F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:mt-8 sm:px-5 sm:text-[13px]">
          <span className="tracking-[0.08em] text-[#FFD84D]" aria-label="5 Sterne">
            ★★★★★
          </span>
          <span>
            4,9/5 von{" "}
            <span className="text-[#A6FF00]">1150+</span>{" "}
            zufriedenen Kunden •{" "}
            <span className="text-[#A6FF00]">Sofortiger Zugang</span>{" "}
            • Sichere Bestellung
          </span>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1240px] gap-7 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:items-stretch lg:gap-5">
          {packages.map((item) => (
            <article
              key={item.duration}
              className={
                item.highlighted
                  ? "group relative mx-auto h-full w-[calc(100vw-48px)] max-w-[340px] rounded-[22px] bg-[linear-gradient(135deg,#AFFF00_0%,#7DFF00_100%)] p-[0.75px] shadow-[0_0_3px_rgba(175,255,0,0.05),0_14px_32px_rgba(0,0,0,0.36)] transition duration-500 ease-out hover:shadow-[0_0_5px_rgba(175,255,0,0.08),0_18px_38px_rgba(0,0,0,0.4)] sm:w-full sm:max-w-none sm:p-px sm:shadow-[0_0_5px_rgba(175,255,0,0.08),0_18px_42px_rgba(0,0,0,0.4)] sm:hover:shadow-[0_0_8px_rgba(175,255,0,0.11),0_22px_52px_rgba(0,0,0,0.44)]"
                  : "group relative mx-auto h-full w-[calc(100vw-48px)] max-w-[340px] rounded-[22px] bg-[linear-gradient(135deg,#AFFF00_0%,#7DFF00_100%)] p-[0.75px] shadow-[0_0_2px_rgba(175,255,0,0.025),0_12px_30px_rgba(0,0,0,0.3)] transition duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_3px_rgba(175,255,0,0.04),0_16px_36px_rgba(0,0,0,0.34)] sm:w-full sm:max-w-none sm:p-px sm:shadow-[0_0_3px_rgba(175,255,0,0.04),0_16px_38px_rgba(0,0,0,0.34)] sm:hover:-translate-y-1 sm:hover:shadow-[0_0_5px_rgba(175,255,0,0.07),0_20px_48px_rgba(0,0,0,0.38)]"
              }
            >
              <div
                className={
                  item.highlighted
                    ? "relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-[21px] bg-[radial-gradient(circle_at_50%_0%,rgba(175,255,0,0.11),transparent_40%),linear-gradient(160deg,rgba(15,26,11,0.98)_0%,rgba(8,13,8,1)_54%,rgba(3,7,5,1)_100%)] px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:min-h-[512px] sm:px-5 sm:py-6 lg:px-6"
                    : "relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-[21px] bg-[radial-gradient(circle_at_50%_0%,rgba(175,255,0,0.045),transparent_40%),linear-gradient(160deg,rgba(13,19,10,0.98)_0%,rgba(7,11,8,1)_56%,rgba(3,6,5,1)_100%)] px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.065)] sm:min-h-[512px] sm:px-5 sm:py-6 lg:px-6"
                }
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#AFFF00]/45 to-transparent" />

                <div className={item.badge ? "mb-5 flex h-5 items-center justify-center sm:mb-2.5 sm:h-[24px]" : "mb-1 flex h-5 items-center justify-center sm:mb-2.5 sm:h-[24px]"}>
                  {item.badge ? (
                    <span className="inline-flex whitespace-nowrap rounded-full bg-[#AFFF00] px-3.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#050505] shadow-[0_0_6px_rgba(175,255,0,0.12)]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>

                <div className="flex justify-center">
                  <CalendarIcon number={item.iconNumber} highlighted={item.highlighted} />
                </div>

                <h3 className="mt-2.5 text-center text-[1.18rem] font-semibold leading-tight tracking-[-0.025em] text-[#F5F5F5] sm:mt-4 sm:text-[1.3rem]">
                  {item.duration}
                </h3>

                <div className="mx-auto mt-2.5 h-px w-16 rounded-full bg-[#AFFF00]/90 shadow-[0_0_4px_rgba(175,255,0,0.1)] sm:mt-3" />

                <p className="mt-3 flex h-12 items-end justify-center sm:mt-4 sm:h-[54px]">
                  <span
                    className={
                      item.highlighted
                        ? "text-[2.88rem] font-semibold leading-none tracking-[-0.055em] text-[#AFFF00] [text-shadow:0_0_4px_rgba(175,255,0,0.1)] sm:text-[3.02rem]"
                        : "text-[2.48rem] font-semibold leading-none tracking-[-0.045em] text-[#F5F5F5] sm:text-[2.64rem]"
                    }
                  >
                    {item.price}
                  </span>
                </p>

                <p className="mx-auto mt-2.5 h-[3.85rem] w-full max-w-[250px] text-left text-[13.5px] font-normal leading-[1.55] text-[#F5F5F5]/80 sm:mt-3.5 sm:h-[4.75rem] sm:max-w-[215px] sm:text-[14px] sm:leading-[1.7]">
                  {item.description}
                </p>

                <ul className="mx-auto mb-5 mt-1.5 w-full max-w-[250px] space-y-1.5 text-left text-[13px] font-normal leading-snug text-[#F5F5F5]/88 sm:mb-9 sm:mt-4 sm:max-w-[215px] sm:space-y-2.5">
                  {features.map((feature) => (
                    <li key={feature} className="grid grid-cols-[15px_1fr] items-center gap-2.5 sm:gap-3">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#preise"
                  className={
                    item.highlighted
                      ? "mx-auto mt-auto inline-flex min-h-9 w-full max-w-[270px] items-center justify-center rounded-full bg-[#AFFF00] px-4 py-2 text-center text-[12px] font-semibold uppercase tracking-[0.13em] !text-[#050505] shadow-[0_0_4px_rgba(175,255,0,0.09)] transition duration-300 hover:-translate-y-1 hover:bg-[#B8FF4D] hover:shadow-[0_0_6px_rgba(175,255,0,0.14)] sm:min-h-11 sm:max-w-none sm:px-5 sm:py-3 sm:shadow-[0_0_6px_rgba(175,255,0,0.12)] sm:hover:shadow-[0_0_9px_rgba(175,255,0,0.18)]"
                      : "mx-auto mt-auto inline-flex min-h-9 w-full max-w-[270px] items-center justify-center rounded-full bg-[#AFFF00] px-4 py-2 text-center text-[11.5px] font-semibold uppercase tracking-[0.11em] !text-[#050505] shadow-[0_0_3px_rgba(175,255,0,0.06)] transition duration-300 hover:-translate-y-1 hover:bg-[#B8FF4D] hover:shadow-[0_0_5px_rgba(175,255,0,0.1)] sm:min-h-11 sm:max-w-none sm:px-5 sm:py-3 sm:shadow-[0_0_4px_rgba(175,255,0,0.08)] sm:hover:shadow-[0_0_7px_rgba(175,255,0,0.12)]"
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
