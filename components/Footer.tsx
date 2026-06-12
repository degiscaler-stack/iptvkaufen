import Link from "next/link";
import type { ReactNode } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const quickLinks = [
  { label: "Startseite", href: "/" },
  { label: "Preise", href: "/#preise" },
  { label: "Senderliste", href: "/#senderliste" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

const legalLinks = [
  { label: "Datenschutzrichtlinie", href: "/datenschutz" },
  { label: "Rückerstattungsrichtlinie", href: "/rueckerstattung" },
  { label: "Nutzungsbedingungen", href: "/nutzungsbedingungen" },
  { label: "Impressum", href: "/impressum" },
] as const;

const contactLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/message/L6KQCBXWOIUTA1",
    external: true,
  },
  { label: "E-Mail", href: "mailto:support@iptvkaufenx.de" },
  {
    label: "Support 24/7",
    href: "https://wa.me/message/L6KQCBXWOIUTA1",
    external: true,
  },
] as const;

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com", Icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com", Icon: FaInstagram },
  { label: "X (Twitter)", href: "https://x.com", Icon: FaXTwitter },
  { label: "WhatsApp", href: "https://wa.me/message/L6KQCBXWOIUTA1", Icon: FaWhatsapp },
] as const;

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex w-fit items-center text-[14px] font-medium leading-6 text-[#F5F5F5]/72 transition duration-300 hover:text-[#A6FF00]"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center text-[14px] font-medium leading-6 text-[#F5F5F5]/72 transition duration-300 hover:text-[#A6FF00]"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-[#1F1F1F]/80 bg-[#000000] px-5 pb-8 pt-12 sm:px-8 sm:pb-9 sm:pt-14 lg:px-0 lg:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A6FF00]/28 to-transparent" />

      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="grid gap-9 border-b border-[#1F1F1F]/80 pb-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.45fr_0.85fr_1fr_0.8fr] lg:gap-12 lg:pb-12">
          <div className="max-w-[420px]">
            <Link href="/" aria-label="iptvkaufenX Startseite" className="inline-flex">
              <img
                src="/brand/iptv-kaufen-logo.webp"
                alt="IPTV Kaufen Logo"
                width={520}
                height={260}
                loading="lazy"
                decoding="async"
                className="h-auto w-[175px] transition duration-300 hover:drop-shadow-[0_0_14px_rgba(166,255,0,0.22)] sm:w-[205px]"
              />
            </Link>
            <p className="mt-5 max-w-[360px] text-[14px] leading-7 text-[#F5F5F5]/76">
              Premium IPTV Deutschland mit über 22.000 Live-TV Sendern, Filmen, Serien und Sport in
              HD, Full HD und 4K.
            </p>

            <div className="mt-6 flex items-center gap-3" aria-label="Social Media Links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F1F1F] bg-[#111111]/78 text-[#F5F5F5]/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-[#A6FF00]/45 hover:text-[#A6FF00] hover:shadow-[0_0_12px_rgba(166,255,0,0.12)]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#A6FF00]">
              Schnellzugriff
            </h2>
            <nav className="mt-5 flex flex-col gap-2" aria-label="Footer Schnellzugriff">
              {quickLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#A6FF00]">
              Rechtliches
            </h2>
            <nav className="mt-5 flex flex-col gap-2" aria-label="Footer Rechtliches">
              {legalLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#A6FF00]">
              Kontakt
            </h2>
            <nav className="mt-5 flex flex-col gap-2" aria-label="Footer Kontakt">
              {contactLinks.map((link) => (
                <FooterLink key={link.label} href={link.href} external={"external" in link}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-[13px] text-[#F5F5F5]/62 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 iptvkaufenX. Alle Rechte vorbehalten.</p>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="Footer Bottom Links">
            <Link href="/datenschutz" className="transition duration-300 hover:text-[#A6FF00]">
              Datenschutz
            </Link>
            <span className="text-[#F5F5F5]/28">|</span>
            <Link href="/nutzungsbedingungen" className="transition duration-300 hover:text-[#A6FF00]">
              Nutzungsbedingungen
            </Link>
            <span className="text-[#F5F5F5]/28">|</span>
            <Link href="/impressum" className="transition duration-300 hover:text-[#A6FF00]">
              Impressum
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
