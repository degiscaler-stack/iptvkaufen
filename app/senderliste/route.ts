import { NextResponse } from "next/server";

function goneResponse(includeBody = true): NextResponse {
  return new NextResponse(includeBody ? "Gone" : null, {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

export function GET() {
  return goneResponse(true);
}

export function HEAD() {
  return goneResponse(false);
}

export function POST() {
  return goneResponse(true);
}
