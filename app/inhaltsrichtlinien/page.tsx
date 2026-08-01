import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildPageMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.inhaltsrichtlinien,
  description:
    "Inhaltsrichtlinien von iptvkaufenX: Genauigkeit, erlaubte Aussagen und Hinweise zur sicheren Nutzung.",
  path: "/inhaltsrichtlinien",
});

const sections: LegalSection[] = [
  {
    title: "Welche Inhalte wir veröffentlichen",
    paragraphs: [
      "Auf iptvkaufenx.de veröffentlichen wir Informationen zum digitalen IPTV-Service von iptvkaufenX sowie redaktionelle Beiträge im [Blog](/blog). Dazu gehören Produktseiten (unter anderem [Preise](/preise) und [Senderliste](/senderliste)), Support- und Kontaktinformationen sowie rechtliche Hinweise wie [Impressum](/impressum), Datenschutz und Nutzungsbedingungen.",
      "Blog-Themen decken unter anderem IPTV in Deutschland, Anbieter und Abonnements, Geräte und Apps, Einrichtung, Tests, Premium-Qualität und Senderlisten ab. Autorin der Beiträge ist die [iptvkaufenX Redaktion](/autor).",
    ],
  },
  {
    title: "Genauigkeitsstandards",
    paragraphs: [
      "Inhalte werden mit Sorgfalt erstellt und regelmäßig geprüft. Leistungsangaben zum Service – etwa über 22.000 Sender, HD/4K, Filme, Serien und Sport, Nutzung auf zwei Geräten, 24-Stunden-Test für 3 € sowie 30-Tage-Geld-zurück-Garantie – orientieren sich an den auf der Website ausgewiesenen Informationen.",
      "Technische Tipps in Blog-Beiträgen beschreiben typische Setups und Vorgehensweisen. Die tatsächliche Funktion hängt von Gerät, App, Internetverbindung und korrekter Einrichtung ab.",
    ],
  },
  {
    title: "Keine erfundenen Angaben",
    paragraphs: [
      "Wir erfinden keine Firmenadresse, Rechtsform, Erfahrungsjahre, Auszeichnungen, Zertifikate oder Mitarbeiternamen. Wo solche Angaben fehlen, bleiben sie bewusst ungenannt.",
      "Soziale Kanäle (Facebook, Instagram, TikTok, X, Pinterest und YouTube), die auf der Website als Kontaktwege veröffentlicht sind, werden als solche genannt – ohne darüber hinausgehende Eigentums- oder Partnerschaftsbehauptungen.",
    ],
  },
  {
    title: "Hinweise zur sicheren Nutzung",
    paragraphs: [
      "Schützen Sie Zugangsdaten und geben Sie sie nicht unbefugt weiter. Nutzen Sie den Dienst nur im Rahmen des gewählten Pakets und der [Nutzungsbedingungen](/nutzungsbedingungen).",
      "Prüfen Sie vor einer längeren Buchung idealerweise den 24-Stunden-Test und die für Sie relevanten Sender. Bei Problemen wenden Sie sich an den Support über [Kontakt](/kontakt), WhatsApp (+44 7832 620735) oder die E-Mail-Adressen support@iptvkaufenx.de und contact@iptvkaufenx.de.",
    ],
  },
  {
    title: "Redaktionelle Einordnung",
    paragraphs: [
      "Wie Inhalte entstehen, geprüft und korrigiert werden und wie wir die kommerzielle Absicht (Verkauf von IPTV) offenlegen, ist in den [redaktionellen Richtlinien](/redaktionelle-richtlinien) beschrieben.",
    ],
  },
  {
    title: "Verwandte Seiten",
    items: [
      "[Redaktionelle Richtlinien](/redaktionelle-richtlinien)",
      "[Autor](/autor) – iptvkaufenX Redaktion",
      "[Blog](/blog)",
      "[Über uns](/ueber-uns)",
    ],
  },
];

const breadcrumbItems = [
  { name: "Startseite", path: "/" },
  { name: "Inhaltsrichtlinien", path: "/inhaltsrichtlinien" },
];

export default function InhaltsrichtlinienPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      <LegalPage
        eyebrow="Inhalte"
        title="Inhaltsrichtlinien"
        updatedAt="11. Juli 2026"
        intro="Diese Inhaltsrichtlinien legen fest, welche Angaben iptvkaufenX veröffentlicht, wie Genauigkeit angestrebt wird und worauf Nutzer achten sollten."
        sections={sections}
      />
    </>
  );
}
