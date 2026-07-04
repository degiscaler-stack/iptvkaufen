export const PRICING_SECTION_ID = "preise";

export function scrollToPricing(): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  const pricingSection = document.getElementById(PRICING_SECTION_ID);

  if (!pricingSection) {
    return false;
  }

  pricingSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  if (typeof window !== "undefined" && window.history?.replaceState) {
    const nextUrl = `${window.location.pathname}${window.location.search}#${PRICING_SECTION_ID}`;
    window.history.replaceState(null, "", nextUrl);
  }

  return true;
}

export function isHomePricingScrollPath(pathname: string): boolean {
  return pathname === "/" || pathname === "";
}
