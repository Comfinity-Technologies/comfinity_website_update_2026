"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, FlaskConical, GraduationCap, Cpu, CheckCircle } from "lucide-react";
import { LabInitiative, LabProgram } from "@/lib/labs-store";
import {
  saveLabInitiativeAction,
  deleteLabInitiativeAction,
  saveLabProgramAction,
  deleteLabProgramAction,
  saveLabDomainsAction,
} from "./_actions";

interface LabsClientProps {
  initialInitiatives: LabInitiative[];
  initialPrograms: LabProgram[];
  initialDomains: string[];
}

export function LabsClient({
  initialInitiatives,
  initialPrograms,
  initialDomains,
}: LabsClientProps) {
  const [tab, setTab] = useState<"initiatives" | "programs" | "domains">("initiatives");

  const [initModal, setInitModal] = useState<LabInitiative | null>(null);
  const [isNewInit, setIsNewInit] = useState(false);

  const [progModal, setProgModal] = useState<LabProgram | null>(null);
  const [isNewProg, setIsNewProg] = useState(false);

  const [domainsText, setDomainsText] = useState(initialDomains.join("\n"));
  const [isDomainsSaved, setIsDomainsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
        <button
          onClick={() => setTab("initiatives")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "initiatives"
              ? "bg-purple-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          R&amp;D Initiatives ({initialInitiatives.length})
        </button>
        <button
          onClick={() => setTab("programs")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "programs"
              ? "bg-purple-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          Labs Programs &amp; Fellowships ({initialPrograms.length})
        </button>
        <button
          onClick={() => setTab("domains")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "domains"
              ? "bg-purple-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          Technology Domains Marquee ({initialDomains.length})
        </button>
      </div>

      {/* TAB 1: R&D INITIATIVES */}
      {tab === "initiatives" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Active R&amp;D Initiatives</h3>
              <p className="text-xs text-neutral-500">Live prototypes and experiments tracked across Comfinity Labs</p>
            </div>
            <button
              onClick={() => {
                setInitModal({
                  id: `init-${Date.now()}`,
                  name: "",
                  phase: "Research Prototype",
                  status: "Active",
                  category: "AI & Systems",
                  summary: "",
                  order: initialInitiatives.length + 1,
                });
                setIsNewInit(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium transition"
            >
              <Plus className="w-3.5 h-3.5" />
              New Initiative
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialInitiatives.map((init) => (
              <div
                key={init.id}
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {init.category || "General R&D"}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        init.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {init.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white mb-1">{init.name}</h4>
                  <p className="text-xs font-mono text-neutral-400 mb-3">{init.phase}</p>

                  {init.summary && (
                    <p className="text-xs text-neutral-300 leading-relaxed mb-4">{init.summary}</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/60">
                  <span className="text-[10px] font-mono text-neutral-500">Order: {init.order ?? 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setInitModal(init);
                        setIsNewInit(false);
                      }}
                      className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Remove initiative "${init.name}"?`)) {
                          await deleteLabInitiativeAction(init.id);
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
        </div>
      )}

      {/* TAB 2: LABS PROGRAMS */}
      {tab === "programs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Programs &amp; Fellowships</h3>
              <p className="text-xs text-neutral-500">Live programs displayed under &quot;Programs&quot; on /labs</p>
            </div>
            <button
              onClick={() => {
                setProgModal({
                  id: `prog-${Date.now()}`,
                  title: "",
                  desc: "",
                  order: initialPrograms.length + 1,
                });
                setIsNewProg(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium transition"
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
                          if (confirm(`Remove program "${p.title}"?`)) {
                            await deleteLabProgramAction(p.id);
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DOMAINS MARQUEE */}
      {tab === "domains" && (
        <div className="max-w-2xl space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Technology Domains</h3>
            <p className="text-xs text-neutral-500">
              Each line is a domain displayed in the full-width ticker on /labs.
            </p>
          </div>

          <form
            action={async (formData) => {
              setIsSubmitting(true);
              try {
                await saveLabDomainsAction(formData);
                setIsDomainsSaved(true);
                setTimeout(() => setIsDomainsSaved(false), 3000);
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            <div>
              <textarea
                name="domains"
                value={domainsText}
                onChange={(e) => setDomainsText(e.target.value)}
                rows={12}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs font-mono text-white outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium transition disabled:opacity-50"
              >
                {isSubmitting ? "Updating..." : "Save Domains Ticker"}
              </button>
              {isDomainsSaved && (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Domains saved and live on /labs!
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* MODAL: EDIT INITIATIVE */}
      {initModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold text-white">
              {isNewInit ? "Add R&D Initiative" : "Edit R&D Initiative"}
            </h3>
            <form
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  await saveLabInitiativeAction(formData);
                  setInitModal(null);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <input type="hidden" name="id" value={initModal.id} />

              <div>
                <label className="block text-neutral-400 mb-1">Initiative Name *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={initModal.name}
                  required
                  placeholder="e.g. Autonomous Edge Intelligence"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Development Phase</label>
                  <input
                    type="text"
                    name="phase"
                    defaultValue={initModal.phase}
                    placeholder="e.g. Research Prototype, Benchmarking"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Category / Domain</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={initModal.category || "AI & Systems"}
                    placeholder="e.g. AI & Systems, Firmware"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={initModal.status}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500"
                >
                  <option value="Active">Active</option>
                  <option value="In Testing">In Testing</option>
                  <option value="Validation">Validation</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Summary / Technical Brief</label>
                <textarea
                  name="summary"
                  defaultValue={initModal.summary || ""}
                  rows={3}
                  placeholder="Low-power on-device inference for edge micro-controllers..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Display Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={initModal.order ?? 1}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setInitModal(null)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Initiative"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PROGRAM */}
      {progModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold text-white">
              {isNewProg ? "Add Program" : "Edit Program"}
            </h3>
            <form
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  await saveLabProgramAction(formData);
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
                  placeholder="e.g. Innovation Fellowship"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description</label>
                <textarea
                  name="desc"
                  defaultValue={progModal.desc}
                  rows={3}
                  placeholder="Scope of the fellowship..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Display Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={progModal.order ?? 1}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500"
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
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition disabled:opacity-50"
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
