import Image from "next/image";
import Link from "next/link";

export default function PremiumEntertainment() {
  return (
    <section
      aria-labelledby="premium-entertainment-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-14 sm:px-8 sm:py-16 lg:px-0 lg:py-[4.5rem]"
    >
      <div className="mx-auto grid max-w-[1360px] items-center gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16 lg:px-12">
        <div className="relative overflow-hidden rounded-[14px] border border-[#A6FF00]/35 bg-[#090909] shadow-[0_24px_70px_rgba(0,0,0,0.46)]">
          <Image
            src="/images/iptv-kaufen-premium-streaming.webp"
            alt="Grenzenloses Entertainment mit IPTV Kaufen auf modernen Streaming Geräten"
            width={1280}
            height={853}
            priority={false}
            loading="lazy"
            sizes="(min-width: 1024px) 620px, calc(100vw - 2.5rem)"
            className="h-auto w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.18)_0%,transparent_40%),linear-gradient(180deg,transparent_58%,rgba(5,5,5,0.22)_100%)]" />
        </div>

        <div className="max-w-[650px] lg:justify-self-end">
          <h2
            id="premium-entertainment-heading"
            className="text-balance text-[1.9rem] font-black leading-[1.02] tracking-[-0.055em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] sm:text-[2.65rem] lg:text-[3.25rem] lg:leading-[0.98]"
          >
            Grenzenloses Entertainment mit{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              IPTV Kaufen
            </span>
          </h2>

          <div className="mt-4 space-y-3 text-[14px] leading-6 text-[#F5F5F5]/86 sm:mt-5 sm:text-base sm:leading-7">
            <p>
              Mit IPTV Kaufen erhalten Sie Zugriff auf tausende Live-TV-Sender, aktuelle
              Blockbuster, beliebte Serien und internationale Inhalte an einem Ort. Genießen Sie
              Unterhaltung in HD, Full HD und 4K auf Smart TVs, Smartphones, Tablets und allen
              modernen Streaming-Geräten.
            </p>
            <p>
              Dank schneller Server, stabiler Streams und einer benutzerfreundlichen Einrichtung
              erleben Sie Fernsehen und Video-on-Demand ohne Unterbrechungen. IPTV Kaufen verbindet
              Vielfalt, Qualität und Komfort für das ultimative Streaming-Erlebnis in Deutschland.
            </p>
          </div>

          <Link
            href="#preise"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#A6FF00] px-[22px] py-3 text-center text-[12.5px] font-extrabold leading-none uppercase tracking-[0.10em] !text-[#000000] whitespace-nowrap shadow-[0_0_15px_rgba(166,255,0,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_21px_rgba(166,255,0,0.36)]"
          >
            Jetzt IPTV Kaufen
          </Link>
        </div>
      </div>
    </section>
  );
}
