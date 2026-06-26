import type { Metadata } from "next";
import AnchorRedirect from "@/components/AnchorRedirect";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "IPTV FAQ | iptvkaufenX",
  description:
    "Antworten auf häufige Fragen zu IPTV Kaufen: Geräte, Aktivierung, Zahlung und Support.",
  path: "/faq",
  noIndex: true,
});

export default function FaqPage() {
  return (
    <AnchorRedirect
      href="/#faq"
      title="Häufig gestellte Fragen"
      description="Sie werden zum FAQ-Bereich auf der Startseite weitergeleitet."
      linkLabel="Zum FAQ"
    />
  );
}
