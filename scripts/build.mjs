import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");
const nextBin = join(root, "node_modules", "next", "dist", "bin", "next");

function run(label, args) {
  console.log(`\n> ${label}`);
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });

  if (result.status !== 0) {
    console.error(`\nBuild step failed (${label}) with exit code ${result.status ?? 1}.`);
    process.exit(result.status ?? 1);
  }
}

function assertExists(relativePath) {
  const target = join(outDir, ...relativePath.split("/"));

  if (!existsSync(target)) {
    console.error(`\nStatic export verification failed: missing ${target}`);
    process.exit(1);
  }
}

function verifyStaticExport() {
  if (!existsSync(outDir)) {
    console.error(
      "\nStatic export verification failed: the out/ directory was not created.",
    );
    console.error(
      "Ensure next.config.mjs sets output: 'export' and that next build completed successfully.",
    );
    process.exit(1);
  }

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

  for (const relativePath of requiredPaths) {
    assertExists(relativePath);
  }

  console.log("\nStatic export verified: out/ is ready for Hostinger deployment.");
  console.log(`Checked ${requiredPaths.length} required paths in ${outDir}`);
}

console.log("Starting static production build for Hostinger...\n");

run("Generate RSS feed", [join(root, "scripts", "generate-feed.mjs")]);
run("Next.js static export", [nextBin, "build", "--webpack"]);
verifyStaticExport();
