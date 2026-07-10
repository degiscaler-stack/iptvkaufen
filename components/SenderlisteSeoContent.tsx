import Link from "next/link";

const linkClass =
  "font-medium text-[#A6FF00] underline-offset-4 transition duration-300 hover:text-[#C7FF62] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]";

const SENDERLISTE_FAQ = [
  {
    question: "Was steht in der IPTV Senderliste?",
    answer:
      "Die IPTV Senderliste zeigt verfügbare Live-TV-Kanäle und Themenkategorien – von deutschen Programmen über internationale IPTV Sender bis zu Sport, Filmen und Serien. Sie dient als Orientierung vor dem Abschluss eines Pakets.",
  },
  {
    question: "Werden deutsche und internationale Sender angeboten?",
    answer:
      "Ja. Deutsche IPTV Sender gehören zum Kernangebot; ergänzend finden Sie internationale IPTV Sender und IPTV TV Sender aus vielen Ländern. Ob ein bestimmter Kanal enthalten ist, prüfen Sie am besten direkt in der Suche oben.",
  },
  {
    question: "Wie oft wird die Senderliste aktualisiert?",
    answer:
      "Die Liste wird regelmäßig gepflegt. Neue Kanäle, geänderte Bezeichnungen und thematische IPTV Kategorien fließen laufend ein – ohne dass Sie Hardware austauschen müssen.",
  },
  {
    question: "Auf welchen Geräten kann ich die Sender nutzen?",
    answer:
      "Die Kanäle lassen sich auf Smart TV, Fire TV, Android TV, Smartphone, Tablet und PC streamen – je nach App und Paket. Tipps zur Hardware finden Sie in unseren Ratgebern zu IPTV Box und IPTV Receiver.",
  },
];

export default function SenderlisteSeoContent() {
  return (
    <div className="bg-[#000000] px-5 pb-16 text-[#F5F5F5] sm:px-8 sm:pb-20 lg:px-0">
      <div className="mx-auto max-w-[920px] lg:px-12">
        <nav aria-label="Brotkrumen" className="mb-10 text-[12px] text-[#F5F5F5]/52">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className={linkClass}>
                Startseite
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#F5F5F5]/72">IPTV Senderliste</li>
          </ol>
        </nav>

        <section aria-labelledby="was-ist-iptv-senderliste" className="border-t border-[#1F1F1F]/80 pt-10">
          <h2
            id="was-ist-iptv-senderliste"
            className="text-balance text-[1.55rem] font-black leading-tight tracking-[-0.04em] text-[#F5F5F5] sm:text-[1.85rem]"
          >
            Was ist eine IPTV Senderliste?
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#E6E6E6]/84 sm:text-[16px] sm:leading-8">
            <p>
              Eine IPTV Senderliste ist die Übersicht aller Live-TV-Kanäle und Themenbereiche, die
              Sie über Internetfernsehen empfangen können. Statt Frequenzen oder Kabelpakete zu
              vergleichen, sehen Sie hier IPTV Kanäle nach Land und Kategorie – übersichtlich und
              durchsuchbar.
            </p>
            <p>
              Für Haushalte in Deutschland ist die IPTV Senderliste oft der erste Schritt vor dem
              Kauf: Welche deutschen Programme sind dabei? Gibt es IPTV Sportsender für die
              Bundesliga? Welche IPTV Filmsender und Serienangebote ergänzen das Live-TV? Die
              Antworten finden Sie direkt in unserem Katalog oben.
            </p>
            <p>
              Wer Grundlagen zu Anbietern und Paketen vertiefen möchte, liest ergänzend den{" "}
              <Link href="/blog/iptv-provider" className={linkClass}>
                IPTV-Provider-Ratgeber
              </Link>{" "}
              und den Überblick zu{" "}
              <Link href="/blog/iptv-abo" className={linkClass}>
                IPTV Abo
              </Link>
              . Aktuelle{" "}
              <Link href="/preise" className={linkClass}>
                Preise
              </Link>{" "}
              und den Einstieg über die{" "}
              <Link href="/" className={linkClass}>
                Startseite
              </Link>{" "}
              finden Sie jederzeit auf iptvkaufenX.
            </p>
          </div>
        </section>

        <section aria-labelledby="deutsche-iptv-sender" className="mt-12 border-t border-[#1F1F1F]/80 pt-10">
          <h2
            id="deutsche-iptv-sender"
            className="text-balance text-[1.55rem] font-black leading-tight tracking-[-0.04em] text-[#F5F5F5] sm:text-[1.85rem]"
          >
            Deutsche IPTV Sender und IPTV Sender Deutschland
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#E6E6E6]/84 sm:text-[16px] sm:leading-8">
            <p>
              Deutsche IPTV Sender bilden für die meisten Nutzer den Alltag: Nachrichten,
              Unterhaltung, regionale Programme und vertraute Marken. Unter IPTV Sender Deutschland
              verstehen wir genau diese Auswahl – Programme, die Sie aus dem klassischen Fernsehen
              kennen, plus ergänzende IPTV TV Sender für Nischen und Spezialinteressen.
            </p>
            <p>
              Nutzen Sie die Suche nach Ländernamen oder Sendertitel. So prüfen Sie vor dem
              Abschluss, ob Ihre Must-have-Kanäle enthalten sind – ohne leere Versprechen. Mehr
              Kontext zu Marketingbegriffen wie „alle Sender“ liefert der Artikel{" "}
              <Link href="/blog/iptv-alle-sender" className={linkClass}>
                IPTV Alle Sender
              </Link>
              .
            </p>
          </div>
        </section>

        <section
          aria-labelledby="internationale-iptv-sender"
          className="mt-12 border-t border-[#1F1F1F]/80 pt-10"
        >
          <h2
            id="internationale-iptv-sender"
            className="text-balance text-[1.55rem] font-black leading-tight tracking-[-0.04em] text-[#F5F5F5] sm:text-[1.85rem]"
          >
            Internationale IPTV Sender
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#E6E6E6]/84 sm:text-[16px] sm:leading-8">
            <p>
              Internationale IPTV Sender sind besonders für mehrsprachige Haushalte und Expatriates
              relevant. Ob europäische Nachbarländer oder weiter entfernte Regionen: Die IPTV
              Channel List auf dieser Seite gruppiert Kanäle nach Ländern und Themen, damit Sie
              schnell fündig werden.
            </p>
            <p>
              Live TV Sender IPTV bedeuten dabei lineares Programm über Ihre Breitbandleitung –
              flexibel auf dem Gerät Ihrer Wahl. Wer Bildqualität in Ultra HD sucht, findet
              Orientierung im Guide zu{" "}
              <Link href="/blog/iptv-premium-4k" className={linkClass}>
                IPTV Premium 4K
              </Link>
              .
            </p>
          </div>
        </section>

        <section aria-labelledby="iptv-sportsender" className="mt-12 border-t border-[#1F1F1F]/80 pt-10">
          <h2
            id="iptv-sportsender"
            className="text-balance text-[1.55rem] font-black leading-tight tracking-[-0.04em] text-[#F5F5F5] sm:text-[1.85rem]"
          >
            IPTV Sportsender
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#E6E6E6]/84 sm:text-[16px] sm:leading-8">
            <p>
              IPTV Sportsender gehören zu den am häufigsten gesuchten Kategorien. Fußball,
              Motorsport, Kampfsport oder internationale Ligen – entscheidend ist nicht nur die
              Anzahl der Kanäle, sondern die Stabilität zur Hauptsendezeit.
            </p>
            <p>
              Prüfen Sie in der Senderliste die Sport-Kategorien und testen Sie Streams idealerweise
              abends. Passende Pakete und Laufzeiten erklären wir unter den{" "}
              <Link href="/preise" className={linkClass}>
                IPTV Preisen
              </Link>
              ; technische Tipps zur Einrichtung finden Sie im{" "}
              <Link href="/blog" className={linkClass}>
                IPTV Blog
              </Link>
              .
            </p>
          </div>
        </section>

        <section aria-labelledby="filme-serien" className="mt-12 border-t border-[#1F1F1F]/80 pt-10">
          <h2
            id="filme-serien"
            className="text-balance text-[1.55rem] font-black leading-tight tracking-[-0.04em] text-[#F5F5F5] sm:text-[1.85rem]"
          >
            IPTV Filmsender, Filme und Serien
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#E6E6E6]/84 sm:text-[16px] sm:leading-8">
            <p>
              Neben Live-TV decken viele Pakete IPTV Filmsender sowie Film- und Serienbereiche ab.
              So kombinieren Sie lineares Programm mit On-Demand-Inhalten – ohne zwischen mehreren
              Plattformen wechseln zu müssen.
            </p>
            <p>
              Die thematischen IPTV Kategorien in unserem Katalog helfen, Unterhaltung schnell zu
              finden. Ob Kinderprogramme, Nachrichten oder Filmkanäle: Die Struktur der IPTV
              Senderliste macht den Unterschied zwischen endlosem Scrollen und gezielter Auswahl.
            </p>
          </div>
        </section>

        <section aria-labelledby="regelmaessige-updates" className="mt-12 border-t border-[#1F1F1F]/80 pt-10">
          <h2
            id="regelmaessige-updates"
            className="text-balance text-[1.55rem] font-black leading-tight tracking-[-0.04em] text-[#F5F5F5] sm:text-[1.85rem]"
          >
            Regelmäßige Updates der Senderliste
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#E6E6E6]/84 sm:text-[16px] sm:leading-8">
            <p>
              Fernsehlandschaften ändern sich: Sender starten neu, wechseln Namen oder werden
              neu gruppiert. Deshalb wird unsere IPTV Senderliste regelmäßig aktualisiert – zentral
              und ohne Aufwand für Sie.
            </p>
            <p>
              Fehlt ein Kanal, den Sie erwarten? Nutzen Sie die WhatsApp-Anfrage auf dieser Seite
              oder schreiben Sie uns über den{" "}
              <Link href="/kontakt" className={linkClass}>
                Kontakt
              </Link>
              . So bleibt die IPTV Channel List praxisnah statt nur eine statische Marketingseite.
            </p>
          </div>
        </section>

        <section aria-labelledby="kompatible-geraete" className="mt-12 border-t border-[#1F1F1F]/80 pt-10">
          <h2
            id="kompatible-geraete"
            className="text-balance text-[1.55rem] font-black leading-tight tracking-[-0.04em] text-[#F5F5F5] sm:text-[1.85rem]"
          >
            Kompatible Geräte und Apps
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#E6E6E6]/84 sm:text-[16px] sm:leading-8">
            <p>
              Die Sender aus der Liste nutzen Sie auf Smart TV, Fire TV Stick, Android TV,
              Smartphone, Tablet oder PC. Viele Haushalte setzen auf eine{" "}
              <Link href="/blog/iptv-box" className={linkClass}>
                IPTV Box
              </Link>{" "}
              oder einen{" "}
              <Link href="/blog/iptv-receiver" className={linkClass}>
                IPTV Receiver
              </Link>
              , wenn der Fernseher selbst keine passende App bietet.
            </p>
            <p>
              Zur Einrichtung kommen häufig Player wie{" "}
              <Link href="/blog/iptv-smarters-pro" className={linkClass}>
                IPTV Smarters Pro
              </Link>{" "}
              oder{" "}
              <Link href="/blog/tivimate-iptv" className={linkClass}>
                TiviMate IPTV
              </Link>{" "}
              zum Einsatz. Wer Playlists versteht, liest den Guide zu{" "}
              <Link href="/blog/iptv-m3u" className={linkClass}>
                IPTV M3U
              </Link>
              . So wird aus der Senderliste ein funktionierendes Live-TV-Setup.
            </p>
          </div>
        </section>

        <section aria-labelledby="senderliste-faq" className="mt-12 border-t border-[#1F1F1F]/80 pt-10">
          <h2
            id="senderliste-faq"
            className="text-balance text-[1.55rem] font-black leading-tight tracking-[-0.04em] text-[#F5F5F5] sm:text-[1.85rem]"
          >
            Häufige Fragen zur IPTV Senderliste
          </h2>
          <div className="mt-6 space-y-4">
            {SENDERLISTE_FAQ.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-[#A6FF00]/20 bg-[#050806] px-5 py-4 sm:px-6 sm:py-5"
              >
                <h3 className="text-[15px] font-bold leading-snug text-[#F5F5F5] sm:text-[16px]">
                  {item.question}
                </h3>
                <p className="mt-2 text-[14px] leading-7 text-[#E6E6E6]/82 sm:text-[15px]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-[15px] leading-7 text-[#E6E6E6]/84 sm:text-[16px] sm:leading-8">
            Weitere Tipps und Vergleiche finden Sie im{" "}
            <Link href="/blog" className={linkClass}>
              Blog
            </Link>
            . Wenn Sie bereit sind, starten Sie über die{" "}
            <Link href="/" className={linkClass}>
              Homepage
            </Link>{" "}
            oder wählen Sie direkt ein Paket unter den{" "}
            <Link href="/preise" className={linkClass}>
              Preisen
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
