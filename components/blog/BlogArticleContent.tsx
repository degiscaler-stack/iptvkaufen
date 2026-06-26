import type { BlogSection } from "@/lib/blog/types";
import Image from "next/image";

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
  src: string;
  alt: string;
  priority?: boolean;
};

export function BlogArticleHeroImage({
  src,
  alt,
  priority = true,
}: BlogArticleHeroImageProps) {
  return (
    <figure className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[26px] border border-[#1F1F1F]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 820px"
        className="object-cover"
        priority={priority}
      />
    </figure>
  );
}
