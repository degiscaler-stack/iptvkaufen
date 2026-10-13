"use client";

import { useEffect } from "react";
import { readAcquisitionCookie } from "@/lib/support-chat";

export default function AcquisitionVisit() {
  useEffect(() => {
    const token = readAcquisitionCookie();
    if (!token) return;
    const landingPage = window.location.origin + window.location.pathname;
    fetch("https://degibot.online/api/acquisition/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, landingPage }),
    }).catch(() => undefined);
  }, []);
  return null;
}
