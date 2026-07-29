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
  senderlisteInquiry:
    "Hallo, ich möchte wissen, ob ein bestimmter Sender in Ihrem IPTV-Angebot verfügbar ist.",
} as const;

export function buildSenderlisteCountryInquiryMessage(countryName: string) {
  return `Hallo, ich möchte wissen, ob ein bestimmter Sender aus ${countryName} verfügbar ist.`;
}

export function buildWhatsAppUrl(_message?: string): string {
  return WHATSAPP_CHAT_URL;
}
