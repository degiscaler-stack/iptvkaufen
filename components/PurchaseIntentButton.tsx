"use client";

import type { CSSProperties, ReactNode } from "react";
import { ANALYTICS_EVENTS, trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import {
  dispatchSupportPurchaseIntent,
  type SupportPurchaseIntentDetail,
} from "@/lib/support-chat";

type PurchaseIntentButtonProps = {
  intent: SupportPurchaseIntentDetail;
  analyticsEvent: AnalyticsEventName;
  analyticsParams?: Record<string, string | number | boolean>;
  alsoTrackSelectItem?: boolean;
  alsoTrackTrial?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  disabled?: boolean;
  "data-analytics"?: string;
  "data-package"?: string;
  "data-devices"?: number;
};

export default function PurchaseIntentButton({
  intent,
  analyticsEvent,
  analyticsParams,
  alsoTrackSelectItem = false,
  alsoTrackTrial = false,
  className,
  style,
  children,
  disabled,
  ...dataAttrs
}: PurchaseIntentButtonProps) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      disabled={disabled}
      {...dataAttrs}
      onClick={() => {
        trackEvent(analyticsEvent, analyticsParams);

        if (alsoTrackSelectItem) {
          trackEvent(ANALYTICS_EVENTS.selectItem, analyticsParams);
        }

        if (alsoTrackTrial) {
          trackEvent(ANALYTICS_EVENTS.trialClick, analyticsParams);
        }

        dispatchSupportPurchaseIntent(intent);
      }}
    >
      {children}
    </button>
  );
}
