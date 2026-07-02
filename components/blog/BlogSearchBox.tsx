"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ctaSolidGreenClass } from "@/lib/cta-motion";

type BlogSearchBoxProps = {
  defaultQuery?: string;
  action?: string;
};

export default function BlogSearchBox({
  defaultQuery = "",
  action = "/blog/suche",
}: BlogSearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`${action}?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative" role="search">
      <label htmlFor="blog-search" className="sr-only">
        Blog durchsuchen
      </label>
      <input
        id="blog-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Artikel suchen…"
        className="w-full rounded-full border border-[#1F1F1F] bg-[#050806]/90 py-3.5 pl-5 pr-28 text-[14px] text-[#F5F5F5] outline-none transition duration-300 placeholder:text-[#F5F5F5]/35 focus:border-[#A6FF00]/45"
      />
      <button
        type="submit"
        className={`${ctaSolidGreenClass} absolute right-1.5 top-1.5 rounded-full bg-[#A6FF00] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.1em] transition duration-300 hover:bg-[#C7FF62]`}
      >
        Suchen
      </button>
    </form>
  );
}
