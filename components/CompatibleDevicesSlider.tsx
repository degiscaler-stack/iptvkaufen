import DraggableMarquee from "./DraggableMarquee";
import { compatibleDeviceItems } from "./compatibleDeviceIcons";

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

        <div className="relative mt-4 sm:mt-5">
          <DraggableMarquee
            className="compatible-devices-marquee -my-1 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]"
            direction="left"
            speed={38}
            trackClassName="compatible-devices-track flex w-max items-center"
          >
            {[0, 1].map((setIndex) => (
              <div
                key={setIndex}
                aria-hidden={setIndex === 1}
                className="flex shrink-0 items-center gap-2 pr-2 sm:gap-2.5 sm:pr-2.5 lg:gap-3 lg:pr-3"
              >
                {compatibleDeviceItems.map((device) => (
                  <article
                    key={`${setIndex}-${device.id}`}
                    aria-label={device.alt}
                    className="group flex h-[54px] w-[calc((100vw-2.5rem-1rem)/3)] shrink-0 items-center gap-2.5 rounded-xl border border-[#A6FF00]/20 bg-[#0a0a0a]/90 px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-[border-color,box-shadow] duration-200 hover:border-[#A6FF00]/34 hover:shadow-[0_0_10px_rgba(166,255,0,0.08)] sm:h-[58px] sm:w-[calc((100vw-4rem-2rem)/5)] sm:gap-3 sm:px-3 lg:h-[62px] lg:w-[calc((min(100vw,1360px)-6rem-3rem)/7)] lg:px-3.5"
                  >
                    <device.Icon />
                    <p className="min-w-0 flex-1 truncate text-[13px] font-semibold leading-tight text-[#F5F5F5] sm:text-[14px]">
                      {device.label}
                    </p>
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
