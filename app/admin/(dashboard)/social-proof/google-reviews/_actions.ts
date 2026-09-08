"use server";

import { revalidatePath } from "next/cache";
import {
  saveGoogleReview,
  updateGoogleReviewStatus,
  deleteGoogleReview,
  type GoogleReview,
  type GoogleReviewStatus,
} from "@/lib/google-reviews-store";

export async function saveGoogleReviewAction(formData: FormData) {
  const id = String(formData.get("id") || `gr-${Date.now()}`);
  const reviewer = String(formData.get("reviewer") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const rating = Number(formData.get("rating") || 5);
  const date = String(
    formData.get("date") ||
      new Date().toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "numeric" })
  );
  const status = (formData.get("status") as GoogleReviewStatus) || "Approved";
  const reviewText = String(formData.get("reviewText") || "").trim();
  const featured = formData.get("featured") === "on" || formData.get("featured") === "true";

  if (!reviewer || !reviewText) {
    throw new Error("Reviewer name and review text are required.");
  }

  const review: GoogleReview = {
    id,
    reviewer,
    role,
    rating,
    date,
    status,
    reviewText,
    featured,
  };

  saveGoogleReview(review);
  revalidatePath("/admin/social-proof/google-reviews");
  revalidatePath("/admin");
}

export async function setGoogleReviewStatusAction(id: string, status: GoogleReviewStatus) {
  updateGoogleReviewStatus(id, status);
  revalidatePath("/admin/social-proof/google-reviews");
  revalidatePath("/admin");
}

export async function deleteGoogleReviewAction(id: string) {
  deleteGoogleReview(id);
  revalidatePath("/admin/social-proof/google-reviews");
  revalidatePath("/admin");
}
