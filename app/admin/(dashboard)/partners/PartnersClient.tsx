"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, ExternalLink, ShieldCheck, Globe, Layers, Award } from "lucide-react";
import { PartnerItem, PartnershipType, SponsorshipItem } from "@/lib/partners-store";
import {
  savePartnerAction,
  deletePartnerAction,
  savePartnershipTypeAction,
  deletePartnershipTypeAction,
  saveSponsorshipAction,
  deleteSponsorshipAction,
} from "./_actions";

interface PartnersClientProps {
  initialPartners: PartnerItem[];
  initialTypes: PartnershipType[];
  initialSponsorships: SponsorshipItem[];
}

export function PartnersClient({
  initialPartners,
  initialTypes,
  initialSponsorships,
}: PartnersClientProps) {
  const [tab, setTab] = useState<"partners" | "types" | "sponsorships">("partners");
  const [partnerModal, setPartnerModal] = useState<PartnerItem | null>(null);
  const [isNewPartner, setIsNewPartner] = useState(false);

  const [typeModal, setTypeModal] = useState<PartnershipType | null>(null);
  const [isNewType, setIsNewType] = useState(false);

  const [sponModal, setSponModal] = useState<SponsorshipItem | null>(null);
  const [isNewSpon, setIsNewSpon] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
        <button
          onClick={() => setTab("partners")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "partners"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          Alliance Partners &amp; Logos ({initialPartners.length})
        </button>
        <button
          onClick={() => setTab("types")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "types"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Partnership Types ({initialTypes.length})
        </button>
        <button
          onClick={() => setTab("sponsorships")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "sponsorships"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Sponsorship Packages ({initialSponsorships.length})
        </button>
      </div>

      {/* TAB 1: ALLIANCE PARTNERS */}
      {tab === "partners" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Alliance Partners &amp; Global Logos</h3>
              <p className="text-xs text-neutral-500">Live in the infinite marquee on the homepage &amp; /partners</p>
            </div>
            <button
              onClick={() => {
                setPartnerModal({
                  id: `partner-${Date.now()}`,
                  name: "",
                  role: "Technology Partner",
                  tier: "Global",
                  href: "",
                  logoUrl: "",
                  logoDarkUrl: "",
                  status: "active",
                  order: initialPartners.length + 1,
                });
                setIsNewPartner(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Partner
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialPartners.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{p.name}</h4>
                      <p className="text-xs text-neutral-400">{p.role}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {p.tier}
                    </span>
                  </div>

                  {p.logoUrl ? (
                    <div className="h-14 rounded-lg bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-center p-2 mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.logoUrl}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain filter brightness-90 hover:brightness-100"
                      />
                    </div>
                  ) : (
                    <div className="h-14 rounded-lg bg-neutral-950/40 border border-dashed border-neutral-800 flex items-center justify-center text-xs text-neutral-500 font-mono mb-3">
                      Text wordmark only
                    </div>
                  )}

                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-500 hover:text-blue-400 flex items-center gap-1 font-mono truncate mb-2"
                    >
                      <ExternalLink className="w-3 h-3 shrink-0" />
                      {p.href}
                    </a>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/60">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      p.status === "active"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {p.status}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setPartnerModal(p);
                        setIsNewPartner(false);
                      }}
                      className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Remove partner "${p.name}"?`)) {
                          await deletePartnerAction(p.id);
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

      {/* TAB 2: PARTNERSHIP TYPES */}
      {tab === "types" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Partnership Frameworks</h3>
              <p className="text-xs text-neutral-500">Live cards displayed under &quot;Partnership Types&quot; on /partners</p>
            </div>
            <button
              onClick={() => {
                setTypeModal({
                  id: `type-${Date.now()}`,
                  title: "",
                  desc: "",
                  items: [],
                  order: initialTypes.length + 1,
                });
                setIsNewType(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Model
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {initialTypes.map((t, idx) => (
              <div
                key={t.id}
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-neutral-500">0{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setTypeModal(t);
                          setIsNewType(false);
                        }}
                        className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Remove partnership model "${t.title}"?`)) {
                            await deletePartnershipTypeAction(t.id);
                          }
                        }}
                        className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2">{t.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">{t.desc}</p>
                  <ul className="space-y-1.5 border-t border-neutral-800/60 pt-3">
                    {t.items.map((item, i) => (
                      <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SPONSORSHIPS */}
      {tab === "sponsorships" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Sponsorship Categories</h3>
              <p className="text-xs text-neutral-500">Presented under &quot;Sponsor Innovation&quot; on /partners</p>
            </div>
            <button
              onClick={() => {
                setSponModal({
                  id: `spon-${Date.now()}`,
                  title: "",
                  desc: "",
                  order: initialSponsorships.length + 1,
                });
                setIsNewSpon(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Package
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {initialSponsorships.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">{s.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">{s.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/60">
                  <span className="text-[10px] font-mono text-neutral-500">Order: {s.order ?? 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setSponModal(s);
                        setIsNewSpon(false);
                      }}
                      className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Remove sponsorship package "${s.title}"?`)) {
                          await deleteSponsorshipAction(s.id);
                        }
                      }}
                      className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10 transition"
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

      {/* MODAL: EDIT PARTNER */}
      {partnerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold text-white">
              {isNewPartner ? "Add Partner" : "Edit Partner"}
            </h3>
            <form
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  await savePartnerAction(formData);
                  setPartnerModal(null);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <input type="hidden" name="id" value={partnerModal.id} />

              <div>
                <label className="block text-neutral-400 mb-1">Partner Organization Name *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={partnerModal.name}
                  required
                  placeholder="e.g. AWS, IIT Madras, Intel"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Role / Caption</label>
                  <input
                    type="text"
                    name="role"
                    defaultValue={partnerModal.role}
                    placeholder="e.g. Sponsor, Technology Partner"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Tier Badge</label>
                  <input
                    type="text"
                    name="tier"
                    defaultValue={partnerModal.tier}
                    placeholder="e.g. Tier 1, Global, Academic"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">External Website URL</label>
                <input
                  type="url"
                  name="href"
                  defaultValue={partnerModal.href || ""}
                  placeholder="https://example.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Logo URL (Light Background / Default)</label>
                <input
                  type="text"
                  name="logoUrl"
                  defaultValue={partnerModal.logoUrl || ""}
                  placeholder="/sponsors/gates.png or https://..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Logo URL (Dark Theme Swap, optional)</label>
                <input
                  type="text"
                  name="logoDarkUrl"
                  defaultValue={partnerModal.logoDarkUrl || ""}
                  placeholder="/sponsors/gates-dark.png"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Display Status</label>
                  <select
                    name="status"
                    defaultValue={partnerModal.status}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  >
                    <option value="active">Active (Published)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Display Order</label>
                  <input
                    type="number"
                    name="order"
                    defaultValue={partnerModal.order ?? 1}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setPartnerModal(null)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PARTNERSHIP TYPE */}
      {typeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold text-white">
              {isNewType ? "Add Partnership Model" : "Edit Partnership Model"}
            </h3>
            <form
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  await savePartnershipTypeAction(formData);
                  setTypeModal(null);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <input type="hidden" name="id" value={typeModal.id} />

              <div>
                <label className="block text-neutral-400 mb-1">Model Title *</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={typeModal.title}
                  required
                  placeholder="e.g. Research Collaboration"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description</label>
                <textarea
                  name="desc"
                  defaultValue={typeModal.desc}
                  rows={3}
                  placeholder="Scope and purpose of this partnership..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Key Deliverables (one per line)</label>
                <textarea
                  name="items"
                  defaultValue={typeModal.items.join("\n")}
                  rows={4}
                  placeholder="Item 1&#10;Item 2&#10;Item 3"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Display Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={typeModal.order ?? 1}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setTypeModal(null)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Model"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT SPONSORSHIP */}
      {sponModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold text-white">
              {isNewSpon ? "Add Sponsorship Package" : "Edit Sponsorship Package"}
            </h3>
            <form
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  await saveSponsorshipAction(formData);
                  setSponModal(null);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <input type="hidden" name="id" value={sponModal.id} />

              <div>
                <label className="block text-neutral-400 mb-1">Package Title *</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={sponModal.title}
                  required
                  placeholder="e.g. Innovation Sponsor"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description</label>
                <textarea
                  name="desc"
                  defaultValue={sponModal.desc}
                  rows={3}
                  placeholder="What this sponsorship covers..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Display Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={sponModal.order ?? 1}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setSponModal(null)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
