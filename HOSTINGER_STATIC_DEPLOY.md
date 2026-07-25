# Hostinger Next.js Deployment

- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `.next`
- Start command: `npm start` (runs `node server.js`, binds `0.0.0.0` + `process.env.PORT`)
- Node version: 22.x (Next.js 16 requires Node >= 20.9.0)
- Framework: Next.js

## Build pipeline

1. `scripts/generate-feed.mjs` writes `public/feed.xml`
2. `next build --webpack` creates the production build in `.next/`
3. `scripts/verify-static-export.mjs` validates `.next/` and required routes

## Runtime

- Entry file: `server.js` (Hostinger-compatible production listener)
- Listen address: `0.0.0.0`
- Port: `process.env.PORT`
- Do not deploy as static `out/` hosting
- Live symptom when Node is down: `/brand/*` and `/feed.xml` return 200, HTML routes return LiteSpeed 503

## Verified routes

- `/`, `/blog`, `/blog/[slug]`, `/preise`, `/senderliste`, `/faq`, `/kontakt`
- `/sitemap.xml`, `/robots.txt`, `/feed.xml`

## Apache

`public/.htaccess` is included for clean URL compatibility where Apache is used in front of the app.
