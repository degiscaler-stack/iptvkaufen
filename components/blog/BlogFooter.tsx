import Link from "next/link";
import { getAllCategories } from "@/lib/blog/posts";
import { BLOG_CATEGORIES } from "@/lib/blog/types";

export default function BlogFooter() {
  const categories = getAllCategories();
  const blogFooterLinks = [
    { label: "Alle Artikel", href: "/blog" },
    ...categories.map((slug) => ({
      label: BLOG_CATEGORIES[slug].label,
      href: `/blog/kategorie/${slug}`,
    })),
    { label: "RSS Feed", href: "/feed.xml" },
  ];

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
            Technische IPTV-Ratgeber für Deutschland – zu Apps, Geräten, M3U und Einrichtung.
          </p>
        </div>

        <nav aria-label="Blog Kategorien">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#F5F5F5]/55">
            Themen
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
            Redaktion
          </h3>
          <p className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/72">
            Fragen zu Artikeln oder Korrekturhinweise? Die Redaktion ist über die Kontaktseite
            erreichbar.
          </p>
          <Link
            href="/kontakt"
            className="mt-4 inline-flex rounded-full border border-[#A6FF00]/30 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#A6FF00] transition duration-300 hover:border-[#A6FF00]/55 hover:text-[#C7FF62]"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </section>
  );
}
