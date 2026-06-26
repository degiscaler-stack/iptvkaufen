import Image from "next/image";
import type { BlogSection, BlogCategory } from "@/lib/blog/types";
import BlogCoverImage from "@/components/blog/BlogCoverImage";
import { renderInlineContent } from "@/lib/blog/inline-content";

type BlogArticleContentProps = {
  sections: BlogSection[];
};

function BlogInlineImage({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-[22px] border border-[#1F1F1F] bg-[#050505]">
      <div className="relative aspect-[16/10]">
        <Image
          src={src}
          alt={alt}
          title={title}
          fill
          sizes="(max-width: 768px) 100vw, 820px"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <figcaption className="border-t border-[#1F1F1F]/80 px-4 py-3 text-[12px] text-[#F5F5F5]/48">
        {title}
      </figcaption>
    </figure>
  );
}

function ParagraphList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{renderInlineContent(item)}</li>
      ))}
    </ul>
  );
}

function SectionBody({
  paragraphs,
  list,
}: {
  paragraphs: string[];
  list?: string[];
}) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{renderInlineContent(paragraph)}</p>
      ))}
      {list ? <ParagraphList items={list} /> : null}
    </>
  );
}

export default function BlogArticleContent({ sections }: BlogArticleContentProps) {
  return (
    <div className="blog-prose">
      {sections.map((section) => {
        const HeadingTag = section.level === 2 ? "h2" : "h3";

        return (
          <section key={section.id} id={section.id} className="scroll-mt-32">
            <HeadingTag>{section.heading}</HeadingTag>
            <SectionBody paragraphs={section.paragraphs} list={section.list} />
            {section.image ? (
              <BlogInlineImage
                src={section.image.src}
                alt={section.image.alt}
                title={section.image.title}
              />
            ) : null}
            {section.subsections?.map((subsection) => (
              <div key={subsection.id} id={subsection.id} className="scroll-mt-32 mt-8">
                <h4>{subsection.heading}</h4>
                <SectionBody
                  paragraphs={subsection.paragraphs}
                  list={subsection.list}
                />
              </div>
            ))}
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
  title?: string;
  priority?: boolean;
};

export function BlogArticleHeroImage({
  image,
  category,
  alt,
  title,
  priority = true,
}: BlogArticleHeroImageProps) {
  const useDirectImage = Boolean(image && image.startsWith("/images/"));

  return (
    <figure className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[26px] border border-[#1F1F1F] bg-[#050505]">
      {useDirectImage ? (
        <Image
          src={image!}
          alt={alt}
          title={title ?? alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 820px"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <BlogCoverImage
          image={image}
          category={category}
          alt={alt}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 820px"
          priority={priority}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/35 via-transparent to-transparent" />
    </figure>
  );
}
