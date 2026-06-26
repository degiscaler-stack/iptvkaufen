import Link from "next/link";

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

export default function BlogPagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  function getPageHref(page: number) {
    return page === 1 ? basePath : `${basePath}/seite/${page}`;
  }

  return (
    <nav aria-label="Blog Seitennavigation" className="mt-10 flex justify-center">
      <ul className="flex flex-wrap items-center gap-2">
        {currentPage > 1 ? (
          <li>
            <Link
              href={getPageHref(currentPage - 1)}
              className="rounded-full border border-[#1F1F1F] px-4 py-2 text-[13px] font-medium text-[#F5F5F5]/72 transition duration-300 hover:border-[#A6FF00]/30 hover:text-[#A6FF00]"
            >
              ← Zurück
            </Link>
          </li>
        ) : null}

        {pages.map((page) => (
          <li key={page}>
            <Link
              href={getPageHref(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-semibold transition duration-300 ${
                page === currentPage
                  ? "bg-[#A6FF00] text-[#050505]"
                  : "border border-[#1F1F1F] text-[#F5F5F5]/72 hover:border-[#A6FF00]/30 hover:text-[#A6FF00]"
              }`}
            >
              {page}
            </Link>
          </li>
        ))}

        {currentPage < totalPages ? (
          <li>
            <Link
              href={getPageHref(currentPage + 1)}
              className="rounded-full border border-[#1F1F1F] px-4 py-2 text-[13px] font-medium text-[#F5F5F5]/72 transition duration-300 hover:border-[#A6FF00]/30 hover:text-[#A6FF00]"
            >
              Weiter →
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
