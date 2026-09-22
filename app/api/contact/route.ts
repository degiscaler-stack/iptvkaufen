import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/contact-form";
import { checkContactRateLimit, getTrustedClientKey } from "@/lib/contact-rate-limit";
import { sendContactEmail } from "@/lib/mail";

export const runtime = "nodejs";

const MAX_CONTACT_BODY_BYTES = 32 * 1024;

class ContactBodyTooLargeError extends Error {
  constructor() {
    super("contact_body_too_large");
    this.name = "ContactBodyTooLargeError";
  }
}

async function readLimitedContactBody(request: Request): Promise<string> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    if (!/^\d+$/.test(declaredLength) || Number(declaredLength) > MAX_CONTACT_BODY_BYTES) {
      throw new ContactBodyTooLargeError();
    }
  }

  if (!request.body) {
    return "";
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    if (!value) {
      continue;
    }
    received += value.byteLength;
    if (received > MAX_CONTACT_BODY_BYTES) {
      await reader.cancel();
      throw new ContactBodyTooLargeError();
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export async function POST(request: Request) {
  try {
    const rate = checkContactRateLimit(getTrustedClientKey(request));
    if (!rate.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Zu viele Anfragen. Bitte warten Sie einen Moment und versuchen Sie es erneut.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSeconds) },
        },
      );
    }

    let body: unknown;
    try {
      const rawBody = await readLimitedContactBody(request);
      body = JSON.parse(rawBody);
    } catch (error) {
      if (error instanceof ContactBodyTooLargeError) {
        return NextResponse.json(
          { ok: false, error: "Ungültige Anfrage." },
          { status: 413 },
        );
      }
      return NextResponse.json(
        { ok: false, error: "Ungültige Anfrage." },
        { status: 400 },
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Ungültige Anfrage." },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;
    const validation = validateContactForm({
      name: typeof payload.name === "string" ? payload.name : "",
      email: typeof payload.email === "string" ? payload.email : "",
      subject: typeof payload.subject === "string" ? payload.subject : "",
      message: typeof payload.message === "string" ? payload.message : "",
      website: typeof payload.website === "string" ? payload.website : "",
    });

    if (!validation.ok) {
      return NextResponse.json(
        { ok: false, errors: validation.errors },
        { status: 400 },
      );
    }

    // Honeypot: silently accept bots without sending mail
    if (validation.data.website) {
      return NextResponse.json({ ok: true });
    }

    await sendContactEmail({
      name: validation.data.name,
      email: validation.data.email,
      subject: validation.data.subject,
      message: validation.data.message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send message", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail oder WhatsApp.",
      },
      { status: 500 },
    );
  }
}
