"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { trackEvent, ANALYTICS_EVENTS, type AnalyticsEventName } from "@/lib/analytics";

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
  alsoTrackSelectItem?: boolean;
  alsoTrackTrial?: boolean;
  children: ReactNode;
};

export function TrackedAnchor({
  analyticsEvent,
  analyticsParams,
  alsoTrackCheckout = false,
  alsoTrackSelectItem = false,
  alsoTrackTrial = false,
  children,
  ...props
}: TrackedAnchorProps) {
  const handleClick = (_event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(analyticsEvent, analyticsParams);

    if (alsoTrackSelectItem) {
      trackEvent(ANALYTICS_EVENTS.selectItem, analyticsParams);
    }

    if (alsoTrackTrial) {
      trackEvent(ANALYTICS_EVENTS.trialClick, analyticsParams);
    }

    if (alsoTrackCheckout) {
      const checkoutParams = {
        source: analyticsEvent,
        ...(analyticsParams ?? {}),
      };

      trackEvent(ANALYTICS_EVENTS.beginCheckout, checkoutParams);
      trackEvent(ANALYTICS_EVENTS.checkoutOpen, checkoutParams);
    }
  };

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
