import Image from "next/image";

const premiumStreamingFeatures = [
  "Smart TV, Smartphone & Tablet",
  "PC & TV Box kompatibel",
  "HD, Full HD & 4K Erlebnis",
  "Komfortables Streaming zuhause",
];

export default function PremiumEntertainment() {
  return (
    <section
      aria-labelledby="premium-entertainment-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 pb-6 pt-3 sm:px-8 sm:pb-8 sm:pt-8 lg:px-0 lg:pb-9 lg:pt-5"
    >
      <div className="mx-auto grid max-w-[1380px] gap-5 sm:gap-8 lg:max-w-[1360px] lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-x-12 lg:gap-y-0 lg:px-12">
        <div className="max-w-[640px] lg:col-start-2 lg:row-start-1 lg:justify-self-start">
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
              Mit IPTV Kaufen genießen Sie ein komfortables Streaming-Erlebnis auf Smart TV,
              Smartphone, Tablet, PC oder TV Box. Inhalte starten schnell, laufen flüssig und wirken in
              HD, Full HD und 4K besonders klar.
            </p>
          </div>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] bg-[#000000] shadow-[0_18px_46px_rgba(0,0,0,0.36)] sm:rounded-[14px] lg:col-start-1 lg:row-span-2 lg:row-start-1">
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
        </div>

        <div className="max-w-[640px] lg:col-start-2 lg:row-start-2 lg:justify-self-start">
          <ul
            className="grid gap-1.5 sm:grid-cols-2 sm:gap-2.5 lg:mt-6"
            aria-label="Vorteile von Premium Streaming mit IPTV Kaufen"
          >
            {premiumStreamingFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 rounded-xl border border-[#1F1F1F]/80 bg-[#111111]/42 px-2.5 py-1.5 text-[12px] font-medium leading-snug text-[#F5F5F5]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:gap-2.5 sm:px-3.5 sm:py-2.5 sm:text-[13px] sm:leading-normal"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00] shadow-[0_0_10px_rgba(166,255,0,0.25)]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
