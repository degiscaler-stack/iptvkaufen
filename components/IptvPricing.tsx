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
    price: "€9.99",
    description: "Perfekt zum Testen unseres IPTV Services.",
    buttonLabel: "JETZT AUSWÄHLEN",
    badge: undefined,
    highlighted: false,
  },
  {
    duration: "3 Monate",
    price: "€19.99",
    description: "Mehr Streaming zum besten Preis-Leistungs-Verhältnis.",
    buttonLabel: "JETZT AUSWÄHLEN",
    badge: undefined,
    highlighted: false,
  },
  {
    duration: "12 Monate",
    price: "€49.99",
    description: "Die beste Wahl für maximale Ersparnis und 12 Monate Premium IPTV Zugang.",
    badge: "BESTES ANGEBOT",
    buttonLabel: "JETZT SPAREN",
    highlighted: true,
  },
  {
    duration: "6 Monate",
    price: "€29.99",
    description: "Ideal für regelmäßiges Streaming über mehrere Monate.",
    buttonLabel: "JETZT AUSWÄHLEN",
    badge: undefined,
    highlighted: false,
  },
] as const;

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-[#A6FF00]" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="m4.5 10.3 3.3 3.2 7.7-8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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

        <div className="mx-auto mt-8 grid max-w-[1180px] gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 lg:items-center lg:gap-5">
          {packages.map((item) => (
            <article
              key={item.duration}
              className={
                item.highlighted
                  ? "group relative h-full rounded-[24px] bg-[linear-gradient(135deg,rgba(166,255,0,0.94)_0%,rgba(207,255,90,0.9)_44%,rgba(141,255,0,0.82)_100%)] p-px shadow-[0_0_26px_rgba(166,255,0,0.22),0_24px_58px_rgba(0,0,0,0.46)] transition duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_0_34px_rgba(166,255,0,0.28),0_30px_70px_rgba(0,0,0,0.5)] lg:-translate-y-5 lg:hover:-translate-y-6"
                  : "group relative h-full rounded-[22px] bg-[linear-gradient(135deg,rgba(166,255,0,0.22)_0%,rgba(31,31,31,0.78)_50%,rgba(166,255,0,0.16)_100%)] p-px shadow-[0_16px_42px_rgba(0,0,0,0.34)] transition duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_0_18px_rgba(166,255,0,0.12),0_22px_54px_rgba(0,0,0,0.4)]"
              }
            >
              <div
                className={
                  item.highlighted
                    ? "relative flex h-full flex-col overflow-hidden rounded-[23px] bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,0,0.24),transparent_43%),linear-gradient(155deg,rgba(22,36,13,0.99)_0%,rgba(8,14,8,1)_55%,rgba(3,7,5,1)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] lg:p-6"
                    : "relative flex h-full flex-col overflow-hidden rounded-[21px] bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,0,0.08),transparent_42%),linear-gradient(155deg,rgba(16,22,12,0.96)_0%,rgba(8,11,8,0.99)_56%,rgba(4,6,5,1)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.055)] lg:p-6"
                }
              >
                {item.highlighted ? (
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#CFFF5A]/90 to-transparent" />
                ) : (
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#A6FF00]/35 to-transparent" />
                )}

                <div className="mb-4 flex h-[52px] flex-col items-start justify-start">
                  {item.badge ? (
                    <>
                      <span className="inline-flex w-fit rounded-full bg-[#A6FF00] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_18px_rgba(166,255,0,0.3)]">
                        {item.badge}
                      </span>
                      <span className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#CFFF5A]">
                        Meistgewählt
                      </span>
                    </>
                  ) : null}
                </div>

                <div>
                  <h3 className="text-[1.25rem] font-black leading-tight tracking-[-0.04em] text-[#F5F5F5] sm:text-[1.35rem]">
                    {item.duration}
                  </h3>
                  <p className="mt-3 flex h-[52px] items-end gap-1.5">
                    <span
                      className={
                        item.highlighted
                          ? "text-[2.6rem] font-black leading-none tracking-[-0.065em] text-[#F5F5F5] [text-shadow:0_0_18px_rgba(166,255,0,0.12)] sm:text-[2.9rem]"
                          : "text-[2.35rem] font-black leading-none tracking-[-0.06em] text-[#F5F5F5] sm:text-[2.65rem]"
                      }
                    >
                      {item.price}
                    </span>
                  </p>
                  <p
                    className={
                      item.highlighted
                        ? "mt-3 min-h-[3.25rem] text-[13.5px] font-semibold leading-6 text-[#F5F5F5]/88 sm:text-[14px]"
                        : "mt-3 min-h-[3.25rem] text-[13.5px] font-medium leading-6 text-[#F5F5F5]/76 sm:text-[14px]"
                    }
                  >
                    {item.description}
                  </p>
                </div>

                <ul
                  className={
                    item.highlighted
                      ? "mt-5 space-y-2.5 text-[13px] font-semibold leading-snug text-[#F5F5F5]/92"
                      : "mt-5 space-y-2.5 text-[13px] font-medium leading-snug text-[#F5F5F5]/86"
                  }
                >
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#iptv-kaufen"
                  className={
                    item.highlighted
                      ? "mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#A6FF00] px-6 py-3.5 text-center text-[12.5px] font-black uppercase tracking-[0.14em] !text-[#050505] shadow-[0_0_24px_rgba(166,255,0,0.36)] transition duration-300 hover:-translate-y-1 hover:bg-[#B8FF28] hover:shadow-[0_0_32px_rgba(166,255,0,0.46)]"
                      : "mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#A6FF00] px-5 py-3 text-center text-[12px] font-black uppercase tracking-[0.12em] !text-[#050505] shadow-[0_0_14px_rgba(166,255,0,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-[#B8FF28] hover:shadow-[0_0_22px_rgba(166,255,0,0.3)]"
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
