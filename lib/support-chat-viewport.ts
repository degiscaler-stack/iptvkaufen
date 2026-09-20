"use client";

export const SUPPORT_CHAT_MOBILE_MEDIA =
  "(max-width: 768px), (hover: none) and (pointer: coarse) and (max-height: 540px)";

const OPEN_CLASS = "support-chat-mobile-open";
const SCROLL_Y_ATTR = "data-support-chat-scroll-y";
const KEYBOARD_THRESHOLD_PX = 80;

export function isSupportChatMobileViewport(): boolean {
  return window.matchMedia(SUPPORT_CHAT_MOBILE_MEDIA).matches;
}

export function applySupportChatViewportVars(target: HTMLElement) {
  const visual = window.visualViewport;
  const height = Math.round(visual?.height ?? window.innerHeight);
  const offsetTop = Math.round(visual?.offsetTop ?? 0);
  const obscured = Math.max(
    0,
    window.innerHeight - (visual?.height ?? window.innerHeight) - (visual?.offsetTop ?? 0),
  );
  const keyboardOpen = obscured > KEYBOARD_THRESHOLD_PX;

  target.style.setProperty("--support-chat-viewport-height", `${height}px`);
  target.style.setProperty("--support-chat-viewport-offset-top", `${offsetTop}px`);
  target.style.setProperty("--support-chat-keyboard-open", keyboardOpen ? "1" : "0");
  target.style.setProperty(
    "--support-chat-safe-bottom",
    keyboardOpen ? "0px" : "env(safe-area-inset-bottom, 0px)",
  );
}

export function lockSupportChatPageScroll() {
  const html = document.documentElement;
  if (html.classList.contains(OPEN_CLASS)) {
    return;
  }

  const scrollY = window.scrollY;
  html.setAttribute(SCROLL_Y_ATTR, String(scrollY));
  html.classList.add(OPEN_CLASS);

  const { body } = document;
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
}

export function unlockSupportChatPageScroll() {
  const html = document.documentElement;
  if (!html.classList.contains(OPEN_CLASS)) {
    return;
  }

  const scrollY = Number(html.getAttribute(SCROLL_Y_ATTR) || "0");
  html.classList.remove(OPEN_CLASS);
  html.removeAttribute(SCROLL_Y_ATTR);

  const { body } = document;
  body.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";

  window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
}
