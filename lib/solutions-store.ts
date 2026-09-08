import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export interface SolutionOffering {
  id: string;
  title: string;
  desc: string;
  items: string[];
  order?: number;
}

export interface IndustryItem {
  id: string;
  t: string;
  d: string;
  order?: number;
}

const SOLUTIONS_FILE = "solutions.json";
const INDUSTRIES_FILE = "industries.json";

export function getSolutions(): SolutionOffering[] {
  const list = readJSON<SolutionOffering[]>(SOLUTIONS_FILE, []);
  return list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function saveSolution(item: SolutionOffering): void {
  const list = getSolutions();
  const existingIdx = list.findIndex((s) => s.id === item.id);
  if (existingIdx >= 0) {
    list[existingIdx] = item;
  } else {
    list.push(item);
  }
  writeJSON(SOLUTIONS_FILE, list);
}

export function deleteSolution(id: string): void {
  const list = getSolutions();
  const filtered = list.filter((s) => s.id !== id);
  writeJSON(SOLUTIONS_FILE, filtered);
}

export function getIndustries(): IndustryItem[] {
  const list = readJSON<IndustryItem[]>(INDUSTRIES_FILE, []);
  return list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function saveIndustry(item: IndustryItem): void {
  const list = getIndustries();
  const existingIdx = list.findIndex((i) => i.id === item.id);
  if (existingIdx >= 0) {
    list[existingIdx] = item;
  } else {
    list.push(item);
  }
  writeJSON(INDUSTRIES_FILE, list);
}

export function deleteIndustry(id: string): void {
  const list = getIndustries();
  const filtered = list.filter((i) => i.id !== id);
  writeJSON(INDUSTRIES_FILE, filtered);
}
