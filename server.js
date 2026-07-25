const { createServer } = require("node:http");
const { parse } = require("node:url");
const next = require("next");

const port = Number(process.env.PORT || 3000);
const hostname = "0.0.0.0";

if (!Number.isFinite(port) || port <= 0) {
  console.error("Invalid PORT value:", process.env.PORT);
  process.exit(1);
}

const app = next({
  dev: false,
  hostname,
  port,
});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, hostname, () => {
      console.log(`iptvkaufenX ready on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start Next.js production server:", error);
    process.exit(1);
  });
