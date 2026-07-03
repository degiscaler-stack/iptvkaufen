"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ctaSolidGreenClass } from "@/lib/cta-motion";

type AnchorRedirectProps = {
  href: string;
  title: string;
  description: string;
  linkLabel: string;
};

export default function AnchorRedirect({
  href,
  title,
  description,
  linkLabel,
}: AnchorRedirectProps) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#000000] px-5 py-16 text-[#F5F5F5]">
      <div className="mx-auto max-w-[560px] text-center">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
          Weiterleitung
        </p>
        <h1 className="text-[2rem] font-black tracking-[-0.04em] sm:text-[2.35rem]">{title}</h1>
        <p className="mt-4 text-[15px] leading-7 text-[#E6E6E6]/82">{description}</p>
        <Link
          href={href}
          className={`${ctaSolidGreenClass} mt-7 inline-flex rounded-full bg-[#A6FF00] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.12em] hover:bg-[#C7FF62]`}
        >
          {linkLabel}
        </Link>
      </div>
    </main>
  );
}
