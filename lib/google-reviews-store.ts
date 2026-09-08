import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export type GoogleReviewStatus = "Published" | "Approved" | "Pending Approval" | "Imported";

export interface GoogleReview {
  id: string;
  reviewer: string;
  role?: string;
  rating: number;
  date: string;
  status: GoogleReviewStatus;
  reviewText: string;
  featured?: boolean;
}

const FILE = "google-reviews.json";

export function getGoogleReviews(): GoogleReview[] {
  return readJSON<GoogleReview[]>(FILE, []);
}

export function saveGoogleReview(item: GoogleReview): void {
  const list = getGoogleReviews();
  const existingIdx = list.findIndex((r) => r.id === item.id);
  if (existingIdx >= 0) {
    list[existingIdx] = item;
  } else {
    list.unshift(item);
  }
  writeJSON(FILE, list);
}

export function updateGoogleReviewStatus(id: string, status: GoogleReviewStatus): void {
  const list = getGoogleReviews();
  const item = list.find((r) => r.id === id);
  if (item) {
    item.status = status;
    writeJSON(FILE, list);
  }
}

export function deleteGoogleReview(id: string): void {
  const list = getGoogleReviews();
  const filtered = list.filter((r) => r.id !== id);
  writeJSON(FILE, filtered);
}
