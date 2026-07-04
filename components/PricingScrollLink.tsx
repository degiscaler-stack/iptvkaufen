"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { isHomePricingScrollPath, scrollToPricing } from "@/lib/scroll-to-pricing";

type PricingScrollLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  buttonLocation: string;
  pagePath?: string;
  onNavigate?: () => void;
};

export default function PricingScrollLink({
  buttonLocation,
  pagePath,
  onNavigate,
  children,
  ...props
}: PricingScrollLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(ANALYTICS_EVENTS.pricingScrollClick, {
      button_location: buttonLocation,
      page_path: pagePath ?? pathname,
    });

    onNavigate?.();

    if (isHomePricingScrollPath(pathname)) {
      event.preventDefault();

      if (!scrollToPricing()) {
        window.location.href = "/#preise";
      }
    }
  };

  return (
    <Link href="/#preise" onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
