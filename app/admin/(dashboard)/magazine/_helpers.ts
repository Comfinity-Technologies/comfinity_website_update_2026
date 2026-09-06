import "server-only";
import { readJSON } from "@/lib/data-store";
import { magazinePages, type MagazinePage } from "@/lib/magazineData";

const FILE = "magazine-pages.json";

export function getMagazinePages(): MagazinePage[] {
  const saved = readJSON<MagazinePage[]>(FILE, []);
  if (saved && Array.isArray(saved) && saved.length > 0) {
    return saved;
  }
  return magazinePages;
}

export function getMagazinePageByIndex(index: number): { page: MagazinePage; isDefault: boolean } | null {
  const pages = getMagazinePages();
  const page = pages[index];
  if (!page) return null;
  const isDefault = !readJSON<MagazinePage[]>(FILE, []).length;
  return { page, isDefault };
}