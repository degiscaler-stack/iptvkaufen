"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const navigation = [
  { label: "Startseite", href: "#", active: true },
  { label: "IPTV Kaufen", href: "#iptv-kaufen" },
  { label: "Preise", href: "#preise" },
  { label: "Senderliste", href: "#senderliste" },
  { label: "Installation", href: "#installation" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#1F1F1F] bg-[#050505]">
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="#" aria-label="Startseite" className="group relative z-10 flex items-center">
          <img
            src="/brand/iptv-kaufen-logo.webp"
            alt="IPTV Kaufen Logo"
            className="h-auto w-[150px] transition duration-300 group-hover:drop-shadow-[0_0_18px_rgba(166,255,0,0.36)] lg:w-[210px]"
          />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative text-sm font-medium tracking-wide transition duration-300 ${
                item.active ? "text-[#A6FF00]" : "text-[#B8B8B8] hover:text-[#F5F5F5]"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-2 left-0 h-px rounded-full bg-[#A6FF00] shadow-[0_0_12px_rgba(166,255,0,0.8)] transition-all duration-300 ${
                  item.active ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center sm:flex">
          <Link
            href="#iptv-kaufen"
            className="rounded-full border border-[#A6FF00]/40 bg-[#A6FF00] px-6 py-3 text-[14px] font-extrabold leading-none uppercase tracking-[0.14em] !text-[#000000] shadow-[0_0_14px_rgba(166,255,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(166,255,0,0.38)] [&_*]:!text-[#000000]"
          >
            Jetzt IPTV Kaufen
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#1F1F1F] bg-[#111111] text-[#F5F5F5] transition hover:border-[#A6FF00]/70 hover:text-[#A6FF00] lg:hidden"
        >
          <span className="sr-only">{isOpen ? "Menü schließen" : "Menü öffnen"}</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span className={`h-0.5 w-5 rounded-full bg-current transition ${isOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {isOpen ? (
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          aria-label="Mobile Navigation"
          className="border-t border-[#1F1F1F] bg-[#050505] px-5 pb-6 pt-2 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-2xl px-4 py-3 text-base font-semibold transition ${
                  item.active
                    ? "bg-[#A6FF00]/10 text-[#A6FF00]"
                    : "text-[#B8B8B8] hover:bg-[#111111] hover:text-[#F5F5F5]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#iptv-kaufen"
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-full bg-[#A6FF00] px-6 py-3 text-center text-[14px] font-extrabold leading-none uppercase tracking-[0.14em] !text-[#000000] shadow-[0_0_14px_rgba(166,255,0,0.28)] transition hover:shadow-[0_0_22px_rgba(166,255,0,0.38)] [&_*]:!text-[#000000]"
            >
              Jetzt IPTV Kaufen
            </Link>
          </div>
        </motion.nav>
      ) : null}
    </header>
  );
}
