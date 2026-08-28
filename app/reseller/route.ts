import { goneResponse } from "@/lib/gone-response";

export function GET() {
  return goneResponse(true);
}

export function HEAD() {
  return goneResponse(false);
}

export function POST() {
  return goneResponse(true);
}
