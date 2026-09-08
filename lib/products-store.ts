import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export type ProductStatus = "Idea" | "Research" | "Prototype" | "MVP" | "Beta" | "Live" | "Deprecated";
export type RoadmapStatus = "Planned" | "Researching" | "In Development" | "Testing" | "Released";

export interface Product {
  id: string;
  name: string;
  slug: string;
  tag: string;
  category?: string;
  status: ProductStatus;
  desc: string;
  image: string;
  featured?: boolean;
  order?: number;
}

export interface RoadmapItem {
  id: string;
  quarter: string;
  product: string;
  feature: string;
  status: RoadmapStatus;
  description: string;
}

const PRODUCTS_FILE = "products.json";
const ROADMAP_FILE = "roadmap.json";

export function getProductsCatalog(): Product[] {
  const list = readJSON<Product[]>(PRODUCTS_FILE, []);
  return list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function saveProduct(item: Product): void {
  const list = getProductsCatalog();
  const existingIdx = list.findIndex((p) => p.id === item.id);
  if (existingIdx >= 0) {
    list[existingIdx] = item;
  } else {
    list.push(item);
  }
  writeJSON(PRODUCTS_FILE, list);
}

export function deleteProduct(id: string): void {
  const list = getProductsCatalog();
  const filtered = list.filter((p) => p.id !== id);
  writeJSON(PRODUCTS_FILE, filtered);
}

export function getRoadmapItems(): RoadmapItem[] {
  return readJSON<RoadmapItem[]>(ROADMAP_FILE, []);
}

export function saveRoadmapItem(item: RoadmapItem): void {
  const list = getRoadmapItems();
  const existingIdx = list.findIndex((r) => r.id === item.id);
  if (existingIdx >= 0) {
    list[existingIdx] = item;
  } else {
    list.push(item);
  }
  writeJSON(ROADMAP_FILE, list);
}

export function deleteRoadmapItem(id: string): void {
  const list = getRoadmapItems();
  const filtered = list.filter((r) => r.id !== id);
  writeJSON(ROADMAP_FILE, filtered);
}
