"use client";

import { useState } from "react";
import { Sliders, Megaphone, Phone, Share2, Shield, CheckCircle } from "lucide-react";
import { GlobalSettings } from "@/lib/global-store";
import { saveGlobalSettingsAction } from "./_actions";

interface GlobalSettingsClientProps {
  initialSettings: GlobalSettings;
}

export function GlobalSettingsClient({ initialSettings }: GlobalSettingsClientProps) {
  const [tab, setTab] = useState<"announcement" | "contact" | "social" | "branding">("announcement");
  const [settings, setSettings] = useState<GlobalSettings>(initialSettings);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
        <button
          onClick={() => setTab("announcement")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "announcement"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Megaphone className="w-3.5 h-3.5" />
          Top Announcement
        </button>
        <button
          onClick={() => setTab("contact")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "contact"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          Contact &amp; Hub
        </button>
        <button
          onClick={() => setTab("social")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "social"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          Social Channels
        </button>
        <button
          onClick={() => setTab("branding")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            tab === "branding"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          Branding &amp; Footer
        </button>
      </div>

      <form
        action={async (formData) => {
          setIsSubmitting(true);
          try {
            await saveGlobalSettingsAction(formData);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="max-w-3xl space-y-6"
      >
        {/* TAB 1: ANNOUNCEMENT */}
        {tab === "announcement" && (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <h4 className="text-sm font-semibold text-white">Global Announcement Banner</h4>
                <p className="text-xs text-neutral-400">Displayed at the top of pages or inside featured summit banners</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="announcementEnabled"
                  name="announcementEnabled"
                  value="true"
                  defaultChecked={settings.announcement?.enabled}
                  className="w-4 h-4 rounded bg-neutral-950 border-neutral-800 text-blue-600 focus:ring-0"
                />
                <label htmlFor="announcementEnabled" className="text-xs text-neutral-300 font-medium cursor-pointer">
                  Banner Enabled
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Badge Text</label>
                <input
                  type="text"
                  name="announcementBadge"
                  defaultValue={settings.announcement?.badge}
                  placeholder="e.g. Summit 2026, New"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">Destination URL</label>
                <input
                  type="text"
                  name="announcementLink"
                  defaultValue={settings.announcement?.link}
                  placeholder="/partners or https://..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Announcement Message</label>
              <textarea
                name="announcementText"
                defaultValue={settings.announcement?.text}
                rows={2}
                placeholder="Message for visitors..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* TAB 2: CONTACT & HUB */}
        {tab === "contact" && (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
            <h4 className="text-sm font-semibold text-white border-b border-neutral-800 pb-3">
              Contact &amp; Hub Locations
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Primary Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={settings.contact?.email}
                  placeholder="info@comfinityindia.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">Phone / Support Line</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={settings.contact?.phone}
                  placeholder="+91 (0) 80 0000 0000"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-neutral-400 mb-1">Physical / Corporate Address</label>
              <input
                type="text"
                name="address"
                defaultValue={settings.contact?.address}
                placeholder="Comfinity Technologies, Bengaluru / ASEAN Hub"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="text-xs">
              <label className="block text-neutral-400 mb-1">Free Consultation Action Link</label>
              <input
                type="text"
                name="consultationLink"
                defaultValue={settings.contact?.consultationLink}
                placeholder="/contact"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* TAB 3: SOCIAL CHANNELS */}
        {tab === "social" && (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
            <h4 className="text-sm font-semibold text-white border-b border-neutral-800 pb-3">
              Social Media Links (Footer &amp; Brand)
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedin"
                  defaultValue={settings.social?.linkedin}
                  placeholder="https://linkedin.com/company/comfinity"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">X / Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  defaultValue={settings.social?.twitter}
                  placeholder="https://x.com/comfinity"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">GitHub Organization</label>
                <input
                  type="url"
                  name="github"
                  defaultValue={settings.social?.github}
                  placeholder="https://github.com/Comfinity-Technologies"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">YouTube Channel</label>
                <input
                  type="url"
                  name="youtube"
                  defaultValue={settings.social?.youtube}
                  placeholder="https://youtube.com/@comfinity"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">Instagram</label>
                <input
                  type="url"
                  name="instagram"
                  defaultValue={settings.social?.instagram}
                  placeholder="https://instagram.com/comfinity"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BRANDING & FOOTER */}
        {tab === "branding" && (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
            <h4 className="text-sm font-semibold text-white border-b border-neutral-800 pb-3">
              Brand Identity &amp; Legal Disclosures
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Legal Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  defaultValue={settings.branding?.companyName}
                  placeholder="Comfinity Technologies"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Brand Mission Tagline</label>
                <textarea
                  name="tagline"
                  defaultValue={settings.branding?.tagline}
                  rows={2}
                  placeholder="Technology & Innovation Group..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Copyright Notice Text</label>
                <input
                  type="text"
                  name="copyrightText"
                  defaultValue={settings.branding?.copyrightText}
                  placeholder="Comfinity Technologies Private Limited. All rights reserved."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Hidden inputs to preserve unedited tabs on form submit */}
        {tab !== "announcement" && (
          <>
            <input type="hidden" name="announcementEnabled" value={settings.announcement?.enabled ? "true" : "false"} />
            <input type="hidden" name="announcementBadge" value={settings.announcement?.badge || ""} />
            <input type="hidden" name="announcementText" value={settings.announcement?.text || ""} />
            <input type="hidden" name="announcementLink" value={settings.announcement?.link || ""} />
          </>
        )}
        {tab !== "contact" && (
          <>
            <input type="hidden" name="email" value={settings.contact?.email || ""} />
            <input type="hidden" name="phone" value={settings.contact?.phone || ""} />
            <input type="hidden" name="address" value={settings.contact?.address || ""} />
            <input type="hidden" name="consultationLink" value={settings.contact?.consultationLink || ""} />
          </>
        )}
        {tab !== "social" && (
          <>
            <input type="hidden" name="linkedin" value={settings.social?.linkedin || ""} />
            <input type="hidden" name="twitter" value={settings.social?.twitter || ""} />
            <input type="hidden" name="github" value={settings.social?.github || ""} />
            <input type="hidden" name="youtube" value={settings.social?.youtube || ""} />
            <input type="hidden" name="instagram" value={settings.social?.instagram || ""} />
          </>
        )}
        {tab !== "branding" && (
          <>
            <input type="hidden" name="companyName" value={settings.branding?.companyName || ""} />
            <input type="hidden" name="tagline" value={settings.branding?.tagline || ""} />
            <input type="hidden" name="copyrightText" value={settings.branding?.copyrightText || ""} />
          </>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Global Settings"}
          </button>
          {isSaved && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Settings updated and revalidated across all pages!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
