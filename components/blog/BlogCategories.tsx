import Link from "next/link";
import { BLOG_CATEGORIES, type BlogCategory } from "@/lib/blog/types";
import { getPostsByCategory } from "@/lib/blog/posts";

type BlogCategoriesProps = {
  activeCategory?: BlogCategory;
};

export default function BlogCategories({ activeCategory }: BlogCategoriesProps) {
  const categories = Object.entries(BLOG_CATEGORIES) as [
    BlogCategory,
    (typeof BLOG_CATEGORIES)[BlogCategory],
  ][];

  return (
    <section aria-labelledby="blog-categories-heading">
      <h2
        id="blog-categories-heading"
        className="text-[15px] font-bold uppercase tracking-[0.16em] text-[#A6FF00]"
      >
        Kategorien
      </h2>
      <ul className="mt-4 grid gap-2">
        {categories.map(([slug, category]) => {
          const count = getPostsByCategory(slug).length;
          if (count === 0) return null;
          const isActive = activeCategory === slug;

          return (
            <li key={slug}>
              <Link
                href={`/blog/kategorie/${slug}`}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-[14px] transition duration-300 ${
                  isActive
                    ? "border-[#A6FF00]/40 bg-[#0A1008] text-[#A6FF00]"
                    : "border-[#1F1F1F] bg-[#050806]/60 text-[#F5F5F5]/78 hover:border-[#A6FF00]/25 hover:text-[#A6FF00]"
                }`}
              >
                <span>{category.label}</span>
                <span className="text-[12px] text-[#F5F5F5]/45">{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
