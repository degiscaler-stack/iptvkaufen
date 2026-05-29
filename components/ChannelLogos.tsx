const channels = [
  { name: "Netflix", logo: "/images/channels/netflix-streaming-logo.svg" },
  { name: "Disney+", logo: "/images/channels/disney-plus-logo.svg" },
  { name: "Prime Video", logo: "/images/channels/prime-video-logo.svg" },
  { name: "Apple TV+", logo: "/images/channels/apple-tv-logo.svg" },
  { name: "DAZN", logo: "/images/channels/dazn-deutschland-logo.svg" },
  { name: "beIN Sports", logo: "/images/channels/bein-sports-logo.svg" },
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
      <div className="pointer-events-none absolute left-1/2 top-10 -z-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#A6FF00]/8 blur-3xl" />

      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A6FF00] sm:mb-4 sm:px-4 sm:py-2 sm:text-[11px]">
            Sender & Streaming
          </p>
          <h2
            id="channel-logos-heading"
            className="text-balance text-[1.9rem] font-black leading-[1.02] tracking-[-0.055em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] sm:text-[2.65rem] lg:text-[3.15rem]"
          >
            Beliebte Kanäle und Plattformen in einer{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              Premium Senderliste
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[14px] leading-6 text-[#F5F5F5]/78 sm:text-base sm:leading-7">
            Eine moderne Auswahl bekannter Sender, Sportkanäle und Streaming-Marken, optimiert für ein hochwertiges
            IPTV Erlebnis auf TV, Smartphone, Tablet und TV Box.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-8">
          {channels.map((channel) => (
            <div
              key={channel.name}
              className="group flex min-h-[82px] items-center justify-center rounded-[18px] border border-[#1F1F1F]/90 bg-[#111111]/52 px-3 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_44px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-[#A6FF00]/45 hover:bg-[#151515]/70 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_22px_54px_rgba(0,0,0,0.3)]"
            >
              <img
                src={channel.logo}
                alt={`${channel.name} Logo`}
                loading="lazy"
                className="h-10 w-full max-w-[132px] object-contain transition duration-300 group-hover:scale-[1.04] sm:h-11"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
