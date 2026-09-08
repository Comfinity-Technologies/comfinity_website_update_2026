"use server";

import { revalidatePath } from "next/cache";
import {
  saveProduct,
  deleteProduct,
  saveRoadmapItem,
  deleteRoadmapItem,
  getRoadmapItems,
  type Product,
  type RoadmapItem,
  type ProductStatus,
  type RoadmapStatus,
} from "@/lib/products-store";

export async function saveProductAction(formData: FormData) {
  const id = String(formData.get("id") || `prod-${Date.now()}`);
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || name.toLowerCase().replace(/\s+/g, "-")).trim();
  const tag = String(formData.get("tag") || "AI · Platform").trim();
  const category = String(formData.get("category") || "Enterprise Solution").trim();
  const status = (formData.get("status") as ProductStatus) || "Live";
  const desc = String(formData.get("desc") || "").trim();
  const image = String(formData.get("image") || "/products/drishti.svg").trim();
  const featured = formData.get("featured") === "on" || formData.get("featured") === "true";
  const order = Number(formData.get("order") || 99);

  if (!name || !desc) {
    throw new Error("Product name and description are required.");
  }

  const product: Product = {
    id,
    name,
    slug,
    tag,
    category,
    status,
    desc,
    image,
    featured,
    order,
  };

  saveProduct(product);
  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath("/admin");
}

export async function deleteProductAction(id: string) {
  deleteProduct(id);
  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath("/admin");
}

export async function saveRoadmapItemAction(formData: FormData) {
  const id = String(formData.get("id") || `rm-${Date.now()}`);
  const quarter = String(formData.get("quarter") || "Q3 2026").trim();
  const product = String(formData.get("product") || "Drishti").trim();
  const feature = String(formData.get("feature") || "").trim();
  const status = (formData.get("status") as RoadmapStatus) || "In Development";
  const description = String(formData.get("description") || "").trim();

  if (!feature) {
    throw new Error("Feature name is required.");
  }

  const item: RoadmapItem = {
    id,
    quarter,
    product,
    feature,
    status,
    description,
  };

  saveRoadmapItem(item);
  revalidatePath("/admin/products/roadmap");
}

export async function updateRoadmapStatusAction(id: string, status: RoadmapStatus) {
  const items = getRoadmapItems();
  const target = items.find((i) => i.id === id);
  if (target) {
    target.status = status;
    saveRoadmapItem(target);
    revalidatePath("/admin/products/roadmap");
  }
}

export async function deleteRoadmapItemAction(id: string) {
  deleteRoadmapItem(id);
  revalidatePath("/admin/products/roadmap");
}
