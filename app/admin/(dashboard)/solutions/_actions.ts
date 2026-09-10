"use server";

import { revalidatePath } from "next/cache";
import {
  saveSolution,
  deleteSolution,
  saveIndustry,
  deleteIndustry,
  type SolutionOffering,
  type IndustryItem,
} from "@/lib/solutions-store";

export async function saveSolutionAction(formData: FormData) {
  const id = String(formData.get("id") || `sol-${Date.now()}`);
  const title = String(formData.get("title") || "").trim();
  const desc = String(formData.get("desc") || "").trim();
  const itemsRaw = String(formData.get("items") || "").trim();
  const order = Number(formData.get("order") || 99);

  if (!title || !desc) {
    throw new Error("Title and description are required.");
  }

  const items = itemsRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const solution: SolutionOffering = {
    id,
    title,
    desc,
    items,
    order,
  };

  saveSolution(solution);
  revalidatePath("/");
  revalidatePath("/solutions");
  revalidatePath("/admin/solutions");
}

export async function deleteSolutionAction(id: string) {
  deleteSolution(id);
  revalidatePath("/");
  revalidatePath("/solutions");
  revalidatePath("/admin/solutions");
}

export async function saveIndustryAction(formData: FormData) {
  const id = String(formData.get("id") || `ind-${Date.now()}`);
  const t = String(formData.get("title") || "").trim();
  const d = String(formData.get("desc") || "").trim();
  const order = Number(formData.get("order") || 99);

  if (!t || !d) {
    throw new Error("Industry title and description are required.");
  }

  const industry: IndustryItem = {
    id,
    t,
    d,
    order,
  };

  saveIndustry(industry);
  revalidatePath("/solutions");
  revalidatePath("/admin/solutions/industries");
}

export async function deleteIndustryAction(id: string) {
  deleteIndustry(id);
  revalidatePath("/solutions");
  revalidatePath("/admin/solutions/industries");
}
