export const WHATSAPP_CHAT_URL = "https://wa.me/message/L6KQCBXWOIUTA1";
export const WHATSAPP_PHONE_DISPLAY = "+44 7848-102-124";
export const WHATSAPP_PHONE_E164 = "447848102124";
export const WHATSAPP_SUPPORT_LABEL = "Internationaler WhatsApp-Support auf Deutsch";

export const WHATSAPP_MESSAGES = {
  trial24h:
    "Hallo, ich möchte den 24-Stunden-IPTV-Test für 3€ bestellen.",
  packageHelp:
    "Hallo, ich interessiere mich für ein IPTV-Paket und benötige Hilfe bei der Auswahl.",
  package1Month: "Hallo, ich möchte das 1-Monat-IPTV-Paket für 9,99€ bestellen.",
  package3Months: "Hallo, ich möchte das 3-Monate-IPTV-Paket für 19,99€ bestellen.",
  package6Months: "Hallo, ich möchte das 6-Monate-IPTV-Paket für 29,99€ bestellen.",
  package12Months: "Hallo, ich möchte das 12-Monate-IPTV-Paket für 49,99€ bestellen.",
} as const;

export function buildWhatsAppUrl(message?: string): string {
  if (!message) {
    return WHATSAPP_CHAT_URL;
  }

  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(message)}`;
}
