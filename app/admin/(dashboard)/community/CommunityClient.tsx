"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Globe2, Heart, CheckCircle } from "lucide-react";
import { CommunityProgram } from "@/lib/community-store";
import {
  saveCommunityProgramAction,
  deleteCommunityProgramAction,
  saveCommunityValuesAction,
} from "./_actions";

interface CommunityClientProps {
  initialPrograms: CommunityProgram[];
  initialValues: string[];
}

export function CommunityClient({
  initialPrograms,
  initialValues,
}: CommunityClientProps) {
  const [tab, setTab] = useState<"programs" | "values">("programs");
  const [progModal, setProgModal] = useState<CommunityProgram | null>(null);
  const [isNewProg, setIsNewProg] = useState(false);

  const [valuesText, setValuesText] = useState(initialValues.join("\n"));
  const [isValuesSaved, setIsValuesSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
        <button
          onClick={() => setTab("programs")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "programs"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Globe2 className="w-3.5 h-3.5" />
          Community Programs ({initialPrograms.length})
        </button>
        <button
          onClick={() => setTab("values")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "values"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          Community Values ({initialValues.length})
        </button>
      </div>

      {/* TAB 1: PROGRAMS */}
      {tab === "programs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Community Programs &amp; Initiatives</h3>
              <p className="text-xs text-neutral-500">Live programs displayed on /community</p>
            </div>
            <button
              onClick={() => {
                setProgModal({
                  id: `prog-${Date.now()}`,
                  title: "",
                  desc: "",
                  items: [],
                  order: initialPrograms.length + 1,
                });
                setIsNewProg(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Program
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {initialPrograms.map((p, idx) => (
              <div
                key={p.id}
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-neutral-500">0{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setProgModal(p);
                          setIsNewProg(false);
                        }}
                        className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Remove community program "${p.title}"?`)) {
                            await deleteCommunityProgramAction(p.id);
                          }
                        }}
                        className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2">{p.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">{p.desc}</p>
                  {p.items && p.items.length > 0 && (
                    <ul className="space-y-1.5 border-t border-neutral-800/60 pt-3">
                      {p.items.map((it, i) => (
                        <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VALUES */}
      {tab === "values" && (
        <div className="max-w-2xl space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Community Values</h3>
            <p className="text-xs text-neutral-500">
              Each line represents one pillar displayed in the values matrix on /community.
            </p>
          </div>

          <form
            action={async (formData) => {
              setIsSubmitting(true);
              try {
                await saveCommunityValuesAction(formData);
                setIsValuesSaved(true);
                setTimeout(() => setIsValuesSaved(false), 3000);
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            <div>
              <textarea
                name="values"
                value={valuesText}
                onChange={(e) => setValuesText(e.target.value)}
                rows={8}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs font-mono text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition disabled:opacity-50"
              >
                {isSubmitting ? "Updating..." : "Save Community Values"}
              </button>
              {isValuesSaved && (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Values updated and live on /community!
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* MODAL: EDIT PROGRAM */}
      {progModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold text-white">
              {isNewProg ? "Add Community Program" : "Edit Community Program"}
            </h3>
            <form
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  await saveCommunityProgramAction(formData);
                  setProgModal(null);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <input type="hidden" name="id" value={progModal.id} />

              <div>
                <label className="block text-neutral-400 mb-1">Program Title *</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={progModal.title}
                  required
                  placeholder="e.g. Student Ambassador Program"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description</label>
                <textarea
                  name="desc"
                  defaultValue={progModal.desc}
                  rows={3}
                  placeholder="Summary of this community program..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Key Perks / Items (one per line, optional)</label>
                <textarea
                  name="items"
                  defaultValue={(progModal.items || []).join("\n")}
                  rows={4}
                  placeholder="Item 1&#10;Item 2"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Display Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={progModal.order ?? 1}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setProgModal(null)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
