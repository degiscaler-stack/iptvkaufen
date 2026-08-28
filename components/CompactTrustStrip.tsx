const trustPoints = [
  "Schnelle Aktivierung",
  "Sichere Zahlung",
  "Deutschsprachiger Support",
  "30 Tage Geld-zurück-Garantie",
] as const;

export default function CompactTrustStrip() {
  return (
    <section
      aria-label="Vertrauensmerkmale"
      className="relative isolate bg-[#000000] px-5 pb-2 pt-1 sm:px-8 sm:pb-3 lg:px-0"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[1240px] rounded-[18px] border border-[#A6FF00]/16 bg-[#0A0F0A]/78 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:px-4 sm:py-3">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full border border-[#1F1F1F]/90 bg-[#090909]/70 px-2.5 py-2 text-center text-[10.5px] font-semibold leading-tight text-[#F5F5F5]/90 sm:min-h-[3rem] sm:px-3 sm:text-[11.5px]"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00] shadow-[0_0_6px_rgba(166,255,0,0.35)]"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
