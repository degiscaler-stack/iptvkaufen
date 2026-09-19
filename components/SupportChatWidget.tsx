"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { HiChatBubbleLeftRight, HiPaperAirplane, HiXMark } from "react-icons/hi2";
import {
  SUPPORT_CLOSED_NOTICE,
  SUPPORT_CONTACT_CONFIRMATION,
  SUPPORT_CONTACT_CONSENT_FALLBACK,
  SUPPORT_DIAL_COUNTRIES,
  SUPPORT_IMAGE_ACCEPT,
  SUPPORT_IMAGE_SEND_ERROR,
  SUPPORT_MAX_MESSAGE_LENGTH,
  SUPPORT_SEND_ERROR,
  SUPPORT_WELCOME_MESSAGE,
  buildWhatsAppPayload,
  clearStoredConversationId,
  createClientRequestId,
  createSupportEventSource,
  customerReceiptState,
  isCheckoutUrl,
  isValidSupportEmail,
  loadPublicConversation,
  mapApiMessages,
  parseLiveEvent,
  postCustomerMessage,
  postCustomerTyping,
  postReceipts,
  postSupportContact,
  preTypingDelayMs,
  readStoredConversationId,
  revokeBlobUrl,
  splitMessageContent,
  storeConversationId,
  trackPaymentLinkClick,
  typingHoldMsForReply,
  validateCustomerImageFile,
  type PublicConversation,
  type SupportChatMessage,
  type SupportSendFailure,
  type SupportStatus,
} from "@/lib/support-chat";

const WELCOME_MESSAGE: SupportChatMessage = {
  id: "__welcome__",
  role: "support",
  content: SUPPORT_WELCOME_MESSAGE,
  createdAt: "",
  local: true,
};

const AI_PRESENTATION_QUIET_MS = 2000;

const PUBLIC_SSE_EVENTS = [
  "message.ai",
  "message.human",
  "typing.support",
  "conversation.closed",
  "conversation.reopened",
  "human.takeover",
  "human.return_to_ai",
] as const;

function messageHasImage(message: SupportChatMessage): boolean {
  return Boolean(message.localPreviewUrl) || (message.attachments?.some((item) => item.kind === "image") ?? false);
}

function localMatchesIncoming(local: SupportChatMessage, incoming: SupportChatMessage): boolean {
  if (incoming.role !== local.role) {
    return false;
  }

  if (local.clientRequestId && incoming.clientRequestId && local.clientRequestId === incoming.clientRequestId) {
    return true;
  }

  if (incoming.content !== local.content) {
    return false;
  }

  const localImage = messageHasImage(local);
  const incomingImage = messageHasImage(incoming);
  if (localImage || incomingImage) {
    return localImage && incomingImage;
  }

  return true;
}

function mergeMessages(
  current: SupportChatMessage[],
  incoming: SupportChatMessage[],
): SupportChatMessage[] {
  const byId = new Map<string, SupportChatMessage>();

  for (const message of current) {
    if (!message.local) {
      byId.set(message.id, message);
    }
  }

  for (const message of incoming) {
    byId.set(message.id, message);
  }

  const locals = current.filter((message) => {
    if (!message.local || message.id === WELCOME_MESSAGE.id) {
      return false;
    }

    return !incoming.some((item) => localMatchesIncoming(message, item));
  });

  return [...Array.from(byId.values()).sort((a, b) => a.createdAt.localeCompare(b.createdAt)), ...locals];
}

function formatMessageTime(iso: string): string {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function presenceForStatus(status: SupportStatus | null, closed: boolean) {
  if (closed) {
    return { label: "Geschlossen", tone: "idle" as const };
  }
  if (status === "HUMAN_NEEDED") {
    return { label: "An Support weitergeleitet", tone: "pending" as const };
  }
  if (status === "HUMAN_ACTIVE") {
    return { label: "Support aktiv", tone: "online" as const };
  }
  return { label: "Online", tone: "online" as const };
}

function MessageBody({
  content,
  className,
  onCheckoutLinkClick,
}: {
  content: string;
  className: string;
  onCheckoutLinkClick?: (url: string) => void;
}) {
  const parts = splitMessageContent(content);

  return (
    <p className={className}>
      {parts.map((part, index) => {
        if (part.type === "link") {
          const trackCheckout = Boolean(onCheckoutLinkClick && isCheckoutUrl(part.href));
          return (
            <a
              key={`${part.href}-${index}`}
              href={part.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCheckout ? () => onCheckoutLinkClick?.(part.href) : undefined}
            >
              {part.value}
            </a>
          );
        }

        if (part.type === "bold") {
          return <strong key={`bold-${index}`}>{part.value}</strong>;
        }

        return <span key={`text-${index}`}>{part.value}</span>;
      })}
    </p>
  );
}

function PaperclipIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function MessageAttachments({
  message,
  isCustomer,
  onOpen,
}: {
  message: SupportChatMessage;
  isCustomer: boolean;
  onOpen: (url: string) => void;
}) {
  const urls = (message.attachments ?? [])
    .filter((attachment) => attachment.kind === "image" && attachment.url)
    .map((attachment) => attachment.url);
  const previewUrls = urls.length > 0 ? urls : message.localPreviewUrl ? [message.localPreviewUrl] : [];

  if (previewUrls.length === 0) {
    return null;
  }

  return (
    <div className={message.content.trim() ? "mb-2 flex flex-col gap-2" : "flex flex-col gap-2"}>
      {previewUrls.map((url) => (
        <button
          key={url}
          type="button"
          onClick={() => onOpen(url)}
          className={`block max-w-full overflow-hidden rounded-xl border p-0 text-left ${
            isCustomer ? "border-black/10 bg-black/10" : "border-white/10 bg-black/30"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Angehängtes Bild"
            className="block h-auto max-h-44 w-auto max-w-full object-contain"
          />
        </button>
      ))}
    </div>
  );
}

function ImageLightbox({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Bildvorschau"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:border-[#A6FF00]/50 hover:text-[#A6FF00]"
        aria-label="Vorschau schließen"
      >
        <HiXMark className="h-5 w-5" aria-hidden="true" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt="Bildvorschau"
        className="max-h-[85vh] max-w-[min(92vw,720px)] object-contain"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

type SupportContactFormProps = {
  consentText: string;
  selectedDial: string;
  country: string;
  phone: string;
  email: string;
  error: string | null;
  sending: boolean;
  onCountryChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onFocusField: () => void;
  onBlurField: () => void;
  onSubmit: (event: FormEvent) => void;
};

const SupportContactForm = memo(function SupportContactForm({
  consentText,
  selectedDial,
  country,
  phone,
  email,
  error,
  sending,
  onCountryChange,
  onPhoneChange,
  onEmailChange,
  onFocusField,
  onBlurField,
  onSubmit,
}: SupportContactFormProps) {
  const stopComposerCapture = (event: KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <form
      id="support-contact-form"
      onSubmit={onSubmit}
      onFocusCapture={onFocusField}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && event.currentTarget.contains(next)) {
          return;
        }
        onBlurField();
      }}
      onKeyDown={stopComposerCapture}
      className="rounded-2xl border border-white/10 bg-[#111111] px-3 py-3"
    >
      <p className="text-sm font-medium text-white">Kontakt für den Support</p>
      <p className="mt-1 text-xs text-[#A3A3A3]">
        Internationales Format, z. B. {selectedDial} 151 23456789
      </p>

      <label className="mt-3 block text-xs text-[#C8C8C8]" htmlFor="support-contact-phone">
        WhatsApp-Nummer
      </label>
      <div className="mt-1 flex min-w-0 gap-2">
        <select
          value={country}
          onChange={(event) => onCountryChange(event.target.value)}
          aria-label="Ländervorwahl"
          className="h-11 max-w-[7.5rem] shrink-0 rounded-xl border border-white/10 bg-[#0A0A0A] px-2 text-xs text-white outline-none focus-visible:border-[#A6FF00]/50"
        >
          {SUPPORT_DIAL_COUNTRIES.map((item) => (
            <option key={item.iso} value={item.iso}>
              {item.iso} {item.dial}
            </option>
          ))}
        </select>
        <input
          id="support-contact-phone"
          name="support-contact-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          autoFocus={false}
          value={phone}
          onChange={(event) => onPhoneChange(event.target.value)}
          placeholder="151 23456789"
          className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0A0A0A] px-3 text-sm text-white outline-none placeholder:text-[#7A7A7A] focus-visible:border-[#A6FF00]/50"
        />
      </div>

      <label className="mt-3 block text-xs text-[#C8C8C8]" htmlFor="support-contact-email">
        E-Mail-Adresse
      </label>
      <input
        id="support-contact-email"
        name="support-contact-email"
        type="email"
        autoComplete="email"
        autoFocus={false}
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
        placeholder="name@email.de"
        className="mt-1 h-11 w-full min-w-0 rounded-xl border border-white/10 bg-[#0A0A0A] px-3 text-sm text-white outline-none placeholder:text-[#7A7A7A] focus-visible:border-[#A6FF00]/50"
      />

      <p className="mt-3 text-[11px] leading-relaxed text-[#8A8A8A]">{consentText}</p>

      {error ? (
        <p className="mt-2 text-xs text-[#FFB4B4]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#A6FF00] px-4 text-sm font-semibold text-black transition hover:bg-[#B8FF4D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {sending ? "Wird übermittelt…" : "Kontaktdaten senden"}
      </button>
    </form>
  );
});

function DeliveryChecks({ state }: { state: ReturnType<typeof customerReceiptState> }) {
  if (state === "pending") {
    return (
      <span className="ml-1 text-[10px] text-black/45" aria-label="Wird gesendet">
        ·
      </span>
    );
  }

  const seen = state === "seen";
  const double = state === "delivered" || seen;
  const color = seen ? "text-[#1D4ED8]" : "text-black/55";

  return (
    <span className={`ml-0.5 inline-flex items-center text-[11px] leading-none ${color}`} aria-hidden="true">
      {double ? "✓✓" : "✓"}
    </span>
  );
}

function SupportAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "md" ? "h-10 w-10 text-[11px]" : "h-7 w-7 text-[9px]";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-[#A6FF00]/35 bg-[#111111] font-semibold tracking-wide text-[#A6FF00] ${dim}`}
      aria-hidden="true"
    >
      KS
    </span>
  );
}

export default function SupportChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<SupportChatMessage[]>([WELCOME_MESSAGE]);
  const [hiddenSupportIds, setHiddenSupportIds] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [owner, setOwner] = useState<"AI" | "HUMAN" | string>("AI");
  const [supportStatus, setSupportStatus] = useState<SupportStatus | null>(null);
  const [supportTyping, setSupportTyping] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [keyboardInset, setKeyboardInset] = useState(0);
  const [eventStreamKey, setEventStreamKey] = useState(0);
  const [humanNeeded, setHumanNeeded] = useState(false);
  const [contactRequired, setContactRequired] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactConsentText, setContactConsentText] = useState<string | null>(null);
  const [contactCountry, setContactCountry] = useState("DE");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSending, setContactSending] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreviewUrl, setPendingPreviewUrl] = useState<string | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const conversationIdRef = useRef<string | null>(null);
  const ownerRef = useRef<"AI" | "HUMAN" | string>("AI");
  const openRef = useRef(false);
  const messagesRef = useRef(messages);
  const hiddenSupportIdsRef = useRef<string[]>([]);
  const stickToBottomRef = useRef(true);
  const deliveredRef = useRef<Set<string>>(new Set());
  const seenRef = useRef<Set<string>>(new Set());
  const typingStartedRef = useRef(false);
  const typingStopTimerRef = useRef<number | null>(null);
  const pollTimerRef = useRef<number | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);
  const revealTimersRef = useRef<number[]>([]);
  const queuedRevealIdsRef = useRef<Set<string>>(new Set());
  const lastCustomerSentAtRef = useRef(0);
  const expectingReplyRef = useRef(false);
  const sendEpochRef = useRef(0);
  const supportStatusRef = useRef<SupportStatus | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pendingPreviewUrlRef = useRef<string | null>(null);
  const panelWasOpenRef = useRef(false);
  const contactFieldFocusedRef = useRef(false);
  const contactPhoneRef = useRef("");
  const contactEmailRef = useRef("");
  const refreshRef = useRef<(id: string, delayNewSupport?: boolean) => Promise<PublicConversation | null>>(
    async () => null,
  );

  const closed = supportStatus === "CLOSED";
  const visibleMessages = useMemo(() => {
    if (hiddenSupportIds.length === 0) {
      return messages;
    }
    const hiddenIdSet = new Set(hiddenSupportIds);
    return messages.filter((message) => !hiddenIdSet.has(message.id));
  }, [messages, hiddenSupportIds]);
  const presence = presenceForStatus(supportStatus, closed);
  const selectedDial = SUPPORT_DIAL_COUNTRIES.find((item) => item.iso === contactCountry)?.dial ?? "+49";
  const hasUnsentContactDraft = Boolean(contactPhone.trim() || contactEmail.trim());
  const showContactForm =
    !closed &&
    !contactSubmitted &&
    Boolean(conversationId) &&
    hiddenSupportIds.length === 0 &&
    (contactRequired || hasUnsentContactDraft);
  const showContactConfirmation = contactSubmitted;

  const scheduleTimer = (fn: () => void, delay: number) => {
    const timer = window.setTimeout(fn, Math.max(0, delay));
    revealTimersRef.current.push(timer);
    return timer;
  };

  const syncTypingIndicator = useCallback((backendTyping = false) => {
    const status = supportStatusRef.current;
    const ownerNow = ownerRef.current;

    if (status === "HUMAN_NEEDED" || status === "CLOSED") {
      expectingReplyRef.current = false;
      setSupportTyping(false);
      return;
    }

    const waitingReveal = hiddenSupportIdsRef.current.length > 0;
    const humanOwned = ownerNow === "HUMAN" || status === "HUMAN_ACTIVE";
    const waitingForCustomer = status === "WAITING_CUSTOMER";
    const quietMs = humanOwned ? 700 : AI_PRESENTATION_QUIET_MS;
    const waitingForNaturalStart =
      !humanOwned &&
      !waitingForCustomer &&
      expectingReplyRef.current &&
      Date.now() - lastCustomerSentAtRef.current < quietMs;

    if (waitingForCustomer) {
      expectingReplyRef.current = false;
      setSupportTyping(waitingReveal || backendTyping);
      return;
    }

    if (humanOwned) {
      setSupportTyping(waitingReveal || backendTyping);
      return;
    }

    setSupportTyping((waitingReveal || backendTyping || expectingReplyRef.current) && !waitingForNaturalStart);
  }, []);

  const queueSupportReveal = useCallback(
    (message: SupportChatMessage) => {
      if (
        message.role !== "support" ||
        message.local ||
        queuedRevealIdsRef.current.has(message.id) ||
        hiddenSupportIdsRef.current.includes(message.id)
      ) {
        return;
      }

      queuedRevealIdsRef.current.add(message.id);
      hiddenSupportIdsRef.current = [...hiddenSupportIdsRef.current, message.id];
      setHiddenSupportIds(hiddenSupportIdsRef.current);

      const status = supportStatusRef.current;
      const liveHuman =
        ownerRef.current === "HUMAN" ||
        status === "HUMAN_ACTIVE" ||
        message.sender === "SUPPORT";
      const presentationDelay =
        typeof message.presentationDelayMs === "number" && message.presentationDelayMs > 0
          ? message.presentationDelayMs
          : 0;
      const preDelay = liveHuman ? preTypingDelayMs(true) : AI_PRESENTATION_QUIET_MS;
      const hold = Math.max(typingHoldMsForReply(message.content, liveHuman), presentationDelay);
      const sinceSend = lastCustomerSentAtRef.current
        ? Date.now() - lastCustomerSentAtRef.current
        : Number.POSITIVE_INFINITY;
      const tiedToRecentSend = Number.isFinite(sinceSend) && sinceSend < 20000;
      const waitBeforeTyping = tiedToRecentSend ? Math.max(0, preDelay - sinceSend) : liveHuman ? 400 : 800;
      const revealWait = tiedToRecentSend
        ? Math.max(0, preDelay + hold - sinceSend, presentationDelay)
        : waitBeforeTyping + hold;

      if (status === "HUMAN_NEEDED") {
        scheduleTimer(() => {
          hiddenSupportIdsRef.current = hiddenSupportIdsRef.current.filter((id) => id !== message.id);
          setHiddenSupportIds([...hiddenSupportIdsRef.current]);
          expectingReplyRef.current = false;
          setSupportTyping(false);
        }, presentationDelay);
        return;
      }

      scheduleTimer(() => {
        if (supportStatusRef.current === "HUMAN_NEEDED") {
          return;
        }
        expectingReplyRef.current = false;
        syncTypingIndicator(false);
        setSupportTyping(true);
      }, waitBeforeTyping);

      scheduleTimer(() => {
        hiddenSupportIdsRef.current = hiddenSupportIdsRef.current.filter((id) => id !== message.id);
        setHiddenSupportIds([...hiddenSupportIdsRef.current]);
        expectingReplyRef.current = false;
        if (hiddenSupportIdsRef.current.length === 0 || supportStatusRef.current === "HUMAN_NEEDED") {
          setSupportTyping(false);
        }
      }, Math.max(waitBeforeTyping + 160, revealWait));
    },
    [syncTypingIndicator],
  );

  const applyConversation = useCallback(
    (conversation: PublicConversation, options?: { delayNewSupport?: boolean }) => {
      const mapped = mapApiMessages(conversation.messages);
      const previousIds = new Set(messagesRef.current.filter((item) => !item.local).map((item) => item.id));
      const humanNeededNow = conversation.humanNeeded || conversation.supportStatus === "HUMAN_NEEDED";
      const humanOwned = conversation.owner === "HUMAN";

      setConversationId(conversation.conversationId);
      conversationIdRef.current = conversation.conversationId;
      storeConversationId(conversation.conversationId);
      setOwner(conversation.owner);
      ownerRef.current = conversation.owner;
      setSupportStatus(conversation.supportStatus);
      supportStatusRef.current = conversation.supportStatus;
      setHumanNeeded(humanNeededNow);
      setContactRequired(conversation.contactRequired);
      if (conversation.contactSubmitted) {
        setContactSubmitted(true);
      }
      if (conversation.contactConsentText) {
        setContactConsentText(conversation.contactConsentText);
      }

      const replyPending =
        conversation.aiPending || conversation.supportStatus === "AI_THINKING";
      const waitingForCustomer = conversation.supportStatus === "WAITING_CUSTOMER";

      if (humanNeededNow || humanOwned || waitingForCustomer || !replyPending) {
        expectingReplyRef.current = false;
      } else {
        expectingReplyRef.current = true;
      }

      if (humanNeededNow) {
        hiddenSupportIdsRef.current = [];
        setHiddenSupportIds([]);
        setSupportTyping(false);
      } else if (options?.delayNewSupport) {
        for (const message of mapped) {
          if (message.role === "support" && !previousIds.has(message.id)) {
            queueSupportReveal(message);
          }
        }
      }

      const merged = mergeMessages(messagesRef.current, mapped);
      const keptPreviewUrls = new Set(
        merged.map((item) => item.localPreviewUrl).filter((url): url is string => Boolean(url)),
      );
      for (const previous of messagesRef.current) {
        if (previous.localPreviewUrl && !keptPreviewUrls.has(previous.localPreviewUrl)) {
          revokeBlobUrl(previous.localPreviewUrl);
        }
      }
      setMessages(merged.length > 0 ? merged : [WELCOME_MESSAGE]);

      syncTypingIndicator(
        conversation.supportTyping ||
          conversation.aiPending ||
          conversation.supportStatus === "AI_THINKING",
      );

      if (!openRef.current && previousIds.size > 0) {
        const newSupportCount = mapped.filter(
          (message) => message.role === "support" && !previousIds.has(message.id),
        ).length;
        if (newSupportCount > 0) {
          setUnreadCount((count) => count + newSupportCount);
        }
      }
    },
    [queueSupportReveal, syncTypingIndicator],
  );

  const refreshConversation = useCallback(
    async (id: string, delayNewSupport = false) => {
      try {
        const conversation = await loadPublicConversation(id);
        applyConversation(conversation, { delayNewSupport });
        return conversation;
      } catch (error) {
        if ((error as { notFound?: boolean }).notFound) {
          clearStoredConversationId();
          conversationIdRef.current = null;
          setConversationId(null);
          setSupportStatus(null);
          supportStatusRef.current = null;
          setOwner("AI");
          ownerRef.current = "AI";
          setMessages([WELCOME_MESSAGE]);
          setHiddenSupportIds([]);
          hiddenSupportIdsRef.current = [];
          setHumanNeeded(false);
          setContactRequired(false);
          setContactSubmitted(false);
        }
        return null;
      }
    },
    [applyConversation],
  );

  refreshRef.current = refreshConversation;

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      window.clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  const startPolling = useCallback(() => {
    if (pollTimerRef.current || !conversationIdRef.current) {
      return;
    }

    pollTimerRef.current = window.setInterval(() => {
      const id = conversationIdRef.current;
      if (id) {
        void refreshRef.current(id, true);
      }
    }, 8000);
  }, []);

  const disconnectEvents = useCallback(() => {
    eventSourceRef.current?.close();
    eventSourceRef.current = null;
    if (reconnectTimerRef.current) {
      window.clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    conversationIdRef.current = conversationId;
    ownerRef.current = owner;
    messagesRef.current = messages;
    openRef.current = open;
    supportStatusRef.current = supportStatus;
  }, [conversationId, owner, messages, open, supportStatus]);

  useEffect(() => {
    const stored = readStoredConversationId();
    if (!stored) {
      return;
    }

    void refreshRef.current(stored, false);
  }, []);

  useEffect(() => {
    if (!conversationId) {
      disconnectEvents();
      stopPolling();
      return;
    }

    disconnectEvents();
    const source = createSupportEventSource(conversationId);
    eventSourceRef.current = source;

    const onPayload = (raw: string) => {
      const event = parseLiveEvent(raw);
      if (!event || event.conversationPublicId !== conversationIdRef.current) {
        return;
      }

      if (event.type === "typing.support") {
        syncTypingIndicator(Boolean(event.payload?.typing));
        return;
      }

      if (event.type === "conversation.closed") {
        setSupportStatus("CLOSED");
        supportStatusRef.current = "CLOSED";
        setSupportTyping(false);
        expectingReplyRef.current = false;
        void refreshRef.current(conversationId, false);
        return;
      }

      if (typeof event.payload?.owner === "string") {
        setOwner(event.payload.owner);
        ownerRef.current = event.payload.owner;
      }

      if (typeof event.payload?.supportStatus === "string") {
        setSupportStatus(event.payload.supportStatus);
        supportStatusRef.current = event.payload.supportStatus;
        if (event.payload.supportStatus === "HUMAN_NEEDED") {
          expectingReplyRef.current = false;
          hiddenSupportIdsRef.current = [];
          setHiddenSupportIds([]);
          setSupportTyping(false);
          setHumanNeeded(true);
        }
      }

      if (
        event.type === "conversation.reopened" ||
        event.type === "message.ai" ||
        event.type === "message.human" ||
        event.type === "human.takeover" ||
        event.type === "human.return_to_ai"
      ) {
        const delayNewSupport =
          event.type.startsWith("message.") && supportStatusRef.current !== "HUMAN_NEEDED";
        void refreshRef.current(conversationId, delayNewSupport);
      }
    };

    for (const eventName of PUBLIC_SSE_EVENTS) {
      source.addEventListener(eventName, (messageEvent) => {
        onPayload((messageEvent as MessageEvent<string>).data);
      });
    }

    source.onopen = () => {
      stopPolling();
    };

    source.onerror = () => {
      source.close();
      if (eventSourceRef.current === source) {
        eventSourceRef.current = null;
      }
      startPolling();
      reconnectTimerRef.current = window.setTimeout(() => {
        if (conversationIdRef.current === conversationId) {
          setEventStreamKey((value) => value + 1);
        }
      }, 4000);
    };

    return () => {
      source.close();
      if (eventSourceRef.current === source) {
        eventSourceRef.current = null;
      }
    };
  }, [conversationId, eventStreamKey, disconnectEvents, startPolling, stopPolling, syncTypingIndicator]);

  useEffect(() => {
    return () => {
      disconnectEvents();
      stopPolling();
      revealTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      if (typingStopTimerRef.current) {
        window.clearTimeout(typingStopTimerRef.current);
      }
      revokeBlobUrl(pendingPreviewUrlRef.current);
      for (const message of messagesRef.current) {
        revokeBlobUrl(message.localPreviewUrl);
      }
    };
  }, [disconnectEvents, stopPolling]);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) {
      return;
    }

    const update = () => {
      setKeyboardInset(Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop));
    };

    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (lightboxUrl) {
        setLightboxUrl(null);
        return;
      }

      if (openRef.current) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxUrl]);

  const scrollToBottomIfNeeded = useCallback((smooth = true) => {
    const node = listRef.current;
    if (!node || !stickToBottomRef.current) {
      return;
    }

    node.scrollTo({
      top: node.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  useEffect(() => {
    scrollToBottomIfNeeded(true);
  }, [visibleMessages, supportTyping, open, showContactForm, showContactConfirmation, scrollToBottomIfNeeded]);

  useEffect(() => {
    if (!open) {
      panelWasOpenRef.current = false;
      return;
    }

    setUnreadCount(0);

    if (panelWasOpenRef.current) {
      return;
    }

    panelWasOpenRef.current = true;

    if (contactFieldFocusedRef.current || document.getElementById("support-contact-form")) {
      return;
    }

    composerRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const id = conversationIdRef.current;
    const supportIds = messagesRef.current
      .filter((message) => message.role === "support" && !message.local && !hiddenSupportIdsRef.current.includes(message.id))
      .map((message) => message.id);

    if (id && supportIds.length > 0) {
      const delivered = supportIds.filter((messageId) => !deliveredRef.current.has(messageId));
      const seen = supportIds.filter((messageId) => !seenRef.current.has(messageId));

      if (delivered.length > 0) {
        delivered.forEach((messageId) => deliveredRef.current.add(messageId));
        void postReceipts({ conversationId: id, type: "delivered", messageIds: delivered });
      }

      if (seen.length > 0) {
        seen.forEach((messageId) => seenRef.current.add(messageId));
        void postReceipts({ conversationId: id, type: "seen", messageIds: seen });
      }
    }
  }, [open, visibleMessages]);

  const sendTypingStop = useCallback(() => {
    const id = conversationIdRef.current;
    if (!id || !typingStartedRef.current) {
      return;
    }

    typingStartedRef.current = false;
    void postCustomerTyping({ conversationId: id, event: "CUSTOMER_TYPING_STOP" });
  }, []);

  const handleDraftChange = (value: string) => {
    setDraft(value);
    const id = conversationIdRef.current;
    if (!id || closed) {
      return;
    }

    if (value.trim() && !typingStartedRef.current) {
      typingStartedRef.current = true;
      void postCustomerTyping({ conversationId: id, event: "CUSTOMER_TYPING_START" });
    }

    if (typingStopTimerRef.current) {
      window.clearTimeout(typingStopTimerRef.current);
    }

    typingStopTimerRef.current = window.setTimeout(() => {
      sendTypingStop();
    }, 1600);
  };

  const clearPendingImage = (revoke = true) => {
    if (revoke) {
      revokeBlobUrl(pendingPreviewUrlRef.current);
    }
    pendingPreviewUrlRef.current = null;
    setPendingPreviewUrl(null);
    setPendingFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageSelect = (file: File | undefined) => {
    if (!file || closed) {
      return;
    }

    const validation = validateCustomerImageFile(file);
    if (!validation.ok) {
      setSendError(validation.message);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setSendError(null);
    revokeBlobUrl(pendingPreviewUrlRef.current);
    const previewUrl = URL.createObjectURL(file);
    pendingPreviewUrlRef.current = previewUrl;
    setPendingPreviewUrl(previewUrl);
    setPendingFile(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = async (retryOf?: SupportChatMessage) => {
    const text = (retryOf?.content ?? draft).trim();
    const image = retryOf?.localFile ?? pendingFile;
    if ((!text && !image) || submitting || closed) {
      return;
    }

    if (text.length > SUPPORT_MAX_MESSAGE_LENGTH) {
      setSendError(SUPPORT_SEND_ERROR);
      return;
    }

    if (image) {
      const validation = validateCustomerImageFile(image);
      if (!validation.ok) {
        setSendError(validation.message);
        return;
      }
    }

    const epoch = ++sendEpochRef.current;
    setSubmitting(true);
    setSendError(null);
    sendTypingStop();

    const clientRequestId = retryOf?.clientRequestId || createClientRequestId();
    const previewUrl = retryOf?.localPreviewUrl ?? pendingPreviewUrl ?? undefined;
    const optimistic: SupportChatMessage = retryOf
      ? { ...retryOf, failed: false, local: true, deliveryStatus: undefined, clientRequestId, localFile: image ?? retryOf.localFile, localPreviewUrl: previewUrl }
      : {
          id: `local-${Date.now()}`,
          role: "customer",
          sender: "CUSTOMER",
          content: text,
          createdAt: new Date().toISOString(),
          local: true,
          clientRequestId,
          localFile: image ?? undefined,
          localPreviewUrl: previewUrl ?? undefined,
        };

    setMessages((current) => {
      const withoutWelcome = current.filter((item) => item.id !== WELCOME_MESSAGE.id);
      if (retryOf) {
        return withoutWelcome.map((item) => (item.id === retryOf.id ? optimistic : item));
      }
      return [
        ...withoutWelcome.filter(
          (item) =>
            !(
              item.failed &&
              item.local &&
              item.role === "customer" &&
              item.content === text &&
              Boolean(item.localFile) === Boolean(image)
            ),
        ),
        optimistic,
      ];
    });
    if (!retryOf) {
      setDraft("");
      if (image) {
        clearPendingImage(false);
      }
    }
    stickToBottomRef.current = true;

    try {
      const result = await postCustomerMessage({
        message: text,
        conversationId: conversationIdRef.current,
        clientRequestId,
        image,
      });

      if (epoch !== sendEpochRef.current) {
        return;
      }

      conversationIdRef.current = result.conversationId;
      setConversationId(result.conversationId);
      storeConversationId(result.conversationId);
      setOwner(result.owner);
      ownerRef.current = result.owner;
      setSupportStatus(result.supportStatus);
      supportStatusRef.current = result.supportStatus;
      setHumanNeeded(result.humanNeeded);
      setContactRequired(result.contactRequired);
      if (result.contactSubmitted) {
        setContactSubmitted(true);
      }
      if (result.contactConsentText) {
        setContactConsentText(result.contactConsentText);
      }
      setSendError(null);
      setMessages((current) =>
        current.map((item) =>
          item.id === optimistic.id
            ? { ...item, deliveryStatus: "SENT", failed: false, local: true, clientRequestId }
            : item,
        ),
      );

      lastCustomerSentAtRef.current = Date.now();
      const humanOwned = result.owner === "HUMAN";
      const handedOff = result.humanNeeded || result.supportStatus === "HUMAN_NEEDED";
      const waitForAi =
        !humanOwned &&
        !handedOff &&
        (result.aiPending || result.supportStatus === "AI_THINKING");

      if (humanOwned || handedOff) {
        expectingReplyRef.current = false;
        setSupportTyping(false);
      } else if (waitForAi) {
        expectingReplyRef.current = true;
        scheduleTimer(() => {
          if (epoch !== sendEpochRef.current) {
            return;
          }
          if (
            ownerRef.current === "HUMAN" ||
            supportStatusRef.current === "HUMAN_NEEDED" ||
            supportStatusRef.current === "WAITING_CUSTOMER"
          ) {
            return;
          }
          if (expectingReplyRef.current || hiddenSupportIdsRef.current.length > 0) {
            setSupportTyping(true);
          }
        }, AI_PRESENTATION_QUIET_MS);
      } else {
        expectingReplyRef.current = false;
      }

      void refreshRef.current(result.conversationId, true);
    } catch (error) {
      if (epoch === sendEpochRef.current) {
        expectingReplyRef.current = false;
        setSupportTyping(false);
        if (image) {
          setSendError(SUPPORT_IMAGE_SEND_ERROR);
          setDraft(text);
          const restoreUrl = optimistic.localPreviewUrl ?? URL.createObjectURL(image);
          pendingPreviewUrlRef.current = restoreUrl;
          setPendingPreviewUrl(restoreUrl);
          setPendingFile(image);
        } else {
          setSendError(SUPPORT_SEND_ERROR);
        }
        setMessages((current) =>
          current.map((item) =>
            item.id === optimistic.id
              ? { ...item, failed: true, local: true, clientRequestId, localFile: image ?? item.localFile }
              : item,
          ),
        );
      }

      const failure = error as SupportSendFailure;
      if (typeof failure.conversationId === "string" && failure.conversationId) {
        conversationIdRef.current = failure.conversationId;
        setConversationId(failure.conversationId);
        storeConversationId(failure.conversationId);
      }
      if (failure.closed && conversationIdRef.current) {
        void refreshRef.current(conversationIdRef.current, false);
      } else if (conversationIdRef.current) {
        void refreshRef.current(conversationIdRef.current, false);
      }
    } finally {
      if (epoch === sendEpochRef.current) {
        setSubmitting(false);
      }
    }
  };

  const handleContactPhoneChange = useCallback((value: string) => {
    contactPhoneRef.current = value;
    setContactPhone(value);
  }, []);

  const handleContactEmailChange = useCallback((value: string) => {
    contactEmailRef.current = value;
    setContactEmail(value);
  }, []);

  const handleContactFieldFocus = useCallback(() => {
    contactFieldFocusedRef.current = true;
  }, []);

  const handleContactFieldBlur = useCallback(() => {
    contactFieldFocusedRef.current = false;
  }, []);

  const handleContactSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const id = conversationIdRef.current;
    if (!id || contactSending || contactSubmitted) {
      return;
    }

    const email = (contactEmailRef.current || contactEmail).trim().toLowerCase();
    const payload = buildWhatsAppPayload({
      countryIso: contactCountry,
      nationalOrInternational: contactPhoneRef.current || contactPhone,
    });

    if (!payload) {
      setContactError("Bitte geben Sie eine gültige WhatsApp-Nummer im internationalen Format ein.");
      return;
    }

    if (!isValidSupportEmail(email)) {
      setContactError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    setContactSending(true);
    setContactError(null);

    const result = await postSupportContact({
      conversationId: id,
      whatsapp: payload.whatsapp,
      email,
      countryCode: payload.countryCode,
    });

    setContactSending(false);

    if (!result.ok) {
      setContactError(result.message);
      return;
    }

    setContactSubmitted(true);
    void refreshRef.current(id, false);
  };

  const startNewConversation = () => {
    disconnectEvents();
    stopPolling();
    clearStoredConversationId();
    conversationIdRef.current = null;
    hiddenSupportIdsRef.current = [];
    queuedRevealIdsRef.current.clear();
    deliveredRef.current.clear();
    seenRef.current.clear();
    expectingReplyRef.current = false;
    lastCustomerSentAtRef.current = 0;
    sendEpochRef.current += 1;
    setHiddenSupportIds([]);
    setConversationId(null);
    setOwner("AI");
    ownerRef.current = "AI";
    setSupportStatus(null);
    supportStatusRef.current = null;
    setMessages([WELCOME_MESSAGE]);
    setSupportTyping(false);
    setSendError(null);
    setDraft("");
    clearPendingImage(true);
    setLightboxUrl(null);
    setUnreadCount(0);
    setHumanNeeded(false);
    setContactRequired(false);
    setContactSubmitted(false);
    setContactConsentText(null);
    setContactPhone("");
    setContactEmail("");
    contactPhoneRef.current = "";
    contactEmailRef.current = "";
    contactFieldFocusedRef.current = false;
    setContactError(null);
    setContactCountry("DE");
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void handleSend();
  };

  const onComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  };

  const onListScroll = () => {
    const node = listRef.current;
    if (!node) {
      return;
    }

    stickToBottomRef.current = node.scrollHeight - node.scrollTop - node.clientHeight < 72;
  };

  return (
    <div
      className="support-chat-root"
      style={{ "--support-keyboard-inset": `${keyboardInset}px` } as CSSProperties}
    >
      {open ? (
        <div
          id="kundenservice-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="kundenservice-title"
          className="support-chat-panel flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] text-white shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
        >
          <div className="flex min-h-0 shrink-0 items-center gap-3 border-b border-white/10 bg-[#050505] px-4 py-3">
            <span className="relative shrink-0">
              <SupportAvatar />
              <span
                className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#050505] ${
                  presence.tone === "online"
                    ? "bg-[#22C55E]"
                    : presence.tone === "pending"
                      ? "bg-[#F59E0B]"
                      : "bg-[#6B7280]"
                }`}
                aria-hidden="true"
              />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="kundenservice-title" className="text-sm font-semibold tracking-wide">
                Kundenservice
              </h2>
              <p className="truncate text-xs text-[#B8B8B8]">{presence.label}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-[#A6FF00]/40 hover:text-[#A6FF00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]"
              aria-label="Kundenservice minimieren"
            >
              <HiXMark className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div
            ref={listRef}
            onScroll={onListScroll}
            className="min-h-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto px-3 py-4"
            aria-live="polite"
          >
            {visibleMessages.map((message) => {
              const isCustomer = message.role === "customer";
              const time = formatMessageTime(message.createdAt);
              const receipt = customerReceiptState(message.deliveryStatus, supportStatus, message.local);

              return (
                <div
                  key={message.id}
                  className={`flex min-w-0 items-end gap-2 ${isCustomer ? "justify-end" : "justify-start"}`}
                >
                  {!isCustomer ? <SupportAvatar size="sm" /> : null}
                  <div className="min-w-0 max-w-[min(82%,calc(100%-2.5rem))]">
                    <div
                      className={`support-chat-bubble rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        isCustomer
                          ? "rounded-br-md bg-[#A6FF00] text-black"
                          : "rounded-bl-md border border-white/10 bg-[#151515] text-[#F5F5F5]"
                      }`}
                    >
                      <MessageAttachments message={message} isCustomer={isCustomer} onOpen={setLightboxUrl} />
                      {message.content.trim() ? (
                        <MessageBody
                          content={message.content}
                          className="whitespace-pre-wrap"
                          onCheckoutLinkClick={
                            isCustomer
                              ? undefined
                              : (url) => {
                                  trackPaymentLinkClick({
                                    conversationId: conversationIdRef.current,
                                    url,
                                  });
                                }
                          }
                        />
                      ) : null}
                    </div>
                    <div
                      className={`mt-1 flex items-center gap-1 px-1 text-[10px] leading-none ${
                        isCustomer ? "justify-end text-white/45" : "justify-start text-white/40"
                      }`}
                    >
                      {time ? <time dateTime={message.createdAt}>{time}</time> : null}
                      {isCustomer ? <DeliveryChecks state={receipt} /> : null}
                      {isCustomer && message.failed ? (
                        <button
                          type="button"
                          onClick={() => void handleSend(message)}
                          disabled={submitting}
                          className="ml-1 text-[10px] font-medium text-[#A6FF00] underline-offset-2 hover:underline disabled:opacity-40"
                        >
                          Erneut senden
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}

            {supportTyping && !closed ? (
              <div className="flex min-w-0 items-end justify-start gap-2">
                <SupportAvatar size="sm" />
                <div
                  className="max-w-[min(82%,calc(100%-2.5rem))] rounded-2xl rounded-bl-md border border-white/10 bg-[#151515] px-3.5 py-2.5 text-sm text-[#B8B8B8]"
                  aria-label="Kundenservice schreibt"
                >
                  <span>Kundenservice schreibt…</span>
                  <span className="support-chat-typing ml-1" aria-hidden="true">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                  </span>
                </div>
              </div>
            ) : null}

            {showContactForm ? (
              <SupportContactForm
                consentText={contactConsentText || SUPPORT_CONTACT_CONSENT_FALLBACK}
                selectedDial={selectedDial}
                country={contactCountry}
                phone={contactPhone}
                email={contactEmail}
                error={contactError}
                sending={contactSending}
                onCountryChange={setContactCountry}
                onPhoneChange={handleContactPhoneChange}
                onEmailChange={handleContactEmailChange}
                onFocusField={handleContactFieldFocus}
                onBlurField={handleContactFieldBlur}
                onSubmit={handleContactSubmit}
              />
            ) : null}

            {showContactConfirmation ? (
              <div className="rounded-2xl border border-[#A6FF00]/20 bg-[#111111] px-3 py-3 text-sm text-[#D8D8D8]">
                {SUPPORT_CONTACT_CONFIRMATION}
              </div>
            ) : null}

            {closed ? (
              <div className="rounded-xl border border-white/10 bg-[#111111] px-3 py-3 text-center text-sm text-[#C8C8C8]">
                <p>{SUPPORT_CLOSED_NOTICE}</p>
                <button
                  type="button"
                  onClick={startNewConversation}
                  className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full border border-[#A6FF00]/40 px-4 text-xs font-semibold uppercase tracking-wide text-[#A6FF00] transition hover:bg-[#A6FF00] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]"
                >
                  Neue Unterhaltung starten
                </button>
              </div>
            ) : null}
          </div>

          <form onSubmit={onSubmit} className="shrink-0 border-t border-white/10 bg-[#050505] p-3">
            {sendError ? (
              <p className="mb-2 text-xs text-[#FFB4B4]" role="alert">
                {sendError}
              </p>
            ) : null}
            {pendingPreviewUrl ? (
              <div className="mb-2 flex items-start gap-2">
                <div className="relative max-w-[7.5rem] overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pendingPreviewUrl}
                    alt="Bildvorschau"
                    className="block h-auto max-h-20 w-auto max-w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => clearPendingImage(true)}
                    className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/75 text-white hover:text-[#A6FF00]"
                    aria-label="Bild entfernen"
                    title="Bild entfernen"
                  >
                    <HiXMark className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : null}
            <div className="flex items-end gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept={SUPPORT_IMAGE_ACCEPT}
                className="hidden"
                onChange={(event) => handleImageSelect(event.target.files?.[0])}
                disabled={closed}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={closed || submitting}
                aria-label="Attach image"
                title="Attach image"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111111] text-[#A6FF00] transition hover:border-[#A6FF00]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <PaperclipIcon className="h-5 w-5" />
              </button>
              <label className="sr-only" htmlFor="kundenservice-input">
                Nachricht an den Kundenservice
              </label>
              <textarea
                id="kundenservice-input"
                ref={composerRef}
                rows={1}
                value={draft}
                onChange={(event) => handleDraftChange(event.target.value)}
                onKeyDown={onComposerKeyDown}
                disabled={closed}
                autoFocus={false}
                placeholder={closed ? "Unterhaltung geschlossen" : "Nachricht schreiben…"}
                className="max-h-28 min-h-11 min-w-0 flex-1 resize-none rounded-xl border border-white/10 bg-[#111111] px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#7A7A7A] focus-visible:border-[#A6FF00]/50 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={closed || submitting || (!draft.trim() && !pendingFile)}
                aria-label="Nachricht senden"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#A6FF00] text-black transition hover:bg-[#B8FF4D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <HiPaperAirplane className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        className="support-chat-fab pointer-events-auto relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#A6FF00]/25 bg-[#050505] text-white shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A6FF00] sm:h-[60px] sm:w-[60px]"
        aria-label={open ? "Kundenservice schließen" : "Kundenservice öffnen"}
        aria-expanded={open}
        aria-controls="kundenservice-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <HiXMark className="h-7 w-7" aria-hidden="true" />
        ) : (
          <HiChatBubbleLeftRight className="h-7 w-7 text-[#A6FF00]" aria-hidden="true" />
        )}
        {!open && unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#A6FF00] px-1 text-[11px] font-bold text-black">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>
      {lightboxUrl ? <ImageLightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} /> : null}
    </div>
  );
}
