import Link from "next/link";
import { WHATSAPP_CHAT_URL } from "@/lib/contact";
import { ctaSolidGreenClass } from "@/lib/cta-motion";

export type LegalContactLink = {
  prefix: string;
  href: string;
  label: string;
  ariaLabel?: string;
};

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  contactLinks?: LegalContactLink[];
  items?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalPage({ eyebrow, title, updatedAt, intro, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#000000] px-5 pb-14 pt-28 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-32 lg:px-0 lg:pb-20 lg:pt-36">
      <section className="mx-auto max-w-[1120px] lg:px-12">
        <div className="rounded-[28px] border border-[#1F1F1F] bg-[radial-gradient(circle_at_50%_0%,rgba(166,255,0,0.08),transparent_34%),linear-gradient(180deg,#071006_0%,#030503_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] sm:p-8 lg:p-10">
          <Link
            href="/"
            className="inline-flex text-[13px] font-semibold uppercase tracking-[0.16em] text-[#A6FF00] transition duration-300 hover:text-[#C7FF62]"
          >
            Zurück zur Startseite
          </Link>

          <div className="mt-8 max-w-[820px]">
            <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:text-[11px]">
              {eyebrow}
            </p>
            <h1 className="text-balance text-[2.15rem] font-black leading-[1.02] tracking-[-0.055em] text-[#F5F5F5] sm:text-[3rem] lg:text-[3.55rem]">
              {title}
            </h1>
            <p className="mt-4 text-[14px] leading-7 text-[#E6E6E6]/86 sm:text-[16px] sm:leading-8">
              {intro}
            </p>
            <p className="mt-4 text-[13px] font-medium text-[#A6FF00]/88">
              Stand: {updatedAt}
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:mt-10 sm:gap-5">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-[#1F1F1F]/90 bg-[#050806]/88 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-6"
              >
                <h2 className="text-[1.05rem] font-bold tracking-[-0.02em] text-[#F5F5F5] sm:text-[1.18rem]">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-[14px] leading-7 text-[#E6E6E6]/82 sm:text-[15px]">
                    {paragraph}
                  </p>
                ))}
                {section.contactLinks?.map((contactLink) => (
                  <p
                    key={`${contactLink.prefix}-${contactLink.label}`}
                    className="mt-3 text-[14px] leading-7 text-[#E6E6E6]/82 sm:text-[15px]"
                  >
                    {contactLink.prefix}:{" "}
                    <a
                      href={contactLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={contactLink.ariaLabel ?? contactLink.label}
                      className="font-medium text-[#A6FF00] underline-offset-4 transition duration-300 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]"
                    >
                      {contactLink.label}
                    </a>
                  </p>
                ))}
                {section.items ? (
                  <ul className="mt-4 grid gap-2.5 text-[14px] leading-7 text-[#E6E6E6]/82 sm:text-[15px]">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#A6FF00]/22 bg-[#0A1008]/80 p-5 shadow-[inset_0_1px_0_rgba(166,255,0,0.08)] sm:p-6">
            <h2 className="text-[1.05rem] font-bold text-[#F5F5F5]">Kontakt</h2>
            <p className="mt-3 text-[14px] leading-7 text-[#E6E6E6]/82 sm:text-[15px]">
              Bei Fragen zu dieser Seite, zur Nutzung des digitalen Dienstes oder zu Ihrem Zugang
              erreichen Sie iptvkaufenX über WhatsApp oder per E-Mail.
            </p>
            <div className="mt-4 flex flex-col gap-3 text-[14px] font-semibold sm:flex-row sm:flex-wrap">
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaSolidGreenClass} inline-flex w-fit rounded-full bg-[#A6FF00] px-4 py-2 transition duration-300 hover:bg-[#C7FF62]`}
              >
                WhatsApp Kontakt
              </a>
              <a
                href="mailto:support@iptvkaufenx.de"
                className="inline-flex w-fit rounded-full border border-[#A6FF00]/30 px-4 py-2 text-[#A6FF00] transition duration-300 hover:border-[#A6FF00]/60 hover:text-[#C7FF62]"
              >
                support@iptvkaufenx.de
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
