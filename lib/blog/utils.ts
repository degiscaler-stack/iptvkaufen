export function formatGermanDate(dateString: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function slugToTag(slug: string, tags: string[]): string | undefined {
  return tags.find((tag) => tagToSlug(tag) === slug);
}
