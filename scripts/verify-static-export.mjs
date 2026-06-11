import { existsSync } from "node:fs";
import { join } from "node:path";

const requiredPaths = ["index.html", "404.html", "_next"];

for (const file of requiredPaths) {
  const target = join("out", file);

  if (!existsSync(target)) {
    console.error(`Static export verification failed: missing ${target}`);
    process.exit(1);
  }
}

console.log("Static export verified: out/index.html is ready for deployment.");
