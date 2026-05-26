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
      className="relative isolate overflow-hidden bg-[#000000] px-5 pb-14 pt-3 sm:px-8 sm:pb-16 sm:pt-8 lg:px-10 lg:pb-[4.5rem] lg:pt-5"
    >
      <div className="mx-auto grid max-w-[1380px] items-center gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12">
        <div className="max-w-[640px]">
          <p className="mb-4 inline-flex rounded-full border border-[#A6FF00]/30 bg-[#111111]/70 px-4 py-[9px] text-[11px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] [text-shadow:0_2px_20px_rgba(0,0,0,0.45)]">
            IPTV KAUFEN ERLEBNIS
          </p>

          <h2
            id="premium-experience-heading"
            className="text-balance text-[1.84rem] font-black leading-[1.04] tracking-[-0.045em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] sm:text-[2.4rem] lg:text-[2.7rem]"
          >
            IPTV Kaufen für{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              Premium Streaming
            </span>{" "}
            in Deutschland
          </h2>

          <div className="mt-4 max-w-[610px] space-y-3.5 text-[15px] leading-7 text-[#F5F5F5]/86 sm:text-base">
            <p>
              Mit IPTV Kaufen genießen Sie Live-TV, Filme, Serien und Fußball in HD, Full HD und 4K.
              Das Streaming Erlebnis ist schnell, modern und für alle Geräte optimiert.
            </p>
            <p>
              Ob Smart TV, Smartphone, Tablet oder TV Box – Ihre Inhalte sind jederzeit verfügbar, klar
              strukturiert und einfach zu bedienen.
            </p>
          </div>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2" aria-label="Vorteile des IPTV Kaufen Erlebnisses">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-2.5 rounded-xl border border-[#1F1F1F]/80 bg-[#111111]/42 px-3.5 py-2.5 text-[13px] font-medium text-[#F5F5F5]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00] shadow-[0_0_10px_rgba(166,255,0,0.25)]" />
                {highlight}
              </li>
            ))}
          </ul>

          <Link
            href="#iptv-kaufen"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#A6FF00] px-[22px] py-3 text-center text-[12.5px] font-extrabold leading-none uppercase tracking-[0.10em] !text-[#000000] whitespace-nowrap shadow-[0_0_15px_rgba(166,255,0,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_21px_rgba(166,255,0,0.36)]"
          >
            JETZT IPTV KAUFEN
          </Link>
        </div>

        <div className="relative lg:-mr-5 lg:self-center">
          <div className="relative overflow-hidden rounded-[14px] shadow-[0_24px_74px_rgba(0,0,0,0.42)]">
            <img
              src="/images/iptv-kaufen-premium-streaming-deutschland.webp"
              alt="IPTV Kaufen Premium Streaming Erlebnis in Deutschland"
              className="h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.36)_0%,rgba(5,5,5,0.05)_28%,transparent_58%),linear-gradient(180deg,transparent_48%,rgba(5,5,5,0.28)_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
