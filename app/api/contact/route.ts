import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/contact-form";
import { checkContactRateLimit } from "@/lib/contact-rate-limit";
import { sendContactEmail } from "@/lib/mail";

export const runtime = "nodejs";

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  try {
    const rate = checkContactRateLimit(getClientKey(request));
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
      body = await request.json();
    } catch {
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
