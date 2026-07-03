import type {
  CatalogCountryFile,
  CatalogIndex,
  PageSearchIndex,
} from "@/lib/senderliste/types";

const countryCache = new Map<string, CatalogCountryFile>();
let catalogIndexPromise: Promise<CatalogIndex> | null = null;
let pageSearchIndexPromise: Promise<PageSearchIndex> | null = null;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error(`Failed to load ${url}`);
  }

  return response.json() as Promise<T>;
}

export function loadCatalogIndex(): Promise<CatalogIndex> {
  if (!catalogIndexPromise) {
    catalogIndexPromise = fetchJson<CatalogIndex>("/data/senderliste/country-index.json");
  }

  return catalogIndexPromise;
}

export function loadPageSearchIndex(): Promise<PageSearchIndex> {
  if (!pageSearchIndexPromise) {
    pageSearchIndexPromise = fetchJson<PageSearchIndex>(
      "/data/senderliste/page-search-index.json",
    );
  }

  return pageSearchIndexPromise;
}

export async function loadCountryChannels(code: string): Promise<CatalogCountryFile> {
  const normalized = code.toLowerCase();
  const cached = countryCache.get(normalized);

  if (cached) {
    return cached;
  }

  const data = await fetchJson<CatalogCountryFile>(
    `/data/senderliste/countries/${normalized}.json`,
  );

  countryCache.set(normalized, data);
  return data;
}

export function getCachedCountryChannels(code: string): CatalogCountryFile | undefined {
  return countryCache.get(code.toLowerCase());
}
