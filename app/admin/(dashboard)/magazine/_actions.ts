"use server";

import { revalidatePath } from "next/cache";
import { readJSON, writeJSON } from "@/lib/data-store";
import { magazinePages, type MagazinePage, type PageImage, type Variant, type Block } from "@/lib/magazineData";

const FILE = "magazine-pages.json";

function getStoredPages(): MagazinePage[] {
  const current = readJSON<MagazinePage[]>(FILE, []);
  if (current && Array.isArray(current) && current.length > 0) {
    return current;
  }
  // Deep clone defaults
  return JSON.parse(JSON.stringify(magazinePages));
}

export async function saveMagazinePageAction(formData: FormData) {
  const idx = Number(formData.get("pageIndex"));
  const pages = getStoredPages();

  if (isNaN(idx) || idx < 0 || idx >= pages.length) {
    throw new Error("Invalid page index");
  }

  const folioRaw = formData.get("folio");
  const folio = folioRaw === "" || folioRaw === null ? null : Number(folioRaw);
  const variant = String(formData.get("variant") ?? "editorial") as Variant;
  const section = String(formData.get("section") ?? "").trim() || undefined;

  // Background / Page Art Image
  const imgSrc = String(formData.get("imageSrc") ?? "").trim();
  let image: PageImage | undefined = undefined;
  if (imgSrc) {
    const imgAlt = String(formData.get("imageAlt") ?? "").trim() || `Page ${idx + 1} artwork`;
    const imgPos = String(formData.get("imagePosition") ?? "").trim() || undefined;
    const imgFit = (String(formData.get("imageFit") ?? "").trim() || undefined) as PageImage["fit"];
    const imgZoomRaw = formData.get("imageZoom");
    const imgZoom = imgZoomRaw ? Number(imgZoomRaw) : undefined;

    image = {
      src: imgSrc,
      alt: imgAlt,
      ...(imgPos ? { position: imgPos } : {}),
      ...(imgFit ? { fit: imgFit } : {}),
      ...(imgZoom && !isNaN(imgZoom) && imgZoom > 0 ? { zoom: imgZoom } : {}),
    };
  }

  // Corner Logo Image
  const logoSrc = String(formData.get("logoSrc") ?? "").trim();
  let logo: PageImage | undefined = undefined;
  if (logoSrc) {
    const logoAlt = String(formData.get("logoAlt") ?? "").trim() || "Logo";
    logo = {
      src: logoSrc,
      alt: logoAlt,
    };
  }

  // Content Blocks
  let blocks: Block[] = pages[idx].blocks;
  const blocksJson = String(formData.get("blocksJson") ?? "").trim();
  if (blocksJson) {
    try {
      const parsed = JSON.parse(blocksJson);
      if (Array.isArray(parsed)) {
        blocks = parsed;
      }
    } catch (e) {
      console.error("Invalid blocks JSON:", e);
    }
  }

  pages[idx] = {
    ...pages[idx],
    folio,
    variant,
    section,
    image,
    logo,
    blocks,
  };

  writeJSON(FILE, pages);
  revalidatePath("/admin/magazine");
  revalidatePath(`/admin/magazine/${idx}`);
  revalidatePath("/about/magazine");
}

export async function resetMagazinePagesAction() {
  writeJSON(FILE, magazinePages);
  revalidatePath("/admin/magazine");
  revalidatePath("/about/magazine");
}