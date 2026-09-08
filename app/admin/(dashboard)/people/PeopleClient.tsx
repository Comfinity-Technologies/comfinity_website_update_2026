"use client";

import { useState } from "react";
import { Users, Plus, Trash2, Edit2, X, Camera, ExternalLink } from "lucide-react";
import { type Leader } from "@/lib/team-store";
import { saveLeaderAction, deleteLeaderAction } from "./_actions";

export function PeopleClient({ initialLeaders }: { initialLeaders: Leader[] }) {
  const [leaders, setLeaders] = useState<Leader[]>(initialLeaders);
  const [editingItem, setEditingItem] = useState<Leader | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (item: Leader) => {
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingItem({
      id: `leader-${Date.now()}`,
      name: "",
      role: "DIRECTOR",
      tagline: "",
      bio: "",
      quote: "",
      portraitUrl: "",
      linkedin: "",
      email: "",
      order: leaders.length + 1,
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
          <h2 className="text-base font-semibold text-white">Executive Leadership Team</h2>
          <p className="text-xs text-neutral-400">
            {leaders.length} profiles listed · Live on the /about/leadership page
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="text-xs bg-white hover:bg-neutral-200 text-black font-medium px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Executive</span>
        </button>
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="rounded-2xl border border-amber-500/40 bg-neutral-900/90 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="text-sm font-semibold text-white">
              {isCreating ? "Add Leadership Profile" : `Edit Profile: ${editingItem.name}`}
            </h3>
            <button type="button" onClick={handleClose} className="text-neutral-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form action={saveLeaderAction} className="space-y-4">
            <input type="hidden" name="id" value={editingItem.id} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingItem.name}
                  required
                  placeholder="e.g. Sooraj Sudevan"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Role / Title *</label>
                <input
                  type="text"
                  name="role"
                  defaultValue={editingItem.role}
                  required
                  placeholder="e.g. FOUNDER & CEO"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  defaultValue={editingItem.tagline}
                  placeholder="e.g. Visionary. Builder."
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Portrait Image URL (or Cloudinary link)</label>
                <input
                  type="text"
                  name="portraitUrl"
                  defaultValue={editingItem.portraitUrl}
                  placeholder="Leave empty for 'PORTRAIT — COMING SOON'"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingItem.email}
                  placeholder="name@comfinityindia.com"
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
              <label className="text-xs text-neutral-400">Biography *</label>
              <textarea
                name="bio"
                defaultValue={editingItem.bio}
                required
                rows={4}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Featured Quote</label>
              <input
                type="text"
                name="quote"
                defaultValue={editingItem.quote}
                placeholder="Personal quote or principle..."
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
                className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-1.5 rounded-lg transition"
              >
                Save Executive Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leadership Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leaders.map((leader) => (
          <div key={leader.id} className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4 hover:border-neutral-700 transition">
            <div className="flex items-start gap-4">
              <div className="w-20 h-24 rounded-xl bg-neutral-800 border border-neutral-700 overflow-hidden shrink-0 flex items-center justify-center text-center p-2">
                {leader.portraitUrl ? (
                  <img src={leader.portraitUrl} alt={leader.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-[9px] font-mono text-neutral-500 leading-tight">
                    PORTRAIT COMING SOON
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    {leader.role}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleEdit(leader)}
                      className="text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 p-1.5 rounded-md transition"
                      title="Edit Profile"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <form action={deleteLeaderAction.bind(null, leader.id)}>
                      <button
                        type="submit"
                        className="text-xs text-neutral-500 hover:text-red-400 border border-neutral-800 hover:border-red-500/30 p-1.5 rounded-md transition"
                        title="Delete Profile"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </form>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white mt-1">{leader.name}</h3>
                <p className="text-xs text-neutral-400 italic">{leader.tagline}</p>
                {leader.email && (
                  <p className="text-[11px] font-mono text-neutral-500 mt-1">{leader.email}</p>
                )}
              </div>
            </div>

            <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
              {leader.bio}
            </p>

            {leader.quote && (
              <blockquote className="text-xs text-neutral-400 border-l-2 border-amber-500/60 pl-3 italic">
                &ldquo;{leader.quote}&rdquo;
              </blockquote>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
