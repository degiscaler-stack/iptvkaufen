/** @type {import('next').NextConfig} */
const staticAssetCacheControl = "public, max-age=31536000, immutable";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

const nextConfig = {
  poweredByHeader: false,
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
        source: "/preise",
        destination: "/#pakete-start",
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
        source: "/:path*",
        headers: securityHeaders,
      },
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
