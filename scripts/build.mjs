import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = join(root, "node_modules", "next", "dist", "bin", "next");
const verifyScript = join(root, "scripts", "verify-static-export.mjs");

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

console.log("Starting Next.js production build for Hostinger...\n");

run("Generate RSS feed", [join(root, "scripts", "generate-feed.mjs")]);
run("Next.js production build", [nextBin, "build"]);
run("Verify production build", [verifyScript]);
