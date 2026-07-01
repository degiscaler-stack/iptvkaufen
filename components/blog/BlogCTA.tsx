import Link from "next/link";
import type { CSSProperties } from "react";
import { CTA_MOTION_DELAYS, ctaMotionStandardClass } from "@/lib/cta-motion";

export default function BlogCTA() {
  return (
    <section
      aria-labelledby="blog-cta-heading"
      className="relative overflow-hidden rounded-[28px] border border-[#A6FF00]/22 bg-[radial-gradient(circle_at_80%_0%,rgba(166,255,0,0.14),transparent_42%),linear-gradient(135deg,#0A1008_0%,#050806_100%)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.34)] sm:p-8 lg:p-10"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#A6FF00]/8 blur-3xl" aria-hidden="true" />
      <div className="relative max-w-[640px]">
        <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
          Premium IPTV
        </p>
        <h2
          id="blog-cta-heading"
          className="text-balance text-[1.65rem] font-black leading-[1.05] tracking-[-0.04em] text-[#F5F5F5] sm:text-[2rem]"
        >
          Bereit für über 22.000 Sender in HD &amp; 4K?
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-[#E6E6E6]/82">
          Starten Sie jetzt mit iptvkaufenX – sofort aktiviert, stabil auf allen Geräten und mit
          persönlichem Support bei der Einrichtung.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/"
            className={`${ctaMotionStandardClass} inline-flex w-fit items-center justify-center rounded-full bg-[#A6FF00] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.12em] !text-[#000000] hover:bg-[#C7FF62] hover:!text-[#000000] focus:!text-[#000000] focus-visible:!text-[#000000] active:!text-[#000000] visited:!text-[#000000] [&_svg]:!text-[#000000]`}
            style={{ "--cta-motion-delay": CTA_MOTION_DELAYS.blogPrimary } as CSSProperties}
          >
            Jetzt IPTV kaufen
          </Link>
          <Link
            href="/#preise"
            className={`${ctaMotionStandardClass} inline-flex w-fit items-center justify-center rounded-full border border-[#A6FF00]/30 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#A6FF00] transition-[background-color,border-color,color] duration-300 hover:border-[#A6FF00]/60 hover:bg-[#A6FF00]/8 hover:text-[#C7FF62]`}
            style={{ "--cta-motion-delay": CTA_MOTION_DELAYS.blogPricing } as CSSProperties}
          >
            Preise ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
