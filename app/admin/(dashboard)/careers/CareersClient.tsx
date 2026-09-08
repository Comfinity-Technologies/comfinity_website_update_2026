"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Briefcase, Sparkles, GraduationCap, CheckCircle } from "lucide-react";
import { JobOpening, CareersData } from "./_helpers";
import {
  saveJobOpeningAction,
  deleteJobOpeningAction,
  saveCareersData,
} from "./_actions";

interface CareersClientProps {
  initialData: CareersData;
  initialOpenings: JobOpening[];
}

export function CareersClient({ initialData, initialOpenings }: CareersClientProps) {
  const [tab, setTab] = useState<"openings" | "culture" | "offers">("openings");
  const [jobModal, setJobModal] = useState<JobOpening | null>(null);
  const [isNewJob, setIsNewJob] = useState(false);

  const [isCultureSaved, setIsCultureSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
        <button
          onClick={() => setTab("openings")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "openings"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          Job Openings ({initialOpenings.length})
        </button>
        <button
          onClick={() => setTab("culture")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "culture"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Who We Are Looking For ({initialData.lookingFor.length})
        </button>
        <button
          onClick={() => setTab("offers")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "offers"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          Offers &amp; Student Programs ({initialData.studentPrograms.length})
        </button>
      </div>

      {/* TAB 1: JOB OPENINGS */}
      {tab === "openings" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Active Job Openings</h3>
              <p className="text-xs text-neutral-500">Live positions advertised on /careers</p>
            </div>
            <button
              onClick={() => {
                setJobModal({
                  id: `job-${Date.now()}`,
                  title: "",
                  department: "Engineering",
                  location: "Bengaluru / Remote",
                  type: "Full-time",
                  experience: "2+ years",
                  description: "",
                  requirements: [],
                  status: "Active",
                  order: initialOpenings.length + 1,
                });
                setIsNewJob(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Opening
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialOpenings.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {job.department}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        job.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white mb-1">{job.title}</h4>
                  <p className="text-xs text-neutral-400 mb-3">
                    {job.location} · {job.type} · {job.experience}
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">{job.description}</p>

                  {job.requirements && job.requirements.length > 0 && (
                    <ul className="space-y-1.5 border-t border-neutral-800/60 pt-3">
                      {job.requirements.slice(0, 3).map((r, i) => (
                        <li key={i} className="text-[11px] text-neutral-400 flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/60 mt-4">
                  <span className="text-[10px] font-mono text-neutral-500">Order: {job.order ?? 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setJobModal(job);
                        setIsNewJob(false);
                      }}
                      className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Remove position "${job.title}"?`)) {
                          await deleteJobOpeningAction(job.id);
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

      {/* TAB 2 & 3: CULTURE & OFFERS FORM */}
      {(tab === "culture" || tab === "offers") && (
        <form
          action={async (formData) => {
            setIsSubmitting(true);
            try {
              await saveCareersData(formData);
              setIsCultureSaved(true);
              setTimeout(() => setIsCultureSaved(false), 3000);
            } finally {
              setIsSubmitting(false);
            }
          }}
          className="max-w-3xl space-y-6"
        >
          {tab === "culture" && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-white">
                Who We Are Looking For (one trait per line)
              </label>
              <p className="text-xs text-neutral-500">
                Live bullet matrix rendered under &quot;Curiosity first. Always.&quot;
              </p>
              <textarea
                name="lookingFor"
                rows={8}
                defaultValue={initialData.lookingFor.join("\n")}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs font-mono text-white outline-none focus:border-blue-500"
              />
              <input
                type="hidden"
                name="offers"
                value={initialData.offers.map((o) => `${o.t} | ${o.d}`).join("\n")}
              />
              <input
                type="hidden"
                name="studentPrograms"
                value={initialData.studentPrograms.map((p) => `${p.t} | ${p.d}`).join("\n")}
              />
            </div>
          )}

          {tab === "offers" && (
            <div className="space-y-6">
              <input
                type="hidden"
                name="lookingFor"
                value={initialData.lookingFor.join("\n")}
              />

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white">
                  What We Offer (Title | Description per line)
                </label>
                <textarea
                  name="offers"
                  rows={6}
                  defaultValue={initialData.offers.map((o) => `${o.t} | ${o.d}`).join("\n")}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs font-mono text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white">
                  Student Programs &amp; Internships (Title | Description per line)
                </label>
                <textarea
                  name="studentPrograms"
                  rows={6}
                  defaultValue={initialData.studentPrograms.map((p) => `${p.t} | ${p.d}`).join("\n")}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs font-mono text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Content Changes"}
            </button>
            {isCultureSaved && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Saved and live on /careers!
              </span>
            )}
          </div>
        </form>
      )}

      {/* MODAL: EDIT JOB OPENING */}
      {jobModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-semibold text-white">
              {isNewJob ? "Add Job Opening" : "Edit Job Opening"}
            </h3>
            <form
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  await saveJobOpeningAction(formData);
                  setJobModal(null);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <input type="hidden" name="id" value={jobModal.id} />

              <div>
                <label className="block text-neutral-400 mb-1">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={jobModal.title}
                  required
                  placeholder="e.g. Senior AI Systems Engineer"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    defaultValue={jobModal.department}
                    placeholder="e.g. Comfinity AI Labs, Hardware"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={jobModal.location}
                    placeholder="e.g. Bengaluru / Remote, Chennai"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Employment Type</label>
                  <select
                    name="type"
                    defaultValue={jobModal.type}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Experience Level</label>
                  <input
                    type="text"
                    name="experience"
                    defaultValue={jobModal.experience}
                    placeholder="e.g. 2+ years, 4+ years"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Role Description</label>
                <textarea
                  name="description"
                  defaultValue={jobModal.description}
                  rows={3}
                  placeholder="Summary of responsibilities and mission..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Requirements (one per line)</label>
                <textarea
                  name="requirements"
                  defaultValue={(jobModal.requirements || []).join("\n")}
                  rows={4}
                  placeholder="Requirement 1&#10;Requirement 2"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={jobModal.status}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  >
                    <option value="Active">Active (Published)</option>
                    <option value="Draft">Draft (Hidden)</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Display Order</label>
                  <input
                    type="number"
                    name="order"
                    defaultValue={jobModal.order ?? 1}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setJobModal(null)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Job Opening"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
