export const WHATSAPP_CHAT_URL = "https://wa.me/message/E43FQNWDL46AE1";
export const WHATSAPP_PHONE_DISPLAY = "+44 7832 620735";
export const WHATSAPP_PHONE_E164 = "447832620735";
export const PHONE_TEL_HREF = "tel:+447832620735";
export const WHATSAPP_SUPPORT_LABEL = "Internationaler WhatsApp-Support auf Deutsch";

export const WHATSAPP_MESSAGES = {
  trial24h:
    "Hallo, ich möchte den 24-Stunden-Test für 3€ bestellen. Bitte senden Sie mir die Zahlungsinformationen.",
  packageHelp:
    "Hallo, ich interessiere mich für ein IPTV-Paket und benötige Hilfe bei der Auswahl.",
} as const;

export function buildWhatsAppUrl(message?: string): string {
  if (!message) {
    return WHATSAPP_CHAT_URL;
  }
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(message)}`;
}
