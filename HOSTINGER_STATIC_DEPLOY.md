# Hostinger Next.js Deployment

- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `.next`
- Start command: `npm start` (runs `next start`)
- Node version: 22.x
- Framework: Next.js

## Build pipeline

1. `scripts/generate-feed.mjs` writes `public/feed.xml`
2. `next build` creates the production build in `.next/`
3. `scripts/verify-static-export.mjs` validates `.next/` and required routes

## Verified routes

- `/`, `/blog`, `/blog/[slug]`, `/preise`, `/senderliste`, `/faq`, `/kontakt`
- `/sitemap.xml`, `/robots.txt`, `/feed.xml`

## Apache

`public/.htaccess` is included for clean URL compatibility where Apache is used in front of the app.
