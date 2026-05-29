const channels = [
  { name: "Netflix", logo: "/images/channels/netflix-streaming-logo.svg" },
  { name: "Disney+", logo: "/images/channels/disney-plus-logo.svg" },
  { name: "Prime Video", logo: "/images/channels/prime-video-logo.svg" },
  { name: "Apple TV+", logo: "/images/channels/apple-tv-logo.svg" },
  { name: "DAZN", logo: "/images/channels/dazn-deutschland-logo.svg" },
  { name: "beIN SPORT", logo: "/images/channels/bein-sports-logo.svg" },
  { name: "Sky Sport", logo: "/images/channels/sky-sport-logo.svg" },
  { name: "Sky Bundesliga", logo: "/images/channels/sky-bundesliga-logo.svg" },
  { name: "RTL", logo: "/images/channels/rtl-logo.svg" },
  { name: "ProSieben", logo: "/images/channels/prosieben-logo.svg" },
  { name: "SAT.1", logo: "/images/channels/sat1-logo.svg" },
  { name: "ARD", logo: "/images/channels/ard-logo.svg" },
  { name: "ZDF", logo: "/images/channels/zdf-logo.svg" },
  { name: "Eurosport", logo: "/images/channels/eurosport-logo.svg" },
  { name: "SPORT1", logo: "/images/channels/sport1-logo.svg" },
  { name: "CANAL+", logo: "/images/channels/canal-plus-logo.svg" },
];

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
          <p className="mx-auto mt-4 max-w-[620px] text-[14px] leading-6 text-[#F5F5F5]/78 sm:text-base sm:leading-7">
            Entdecken Sie beliebte Sender, Sportkanäle und Streaming-Marken für IPTV Kaufen in Deutschland – optimiert
            für TV, Smartphone, Tablet und TV Box.
          </p>
        </div>

        <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:mt-10">
          <div className="channel-marquee-track flex w-max items-center">
            {[0, 1].map((setIndex) => (
              <div
                key={setIndex}
                aria-hidden={setIndex === 1}
                className="flex shrink-0 items-center gap-8 pr-8 sm:gap-10 sm:pr-10 md:gap-12 md:pr-12"
              >
                {channels.map((channel) => (
                  <img
                    key={`${setIndex}-${channel.name}`}
                    src={channel.logo}
                    alt={`${channel.name} Logo`}
                    loading="lazy"
                    className="max-h-9 w-auto max-w-[112px] shrink-0 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] sm:max-h-10 sm:max-w-[128px] md:max-h-11 md:max-w-[142px]"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes channel-marquee {
            from {
              transform: translate3d(0, 0, 0);
            }

            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          .channel-marquee-track {
            animation: channel-marquee 34s linear infinite;
            will-change: transform;
          }

          @media (hover: hover) and (pointer: fine) {
            .channel-marquee-track:hover {
              animation-play-state: paused;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .channel-marquee-track {
              animation-duration: 70s;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
