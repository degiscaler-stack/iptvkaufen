/** @type {import('next').NextConfig} */
const staticAssetCacheControl = "public, max-age=31536000, immutable";

const nextConfig = {
  images: {
    unoptimized: true,
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
