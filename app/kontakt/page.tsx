import type { Metadata } from "next";
import { FaEnvelope, FaFacebookF, FaHeadset, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { buildPageMetadata } from "@/lib/seo";
import { SEO_TITLES } from "@/lib/seo-titles";
import {
  WHATSAPP_CHAT_URL,
  WHATSAPP_PHONE_DISPLAY,
  WHATSAPP_SUPPORT_LABEL,
} from "@/lib/contact";
import { ctaSolidGreenClass } from "@/lib/cta-motion";

export const metadata: Metadata = buildPageMetadata({
  title: SEO_TITLES.kontakt,
  description:
    "Kontaktieren Sie iptvkaufenX für Fragen zu IPTV Paketen, Einrichtung, Support und Aktivierung.",
  path: "/kontakt",
  noIndex: true,
});

const contactItems = [
  {
    label: "E-Mail",
    value: "contact@iptvkaufenx.de",
    href: "mailto:contact@iptvkaufenx.de",
    Icon: FaEnvelope,
  },
  {
    label: "WhatsApp",
    value: WHATSAPP_PHONE_DISPLAY,
    sublabel: WHATSAPP_SUPPORT_LABEL,
    href: WHATSAPP_CHAT_URL,
    Icon: FaWhatsapp,
    external: true,
  },
  {
    label: "Support",
    value: "24/7 verfügbar",
    href: WHATSAPP_CHAT_URL,
    Icon: FaHeadset,
    external: true,
  },
] as const;

const socialLinks = [
  { label: "Facebook", href: "https://web.facebook.com/people/VisionHub/61588587400682/", Icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/visionhub.media/", Icon: FaInstagram },
  { label: "X/Twitter", href: "https://x.com/cod_jss27918", Icon: FaXTwitter },
  { label: "WhatsApp", href: WHATSAPP_CHAT_URL, Icon: FaWhatsapp },
] as const;

function ContactInput({
  id,
  label,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-semibold text-[#F5F5F5]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-2 h-12 w-full rounded-xl border border-[#1F1F1F] bg-[#080B08] px-4 text-[14px] text-[#F5F5F5] outline-none transition duration-300 placeholder:text-[#B8B8B8]/45 focus:border-[#A6FF00]/70 focus:bg-[#0A0F0A]"
      />
    </div>
  );
}

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-[#000000] px-5 pb-14 pt-28 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-32 lg:px-0 lg:pb-20 lg:pt-36">
      <section className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[860px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mb-4 sm:text-[11px]">
            Kontakt
          </p>
          <h1 className="text-balance text-[2.25rem] font-black leading-[1.02] tracking-[-0.055em] text-[#F5F5F5] sm:text-[3rem] lg:text-[3.6rem]">
            Kontaktieren Sie uns
          </h1>
          <p className="mx-auto mt-4 max-w-[760px] text-[15px] leading-7 text-[#E6E6E6]/86 sm:text-[16px] sm:leading-8">
            Haben Sie eine Frage, benötigen Sie Hilfe bei der Einrichtung oder möchten Sie mehr über
            unsere IPTV Pakete erfahren? Unser Support-Team hilft Ihnen schnell und zuverlässig weiter.
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-[1180px] gap-6 lg:mt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <form className="rounded-[26px] border border-[#1F1F1F] bg-[#050806] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-7 lg:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <ContactInput id="name" label="Vollständiger Name *" required />
              <ContactInput id="email" label="E-Mail-Adresse *" type="email" required />
            </div>

            <div className="mt-5">
              <ContactInput id="subject" label="Betreff" />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="text-[14px] font-semibold text-[#F5F5F5]">
                Nachricht *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={8}
                className="mt-2 w-full resize-y rounded-xl border border-[#1F1F1F] bg-[#080B08] px-4 py-3 text-[14px] leading-7 text-[#F5F5F5] outline-none transition duration-300 placeholder:text-[#B8B8B8]/45 focus:border-[#A6FF00]/70 focus:bg-[#0A0F0A]"
              />
            </div>

            <button
              type="button"
              className={`${ctaSolidGreenClass} mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#A6FF00] px-6 py-3 text-[13px] font-extrabold uppercase tracking-[0.13em] transition duration-300 hover:-translate-y-0.5 hover:bg-[#B8FF4D] sm:w-auto`}
            >
              Nachricht senden
            </button>
          </form>

          <aside className="rounded-[26px] border border-[#1F1F1F] bg-[#0A0F0A] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-7 lg:p-8">
            <h2 className="text-[1.55rem] font-black tracking-[-0.045em] text-[#F5F5F5]">
              Direkter Kontakt
            </h2>
            <p className="mt-3 text-[14px] leading-7 text-[#E6E6E6]/78">
              Nutzen Sie den schnellen Kontakt per WhatsApp oder E-Mail. Unser Support ist täglich
              erreichbar und hilft bei Fragen zu Paketen, Aktivierung und Einrichtung.
            </p>

            <div className="mt-6 grid gap-4">
              {contactItems.map(({ label, value, href, Icon, ...item }) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#263026] bg-[#080B08] text-[#A6FF00]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-[#A6FF00]">
                        {label}
                      </span>
                      <span className="mt-1 block text-[14px] font-medium text-[#F5F5F5]/84">{value}</span>
                      {"sublabel" in item && item.sublabel ? (
                        <span className="mt-1 block text-[12px] text-[#F5F5F5]/56">{item.sublabel}</span>
                      ) : null}
                    </span>
                  </>
                );

                if ("external" in item) {
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-2xl border border-[#1F1F1F] bg-[#050806] p-4 transition duration-300 hover:border-[#A6FF00]/45"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 rounded-2xl border border-[#1F1F1F] bg-[#050806] p-4 transition duration-300 hover:border-[#A6FF00]/45"
                  >
                    {content}
                  </a>
                );
              })}
            </div>

            <div className="mt-7">
              <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#A6FF00]">
                Social Media
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#263026] bg-[#050806] text-[#F5F5F5]/84 transition duration-300 hover:-translate-y-0.5 hover:border-[#A6FF00]/60 hover:text-[#A6FF00]"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#A6FF00]/45 bg-[#A6FF00]/10 px-5 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[#A6FF00] transition duration-300 hover:border-[#A6FF00]/70 hover:bg-[#A6FF00]/15"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              Schnell per WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
