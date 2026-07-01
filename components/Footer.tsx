import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  WHATSAPP_CHAT_URL,
  WHATSAPP_PHONE_DISPLAY,
  WHATSAPP_SUPPORT_LABEL,
} from "@/lib/contact";

const quickLinks = [
  { label: "Startseite", href: "/" },
  { label: "Preise", href: "/#preise" },
  { label: "Senderliste", href: "/#senderliste" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

const legalLinks = [
  { label: "Datenschutzrichtlinie", href: "/datenschutz" },
  { label: "Rückerstattungsrichtlinie", href: "/rueckerstattung" },
  { label: "Nutzungsbedingungen", href: "/nutzungsbedingungen" },
  { label: "Impressum", href: "/impressum" },
] as const;

const contactLinks = [
  {
    label: "contact@iptvkaufenx.de",
    href: "mailto:contact@iptvkaufenx.de",
    Icon: FaEnvelope,
  },
  {
    label: WHATSAPP_PHONE_DISPLAY,
    sublabel: WHATSAPP_SUPPORT_LABEL,
    href: WHATSAPP_CHAT_URL,
    Icon: FaWhatsapp,
    external: true,
  },
] as const;

const socialLinks = [
  { label: "Facebook", href: "https://web.facebook.com/people/VisionHub/61588587400682/", Icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/visionhub.media/", Icon: FaInstagram },
  { label: "X (Twitter)", href: "https://x.com/cod_jss27918", Icon: FaXTwitter },
  { label: "WhatsApp", href: WHATSAPP_CHAT_URL, Icon: FaWhatsapp },
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
        className="inline-flex w-fit items-center text-[14px] font-normal leading-6 text-[#F5F5F5]/68 transition duration-300 hover:text-[#A6FF00]"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center text-[14px] font-normal leading-6 text-[#F5F5F5]/68 transition duration-300 hover:text-[#A6FF00]"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-[#A6FF00]/30 bg-[#080B08] px-5 pb-8 pt-12 sm:px-8 sm:pb-9 sm:pt-14 lg:px-0 lg:pt-16">
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="rounded-[26px] border border-[#1F1F1F]/95 bg-[#0A0F0A] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.34)] sm:p-7 lg:p-8">
          <div className="grid gap-10 border-b border-[#1F1F1F]/90 pb-10 sm:grid-cols-2 sm:gap-11 lg:grid-cols-[1.45fr_0.85fr_1fr_0.95fr] lg:gap-12 lg:pb-12">
          <div className="max-w-[430px] rounded-2xl border border-[#1F1F1F]/85 bg-[#080B08] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-6 lg:-ml-1">
            <Link href="/" aria-label="iptvkaufenX Startseite" className="inline-flex rounded-xl">
              <Image
                src="/brand/iptv-kaufen-logo.webp"
                alt="IPTV Kaufen Logo"
                width={520}
                height={260}
                loading="lazy"
                sizes="(max-width: 639px) 175px, 205px"
                className="h-auto w-[175px] transition duration-300 sm:w-[205px]"
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#263026] bg-[#0A0F0A] text-[#F5F5F5]/82 shadow-[0_8px_20px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-[#A6FF00]/60 hover:text-[#A6FF00]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[15px] font-bold uppercase tracking-[0.16em] text-[#A6FF00]">
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
            <h2 className="text-[15px] font-bold uppercase tracking-[0.16em] text-[#A6FF00]">
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
            <h2 className="text-[15px] font-bold uppercase tracking-[0.16em] text-[#A6FF00]">
              Kontakt
            </h2>
            <nav className="mt-5 flex flex-col gap-4" aria-label="Footer Kontakt">
              {contactLinks.map(({ label, href, Icon, ...link }) => {
                const content = (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#263026] bg-[#080B08] text-[#A6FF00]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <span>{label}</span>
                      {"sublabel" in link && link.sublabel ? (
                        <span className="text-[12px] font-normal text-[#F5F5F5]/52">{link.sublabel}</span>
                      ) : null}
                    </span>
                  </>
                );

                if ("external" in link) {
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-[14px] font-normal text-[#F5F5F5]/72 transition duration-300 hover:text-[#A6FF00]"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <Link
                    key={label}
                    href={href}
                    className="inline-flex items-center gap-3 text-[14px] font-normal text-[#F5F5F5]/72 transition duration-300 hover:text-[#A6FF00]"
                  >
                    {content}
                  </Link>
                );
              })}
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
      </div>
    </footer>
  );
}
