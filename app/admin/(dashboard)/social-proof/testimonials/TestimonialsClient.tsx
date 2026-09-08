"use client";

import { useState } from "react";
import { MessageSquareQuote, Building2, Plus, Trash2, Edit2, CheckCircle2, Star, X } from "lucide-react";
import { type Testimonial } from "@/lib/testimonials-store";
import { saveTestimonialAction, deleteTestimonialAction } from "./_actions";

export function TestimonialsClient({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (item: Testimonial) => {
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem({
      id: `test-${Date.now()}`,
      name: "",
      org: "",
      avatar: "/reviews/ajay.png",
      stars: 5,
      quote: "",
      featured: true,
      order: testimonials.length + 1,
    });
    setIsCreating(true);
  };

  const handleCloseForm = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Verified Client Endorsements</h2>
          <p className="text-xs text-neutral-400">
            {testimonials.length} reviews active · Displayed in the homepage zigzag carousel
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="text-xs bg-white hover:bg-neutral-200 text-black font-medium px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Editor Drawer / Modal */}
      {editingItem && (
        <div className="rounded-2xl border border-amber-500/40 bg-neutral-900/90 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="text-sm font-semibold text-white">
              {isCreating ? "New Client Testimonial" : `Edit Testimonial: ${editingItem.name}`}
            </h3>
            <button
              type="button"
              onClick={handleCloseForm}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form action={saveTestimonialAction} className="space-y-4">
            <input type="hidden" name="id" value={editingItem.id} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Client Name *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingItem.name}
                  required
                  placeholder="e.g. Ajay, Rajesh, Sarah"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Company / Organization *</label>
                <input
                  type="text"
                  name="org"
                  defaultValue={editingItem.org}
                  required
                  placeholder="e.g. REPZ Platform, Medicharm Pharma"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Avatar Image URL</label>
                <input
                  type="text"
                  name="avatar"
                  defaultValue={editingItem.avatar}
                  placeholder="/reviews/ajay.png or https://res.cloudinary.com/..."
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Star Rating (1-5)</label>
                  <select
                    name="stars"
                    defaultValue={editingItem.stars}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="5">★★★★★ (5 Stars)</option>
                    <option value="4">★★★★☆ (4 Stars)</option>
                    <option value="3">★★★☆☆ (3 Stars)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Display Order</label>
                  <input
                    type="number"
                    name="order"
                    defaultValue={editingItem.order ?? 1}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Client Quote / Testimonial *</label>
              <textarea
                name="quote"
                defaultValue={editingItem.quote}
                required
                rows={3}
                placeholder="What did the client say about working with Comfinity?"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={editingItem.featured}
                  className="rounded border-neutral-700 text-amber-500"
                />
                <span>Featured on Homepage</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-neutral-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-1.5 rounded-lg transition shadow-md"
                >
                  Save to Website
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        <div className="divide-y divide-neutral-800/60">
          {testimonials.map((t) => (
            <div key={t.id} className="p-5 hover:bg-neutral-800/20 transition space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 overflow-hidden shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/reviews/ajay.png";
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <span className="text-xs text-neutral-400">· {t.org}</span>
                    </div>
                    <div className="flex text-amber-400 text-xs mt-0.5">
                      {"★".repeat(t.stars)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  {t.featured && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Featured
                    </span>
                  )}
                  <span className="text-xs font-mono text-neutral-500">Order #{t.order ?? 99}</span>

                  <button
                    type="button"
                    onClick={() => handleEdit(t)}
                    className="text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded-md transition flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <form action={deleteTestimonialAction.bind(null, t.id)}>
                    <button
                      type="submit"
                      className="text-xs text-neutral-500 hover:text-red-400 border border-neutral-800 hover:border-red-500/40 p-1 rounded-md transition"
                      title="Delete Testimonial"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>

              <p className="text-xs text-neutral-300 italic pl-13">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
