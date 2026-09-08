"use client";

import { useState, useRef } from "react";
import { UploadCloud, Trash2, Copy, Check, Plus, ExternalLink, Image as ImageIcon } from "lucide-react";
import { PhotoItem } from "@/lib/media-store";
import { savePhotoAction, deletePhotoAction } from "@/app/admin/(dashboard)/media/_actions";

interface MediaManagerClientProps {
  initialPhotos: PhotoItem[];
  defaultCategory: "photos" | "culture" | "events" | "team";
  title: string;
}

export function MediaManagerClient({
  initialPhotos,
  defaultCategory,
  title,
}: MediaManagerClientProps) {
  const [photos, setPhotos] = useState<PhotoItem[]>(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [manualModal, setManualModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload handler calling /api/admin/upload-image
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", `comfinity/${defaultCategory}`);

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        // Save to media store
        const saveFormData = new FormData();
        saveFormData.append("id", `photo-${Date.now()}`);
        saveFormData.append("title", file.name.replace(/\.[^/.]+$/, ""));
        saveFormData.append("url", data.url);
        saveFormData.append("category", defaultCategory);
        saveFormData.append("caption", `${defaultCategory} media asset`);
        saveFormData.append("size", `${(file.size / 1024).toFixed(0)} KB`);

        await savePhotoAction(saveFormData);

        const newPhoto: PhotoItem = {
          id: `photo-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ""),
          url: data.url,
          category: defaultCategory,
          caption: `${defaultCategory} media asset`,
          uploadedAt: new Date().toISOString(),
          size: `${(file.size / 1024).toFixed(0)} KB`,
        };
        setPhotos([newPhoto, ...photos]);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = photos.filter((p) => p.category === defaultCategory);

  return (
    <div className="space-y-6">
      {/* Upload Banner */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Upload to {title}</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Images are automatically optimized via Cloudinary or local responsive CDN storage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition disabled:opacity-50 flex items-center gap-1.5"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            {uploading ? "Uploading..." : "Select File"}
          </button>
          <button
            onClick={() => setManualModal(true)}
            className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-medium transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add by URL
          </button>
        </div>
      </div>

      {/* Grid of Photos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
            {title} Gallery ({filtered.length})
          </h4>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-12 text-center">
            <ImageIcon className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
            <p className="text-xs text-neutral-400">No photos in this category yet.</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 text-xs text-blue-400 hover:underline"
            >
              Upload your first image
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="group rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden hover:border-neutral-700 transition flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.url}
                    alt={p.title}
                    className="w-full h-full object-contain p-2 transition group-hover:scale-105"
                  />
                  {p.size && (
                    <span className="absolute bottom-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-neutral-400 backdrop-blur-sm">
                      {p.size}
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <h5 className="text-xs font-semibold text-white truncate" title={p.title}>
                    {p.title}
                  </h5>
                  {p.caption && (
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">{p.caption}</p>
                  )}

                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-neutral-800/60 text-xs">
                    <button
                      onClick={() => copyToClipboard(p.url, p.id)}
                      className="text-neutral-400 hover:text-white flex items-center gap-1 text-[11px] font-mono transition"
                    >
                      {copiedId === p.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                        title="View Full Size"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete "${p.title}"?`)) {
                            await deletePhotoAction(p.id);
                            setPhotos(photos.filter((item) => item.id !== p.id));
                          }
                        }}
                        className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: ADD BY URL */}
      {manualModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold text-white">Add Image by URL</h3>
            <form
              action={async (formData) => {
                await savePhotoAction(formData);
                const newP: PhotoItem = {
                  id: (formData.get("id") as string) || `photo-${Date.now()}`,
                  title: (formData.get("title") as string) || "External Image",
                  url: (formData.get("url") as string) || "",
                  category: defaultCategory,
                  caption: (formData.get("caption") as string) || "",
                  uploadedAt: new Date().toISOString(),
                };
                setPhotos([newP, ...photos]);
                setManualModal(false);
              }}
              className="space-y-3 text-xs"
            >
              <input type="hidden" name="id" value={`photo-${Date.now()}`} />
              <input type="hidden" name="category" value={defaultCategory} />

              <div>
                <label className="block text-neutral-400 mb-1">Image Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Keynote Presentation 2026"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Image URL (Hosted or CDN) *</label>
                <input
                  type="text"
                  name="url"
                  required
                  placeholder="https://... or /uploads/..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Caption / Description</label>
                <input
                  type="text"
                  name="caption"
                  placeholder="Brief description for alt tag & caption"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setManualModal(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition"
                >
                  Add Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
