"use client";

import { useState } from "react";
import { Layers, Sparkles, Sliders, CheckCircle2, Edit2, X, Plus } from "lucide-react";
import { type HomepageSections, type HeroSlide } from "@/lib/homepage-store";
import { saveHeroSlideAction, saveStatsAction, saveAnnouncementAction } from "./_actions";

export function HomepageClient({ initialData }: { initialData: HomepageSections }) {
  const [activeTab, setActiveTab] = useState<"hero" | "stats" | "announcement">("hero");
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const statsMap = initialData.stats.reduce((acc, s) => {
    acc[s.label] = s.value;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
        {[
          { id: "hero", label: "Hero Banner & Carousel" },
          { id: "stats", label: "Company Statistics" },
          { id: "announcement", label: "Summit Announcement" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`text-xs px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-neutral-800 text-white border border-neutral-700 shadow-sm"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Hero Slides */}
      {activeTab === "hero" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Hero Slides Sequence</h3>
            <span className="text-xs text-neutral-400 font-mono">
              {initialData.hero.length} active slides (Auto-advances every 6s)
            </span>
          </div>

          {editingSlide && (
            <div className="rounded-2xl border border-amber-500/40 bg-neutral-900/90 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h4 className="text-sm font-semibold text-white">Edit Slide: {editingSlide.id}</h4>
                <button type="button" onClick={() => setEditingSlide(null)} className="text-neutral-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form action={saveHeroSlideAction} className="space-y-4">
                <input type="hidden" name="id" value={editingSlide.id} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Eyebrow / Badge *</label>
                    <input
                      type="text"
                      name="badge"
                      defaultValue={editingSlide.badge}
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Main Headline Title *</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingSlide.title}
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Description Body *</label>
                  <textarea
                    name="body"
                    defaultValue={editingSlide.body}
                    required
                    rows={3}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Primary CTA Label</label>
                    <input
                      type="text"
                      name="ctaPrimaryLabel"
                      defaultValue={editingSlide.ctaPrimaryLabel}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Primary CTA Link</label>
                    <input
                      type="text"
                      name="ctaPrimaryHref"
                      defaultValue={editingSlide.ctaPrimaryHref}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Secondary CTA Label</label>
                    <input
                      type="text"
                      name="ctaSecondaryLabel"
                      defaultValue={editingSlide.ctaSecondaryLabel}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Secondary CTA Link</label>
                    <input
                      type="text"
                      name="ctaSecondaryHref"
                      defaultValue={editingSlide.ctaSecondaryHref}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingSlide(null)}
                    className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-neutral-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-1.5 rounded-lg transition"
                  >
                    Save Slide
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            {initialData.hero.map((slide, idx) => (
              <div key={slide.id} className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-neutral-800 text-amber-400 px-2 py-0.5 rounded border border-neutral-700">
                      Slide #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-white">{slide.badge}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingSlide(slide)}
                    className="text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit Slide</span>
                  </button>
                </div>

                <p className="text-sm font-medium text-white">{slide.title}</p>
                <p className="text-xs text-neutral-400">{slide.body}</p>

                <div className="pt-2 flex items-center gap-3 text-[11px] font-mono text-neutral-500 border-t border-neutral-800/60">
                  <span>CTA 1: {slide.ctaPrimaryLabel} ({slide.ctaPrimaryHref})</span>
                  <span>·</span>
                  <span>CTA 2: {slide.ctaSecondaryLabel} ({slide.ctaSecondaryHref})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Company Statistics */}
      {activeTab === "stats" && (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Company Numbers &amp; Metrics</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live statistics counter band displayed across the middle of the homepage.
            </p>
          </div>

          <form action={saveStatsAction} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Active Divisions</label>
                <input
                  type="number"
                  name="activeDivisions"
                  defaultValue={statsMap["Active divisions"] ?? 6}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Tech Domains (+)</label>
                <input
                  type="number"
                  name="techDomains"
                  defaultValue={statsMap["Technology domains"] ?? 12}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Community Programs</label>
                <input
                  type="number"
                  name="communityPrograms"
                  defaultValue={statsMap["Community programs"] ?? 3}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Social Commitment (%)</label>
                <input
                  type="number"
                  name="socialCommitment"
                  defaultValue={statsMap["Social commitment"] ?? 20}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Year Founded</label>
                <input
                  type="number"
                  name="foundedYear"
                  defaultValue={statsMap["Year founded"] ?? 2024}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg transition shadow-sm cursor-pointer"
              >
                Update Metrics
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Announcement */}
      {activeTab === "announcement" && (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Summit &amp; Event Announcement</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Highlight upcoming appearances, keynotes, or breaking news on the homepage hero.
            </p>
          </div>

          <form action={saveAnnouncementAction} className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="enabled"
                id="ann-enabled"
                defaultChecked={initialData.announcement.enabled}
                className="rounded border-neutral-700 text-amber-500"
              />
              <label htmlFor="ann-enabled" className="text-xs text-white font-medium cursor-pointer">
                Announcement Banner Enabled
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Badge Label</label>
                <input
                  type="text"
                  name="label"
                  defaultValue={initialData.announcement.label}
                  placeholder="e.g. ASEAN SUMMIT 2026"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Headline</label>
                <input
                  type="text"
                  name="heading"
                  defaultValue={initialData.announcement.heading}
                  placeholder="e.g. Join Comfinity at the Annual Tech Summit"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Description</label>
              <textarea
                name="description"
                defaultValue={initialData.announcement.description}
                rows={2}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">CTA Label</label>
                <input
                  type="text"
                  name="ctaLabel"
                  defaultValue={initialData.announcement.ctaLabel}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">CTA Destination URL</label>
                <input
                  type="text"
                  name="ctaHref"
                  defaultValue={initialData.announcement.ctaHref}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg transition shadow-sm cursor-pointer"
              >
                Save Announcement
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
