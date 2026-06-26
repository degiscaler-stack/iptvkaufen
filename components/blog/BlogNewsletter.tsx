"use client";

import { useState, type FormEvent } from "react";

export default function BlogNewsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="rounded-[26px] border border-[#1F1F1F] bg-[#0A0F0A] p-6 sm:p-8"
    >
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
        Newsletter
      </p>
      <h2
        id="newsletter-heading"
        className="text-[1.25rem] font-bold tracking-[-0.02em] text-[#F5F5F5] sm:text-[1.4rem]"
      >
        IPTV Tipps direkt in Ihr Postfach
      </h2>
      <p className="mt-3 text-[14px] leading-7 text-[#E6E6E6]/78">
        Erhalten Sie die neuesten Guides, Einrichtungstipps und Streaming-News. Kein Spam,
        jederzeit abmeldbar.
      </p>

      {submitted ? (
        <p className="mt-5 rounded-2xl border border-[#A6FF00]/25 bg-[#0A1008] px-4 py-3 text-[14px] font-medium text-[#A6FF00]">
          Vielen Dank! Ihre Anmeldung wurde registriert.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            E-Mail-Adresse
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="ihre@email.de"
            className="flex-1 rounded-full border border-[#1F1F1F] bg-[#050806] px-5 py-3 text-[14px] text-[#F5F5F5] outline-none transition duration-300 placeholder:text-[#F5F5F5]/35 focus:border-[#A6FF00]/50"
          />
          <button
            type="submit"
            className="rounded-full bg-[#A6FF00] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-[#050505] transition duration-300 hover:bg-[#C7FF62]"
          >
            Anmelden
          </button>
        </form>
      )}
    </section>
  );
}
