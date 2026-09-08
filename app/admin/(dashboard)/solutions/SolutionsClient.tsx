"use client";

import { useState } from "react";
import { Briefcase, Plus, Trash2, Edit2, X, CheckCircle2 } from "lucide-react";
import { type SolutionOffering } from "@/lib/solutions-store";
import { saveSolutionAction, deleteSolutionAction } from "./_actions";

export function SolutionsClient({ initialSolutions }: { initialSolutions: SolutionOffering[] }) {
  const [solutions, setSolutions] = useState<SolutionOffering[]>(initialSolutions);
  const [editingItem, setEditingItem] = useState<SolutionOffering | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (item: SolutionOffering) => {
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingItem({
      id: `sol-${Date.now()}`,
      title: "",
      desc: "",
      items: ["Capability 1", "Capability 2"],
      order: solutions.length + 1,
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
          <h2 className="text-base font-semibold text-white">Solution Practices</h2>
          <p className="text-xs text-neutral-400">
            {solutions.length} practices active · Rendered dynamically on the /solutions page
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="text-xs bg-white hover:bg-neutral-200 text-black font-medium px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Practice</span>
        </button>
      </div>

      {/* Modal / Drawer */}
      {editingItem && (
        <div className="rounded-2xl border border-amber-500/40 bg-neutral-900/90 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="text-sm font-semibold text-white">
              {isCreating ? "Add Solution Practice" : `Edit Practice: ${editingItem.title}`}
            </h3>
            <button type="button" onClick={handleClose} className="text-neutral-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form action={saveSolutionAction} className="space-y-4">
            <input type="hidden" name="id" value={editingItem.id} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs text-neutral-400">Practice Title *</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingItem.title}
                  required
                  placeholder="e.g. AI & Intelligent Automation"
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
              <label className="text-xs text-neutral-400">Practice Overview Description *</label>
              <textarea
                name="desc"
                defaultValue={editingItem.desc}
                required
                rows={3}
                placeholder="High-level summary of what this solution practice delivers..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Core Capabilities (one per line) *</label>
              <textarea
                name="items"
                defaultValue={editingItem.items?.join("\n")}
                required
                rows={5}
                placeholder="Custom AI agents and multi-agent systems&#10;Intelligent process automation (IPA)"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono"
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
                Save Practice
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Solutions Cards */}
      <div className="grid grid-cols-1 gap-4">
        {solutions.map((sol) => (
          <div key={sol.id} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-3 hover:border-neutral-700 transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{sol.title}</h3>
                  <span className="text-[11px] text-neutral-500 font-mono">Order #{sol.order ?? 99}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(sol)}
                  className="text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded-md transition flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>

                <form action={deleteSolutionAction.bind(null, sol.id)}>
                  <button
                    type="submit"
                    className="text-xs text-neutral-500 hover:text-red-400 border border-neutral-800 hover:border-red-500/30 p-1.5 rounded-md transition"
                    title="Delete Practice"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">{sol.desc}</p>

            <div className="pt-2 border-t border-neutral-800/60 flex flex-wrap gap-2">
              {sol.items?.map((item, idx) => (
                <span
                  key={idx}
                  className="text-[11px] text-neutral-400 bg-neutral-800/60 border border-neutral-700/40 px-2.5 py-1 rounded-md"
                >
                  • {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
