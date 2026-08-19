import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CatalogIndex, SenderCard } from "@/lib/senderliste/types";
import { buildSenderCards } from "@/lib/senderliste/utils";

const dataDir = path.join(process.cwd(), "public", "data", "senderliste");

async function readJsonFile<T>(relativePath: string): Promise<T> {
  const raw = await readFile(path.join(dataDir, relativePath), "utf8");
  return JSON.parse(raw) as T;
}

export type SenderlisteInitialData = {
  initialCards: SenderCard[];
};

/** Loads lightweight Senderliste card metadata for server components / SSG. */
export async function getSenderlisteInitialData(): Promise<SenderlisteInitialData> {
  const catalogIndex = await readJsonFile<CatalogIndex>("country-index.json");

  return {
    initialCards: buildSenderCards(catalogIndex),
  };
}
