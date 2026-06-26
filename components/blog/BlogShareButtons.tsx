import { SITE_URL } from "@/lib/seo";

type BlogShareButtonsProps = {
  title: string;
  slug: string;
};

export default function BlogShareButtons({ title, slug }: BlogShareButtonsProps) {
  const url = `${SITE_URL}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "E-Mail",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  return (
    <section aria-labelledby="share-heading" className="mt-8">
      <h2
        id="share-heading"
        className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#A6FF00]"
      >
        Artikel teilen
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#1F1F1F] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#F5F5F5]/72 transition duration-300 hover:border-[#A6FF00]/30 hover:text-[#A6FF00]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
