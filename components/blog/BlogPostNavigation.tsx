import type { BlogPostSummary } from "@/lib/blog/types";
import Link from "next/link";

type BlogPostNavigationProps = {
  previous: BlogPostSummary | null;
  next: BlogPostSummary | null;
};

export default function BlogPostNavigation({ previous, next }: BlogPostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Artikel Navigation"
      className="mt-10 grid gap-4 border-t border-[#1F1F1F] pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="group rounded-2xl border border-[#1F1F1F] bg-[#050806]/60 p-5 transition duration-300 hover:border-[#A6FF00]/25"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5F5F5]/45">
            ← Vorheriger Artikel
          </span>
          <p className="mt-2 text-[15px] font-semibold leading-snug text-[#F5F5F5] transition duration-300 group-hover:text-[#A6FF00]">
            {previous.title}
          </p>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group rounded-2xl border border-[#1F1F1F] bg-[#050806]/60 p-5 text-right transition duration-300 hover:border-[#A6FF00]/25 sm:col-start-2"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5F5F5]/45">
            Nächster Artikel →
          </span>
          <p className="mt-2 text-[15px] font-semibold leading-snug text-[#F5F5F5] transition duration-300 group-hover:text-[#A6FF00]">
            {next.title}
          </p>
        </Link>
      ) : null}
    </nav>
  );
}
