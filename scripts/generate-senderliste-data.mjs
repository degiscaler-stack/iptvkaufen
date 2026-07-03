import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "data", "senderliste");

/** Existing verified inventory from SenderlisteExplorer only. Do not invent channels. */
const sourceCategories = [
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
  { region: "North America", title: "USA", channels: ["ABC HD", "NBC HD", "CBS HD", "FOX HD", "CNN HD", "ESPN HD", "HBO HD", "Showtime HD", "Discovery HD", "National Geographic HD", "Fox Sports HD"] },
  { region: "North America", title: "Kanada", channels: ["CBC HD", "CTV HD", "Global TV HD", "Citytv HD", "TSN HD", "Sportsnet HD", "CP24 HD", "TVA Sports HD"] },
  { region: "North America", title: "Mexiko", channels: ["Las Estrellas HD", "Azteca Uno HD", "Canal 5 HD", "Imagen TV HD", "TUDN HD", "ESPN México HD", "Fox Sports México HD"] },
  { region: "South America", title: "Brasilien", channels: ["Globo HD", "SBT HD", "Record TV HD", "Band HD", "SporTV HD", "Premiere FC HD", "ESPN Brasil HD"] },
  { region: "South America", title: "Argentinien", channels: ["Telefe HD", "El Trece HD", "América TV HD", "TyC Sports HD", "ESPN Argentina HD", "Fox Sports Argentina HD"] },
  { region: "South America", title: "Chile", channels: ["TVN HD", "Mega HD", "Chilevisión HD", "Canal 13 HD", "TNT Sports Chile HD", "ESPN Chile HD"] },
  { region: "South America", title: "Kolumbien", channels: ["Caracol TV HD", "RCN HD", "Win Sports HD", "NTN24 HD", "Canal Uno HD", "ESPN Colombia HD"] },
  { region: "South America", title: "Peru", channels: ["América TV HD", "Latina HD", "Panamericana HD", "ATV HD", "Movistar Deportes HD"] },
  { region: "South America", title: "Uruguay", channels: ["Canal 4 HD", "Canal 10 HD", "Teledoce HD", "VTV HD", "ESPN Uruguay HD"] },
  { region: "South America", title: "Venezuela", channels: ["Venevisión HD", "Televen HD", "Globovisión HD", "Meridiano TV HD"] },
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
  { region: "Middle East / Arabic", title: "Saudi-Arabien", channels: ["Saudi TV HD", "Al Ekhbariya HD", "SSC Sports HD", "Rotana Khalijia HD", "Quran TV HD"] },
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

const CATEGORY_ORDER = [
  "Öffentlich-rechtliche Sender",
  "Allgemeine Sender",
  "Nachrichten",
  "Sport",
  "Filme & Serien",
  "Unterhaltung",
  "Kinder",
  "Dokumentationen",
  "Musik",
  "Regional",
  "Lifestyle",
  "Kultur",
  "Wirtschaft",
  "Religion",
];

const PUBLIC_BROADCASTERS = [
  /^das erste\b/i,
  /^zdf\b/i,
  /^ard\b/i,
  /^phoenix\b/i,
  /^orf\b/i,
  /^srf\b/i,
  /^rts\s*\d/i,
  /^rsi\b/i,
  /^france\s*[235]\b/i,
  /^arte\b/i,
  /^la\s*[12]\b/i,
  /^rtp\s*[12]\b/i,
  /^rai\s*[123]\b/i,
  /^npo\s*[123]\b/i,
  /^la une\b/i,
  /^tipik\b/i,
  /^canvas\b/i,
  /^bbc\s*(one|two|news)\b/i,
  /^rt[eé]\b/i,
  /^tg4\b/i,
  /^tvp\s*[12]\b/i,
  /^trt\s*1\b/i,
  /^ert[12]\b/i,
  /^tvr\s*1\b/i,
  /^bnt\s*1\b/i,
  /^hrt\s*[12]\b/i,
  /^rts\s*[12]\b/i,
  /^bht\s*1\b/i,
  /^ftv\b/i,
  /^rtrs\b/i,
  /^rtsh\b/i,
  /^rtk\s*1\b/i,
  /^mrt\s*1\b/i,
  /^rtv\s*slo\b/i,
  /^ct[12]\b/i,
  /^jednotka\b/i,
  /^dvojka\b/i,
  /^m[12]\b/i,
  /^duna\s*tv\b/i,
  /^suspilne\b/i,
  /^channel one\b/i,
  /^russia\s*1\b/i,
  /^svt[12]\b/i,
  /^nrk[12]\b/i,
  /^dr1\b/i,
  /^yle\b/i,
  /^cbc\b/i,
  /^sabc\s*[123]\b/i,
  /^entv\b/i,
  /^al aoula\b/i,
  /^wataniya\b/i,
  /^nta\b/i,
  /^gtv\b/i,
  /^crtv\b/i,
  /^rti\s*[12]\b/i,
  /^ortm\b/i,
  /^saudi tv\b/i,
  /^qatar tv\b/i,
  /^ktv\s*[12]\b/i,
  /^bahrain tv\b/i,
  /^oman tv\b/i,
  /^jordan tv\b/i,
  /^palestine tv\b/i,
  /^irib\b/i,
  /^ptv home\b/i,
  /^btv\b/i,
  /^cctv\s*1\b/i,
  /^nhk\b/i,
  /^kbs\b/i,
  /^thai pbs\b/i,
  /^vtv[13]\b/i,
  /^tv[12]\b/i,
  /^abc australia\b/i,
  /^sbs\b/i,
  /^tvnz\s*[12]\b/i,
];

function slugify(value) {
  return value
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/Ä/g, "ae")
    .replace(/Ö/g, "oe")
    .replace(/Ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " und ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function categorizeChannel(name, groupTitle, region) {
  const n = name.toLowerCase();

  if (
    /quran|sunnah|bibel|religious|peace tv/.test(n) ||
    groupTitle === "Religion"
  ) {
    return "Religion";
  }

  if (
    /kika|super rtl|nickelodeon|cartoon|boomerang|disney channel|mbc 3|osn kids|netflix kids|prime video kids|disney\+ kids/.test(n) ||
    groupTitle === "Kinder"
  ) {
    return "Kinder";
  }

  if (
    /music|mtv|deluxe|trace urban|nrj|clubbing|vh1/.test(n) ||
    groupTitle === "Musik"
  ) {
    return "Musik";
  }

  if (
    /tlc|hgtv|food network|fashion tv|travel xp/.test(n) ||
    groupTitle === "Lifestyle"
  ) {
    return "Lifestyle";
  }

  if (
    /national geographic|discovery|history|animal planet|travel channel|arte doku|phoenix|netflix dokumentation|national geographic disney/.test(n) ||
    groupTitle === "Dokumentation"
  ) {
    return "Dokumentationen";
  }

  if (
    /cinema|film|movies|movie|serie|series|hbo|showtime|sky cinema|warner tv|paramount|amc|filmbox|axn|syfy|13th street|universal tv|fox series|netflix|prime video|disney\+|marvel|star wars|rotana cinema|rotana drama|nile drama|africa magic|mbc action|mbc drama|mbc bollywood|osn movies|osn series|bein movies|bein series|m-net|shahid/.test(n) ||
    ["Filme", "Serien", "Netflix Kategorien", "Prime Video Kategorien", "Disney+ Kategorien", "HBO Kategorien"].includes(groupTitle)
  ) {
    if (/sport/.test(n) && !/serie|series|film|movie|cinema/.test(n)) {
      return "Sport";
    }
    if (/kids|kinder/.test(n)) {
      return "Kinder";
    }
    if (/dokumentation|documentary/.test(n)) {
      return "Dokumentationen";
    }
    return "Filme & Serien";
  }

  if (
    /sport|dazn|espn|bein|bundesliga|champions|premier league|la liga|serie a|ligue 1|motorsport|formula|motogp|nascar|ufc|boxing|fight|nba|nfl|tennis|football|arryadia|varzesh|match tv|ziggo sport|eleven sports|sky sport|bt sport|tsn|sportsnet|tudn|spor|super sport|supersport|arena sport|sport klub|diema|digi sport|o2 sport|ct sport|nova sports|art motion|ssc sports|al kass|ad sports|dubai sports|ten sports|spotv|astro arena|astro supersport|one sports|true sports|premiere fc|tyc sports|win sports|meridiano|nile sports/.test(n) ||
    region === "Sport Categories" ||
    ["Sport", "Fußball", "Bundesliga", "Champions League", "Premier League", "La Liga", "Serie A", "Ligue 1", "Motorsport", "UFC & Boxen", "NBA", "NFL", "Tennis"].includes(groupTitle)
  ) {
    return "Sport";
  }

  if (
    /news|welt|n-?tv|cnn|cnews|bfm|oe24|ln24|tvn24|ukraine 24|russia 24|cp24|ntn24|channels tv|tvc news|geo news|somoy|cctv news|cna|press tv|al ekhbariya|al jazeera|al arabiya|sky news|euronews|al mayadeen|al mamlaka|anc\b|metro tv/.test(n) ||
    groupTitle === "Nachrichten" ||
    /\bnews\b/i.test(name)
  ) {
    return "Nachrichten";
  }

  if (/tele züri|canal sur|porto canal|local tv|tamazight|sama dubai/.test(n)) {
    return "Regional";
  }

  if (PUBLIC_BROADCASTERS.some((pattern) => pattern.test(name))) {
    return "Öffentlich-rechtliche Sender";
  }

  if (region === "Entertainment" && groupTitle === "Nachrichten") {
    return "Nachrichten";
  }

  return "Allgemeine Sender";
}

function uniqueChannels(channels) {
  const seen = new Set();
  const result = [];
  let duplicates = 0;

  for (const channel of channels) {
    const key = channel.name.toLocaleLowerCase("de-DE");
    if (seen.has(key)) {
      duplicates += 1;
      continue;
    }
    seen.add(key);
    result.push(channel);
  }

  return { channels: result, duplicates };
}

function sortChannels(channels) {
  return [...channels].sort((a, b) => {
    const categoryDiff = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    if (categoryDiff !== 0) {
      return categoryDiff;
    }
    return a.name.localeCompare(b.name, "de-DE");
  });
}

mkdirSync(outDir, { recursive: true });

const meta = [];
const searchIndex = { countries: [] };
let totalChannels = 0;
let totalDuplicates = 0;
const report = [];

for (const entry of sourceCategories) {
  const id = slugify(entry.title);
  const mapped = entry.channels.map((name) => ({
    name,
    category: categorizeChannel(name, entry.title, entry.region),
    verified: true,
  }));

  const { channels, duplicates } = uniqueChannels(mapped);
  const sorted = sortChannels(channels);
  const categories = CATEGORY_ORDER.filter((category) =>
    sorted.some((channel) => channel.category === category),
  );

  const countryData = {
    id,
    name: entry.title,
    region: entry.region,
    channels: sorted,
  };

  writeFileSync(join(outDir, `${id}.json`), `${JSON.stringify(countryData, null, 2)}\n`, "utf8");

  meta.push({
    id,
    name: entry.title,
    region: entry.region,
    channelCount: sorted.length,
    categories,
  });

  searchIndex.countries.push({
    id,
    name: entry.title,
    region: entry.region,
    channelCount: sorted.length,
    categories,
    channels: sorted.map((channel) => channel.name),
  });

  totalChannels += sorted.length;
  totalDuplicates += duplicates;

  report.push({
    name: entry.title,
    id,
    channelCount: sorted.length,
    categories: categories.length,
    reached100: sorted.length >= 100,
    needsMoreData: sorted.length < 100,
  });
}

writeFileSync(join(outDir, "index.json"), `${JSON.stringify({ countries: meta }, null, 2)}\n`, "utf8");
writeFileSync(join(outDir, "search-index.json"), `${JSON.stringify(searchIndex, null, 2)}\n`, "utf8");

const generatedDir = join(root, "lib", "senderliste", "generated");
mkdirSync(generatedDir, { recursive: true });

writeFileSync(
  join(generatedDir, "countries-meta.ts"),
  `import type { SenderCountryMeta } from "@/lib/senderliste/types";\n\nexport const COUNTRIES_META: SenderCountryMeta[] = ${JSON.stringify(meta, null, 2)} as SenderCountryMeta[];\n`,
  "utf8",
);

writeFileSync(
  join(generatedDir, "search-index.ts"),
  `import type { SenderSearchIndex } from "@/lib/senderliste/types";\n\nexport const SENDER_SEARCH_INDEX: SenderSearchIndex = ${JSON.stringify(searchIndex, null, 2)} as SenderSearchIndex;\n`,
  "utf8",
);

const reportPath = join(root, "scripts", "senderliste-data-report.json");
writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      totalUniqueChannelEntries: totalChannels,
      duplicatesRemoved: totalDuplicates,
      countriesUpdated: report.length,
      countriesWith100: report.filter((item) => item.reached100).map((item) => item.name),
      countriesBelow100: report.filter((item) => item.needsMoreData).map((item) => ({
        name: item.name,
        channelCount: item.channelCount,
        categories: item.categories,
      })),
      countries: report,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(`Generated ${report.length} country/category files in ${outDir}`);
console.log(`Total verified unique channel entries: ${totalChannels}`);
console.log(`Duplicates removed: ${totalDuplicates}`);
console.log(`Countries/categories with 100 channels: ${report.filter((item) => item.reached100).length}`);
console.log(`Countries/categories needing more verified data: ${report.filter((item) => item.needsMoreData).length}`);
