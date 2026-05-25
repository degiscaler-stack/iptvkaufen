import Link from "next/link";

const highlights = [
  "Live-TV, Filme, Serien und Fußball",
  "HD, Full HD und 4K Qualität",
  "Kompatibel mit allen Geräten",
  "Schneller Zugriff nach der Bestellung",
];

export default function PremiumExperience() {
  return (
    <section
      aria-labelledby="premium-experience-heading"
      className="relative isolate overflow-hidden bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_20%,rgba(166,255,0,0.08),transparent_30rem)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_58%,rgba(30,76,110,0.16),transparent_34rem)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-[#1F1F1F]" />

      <div className="mx-auto grid max-w-[1360px] items-center gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex rounded-full border border-[#A6FF00]/30 bg-[#111111]/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
            IPTV KAUFEN ERLEBNIS
          </p>

          <h2
            id="premium-experience-heading"
            className="text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl"
          >
            IPTV Kaufen für ein Premium Streaming Erlebnis
          </h2>

          <div className="mt-6 space-y-5 text-base leading-8 text-[#F5F5F5]/88 sm:text-lg">
            <p>
              Mit IPTV Kaufen genießen Sie ein modernes Streaming Erlebnis für Deutschland – mit Live-TV,
              Filmen, Serien und Fußball in HD, Full HD und 4K. Alles ist auf eine einfache Nutzung,
              schnelle Wiedergabe und starke Bildqualität ausgelegt.
            </p>
            <p>
              Ob Smart TV, Smartphone, Tablet oder TV Box: Unser IPTV Angebot ist auf verschiedene Geräte
              optimiert und bietet Ihnen Zugriff auf Ihre Lieblingsinhalte jederzeit und überall.
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Vorteile des IPTV Kaufen Erlebnisses">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-3 rounded-2xl border border-[#1F1F1F] bg-[#111111]/55 px-4 py-3 text-sm font-medium text-[#F5F5F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#A6FF00] shadow-[0_0_12px_rgba(166,255,0,0.32)]" />
                {highlight}
              </li>
            ))}
          </ul>

          <Link
            href="#iptv-kaufen"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-[#A6FF00] px-6 py-3 text-center text-[13px] font-extrabold leading-none uppercase tracking-[0.10em] !text-[#000000] whitespace-nowrap shadow-[0_0_14px_rgba(166,255,0,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_22px_rgba(166,255,0,0.38)]"
          >
            JETZT IPTV KAUFEN
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[40px] bg-[#6BFF2A]/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-[#A6FF00]/22 bg-[#111111] shadow-[0_0_36px_rgba(107,255,42,0.12)]">
            <img
              src="/images/iptv-kaufen-premium-streaming-deutschland.webp"
              alt="IPTV Kaufen Premium Streaming Erlebnis in Deutschland"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.04)_0%,rgba(5,5,5,0.22)_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
