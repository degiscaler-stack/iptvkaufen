"use client";

import type { CSSProperties } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { TrackedAnchor } from "@/components/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { ctaMotionFeaturedClass, ctaMotionStandardClass, ctaSolidGreenClass } from "@/lib/cta-motion";
import {
  getResellerWhatsAppUrl,
  RESELLER_PACKAGE_FEATURES,
  RESELLER_PACKAGES,
  type ResellerPackage,
} from "@/lib/reseller";

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-[#A6FF00]" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="m4.5 10.3 3.3 3.2 7.7-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const packageCtaBaseClass = `${ctaSolidGreenClass} ${ctaMotionStandardClass} mx-auto mt-auto inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#A6FF00] px-4 py-2.5 text-center text-[11px] font-extrabold uppercase tracking-[0.08em] hover:bg-[#B8FF4D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]`;

const packageCtaFeaturedClass = `${ctaSolidGreenClass} ${ctaMotionFeaturedClass} mx-auto mt-auto inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#A6FF00] px-4 py-2.5 text-center text-[11px] font-extrabold uppercase tracking-[0.08em] hover:bg-[#B8FF4D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]`;

const motionDelays: Record<ResellerPackage["id"], string> = {
  starter: "-0.3s",
  business: "-0.6s",
  professional: "-0.9s",
};

export default function ResellerPackageCards() {
  return (
    <div className="mx-auto mt-8 grid w-full max-w-[1180px] grid-cols-1 gap-5 sm:mt-10 lg:grid-cols-3 lg:gap-6 lg:items-stretch">
      {RESELLER_PACKAGES.map((pkg) => (
        <article
          key={pkg.id}
          id={`reseller-paket-${pkg.id}`}
          className={
            pkg.highlighted
              ? "relative flex h-full flex-col rounded-[24px] border border-[#A6FF00]/70 bg-[linear-gradient(165deg,rgba(18,28,12,0.98)_0%,rgba(8,12,8,1)_100%)] p-5 shadow-[0_0_28px_rgba(166,255,0,0.14),0_18px_40px_rgba(0,0,0,0.4)] sm:p-6"
              : "relative flex h-full flex-col rounded-[24px] border border-[#1F1F1F] bg-[#0A0F0A] p-5 shadow-[0_14px_34px_rgba(0,0,0,0.34)] sm:p-6"
          }
        >
          {pkg.badge ? (
            <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 inline-flex rounded-full border border-[#A6FF00]/50 bg-[#A6FF00] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#050505] shadow-[0_0_16px_rgba(166,255,0,0.35)]">
              {pkg.badge}
            </span>
          ) : null}

          <div className="flex flex-1 flex-col text-center">
            <h3 className="text-[1.35rem] font-extrabold tracking-[-0.03em] text-[#F5F5F5] sm:text-[1.45rem]">
              {pkg.name}
            </h3>

            <p
              className={
                pkg.highlighted
                  ? "mt-4 text-[2.55rem] font-semibold leading-none tracking-[-0.05em] text-[#A6FF00] sm:text-[2.75rem]"
                  : "mt-4 text-[2.35rem] font-semibold leading-none tracking-[-0.045em] text-[#F5F5F5] sm:text-[2.55rem]"
              }
            >
              {pkg.priceLabel}
            </p>

            <p className="mt-3 text-[15px] font-semibold text-[#A6FF00]">{pkg.creditsLabel}</p>
            <p className="mt-1.5 text-[13px] font-medium text-[#F5F5F5]/80 sm:text-[14px]">
              {pkg.description}
            </p>

            <ul className="mx-auto mb-6 mt-5 w-full max-w-[260px] space-y-2 text-left text-[13px] leading-snug text-[#F5F5F5]/88 sm:mt-6 sm:space-y-2.5">
              {RESELLER_PACKAGE_FEATURES.map((feature) => (
                <li key={feature} className="grid grid-cols-[15px_1fr] items-center gap-2.5">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <TrackedAnchor
              href={getResellerWhatsAppUrl(pkg.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              analyticsEvent={ANALYTICS_EVENTS.whatsappClick}
              analyticsParams={{
                source: "reseller_package",
                package_name: pkg.name,
                package_id: pkg.id,
                credits: pkg.credits,
                price: pkg.priceEuro,
                currency: "EUR",
                page_path: "/reseller",
                button_location: "reseller_package_card",
              }}
              data-analytics="whatsapp_click"
              data-analytics-source="reseller_package"
              data-package={pkg.id}
              className={pkg.highlighted ? packageCtaFeaturedClass : packageCtaBaseClass}
              style={{ "--cta-motion-delay": motionDelays[pkg.id] } as CSSProperties}
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              {pkg.buttonLabel}
            </TrackedAnchor>
          </div>
        </article>
      ))}
    </div>
  );
}
