"use server";

import { revalidatePath } from "next/cache";
import { saveGlobalSettings, GlobalSettings } from "@/lib/global-store";

export async function saveGlobalSettingsAction(formData: FormData) {
  const announcementEnabled = formData.get("announcementEnabled") === "true";
  const announcementBadge = (formData.get("announcementBadge") as string)?.trim() || "Update";
  const announcementText = (formData.get("announcementText") as string)?.trim() || "";
  const announcementLink = (formData.get("announcementLink") as string)?.trim() || "";

  const email = (formData.get("email") as string)?.trim() || "contact@comfinity.co";
  const phone = (formData.get("phone") as string)?.trim() || "";
  const address = (formData.get("address") as string)?.trim() || "";
  const consultationLink = (formData.get("consultationLink") as string)?.trim() || "/contact";

  const linkedin = (formData.get("linkedin") as string)?.trim() || "";
  const twitter = (formData.get("twitter") as string)?.trim() || "";
  const github = (formData.get("github") as string)?.trim() || "";
  const youtube = (formData.get("youtube") as string)?.trim() || "";
  const instagram = (formData.get("instagram") as string)?.trim() || "";

  const companyName = (formData.get("companyName") as string)?.trim() || "Comfinity Technologies";
  const tagline = (formData.get("tagline") as string)?.trim() || "";
  const copyrightText = (formData.get("copyrightText") as string)?.trim() || "";

  const settings: GlobalSettings = {
    announcement: {
      enabled: announcementEnabled,
      badge: announcementBadge,
      text: announcementText,
      link: announcementLink,
    },
    contact: {
      email,
      phone,
      address,
      consultationLink,
    },
    social: {
      linkedin,
      twitter,
      github,
      youtube,
      instagram,
    },
    branding: {
      companyName,
      tagline,
      copyrightText,
    },
  };

  saveGlobalSettings(settings);

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/solutions");
  revalidatePath("/partners");
  revalidatePath("/community");
  revalidatePath("/careers");
  revalidatePath("/admin/website/global");

  return { success: true };
}
