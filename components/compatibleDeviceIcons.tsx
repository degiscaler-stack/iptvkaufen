import type { ReactNode } from "react";

type DeviceIconProps = {
  className?: string;
};

const iconClass = "h-[24px] w-[24px] shrink-0 lg:h-7 lg:w-7";

function DeviceSvg({
  children,
  className = iconClass,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="#A6FF00"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function SmartTvIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M8 20h8" />
      <path d="M12 17v3" />
      <path d="M9 9h6" />
      <path d="M9 12h4" />
    </DeviceSvg>
  );
}

export function AndroidTvIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="3" y="4" width="18" height="11" rx="1.5" />
      <path d="M8 19h8" />
      <path d="M12 15v4" />
      <path d="M10 9.5 12 7.5l2 2" />
      <path d="M12 9.5v4.5" />
    </DeviceSvg>
  );
}

export function AndroidIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <path d="M7.5 8.5V6.5" />
      <path d="M16.5 8.5V6.5" />
      <rect x="6" y="8.5" width="12" height="9" rx="3" />
      <circle cx="9.5" cy="12.5" r="1" fill="#A6FF00" stroke="none" />
      <circle cx="14.5" cy="12.5" r="1" fill="#A6FF00" stroke="none" />
      <path d="M10.5 15h3" />
    </DeviceSvg>
  );
}

export function FireTvIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="4" y="5" width="16" height="11" rx="1.5" />
      <path d="M9 19h6" />
      <path d="M12 16v3" />
      <path d="M12 9.5c-1.2 1.2-1.2 3 0 4.2 1.2-1.2 1.2-3 0-4.2z" />
      <path d="M12 11.5v1.5" />
    </DeviceSvg>
  );
}

export function AppleTvIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="5" y="8" width="14" height="8" rx="1.5" />
      <path d="M9 19h6" />
      <path d="M12 16v3" />
      <path d="M12 5.5c-1.2 0-2 .8-2 1.8 0 1.5 2 2.7 2 2.7s2-1.2 2-2.7c0-1-.8-1.8-2-1.8z" />
    </DeviceSvg>
  );
}

export function WindowsIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="4" y="4" width="7" height="7" fill="#A6FF00" stroke="none" />
      <rect x="13" y="4" width="7" height="7" fill="#A6FF00" stroke="none" />
      <rect x="4" y="13" width="7" height="7" fill="#A6FF00" stroke="none" />
      <rect x="13" y="13" width="7" height="7" fill="#A6FF00" stroke="none" />
    </DeviceSvg>
  );
}

export function VlcIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <path d="M12 3 20 20H4L12 3z" />
      <path d="M8.5 17h7" />
      <path d="M10 14h4" />
    </DeviceSvg>
  );
}

export function MagBoxIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="3" y="9" width="18" height="7" rx="1.5" />
      <circle cx="6.5" cy="12.5" r="1" fill="#A6FF00" stroke="none" />
      <path d="M9 12.5h9" />
      <path d="M6 16.5h12" />
    </DeviceSvg>
  );
}

export function RokuTvIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="3" y="4" width="18" height="11" rx="1.5" />
      <path d="M8 19h8" />
      <path d="M12 15v4" />
      <circle cx="9" cy="9.5" r="0.8" fill="#A6FF00" stroke="none" />
      <circle cx="12" cy="9.5" r="0.8" fill="#A6FF00" stroke="none" />
      <circle cx="15" cy="9.5" r="0.8" fill="#A6FF00" stroke="none" />
      <path d="M8.5 12.5h7" />
    </DeviceSvg>
  );
}

export function PlayStationIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <path d="M7 10.5c0-2.2 1.8-4 4-4h2c2.2 0 4 1.8 4 4v3.5c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V10.5z" />
      <path d="M5.5 12.5h2" />
      <path d="M16.5 12.5h2" />
      <circle cx="10" cy="12" r="1.2" />
      <circle cx="14" cy="12" r="1.2" />
      <path d="M10.5 14.5h3" />
    </DeviceSvg>
  );
}

export function XboxIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <path d="M7 10.5c0-2.2 1.8-4 4-4h2c2.2 0 4 1.8 4 4v3.5c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V10.5z" />
      <path d="M5.5 12.5h2" />
      <path d="M16.5 12.5h2" />
      <path d="M10.5 11l3 3" />
      <path d="M13.5 11l-3 3" />
    </DeviceSvg>
  );
}

export function Enigma2Icon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="5" y="13" width="14" height="6" rx="1.5" />
      <path d="M12 4v4" />
      <path d="M8.5 6.5 12 4l3.5 2.5" />
      <ellipse cx="12" cy="8" rx="5" ry="2" />
      <circle cx="8" cy="16" r="0.8" fill="#A6FF00" stroke="none" />
    </DeviceSvg>
  );
}

export function TvBoxIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="5" y="10" width="14" height="7" rx="1.5" />
      <path d="M8 17h8" />
      <path d="M7 7h2v3H7z" />
      <path d="M15 7h2v3h-2z" />
      <path d="M10.5 13h3" />
    </DeviceSvg>
  );
}

export function SmartphoneIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="7.5" y="3" width="9" height="18" rx="2" />
      <path d="M10.5 6h3" />
      <circle cx="12" cy="18.5" r="0.8" fill="#A6FF00" stroke="none" />
    </DeviceSvg>
  );
}

export function TabletIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="12" cy="17" r="0.8" fill="#A6FF00" stroke="none" />
      <path d="M8 8.5h8" />
      <path d="M8 11h5" />
    </DeviceSvg>
  );
}

export type CompatibleDeviceItem = {
  id: string;
  label: string;
  alt: string;
  Icon: (props: DeviceIconProps) => ReactNode;
};

export const compatibleDeviceItems: CompatibleDeviceItem[] = [
  { id: "smart-tv", label: "Smart TV", alt: "IPTV auf Smart TV nutzen", Icon: SmartTvIcon },
  { id: "android-tv", label: "Android TV", alt: "IPTV auf Android TV nutzen", Icon: AndroidTvIcon },
  { id: "android", label: "Android", alt: "IPTV auf Android nutzen", Icon: AndroidIcon },
  { id: "fire-tv", label: "Fire TV", alt: "IPTV auf Fire TV nutzen", Icon: FireTvIcon },
  { id: "apple-tv", label: "Apple TV", alt: "IPTV auf Apple TV nutzen", Icon: AppleTvIcon },
  { id: "windows", label: "Windows", alt: "IPTV auf Windows nutzen", Icon: WindowsIcon },
  {
    id: "vlc",
    label: "VLC Player",
    alt: "IPTV auf VLC Media Player nutzen",
    Icon: VlcIcon,
  },
  { id: "mag-box", label: "MAG Box", alt: "IPTV auf MAG Box nutzen", Icon: MagBoxIcon },
  { id: "roku-tv", label: "Roku TV", alt: "IPTV auf Roku TV nutzen", Icon: RokuTvIcon },
  {
    id: "playstation",
    label: "PlayStation",
    alt: "IPTV auf PlayStation nutzen",
    Icon: PlayStationIcon,
  },
  { id: "xbox", label: "Xbox", alt: "IPTV auf Xbox nutzen", Icon: XboxIcon },
  { id: "enigma2", label: "Enigma2", alt: "IPTV auf Enigma2 nutzen", Icon: Enigma2Icon },
  { id: "tv-box", label: "TV Box", alt: "IPTV auf TV Box nutzen", Icon: TvBoxIcon },
  {
    id: "smartphone",
    label: "Smartphone",
    alt: "IPTV auf Smartphone nutzen",
    Icon: SmartphoneIcon,
  },
  { id: "tablet", label: "Tablet", alt: "IPTV auf Tablet nutzen", Icon: TabletIcon },
];
