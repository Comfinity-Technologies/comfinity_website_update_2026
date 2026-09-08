import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export interface PhotoItem {
  id: string;
  title: string;
  url: string;
  category: "photos" | "culture" | "events" | "team";
  caption?: string;
  uploadedAt: string;
  size?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  type: "youtube" | "vimeo" | "mp4";
  description?: string;
  thumbnailUrl?: string;
  publishedAt: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  url: string;
  type: "pdf" | "doc";
  size?: string;
  uploadedAt: string;
}

export interface MediaData {
  photos: PhotoItem[];
  videos: VideoItem[];
  documents: DocumentItem[];
}

const MEDIA_FILE = "media.json";

const DEFAULT_DATA: MediaData = {
  photos: [],
  videos: [],
  documents: [],
};

export function getMediaData(): MediaData {
  return readJSON<MediaData>(MEDIA_FILE, DEFAULT_DATA);
}

export function getPhotos(category?: string): PhotoItem[] {
  const data = getMediaData();
  const list = data.photos || [];
  if (category) {
    return list.filter((p) => p.category === category);
  }
  return list;
}

export function savePhoto(photo: PhotoItem): void {
  const data = getMediaData();
  const list = data.photos || [];
  const idx = list.findIndex((p) => p.id === photo.id);
  if (idx >= 0) {
    list[idx] = photo;
  } else {
    list.unshift(photo);
  }
  data.photos = list;
  writeJSON(MEDIA_FILE, data);
}

export function deletePhoto(id: string): void {
  const data = getMediaData();
  data.photos = (data.photos || []).filter((p) => p.id !== id);
  writeJSON(MEDIA_FILE, data);
}

export function getVideos(): VideoItem[] {
  const data = getMediaData();
  return data.videos || [];
}

export function saveVideo(video: VideoItem): void {
  const data = getMediaData();
  const list = data.videos || [];
  const idx = list.findIndex((v) => v.id === video.id);
  if (idx >= 0) {
    list[idx] = video;
  } else {
    list.unshift(video);
  }
  data.videos = list;
  writeJSON(MEDIA_FILE, data);
}

export function deleteVideo(id: string): void {
  const data = getMediaData();
  data.videos = (data.videos || []).filter((v) => v.id !== id);
  writeJSON(MEDIA_FILE, data);
}

export function getDocuments(): DocumentItem[] {
  const data = getMediaData();
  return data.documents || [];
}

export function saveDocument(doc: DocumentItem): void {
  const data = getMediaData();
  const list = data.documents || [];
  const idx = list.findIndex((d) => d.id === doc.id);
  if (idx >= 0) {
    list[idx] = doc;
  } else {
    list.unshift(doc);
  }
  data.documents = list;
  writeJSON(MEDIA_FILE, data);
}

export function deleteDocument(id: string): void {
  const data = getMediaData();
  data.documents = (data.documents || []).filter((d) => d.id !== id);
  writeJSON(MEDIA_FILE, data);
}
