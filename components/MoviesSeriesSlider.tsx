import Image from "next/image";

import DraggableMarquee from "./DraggableMarquee";

const posterItems = [
  {
    title: "IPTV Kaufen Poster 1",
    src: "/images/movies-series/iptv-kaufen-1.webp",
    alt: "Beliebter Film und Serien Poster für IPTV Kaufen",
  },
  {
    title: "IPTV Kaufen Poster 2",
    src: "/images/movies-series/iptv-kaufen-2.webp",
    alt: "Premium Serien Poster für IPTV Kaufen Deutschland",
  },
  {
    title: "IPTV Kaufen Poster 3",
    src: "/images/movies-series/iptv-kaufen-3.webp",
    alt: "Blockbuster Poster für IPTV Kaufen in Deutschland",
  },
  {
    title: "IPTV Kaufen Poster 4",
    src: "/images/movies-series/iptv-kaufen-4.webp",
    alt: "Film und Serien Auswahl für IPTV Kaufen",
  },
  {
    title: "IPTV Kaufen Poster 6",
    src: "/images/movies-series/iptv-kaufen-6.webp",
    alt: "Cinema Poster für IPTV Kaufen Streaming",
  },
  {
    title: "IPTV Kaufen Poster 7",
    src: "/images/movies-series/iptv-kaufen-7.webp",
    alt: "Serien und Filme Poster für IPTV Kaufen",
  },
  {
    title: "IPTV Kaufen Poster 8",
    src: "/images/movies-series/iptv-kaufen-8.webp",
    alt: "Beliebte Inhalte Poster für IPTV Kaufen Deutschland",
  },
  {
    title: "IPTV Kaufen Poster 9",
    src: "/images/movies-series/iptv-kaufen-9.webp",
    alt: "Premium Film Poster für IPTV Kaufen",
  },
  {
    title: "IPTV Kaufen Poster 10",
    src: "/images/movies-series/iptv-kaufen-10.webp",
    alt: "Streaming Poster für IPTV Kaufen in Deutschland",
  },
  {
    title: "IPTV Kaufen Poster 11",
    src: "/images/movies-series/iptv-kaufen-11.webp",
    alt: "Film und Serien Highlight für IPTV Kaufen",
  },
] as const;

export default function MoviesSeriesSlider() {
  return (
    <section
      aria-labelledby="movies-series-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-14 sm:px-8 sm:py-16 lg:px-0 lg:py-[4.5rem]"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[820px] text-center">
          <h2
            id="movies-series-heading"
            className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.8rem] lg:text-[3.2rem]"
          >
            Beliebte Filme und Serien für{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              IPTV Kaufen
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[680px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Entdecken Sie beliebte Filme, Serien und Blockbuster aus Deutschland und weltweit – optimiert
            für ein modernes IPTV Kaufen Erlebnis auf allen Geräten.
          </p>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <DraggableMarquee
            className="movies-series-marquee -my-2 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]"
            speed={41}
            trackClassName="movies-series-track flex w-max items-center"
          >
            {[0, 1].map((setIndex) => (
              <div
                key={setIndex}
                aria-hidden={setIndex === 1}
                className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
              >
                {posterItems.map((poster) => (
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
          .movies-series-marquee {
            scrollbar-width: none;
          }

          .movies-series-marquee::-webkit-scrollbar {
            display: none;
          }

          .movies-series-track {
            will-change: transform;
          }
        `}</style>
      </div>
    </section>
  );
}
