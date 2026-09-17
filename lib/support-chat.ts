export const SUPPORT_SITE = "GERMANY" as const;
export const SUPPORT_API_BASE = "https://degibot.online";
export const SUPPORT_CONVERSATION_STORAGE_KEY = "iptvkaufenx_support_conversation";
export const SUPPORT_MAX_MESSAGE_LENGTH = 2000;
export const SUPPORT_WELCOME_MESSAGE = "Hallo! Wie können wir Ihnen helfen?";
export const SUPPORT_SEND_ERROR =
  "Die Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut.";
export const SUPPORT_CLOSED_NOTICE =
  "Diese Unterhaltung wurde geschlossen. Sie können eine neue Unterhaltung starten.";

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
  content: string;
  createdAt: string;
  deliveryStatus?: string;
  presentationDelayMs?: number | null;
  local?: boolean;
};

export type PublicConversation = {
  conversationId: string;
  owner: "AI" | "HUMAN" | string;
  supportStatus: SupportStatus;
  aiPaused: boolean;
  supportTyping: boolean;
  supportTypingLabel: string | null;
  lastActivityAt: string;
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
  conversationId: string;
  reply: string;
  owner: "AI" | "HUMAN" | string;
  supportStatus: SupportStatus;
  presentationDelayMs: number;
  aiPaused: boolean;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
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

export function mapApiMessages(messages: PublicConversation["messages"]): SupportChatMessage[] {
  return messages
    .filter((message) => message.sender !== "SYSTEM" && message.content.trim())
    .map((message) => ({
      id: message.id,
      role: message.sender === "CUSTOMER" ? "customer" : "support",
      content: message.content,
      createdAt: message.createdAt,
      deliveryStatus: message.deliveryStatus,
      presentationDelayMs: message.presentationDelayMs,
    }));
}

export async function postCustomerMessage(options: {
  message: string;
  conversationId?: string | null;
}): Promise<ChatPostResponse> {
  const body: {
    site: SupportSite;
    message: string;
    conversationId?: string;
  } = {
    site: SUPPORT_SITE,
    message: options.message,
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

  if (!response.ok || !isRecord(data) || typeof data.conversationId !== "string") {
    const closed = response.status === 400;
    const error = new Error("send_failed") as Error & { closed?: boolean };
    error.closed = closed;
    throw error;
  }

  return {
    conversationId: data.conversationId,
    reply: typeof data.reply === "string" ? data.reply : "",
    owner: typeof data.owner === "string" ? data.owner : "AI",
    supportStatus: typeof data.supportStatus === "string" ? data.supportStatus : "AI_ACTIVE",
    presentationDelayMs:
      typeof data.presentationDelayMs === "number" ? data.presentationDelayMs : 0,
    aiPaused: Boolean(data.aiPaused),
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

  return {
    conversationId: data.conversationId,
    owner: typeof data.owner === "string" ? data.owner : "AI",
    supportStatus: typeof data.supportStatus === "string" ? data.supportStatus : "AI_ACTIVE",
    aiPaused: Boolean(data.aiPaused),
    supportTyping: Boolean(data.supportTyping),
    supportTypingLabel: typeof data.supportTypingLabel === "string" ? data.supportTypingLabel : null,
    lastActivityAt: typeof data.lastActivityAt === "string" ? data.lastActivityAt : new Date().toISOString(),
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
