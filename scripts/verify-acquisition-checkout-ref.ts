import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  SUPPORT_TEST_CONFIRMATION,
  isCheckoutUrl,
  isTestConversationId,
  splitMessageContent,
  withAcquisitionRef,
} from "../lib/support-chat";

const realRef = randomBytes(32).toString("base64url");
const checkoutUrl = "https://degiscaler.com/checkout/starter";
const aiReply = `Willkommen 👋 Perfekt, dein Abo 1 Monat für 1 Gerät kostet 9,99 €. Hier kannst du sicher bezahlen:\n${checkoutUrl}`;

assert.notEqual(aiReply, SUPPORT_TEST_CONFIRMATION);
assert.equal(aiReply.includes("TEST"), false);
assert.equal(isTestConversationId(randomUUID()), false);
assert.equal(isTestConversationId("test_row"), true);

const links = splitMessageContent(aiReply).filter((part) => part.type === "link");
assert.equal(links.length, 1);
const link = links[0];
assert.ok(link && link.type === "link");
assert.equal(isCheckoutUrl(link.href), true);

const href = new URL(withAcquisitionRef(link.href, realRef));
assert.equal(`${href.origin}${href.pathname}`, checkoutUrl);
assert.equal(href.searchParams.get("ref"), realRef);
assert.deepEqual([...href.searchParams.keys()], ["ref"]);

assert.equal(withAcquisitionRef(checkoutUrl, null), checkoutUrl);
assert.equal(withAcquisitionRef("https://iptvkaufenx.de/", realRef), "https://iptvkaufenx.de/");
assert.equal(new URL(withAcquisitionRef("https://www.degiscaler.com/checkout/trial", realRef)).searchParams.get("ref"), realRef);

const widget = readFileSync("components/SupportChatWidget.tsx", "utf8");
assert.equal(widget.includes("withAcquisitionRef(part.href, readAcquisitionCookie())"), true);

console.log("GERMANY_ACQUISITION_CHECKOUT_REF_VERIFICATION_PASSED");
