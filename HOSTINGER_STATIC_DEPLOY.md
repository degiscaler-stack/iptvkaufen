# Hostinger Static Deployment

- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `out`
- Start command: not needed for static hosting
- Node version: 20.x or 22.x
- This project uses Next.js static export (`output: "export"`)
- Do not use `next start` or `.next` as the deploy output
- Do not run `verify-static-export.mjs` as a separate deploy step; `npm run build` verifies the export automatically

## Build pipeline

1. `scripts/generate-feed.mjs` writes `public/feed.xml`
2. `next build --webpack` generates the static site into `out/`
3. `scripts/build.mjs` verifies required routes exist in `out/`

## Required generated files

- `out/index.html` (homepage)
- `out/blog.html` and `out/blog/*.html` (blog)
- `out/preise.html`, `out/faq.html`, `out/senderliste.html`, `out/kontakt.html`
- `out/sitemap.xml`, `out/robots.txt`, `out/feed.xml`
- `out/.htaccess` (clean URL rewrites for Apache)
