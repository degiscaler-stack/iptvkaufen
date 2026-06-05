import Image from "next/image";

const premiumStreamingFeatures = [
  "Filme & Serien auf Abruf",
  "Sport & Live-TV vereint",
  "4K Streaming-Erlebnis",
  "Unterhaltung auf allen Geräten",
];

export default function PremiumEntertainment() {
  return (
    <section
      aria-labelledby="premium-entertainment-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 pb-14 pt-3 sm:px-8 sm:pb-16 sm:pt-8 lg:px-0 lg:pb-[4.5rem] lg:pt-5"
    >
      <div className="mx-auto grid max-w-[1380px] items-center gap-5 sm:gap-8 lg:max-w-[1360px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] bg-[#000000] sm:rounded-[14px]">
          <Image
            src="/images/iptv-kaufen-premium-streaming.webp"
            alt="Premium Streaming mit IPTV Kaufen auf modernen Streaming Geräten"
            width={1280}
            height={853}
            priority={false}
            loading="lazy"
            sizes="(min-width: 1024px) 620px, calc(100vw - 2.5rem)"
            className="h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#000000_0%,rgba(0,0,0,0)_18%,rgba(0,0,0,0)_78%,#000000_100%),linear-gradient(90deg,#000000_0%,rgba(0,0,0,0)_16%,rgba(0,0,0,0)_84%,#000000_100%)]" />
        </div>

        <div className="max-w-[640px] lg:justify-self-start">
          <h2
            id="premium-entertainment-heading"
            className="text-balance text-[1.66rem] font-black leading-[1.02] tracking-[-0.055em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] sm:text-[2.4rem] lg:text-[3.15rem] lg:leading-[0.97]"
          >
            Premium Streaming mit{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              IPTV Kaufen
            </span>
          </h2>

          <div className="mt-3 max-w-[590px] text-[14px] leading-6 text-[#F5F5F5]/86 sm:mt-4 sm:text-base sm:leading-7">
            <p>
              Mit IPTV Kaufen genießen Sie Live-TV, Filme, Serien und Sport in HD, Full HD und 4K
              auf allen Geräten. Die Plattform ist schnell, stabil und einfach zu nutzen – für ein
              modernes Streaming-Erlebnis in Deutschland.
            </p>
          </div>

          <ul
            className="mt-5 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-2.5"
            aria-label="Vorteile von Premium Streaming mit IPTV Kaufen"
          >
            {premiumStreamingFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 rounded-full border border-[#1F1F1F]/65 bg-[#0B0B0B]/34 px-3 py-2 text-[12px] font-medium leading-snug text-[#F5F5F5]/88 sm:gap-2.5 sm:px-3.5 sm:py-2.5 sm:text-[13px] sm:leading-normal"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00]/90" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
