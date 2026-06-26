import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BlogBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function BlogBreadcrumb({ items }: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#F5F5F5]/58">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-[#F5F5F5]/28">
                  /
                </span>
              ) : null}
              {isLast || !item.href ? (
                <span className={isLast ? "font-medium text-[#A6FF00]" : undefined}>{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="transition duration-300 hover:text-[#A6FF00]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
