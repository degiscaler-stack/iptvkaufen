import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const countriesDir = join(root, "public", "data", "senderliste", "countries");

const definitions = [
  ["Deutschland", "Europe", "de"],
  ["Österreich", "Europe", "at"],
  ["Schweiz", "Europe", "ch"],
  ["Frankreich", "Europe", "fr"],
  ["Spanien", "Europe", "es"],
  ["Portugal", "Europe", "pt"],
  ["Italien", "Europe", "it"],
  ["Niederlande", "Europe", "nl"],
  ["Belgien", "Europe", "be"],
  ["UK", "Europe", "uk"],
  ["Irland", "Europe", "ie"],
  ["Polen", "Europe", "pl"],
  ["Türkei", "Europe", "tr"],
  ["Griechenland", "Europe", "gr"],
  ["Rumänien", "Europe", "ro"],
  ["Bulgarien", "Europe", "bg"],
  ["Kroatien", "Europe", "hr"],
  ["Serbien", "Europe", "rs"],
  ["Bosnien", "Europe", "ba"],
  ["Albanien", "Europe", "al"],
  ["Kosovo", "Europe", "xk"],
  ["Nordmazedonien", "Europe", "mk"],
  ["Slowenien", "Europe", "si"],
  ["Tschechien", "Europe", "cz"],
  ["Slowakei", "Europe", "sk"],
  ["Ungarn", "Europe", "hu"],
  ["Ukraine", "Europe", "ua"],
  ["Russland", "Europe", "ru"],
  ["USA", "North America", "us"],
  ["Kanada", "North America", "ca"],
  ["Mexiko", "North America", "mx"],
  ["Brasilien", "South America", "br"],
  ["Argentinien", "South America", "ar"],
  ["Chile", "South America", "cl"],
  ["Kolumbien", "South America", "co"],
  ["Peru", "South America", "pe"],
  ["Uruguay", "South America", "uy"],
  ["Venezuela", "South America", "ve"],
  ["Marokko", "Africa", "ma"],
  ["Algerien", "Africa", "dz"],
  ["Tunesien", "Africa", "tn"],
  ["Ägypten", "Africa", "eg"],
  ["Libyen", "Africa", "ly"],
  ["Senegal", "Africa", "sn"],
  ["Nigeria", "Africa", "ng"],
  ["Ghana", "Africa", "gh"],
  ["Südafrika", "Africa", "za"],
  ["Kamerun", "Africa", "cm"],
  ["Côte d'Ivoire", "Africa", "ci"],
  ["Mali", "Africa", "ml"],
  ["Saudi-Arabien", "Middle East / Arabic", "sa"],
  ["UAE", "Middle East / Arabic", "ae"],
  ["Qatar", "Middle East / Arabic", "qa"],
  ["Kuwait", "Middle East / Arabic", "kw"],
  ["Bahrain", "Middle East / Arabic", "bh"],
  ["Oman", "Middle East / Arabic", "om"],
  ["Jordanien", "Middle East / Arabic", "jo"],
  ["Libanon", "Middle East / Arabic", "lb"],
  ["Irak", "Middle East / Arabic", "iq"],
  ["Syrien", "Middle East / Arabic", "sy"],
  ["Palästina", "Middle East / Arabic", "ps"],
  ["Iran", "Middle East / Arabic", "ir"],
  ["Indien", "Asia", "in"],
  ["Pakistan", "Asia", "pk"],
  ["Afghanistan", "Asia", "af"],
  ["Bangladesch", "Asia", "bd"],
  ["China", "Asia", "cn"],
  ["Japan", "Asia", "jp"],
  ["Korea", "Asia", "kr"],
  ["Thailand", "Asia", "th"],
  ["Philippinen", "Asia", "ph"],
  ["Vietnam", "Asia", "vn"],
  ["Indonesien", "Asia", "id"],
  ["Malaysia", "Asia", "my"],
  ["Singapur", "Asia", "sg"],
  ["Australien", "Oceania", "au"],
  ["Neuseeland", "Oceania", "nz"],
];

const countries = definitions.map(([name, region, code]) => {
  const data = JSON.parse(readFileSync(join(countriesDir, `${code}.json`), "utf8"));

  return {
    code,
    name,
    region,
    count: data.channel_count_exported,
    channels: data.channels.map((channel) => ({
      n: channel.name,
      q: [
        channel.name,
        ...(channel.alt_names || []),
        channel.network || "",
        ...(channel.categories_de || []),
        ...(channel.categories || []),
      ]
        .join(" ")
        .toLocaleLowerCase("de-DE"),
    })),
  };
});

const outPath = join(root, "public", "data", "senderliste", "page-search-index.json");
writeFileSync(outPath, JSON.stringify({ countries }));

const totalChannels = countries.reduce((sum, country) => sum + country.channels.length, 0);
console.log(
  `Wrote page-search-index.json with ${countries.length} countries and ${totalChannels} channel records`,
);
