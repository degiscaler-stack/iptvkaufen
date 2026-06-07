const steps = [
  {
    number: "01",
    icon: "order",
    title: "Paket auswählen",
    text: "Wählen Sie das passende IPTV Paket und schließen Sie Ihre Bestellung sicher ab.",
  },
  {
    number: "02",
    icon: "access",
    title: "Zugang erhalten",
    text: "Ihre Zugangsdaten werden nach der Bestellung schnell bereitgestellt.",
  },
  {
    number: "03",
    icon: "stream",
    title: "Sofort streamen",
    text: "Starten Sie IPTV auf Smart TV, Smartphone, Tablet, PC oder TV Box.",
  },
] as const;

function StepIcon({ icon }: { icon: (typeof steps)[number]["icon"] }) {
  const iconClass = "h-8 w-8 text-[#AFFF00] sm:h-9 sm:w-9";

  if (icon === "order") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6.2 8.2h12.1l-1 10.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6.2 8.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 8.2a3 3 0 0 1 6 0M8.1 11.8h8.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m10.2 15 1.3 1.3 3.1-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "access") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="16" height="11" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="m5.2 9.4 5.4 4a2.4 2.4 0 0 0 2.8 0l5.4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 6.7a3.2 3.2 0 0 0-6.1 1.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17.4 5.5h2.1v2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.8" y="5.2" width="16.4" height="11.2" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.8 8.7v4.2l3.8-2.1-3.8-2.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 19.5h6M12 16.4v3.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function IptvHowItWorks() {
  return (
    <section
      id="so-funktioniert-es"
      aria-labelledby="iptv-how-it-works-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-12 sm:px-8 sm:py-16 lg:px-0 lg:py-[4.5rem]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(166,255,0,0.08),transparent_32rem)]" />
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mb-4 sm:text-[11px]">
            SO FUNKTIONIERT ES
          </p>
          <h2
            id="iptv-how-it-works-heading"
            className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.65rem] lg:text-[3rem]"
          >
            IPTV Kaufen in{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              3 einfachen Schritten
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[720px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Wählen Sie Ihr Paket, erhalten Sie Ihre Zugangsdaten und genießen Sie IPTV auf Ihrem bevorzugten Gerät.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-[1120px] justify-items-center gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {steps.map((step) => (
            <article
              key={step.number}
              className="group relative mx-auto h-full w-[calc(100vw-48px)] max-w-[340px] rounded-[22px] bg-[linear-gradient(135deg,rgba(175,255,0,0.46)_0%,rgba(125,255,0,0.36)_100%)] p-px shadow-[0_14px_34px_rgba(0,0,0,0.34)] transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(175,255,0,0.12),0_20px_46px_rgba(0,0,0,0.38)] sm:w-full sm:max-w-none"
            >
              <div className="relative flex h-full min-h-[232px] flex-col overflow-hidden rounded-[21px] bg-[radial-gradient(circle_at_50%_0%,rgba(175,255,0,0.06),transparent_42%),linear-gradient(155deg,rgba(14,22,11,0.98)_0%,rgba(7,11,8,1)_58%,rgba(3,6,5,1)_100%)] px-6 py-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.065)] sm:min-h-[250px] sm:px-7 sm:py-7">
                <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#AFFF00]/45 to-transparent" />
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#AFFF00]/45 bg-[#AFFF00]/8 text-[11px] font-bold tracking-[-0.02em] text-[#AFFF00] shadow-[0_0_5px_rgba(175,255,0,0.06)]">
                    {step.number}
                  </span>
                  <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#AFFF00]/60 bg-[#AFFF00]/5 shadow-[0_0_5px_rgba(175,255,0,0.06)] transition duration-500 group-hover:border-[#AFFF00]/80 group-hover:bg-[#AFFF00]/8">
                    <StepIcon icon={step.icon} />
                  </div>
                  <span className="h-8 w-8" aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-[1.18rem] font-extrabold leading-tight tracking-[-0.035em] text-[#F5F5F5] sm:text-[1.28rem]">
                  {step.title}
                </h3>
                <div className="mx-auto mt-3 h-px w-14 rounded-full bg-gradient-to-r from-transparent via-[#AFFF00]/90 to-transparent" />
                <p className="mx-auto mt-3 max-w-[275px] text-[14px] font-normal leading-6 text-[#F5F5F5]/82 sm:text-[14.5px]">
                  {step.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
