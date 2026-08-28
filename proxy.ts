import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { goneResponse } from "@/lib/gone-response";
import { isRetiredPath } from "@/lib/retired-urls";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isRetiredPath(pathname)) {
    return goneResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/senderliste",
    "/senderliste/:path*",
    "/reseller",
    "/reseller/:path*",
    "/preise",
    "/preise/:path*",
    "/blog/iptv-alle-sender",
    "/blog/iptv-line-kaufen",
    "/blog/iptv-abo",
    "/blog/iptv-free-trial",
    "/blog/iptv-sport",
    "/blog/iptv-tuerkische-sender",
    "/blog/iptv-balkan",
    "/blog/iptv-greek",
    "/blog/polish-iptv",
    "/blog/iptv-arab",
    "/blog/iptv-nordic",
  ],
};
