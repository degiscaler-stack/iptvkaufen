const posterItems = [
  {
    title: "Dark",
    src: "/images/movies-series/dark-serie-iptv-kaufen.webp",
    alt: "Dark Serie für IPTV Kaufen in Deutschland",
  },
  {
    title: "Babylon Berlin",
    src: "/images/movies-series/babylon-berlin-serie-iptv-kaufen.webp",
    alt: "Babylon Berlin Serie für IPTV Kaufen",
  },
  {
    title: "Die Kaiserin",
    src: "/images/movies-series/die-kaiserin-serie-iptv-kaufen.webp",
    alt: "Die Kaiserin Serie für IPTV Kaufen in Deutschland",
  },
  {
    title: "Maxton Hall",
    src: "/images/movies-series/maxton-hall-serie-iptv-kaufen.webp",
    alt: "Maxton Hall Serie für IPTV Kaufen",
  },
  {
    title: "Das Boot",
    src: "/images/movies-series/das-boot-serie-iptv-kaufen.webp",
    alt: "Das Boot Serie für IPTV Kaufen",
  },
  {
    title: "4 Blocks",
    src: "/images/movies-series/vier-blocks-serie-iptv-kaufen.webp",
    alt: "4 Blocks Serie für IPTV Kaufen in Deutschland",
  },
  {
    title: "Oppenheimer",
    src: "/images/movies-series/oppenheimer-film-iptv-kaufen.webp",
    alt: "Oppenheimer Film für IPTV Kaufen",
  },
  {
    title: "The Last of Us",
    src: "/images/movies-series/the-last-of-us-serie-iptv-kaufen.webp",
    alt: "The Last of Us Serie für IPTV Kaufen",
  },
  {
    title: "Stranger Things",
    src: "/images/movies-series/stranger-things-serie-iptv-kaufen.webp",
    alt: "Stranger Things Serie für IPTV Kaufen",
  },
  {
    title: "Spider-Man",
    src: "/images/movies-series/spider-man-film-iptv-kaufen.webp",
    alt: "Spider-Man Film für IPTV Kaufen",
  },
  {
    title: "House of the Dragon",
    src: "/images/movies-series/house-of-the-dragon-serie-iptv-kaufen.webp",
    alt: "House of the Dragon Serie für IPTV Kaufen",
  },
  {
    title: "The Boys",
    src: "/images/movies-series/the-boys-serie-iptv-kaufen.webp",
    alt: "The Boys Serie für IPTV Kaufen",
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

        <div className="movies-series-marquee mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)] sm:mt-10">
          <div className="movies-series-track flex w-max items-center gap-3 pr-3 sm:gap-4 sm:pr-4">
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
                    <div className="overflow-hidden rounded-[14px] border border-[#A6FF00]/42 bg-[#090909] shadow-[0_18px_42px_rgba(0,0,0,0.36)] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#A6FF00]/70">
                      <img
                        src={poster.src}
                        alt={poster.alt}
                        width="240"
                        height="360"
                        loading="lazy"
                        decoding="async"
                        className="aspect-[2/3] w-full object-cover"
                      />
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes movies-series-marquee {
            from {
              transform: translate3d(0, 0, 0);
            }

            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          .movies-series-track {
            animation: movies-series-marquee 70s linear infinite;
            will-change: transform;
          }

          @media (prefers-reduced-motion: reduce) {
            .movies-series-track {
              animation-duration: 120s;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
