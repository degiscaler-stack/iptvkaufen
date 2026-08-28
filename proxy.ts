import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function goneResponse(): NextResponse {
  return new NextResponse("Gone", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/senderliste" || pathname.startsWith("/senderliste/")) {
    return goneResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/senderliste", "/senderliste/:path*"],
};
