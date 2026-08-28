import Link from "next/link";
import { CONTEXTUAL_LINK_CLASS } from "@/lib/blog/inline-content";

export const HOME_SEO_FAQ = [
  {
    question: "Was erklärt iptvkaufenX zu IPTV?",
    answer:
      "iptvkaufenX veröffentlicht technische und redaktionelle Informationen zu IPTV in Deutschland: Protokolle, Playlisten, Player-Apps, Geräte und typische Einrichtungsfehler. Die Website verkauft keine IPTV-Zugänge und stellt keine Senderlisten bereit.",
  },
  {
    question: "Welche Geräte und Apps sind für IPTV relevant?",
    answer:
      "IPTV-Player laufen typischerweise auf Smart TV, Fire TV, Android TV, Apple TV sowie Smartphone und Tablet. Häufig genutzte Apps sind IPTV Smarters Pro und TiviMate; Playlisten werden oft als M3U oder M3U8 eingebunden.",
  },
  {
    question: "Wo finde ich weiterführende Anleitungen?",
    answer:
      "Im Blog finden Sie Ratgeber zu M3U, Playern, Receivern und Fehlerbehebung. Allgemeine Fragen beantwortet die FAQ; redaktionelle Hinweise nehmen wir über die Kontaktseite entgegen.",
  },
];

const cards = [
  {
    id: "iptv-technik-deutschland",
    eyebrow: "TECHNIK",
    title: (
      <>
        IPTV als{" "}
        <span className="text-[#A6FF00]">Übertragungsweg</span>
      </>
    ),
    paragraphs: [
      <>
        IPTV bedeutet Fernsehen über das Internet Protocol – also über eine Internetleitung statt
        über klassischen Kabel- oder Satellitenempfang. Entscheidend sind Leitung, Player und die
        Art der Playlist, nicht ein bestimmtes Programmpaket.
      </>,
      <>
        Für Haushalte in Deutschland zählen vor allem Stabilität zur Hauptsendezeit, nachvollziehbare
        Technik und eine App, die M3U oder vergleichbare Zugangsdaten korrekt verarbeitet.
      </>,
      <>
        Technische Hintergründe zu Servern und Stream-Qualität erklärt der{" "}
        <Link href="/blog/iptv-provider" className={CONTEXTUAL_LINK_CLASS}>
          IPTV-Provider-Ratgeber
        </Link>
        .
      </>,
    ],
  },
  {
    id: "iptv-apps-playlisten",
    eyebrow: "APPS & PLAYLISTEN",
    title: (
      <>
        Player, M3U und{" "}
        <span className="text-[#A6FF00]">Einrichtung</span>
      </>
    ),
    paragraphs: [
      <>
        Ein IPTV-Player ist die Oberfläche, mit der eine Playlist abgespielt wird. Die Playlist
        selbst – oft als{" "}
        <Link href="/blog/iptv-m3u" className={CONTEXTUAL_LINK_CLASS}>
          M3U oder M3U8
        </Link>{" "}
        – beschreibt nur Stream-Adressen, Kategorien und optional EPG-Daten.
      </>,
      <>
        Als Einstiegsplayer eignet sich häufig{" "}
        <Link href="/blog/iptv-smarters-pro" className={CONTEXTUAL_LINK_CLASS}>
          IPTV Smarters Pro
        </Link>
        . Wer auf Android TV Feintuning sucht, greift oft zu{" "}
        <Link href="/blog/tivimate-iptv" className={CONTEXTUAL_LINK_CLASS}>
          TiviMate
        </Link>
        . Der{" "}
        <Link href="/blog/iptv-player" className={CONTEXTUAL_LINK_CLASS}>
          Player-Vergleich
        </Link>{" "}
        ordnet die Unterschiede ein.
      </>,
      <>
        Login-Fehler entstehen meist durch falsche Server-URL, veraltete App-Version oder instabile
        Leitung. Kurze Antworten stehen in den{" "}
        <Link href="/#faq" className={CONTEXTUAL_LINK_CLASS}>
          FAQ
        </Link>
        .
      </>,
    ],
  },
  {
    id: "iptv-geraete",
    eyebrow: "GERÄTE",
    title: (
      <>
        IPTV auf{" "}
        <span className="text-[#A6FF00]">typischen Geräten</span>
      </>
    ),
    paragraphs: [
      <>
        Die meisten Setups starten auf dem Smart TV – etwa Samsung oder LG – oder nutzen Fire TV und
        Android TV im Wohnzimmer. Apple TV, Smartphone und Tablet eignen sich als Zweitgerät. Wichtig
        sind eine stabile Verbindung und eine passende App.
      </>,
      <>
        Ältere Fernseher ohne brauchbare Smart-Oberfläche profitieren oft von einer{" "}
        <Link href="/blog/iptv-box" className={CONTEXTUAL_LINK_CLASS}>
          IPTV Box
        </Link>{" "}
        oder einem{" "}
        <Link href="/blog/iptv-receiver" className={CONTEXTUAL_LINK_CLASS}>
          IPTV Receiver
        </Link>
        . Im Wohnzimmer lohnt LAN statt schwachem WLAN, besonders bei 4K-Bitraten.
      </>,
      <>
        Weitere Gerätehinweise und App-Guides finden Sie im{" "}
        <Link href="/blog" className={CONTEXTUAL_LINK_CLASS}>
          IPTV Blog
        </Link>
        .
      </>,
    ],
  },
  {
    id: "hinweis-kein-zugang",
    eyebrow: "HINWEIS",
    title: (
      <>
        Kein Verkauf von{" "}
        <span className="text-[#A6FF00]">Zugängen</span>
      </>
    ),
    paragraphs: [
      <>
        iptvkaufenX veröffentlicht Informationen zur IPTV-Technik. Diese Website verkauft keine
        Abonnements, stellt keine Senderkataloge bereit und vermittelt keinen Zugang zu Pay-TV,
        Sportrechten, Filmen oder Serien Dritter.
      </>,
      <>
        Markennamen von Geräten oder Apps dienen der technischen Einordnung. Eine Partnerschaft,
        Lizenz oder Autorisierung durch Sender oder Streaming-Dienste besteht nicht.
      </>,
      <>
        Redaktionelle Fragen richten Sie bitte an{" "}
        <Link href="/kontakt" className={CONTEXTUAL_LINK_CLASS}>
          Kontakt
        </Link>
        . Zur Arbeitsweise siehe die{" "}
        <Link href="/redaktionelle-richtlinien" className={CONTEXTUAL_LINK_CLASS}>
          redaktionellen Richtlinien
        </Link>
        .
      </>,
    ],
  },
] as const;

export default function HomeSeoContent() {
  return (
    <section
      aria-labelledby="home-seo-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-10 text-[#F5F5F5] sm:px-8 sm:py-12 lg:px-0 lg:py-14"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <header className="mx-auto max-w-[820px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mb-4 sm:text-[11px]">
            IPTV RATGEBER
          </p>
          <h2
            id="home-seo-heading"
            className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.65rem] lg:text-[3rem]"
          >
            Technik, Apps und{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              Einrichtung
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[720px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Kompakte Orientierung zu Übertragungsweg, Playern und Geräten – damit Sie IPTV als
            Technik einordnen können, ohne Kauf- oder Programmpakete.
          </p>
        </header>

        <div className="mx-auto mt-8 grid max-w-[1180px] gap-5 sm:mt-10 md:grid-cols-2 md:gap-6">
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex h-full flex-col rounded-[22px] border border-[#A6FF00]/22 bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,0,0.06),transparent_42%),linear-gradient(155deg,rgba(14,22,11,0.98)_0%,rgba(7,11,8,1)_58%,rgba(3,6,5,1)_100%)] p-5 shadow-[0_14px_34px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.045)] sm:p-6 lg:p-7"
            >
              <p className="inline-flex w-fit rounded-full border border-[#A6FF00]/28 bg-[#A6FF00]/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A6FF00]">
                {card.eyebrow}
              </p>
              <h3 className="mt-4 text-balance text-[1.25rem] font-extrabold leading-tight tracking-[-0.035em] text-[#F5F5F5] sm:text-[1.4rem]">
                {card.title}
              </h3>
              <div className="mt-3 h-px w-14 rounded-full bg-gradient-to-r from-[#A6FF00]/90 to-transparent" />
              <div className="mt-4 flex flex-1 flex-col gap-3 text-[14px] leading-7 text-[#E6E6E6]/84 sm:text-[15px] sm:leading-7">
                {card.paragraphs.map((paragraph, index) => (
                  <p key={`${card.id}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
