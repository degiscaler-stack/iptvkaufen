export type ContactFormFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "subject" | "message", string>
>;

export type ContactValidationResult =
  | { ok: true; data: Required<Omit<ContactFormFields, "website">> & { website: string } }
  | { ok: false; errors: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hasHeaderInjection(value: string): boolean {
  return /[\r\n]/.test(value);
}

export function sanitizeSingleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateContactForm(
  input: ContactFormFields,
): ContactValidationResult {
  const errors: ContactFieldErrors = {};
  const website = typeof input.website === "string" ? input.website.trim() : "";

  const name = sanitizeSingleLine(input.name ?? "");
  const email = sanitizeSingleLine(input.email ?? "").toLowerCase();
  const subject = sanitizeSingleLine(input.subject ?? "");
  const message = (input.message ?? "").trim();

  if (name.length < 2) {
    errors.name = "Bitte geben Sie Ihren Namen ein.";
  } else if (name.length > 100 || hasHeaderInjection(input.name ?? "")) {
    errors.name = "Bitte geben Sie einen gültigen Namen ein.";
  }

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  } else if (hasHeaderInjection(input.email ?? "")) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }

  if (subject.length < 3) {
    errors.subject = "Bitte geben Sie einen Betreff ein.";
  } else if (subject.length > 150 || hasHeaderInjection(input.subject ?? "")) {
    errors.subject = "Bitte geben Sie einen gültigen Betreff ein.";
  }

  if (message.length < 10) {
    errors.message = "Bitte beschreiben Sie Ihr Anliegen.";
  } else if (message.length > 5000) {
    errors.message = "Ihre Nachricht ist zu lang (max. 5000 Zeichen).";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: { name, email, subject, message, website },
  };
}
