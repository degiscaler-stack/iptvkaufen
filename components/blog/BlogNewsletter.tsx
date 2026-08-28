import Link from "next/link";

export default function BlogNewsletter() {
  return (
    <section
      aria-labelledby="editorial-contact-heading"
      className="rounded-[26px] border border-[#1F1F1F] bg-[#0A0F0A] p-6 sm:p-8"
    >
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
        Redaktion
      </p>
      <h2
        id="editorial-contact-heading"
        className="text-[1.25rem] font-bold tracking-[-0.02em] text-[#F5F5F5] sm:text-[1.4rem]"
      >
        Hinweis oder Korrektur?
      </h2>
      <p className="mt-3 text-[14px] leading-7 text-[#E6E6E6]/78">
        Die iptvkaufenX Redaktion nimmt Fragen zu Artikeln und technische Hinweise entgegen – nicht
        Bestellungen von IPTV-Zugängen.
      </p>
      <Link
        href="/kontakt"
        className="mt-5 inline-flex rounded-full border border-[#A6FF00]/30 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#A6FF00] transition duration-300 hover:border-[#A6FF00]/55 hover:text-[#C7FF62]"
      >
        Zur Kontaktseite
      </Link>
    </section>
  );
}
