"use server";

import { revalidatePath } from "next/cache";
import {
  saveCommunityProgram,
  deleteCommunityProgram,
  saveCommunityValues,
  CommunityProgram,
} from "@/lib/community-store";

export async function saveCommunityProgramAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim() || `prog-${Date.now()}`;
  const title = (formData.get("title") as string)?.trim() || "New Program";
  const desc = (formData.get("desc") as string)?.trim() || "";
  const itemsRaw = (formData.get("items") as string) || "";
  const items = itemsRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const order = parseInt(formData.get("order") as string, 10) || 1;

  const prog: CommunityProgram = {
    id,
    title,
    desc,
    items,
    order,
  };

  saveCommunityProgram(prog);
  revalidatePath("/community");
  revalidatePath("/admin/community");
  return { success: true };
}

export async function deleteCommunityProgramAction(id: string) {
  deleteCommunityProgram(id);
  revalidatePath("/community");
  revalidatePath("/admin/community");
  return { success: true };
}

export async function saveCommunityValuesAction(formData: FormData) {
  const raw = (formData.get("values") as string) || "";
  const values = raw
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);

  saveCommunityValues(values);
  revalidatePath("/community");
  revalidatePath("/admin/community");
  return { success: true };
}
