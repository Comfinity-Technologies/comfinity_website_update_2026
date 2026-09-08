"use server";

import { revalidatePath } from "next/cache";
import { getHomepageSections, saveHomepageSections, type HeroSlide, type StatItem } from "@/lib/homepage-store";

export async function saveHeroSlideAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const badge = String(formData.get("badge") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const ctaPrimaryLabel = String(formData.get("ctaPrimaryLabel") || "").trim();
  const ctaPrimaryHref = String(formData.get("ctaPrimaryHref") || "").trim();
  const ctaSecondaryLabel = String(formData.get("ctaSecondaryLabel") || "").trim();
  const ctaSecondaryHref = String(formData.get("ctaSecondaryHref") || "").trim();

  const data = getHomepageSections();
  const slideIdx = data.hero.findIndex((s) => s.id === id);

  if (slideIdx >= 0) {
    data.hero[slideIdx] = {
      id,
      badge,
      title,
      body,
      ctaPrimaryLabel,
      ctaPrimaryHref,
      ctaSecondaryLabel,
      ctaSecondaryHref,
    };
  } else {
    data.hero.push({
      id: id || `slide-${Date.now()}`,
      badge,
      title,
      body,
      ctaPrimaryLabel,
      ctaPrimaryHref,
      ctaSecondaryLabel,
      ctaSecondaryHref,
    });
  }

  saveHomepageSections(data);
  revalidatePath("/");
  revalidatePath("/admin/website/homepage");
}

export async function saveStatsAction(formData: FormData) {
  const activeDivisions = Number(formData.get("activeDivisions") || 6);
  const techDomains = Number(formData.get("techDomains") || 12);
  const communityPrograms = Number(formData.get("communityPrograms") || 3);
  const socialCommitment = Number(formData.get("socialCommitment") || 20);
  const foundedYear = Number(formData.get("foundedYear") || 2024);

  const data = getHomepageSections();
  data.stats = [
    { value: activeDivisions, suffix: "", label: "Active divisions", sub: "across technology and innovation" },
    { value: techDomains, suffix: "+", label: "Technology domains", sub: "from AI to space technology" },
    { value: communityPrograms, suffix: "", label: "Community programs", sub: "ambassadors, startups, fellowships" },
    { value: socialCommitment, suffix: "%", label: "Social commitment", sub: "of profits to Helping Hands Foundation" },
    { value: foundedYear, suffix: "", label: "Year founded", sub: "November 2024 — built for decades" },
  ];

  saveHomepageSections(data);
  revalidatePath("/");
  revalidatePath("/admin/website/homepage");
}

export async function saveAnnouncementAction(formData: FormData) {
  const enabled = formData.get("enabled") === "on" || formData.get("enabled") === "true";
  const label = String(formData.get("label") || "").trim();
  const heading = String(formData.get("heading") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const ctaLabel = String(formData.get("ctaLabel") || "").trim();
  const ctaHref = String(formData.get("ctaHref") || "").trim();

  const data = getHomepageSections();
  data.announcement = {
    enabled,
    label,
    heading,
    description,
    ctaLabel,
    ctaHref,
  };

  saveHomepageSections(data);
  revalidatePath("/");
  revalidatePath("/admin/website/homepage");
}
