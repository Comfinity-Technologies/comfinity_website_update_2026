"use server";

import { revalidatePath } from "next/cache";
import {
  savePhoto,
  deletePhoto,
  saveVideo,
  deleteVideo,
  saveDocument,
  deleteDocument,
  PhotoItem,
  VideoItem,
  DocumentItem,
} from "@/lib/media-store";

export async function savePhotoAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim() || `photo-${Date.now()}`;
  const title = (formData.get("title") as string)?.trim() || "Untitled Photo";
  const url = (formData.get("url") as string)?.trim() || "";
  const category = (formData.get("category") as "photos" | "culture" | "events" | "team") || "photos";
  const caption = (formData.get("caption") as string)?.trim() || "";
  const size = (formData.get("size") as string)?.trim() || "Optimized";
  const uploadedAt = new Date().toISOString();

  const photo: PhotoItem = {
    id,
    title,
    url,
    category,
    caption,
    uploadedAt,
    size,
  };

  savePhoto(photo);
  revalidatePath("/admin/media/photos");
  revalidatePath("/admin/media/culture");
  revalidatePath("/admin/media/events");
  return { success: true };
}

export async function deletePhotoAction(id: string) {
  deletePhoto(id);
  revalidatePath("/admin/media/photos");
  revalidatePath("/admin/media/culture");
  revalidatePath("/admin/media/events");
  return { success: true };
}

export async function saveVideoAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim() || `vid-${Date.now()}`;
  const title = (formData.get("title") as string)?.trim() || "Untitled Video";
  const url = (formData.get("url") as string)?.trim() || "";
  const type = (formData.get("type") as "youtube" | "vimeo" | "mp4") || "youtube";
  const description = (formData.get("description") as string)?.trim() || "";
  const thumbnailUrl = (formData.get("thumbnailUrl") as string)?.trim() || "";
  const publishedAt = new Date().toISOString();

  const video: VideoItem = {
    id,
    title,
    url,
    type,
    description,
    thumbnailUrl,
    publishedAt,
  };

  saveVideo(video);
  revalidatePath("/admin/media/videos");
  return { success: true };
}

export async function deleteVideoAction(id: string) {
  deleteVideo(id);
  revalidatePath("/admin/media/videos");
  return { success: true };
}

export async function saveDocumentAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim() || `doc-${Date.now()}`;
  const title = (formData.get("title") as string)?.trim() || "Untitled Document";
  const url = (formData.get("url") as string)?.trim() || "";
  const type = (formData.get("type") as "pdf" | "doc") || "pdf";
  const size = (formData.get("size") as string)?.trim() || "1.0 MB";
  const uploadedAt = new Date().toISOString();

  const doc: DocumentItem = {
    id,
    title,
    url,
    type,
    size,
    uploadedAt,
  };

  saveDocument(doc);
  revalidatePath("/admin/media/documents");
  return { success: true };
}

export async function deleteDocumentAction(id: string) {
  deleteDocument(id);
  revalidatePath("/admin/media/documents");
  return { success: true };
}
