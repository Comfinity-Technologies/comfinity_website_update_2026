"use server";

import { revalidatePath } from "next/cache";
import { saveLeader, deleteLeader, type Leader } from "@/lib/team-store";

export async function saveLeaderAction(formData: FormData) {
  const id = String(formData.get("id") || `leader-${Date.now()}`);
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const bio = String(formData.get("bio") || "").trim();
  const quote = String(formData.get("quote") || "").trim();
  const portraitUrl = String(formData.get("portraitUrl") || "").trim();
  const linkedin = String(formData.get("linkedin") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const order = Number(formData.get("order") || 99);

  if (!name || !role) {
    throw new Error("Name and role are required.");
  }

  const leader: Leader = {
    id,
    name,
    role,
    tagline,
    bio,
    quote,
    portraitUrl,
    linkedin,
    email,
    order,
  };

  saveLeader(leader);
  revalidatePath("/");
  revalidatePath("/about/leadership");
  revalidatePath("/admin/people");
  revalidatePath("/admin");
}

export async function deleteLeaderAction(id: string) {
  deleteLeader(id);
  revalidatePath("/");
  revalidatePath("/about/leadership");
  revalidatePath("/admin/people");
  revalidatePath("/admin");
}
