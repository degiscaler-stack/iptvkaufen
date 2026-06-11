# Hostinger Static Deployment

- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `out`
- Start command: not needed for static hosting
- Node version: 20.x or 22.x
- This project uses Next.js static export (`output: "export"`)
- Do not use `next start` or `.next` as the deploy output
- If Node hosting is enabled, `npm start` serves the generated `out` folder
