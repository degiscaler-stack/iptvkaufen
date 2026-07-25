# Hostinger Next.js Deployment

- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `.next`
- Start command: `npm start` (runs `next start --hostname 0.0.0.0`, uses `process.env.PORT`)
- Node version: 22.x
- Framework: Next.js

## Build pipeline

1. `scripts/generate-feed.mjs` writes `public/feed.xml`
2. `next build --webpack` creates the production build in `.next/`
3. `scripts/verify-static-export.mjs` validates `.next/` and required routes

## Runtime

- Listen address: `0.0.0.0` (required for Hostinger reverse proxy)
- Port: `process.env.PORT` (Hostinger-assigned), fallback `3000`
- Do not deploy as static `out/` hosting
- Evidence of a down Node process: static files under `/brand` and `/feed.xml` return 200 while HTML routes return LiteSpeed 503

## Verified routes

- `/`, `/blog`, `/blog/[slug]`, `/preise`, `/senderliste`, `/faq`, `/kontakt`
- `/sitemap.xml`, `/robots.txt`, `/feed.xml`

## Apache

`public/.htaccess` is included for clean URL compatibility where Apache is used in front of the app.
