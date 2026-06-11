import type { ReactNode } from "react";

type DeviceIconProps = {
  className?: string;
};

const iconClass = "h-7 w-7 shrink-0 lg:h-[32px] lg:w-[32px]";

function DeviceSvg({
  children,
  className = iconClass,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="#A6FF00"
      strokeWidth="1.75"
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
      <rect x="4" y="6" width="24" height="16" rx="2" />
      <path d="M11 26h10" />
      <path d="M16 22v4" />
      <circle cx="16" cy="14" r="3" />
    </DeviceSvg>
  );
}

export function AndroidTvIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="4" y="7" width="24" height="15" rx="2" />
      <path d="M12 26h8" />
      <path d="M16 22v4" />
      <path d="M13 14l3-3 3 3" />
      <path d="M16 14v5" />
    </DeviceSvg>
  );
}

export function AndroidIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <path d="M10 14h12" />
      <rect x="8" y="14" width="16" height="10" rx="3" />
      <path d="M11 11v3" />
      <path d="M21 11v3" />
      <circle cx="13" cy="18" r="1" fill="#A6FF00" stroke="none" />
      <circle cx="19" cy="18" r="1" fill="#A6FF00" stroke="none" />
    </DeviceSvg>
  );
}

export function FireTvIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="5" y="8" width="22" height="14" rx="2" />
      <path d="M13 26h6" />
      <path d="M16 22v4" />
      <path d="M16 12c-2 2-2 5 0 7 2-2 2-5 0-7z" />
    </DeviceSvg>
  );
}

export function AppleTvIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="6" y="10" width="20" height="12" rx="2" />
      <path d="M13 26h6" />
      <path d="M16 22v4" />
      <path d="M16 8c-1.5 0-2.5 1-2.5 2.2 0 1.8 2.5 3.3 2.5 3.3s2.5-1.5 2.5-3.3C18.5 9 17.5 8 16 8z" />
    </DeviceSvg>
  );
}

export function WindowsIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="5" y="6" width="10" height="10" />
      <rect x="17" y="6" width="10" height="10" />
      <rect x="5" y="18" width="10" height="10" />
      <rect x="17" y="18" width="10" height="10" />
    </DeviceSvg>
  );
}

export function VlcIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <path d="M16 6l10 20H6L16 6z" />
      <path d="M12 20h8" />
      <path d="M14 16h4" />
    </DeviceSvg>
  );
}

export function MagBoxIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="5" y="11" width="22" height="10" rx="2" />
      <circle cx="10" cy="16" r="1.5" fill="#A6FF00" stroke="none" />
      <path d="M14 16h8" />
      <path d="M8 21h16" />
    </DeviceSvg>
  );
}

export function RokuTvIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="4" y="7" width="24" height="15" rx="2" />
      <path d="M12 26h8" />
      <path d="M16 22v4" />
      <circle cx="11" cy="14.5" r="1" fill="#A6FF00" stroke="none" />
      <circle cx="16" cy="14.5" r="1" fill="#A6FF00" stroke="none" />
      <circle cx="21" cy="14.5" r="1" fill="#A6FF00" stroke="none" />
    </DeviceSvg>
  );
}

export function PlayStationIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="10" y="10" width="12" height="6" rx="2" />
      <path d="M8 18c4-2 8-2 12 0" />
      <path d="M8 22c4 2 8 2 12 0" />
      <circle cx="11" cy="14" r="2" />
      <circle cx="21" cy="14" r="2" />
    </DeviceSvg>
  );
}

export function XboxIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <circle cx="16" cy="16" r="10" />
      <path d="M10 10l12 12" />
      <path d="M22 10 10 22" />
    </DeviceSvg>
  );
}

export function Enigma2Icon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="6" y="12" width="20" height="10" rx="2" />
      <path d="M10 22h12" />
      <path d="M16 6v6" />
      <path d="M12 8l4-2 4 2" />
      <circle cx="11" cy="17" r="1" fill="#A6FF00" stroke="none" />
    </DeviceSvg>
  );
}

export function TvBoxIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="6" y="12" width="20" height="9" rx="2" />
      <path d="M10 21h12" />
      <path d="M14 16h4" />
      <path d="M8 8h3v4H8z" />
      <path d="M21 8h3v4h-3z" />
    </DeviceSvg>
  );
}

export function SmartphoneIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="10" y="4" width="12" height="24" rx="2" />
      <path d="M14 8h4" />
      <circle cx="16" cy="24" r="1" fill="#A6FF00" stroke="none" />
    </DeviceSvg>
  );
}

export function TabletIcon({ className }: DeviceIconProps) {
  return (
    <DeviceSvg className={className}>
      <rect x="7" y="5" width="18" height="22" rx="2" />
      <circle cx="16" cy="24" r="1" fill="#A6FF00" stroke="none" />
      <path d="M12 9h8" />
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
  { id: "smart-tv", label: "Smart TV", alt: "IPTV Kaufen auf Smart TV", Icon: SmartTvIcon },
  { id: "android-tv", label: "Android TV", alt: "IPTV Kaufen auf Android TV", Icon: AndroidTvIcon },
  { id: "android", label: "Android", alt: "IPTV Kaufen auf Android", Icon: AndroidIcon },
  { id: "fire-tv", label: "Fire TV", alt: "IPTV Kaufen auf Fire TV", Icon: FireTvIcon },
  { id: "apple-tv", label: "Apple TV", alt: "IPTV Kaufen auf Apple TV", Icon: AppleTvIcon },
  { id: "windows", label: "Windows", alt: "IPTV Kaufen auf Windows", Icon: WindowsIcon },
  {
    id: "vlc",
    label: "VLC Player",
    alt: "IPTV Kaufen auf VLC Media Player",
    Icon: VlcIcon,
  },
  { id: "mag-box", label: "MAG Box", alt: "IPTV Kaufen auf MAG Box", Icon: MagBoxIcon },
  { id: "roku-tv", label: "Roku TV", alt: "IPTV Kaufen auf Roku TV", Icon: RokuTvIcon },
  {
    id: "playstation",
    label: "PlayStation",
    alt: "IPTV Kaufen auf PlayStation",
    Icon: PlayStationIcon,
  },
  { id: "xbox", label: "Xbox", alt: "IPTV Kaufen auf Xbox", Icon: XboxIcon },
  { id: "enigma2", label: "Enigma2", alt: "IPTV Kaufen auf Enigma2", Icon: Enigma2Icon },
  { id: "tv-box", label: "TV Box", alt: "IPTV Kaufen auf TV Box", Icon: TvBoxIcon },
  {
    id: "smartphone",
    label: "Smartphone",
    alt: "IPTV Kaufen auf Smartphone",
    Icon: SmartphoneIcon,
  },
  { id: "tablet", label: "Tablet", alt: "IPTV Kaufen auf Tablet", Icon: TabletIcon },
];
