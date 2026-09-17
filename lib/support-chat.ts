export const SUPPORT_SITE = "GERMANY" as const;
export const SUPPORT_API_BASE = "https://degibot.online";
export const SUPPORT_CONVERSATION_STORAGE_KEY = "iptvkaufenx_support_conversation";
export const SUPPORT_MAX_MESSAGE_LENGTH = 2000;
export const SUPPORT_WELCOME_MESSAGE = "Hallo! Wie können wir Ihnen helfen?";
export const SUPPORT_SEND_ERROR =
  "Die Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut.";
export const SUPPORT_CLOSED_NOTICE =
  "Diese Unterhaltung wurde geschlossen. Sie können eine neue Unterhaltung starten.";
export const SUPPORT_CONTACT_CONFIRMATION =
  "Vielen Dank. Ihre Kontaktdaten wurden an unser Support-Team übermittelt.";
export const SUPPORT_CONTACT_CONSENT_FALLBACK =
  "Mit dem Absenden stimmen Sie zu, dass unser Support Sie zu dieser Anfrage per WhatsApp oder E-Mail kontaktieren darf.";
export const SUPPORT_CONTACT_ERROR =
  "Die Kontaktdaten konnten gerade nicht übermittelt werden. Bitte versuchen Sie es erneut.";

export type SupportSite = typeof SUPPORT_SITE;

export type SupportStatus =
  | "AI_ACTIVE"
  | "AI_THINKING"
  | "WAITING_CUSTOMER"
  | "HUMAN_NEEDED"
  | "HUMAN_ACTIVE"
  | "CLOSED"
  | string;

export type ApiMessageSender = "CUSTOMER" | "AI" | "SUPPORT" | "SYSTEM" | string;

export type WidgetMessageRole = "customer" | "support";

export type SupportChatMessage = {
  id: string;
  role: WidgetMessageRole;
  sender?: ApiMessageSender;
  content: string;
  createdAt: string;
  deliveryStatus?: string;
  presentationDelayMs?: number | null;
  clientRequestId?: string;
  local?: boolean;
  failed?: boolean;
};

export type SupportSendFailure = Error & {
  closed?: boolean;
  httpStatus?: number;
  category?: string;
  conversationId?: string;
};

export type PublicConversation = {
  conversationId: string;
  owner: "AI" | "HUMAN" | string;
  supportStatus: SupportStatus;
  aiPending: boolean;
  aiPaused: boolean;
  supportTyping: boolean;
  supportTypingLabel: string | null;
  lastActivityAt: string;
  humanNeeded: boolean;
  contactRequired: boolean;
  contactSubmitted: boolean;
  contactConsentText: string | null;
  messages: Array<{
    id: string;
    sender: ApiMessageSender;
    content: string;
    createdAt: string;
    deliveryStatus: string;
    presentationDelayMs: number | null;
  }>;
};

export type ChatPostResponse = {
  status?: string;
  conversationId: string;
  reply: string;
  owner: "AI" | "HUMAN" | string;
  supportStatus: SupportStatus;
  aiPending: boolean;
  presentationDelayMs: number;
  aiPaused: boolean;
  humanNeeded: boolean;
  contactRequired: boolean;
  contactSubmitted: boolean;
  contactConsentText: string | null;
};

export type LiveChatEvent = {
  id: string;
  type: string;
  conversationPublicId: string;
  site: string;
  at: string;
  payload?: {
    supportStatus?: SupportStatus;
    owner?: string;
    typing?: boolean;
    messageId?: string;
  };
};

export type ContactPostResult =
  | { ok: true }
  | { ok: false; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function readBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function readStoredConversationId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(SUPPORT_CONVERSATION_STORAGE_KEY);
    const trimmed = value?.trim() ?? "";
    return trimmed && trimmed.length <= 128 ? trimmed : null;
  } catch {
    return null;
  }
}

export function storeConversationId(conversationId: string): void {
  try {
    window.localStorage.setItem(SUPPORT_CONVERSATION_STORAGE_KEY, conversationId);
  } catch {
    // Private mode / blocked storage should not break chat.
  }
}

export function clearStoredConversationId(): void {
  try {
    window.localStorage.removeItem(SUPPORT_CONVERSATION_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function createClientRequestId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `cr-${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 10)}`;
}

export function mapApiMessages(messages: PublicConversation["messages"]): SupportChatMessage[] {
  return messages
    .filter((message) => message.sender !== "SYSTEM" && message.content.trim())
    .map((message) => ({
      id: message.id,
      role: message.sender === "CUSTOMER" ? "customer" : "support",
      sender: message.sender,
      content: message.content,
      createdAt: message.createdAt,
      deliveryStatus: message.deliveryStatus,
      presentationDelayMs: message.presentationDelayMs,
    }));
}

function mapConversationFields(data: Record<string, unknown>, fallbackStatus: SupportStatus) {
  const supportStatus = readString(data.supportStatus) ?? fallbackStatus;
  const humanNeeded = readBoolean(data.humanNeeded) ?? supportStatus === "HUMAN_NEEDED";
  const contactRequired = readBoolean(data.contactRequired) ?? false;
  const contactSubmitted = readBoolean(data.contactSubmitted) ?? false;
  const consent = readString(data.contactConsentText)?.trim() || null;

  return {
    humanNeeded,
    contactRequired,
    contactSubmitted,
    contactConsentText: consent,
    supportStatus,
  };
}

export async function postCustomerMessage(options: {
  message: string;
  conversationId?: string | null;
  clientRequestId: string;
}): Promise<ChatPostResponse> {
  const body: {
    site: SupportSite;
    message: string;
    clientRequestId: string;
    conversationId?: string;
  } = {
    site: SUPPORT_SITE,
    message: options.message,
    clientRequestId: options.clientRequestId,
  };

  if (options.conversationId) {
    body.conversationId = options.conversationId;
  }

  const response = await fetch(`${SUPPORT_API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: unknown = await response.json().catch(() => null);
  const record = isRecord(data) ? data : null;
  const conversationIdFromBody = record && typeof record.conversationId === "string" ? record.conversationId : undefined;
  const failedStatus = record && (record.status === "error" || record.ok === false);
  const accepted =
    Boolean(record && conversationIdFromBody) &&
    !failedStatus &&
    (response.status === 202 || response.ok);

  if (!accepted || !conversationIdFromBody || !record) {
    const error = new Error("send_failed") as SupportSendFailure;
    error.httpStatus = response.status;
    error.category = record && typeof record.category === "string" ? record.category : undefined;
    error.conversationId = conversationIdFromBody;
    const apiError = record && typeof record.error === "string" ? record.error.toLowerCase() : "";
    error.closed = response.status === 400 && (apiError.includes("closed") || apiError.includes("geschlossen"));
    throw error;
  }

  const payload = record;
  const fields = mapConversationFields(payload, readString(payload.supportStatus) ?? "AI_ACTIVE");
  const aiPending =
    readBoolean(payload.aiPending) ?? fields.supportStatus === "AI_THINKING";

  return {
    status: typeof payload.status === "string" ? payload.status : "accepted",
    conversationId: conversationIdFromBody,
    reply: typeof payload.reply === "string" ? payload.reply : "",
    owner: typeof payload.owner === "string" ? payload.owner : "AI",
    supportStatus: fields.supportStatus,
    aiPending,
    presentationDelayMs:
      typeof payload.presentationDelayMs === "number" ? payload.presentationDelayMs : 0,
    aiPaused: Boolean(payload.aiPaused),
    humanNeeded: fields.humanNeeded,
    contactRequired: fields.contactRequired,
    contactSubmitted: fields.contactSubmitted,
    contactConsentText: fields.contactConsentText,
  };
}

export async function loadPublicConversation(
  conversationId: string,
): Promise<PublicConversation> {
  const url = new URL(`${SUPPORT_API_BASE}/api/chat/conversation`);
  url.searchParams.set("site", SUPPORT_SITE);
  url.searchParams.set("conversationId", conversationId);

  const response = await fetch(url.toString(), { method: "GET", cache: "no-store" });
  const data: unknown = await response.json().catch(() => null);

  if (response.status === 404) {
    const error = new Error("not_found") as Error & { notFound?: boolean };
    error.notFound = true;
    throw error;
  }

  if (!response.ok || !isRecord(data) || typeof data.conversationId !== "string") {
    throw new Error("load_failed");
  }

  const messages = Array.isArray(data.messages) ? data.messages : [];
  const fields = mapConversationFields(data, "AI_ACTIVE");
  const aiPending = readBoolean(data.aiPending) ?? fields.supportStatus === "AI_THINKING";

  return {
    conversationId: data.conversationId,
    owner: typeof data.owner === "string" ? data.owner : "AI",
    supportStatus: fields.supportStatus,
    aiPending,
    aiPaused: Boolean(data.aiPaused),
    supportTyping: Boolean(data.supportTyping),
    supportTypingLabel: typeof data.supportTypingLabel === "string" ? data.supportTypingLabel : null,
    lastActivityAt: typeof data.lastActivityAt === "string" ? data.lastActivityAt : new Date().toISOString(),
    humanNeeded: fields.humanNeeded,
    contactRequired: fields.contactRequired,
    contactSubmitted: fields.contactSubmitted,
    contactConsentText: fields.contactConsentText,
    messages: messages.filter(isRecord).map((message) => ({
      id: typeof message.id === "string" ? message.id : "",
      sender: typeof message.sender === "string" ? message.sender : "SUPPORT",
      content: typeof message.content === "string" ? message.content : "",
      createdAt: typeof message.createdAt === "string" ? message.createdAt : new Date().toISOString(),
      deliveryStatus: typeof message.deliveryStatus === "string" ? message.deliveryStatus : "SENT",
      presentationDelayMs:
        typeof message.presentationDelayMs === "number" ? message.presentationDelayMs : null,
    })),
  };
}

export async function postSupportContact(options: {
  conversationId: string;
  whatsapp: string;
  email: string;
  countryCode?: string;
}): Promise<ContactPostResult> {
  const body: {
    site: SupportSite;
    conversationId: string;
    whatsapp: string;
    email: string;
    countryCode?: string;
  } = {
    site: SUPPORT_SITE,
    conversationId: options.conversationId,
    whatsapp: options.whatsapp,
    email: options.email,
  };

  if (options.countryCode) {
    body.countryCode = options.countryCode;
  }

  const response = await fetch(`${SUPPORT_API_BASE}/api/chat/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: unknown = await response.json().catch(() => null);
  const errorCode = isRecord(data) && typeof data.error === "string" ? data.error : "";

  if (response.ok) {
    if (isRecord(data) && (data.status === "error" || data.ok === false)) {
      const failed = typeof data.error === "string" ? data.error : "";
      if (failed.toLowerCase().includes("whatsapp")) {
        return {
          ok: false,
          message: "Bitte geben Sie eine gültige WhatsApp-Nummer im internationalen Format ein.",
        };
      }
      if (failed.toLowerCase().includes("email")) {
        return {
          ok: false,
          message: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        };
      }
      return { ok: false, message: SUPPORT_CONTACT_ERROR };
    }
    return { ok: true };
  }

  if (errorCode.toLowerCase().includes("whatsapp")) {
    return {
      ok: false,
      message: "Bitte geben Sie eine gültige WhatsApp-Nummer im internationalen Format ein.",
    };
  }

  if (errorCode.toLowerCase().includes("email")) {
    return {
      ok: false,
      message: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    };
  }

  return { ok: false, message: SUPPORT_CONTACT_ERROR };
}

export async function postCustomerTyping(options: {
  conversationId: string;
  event: "CUSTOMER_TYPING_START" | "CUSTOMER_TYPING_STOP";
}): Promise<void> {
  await fetch(`${SUPPORT_API_BASE}/api/chat/typing`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      site: SUPPORT_SITE,
      conversationId: options.conversationId,
      event: options.event,
    }),
  }).catch(() => undefined);
}

export async function postReceipts(options: {
  conversationId: string;
  type: "delivered" | "seen";
  messageIds: string[];
}): Promise<void> {
  if (options.messageIds.length === 0) {
    return;
  }

  await fetch(`${SUPPORT_API_BASE}/api/chat/receipts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      site: SUPPORT_SITE,
      conversationId: options.conversationId,
      type: options.type,
      messageIds: options.messageIds.slice(0, 50),
    }),
  }).catch(() => undefined);
}

export function createSupportEventSource(conversationId: string): EventSource {
  const url = new URL(`${SUPPORT_API_BASE}/api/chat/events`);
  url.searchParams.set("site", SUPPORT_SITE);
  url.searchParams.set("conversationId", conversationId);
  return new EventSource(url.toString());
}

export function parseLiveEvent(data: string): LiveChatEvent | null {
  try {
    const parsed: unknown = JSON.parse(data);
    if (!isRecord(parsed) || typeof parsed.type !== "string") {
      return null;
    }

    return {
      id: typeof parsed.id === "string" ? parsed.id : "",
      type: parsed.type,
      conversationPublicId:
        typeof parsed.conversationPublicId === "string" ? parsed.conversationPublicId : "",
      site: typeof parsed.site === "string" ? parsed.site : "",
      at: typeof parsed.at === "string" ? parsed.at : "",
      payload: isRecord(parsed.payload) ? parsed.payload : {},
    };
  } catch {
    return null;
  }
}

export type MessageContentPart =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string };

export function splitMessageContent(content: string): MessageContentPart[] {
  const parts: MessageContentPart[] = [];
  const regex = /(https?:\/\/[^\s<>"'`]+)/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: content.slice(lastIndex, match.index) });
    }

    const raw = match[0];
    const punct = raw.match(/[),.;!?]+$/);
    const core = punct ? raw.slice(0, -punct[0].length) : raw;
    const suffix = punct ? punct[0] : "";

    try {
      const url = new URL(core);
      if (url.protocol === "http:" || url.protocol === "https:") {
        parts.push({ type: "link", value: core, href: url.toString() });
        if (suffix) {
          parts.push({ type: "text", value: suffix });
        }
      } else {
        parts.push({ type: "text", value: raw });
      }
    } catch {
      parts.push({ type: "text", value: raw });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "text", value: content.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: "text", value: content }];
}

export function naturalJitter(minMs: number, maxMs: number): number {
  return Math.round(minMs + Math.random() * Math.max(0, maxMs - minMs));
}

export function typingHoldMsForReply(content: string, liveHuman: boolean): number {
  const length = content.trim().length;

  if (liveHuman) {
    if (length < 80) {
      return naturalJitter(900, 1400);
    }
    if (length < 220) {
      return naturalJitter(1200, 1800);
    }
    return naturalJitter(1600, 2200);
  }

  if (length < 90) {
    return naturalJitter(1900, 2300);
  }
  if (length < 240) {
    return naturalJitter(2200, 3000);
  }
  return naturalJitter(2600, 3600);
}

export function preTypingDelayMs(liveHuman: boolean): number {
  return liveHuman ? naturalJitter(700, 1100) : naturalJitter(1800, 2300);
}

export type CustomerReceiptState = "pending" | "sent" | "delivered" | "seen";

export function customerReceiptState(
  deliveryStatus: string | undefined,
  supportStatus: SupportStatus | null,
  local?: boolean,
): CustomerReceiptState {
  if (local && !deliveryStatus) {
    return "pending";
  }

  const status = (deliveryStatus ?? "SENT").toUpperCase();
  const humanWaiting = supportStatus === "HUMAN_NEEDED";
  const seen = status === "SEEN" || status === "READ";
  const delivered =
    status === "DELIVERED" ||
    status === "PROCESSED" ||
    status === "RECEIVED" ||
    seen;

  if (seen) {
    return "seen";
  }

  if (humanWaiting && !seen) {
    return "sent";
  }

  if (delivered) {
    return "delivered";
  }

  return "sent";
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidSupportEmail(value: string): boolean {
  const email = value.trim();
  return email.length > 3 && email.length <= 254 && EMAIL_PATTERN.test(email) && !/[\r\n]/.test(value);
}

export type DialCountry = {
  iso: string;
  dial: string;
  label: string;
};

export const SUPPORT_DIAL_COUNTRIES: DialCountry[] = [
  { iso: "DE", dial: "+49", label: "Deutschland" },
  { iso: "AT", dial: "+43", label: "Österreich" },
  { iso: "CH", dial: "+41", label: "Schweiz" },
  { iso: "FR", dial: "+33", label: "Frankreich" },
  { iso: "NL", dial: "+31", label: "Niederlande" },
  { iso: "BE", dial: "+32", label: "Belgien" },
  { iso: "IT", dial: "+39", label: "Italien" },
  { iso: "ES", dial: "+34", label: "Spanien" },
  { iso: "PT", dial: "+351", label: "Portugal" },
  { iso: "PL", dial: "+48", label: "Polen" },
  { iso: "TR", dial: "+90", label: "Türkei" },
  { iso: "GB", dial: "+44", label: "Vereinigtes Königreich" },
  { iso: "US", dial: "+1", label: "USA" },
  { iso: "MA", dial: "+212", label: "Marokko" },
  { iso: "DZ", dial: "+213", label: "Algerien" },
  { iso: "TN", dial: "+216", label: "Tunesien" },
  { iso: "EG", dial: "+20", label: "Ägypten" },
  { iso: "AE", dial: "+971", label: "VAE" },
  { iso: "SA", dial: "+966", label: "Saudi-Arabien" },
];

export function buildWhatsAppPayload(input: {
  countryIso: string;
  nationalOrInternational: string;
}): { whatsapp: string; countryCode?: string } | null {
  const country = SUPPORT_DIAL_COUNTRIES.find((item) => item.iso === input.countryIso);
  const raw = input.nationalOrInternational.trim();
  if (!country || !raw) {
    return null;
  }

  if (raw.startsWith("+")) {
    const digits = raw.replace(/[^\d]/g, "");
    if (digits.length < 8 || digits.length > 16) {
      return null;
    }
    return { whatsapp: `+${digits}` };
  }

  const national = raw.replace(/[^\d]/g, "").replace(/^0+/, "");
  if (national.length < 6 || national.length > 14) {
    return null;
  }

  return {
    whatsapp: `${country.dial}${national}`,
    countryCode: country.iso,
  };
}
