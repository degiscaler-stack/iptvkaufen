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
  { name: "Champions League", src: "/images/channels/champions-league-style-logo.svg" },
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

const channelFeatures = [
  { label: "22.000+ Sender", icon: "broadcast" },
  { label: "HD, Full HD & 4K", icon: "quality" },
  { label: "Alle Geräte", icon: "devices" },
  { label: "Stabil & Sicher", icon: "shield" },
  { label: "24/7 Support", icon: "support" },
] as const;

function FeatureIcon({ icon }: { icon: (typeof channelFeatures)[number]["icon"] }) {
  const iconClass = "h-8 w-8 text-[#A6FF00] sm:h-10 sm:w-10 lg:h-11 lg:w-11";

  if (icon === "broadcast") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 18.5v-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M8.5 21h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7.1 14.2a6.6 6.6 0 0 1 0-8.4M16.9 5.8a6.6 6.6 0 0 1 0 8.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M4.3 17a10.6 10.6 0 0 1 0-14M19.7 3a10.6 10.6 0 0 1 0 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "quality") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="11.5" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 20h8M12 16.5V20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="m9 11 2 2 4-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "devices") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="13" height="9" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
        <rect x="17" y="9" width="4" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7 18h6M10 14v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.5 19 6v5.4c0 4.2-2.7 7.5-7 9.1-4.3-1.6-7-4.9-7-9.1V6l7-2.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="m8.8 12.1 2.1 2.1 4.4-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13.5V12a7 7 0 0 1 14 0v1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5 13h2.2c.7 0 1.3.6 1.3 1.3v2.4c0 .7-.6 1.3-1.3 1.3H6.5A2.5 2.5 0 0 1 4 15.5v-1A1.5 1.5 0 0 1 5.5 13H5Zm14 0h-2.2c-.7 0-1.3.6-1.3 1.3v2.4c0 .7.6 1.3 1.3 1.3h.7a2.5 2.5 0 0 0 2.5-2.5v-1A1.5 1.5 0 0 0 18.5 13H19Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15.5 18c-.7 1.4-1.9 2-3.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function LogoMarqueeRow({
  logos,
  direction,
}: {
  logos: typeof topLogoRow;
  direction: "left" | "right";
}) {
  return (
    <div className="channel-marquee overflow-hidden px-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:px-7 lg:px-9">
      <div
        className={`channel-marquee-track channel-marquee-track--${direction} flex w-max items-center`}
      >
        {[0, 1].map((setIndex) => (
          <div
            key={setIndex}
            aria-hidden={setIndex === 1}
            className="flex shrink-0 items-center gap-2 pr-2 sm:gap-3 sm:pr-3 lg:gap-3 lg:pr-3"
          >
            {logos.map((logo) => (
              <span
                key={`${setIndex}-${logo.name}`}
                className="channel-logo-shell relative isolate flex h-[4.4rem] w-[126px] shrink-0 items-center justify-center sm:h-[5.15rem] sm:w-[152px] lg:h-[5.75rem] lg:w-[184px]"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} Logo`}
                  loading="lazy"
                  className="relative z-10 max-h-[3.75rem] w-auto max-w-full object-contain sm:max-h-[4.15rem] lg:max-h-[4.45rem]"
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
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="mb-2.5 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/60 px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-[0.22em] text-[#A6FF00] sm:mb-3 sm:px-3 sm:py-1.5 sm:text-[9.5px]">
            SENDER & STREAMING
          </p>
          <h2
            id="channel-logos-heading"
            className="text-balance text-[2rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.8rem] lg:text-[3.25rem]"
          >
            Top Sender für{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              IPTV
            </span>{" "}
            Kaufen in{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              Deutschland
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Beliebte Sender und Streaming-Marken für IPTV Kaufen in Deutschland.
          </p>
        </div>

        <div className="relative mt-5 space-y-2 py-2 sm:mt-7 sm:space-y-2.5 sm:py-3">
          <LogoMarqueeRow logos={topLogoRow} direction="left" />
          <LogoMarqueeRow logos={bottomLogoRow} direction="right" />
        </div>

        <div className="mx-auto mt-1 grid max-w-[1160px] grid-cols-1 gap-y-3 sm:mt-2 sm:grid-cols-5 sm:gap-x-0 sm:gap-y-0">
          {channelFeatures.map((feature) => (
            <div
              key={feature.label}
              className="channel-feature-card flex items-center justify-center gap-3 px-3 py-2.5 text-center text-[13px] font-semibold text-[#F5F5F5] transition-[transform,color] duration-300 sm:min-h-[5.25rem] sm:flex-col sm:gap-2 sm:border-l sm:border-[#1F1F1F]/85 sm:px-4 sm:text-[13.5px] first:sm:border-l-0 lg:text-[14px]"
            >
              <FeatureIcon icon={feature.icon} />
              <span>{feature.label}</span>
            </div>
          ))}
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

          .channel-logo-shell img {
            filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.28));
            will-change: transform;
          }

          @media (hover: hover) and (pointer: fine) {
            .channel-marquee:hover .channel-marquee-track {
              animation-play-state: paused;
            }

            .channel-feature-card:hover {
              transform: translate3d(0, -2px, 0);
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
