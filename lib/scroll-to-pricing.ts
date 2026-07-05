export const PACKAGE_SELECTION_ID = "pakete-start";

/** @deprecated Use PACKAGE_SELECTION_ID – kept for section semantics only. */
export const PRICING_SECTION_ID = "preise";

const DESKTOP_PACKAGE_SCROLL_OFFSET = 90;
const MOBILE_PACKAGE_SCROLL_OFFSET = 72;

export function getPackageScrollOffset(): number {
  if (typeof window === "undefined") {
    return DESKTOP_PACKAGE_SCROLL_OFFSET;
  }

  return window.matchMedia("(max-width: 768px)").matches
    ? MOBILE_PACKAGE_SCROLL_OFFSET
    : DESKTOP_PACKAGE_SCROLL_OFFSET;
}

export function scrollToPackages(): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  const target = document.getElementById(PACKAGE_SELECTION_ID);

  if (!target) {
    return false;
  }

  const offset = getPackageScrollOffset();
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });

  if (typeof window !== "undefined" && window.history?.replaceState) {
    const nextUrl = `${window.location.pathname}${window.location.search}#${PACKAGE_SELECTION_ID}`;
    window.history.replaceState(null, "", nextUrl);
  }

  return true;
}

export function isHomePackageScrollPath(pathname: string): boolean {
  return pathname === "/" || pathname === "";
}
