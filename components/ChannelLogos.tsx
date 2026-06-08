import DraggableMarquee from "./DraggableMarquee";

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

function LogoMarqueeRow({
  logos,
  direction,
}: {
  logos: typeof topLogoRow;
  direction: "left" | "right";
}) {
  return (
    <DraggableMarquee
      className="channel-marquee overflow-hidden px-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:px-7 lg:px-9"
      direction={direction}
      speed={direction === "left" ? 41 : 37}
      trackClassName={`channel-marquee-track channel-marquee-track--${direction} flex w-max items-center`}
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
              className="channel-logo-shell relative isolate flex h-[4.85rem] w-[140px] shrink-0 items-center justify-center sm:h-[5.65rem] sm:w-[168px] lg:h-[6.3rem] lg:w-[202px]"
            >
              <img
                src={logo.src}
                alt={`${logo.name} Logo`}
                draggable={false}
                loading="lazy"
                className="relative z-10 max-h-[4.05rem] w-auto max-w-full object-contain sm:max-h-[4.55rem] lg:max-h-[4.85rem]"
              />
            </span>
          ))}
        </div>
      ))}
    </DraggableMarquee>
  );
}

export default function ChannelLogos() {
  return (
    <section
      id="senderliste"
      aria-labelledby="channel-logos-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 pb-7 pt-10 sm:px-8 sm:pb-8 sm:pt-12 lg:px-0 lg:pb-8 lg:pt-14"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[760px] text-center">
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

        <style>{`
          .channel-marquee-track {
            will-change: transform;
          }
        `}</style>
      </div>
    </section>
  );
}
