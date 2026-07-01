"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = Omit<ComponentProps<typeof Link>, "onClick"> & {
  analyticsEvent: AnalyticsEventName;
  analyticsParams?: Record<string, string | number | boolean>;
  children: ReactNode;
};

export default function TrackedLink({
  analyticsEvent,
  analyticsParams,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(analyticsEvent, analyticsParams);
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}

type TrackedAnchorProps = Omit<ComponentProps<"a">, "onClick"> & {
  analyticsEvent: AnalyticsEventName;
  analyticsParams?: Record<string, string | number | boolean>;
  alsoTrackCheckout?: boolean;
  children: ReactNode;
};

export function TrackedAnchor({
  analyticsEvent,
  analyticsParams,
  alsoTrackCheckout = false,
  children,
  ...props
}: TrackedAnchorProps) {
  const handleClick = (_event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(analyticsEvent, analyticsParams);

    if (alsoTrackCheckout) {
      trackEvent("checkout_open", {
        source: analyticsEvent,
        ...(analyticsParams ?? {}),
      });
    }
  };

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
