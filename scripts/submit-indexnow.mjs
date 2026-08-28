import { readFileSync } from "node:fs";
import { join } from "node:path";

const HOST = "iptvkaufenx.de";
const INDEXNOW_KEY = "037b68bd3a76abcb468ea18247253713";
const KEY_FILE = join(process.cwd(), "public", `${INDEXNOW_KEY}.txt`);
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const RESPONSE_MESSAGES = {
  200: "Submission accepted.",
  202: "Submission received; key validation pending.",
  400: "Invalid request.",
  403: "Invalid or missing key.",
  422: "URL/key mismatch.",
  429: "Too many requests.",
};

function printUsage() {
  console.error("Usage: npm run indexnow -- <url> [url...]");
  console.error("Example: npm run indexnow -- https://iptvkaufenx.de/ https://iptvkaufenx.de/blog");
}

function loadKey() {
  let keyFromFile;

  try {
    keyFromFile = readFileSync(KEY_FILE, "utf8").trim();
  } catch {
    console.error(`IndexNow key file not found: public/${INDEXNOW_KEY}.txt`);
    process.exit(1);
  }

  if (keyFromFile !== INDEXNOW_KEY) {
    console.error("IndexNow key file content does not match the configured key.");
    process.exit(1);
  }

  return keyFromFile;
}

function normalizeUrl(raw) {
  let parsed;

  try {
    parsed = new URL(raw);
  } catch {
    return { error: `Malformed URL: ${raw}` };
  }

  if (parsed.protocol !== "https:") {
    return { error: `Only HTTPS URLs are allowed: ${raw}` };
  }

  const hostname = parsed.hostname.toLowerCase();

  if (hostname !== HOST && hostname !== `www.${HOST}`) {
    return { error: `URL must belong to ${HOST}: ${raw}` };
  }

  if (parsed.search) {
    return { error: `Query-string URLs are not allowed: ${raw}` };
  }

  if (parsed.hash) {
    return { error: `Hash URLs are not allowed: ${raw}` };
  }

  const pathname = parsed.pathname.endsWith("/") && parsed.pathname !== "/"
    ? parsed.pathname.slice(0, -1)
    : parsed.pathname;

  return { value: `https://${HOST}${pathname || "/"}` };
}

function validateUrls(argv) {
  if (argv.length === 0) {
    printUsage();
    process.exit(1);
  }

  const errors = [];
  const seen = new Set();
  const urlList = [];

  for (const raw of argv) {
    const result = normalizeUrl(raw);

    if (result.error) {
      errors.push(result.error);
      continue;
    }

    if (!seen.has(result.value)) {
      seen.add(result.value);
      urlList.push(result.value);
    }
  }

  if (errors.length > 0) {
    for (const message of errors) {
      console.error(message);
    }
    process.exit(1);
  }

  if (urlList.length === 0) {
    console.error("No valid URLs to submit.");
    process.exit(1);
  }

  return urlList;
}

async function submit(urlList, key) {
  const payload = {
    host: HOST,
    key,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const message = RESPONSE_MESSAGES[response.status] ?? `Unexpected response (${response.status}).`;

  console.log(`IndexNow HTTP ${response.status}: ${message}`);
  console.log(`Submitted ${urlList.length} URL(s):`);
  for (const url of urlList) {
    console.log(`  - ${url}`);
  }

  if (!response.ok && response.status !== 202) {
    process.exit(1);
  }
}

const key = loadKey();
const urlList = validateUrls(process.argv.slice(2));

await submit(urlList, key);
