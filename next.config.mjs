/** @type {import('next').NextConfig} */
const staticAssetCacheControl = "public, max-age=31536000, immutable";

const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.iptvkaufenx.de" }],
        destination: "https://iptvkaufenx.de/:path*",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/#faq",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: staticAssetCacheControl }],
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: staticAssetCacheControl }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: staticAssetCacheControl }],
      },
      {
        source: "/feed.xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
      },
    ];
  },
};

export default nextConfig;
