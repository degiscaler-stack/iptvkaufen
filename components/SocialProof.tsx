const trustItems = [
  { label: "18.000+ Kunden", icon: "users" },
  { label: "4.9/5 Bewertung", icon: "stars", rating: true },
  { label: "Deutschlandweit genutzt", icon: "map" },
  { label: "Sofortige Aktivierung", icon: "flash" },
  { label: "Stabiler Streaming-Zugang", icon: "shield" },
] as const;

function TrustIcon({ icon }: { icon: (typeof trustItems)[number]["icon"] }) {
  const iconClass = "h-7 w-7 text-[#A6FF00]";

  if (icon === "users") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8.8 11.2a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.8 19.5c.7-3.1 2.5-5 5-5s4.3 1.9 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M15.2 10.7a2.8 2.8 0 1 0 0-5.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M15.7 14.5c2.2.4 3.7 2 4.3 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "stars") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m12 3.4 2.2 5 5.3.5-4 3.5 1.2 5.2L12 14.9l-4.7 2.7 1.2-5.2-4-3.5 5.3-.5L12 3.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "map") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m4 6.8 5-2 6 2 5-2v12.4l-5 2-6-2-5 2V6.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9 4.8v12.4M15 6.8v12.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "flash") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13.6 3.5 5.8 13h5.5l-1 7.5 7.9-9.5h-5.5l.9-7.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 19 6v5.4c0 4.2-2.7 7.5-7 9.1-4.3-1.6-7-4.9-7-9.1V6l7-2.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m8.8 12.1 2.1 2.1 4.4-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SocialProof() {
  return (
    <section className="relative isolate overflow-hidden bg-[#000000] px-5 py-14 sm:px-8 sm:py-16 lg:px-0 lg:py-[4.5rem]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(54,92,18,0.14),transparent_32rem)]" />
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="text-balance text-[2rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.75rem] lg:text-[3.15rem]">
            Vertrauen, das{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              IPTV Kaufen
            </span>{" "}
            einfach macht
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Premium Streaming für Deutschland mit schneller Aktivierung, stabiler Nutzung und klarer Erfahrung.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-2 gap-3 sm:mt-10 lg:grid-cols-5 lg:gap-4">
          {trustItems.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-[#1F1F1F]/85 bg-[#0A0A0A]/78 px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-300 hover:border-[#A6FF00]/35 lg:py-5"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#A6FF00]/8">
                <TrustIcon icon={item.icon} />
              </div>
              <h3 className="mt-3 text-[13px] font-semibold text-[#F5F5F5] sm:text-sm">{item.label}</h3>
              {"rating" in item ? (
                <p className="mt-2 text-[13px] leading-none tracking-[0.12em] text-[#A6FF00]" aria-label="4.9 von 5 Sternen">
                  ★★★★★
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
