"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SenderCategory = {
  region: string;
  title: string;
  channels: string[];
};

const senderCategories: SenderCategory[] = [
  { region: "Europe", title: "Deutschland", channels: ["Das Erste HD", "ZDF HD", "RTL HD", "SAT.1 HD", "ProSieben HD", "VOX HD", "Kabel Eins HD", "RTL Zwei HD", "Sport1 HD", "Welt HD", "NTV HD", "Phoenix HD"] },
  { region: "Europe", title: "Österreich", channels: ["ORF 1 HD", "ORF 2 HD", "ATV HD", "Puls 4 HD", "ServusTV HD", "ORF Sport+", "OE24 TV", "Krone TV"] },
  { region: "Europe", title: "Schweiz", channels: ["SRF 1 HD", "SRF Zwei HD", "3+ HD", "RTS 1 HD", "RTS 2 HD", "RSI La 1 HD", "Tele Züri", "TV24"] },
  { region: "Europe", title: "Frankreich", channels: ["TF1 HD", "France 2 HD", "France 3 HD", "France 5 HD", "M6 HD", "W9 HD", "TMC HD", "Canal+ HD", "Arte HD", "CNews HD", "BFM TV HD"] },
  { region: "Europe", title: "Spanien", channels: ["La 1 HD", "La 2 HD", "Antena 3 HD", "Cuatro HD", "Telecinco HD", "La Sexta HD", "Movistar Deportes HD", "DAZN Spain HD", "Canal Sur"] },
  { region: "Europe", title: "Portugal", channels: ["RTP 1 HD", "RTP 2 HD", "SIC HD", "TVI HD", "Sport TV HD", "Benfica TV HD", "Porto Canal", "CNN Portugal"] },
  { region: "Europe", title: "Italien", channels: ["Rai 1 HD", "Rai 2 HD", "Rai 3 HD", "Canale 5 HD", "Italia 1 HD", "Rete 4 HD", "La7 HD", "Sky Italia HD", "Mediaset Extra"] },
  { region: "Europe", title: "Niederlande", channels: ["NPO 1 HD", "NPO 2 HD", "NPO 3 HD", "RTL 4 HD", "RTL 5 HD", "SBS6 HD", "Veronica HD", "Ziggo Sport HD"] },
  { region: "Europe", title: "Belgien", channels: ["La Une HD", "Tipik HD", "RTL TVI HD", "VTM HD", "Play4 HD", "Canvas HD", "Eleven Sports HD", "LN24"] },
  { region: "Europe", title: "UK", channels: ["BBC One HD", "BBC Two HD", "ITV HD", "Channel 4 HD", "Channel 5 HD", "Sky One HD", "Sky Sports HD", "Sky Cinema HD", "BT Sport HD", "BBC News HD"] },
  { region: "Europe", title: "Irland", channels: ["RTÉ One HD", "RTÉ2 HD", "Virgin Media One", "TG4 HD", "Sky Ireland HD", "RTÉ News"] },
  { region: "Europe", title: "Polen", channels: ["TVP 1 HD", "TVP 2 HD", "Polsat HD", "TVN HD", "TVN24 HD", "Canal+ Polska HD", "Eleven Sports HD", "TVP Sport HD"] },
  { region: "Europe", title: "Türkei", channels: ["TRT 1 HD", "Kanal D HD", "Show TV HD", "ATV HD", "Star TV HD", "Fox Türkiye HD", "TV8 HD", "TRT Spor HD", "beIN Sports Türkiye HD"] },
  { region: "Europe", title: "Griechenland", channels: ["ERT1 HD", "ERT2 HD", "ANT1 HD", "Alpha TV HD", "Star Channel HD", "Mega TV HD", "Nova Sports HD"] },
  { region: "Europe", title: "Rumänien", channels: ["TVR 1 HD", "Pro TV HD", "Antena 1 HD", "Kanal D Romania HD", "Digi Sport HD", "Prima TV HD", "Romania TV"] },
  { region: "Europe", title: "Bulgarien", channels: ["BNT 1 HD", "bTV HD", "Nova TV HD", "Diema Sport HD", "Bulgaria ON AIR", "TV7"] },
  { region: "Europe", title: "Kroatien", channels: ["HRT 1 HD", "HRT 2 HD", "RTL Croatia HD", "Nova TV HD", "Sport Klub HD", "Arena Sport HD"] },
  { region: "Europe", title: "Serbien", channels: ["RTS 1 HD", "RTS 2 HD", "Pink TV HD", "Prva TV HD", "Sport Klub HD", "Arena Sport HD"] },
  { region: "Europe", title: "Bosnien", channels: ["BHT 1 HD", "FTV HD", "RTRS HD", "Hayat TV HD", "Face TV HD", "Arena Sport HD"] },
  { region: "Europe", title: "Albanien", channels: ["Top Channel HD", "Klan TV HD", "Vizion Plus HD", "RTSH HD", "SuperSport Albania HD", "DigitAlb HD"] },
  { region: "Europe", title: "Kosovo", channels: ["RTK 1 HD", "Klan Kosova HD", "T7 HD", "KTV HD", "Art Motion HD"] },
  { region: "Europe", title: "Nordmazedonien", channels: ["MRT 1 HD", "Sitel HD", "Kanal 5 HD", "Telma HD", "Alsat M HD"] },
  { region: "Europe", title: "Slowenien", channels: ["RTV SLO 1 HD", "RTV SLO 2 HD", "POP TV HD", "Kanal A HD", "Sport Klub HD"] },
  { region: "Europe", title: "Tschechien", channels: ["CT1 HD", "CT2 HD", "Nova HD", "Prima HD", "O2 Sport HD", "CT Sport HD"] },
  { region: "Europe", title: "Slowakei", channels: ["Jednotka HD", "Dvojka HD", "Markiza HD", "JOJ HD", "TA3 HD", "Sport TV HD"] },
  { region: "Europe", title: "Ungarn", channels: ["M1 HD", "M2 HD", "RTL Klub HD", "TV2 HD", "Sport1 HD", "ATV HD", "Duna TV HD"] },
  { region: "Europe", title: "Ukraine", channels: ["1+1 HD", "Inter HD", "ICTV HD", "STB HD", "Ukraine 24", "Suspilne HD", "Football HD"] },
  { region: "Europe", title: "Russland", channels: ["Channel One HD", "Russia 1 HD", "NTV HD", "Match TV HD", "TNT HD", "REN TV HD", "Russia 24"] },
  { region: "Europe", title: "Skandinavien", channels: ["SVT1 HD", "SVT2 HD", "TV4 Sweden HD", "NRK1 HD", "NRK2 HD", "TV2 Norway HD", "DR1 HD", "TV2 Denmark HD", "Yle TV1 HD"] },
  { region: "America", title: "USA", channels: ["ABC HD", "NBC HD", "CBS HD", "FOX HD", "CNN HD", "ESPN HD", "HBO HD", "Showtime HD", "Discovery HD", "National Geographic HD", "Fox Sports HD"] },
  { region: "America", title: "Kanada", channels: ["CBC HD", "CTV HD", "Global TV HD", "Citytv HD", "TSN HD", "Sportsnet HD", "CP24 HD", "TVA Sports HD"] },
  { region: "America", title: "Mexiko", channels: ["Las Estrellas HD", "Azteca Uno HD", "Canal 5 HD", "Imagen TV HD", "TUDN HD", "ESPN México HD", "Fox Sports México HD"] },
  { region: "America", title: "Brasilien", channels: ["Globo HD", "SBT HD", "Record TV HD", "Band HD", "SporTV HD", "Premiere FC HD", "ESPN Brasil HD"] },
  { region: "America", title: "Argentinien", channels: ["Telefe HD", "El Trece HD", "América TV HD", "TyC Sports HD", "ESPN Argentina HD", "Fox Sports Argentina HD"] },
  { region: "America", title: "Chile", channels: ["TVN HD", "Mega HD", "Chilevisión HD", "Canal 13 HD", "TNT Sports Chile HD", "ESPN Chile HD"] },
  { region: "America", title: "Kolumbien", channels: ["Caracol TV HD", "RCN HD", "Win Sports HD", "NTN24 HD", "Canal Uno HD", "ESPN Colombia HD"] },
  { region: "America", title: "Peru", channels: ["América TV HD", "Latina HD", "Panamericana HD", "ATV HD", "Movistar Deportes HD"] },
  { region: "America", title: "Uruguay", channels: ["Canal 4 HD", "Canal 10 HD", "Teledoce HD", "VTV HD", "ESPN Uruguay HD"] },
  { region: "America", title: "Venezuela", channels: ["Venevisión HD", "Televen HD", "Globovisión HD", "Meridiano TV HD"] },
  { region: "Africa", title: "Marokko", channels: ["Al Aoula HD", "2M Maroc HD", "Arryadia HD", "Medi 1 TV HD", "Al Maghribia HD", "Tamazight HD"] },
  { region: "Africa", title: "Algerien", channels: ["ENTV HD", "Echourouk TV HD", "El Bilad TV HD", "Dzair TV HD", "Samira TV", "Canal Algérie"] },
  { region: "Africa", title: "Tunesien", channels: ["Wataniya 1 HD", "Wataniya 2 HD", "Nessma TV HD", "El Hiwar Ettounsi", "Hannibal TV HD"] },
  { region: "Africa", title: "Ägypten", channels: ["ON TV HD", "CBC HD", "DMC HD", "Al Hayah HD", "Nile Drama", "Nile Sports"] },
  { region: "Africa", title: "Libyen", channels: ["Libya Al Ahrar HD", "Libya 218 HD", "Libya TV HD", "National TV HD"] },
  { region: "Africa", title: "Senegal", channels: ["RTS 1 HD", "2STV HD", "TFM HD", "Sen TV HD", "Sports HD"] },
  { region: "Africa", title: "Nigeria", channels: ["NTA HD", "Channels TV HD", "TVC News HD", "Africa Magic HD", "SuperSport Africa HD"] },
  { region: "Africa", title: "Ghana", channels: ["GTV HD", "TV3 Ghana HD", "UTV Ghana HD", "Joy Prime HD", "Sports HD"] },
  { region: "Africa", title: "Südafrika", channels: ["SABC 1 HD", "SABC 2 HD", "SABC 3 HD", "e.tv HD", "SuperSport HD", "M-Net HD"] },
  { region: "Africa", title: "Kamerun", channels: ["CRTV HD", "Canal 2 HD", "Vision 4 HD", "Sports HD", "News HD"] },
  { region: "Africa", title: "Côte d'Ivoire", channels: ["RTI 1 HD", "RTI 2 HD", "Life TV HD", "Sports HD", "News HD"] },
  { region: "Africa", title: "Mali", channels: ["ORTM HD", "Africable HD", "News HD", "Sports HD", "Local TV HD"] },
  { region: "Middle East / Arabic", title: "Arabische Sender", channels: ["Al Jazeera HD", "Al Arabiya HD", "Sky News Arabia HD", "Al Mayadeen HD", "Rotana Cinema", "Rotana Drama"] },
  { region: "Middle East / Arabic", title: "MBC", channels: ["MBC 1 HD", "MBC 2 HD", "MBC 3 HD", "MBC 4 HD", "MBC Action HD", "MBC Drama HD", "MBC Bollywood HD", "Shahid VIP Kategorien"] },
  { region: "Middle East / Arabic", title: "OSN", channels: ["OSN Movies HD", "OSN Series HD", "OSN Kids HD", "OSN Yahala HD", "OSN Sports HD"] },
  { region: "Middle East / Arabic", title: "beIN Arab", channels: ["beIN Sports 1 HD", "beIN Sports 2 HD", "beIN Sports 3 HD", "beIN Sports 4 HD", "beIN Movies HD", "beIN Series HD"] },
  { region: "Middle East / Arabic", title: "Saudi Arabien", channels: ["Saudi TV HD", "Al Ekhbariya HD", "SSC Sports HD", "Rotana Khalijia HD", "Quran TV HD"] },
  { region: "Middle East / Arabic", title: "UAE", channels: ["Dubai TV HD", "Abu Dhabi TV HD", "Sama Dubai HD", "AD Sports HD", "Dubai Sports HD"] },
  { region: "Middle East / Arabic", title: "Qatar", channels: ["Qatar TV HD", "Al Kass Sports HD", "beIN Sports Qatar HD", "Qatar News HD"] },
  { region: "Middle East / Arabic", title: "Kuwait", channels: ["KTV 1 HD", "KTV 2 HD", "KTV Sport HD", "Al Rai TV HD"] },
  { region: "Middle East / Arabic", title: "Bahrain", channels: ["Bahrain TV HD", "Bahrain Sports HD", "National TV HD", "News HD"] },
  { region: "Middle East / Arabic", title: "Oman", channels: ["Oman TV HD", "Oman Sports HD", "Oman News HD"] },
  { region: "Middle East / Arabic", title: "Jordanien", channels: ["Jordan TV HD", "Roya TV HD", "Al Mamlaka HD"] },
  { region: "Middle East / Arabic", title: "Libanon", channels: ["LBCI HD", "MTV Lebanon HD", "Al Jadeed HD", "OTV HD"] },
  { region: "Middle East / Arabic", title: "Irak", channels: ["Al Iraqiya HD", "Al Sharqiya HD", "UTV Iraq HD", "Dijlah TV HD"] },
  { region: "Middle East / Arabic", title: "Syrien", channels: ["Syria TV HD", "Sama TV HD", "Lana TV HD"] },
  { region: "Middle East / Arabic", title: "Palästina", channels: ["Palestine TV HD", "Al Quds TV HD", "Ma'an TV HD"] },
  { region: "Middle East / Arabic", title: "Iran", channels: ["IRIB TV1 HD", "IRIB TV2 HD", "IRIB TV3 HD", "Press TV HD", "Varzesh TV HD"] },
  { region: "Asia", title: "Indien", channels: ["Star Plus HD", "Sony TV HD", "Zee TV HD", "Colors HD", "Star Sports HD", "Sony Sports HD", "NDTV HD"] },
  { region: "Asia", title: "Pakistan", channels: ["PTV Home HD", "Geo News HD", "ARY Digital HD", "Hum TV HD", "Ten Sports HD", "PTV Sports HD"] },
  { region: "Asia", title: "Afghanistan", channels: ["Tolo TV HD", "Ariana TV HD", "Shamshad TV HD", "Lemar TV HD", "National TV HD"] },
  { region: "Asia", title: "Bangladesch", channels: ["BTV HD", "Channel i HD", "Somoy TV HD", "Gazi TV HD", "Sports HD"] },
  { region: "Asia", title: "China", channels: ["CCTV 1 HD", "CCTV News HD", "CCTV Sports HD", "Dragon TV HD", "Hunan TV HD"] },
  { region: "Asia", title: "Japan", channels: ["NHK HD", "Nippon TV HD", "TV Asahi HD", "Fuji TV HD", "TBS HD", "TV Tokyo HD"] },
  { region: "Asia", title: "Korea", channels: ["KBS HD", "MBC Korea HD", "SBS HD", "tvN HD", "JTBC HD", "SPOTV HD"] },
  { region: "Asia", title: "Thailand", channels: ["Channel 3 HD", "Channel 7 HD", "Thai PBS HD", "Workpoint TV HD", "True Sports HD"] },
  { region: "Asia", title: "Philippinen", channels: ["ABS-CBN HD", "GMA HD", "TV5 HD", "ANC HD", "One Sports HD"] },
  { region: "Asia", title: "Vietnam", channels: ["VTV1 HD", "VTV3 HD", "HTV7 HD", "HTV9 HD", "VTC HD"] },
  { region: "Asia", title: "Indonesien", channels: ["RCTI HD", "SCTV HD", "Trans TV HD", "Metro TV HD", "Indosiar HD"] },
  { region: "Asia", title: "Malaysia", channels: ["TV1 HD", "TV2 HD", "TV3 HD", "Astro Arena HD", "Astro Supersport HD"] },
  { region: "Asia", title: "Singapur", channels: ["Channel 5 HD", "Channel 8 HD", "CNA HD", "Sports HD"] },
  { region: "Oceania", title: "Australien", channels: ["ABC Australia HD", "Seven HD", "Nine HD", "10 HD", "SBS HD", "Fox Sports Australia HD"] },
  { region: "Oceania", title: "Neuseeland", channels: ["TVNZ 1 HD", "TVNZ 2 HD", "Three HD", "Sky Sport NZ HD", "Prime TV HD"] },
  { region: "Sport Categories", title: "Sport", channels: ["Sky Sport HD", "DAZN HD", "Eurosport HD", "beIN Sports HD", "ESPN HD", "Fox Sports HD", "Sportdigital HD"] },
  { region: "Sport Categories", title: "Fußball", channels: ["Bundesliga HD", "Champions League HD", "Europa League HD", "Premier League HD", "La Liga HD", "Serie A HD", "Ligue 1 HD"] },
  { region: "Sport Categories", title: "Bundesliga", channels: ["Sky Bundesliga 1 HD", "Sky Bundesliga 2 HD", "Sky Bundesliga 3 HD", "DAZN Bundesliga HD", "Sport1 Bundesliga"] },
  { region: "Sport Categories", title: "Champions League", channels: ["DAZN Champions League HD", "Prime Video Sport HD", "beIN Champions HD", "Sky Sport Austria HD"] },
  { region: "Sport Categories", title: "Premier League", channels: ["Sky Sports Premier League HD", "TNT Sports HD", "USA Network Sports", "NBC Sports HD"] },
  { region: "Sport Categories", title: "La Liga", channels: ["Movistar LaLiga HD", "DAZN LaLiga HD", "LaLiga TV Bar HD"] },
  { region: "Sport Categories", title: "Serie A", channels: ["DAZN Serie A HD", "Sky Calcio HD", "Sport Italia HD"] },
  { region: "Sport Categories", title: "Ligue 1", channels: ["Canal+ Foot HD", "beIN Ligue 1 HD", "Prime Video Ligue 1"] },
  { region: "Sport Categories", title: "Motorsport", channels: ["Formula 1 HD", "Sky F1 HD", "Motorsport TV HD", "MotoGP HD", "NASCAR HD"] },
  { region: "Sport Categories", title: "UFC & Boxen", channels: ["UFC Fight Pass HD", "DAZN Fight Night HD", "Boxing TV HD", "Fight Sports HD"] },
  { region: "Sport Categories", title: "NBA", channels: ["NBA TV HD", "ESPN NBA HD", "TNT Sports NBA HD", "Sky Sports NBA HD"] },
  { region: "Sport Categories", title: "NFL", channels: ["NFL Network HD", "ESPN NFL HD", "Fox NFL HD", "CBS Sports HD"] },
  { region: "Sport Categories", title: "Tennis", channels: ["Tennis Channel HD", "Eurosport Tennis HD", "Sky Tennis HD", "beIN Tennis HD"] },
  { region: "Entertainment", title: "Filme", channels: ["Sky Cinema HD", "Warner TV Film HD", "Paramount Movies HD", "AMC HD", "FilmBox HD", "Canal+ Cinema HD"] },
  { region: "Entertainment", title: "Serien", channels: ["Warner TV Serie HD", "AXN HD", "Syfy HD", "13th Street HD", "Universal TV HD", "Fox Series HD"] },
  { region: "Entertainment", title: "Netflix Kategorien", channels: ["Netflix Action", "Netflix Drama", "Netflix Serien", "Netflix Kids", "Netflix Dokumentation", "Netflix Comedy"] },
  { region: "Entertainment", title: "Prime Video Kategorien", channels: ["Prime Video Action", "Prime Video Serien", "Prime Video Sport", "Prime Video Filme", "Prime Video Kids"] },
  { region: "Entertainment", title: "Disney+ Kategorien", channels: ["Disney+ Filme", "Disney+ Serien", "Disney+ Kids", "Marvel", "Star Wars", "National Geographic Disney+"] },
  { region: "Entertainment", title: "HBO Kategorien", channels: ["HBO Movies", "HBO Series", "HBO Max Originals", "HBO Drama", "HBO Comedy"] },
  { region: "Entertainment", title: "Dokumentation", channels: ["National Geographic HD", "Discovery HD", "History HD", "Animal Planet HD", "Travel Channel HD", "Arte Doku HD"] },
  { region: "Entertainment", title: "Nachrichten", channels: ["CNN HD", "BBC News HD", "Euronews HD", "Al Jazeera HD", "Sky News HD", "Welt HD", "NTV HD"] },
  { region: "Entertainment", title: "Kinder", channels: ["Super RTL HD", "KiKA HD", "Nickelodeon HD", "Cartoon Network HD", "Disney Channel HD", "Boomerang HD"] },
  { region: "Entertainment", title: "Musik", channels: ["MTV HD", "Deluxe Music HD", "Trace Urban HD", "NRJ Hits HD", "Clubbing TV HD", "VH1 HD"] },
  { region: "Entertainment", title: "Lifestyle", channels: ["TLC HD", "HGTV HD", "Food Network HD", "Fashion TV HD", "Travel XP HD"] },
  { region: "Entertainment", title: "Religion", channels: ["Quran TV HD", "Sunnah TV HD", "Bibel TV HD", "Religious TV HD", "Peace TV HD"] },
];

function normalize(value: string) {
  return value.toLocaleLowerCase("de-DE");
}

export default function SenderlisteExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredCategories = useMemo(() => {
    const query = normalize(searchTerm.trim());

    if (!query) {
      return senderCategories.map((category, index) => ({ category, index }));
    }

    return senderCategories
      .map((category, index) => ({ category, index }))
      .filter(({ category }) =>
        normalize(`${category.region} ${category.title} ${category.channels.join(" ")}`).includes(query),
      );
  }, [searchTerm]);

  useEffect(() => {
    if (openIndex !== null && !filteredCategories.some(({ index }) => index === openIndex)) {
      setOpenIndex(null);
    }
  }, [filteredCategories, openIndex]);

  return (
    <section className="bg-[#000000] px-5 pb-14 pt-8 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-10 lg:px-0 lg:pb-20">
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[860px] text-center">
          <p className="text-[15px] leading-7 text-[#E6E6E6]/86 sm:text-[16px] sm:leading-8">
            Unsere Senderliste bietet eine breite Auswahl an IPTV Kategorien aus Deutschland, Europa,
            Amerika, Afrika, Asien, dem Nahen Osten sowie Sport, Filme, Serien, Nachrichten, Musik und
            Kinderinhalte.
          </p>
          <p className="mx-auto mt-4 max-w-[760px] rounded-2xl border border-[#A6FF00]/20 bg-[#071006] px-4 py-3 text-[13px] font-medium leading-6 text-[#A6FF00]/88 sm:text-[14px]">
            Dies ist eine Beispielübersicht unserer Kategorien. Die vollständige Senderliste umfasst
            tausende internationale Kanäle und wird regelmäßig aktualisiert.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-[760px] sm:mt-10">
          <label htmlFor="senderliste-search" className="sr-only">
            Land oder Kategorie suchen
          </label>
          <input
            id="senderliste-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Land oder Kategorie suchen…"
            className="h-14 w-full rounded-2xl border border-[#A6FF00]/28 bg-[#050806] px-5 text-[15px] font-medium text-[#F5F5F5] outline-none shadow-[0_18px_42px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-300 placeholder:text-[#F5F5F5]/42 focus:border-[#A6FF00]/70"
          />
          <p className="mt-3 text-center text-[12px] font-medium uppercase tracking-[0.16em] text-[#F5F5F5]/46">
            {filteredCategories.length} Kategorien gefunden
          </p>
        </div>

        <div className="mt-8 grid items-start gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredCategories.map(({ category, index }) => {
            const isOpen = openIndex === index;
            const panelId = `sender-category-${index}`;

            return (
              <article
                key={`${category.region}-${category.title}`}
                className="overflow-hidden rounded-[22px] border border-[#A6FF00]/20 bg-[#050806] shadow-[0_18px_48px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-300 hover:border-[#A6FF00]/48"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                >
                  <span className="min-w-0">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#A6FF00]/78">
                      {category.region}
                    </span>
                    <span className="block truncate text-[15px] font-bold text-[#F5F5F5] sm:text-[16px]">
                      {category.title}
                    </span>
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#A6FF00]/28 bg-[#A6FF00]/8 text-[20px] font-light leading-none text-[#A6FF00]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    {isOpen ? (
                      <ul className="grid gap-2 border-t border-[#1F1F1F] px-4 pb-5 pt-4 sm:px-5">
                        {category.channels.map((channel) => (
                          <li key={channel} className="flex gap-2.5 text-[13px] leading-6 text-[#E6E6E6]/82">
                            <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00]" />
                            <span>{channel}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredCategories.length === 0 ? (
          <div className="mt-8 rounded-[22px] border border-[#A6FF00]/20 bg-[#050806] p-6 text-center text-[#E6E6E6]/82">
            Keine passende Kategorie gefunden. Versuchen Sie ein anderes Land, eine Region oder eine
            Senderkategorie.
          </div>
        ) : null}

        <div className="mx-auto mt-12 max-w-[920px] rounded-[28px] border border-[#A6FF00]/28 bg-[linear-gradient(180deg,#071006_0%,#030503_100%)] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-8 lg:p-10">
          <h2 className="text-[1.75rem] font-black leading-tight tracking-[-0.045em] text-[#F5F5F5] sm:text-[2.35rem]">
            Nicht gefunden, was Sie suchen?
          </h2>
          <p className="mx-auto mt-4 max-w-[720px] text-[14px] leading-7 text-[#E6E6E6]/84 sm:text-[15px]">
            Unsere vollständige IPTV Kaufen Senderliste umfasst tausende internationale Kanäle und wird
            regelmäßig erweitert. Kontaktieren Sie uns, wenn Sie eine bestimmte Kategorie suchen.
          </p>
          <Link
            href="/#preise"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#A6FF00] px-6 py-3 text-[13px] font-extrabold uppercase tracking-[0.13em] text-[#050505] transition duration-300 hover:-translate-y-0.5 hover:bg-[#B8FF4D]"
          >
            Jetzt IPTV Kaufen
          </Link>
        </div>
      </div>
    </section>
  );
}
