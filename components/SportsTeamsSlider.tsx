import Image from "next/image";

import DraggableMarquee from "./DraggableMarquee";

const sportsPosterItems = Array.from({ length: 16 }, (_, index) => {
  const number = index + 1;

  return {
    title: `Live Sport Poster ${number}`,
    src: `/images/Sports teams/iptv-kaufen-${number}.webp`,
    alt: `Live Sport mit IPTV Kaufen – Sport Poster ${number}`,
  };
});

export default function SportsTeamsSlider() {
  return (
    <section
      aria-labelledby="sports-teams-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 pb-8 pt-7 sm:px-8 sm:pb-9 sm:pt-8 lg:px-0 lg:pb-10 lg:pt-8"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mb-4 sm:text-[11px]">
            LIVE SPORT
          </p>
          <h2
            id="sports-teams-heading"
            className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.8rem] lg:text-[3.2rem]"
          >
            Live Sport mit{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              IPTV Kaufen
            </span>{" "}
            erleben
          </h2>
          <p className="mx-auto mt-3 max-w-[680px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Erleben Sie Fußball, Motorsport, Basketball und internationale Sport-Highlights live in HD, Full HD
            und 4K – direkt auf Smart TV, Smartphone, Tablet, PC oder TV Box.
          </p>
        </div>

        <div className="relative mt-7 sm:mt-8">
          <DraggableMarquee
            className="sports-teams-marquee -my-2 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]"
            speed={41}
            trackClassName="sports-teams-track flex w-max items-center"
          >
            {[0, 1].map((setIndex) => (
              <div
                key={setIndex}
                aria-hidden={setIndex === 1}
                className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
              >
                {sportsPosterItems.map((poster) => (
                  <article
                    key={`${setIndex}-${poster.title}`}
                    className="group w-[42vw] max-w-[10rem] shrink-0 sm:w-[11.5rem] sm:max-w-none lg:w-[13.25rem]"
                  >
                    <div className="relative aspect-[2/3] box-border overflow-hidden rounded-[14px] border-2 border-[#A6FF00]/65 bg-[#090909] shadow-[0_18px_42px_rgba(0,0,0,0.36)] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#A6FF00]/85">
                      <Image
                        src={poster.src}
                        alt={poster.alt}
                        fill
                        sizes="(min-width: 1024px) 212px, (min-width: 640px) 184px, 42vw"
                        draggable={false}
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </DraggableMarquee>
        </div>

        <style>{`
          .sports-teams-marquee {
            scrollbar-width: none;
          }

          .sports-teams-marquee::-webkit-scrollbar {
            display: none;
          }

          .sports-teams-track {
            will-change: transform;
          }
        `}</style>
      </div>
    </section>
  );
}
