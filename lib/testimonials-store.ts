import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export interface Testimonial {
  id: string;
  name: string;
  org: string;
  avatar: string;
  stars: number;
  quote: string;
  featured?: boolean;
  order?: number;
}

const FILE = "testimonials.json";

export function getTestimonials(): Testimonial[] {
  const list = readJSON<Testimonial[]>(FILE, []);
  return list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function saveTestimonial(item: Testimonial): void {
  const list = getTestimonials();
  const existingIdx = list.findIndex((t) => t.id === item.id);
  if (existingIdx >= 0) {
    list[existingIdx] = item;
  } else {
    list.push(item);
  }
  writeJSON(FILE, list);
}

export function deleteTestimonial(id: string): void {
  const list = getTestimonials();
  const filtered = list.filter((t) => t.id !== id);
  writeJSON(FILE, filtered);
}
