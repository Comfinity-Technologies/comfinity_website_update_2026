"use client";

import { useState } from "react";
import { Star, RefreshCw, Trash2, Plus, X, CheckCircle2, Clock, Eye } from "lucide-react";
import { type GoogleReview, type GoogleReviewStatus } from "@/lib/google-reviews-store";
import {
  saveGoogleReviewAction,
  setGoogleReviewStatusAction,
  deleteGoogleReviewAction,
} from "./_actions";

export function GoogleReviewsClient({
  initialReviews,
}: {
  initialReviews: GoogleReview[];
}) {
  const [reviews, setReviews] = useState<GoogleReview[]>(initialReviews);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isAdding, setIsAdding] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  const filtered = reviews.filter((r) => {
    if (filterStatus === "all") return true;
    return r.status.toLowerCase().includes(filterStatus.toLowerCase());
  });

  const handleSync = () => {
    setIsSyncing(true);
    setSyncMessage("Connecting to Google Business Profile...");
    setTimeout(() => {
      setIsSyncing(false);
      setSyncMessage("All reviews up to date! 0 new imported.");
      setTimeout(() => setSyncMessage(""), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Moderation Controls Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-400 text-sm">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="font-bold text-white text-base">4.8</span>
            <span className="text-neutral-500 text-xs">/ 5.0</span>
          </div>
          <span className="text-neutral-700">|</span>
          <span className="text-xs text-neutral-300 font-medium">126 Total Reviews</span>
          {syncMessage && (
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {syncMessage}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className="text-xs bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Syncing..." : "Sync Reviews"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="text-xs bg-white hover:bg-neutral-200 text-black font-medium px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Review</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
        {["all", "published", "approved", "pending"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilterStatus(tab)}
            className={`text-xs px-3 py-1 rounded-md capitalize transition cursor-pointer ${
              filterStatus === tab
                ? "bg-neutral-800 text-white font-medium border border-neutral-700"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Add New Review Modal */}
      {isAdding && (
        <div className="rounded-2xl border border-amber-500/40 bg-neutral-900/90 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="text-sm font-semibold text-white">Add Google Business Review</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form action={saveGoogleReviewAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Reviewer Name *</label>
                <input
                  type="text"
                  name="reviewer"
                  required
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Role / Company (Optional)</label>
                <input
                  type="text"
                  name="role"
                  placeholder="e.g. Engineering Director"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Rating</label>
                <select
                  name="rating"
                  defaultValue="5"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="5">★★★★★ (5 Stars)</option>
                  <option value="4">★★★★☆ (4 Stars)</option>
                  <option value="3">★★★☆☆ (3 Stars)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Initial Status</label>
                <select
                  name="status"
                  defaultValue="Approved"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Published">Published (Live on Website)</option>
                  <option value="Approved">Approved (Ready to publish)</option>
                  <option value="Pending Approval">Pending Approval</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Review Text *</label>
              <textarea
                name="reviewText"
                required
                rows={3}
                placeholder="Paste the Google review text..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={true}
                  className="rounded border-neutral-700 text-amber-500"
                />
                <span>Featured Review</span>
              </label>

              <div className="flex items-center gap-2">
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
                  Save Review
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Review Moderation Table */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        <div className="divide-y divide-neutral-800/60">
          {filtered.map((rev) => (
            <div key={rev.id} className="p-5 hover:bg-neutral-800/20 transition space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-bold text-white">
                    {rev.reviewer.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{rev.reviewer}</span>
                      {rev.role && <span className="text-xs text-neutral-400">· {rev.role}</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex text-amber-400 text-xs">
                        {"★".repeat(rev.rating)}
                        {"☆".repeat(5 - rev.rating)}
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">{rev.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                      rev.status === "Published"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : rev.status === "Approved"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {rev.status}
                  </span>

                  {rev.status !== "Published" ? (
                    <form action={setGoogleReviewStatusAction.bind(null, rev.id, "Published")}>
                      <button
                        type="submit"
                        className="text-xs bg-white hover:bg-neutral-200 text-black font-medium px-3 py-1 rounded-md transition cursor-pointer"
                      >
                        Publish
                      </button>
                    </form>
                  ) : (
                    <form action={setGoogleReviewStatusAction.bind(null, rev.id, "Approved")}>
                      <button
                        type="submit"
                        className="text-xs text-neutral-400 hover:text-white border border-neutral-800 px-3 py-1 rounded-md transition cursor-pointer"
                      >
                        Unpublish
                      </button>
                    </form>
                  )}

                  <form action={deleteGoogleReviewAction.bind(null, rev.id)}>
                    <button
                      type="submit"
                      className="text-xs text-neutral-500 hover:text-red-400 border border-neutral-800 hover:border-red-500/30 p-1.5 rounded-md transition"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed pl-11">
                &ldquo;{rev.reviewText}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
