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
                className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4 lg:gap-5 lg:pr-5"
              >
                {deviceItems.map((device) => (
                  <article
                    key={`${setIndex}-${device.src}`}
                    className="flex h-[5.25rem] w-[8.75rem] shrink-0 items-center justify-center rounded-2xl bg-[#111111]/42 px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:h-[6rem] sm:w-[10.5rem] sm:px-4 lg:h-[6.5rem] lg:w-[11.5rem]"
                  >
                    <div className="relative h-[3.25rem] w-full sm:h-[3.75rem] lg:h-[4rem]">
                      <Image
                        src={device.src}
                        alt={device.alt}
                        fill
                        sizes="(min-width: 1024px) 184px, (min-width: 640px) 168px, 140px"
                        draggable={false}
                        loading="lazy"
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
