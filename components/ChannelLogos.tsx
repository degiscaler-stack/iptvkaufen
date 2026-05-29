const topLogoRow = [
  { name: "Netflix", src: "/images/channels/netflix-streaming-logo.svg" },
  { name: "Disney+", src: "/images/channels/disney-plus-logo.svg" },
  { name: "Prime Video", src: "/images/channels/prime-video-logo.svg" },
  { name: "Apple TV+", src: "/images/channels/apple-tv-logo.svg" },
  { name: "DAZN", src: "/images/channels/dazn-deutschland-logo.svg" },
  { name: "beIN SPORTS", src: "/images/channels/bein-sports-logo.svg" },
  { name: "Sky Sport", src: "/images/channels/sky-sport-logo.svg" },
  { name: "Sky Bundesliga", src: "/images/channels/sky-bundesliga-logo.svg" },
  { name: "Bundesliga", src: "/images/channels/bundesliga-logo.svg" },
  { name: "Champions Sports", src: "/images/channels/champions-league-style-logo.svg" },
  { name: "Eurosport", src: "/images/channels/eurosport-logo.svg" },
  { name: "SPORT1", src: "/images/channels/sport1-logo.svg" },
];

const bottomLogoRow = [
  { name: "RTL", src: "/images/channels/rtl-logo.svg" },
  { name: "ProSieben", src: "/images/channels/prosieben-logo.svg" },
  { name: "SAT.1", src: "/images/channels/sat1-logo.svg" },
  { name: "ARD", src: "/images/channels/ard-logo.svg" },
  { name: "ZDF", src: "/images/channels/zdf-logo.svg" },
  { name: "CANAL+", src: "/images/channels/canal-plus-logo.svg" },
  { name: "Discovery+", src: "/images/channels/discovery-plus-logo.svg" },
  { name: "HBO Max", src: "/images/channels/hbo-max-logo.svg" },
  { name: "Paramount+", src: "/images/channels/paramount-plus-logo.svg" },
  { name: "National Geographic", src: "/images/channels/national-geographic-logo.svg" },
  { name: "Warner TV", src: "/images/channels/warner-tv-logo.svg" },
  { name: "BBC", src: "/images/channels/bbc-logo.svg" },
  { name: "CNN", src: "/images/channels/cnn-logo.svg" },
];

function LogoMarqueeRow({
  logos,
  direction,
}: {
  logos: typeof topLogoRow;
  direction: "left" | "right";
}) {
  return (
    <div className="channel-marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
      <div
        className={`channel-marquee-track channel-marquee-track--${direction} flex w-max items-center`}
      >
        {[0, 1].map((setIndex) => (
          <div
            key={setIndex}
            aria-hidden={setIndex === 1}
            className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4 lg:gap-5 lg:pr-5"
          >
            {logos.map((logo) => (
              <span
                key={`${setIndex}-${logo.name}`}
                className="channel-logo-shell relative isolate flex h-14 w-[100px] shrink-0 items-center justify-center sm:h-16 sm:w-[116px] lg:h-[4.35rem] lg:w-[138px]"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} Logo`}
                  loading="lazy"
                  className="relative z-10 max-h-11 w-auto max-w-full object-contain sm:max-h-12 lg:max-h-[3.2rem]"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChannelLogos() {
  return (
    <section
      id="senderliste"
      aria-labelledby="channel-logos-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-14 sm:px-8 sm:py-16 lg:px-0 lg:py-[4.5rem]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#A6FF00]/35 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-12 -z-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#A6FF00]/7 blur-3xl" />

      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A6FF00] sm:mb-4 sm:px-4 sm:py-2 sm:text-[11px]">
            SENDER & STREAMING
          </p>
          <h2
            id="channel-logos-heading"
            className="text-balance text-[1.9rem] font-black leading-[1.02] tracking-[-0.055em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] sm:text-[2.65rem] lg:text-[3.15rem]"
          >
            Top Sender für IPTV Kaufen in Deutschland
          </h2>
          <p className="mx-auto mt-4 max-w-[650px] text-[14px] leading-6 text-[#F5F5F5]/78 sm:text-base sm:leading-7">
            Entdecken Sie beliebte TV-Sender, Sportkanäle und Streaming-Plattformen für IPTV Kaufen in Deutschland –
            optimiert für alle Geräte.
          </p>
        </div>

        <div className="relative mt-8 space-y-4 py-5 sm:mt-10 sm:space-y-5 sm:py-7">
          <div className="pointer-events-none absolute inset-x-4 top-1/2 -z-10 h-44 -translate-y-1/2 rounded-full bg-[#A6FF00]/10 blur-3xl sm:inset-x-16 sm:h-56" />
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#A6FF00]/35 to-transparent" />
          <LogoMarqueeRow logos={topLogoRow} direction="left" />
          <LogoMarqueeRow logos={bottomLogoRow} direction="right" />
        </div>

        <style>{`
          @keyframes channel-marquee-left {
            from {
              transform: translate3d(0, 0, 0);
            }

            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          @keyframes channel-marquee-right {
            from {
              transform: translate3d(-50%, 0, 0);
            }

            to {
              transform: translate3d(0, 0, 0);
            }
          }

          .channel-marquee-track {
            will-change: transform;
          }

          .channel-marquee-track--left {
            animation: channel-marquee-left 48s linear infinite;
          }

          .channel-marquee-track--right {
            animation: channel-marquee-right 54s linear infinite;
          }

          .channel-logo-shell::before {
            content: "";
            position: absolute;
            inset: 18% 8%;
            border-radius: 999px;
            background:
              radial-gradient(circle at 50% 50%, rgba(245, 245, 245, 0.18), transparent 56%),
              radial-gradient(circle at 50% 50%, rgba(166, 255, 0, 0.16), transparent 70%);
            filter: blur(12px);
            opacity: 0.8;
            transform: translateZ(0);
          }

          .channel-logo-shell img {
            filter:
              drop-shadow(0 0 8px rgba(245, 245, 245, 0.2))
              drop-shadow(0 10px 20px rgba(0, 0, 0, 0.55))
              drop-shadow(0 0 18px rgba(166, 255, 0, 0.12));
            will-change: transform;
          }

          @media (hover: hover) and (pointer: fine) {
            .channel-marquee:hover .channel-marquee-track {
              animation-play-state: paused;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .channel-marquee-track--left,
            .channel-marquee-track--right {
              animation-duration: 90s;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
