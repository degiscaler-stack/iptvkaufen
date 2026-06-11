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
    question: "Wie schnell erhalte ich meinen Zugang?",
    answer:
      "Nach der Bestellung werden die Zugangsdaten schnell bereitgestellt. Anschließend können Sie die Einrichtung auf Ihrem bevorzugten Gerät starten.",
  },
  {
    question: "Welche Qualität kann ich erwarten?",
    answer:
      "Je nach Gerät, App und Internetverbindung können Inhalte in HD, Full HD und 4K wiedergegeben werden. Für ein stabiles Erlebnis empfehlen wir eine zuverlässige Internetverbindung.",
  },
  {
    question: "Ist die Einrichtung einfach?",
    answer:
      "Ja. Die Einrichtung ist einfach und kann auf den meisten Geräten schnell durchgeführt werden. Sie erhalten die notwendigen Zugangsdaten und können IPTV direkt in einer kompatiblen App nutzen.",
  },
  {
    question: "Gibt es Support bei Problemen?",
    answer:
      "Ja. Bei Fragen zur Einrichtung oder Nutzung steht Ihnen Support zur Verfügung, damit Sie den Service schnell und korrekt verwenden können.",
  },
  {
    question: "Kann ich IPTV auf mehreren Geräten nutzen?",
    answer:
      "Die Nutzung hängt vom gewählten Paket und den Zugangsdaten ab. Prüfen Sie vor der Nutzung, ob Ihr Paket mehrere Geräte unterstützt.",
  },
  {
    question: "Warum iptvkaufenX wählen?",
    answer:
      "iptvkaufenX kombiniert große Inhaltsauswahl, moderne Gerätekompatibilität, schnelle Aktivierung und ein klares Streaming-Erlebnis in einem übersichtlichen Service.",
  },
] as const;

function AccordionIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-5 w-5 shrink-0 items-center justify-center text-[#A6FF00]"
    >
      <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
      <span
        className={`absolute h-3.5 w-[1.5px] rounded-full bg-current transition-transform duration-300 ${
          isOpen ? "scale-y-0" : "scale-y-100"
        }`}
      />
    </span>
  );
}

export default function IptvFaq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="iptv-faq-heading"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-10 sm:px-8 sm:py-12 lg:px-0 lg:py-14"
    >
      <div className="mx-auto max-w-[1360px] lg:px-12">
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

        <div className="mx-auto mt-6 max-w-[820px] sm:mt-8">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `${baseId}-button-${index}`;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <div
                key={item.question}
                className="mb-2.5 overflow-hidden rounded-xl border border-[#A6FF00]/20 bg-[#111111]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm transition-[border-color,box-shadow] duration-200 last:mb-0 hover:border-[#A6FF00]/30 sm:mb-3"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left sm:px-5 sm:py-4"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                  >
                    <span className="text-[14px] font-semibold leading-snug text-[#F5F5F5] sm:text-[15px]">
                      {item.question}
                    </span>
                    <AccordionIcon isOpen={isOpen} />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-[#A6FF00]/12 px-4 pb-4 pt-3 text-[13px] leading-6 text-[#E6E6E6]/88 sm:px-5 sm:pb-5 sm:text-[14px] sm:leading-7">
                      {item.answer}
                    </p>
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
