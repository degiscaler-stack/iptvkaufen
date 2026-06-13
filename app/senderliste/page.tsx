import Image from "next/image";
import type { Metadata } from "next";
import SenderlisteExplorer from "@/components/SenderlisteExplorer";

export const metadata: Metadata = {
  title: "Senderliste IPTV Kaufen | Deutsche & Internationale IPTV Sender",
  description:
    "Entdecken Sie die iptvkaufenX Senderliste mit deutschen, europäischen, internationalen, Sport-, Film-, Serien-, Kinder- und Nachrichtenkanälen.",
};

export default function SenderlistePage() {
  return (
    <main className="min-h-screen bg-[#000000] text-[#F5F5F5]">
      <section
        aria-labelledby="senderliste-heading"
        className="relative isolate flex min-h-[620px] items-center justify-center overflow-hidden px-5 pb-16 pt-32 text-center sm:px-8 sm:pt-36 lg:min-h-[720px] lg:px-0 lg:pt-40"
      >
        <Image
          src="/images/iptv-kaufen-senderliste-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.54)_0%,rgba(0,0,0,0.62)_48%,rgba(0,0,0,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(166,255,0,0.12),transparent_34rem)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#000000] to-transparent" />

        <div className="relative z-10 mx-auto max-w-[980px]">
          <p className="mb-4 inline-flex rounded-full border border-[#A6FF00]/32 bg-[#111111]/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:text-[11px]">
            IPTV Kaufen Senderliste
          </p>
          <h1
            id="senderliste-heading"
            className="text-balance text-[2.45rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.58)] sm:text-[3.65rem] lg:text-[5rem]"
          >
            Senderliste IPTV Kaufen
          </h1>
          <p className="mx-auto mt-5 max-w-[840px] text-[15px] leading-7 text-[#F5F5F5]/88 [text-shadow:0_2px_14px_rgba(0,0,0,0.55)] sm:text-[18px] sm:leading-8">
            Entdecken Sie eine große Auswahl an deutschen, europäischen, internationalen, Sport-, Film-,
            Serien- und Kinderkanälen – optimiert für Ihr IPTV Kaufen Erlebnis.
          </p>
        </div>
      </section>

      <SenderlisteExplorer />
    </main>
  );
}
