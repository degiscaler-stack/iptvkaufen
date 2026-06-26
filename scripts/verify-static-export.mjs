import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = join(root, ".next");
const publicDir = join(root, "public");

const requiredNextPaths = [
  "BUILD_ID",
  "build-manifest.json",
  "routes-manifest.json",
  "server",
  "static",
];

const requiredManifestRoutes = [
  "/page",
  "/blog/page",
  "/blog/[slug]/page",
  "/preise/page",
  "/senderliste/page",
  "/faq/page",
  "/kontakt/page",
  "/sitemap.xml/route",
  "/robots.txt/route",
];

const requiredPublicPaths = ["feed.xml", ".htaccess"];

function assertExists(baseDir, relativePath, label) {
  const target = join(baseDir, ...relativePath.split("/"));

  if (!existsSync(target)) {
    console.error(`Production build verification failed: missing ${label} at ${target}`);
    process.exit(1);
  }
}

if (!existsSync(nextDir)) {
  console.error("Production build verification failed: missing .next directory.");
  console.error("Run npm run build to create the Next.js production build first.");
  process.exit(1);
}

for (const relativePath of requiredNextPaths) {
  assertExists(nextDir, relativePath, ".next artifact");
}

for (const relativePath of requiredPublicPaths) {
  assertExists(publicDir, relativePath, "public asset");
}

const appPathsManifest = join(nextDir, "server", "app-paths-manifest.json");
const manifest = JSON.parse(readFileSync(appPathsManifest, "utf8"));

for (const route of requiredManifestRoutes) {
  if (!(route in manifest)) {
    console.error(
      `Production build verification failed: route manifest entry "${route}" was not found.`,
    );
    process.exit(1);
  }
}

const routesManifest = JSON.parse(
  readFileSync(join(nextDir, "routes-manifest.json"), "utf8"),
);
const hasBlogSlugRoute = routesManifest.dynamicRoutes?.some(
  (route) => route.page === "/blog/[slug]",
);

if (!hasBlogSlugRoute) {
  console.error(
    'Production build verification failed: dynamic route "/blog/[slug]" was not found.',
  );
  process.exit(1);
}

console.log("Production build verified: .next is ready for Hostinger deployment.");
console.log(
  `Checked ${requiredNextPaths.length} .next artifacts, ${requiredManifestRoutes.length} app routes, and public assets.`,
);
