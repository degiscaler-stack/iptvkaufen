const categories = [
  { title: "Bundesliga", label: "Live-Spiele und Fußballmomente" },
  { title: "Champions League", label: "Internationale Top-Abende" },
  { title: "Filme", label: "Blockbuster und Klassiker" },
  { title: "Serien", label: "Staffeln für jeden Abend" },
  { title: "Sport Live", label: "Sportkanäle in HD und 4K" },
  { title: "Kinder & Familie", label: "Unterhaltung für zuhause" },
] as const;

function CategoryIcon({ index }: { index: number }) {
  const iconClass = "h-8 w-8 text-[#A6FF00]";

  if (index === 0 || index === 1 || index === 4) {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="m12 3.8 3.2 4.2-1.2 4.7h-4L8.8 8 12 3.8ZM6.1 12.8l3.9-.1 2 3.6-2.8 3M17.9 12.8l-3.9-.1-2 3.6 2.8 3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 6v12M16 6v12M4 10h16M4 14h16" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="12" rx="2.4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 20h6M12 17v3M9 10h6M9 13h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4.5c-2.2 0-4 1.8-4 4 0 3 4 6.8 4 6.8s4-3.8 4-6.8c0-2.2-1.8-4-4-4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7.5 15.7c-2 .7-3.2 1.8-3.2 3 0 1.5 3.4 2.8 7.7 2.8s7.7-1.3 7.7-2.8c0-1.2-1.2-2.3-3.2-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function ContentPreview() {
  return (
    <section className="relative isolate overflow-hidden bg-[#000000] px-5 py-14 sm:px-8 sm:py-16 lg:px-0 lg:py-[4.5rem]">
      <div className="mx-auto max-w-[1360px] lg:px-12">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="text-balance text-[2.05rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F5F5F5] [text-shadow:0_2px_14px_rgba(0,0,0,0.42)] sm:text-[2.8rem] lg:text-[3.2rem]">
            Alles sehen,{" "}
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#A6FF00] to-[#F5F5F5] bg-clip-text text-transparent [text-shadow:none]">
              was Sie lieben
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[620px] text-[14px] leading-6 text-[#E6E6E6]/88 sm:text-[15px] sm:leading-7">
            Genießen Sie Live-TV, Sport, Filme und Serien in HD, Full HD und 4K – auf allen Geräten.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-10 lg:grid-cols-3">
          {categories.map((category, index) => (
            <article
              key={category.title}
              className="group relative isolate min-h-[10rem] overflow-hidden rounded-3xl border border-[#1F1F1F]/85 bg-[#090909] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-300 hover:-translate-y-1 hover:border-[#A6FF00]/35"
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(166,255,0,0.12),transparent_15rem)] opacity-70 transition duration-300 group-hover:opacity-100" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A6FF00]/8">
                <CategoryIcon index={index} />
              </div>
              <h3 className="mt-5 text-xl font-black tracking-[-0.035em] text-[#F5F5F5]">{category.title}</h3>
              <p className="mt-2 max-w-[18rem] text-sm leading-6 text-[#E6E6E6]/78">{category.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
