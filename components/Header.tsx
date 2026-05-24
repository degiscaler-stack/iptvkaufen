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
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[88px] lg:px-10">
        <Link href="#" aria-label="Startseite" className="group relative z-10 flex items-center">
          <img
            src="/brand/iptv-kaufen-logo.webp"
            alt="IPTV Kaufen Logo"
            className="h-auto w-[165px] transition duration-300 group-hover:drop-shadow-[0_0_14px_rgba(166,255,0,0.24)] lg:w-[230px]"
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
            className="inline-flex items-center justify-center rounded-full border border-[#A6FF00]/40 bg-[#A6FF00] px-[18px] py-2.5 text-center text-[13px] font-extrabold leading-none uppercase tracking-[0.08em] !text-[#000000] whitespace-nowrap shadow-[0_0_14px_rgba(166,255,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(166,255,0,0.38)] [&_*]:flex [&_*]:items-center [&_*]:justify-center [&_*]:!text-[#000000]"
          >
            Jetzt IPTV Kaufen
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="relative z-10 inline-flex h-9 w-9 items-center justify-center border-0 bg-transparent p-0 text-[#A6FF00] shadow-none outline-none transition hover:bg-transparent hover:text-[#A6FF00] focus:bg-transparent focus:outline-none active:bg-transparent lg:hidden"
        >
          <span className="sr-only">{isOpen ? "Menü schließen" : "Menü öffnen"}</span>
          <span className="flex flex-col gap-[6px]">
            <span
              className={`h-px w-[26px] rounded-full bg-current transition ${
                isOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span className={`h-px w-[26px] rounded-full bg-current transition ${isOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-[26px] rounded-full bg-current transition ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
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
          className="border-t border-[#1F1F1F] bg-[#050505] px-5 pb-6 pt-3 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-4 py-2.5 text-[20px] font-bold leading-[1.2] transition ${
                  item.active
                    ? "bg-[#A6FF00]/8 text-[#A6FF00]"
                    : "text-[#B8B8B8] hover:bg-[#111111] hover:text-[#F5F5F5]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#iptv-kaufen"
              onClick={() => setIsOpen(false)}
              className="mx-auto mt-4 inline-flex min-h-[46px] w-[calc(100%_-_80px)] max-w-[300px] items-center justify-center rounded-full bg-[#A6FF00] px-5 py-2.5 text-center text-[12px] font-extrabold leading-none uppercase tracking-[0.10em] !text-[#000000] whitespace-nowrap shadow-[0_0_14px_rgba(166,255,0,0.28)] transition hover:shadow-[0_0_22px_rgba(166,255,0,0.38)] [&_*]:flex [&_*]:items-center [&_*]:justify-center [&_*]:!text-[#000000]"
            >
              Jetzt IPTV Kaufen
            </Link>
          </div>
        </motion.nav>
      ) : null}
    </header>
  );
}
