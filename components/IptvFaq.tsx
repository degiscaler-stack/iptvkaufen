"use client";

import { useId, useState } from "react";

const faqItems = [
  {
    question: "Was ist bei IPTV Kaufen enthalten?",
    answer:
      "Sie erhalten Zugriff auf Live-TV Sender, Filme, Serien, Sport und weitere Inhalte. Die Nutzung ist auf verschiedenen Geräten möglich, darunter Smart TV, Android TV, Fire TV, Smartphone, Tablet, PC und TV Box.",
  },
  {
    question: "Auf welchen Geräten kann ich IPTV nutzen?",
    answer:
      "IPTV Kaufen funktioniert auf vielen modernen Geräten, zum Beispiel Smart TV, Android TV, Fire TV, MAG Box, Windows, Smartphone, Tablet, TV Box und weiteren kompatiblen Geräten.",
  },
  {
    question: "Wie schnell erhalte ich meinen Zugang nach der Bestellung?",
    answer:
      "Nach der Bestellung werden Ihre Zugangsdaten schnell bereitgestellt. Danach können Sie die Einrichtung auf Ihrem bevorzugten Gerät starten.",
  },
  {
    question: "Welche Zahlungsmethoden werden unterstützt?",
    answer:
      "Sie können Ihre Bestellung über die verfügbaren Zahlungsmethoden auf der Website abschließen. Nach erfolgreicher Zahlung erhalten Sie die nächsten Schritte und Ihre Zugangsdaten.",
  },
  {
    question: "Gibt es Support bei der Einrichtung?",
    answer:
      "Ja. Bei Fragen zur Einrichtung oder Nutzung steht Ihnen Support zur Verfügung, damit Sie IPTV schnell und korrekt auf Ihrem Gerät verwenden können.",
  },
  {
    question: "Gibt es eine Geld-zurück-Garantie?",
    answer:
      "Ja. Sie können innerhalb von 30 Tagen nach dem Kauf eine Rückerstattung beantragen, wenn Sie mit dem Service nicht zufrieden sind – gemäß unserer Rückerstattungsrichtlinie.",
  },
] as const;

function AccordionIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-6 w-6 shrink-0 items-center justify-center text-[#A6FF00]"
    >
      <span className="absolute h-[2px] w-4 rounded-full bg-current" />
      <span
        className={`absolute h-4 w-[2px] rounded-full bg-current transition-transform duration-300 ease-out ${
          isOpen ? "scale-y-0" : "scale-y-100"
        }`}
      />
    </span>
  );
}

export default function IptvFaq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="iptv-faq-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-0 py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#A6FF00]/25 bg-[#111111]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mb-4 sm:text-[11px]">
            FAQ
          </p>
          <h2
            id="iptv-faq-heading"
            className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.65rem] lg:text-[3rem]"
          >
            Häufige Fragen zu{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              IPTV Kaufen
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[720px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:mt-4 sm:text-[15px] sm:leading-7">
            Hier finden Sie Antworten auf die wichtigsten Fragen zu Nutzung, Geräten, Qualität und
            Aktivierung.
          </p>
        </div>

        <div className="mt-8 w-full sm:mt-10">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `${baseId}-button-${index}`;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <div
                key={item.question}
                className={`faq-item mb-3 overflow-hidden rounded-2xl border border-[#A6FF00]/30 shadow-[0_10px_28px_rgba(0,0,0,0.34)] transition-[border-color,box-shadow] duration-300 last:mb-0 sm:mb-4 ${
                  isOpen
                    ? "shadow-[0_0_14px_rgba(166,255,0,0.1),0_12px_32px_rgba(0,0,0,0.38)]"
                    : "hover:border-[#A6FF00]/45 hover:shadow-[0_0_10px_rgba(166,255,0,0.08),0_12px_30px_rgba(0,0,0,0.36)]"
                }`}
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    className="flex min-h-[58px] w-full items-center justify-between gap-4 bg-[#111111]/70 px-4 py-4 text-left text-[#F5F5F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-[background-color,box-shadow] duration-300 hover:bg-[#141414]/80 hover:shadow-[0_0_10px_rgba(166,255,0,0.08)] focus:bg-[#111111]/70 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6FF00]/55 active:bg-[#111111]/80 data-[open=true]:bg-[#111111]/75 data-[open=true]:shadow-[inset_0_1px_0_rgba(166,255,0,0.08),0_0_10px_rgba(166,255,0,0.08)] sm:min-h-[64px] sm:gap-5 sm:px-6 sm:py-5"
                    data-open={isOpen}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                  >
                    <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-[#F5F5F5] sm:text-[16px]">
                      {item.question}
                    </span>
                    <AccordionIcon isOpen={isOpen} />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#A6FF00]/35 bg-[linear-gradient(180deg,#0d120d_0%,#060806_100%)] px-4 py-4 shadow-[inset_0_1px_0_rgba(166,255,0,0.1)] sm:px-6 sm:py-5">
                      <p className="text-[14px] leading-6 text-[#F0F0F0]/92 sm:text-[15px] sm:leading-7">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
