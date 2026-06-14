import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://iptvkaufenx.de/sitemap.xml",
    host: "https://iptvkaufenx.de",
  };
}
