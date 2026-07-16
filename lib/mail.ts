import nodemailer from "nodemailer";
import { escapeHtml } from "@/lib/contact-form";

export type ContactMailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Europe/Berlin",
  }).format(date);
}

export async function sendContactEmail(payload: ContactMailPayload): Promise<void> {
  const host = requireEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure =
    (process.env.SMTP_SECURE ?? (port === 465 ? "true" : "false")).toLowerCase() ===
    "true";
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASSWORD");
  const from = requireEnv("CONTACT_EMAIL_FROM");
  const to = requireEnv("CONTACT_EMAIL_TO");
  const cc = process.env.CONTACT_EMAIL_CC?.trim();

  if (!Number.isFinite(port) || port <= 0) {
    throw new Error("Invalid SMTP_PORT");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const timestamp = formatTimestamp(new Date());
  const mailSubject = `Neue Kontaktanfrage über iptvkaufenx.de – ${payload.subject}`;

  const text = [
    "Kontaktquelle:",
    "https://iptvkaufenx.de/kontakt",
    "",
    "Vollständiger Name:",
    payload.name,
    "",
    "E-Mail-Adresse:",
    payload.email,
    "",
    "Betreff:",
    payload.subject,
    "",
    "Nachricht:",
    payload.message,
    "",
    "Zeitpunkt:",
    timestamp,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#111;">
      <p><strong>Kontaktquelle:</strong><br />
      <a href="https://iptvkaufenx.de/kontakt">https://iptvkaufenx.de/kontakt</a></p>
      <p><strong>Vollständiger Name:</strong><br />${escapeHtml(payload.name)}</p>
      <p><strong>E-Mail-Adresse:</strong><br />
      <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
      <p><strong>Betreff:</strong><br />${escapeHtml(payload.subject)}</p>
      <p><strong>Nachricht:</strong><br />${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
      <p><strong>Zeitpunkt:</strong><br />${escapeHtml(timestamp)}</p>
    </div>
  `.trim();

  await transporter.sendMail({
    from,
    to,
    ...(cc ? { cc } : {}),
    replyTo: payload.email,
    subject: mailSubject,
    text,
    html,
  });
}
