"use server";

import { revalidatePath } from "next/cache";
import { saveTestimonial, deleteTestimonial, type Testimonial } from "@/lib/testimonials-store";

export async function saveTestimonialAction(formData: FormData) {
  const id = String(formData.get("id") || `test-${Date.now()}`);
  const name = String(formData.get("name") || "").trim();
  const org = String(formData.get("org") || "").trim();
  const avatar = String(formData.get("avatar") || "/reviews/ajay.png").trim();
  const stars = Number(formData.get("stars") || 5);
  const quote = String(formData.get("quote") || "").trim();
  const featured = formData.get("featured") === "on" || formData.get("featured") === "true";
  const order = Number(formData.get("order") || 99);

  if (!name || !quote) {
    throw new Error("Name and quote are required.");
  }

  const testimonial: Testimonial = {
    id,
    name,
    org,
    avatar,
    stars,
    quote,
    featured,
    order,
  };

  saveTestimonial(testimonial);

  revalidatePath("/");
  revalidatePath("/admin/social-proof/testimonials");
  revalidatePath("/admin");
}

export async function deleteTestimonialAction(id: string) {
  deleteTestimonial(id);
  revalidatePath("/");
  revalidatePath("/admin/social-proof/testimonials");
  revalidatePath("/admin");
}
