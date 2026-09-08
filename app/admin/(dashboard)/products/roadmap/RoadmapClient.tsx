"use client";

import { useState } from "react";
import { Plus, Trash2, X, GitPullRequest } from "lucide-react";
import { type RoadmapItem, type RoadmapStatus } from "@/lib/products-store";
import {
  saveRoadmapItemAction,
  updateRoadmapStatusAction,
  deleteRoadmapItemAction,
} from "../_actions";

export function RoadmapClient({ initialItems }: { initialItems: RoadmapItem[] }) {
  const [items, setItems] = useState<RoadmapItem[]>(initialItems);
  const [isAdding, setIsAdding] = useState(false);

  const quarters = ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"];

  const getStatusBadge = (status: RoadmapStatus) => {
    switch (status) {
      case "Released":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Testing":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "In Development":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Researching":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-neutral-800 text-neutral-400 border-neutral-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Feature Delivery Milestones</h2>
          <p className="text-xs text-neutral-400">
            {items.length} roadmap milestones planned across 4 quarters
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="text-xs bg-white hover:bg-neutral-200 text-black font-medium px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Milestone</span>
        </button>
      </div>

      {/* Add Modal */}
      {isAdding && (
        <div className="rounded-2xl border border-amber-500/40 bg-neutral-900/90 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="text-sm font-semibold text-white">Add Roadmap Milestone</h3>
            <button type="button" onClick={() => setIsAdding(false)} className="text-neutral-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form action={saveRoadmapItemAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Target Quarter</label>
                <select
                  name="quarter"
                  defaultValue="Q3 2026"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Q1 2026">Q1 2026</option>
                  <option value="Q2 2026">Q2 2026</option>
                  <option value="Q3 2026">Q3 2026</option>
                  <option value="Q4 2026">Q4 2026</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Product</label>
                <select
                  name="product"
                  defaultValue="Drishti"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Drishti">Drishti</option>
                  <option value="AppGenie">AppGenie</option>
                  <option value="Nexzo">Nexzo</option>
                  <option value="REPZ">REPZ</option>
                  <option value="Core Platform">Core Platform</option>
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs text-neutral-400">Feature Name *</label>
                <input
                  type="text"
                  name="feature"
                  required
                  placeholder="e.g. Distributed Sensor Ingestion Hub"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Initial Status</label>
                <select
                  name="status"
                  defaultValue="In Development"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Planned">Planned</option>
                  <option value="Researching">Researching</option>
                  <option value="In Development">In Development</option>
                  <option value="Testing">Testing</option>
                  <option value="Released">Released</option>
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs text-neutral-400">Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Brief summary of expected deliverable..."
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-neutral-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-1.5 rounded-lg transition"
              >
                Save Milestone
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4-Quarter Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quarters.map((q) => {
          const qItems = items.filter((i) => i.quarter === q);
          return (
            <div key={q} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-mono font-semibold text-white">{q}</span>
                <span className="text-[10px] text-neutral-500 font-mono">{qItems.length} items</span>
              </div>

              <div className="space-y-2.5">
                {qItems.map((item) => (
                  <div key={item.id} className="p-3.5 rounded-lg bg-neutral-800/40 border border-neutral-800 space-y-2 hover:border-neutral-700 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">{item.product}</span>
                      <form action={deleteRoadmapItemAction.bind(null, item.id)}>
                        <button type="submit" className="text-neutral-500 hover:text-red-400 p-0.5 transition" title="Delete Milestone">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </form>
                    </div>

                    <p className="text-xs font-medium text-white leading-snug">{item.feature}</p>
                    <p className="text-[11px] text-neutral-400">{item.description}</p>

                    <div className="pt-1 flex items-center justify-between">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>

                      {/* Quick Status Cycler */}
                      <form
                        action={async () => {
                          const statusOrder: RoadmapStatus[] = ["Planned", "Researching", "In Development", "Testing", "Released"];
                          const currentIdx = statusOrder.indexOf(item.status);
                          const nextStatus = statusOrder[(currentIdx + 1) % statusOrder.length];
                          await updateRoadmapStatusAction(item.id, nextStatus);
                        }}
                      >
                        <button type="submit" className="text-[10px] text-neutral-400 hover:text-white underline cursor-pointer">
                          Advance →
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
