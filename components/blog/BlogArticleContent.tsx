import type { BlogSection, BlogCategory } from "@/lib/blog/types";
import BlogCoverImage from "@/components/blog/BlogCoverImage";

type BlogArticleContentProps = {
  sections: BlogSection[];
};

export default function BlogArticleContent({ sections }: BlogArticleContentProps) {
  return (
    <div className="blog-prose">
      {sections.map((section) => {
        const HeadingTag = section.level === 2 ? "h2" : "h3";

        return (
          <section key={section.id} id={section.id} className="scroll-mt-32">
            <HeadingTag>{section.heading}</HeadingTag>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list ? (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

type BlogArticleHeroImageProps = {
  image?: string | null;
  category: BlogCategory;
  alt: string;
  priority?: boolean;
};

export function BlogArticleHeroImage({
  image,
  category,
  alt,
  priority = true,
}: BlogArticleHeroImageProps) {
  return (
    <figure className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[26px] border border-[#1F1F1F] bg-[#050505]">
      <BlogCoverImage
        image={image}
        category={category}
        alt={alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 820px"
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/35 via-transparent to-transparent" />
    </figure>
  );
}
