import Image from "next/image";
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
      className="relative isolate overflow-hidden bg-[#000000] px-5 pb-14 pt-3 sm:px-8 sm:pb-16 sm:pt-8 lg:px-0 lg:pb-[4.5rem] lg:pt-5"
    >
      <div className="mx-auto grid max-w-[1380px] items-center gap-5 sm:gap-8 lg:max-w-[1360px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12">
        <div className="max-w-[640px]">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/20 bg-[#111111]/45 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A6FF00]/90 [text-shadow:none] sm:mb-4 sm:border-[#A6FF00]/30 sm:bg-[#111111]/70 sm:px-4 sm:py-[9px] sm:text-[11px] sm:font-bold sm:tracking-[0.24em] sm:text-[#A6FF00] sm:[text-shadow:0_2px_20px_rgba(0,0,0,0.45)]">
            IPTV KAUFEN ERLEBNIS
          </p>

          <h2
            id="premium-experience-heading"
            className="text-balance text-[1.66rem] font-black leading-[1.02] tracking-[-0.055em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] sm:text-[2.4rem] lg:text-[3.15rem] lg:leading-[0.97]"
          >
            IPTV Kaufen für{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              Premium Streaming
            </span>{" "}
            in Deutschland
          </h2>

          <div className="mt-3 max-w-[590px] space-y-2 text-[14px] leading-6 text-[#F5F5F5]/86 sm:mt-4 sm:space-y-3 sm:text-base sm:leading-7">
            <p>
              Mit IPTV Kaufen genießen Sie Live-TV, Filme, Serien und Fußball in HD, Full HD und 4K.
              Schnell, modern und für alle Geräte optimiert.
            </p>
            <p>
              Ob Smart TV, Smartphone oder TV Box – Ihre Inhalte sind klar strukturiert und sofort verfügbar.
            </p>
          </div>

          <div className="mt-4 sm:hidden">
            <div className="relative overflow-hidden rounded-[12px] shadow-[0_18px_46px_rgba(0,0,0,0.42)]">
              <Image
                src="/images/iptv-kaufen-premium-streaming-deutschland.webp"
                alt="IPTV Kaufen Premium Streaming Erlebnis in Deutschland"
                width={1280}
                height={720}
                sizes="(max-width: 639px) calc(100vw - 2.5rem), 640px"
                loading="lazy"
                className="h-auto w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.36)_0%,rgba(5,5,5,0.05)_28%,transparent_58%),linear-gradient(180deg,transparent_48%,rgba(5,5,5,0.28)_100%)]" />
            </div>
          </div>

          <ul className="mt-5 grid gap-1.5 sm:mt-6 sm:grid-cols-2 sm:gap-2.5" aria-label="Vorteile des IPTV Kaufen Erlebnisses">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-2 rounded-xl border border-[#1F1F1F]/80 bg-[#111111]/42 px-2.5 py-1.5 text-[12px] font-medium leading-snug text-[#F5F5F5]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:gap-2.5 sm:px-3.5 sm:py-2.5 sm:text-[13px] sm:leading-normal"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00] shadow-[0_0_10px_rgba(166,255,0,0.25)]" />
                {highlight}
              </li>
            ))}
          </ul>

          <Link
            href="/#preise"
            className="hidden items-center justify-center rounded-full bg-[#A6FF00] text-center font-extrabold leading-none uppercase !text-[#000000] whitespace-nowrap shadow-[0_0_15px_rgba(166,255,0,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_21px_rgba(166,255,0,0.36)] sm:mt-6 sm:inline-flex sm:px-[22px] sm:py-3 sm:text-[12.5px] sm:tracking-[0.10em]"
          >
            JETZT IPTV KAUFEN
          </Link>
        </div>

        <div className="relative hidden sm:block lg:self-center">
          <div className="relative overflow-hidden rounded-[14px] shadow-[0_28px_80px_rgba(0,0,0,0.48)]">
            <Image
              src="/images/iptv-kaufen-premium-streaming-deutschland.webp"
              alt="IPTV Kaufen Premium Streaming Erlebnis in Deutschland"
              width={1280}
              height={720}
              sizes="(min-width: 1024px) 620px, calc(100vw - 4rem)"
              loading="lazy"
              className="h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.36)_0%,rgba(5,5,5,0.05)_28%,transparent_58%),linear-gradient(180deg,transparent_48%,rgba(5,5,5,0.28)_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
