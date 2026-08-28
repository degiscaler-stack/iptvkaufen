import Link from "next/link";

const topics = [
  "M3U & M3U8",
  "IPTV-Apps",
  "Geräte-Setup",
  "Fehlerbehebung",
] as const;

export default function Hero() {
  return (
    <section
      id="iptv-wissen"
      aria-label="IPTV in Deutschland: Technik, Apps und Einrichtung"
      className="relative isolate flex min-h-0 items-center justify-center overflow-hidden bg-[#000000] px-5 pb-[clamp(1.5rem,3vh,2.5rem)] pt-[clamp(5.5rem,calc(4.5rem+3vh),9rem)] text-center sm:min-h-[clamp(620px,88vh,900px)] sm:px-8 lg:min-h-[clamp(740px,calc(88vh+110px),1040px)]"
    >
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(166,255,0,0.18),transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_88%,rgba(166,255,0,0.08),transparent_36%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,rgba(166,255,0,0.07),transparent_32%)]" />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(166,255,0,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(166,255,0,0.16) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute left-[18%] top-[22%] h-40 w-40 rotate-12 rounded-[28px] border border-[#A6FF00]/18 bg-[#A6FF00]/5" />
        <div className="absolute right-[14%] bottom-[18%] h-28 w-28 -rotate-6 rounded-full border border-[#A6FF00]/14 bg-[#A6FF00]/4" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.28)_0%,rgba(5,5,5,0.46)_48%,rgba(5,5,5,0.82)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#000000] to-transparent" />
      <div
        aria-hidden="true"
        className="hero-shine pointer-events-none absolute inset-y-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-2xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[950px] py-[clamp(0.25rem,1.5vh,1rem)]">
        <p className="hero-fade-up hero-fade-up-1 mx-auto mb-[18px] inline-flex rounded-full border border-[#A6FF00]/30 bg-[#111111]/70 px-4 py-[9px] text-[11px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] [text-shadow:0_2px_20px_rgba(0,0,0,0.45)] sm:mb-5 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em]">
          IPTV-Wissen für Deutschland
        </p>

        <h1 className="hero-fade-up hero-fade-up-2 text-balance text-[clamp(2.05rem,3.6vw+1rem,4.4rem)] font-black leading-[0.98] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
          IPTV in Deutschland: Technik, Apps und Einrichtung
        </h1>

        <p className="hero-fade-up hero-fade-up-3 mx-auto mt-[clamp(1rem,2.5vh,1.75rem)] max-w-[92%] text-pretty text-[clamp(0.9rem,0.35vw+0.8rem,1.25rem)] leading-[1.55] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.55)] sm:max-w-3xl sm:leading-8">
          Unabhängige Erklärungen zu IPTV-Technik, Playlisten (M3U/M3U8), Playern, Geräten,
          Einrichtung und Fehlerbehebung – ohne Verkauf von Zugängen oder Programmpaketen.
        </p>

        <div className="hero-fade-up hero-fade-up-4 relative mt-[clamp(1.5rem,3vh,2.5rem)] flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/blog"
            className="inline-flex min-h-11 w-[calc(100%_-_88px)] max-w-[285px] items-center justify-center rounded-full bg-[#A6FF00] px-[18px] py-2.5 text-center text-[11px] font-extrabold leading-none uppercase tracking-[0.10em] text-[#000000] whitespace-nowrap sm:w-auto sm:min-h-0 sm:max-w-none sm:px-[22px] sm:py-3 sm:text-[13px] sm:tracking-[0.16em]"
          >
            Zum Ratgeber
          </Link>
          <Link
            href="/#faq"
            className="inline-flex min-h-11 w-[calc(100%_-_88px)] max-w-[285px] items-center justify-center rounded-full border border-[#A6FF00]/35 bg-[#111111]/55 px-[18px] py-2.5 text-center text-[11px] font-extrabold leading-none uppercase tracking-[0.10em] text-[#F5F5F5] whitespace-nowrap backdrop-blur-xl transition-[background-color,border-color,color] duration-300 hover:border-[#A6FF00] hover:bg-[#111111]/70 hover:text-[#A6FF00] sm:w-auto sm:min-h-0 sm:max-w-none sm:px-[22px] sm:py-3 sm:text-[13px] sm:tracking-[0.16em]"
          >
            FAQ lesen
          </Link>
        </div>

        <ul
          className="hero-fade-up hero-fade-up-5 mx-auto mt-[clamp(1.25rem,3.5vh,3.5rem)] grid max-w-[92%] grid-cols-2 gap-2 sm:max-w-3xl sm:grid-cols-4 sm:gap-2.5"
          aria-label="Themen auf iptvkaufenX"
        >
          {topics.map((topic) => (
            <li
              key={topic}
              className="rounded-2xl border border-[#1F1F1F]/90 bg-[#111111]/48 px-3 py-2.5 text-[11px] font-medium text-[#F5F5F5]/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-md transition duration-300 hover:border-[#A6FF00]/45 hover:text-[#F5F5F5] sm:px-3 sm:py-2 sm:text-xs"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
