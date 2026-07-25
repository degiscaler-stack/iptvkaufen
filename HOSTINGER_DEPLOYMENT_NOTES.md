Hostinger Node.js deployment settings:
Install command: npm ci
Build command: npm run build
Output directory: .next
Start command: npm start
Node version: 22.x (required: >= 20.9.0)
Environment variables: SMTP_* and CONTACT_EMAIL_* for the contact form only

Important:
- This project is a Next.js Node app (not a static `out/` export).
- `npm start` runs `node server.js` and listens on 0.0.0.0:$PORT.
- Do not set the Hostinger output directory to `out`.
- If static files work but HTML routes return 503, restart the Node application in hPanel and confirm Start command is `npm start`.
