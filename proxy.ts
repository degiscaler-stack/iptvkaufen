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

const ACQUISITION_REF = /^[A-Za-z0-9_-]{32,128}$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/senderliste" || pathname.startsWith("/senderliste/")) {
    return goneResponse();
  }

  const response = NextResponse.next();
  const ref = request.nextUrl.searchParams.get("ref");
  if (ref && ACQUISITION_REF.test(ref)) {
    response.cookies.set("acquisition_ref", ref, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
