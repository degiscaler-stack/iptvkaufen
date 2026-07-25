Hostinger Node.js deployment settings:
Install command: npm ci
Build command: npm run build
Output directory: .next
Start command: npm start
Node version: 22.x (required: >= 20.9.0 for Next.js 16)
Environment variables: SMTP_* and CONTACT_EMAIL_* for the contact form only

Important:
- This project is a Next.js Node app (not a static `out/` export).
- `npm start` runs `next start` and uses Hostinger's assigned PORT.
- Do not set the Hostinger output directory to `out`.
- Do not use a custom server.js unless Hostinger runtime logs require it.
- If static files work but HTML routes return 503, the Node process is down or not proxied — restart the Node application in hPanel and check nodejs/stderr.log.
