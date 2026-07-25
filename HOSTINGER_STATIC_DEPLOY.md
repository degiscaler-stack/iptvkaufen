# Hostinger Next.js Deployment

- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `.next`
- Start command: `npm start` (runs `next start`, uses Hostinger `PORT`)
- Node version: 22.x (Next.js 16 requires Node >= 20.9.0)
- Framework: Next.js

## Build pipeline

1. `scripts/generate-feed.mjs` writes `public/feed.xml`
2. `next build` creates the production build in `.next/`
3. `scripts/verify-static-export.mjs` validates `.next/` and required routes

## Runtime

- Start: `next start` (standard Next.js production server)
- Port: `process.env.PORT` (assigned by Hostinger)
- Do not deploy as static `out/` hosting
- Do not use a custom `server.js` unless Hostinger logs require it
- Live symptom when Node is down: some `/public` assets return 200, HTML routes return LiteSpeed 503

## Verified routes

- `/`, `/blog`, `/blog/[slug]`, `/preise`, `/senderliste`, `/faq`, `/kontakt`
- `/sitemap.xml`, `/robots.txt`, `/feed.xml`

## Apache

`public/.htaccess` must not rewrite unknown paths to `index.html` (that is for static export only). HTML routes are handled by the Node process.
