"use client";

import { useState } from "react";
import { Plus, Trash2, Video as VideoIcon, ExternalLink, Play } from "lucide-react";
import { VideoItem } from "@/lib/media-store";
import { saveVideoAction, deleteVideoAction } from "../_actions";

interface VideosClientProps {
  initialVideos: VideoItem[];
}

export function VideosClient({ initialVideos }: VideosClientProps) {
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Video Showcase Streams</h3>
          <p className="text-xs text-neutral-500">Embedded video content across Comfinity pages</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Video
        </button>
      </div>

      {videos.length === 0 ? (
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-12 text-center">
          <VideoIcon className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
          <p className="text-xs text-neutral-400">No videos configured yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v) => (
            <div
              key={v.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition"
            >
              <div className="relative aspect-video bg-neutral-950 flex items-center justify-center">
                {v.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
                    <Play className="w-5 h-5 fill-neutral-400 ml-0.5" />
                  </div>
                )}
                <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-blue-400 border border-neutral-800">
                  {v.type.toUpperCase()}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="text-sm font-semibold text-white truncate">{v.title}</h4>
                {v.description && (
                  <p className="text-xs text-neutral-400 line-clamp-2">{v.description}</p>
                )}
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-500 hover:text-blue-400 flex items-center gap-1 font-mono truncate pt-1"
                >
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  {v.url}
                </a>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/60 mt-2">
                  <span className="text-[10px] font-mono text-neutral-500">
                    {new Date(v.publishedAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={async () => {
                      if (confirm(`Remove video "${v.title}"?`)) {
                        await deleteVideoAction(v.id);
                        setVideos(videos.filter((item) => item.id !== v.id));
                      }
                    }}
                    className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: ADD VIDEO */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold text-white">Add Video Stream</h3>
            <form
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  await saveVideoAction(formData);
                  const newV: VideoItem = {
                    id: (formData.get("id") as string) || `vid-${Date.now()}`,
                    title: (formData.get("title") as string) || "Untitled",
                    url: (formData.get("url") as string) || "",
                    type: (formData.get("type") as "youtube" | "vimeo" | "mp4") || "youtube",
                    description: (formData.get("description") as string) || "",
                    thumbnailUrl: (formData.get("thumbnailUrl") as string) || "",
                    publishedAt: new Date().toISOString(),
                  };
                  setVideos([newV, ...videos]);
                  setModalOpen(false);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-neutral-400 mb-1">Video Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Comfinity Vision Showreel"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Video Stream URL *</label>
                <input
                  type="url"
                  name="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Provider Type</label>
                  <select
                    name="type"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="mp4">Direct MP4 / CDN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Custom Thumbnail URL</label>
                  <input
                    type="text"
                    name="thumbnailUrl"
                    placeholder="/uploads/..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Brief synopsis..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Add Video"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
