"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { HiChatBubbleLeftRight, HiPaperAirplane, HiXMark } from "react-icons/hi2";
import {
  SUPPORT_CLOSED_NOTICE,
  SUPPORT_MAX_MESSAGE_LENGTH,
  SUPPORT_SEND_ERROR,
  SUPPORT_WELCOME_MESSAGE,
  clearStoredConversationId,
  createSupportEventSource,
  loadPublicConversation,
  mapApiMessages,
  parseLiveEvent,
  postCustomerMessage,
  postCustomerTyping,
  postReceipts,
  readStoredConversationId,
  storeConversationId,
  type PublicConversation,
  type SupportChatMessage,
  type SupportStatus,
} from "@/lib/support-chat";

const WELCOME_MESSAGE: SupportChatMessage = {
  id: "__welcome__",
  role: "support",
  content: SUPPORT_WELCOME_MESSAGE,
  createdAt: "",
  local: true,
};

const PUBLIC_SSE_EVENTS = [
  "message.ai",
  "message.human",
  "typing.support",
  "conversation.closed",
  "conversation.reopened",
  "human.takeover",
  "human.return_to_ai",
] as const;

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

    return !incoming.some(
      (item) => item.role === message.role && item.content === message.content,
    );
  });

  return [...Array.from(byId.values()).sort((a, b) => a.createdAt.localeCompare(b.createdAt)), ...locals];
}

export default function SupportChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<SupportChatMessage[]>([WELCOME_MESSAGE]);
  const [hiddenSupportIds, setHiddenSupportIds] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [supportStatus, setSupportStatus] = useState<SupportStatus | null>(null);
  const [supportTyping, setSupportTyping] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [keyboardInset, setKeyboardInset] = useState(0);
  const [eventStreamKey, setEventStreamKey] = useState(0);

  const conversationIdRef = useRef<string | null>(null);
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
  const eventSourceRef = useRef<EventSource | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const refreshRef = useRef<(id: string, delayNewSupport?: boolean) => Promise<PublicConversation | null>>(
    async () => null,
  );

  const closed = supportStatus === "CLOSED";
  const hiddenIdSet = new Set(hiddenSupportIds);
  const visibleMessages = messages.filter((message) => !hiddenIdSet.has(message.id));

  const queueSupportReveal = useCallback((message: SupportChatMessage) => {
    const delay = Math.max(0, Math.min(message.presentationDelayMs ?? 0, 2200));
    if (delay <= 0 || hiddenSupportIdsRef.current.includes(message.id)) {
      return delay > 0;
    }

    hiddenSupportIdsRef.current = [...hiddenSupportIdsRef.current, message.id];
    setHiddenSupportIds(hiddenSupportIdsRef.current);
    setSupportTyping(true);

    const timer = window.setTimeout(() => {
      hiddenSupportIdsRef.current = hiddenSupportIdsRef.current.filter((id) => id !== message.id);
      setHiddenSupportIds([...hiddenSupportIdsRef.current]);
      if (hiddenSupportIdsRef.current.length === 0) {
        setSupportTyping(false);
      }
    }, delay);

    revealTimersRef.current.push(timer);
    return true;
  }, []);

  const applyConversation = useCallback(
    (conversation: PublicConversation, options?: { delayNewSupport?: boolean }) => {
      const mapped = mapApiMessages(conversation.messages);
      const previousIds = new Set(messagesRef.current.filter((item) => !item.local).map((item) => item.id));

      if (options?.delayNewSupport) {
        for (const message of mapped) {
          if (message.role === "support" && !previousIds.has(message.id)) {
            queueSupportReveal(message);
          }
        }
      }

      const merged = mergeMessages(messagesRef.current, mapped);
      setMessages(merged.length > 0 ? merged : [WELCOME_MESSAGE]);
      setConversationId(conversation.conversationId);
      conversationIdRef.current = conversation.conversationId;
      storeConversationId(conversation.conversationId);
      setSupportStatus(conversation.supportStatus);

      const waitingReveal = hiddenSupportIdsRef.current.length > 0;
      setSupportTyping(
        conversation.supportTyping ||
          waitingReveal ||
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
    [queueSupportReveal],
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
          setMessages([WELCOME_MESSAGE]);
          setHiddenSupportIds([]);
          hiddenSupportIdsRef.current = [];
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
    messagesRef.current = messages;
    openRef.current = open;
  }, [conversationId, messages, open]);

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
        setSupportTyping(Boolean(event.payload?.typing) || hiddenSupportIdsRef.current.length > 0);
        return;
      }

      if (event.type === "conversation.closed") {
        setSupportStatus("CLOSED");
        setSupportTyping(false);
        void refreshRef.current(conversationId, false);
        return;
      }

      if (
        event.type === "conversation.reopened" ||
        event.type === "message.ai" ||
        event.type === "message.human"
      ) {
        void refreshRef.current(conversationId, event.type.startsWith("message."));
        return;
      }

      if (event.type === "human.takeover" || event.type === "human.return_to_ai") {
        if (typeof event.payload?.supportStatus === "string") {
          setSupportStatus(event.payload.supportStatus);
        }
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
  }, [conversationId, eventStreamKey, disconnectEvents, startPolling, stopPolling]);

  useEffect(() => {
    return () => {
      disconnectEvents();
      stopPolling();
      revealTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      if (typingStopTimerRef.current) {
        window.clearTimeout(typingStopTimerRef.current);
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
      if (event.key === "Escape" && openRef.current) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
  }, [visibleMessages, supportTyping, open, scrollToBottomIfNeeded]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setUnreadCount(0);
    const frame = window.requestAnimationFrame(() => composerRef.current?.focus());

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

    return () => window.cancelAnimationFrame(frame);
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

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || submitting || closed) {
      return;
    }

    if (text.length > SUPPORT_MAX_MESSAGE_LENGTH) {
      setSendError(SUPPORT_SEND_ERROR);
      return;
    }

    setSubmitting(true);
    setSendError(null);
    sendTypingStop();

    const optimistic: SupportChatMessage = {
      id: `local-${Date.now()}`,
      role: "customer",
      content: text,
      createdAt: new Date().toISOString(),
      local: true,
    };

    setMessages((current) => {
      const withoutWelcome = current.filter((item) => item.id !== WELCOME_MESSAGE.id);
      return [...withoutWelcome, optimistic];
    });
    setDraft("");
    stickToBottomRef.current = true;
    setSupportTyping(true);

    try {
      const result = await postCustomerMessage({
        message: text,
        conversationId: conversationIdRef.current,
      });

      conversationIdRef.current = result.conversationId;
      setConversationId(result.conversationId);
      storeConversationId(result.conversationId);
      setSupportStatus(result.supportStatus);
      void refreshRef.current(result.conversationId, true);

      if (result.aiPaused && !result.reply) {
        setSupportTyping(hiddenSupportIdsRef.current.length > 0);
      }
    } catch (error) {
      setSupportTyping(false);
      setSendError(SUPPORT_SEND_ERROR);
      setDraft(text);
      setMessages((current) => {
        const next = current.filter((item) => item.id !== optimistic.id);
        return next.length > 0 ? next : [WELCOME_MESSAGE];
      });
      if ((error as { closed?: boolean }).closed && conversationIdRef.current) {
        void refreshRef.current(conversationIdRef.current, false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const startNewConversation = () => {
    disconnectEvents();
    stopPolling();
    clearStoredConversationId();
    conversationIdRef.current = null;
    hiddenSupportIdsRef.current = [];
    deliveredRef.current.clear();
    seenRef.current.clear();
    setHiddenSupportIds([]);
    setConversationId(null);
    setSupportStatus(null);
    setMessages([WELCOME_MESSAGE]);
    setSupportTyping(false);
    setSendError(null);
    setDraft("");
    setUnreadCount(0);
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
      className="pointer-events-none fixed right-[25px] z-[9998] flex flex-col items-end gap-3 bottom-[calc(1rem+var(--sticky-purchase-offset,0px)+5rem)] lg:bottom-[calc(25px+4.75rem)]"
      style={
        keyboardInset > 0
          ? { bottom: `calc(1rem + var(--sticky-purchase-offset, 0px) + 5rem + ${keyboardInset}px)` }
          : undefined
      }
    >
      {open ? (
        <div
          id="kundenservice-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="kundenservice-title"
          className="pointer-events-auto flex w-[min(100vw-1.5rem,400px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] text-white shadow-[0_18px_50px_rgba(0,0,0,0.55)] max-md:w-[min(100vw-1rem,100%)]"
          style={{
            height: `min(640px, calc(100dvh - 8rem - var(--sticky-purchase-offset, 0px) - ${keyboardInset}px))`,
          }}
        >
          <div className="flex items-center gap-3 border-b border-white/10 bg-[#050505] px-4 py-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A6FF00]/30 bg-[#111111] text-[#A6FF00]"
              aria-hidden="true"
            >
              <HiChatBubbleLeftRight className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="kundenservice-title" className="text-sm font-semibold tracking-wide">
                Kundenservice
              </h2>
              <p className="text-xs text-[#B8B8B8]">{closed ? "Geschlossen" : "Support"}</p>
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
            className="flex-1 space-y-3 overflow-y-auto px-3 py-4"
            aria-live="polite"
          >
            {visibleMessages.map((message) => {
              const isCustomer = message.role === "customer";
              return (
                <div key={message.id} className={`flex ${isCustomer ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      isCustomer
                        ? "rounded-br-md bg-[#A6FF00] text-black"
                        : "rounded-bl-md border border-white/10 bg-[#151515] text-[#F5F5F5]"
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              );
            })}

            {supportTyping && !closed ? (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl rounded-bl-md border border-white/10 bg-[#151515] px-3.5 py-2.5 text-sm text-[#B8B8B8]"
                  aria-label="Kundenservice schreibt"
                >
                  <span>Kundenservice schreibt</span>
                  <span className="support-chat-typing ml-1" aria-hidden="true">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                  </span>
                </div>
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

          <form onSubmit={onSubmit} className="border-t border-white/10 bg-[#050505] p-3">
            {sendError ? (
              <p className="mb-2 text-xs text-[#FFB4B4]" role="alert">
                {sendError}
              </p>
            ) : null}
            <div className="flex items-end gap-2">
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
                placeholder={closed ? "Unterhaltung geschlossen" : "Nachricht schreiben…"}
                className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-white/10 bg-[#111111] px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#7A7A7A] focus-visible:border-[#A6FF00]/50 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={closed || submitting || !draft.trim()}
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
    </div>
  );
}
