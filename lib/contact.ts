export const WHATSAPP_CHAT_URL = "https://wa.me/message/L6KQCBXWOIUTA1";
export const WHATSAPP_PHONE_DISPLAY = "+44 7848-102-124";
export const WHATSAPP_PHONE_E164 = "447848102124";
export const WHATSAPP_SUPPORT_LABEL = "Internationaler WhatsApp-Support auf Deutsch";

export const WHATSAPP_MESSAGES = {
  trial24h:
    "Hallo, ich möchte den 24-Stunden-Test für 3€ bestellen. Bitte senden Sie mir die Zahlungsinformationen.",
  packageHelp:
    "Hallo, ich interessiere mich für ein IPTV-Paket und benötige Hilfe bei der Auswahl.",
  package1Month:
    "Hallo, ich möchte das 1-Monats-Paket für 9,99€ bestellen. Bitte senden Sie mir die Zahlungsinformationen.",
  package3Months:
    "Hallo, ich möchte das 3-Monats-Paket für 19,99€ bestellen. Bitte senden Sie mir die Zahlungsinformationen.",
  package6Months:
    "Hallo, ich möchte das 6-Monats-Paket für 29,99€ bestellen. Bitte senden Sie mir die Zahlungsinformationen.",
  package12Months:
    "Hallo, ich möchte das 12-Monats-Paket für 49,99€ bestellen. Bitte senden Sie mir die Zahlungsinformationen.",
  senderlisteInquiry:
    "Hallo, ich möchte wissen, ob ein bestimmter Sender in Ihrem IPTV-Angebot verfügbar ist.",
} as const;

export function buildSenderlisteCountryInquiryMessage(countryName: string) {
  return `Hallo, ich möchte wissen, ob ein bestimmter Sender aus ${countryName} verfügbar ist.`;
}

export function buildWhatsAppUrl(message?: string): string {
  if (!message) {
    return WHATSAPP_CHAT_URL;
  }

  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(message)}`;
}
