Hostinger Node.js deployment settings:
Install command: npm ci
Build command: npm run build
Output directory: .next
Start command: npm start
Node version: 22.x
Environment variables: SMTP_* and CONTACT_EMAIL_* for the contact form only

Important:
- This project is a Next.js Node app (not a static `out/` export).
- `npm start` binds to 0.0.0.0 and uses process.env.PORT.
- Do not set the Hostinger output directory to `out`.
