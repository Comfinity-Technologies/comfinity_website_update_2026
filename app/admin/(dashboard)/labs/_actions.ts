"use server";

import { revalidatePath } from "next/cache";
import {
  saveLabInitiative,
  deleteLabInitiative,
  saveLabProgram,
  deleteLabProgram,
  saveLabDomains,
  LabInitiative,
  LabProgram,
} from "@/lib/labs-store";

export async function saveLabInitiativeAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim() || `init-${Date.now()}`;
  const name = (formData.get("name") as string)?.trim() || "New Lab Project";
  const phase = (formData.get("phase") as string)?.trim() || "Research Prototype";
  const status = (formData.get("status") as string)?.trim() || "Active";
  const category = (formData.get("category") as string)?.trim() || "AI & Systems";
  const summary = (formData.get("summary") as string)?.trim() || "";
  const order = parseInt(formData.get("order") as string, 10) || 1;

  const initiative: LabInitiative = {
    id,
    name,
    phase,
    status,
    category,
    summary,
    order,
  };

  saveLabInitiative(initiative);
  revalidatePath("/");
  revalidatePath("/labs");
  revalidatePath("/admin/labs");
  return { success: true };
}

export async function deleteLabInitiativeAction(id: string) {
  deleteLabInitiative(id);
  revalidatePath("/");
  revalidatePath("/labs");
  revalidatePath("/admin/labs");
  return { success: true };
}

export async function saveLabProgramAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim() || `prog-${Date.now()}`;
  const title = (formData.get("title") as string)?.trim() || "New Program";
  const desc = (formData.get("desc") as string)?.trim() || "";
  const order = parseInt(formData.get("order") as string, 10) || 1;

  const prog: LabProgram = {
    id,
    title,
    desc,
    order,
  };

  saveLabProgram(prog);
  revalidatePath("/");
  revalidatePath("/labs");
  revalidatePath("/admin/labs");
  return { success: true };
}

export async function deleteLabProgramAction(id: string) {
  deleteLabProgram(id);
  revalidatePath("/");
  revalidatePath("/labs");
  revalidatePath("/admin/labs");
  return { success: true };
}

export async function saveLabDomainsAction(formData: FormData) {
  const raw = (formData.get("domains") as string) || "";
  const domains = raw
    .split("\n")
    .map((d) => d.trim())
    .filter(Boolean);

  saveLabDomains(domains);
  revalidatePath("/");
  revalidatePath("/labs");
  revalidatePath("/admin/labs");
  return { success: true };
}
