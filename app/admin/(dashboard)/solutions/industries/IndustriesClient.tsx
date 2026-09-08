"use client";

import { useState } from "react";
import { Building2, Plus, Trash2, Edit2, X } from "lucide-react";
import { type IndustryItem } from "@/lib/solutions-store";
import { saveIndustryAction, deleteIndustryAction } from "../_actions";

export function IndustriesClient({ initialIndustries }: { initialIndustries: IndustryItem[] }) {
  const [industries, setIndustries] = useState<IndustryItem[]>(initialIndustries);
  const [editingItem, setEditingItem] = useState<IndustryItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (item: IndustryItem) => {
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingItem({
      id: `ind-${Date.now()}`,
      t: "",
      d: "",
      order: industries.length + 1,
    });
    setIsCreating(true);
  };

  const handleClose = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Target Verticals &amp; Industries</h2>
          <p className="text-xs text-neutral-400">
            {industries.length} industries configured · Displayed in the /solutions industry matrix
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="text-xs bg-white hover:bg-neutral-200 text-black font-medium px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Industry</span>
        </button>
      </div>

      {/* Add / Edit Drawer */}
      {editingItem && (
        <div className="rounded-2xl border border-amber-500/40 bg-neutral-900/90 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="text-sm font-semibold text-white">
              {isCreating ? "Add Target Industry" : `Edit Industry: ${editingItem.t}`}
            </h3>
            <button type="button" onClick={handleClose} className="text-neutral-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form action={saveIndustryAction} className="space-y-4">
            <input type="hidden" name="id" value={editingItem.id} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs text-neutral-400">Industry Name *</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingItem.t}
                  required
                  placeholder="e.g. Financial Services & Fintech"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
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

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Industry Capabilities &amp; Scope *</label>
              <textarea
                name="desc"
                defaultValue={editingItem.d}
                required
                rows={3}
                placeholder="Compliance-aware automation, intelligent banking systems, payment infrastructure..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-neutral-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-1.5 rounded-lg transition shadow-md"
              >
                Save Industry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Industries Table */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        <div className="divide-y divide-neutral-800/60">
          {industries.map((ind) => (
            <div key={ind.id} className="p-4 flex items-center justify-between hover:bg-neutral-800/20 transition">
              <div>
                <p className="text-sm font-semibold text-white">{ind.t}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{ind.d}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-4">
                <span className="text-xs font-mono text-neutral-500">Order #{ind.order ?? 99}</span>

                <button
                  type="button"
                  onClick={() => handleEdit(ind)}
                  className="text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded-md transition flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>

                <form action={deleteIndustryAction.bind(null, ind.id)}>
                  <button
                    type="submit"
                    className="text-xs text-neutral-500 hover:text-red-400 border border-neutral-800 hover:border-red-500/30 p-1.5 rounded-md transition"
                    title="Delete Industry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
