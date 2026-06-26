import type { BlogSection } from "@/lib/blog/types";

type BlogTableOfContentsProps = {
  sections: BlogSection[];
};

export default function BlogTableOfContents({ sections }: BlogTableOfContentsProps) {
  const headings = sections.filter((section) => section.level === 2);
  if (!headings.length) return null;

  return (
    <nav aria-labelledby="toc-heading" className="rounded-2xl border border-[#1F1F1F] bg-[#050806]/80 p-5">
      <h2
        id="toc-heading"
        className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#A6FF00]"
      >
        Inhaltsverzeichnis
      </h2>
      <ol className="mt-4 grid gap-2">
        {headings.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="flex gap-3 text-[14px] leading-6 text-[#E6E6E6]/78 transition duration-300 hover:text-[#A6FF00]"
            >
              <span className="shrink-0 font-semibold text-[#A6FF00]/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{section.heading}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
