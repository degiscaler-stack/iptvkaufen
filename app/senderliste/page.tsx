import Image from "next/image";
import type { Metadata } from "next";
import SenderlisteExplorer from "@/components/SenderlisteExplorer";
import SenderlisteSeoContent from "@/components/SenderlisteSeoContent";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";

const SENDERLISTE_DESCRIPTION =
  "IPTV Senderliste mit deutschen & internationalen Kanälen, Sport, Filmen und Serien. IPTV Kanäle durchsuchen – regelmäßig aktualisiert bei iptvkaufenX.";

const SENDERLISTE_FAQ = [
  {
    question: "Was steht in der IPTV Senderliste?",
    answer:
      "Die IPTV Senderliste zeigt verfügbare Live-TV-Kanäle und Themenkategorien – von deutschen Programmen über internationale IPTV Sender bis zu Sport, Filmen und Serien.",
  },
  {
    question: "Werden deutsche und internationale Sender angeboten?",
    answer:
      "Ja. Deutsche IPTV Sender gehören zum Kernangebot; ergänzend finden Sie internationale IPTV Sender aus vielen Ländern. Prüfen Sie gewünschte Kanäle direkt in der Suche.",
  },
  {
    question: "Wie oft wird die Senderliste aktualisiert?",
    answer:
      "Die Liste wird regelmäßig gepflegt. Neue Kanäle, geänderte Bezeichnungen und thematische IPTV Kategorien fließen laufend ein.",
  },
  {
    question: "Auf welchen Geräten kann ich die Sender nutzen?",
    answer:
      "Die Kanäle lassen sich auf Smart TV, Fire TV, Android TV, Smartphone, Tablet und PC streamen – je nach App und Paket.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.senderliste,
  description: SENDERLISTE_DESCRIPTION,
  path: "/senderliste",
  image: "/images/iptv-kaufen-senderliste-hero.webp",
  imageAlt: "IPTV Senderliste – deutsche und internationale Kanäle bei iptvkaufenX",
});

const structuredData = [
  buildWebPageSchema({
    title: SEO_TITLES.senderliste,
    description: SENDERLISTE_DESCRIPTION,
    path: "/senderliste",
  }),
  buildBreadcrumbSchema([
    { name: "Startseite", path: "/" },
    { name: "IPTV Senderliste", path: "/senderliste" },
  ]),
  buildFaqSchema(SENDERLISTE_FAQ),
].filter(Boolean);

export default function SenderlistePage() {
  return (
    <main className="min-h-screen bg-[#000000] text-[#F5F5F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section
        aria-labelledby="senderliste-heading"
        className="relative isolate flex min-h-[496px] items-center justify-center overflow-hidden px-5 pb-12 pt-28 text-center sm:px-8 sm:pt-28 lg:min-h-[576px] lg:px-0 lg:pt-32"
      >
        <Image
          src="/images/iptv-kaufen-senderliste-hero.webp"
          alt="IPTV Senderliste mit Live-TV Kanälen, Sport und Filmen in Deutschland"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="scale-110 object-cover object-[center_38%] opacity-[0.42] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.66)_42%,rgba(0,0,0,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_82%,rgba(166,255,0,0.24),transparent_31rem)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,#000000_0%,rgba(166,255,0,0.14)_34%,transparent_100%)]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-28 w-[min(860px,90vw)] -translate-x-1/2 rounded-full bg-[#A6FF00]/18 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[980px]">
          <p className="mb-4 inline-flex rounded-full border border-[#A6FF00]/32 bg-[#111111]/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:text-[11px]">
            IPTV SENDERLISTE DEUTSCHLAND
          </p>
          <h1
            id="senderliste-heading"
            className="text-balance text-[2.1rem] font-black leading-[1.04] tracking-[-0.05em] text-[#F5F5F5] [text-shadow:0_2px_16px_rgba(0,0,0,0.58)] sm:text-[3.1rem] lg:text-[4.2rem]"
          >
            IPTV Senderliste – Deutsche &amp; Internationale Kanäle
          </h1>
          <p className="mx-auto mt-4 max-w-[840px] text-[15px] leading-7 text-[#F5F5F5]/88 [text-shadow:0_2px_14px_rgba(0,0,0,0.55)] sm:mt-5 sm:text-[17px] sm:leading-8">
            Durchsuchen Sie IPTV Kanäle, deutsche und internationale IPTV Sender, Sportsender,
            Filmsender sowie Serien – regelmäßig aktualisiert und klar nach IPTV Kategorien
            sortiert.
          </p>
        </div>
      </section>

      <SenderlisteExplorer />
      <SenderlisteSeoContent />
    </main>
  );
}
