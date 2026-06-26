import type { Metadata } from "next";
import AnchorRedirect from "@/components/AnchorRedirect";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "IPTV Preise | iptvkaufenX",
  description:
    "IPTV Pakete ab 9,99 € – flexible Laufzeiten, über 22.000 Sender, Filme und Sport in HD & 4K.",
  path: "/preise",
  noIndex: true,
});

export default function PreisePage() {
  return (
    <AnchorRedirect
      href="/#preise"
      title="IPTV Preise"
      description="Sie werden zu unseren IPTV Paketen auf der Startseite weitergeleitet."
      linkLabel="Zu den Preisen"
    />
  );
}
