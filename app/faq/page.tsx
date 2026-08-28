import type { Metadata } from "next";
import AnchorRedirect from "@/components/AnchorRedirect";
import { buildPageMetadata } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.faq,
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
