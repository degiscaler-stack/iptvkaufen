import type { BlogFaqItem } from "@/lib/blog/types";

type BlogFaqProps = {
  items: BlogFaqItem[];
};

export default function BlogFaq({ items }: BlogFaqProps) {
  if (!items.length) return null;

  return (
    <section aria-labelledby="article-faq-heading" className="mt-12">
      <h2
        id="article-faq-heading"
        className="text-[1.35rem] font-bold tracking-[-0.02em] text-[#F5F5F5] sm:text-[1.55rem]"
      >
        Häufig gestellte Fragen
      </h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-[#1F1F1F] bg-[#050806]/80 p-5 transition duration-300 open:border-[#A6FF00]/25"
          >
            <summary className="cursor-pointer list-none text-[15px] font-semibold text-[#F5F5F5] marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                {item.question}
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#A6FF00] transition duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-[14px] leading-7 text-[#E6E6E6]/82">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
