"use server";

import { revalidatePath } from "next/cache";
import {
  savePartner,
  deletePartner,
  savePartnershipType,
  deletePartnershipType,
  saveSponsorship,
  deleteSponsorship,
  PartnerItem,
  PartnershipType,
  SponsorshipItem,
} from "@/lib/partners-store";

export async function savePartnerAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim() || `partner-${Date.now()}`;
  const name = (formData.get("name") as string)?.trim() || "New Partner";
  const role = (formData.get("role") as string)?.trim() || "Technology Partner";
  const tier = (formData.get("tier") as string)?.trim() || "Tier 1";
  const href = (formData.get("href") as string)?.trim() || "";
  const logoUrl = (formData.get("logoUrl") as string)?.trim() || "";
  const logoDarkUrl = (formData.get("logoDarkUrl") as string)?.trim() || "";
  const status = (formData.get("status") as "active" | "draft") || "active";
  const order = parseInt(formData.get("order") as string, 10) || 1;

  const partner: PartnerItem = {
    id,
    name,
    role,
    tier,
    href,
    logoUrl,
    logoDarkUrl,
    status,
    order,
  };

  savePartner(partner);
  revalidatePath("/");
  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  return { success: true };
}

export async function deletePartnerAction(id: string) {
  deletePartner(id);
  revalidatePath("/");
  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  return { success: true };
}

export async function savePartnershipTypeAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim() || `type-${Date.now()}`;
  const title = (formData.get("title") as string)?.trim() || "New Partnership Type";
  const desc = (formData.get("desc") as string)?.trim() || "";
  const itemsRaw = (formData.get("items") as string) || "";
  const items = itemsRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const order = parseInt(formData.get("order") as string, 10) || 1;

  const item: PartnershipType = {
    id,
    title,
    desc,
    items,
    order,
  };

  savePartnershipType(item);
  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  return { success: true };
}

export async function deletePartnershipTypeAction(id: string) {
  deletePartnershipType(id);
  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  return { success: true };
}

export async function saveSponsorshipAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim() || `spon-${Date.now()}`;
  const title = (formData.get("title") as string)?.trim() || "New Sponsorship";
  const desc = (formData.get("desc") as string)?.trim() || "";
  const order = parseInt(formData.get("order") as string, 10) || 1;

  const item: SponsorshipItem = {
    id,
    title,
    desc,
    order,
  };

  saveSponsorship(item);
  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  return { success: true };
}

export async function deleteSponsorshipAction(id: string) {
  deleteSponsorship(id);
  revalidatePath("/partners");
  revalidatePath("/admin/partners");
  return { success: true };
}
