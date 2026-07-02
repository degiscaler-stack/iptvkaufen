import Link from "next/link";
import { ctaSolidGreenClass } from "@/lib/cta-motion";
import { BLOG_CLUSTER_ORDER, BLOG_CATEGORIES } from "@/lib/blog/types";

const blogFooterLinks = [
  { label: "Alle Artikel", href: "/blog" },
  ...BLOG_CLUSTER_ORDER.map((slug) => ({
    label: BLOG_CATEGORIES[slug].label,
    href: `/blog/kategorie/${slug}`,
  })),
  { label: "RSS Feed", href: "/feed.xml" },
] as const;

export default function BlogFooter() {
  return (
    <section
      aria-label="Blog Navigation"
      className="mt-14 rounded-[26px] border border-[#1F1F1F] bg-[#080B08] p-6 sm:p-8"
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="text-[15px] font-bold uppercase tracking-[0.16em] text-[#A6FF00]">
            iptvkaufenX Blog
          </h2>
          <p className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/72">
            Strukturierte IPTV SEO-Leitfäden für Deutschland – nach Themenclustern sortiert und
            redaktionell vorbereitet.
          </p>
        </div>

        <nav aria-label="Blog Kategorien">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#F5F5F5]/55">
            Themencluster
          </h3>
          <ul className="mt-3 grid gap-2">
            {blogFooterLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[14px] text-[#F5F5F5]/68 transition duration-300 hover:text-[#A6FF00]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#F5F5F5]/55">
            Premium IPTV
          </h3>
          <p className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/72">
            Über 22.000 Sender, Filme und Sport in HD &amp; 4K – sofort aktiviert.
          </p>
          <Link
            href="/"
            className={`${ctaSolidGreenClass} mt-4 inline-flex rounded-full bg-[#A6FF00] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] transition duration-300 hover:bg-[#C7FF62]`}
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </section>
  );
}
