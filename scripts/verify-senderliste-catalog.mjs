import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const idx = JSON.parse(
  readFileSync(join(root, "public/data/senderliste/country-index.json"), "utf8"),
);
const countriesDir = join(root, "public/data/senderliste/countries");
const files = readdirSync(countriesDir).filter((file) => file.endsWith(".json"));

const tests = [
  ["Deutschland", "de"],
  ["Österreich", "at"],
  ["Schweiz", "ch"],
  ["Frankreich", "fr"],
  ["Spanien", "es"],
  ["Portugal", "pt"],
  ["Italien", "it"],
  ["Niederlande", "nl"],
  ["Belgien", "be"],
  ["UK", "uk"],
  ["Türkei", "tr"],
  ["USA", "us"],
  ["Kanada", "ca"],
  ["Brasilien", "br"],
  ["Marokko", "ma"],
  ["Saudi-Arabien", "sa"],
  ["UAE", "ae"],
  ["Indien", "in"],
  ["China", "cn"],
  ["Australien", "au"],
];

for (const [name, code] of tests) {
  const entry = idx.countries.find((item) => item.country_code === code);
  const file = JSON.parse(readFileSync(join(countriesDir, `${code}.json`), "utf8"));
  console.log(
    `${name}: index=${entry.channels_exported} file=${file.channel_count_exported} channels=${file.channels.length}`,
  );
}

let suspicious = 0;
const pattern = /m3u8?|stream_url|password|username|token|credential|xtream|playlist\.m3u/i;
for (const file of files) {
  const text = readFileSync(join(countriesDir, file), "utf8");
  if (pattern.test(text) || text.includes('"website"')) {
    suspicious += 1;
    console.log("suspicious", file);
  }
}

console.log("country files", files.length);
console.log("total exported", idx.total_channels_exported);
console.log("suspicious files", suspicious);
