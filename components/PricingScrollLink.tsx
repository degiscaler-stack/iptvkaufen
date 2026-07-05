"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { isHomePackageScrollPath, scrollToPackages } from "@/lib/scroll-to-pricing";

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
      destination: "pakete-start",
      page_path: pagePath ?? pathname,
    });

    onNavigate?.();

    if (isHomePackageScrollPath(pathname)) {
      event.preventDefault();

      if (!scrollToPackages()) {
        window.location.href = "/#pakete-start";
      }
    }
  };

  return (
    <Link href="/#pakete-start" onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
