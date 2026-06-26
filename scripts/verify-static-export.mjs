import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");

const requiredPaths = [
  "index.html",
  "404.html",
  "_next",
  "blog.html",
  "blog/iptv-smart-tv-einrichten.html",
  "preise.html",
  "faq.html",
  "senderliste.html",
  "kontakt.html",
  "sitemap.xml",
  "robots.txt",
  "feed.xml",
  ".htaccess",
];

if (!existsSync(outDir)) {
  console.error("Static export verification failed: missing out/ directory.");
  console.error("Run npm run build to generate the static export first.");
  process.exit(1);
}

for (const relativePath of requiredPaths) {
  const target = join(outDir, ...relativePath.split("/"));

  if (!existsSync(target)) {
    console.error(`Static export verification failed: missing ${target}`);
    process.exit(1);
  }
}

console.log("Static export verified: out/ is ready for deployment.");
