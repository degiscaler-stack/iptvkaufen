import Image from "next/image";

export default function PremiumEntertainment() {
  return (
    <section
      aria-labelledby="premium-entertainment-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-14 sm:px-8 sm:py-16 lg:px-0 lg:py-[4.5rem]"
    >
      <div className="mx-auto grid max-w-[1360px] items-center gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16 lg:px-12">
        <div className="relative overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.46)]">
          <Image
            src="/images/iptv-kaufen-premium-streaming.webp"
            alt="Premium Streaming mit IPTV Kaufen auf modernen Streaming Geräten"
            width={1280}
            height={853}
            priority={false}
            loading="lazy"
            sizes="(min-width: 1024px) 620px, calc(100vw - 2.5rem)"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="max-w-[640px] lg:justify-self-end">
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
        </div>
      </div>
    </section>
  );
}
