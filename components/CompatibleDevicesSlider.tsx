import Image from "next/image";

import DraggableMarquee from "./DraggableMarquee";

const deviceItems = [
  {
    src: "/images/Operating systems/iptv-kaufen-1.webp",
    alt: "IPTV Kaufen auf Smart TV",
  },
  {
    src: "/images/Operating systems/iptv-kaufen-2.webp",
    alt: "IPTV Kaufen auf Android TV",
  },
  {
    src: "/images/Operating systems/iptv-kaufen-3.webp",
    alt: "IPTV Kaufen auf Fire TV",
  },
  {
    src: "/images/Operating systems/iptv-kaufen-4.webp",
    alt: "IPTV Kaufen auf MAG Box",
  },
  {
    src: "/images/Operating systems/iptv-kaufen-5.webp",
    alt: "IPTV Kaufen auf Windows",
  },
  {
    src: "/images/Operating systems/iptv-kaufen-6.webp",
    alt: "IPTV Kaufen auf Smartphone",
  },
  {
    src: "/images/Operating systems/iptv-kaufen-7.webp",
    alt: "IPTV Kaufen auf Tablet",
  },
  {
    src: "/images/Operating systems/iptv-kaufen-8.webp",
    alt: "IPTV Kaufen auf TV Box",
  },
  {
    src: "/images/Operating systems/iptv-kaufen-9.webp",
    alt: "IPTV Kaufen auf PlayStation",
  },
  {
    src: "/images/Operating systems/iptv-kaufen-10.webp",
    alt: "IPTV Kaufen auf VLC Media Player",
  },
  {
    src: "/images/Operating systems/iptv-kaufen-11.webp",
    alt: "IPTV Kaufen auf Roku TV",
  },
];

export default function CompatibleDevicesSlider() {
  return (
    <section
      aria-labelledby="compatible-devices-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 pb-7 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:px-0 lg:pb-9 lg:pt-6"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mb-4 sm:text-[11px]">
            KOMPATIBLE GERÄTE
          </p>
          <h2
            id="compatible-devices-heading"
            className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.8rem] lg:text-[3.2rem]"
          >
            IPTV Kaufen auf allen{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              Geräten
            </span>{" "}
            nutzen
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:mt-4 sm:text-[15px] sm:leading-7">
            Streamen Sie IPTV Kaufen auf Smart TV, Android TV, Fire TV, MAG Box, Windows, Smartphone,
            Tablet, TV Box und weiteren modernen Geräten.
          </p>
        </div>

        <div className="relative mt-5 sm:mt-6">
          <DraggableMarquee
            className="compatible-devices-marquee -my-2 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]"
            direction="left"
            speed={38}
            trackClassName="compatible-devices-track flex w-max items-center"
          >
            {[0, 1].map((setIndex) => (
              <div
                key={setIndex}
                aria-hidden={setIndex === 1}
                className="flex shrink-0 items-center gap-2 pr-2"
              >
                {deviceItems.map((device) => (
                  <article
                    key={`${setIndex}-${device.src}`}
                    className="flex aspect-[5/4] w-[calc((100vw-2.5rem-1rem)/3)] shrink-0 items-center justify-center rounded-2xl bg-[#111111]/42 px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:w-[calc((100vw-4rem-1rem)/5)] sm:px-2.5 lg:w-[calc((min(100vw,1360px)-6rem-1.5rem)/7)]"
                  >
                    <div className="relative aspect-[4/3] w-[84%]">
                      <Image
                        src={device.src}
                        alt={device.alt}
                        fill
                        sizes="(min-width: 1024px) 180px, (min-width: 640px) 128px, 108px"
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                        className="object-contain object-center"
                      />
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </DraggableMarquee>
        </div>

        <style>{`
          .compatible-devices-marquee {
            scrollbar-width: none;
          }

          .compatible-devices-marquee::-webkit-scrollbar {
            display: none;
          }

          .compatible-devices-track {
            will-change: transform;
          }
        `}</style>
      </div>
    </section>
  );
}
