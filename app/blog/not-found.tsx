import Link from "next/link";
import { ctaSolidGreenClass } from "@/lib/cta-motion";

export default function BlogNotFound() {
  return (
    <main className="min-h-screen bg-[#000000] px-5 pb-14 pt-28 text-[#F5F5F5] sm:px-8 sm:pb-16 sm:pt-32 lg:px-0 lg:pb-20 lg:pt-36">
      <div className="mx-auto max-w-[640px] text-center lg:px-12">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#A6FF00]">
          Artikel nicht gefunden
        </p>
        <h1 className="text-[2rem] font-black tracking-[-0.04em] sm:text-[2.5rem]">
          Dieser Artikel existiert nicht
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-[#E6E6E6]/82">
          Der gesuchte Blog-Artikel wurde nicht gefunden. Entdecken Sie stattdessen unsere
          neuesten IPTV Guides.
        </p>
        <Link
          href="/blog"
          className={`${ctaSolidGreenClass} mt-7 inline-flex rounded-full bg-[#A6FF00] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.12em] transition duration-300 hover:bg-[#C7FF62]`}
        >
          Zum Blog
        </Link>
      </div>
    </main>
  );
}
