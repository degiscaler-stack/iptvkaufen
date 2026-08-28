import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SITE_URL = "https://iptvkaufenx.de";
const CONTENT_DIR = join(process.cwd(), "content", "blog");
const OUTPUT_PATH = join(process.cwd(), "public", "feed.xml");

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getPosts() {
  const files = readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".json"));

  return files
    .map((file) => {
      const raw = readFileSync(join(CONTENT_DIR, file), "utf8");
      return JSON.parse(raw);
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

const posts = getPosts();
const buildDate = new Date().toUTCString();

const items = posts
  .map((post) => {
    const url = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = new Date(post.publishedAt).toUTCString();

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.author.name)}</author>
    </item>`;
  })
  .join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>iptvkaufenX Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>IPTV Guides, Tipps und News für Deutschland</description>
    <language>de-de</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

writeFileSync(OUTPUT_PATH, feed, "utf8");
console.log(`RSS feed generated: ${OUTPUT_PATH} (${posts.length} items)`);
