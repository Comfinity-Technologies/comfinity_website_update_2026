"use client";

import { useState } from "react";
import {
  markRead,
  markUnread,
  deleteSubmission,
  logManualNotificationAction,
  syncRealMailboxAction,
  purgeSpamAction,
} from "./_actions";
import type { ContactSubmission, SubmissionCategory } from "./_helpers";

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) {
      return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    }
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

const CATEGORY_META: Record<
  SubmissionCategory,
  { label: string; icon: string; badgeCls: string; borderCls: string }
> = {
  client_meet: {
    label: "Client Meet",
    icon: "💼",
    badgeCls: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    borderCls: "border-blue-500/20",
  },
  job_intern: {
    label: "Career / Intern",
    icon: "🎓",
    badgeCls: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    borderCls: "border-purple-500/20",
  },
  client_doc: {
    label: "Client Document",
    icon: "📄",
    badgeCls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    borderCls: "border-emerald-500/30",
  },
  general: {
    label: "Client Message",
    icon: "✉️",
    badgeCls: "bg-neutral-500/20 text-neutral-300 border-neutral-500/30",
    borderCls: "border-neutral-500/20",
  },
};

export default function ContactsClient({
  submissions,
}: {
  submissions: ContactSubmission[];
}) {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isPurging, setIsPurging] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(
    submissions.length > 0 ? submissions[0].id : null
  );
  const [syncFeedback, setSyncFeedback] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Counts
  const unreadCount = submissions.filter((s) => !s.read).length;
  const clientMeetsCount = submissions.filter((s) => s.category === "client_meet").length;
  const internCount = submissions.filter((s) => s.category === "job_intern").length;
  const docCount = submissions.filter(
    (s) => s.category === "client_doc" || Boolean(s.documentUrl)
  ).length;

  const filtered = submissions.filter((s) => {
    // Tab filter
    if (selectedTab === "unread" && s.read) return false;
    if (selectedTab === "client_meet" && s.category !== "client_meet") return false;
    if (selectedTab === "job_intern" && s.category !== "job_intern") return false;
    if (selectedTab === "client_doc" && s.category !== "client_doc" && !s.documentUrl) return false;

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const text = `${s.name} ${s.email} ${s.subject || ""} ${s.documentName || ""} ${s.organization || ""} ${s.message}`.toLowerCase();
      return text.includes(q);
    }
    return true;
  });

  const selectedMessage =
    filtered.find((s) => s.id === selectedId) ||
    (filtered.length > 0 ? filtered[0] : null);

  async function handleSyncMailbox() {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await syncRealMailboxAction();
      if (res.success) {
        setSyncFeedback({
          type: "success",
          text: res.message,
        });
      } else {
        setSyncFeedback({
          type: res.requiresConfig ? "info" : "error",
          text: res.error || res.message,
        });
      }
    } catch (err: any) {
      setSyncFeedback({
        type: "error",
        text: err?.message || "Failed to sync emails.",
      });
    } finally {
      setIsSyncing(false);
    }
  }

  async function handlePurgeSpam() {
    if (!confirm("Remove all automated newsletters, subscription alerts, and spam?")) return;
    setIsPurging(true);
    try {
      const res = await purgeSpamAction();
      setSyncFeedback({
        type: "success",
        text: `Cleaned up ${res.removed} junk newsletter/spam emails! ${res.remaining} real emails remaining.`,
      });
    } catch (e: any) {
      setSyncFeedback({ type: "error", text: e?.message || "Failed to purge spam" });
    } finally {
      setIsPurging(false);
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            Admin / Mailbox
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              Inbox &amp; Communications
            </h1>
            {unreadCount > 0 && (
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-medium">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Real client inquiries, project documents, RFPs, and consultation requests.
          </p>
        </div>

        {/* Header Actions Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSyncMailbox}
            disabled={isSyncing}
            className="text-xs bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 px-3.5 py-2 rounded-lg transition flex items-center gap-2 disabled:opacity-50 font-medium shadow-sm"
            title="Connect to Gmail and sync client emails (spam & newsletters auto-filtered)"
          >
            <span className={isSyncing ? "animate-spin inline-block" : ""}>🔄</span>
            <span>{isSyncing ? "Syncing Gmail..." : "Sync Real Mailbox"}</span>
          </button>

          <button
            onClick={handlePurgeSpam}
            disabled={isPurging}
            className="text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 hover:border-neutral-700 px-3 py-2 rounded-lg transition flex items-center gap-1.5"
            title="Clean out all automated newsletters, subscription alerts, and unsubscribe emails"
          >
            <span>🧹</span>
            <span>{isPurging ? "Purging..." : "Clean Newsletters"}</span>
          </button>

          <button
            onClick={() => setShowLogModal(!showLogModal)}
            className="text-xs bg-white text-black font-semibold hover:bg-neutral-200 px-3.5 py-2 rounded-lg transition"
          >
            + Log Notice
          </button>
        </div>
      </div>

      {/* Manual Notice Drawer */}
      {showLogModal && (
        <form
          action={async (formData) => {
            await logManualNotificationAction(formData);
            setShowLogModal(false);
          }}
          className="rounded-xl bg-neutral-900 border border-neutral-700 p-6 space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Log Client Document / Meeting Notice</h3>
            <button
              type="button"
              onClick={() => setShowLogModal(false)}
              className="text-xs text-neutral-500 hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Category</label>
              <select
                name="category"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-xs text-white"
              >
                <option value="client_doc">📄 Client Document / RFP</option>
                <option value="client_meet">💼 Client Meet</option>
                <option value="job_intern">🎓 Career / Intern</option>
                <option value="general">✉️ Client Message</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Client / Sender Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Acme Corp, Rahul Sharma"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Document File Name</label>
              <input
                type="text"
                name="documentName"
                placeholder="e.g. Project_Brief_v2.pdf"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Email / Contact</label>
              <input
                type="email"
                name="email"
                placeholder="client@company.com"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Document Link / URL</label>
              <input
                type="text"
                name="documentUrl"
                placeholder="e.g. /uploads/docs/... or https://..."
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Company / Organization</label>
              <input
                type="text"
                name="organization"
                placeholder="e.g. Tech Innovations Ltd."
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1">Details / Notes</label>
            <textarea
              name="message"
              required
              rows={3}
              placeholder="Summary of requirements, scope, or discovery details..."
              className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="text-xs bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 transition"
          >
            Save Record
          </button>
        </form>
      )}

      {/* Sync Feedback Toast */}
      {syncFeedback && (
        <div
          className={`rounded-xl border p-3.5 text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
            syncFeedback.type === "success"
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
              : syncFeedback.type === "info"
              ? "bg-blue-950/40 border-blue-500/40 text-blue-300"
              : "bg-red-950/40 border-red-500/40 text-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{syncFeedback.type === "success" ? "✓" : syncFeedback.type === "info" ? "ℹ️" : "⚠️"}</span>
            <span className="font-medium">{syncFeedback.text}</span>
            {syncFeedback.type === "info" && (
              <a href="/admin/settings" className="underline ml-1 font-semibold hover:text-white">
                Configure in Settings →
              </a>
            )}
          </div>
          <button
            onClick={() => setSyncFeedback(null)}
            className="text-neutral-400 hover:text-white shrink-0 px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Toolbar: Category Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
          {[
            { id: "all", label: `All (${submissions.length})` },
            { id: "client_doc", label: `📄 Documents (${docCount})` },
            { id: "client_meet", label: `💼 Meets (${clientMeetsCount})` },
            { id: "job_intern", label: `🎓 Interns (${internCount})` },
            { id: "unread", label: `🔔 Unread (${unreadCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`text-xs px-3 py-1.5 rounded-lg transition font-medium ${
                selectedTab === tab.id
                  ? "bg-neutral-800 text-white shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sender, subject, doc..."
            className="w-full sm:w-64 rounded-xl bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
          />
        </div>
      </div>

      {/* Modern Two-Column Email Interface */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto text-xl">
            ✉️
          </div>
          <h3 className="text-base font-semibold text-white">Your Mailbox is Clear</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
            No emails found in this tab. When clients submit inquiries via the website or send emails to your mailbox, they will appear here cleanly with attachments ready to download.
          </p>
          <div className="pt-2">
            <button
              onClick={handleSyncMailbox}
              disabled={isSyncing}
              className="text-xs bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-lg transition inline-flex items-center gap-2"
            >
              <span>🔄</span>
              <span>Sync Real Mailbox Now</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Column: Email List (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden divide-y divide-neutral-800/80 max-h-[720px] overflow-y-auto">
            {filtered.map((s) => {
              const meta = CATEGORY_META[s.category] || CATEGORY_META.general;
              const isSelected = selectedMessage?.id === s.id;
              const initial = (s.name || "C")[0].toUpperCase();

              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-neutral-800/90 border-l-4 border-l-emerald-400"
                      : "hover:bg-neutral-800/40 border-l-4 border-l-transparent"
                  } ${!s.read ? "bg-neutral-850/40" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Initial Avatar */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs shrink-0 ${
                        s.category === "client_doc"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : s.category === "client_meet"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : s.category === "job_intern"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-neutral-800 text-neutral-300 border border-neutral-700"
                      }`}
                    >
                      {initial}
                    </div>

                    {/* Content Preview */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-xs truncate ${!s.read ? "font-bold text-white" : "font-medium text-neutral-200"}`}>
                          {s.name}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono shrink-0">
                          {formatDate(s.receivedAt)}
                        </span>
                      </div>

                      {/* Subject */}
                      <p className={`text-xs truncate mb-1 ${!s.read ? "font-semibold text-neutral-100" : "text-neutral-400"}`}>
                        {s.subject || s.message.slice(0, 45) || "Inquiry"}
                      </p>

                      {/* Snippet */}
                      <p className="text-[11px] text-neutral-500 line-clamp-1 leading-normal">
                        {s.message.replace(/^\[Subject:[^\]]+\]\s*/i, "")}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${meta.badgeCls}`}>
                          {meta.icon} {meta.label}
                        </span>

                        {s.documentUrl && (
                          <span className="text-[9px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <span>📎</span>
                            <span className="truncate max-w-[120px]">{s.documentName || "Document"}</span>
                          </span>
                        )}

                        {s.source === "gmail_imap" && (
                          <span className="text-[9px] font-mono text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">
                            Gmail
                          </span>
                        )}

                        {!s.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-auto" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Reading Pane (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 flex flex-col justify-between min-h-[580px] shadow-xl">
            {selectedMessage ? (
              <div className="space-y-5">
                {/* Header: Subject & Date */}
                <div className="border-b border-neutral-800 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-md border flex items-center gap-1.5 ${
                        CATEGORY_META[selectedMessage.category]?.badgeCls || CATEGORY_META.general.badgeCls
                      }`}
                    >
                      <span>{CATEGORY_META[selectedMessage.category]?.icon || "✉️"}</span>
                      <span>{CATEGORY_META[selectedMessage.category]?.label || "Client Message"}</span>
                    </span>

                    <span className="text-xs text-neutral-500 font-mono">
                      {formatDate(selectedMessage.receivedAt)}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white tracking-tight leading-snug">
                    {selectedMessage.subject || "Client Inquiry"}
                  </h2>
                </div>

                {/* Sender Details Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-neutral-950/60 p-4 border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 text-white font-bold flex items-center justify-center text-sm border border-neutral-700">
                      {(selectedMessage.name || "C")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{selectedMessage.name}</p>
                      <p className="text-xs text-neutral-400 font-mono">{selectedMessage.email}</p>
                      {selectedMessage.organization && (
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Org: {selectedMessage.organization}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions right */}
                  <div className="flex items-center gap-2 shrink-0">
                    {selectedMessage.email && selectedMessage.email !== "client-file@internal" && (
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                          selectedMessage.subject || "Inquiry with Comfinity"
                        )}&body=Hi ${encodeURIComponent(selectedMessage.name)},%0A%0A`}
                        className="text-xs bg-white text-black font-semibold px-3 py-1.5 rounded-lg hover:bg-neutral-200 transition flex items-center gap-1"
                      >
                        <span>Reply</span>
                        <span>↗</span>
                      </a>
                    )}

                    {selectedMessage.read ? (
                      <form action={markUnread.bind(null, selectedMessage.id)}>
                        <button
                          type="submit"
                          className="text-xs text-neutral-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 transition"
                        >
                          Mark Unread
                        </button>
                      </form>
                    ) : (
                      <form action={markRead.bind(null, selectedMessage.id)}>
                        <button
                          type="submit"
                          className="text-xs text-amber-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-amber-500/40 hover:bg-amber-500/20 transition"
                        >
                          Mark Read
                        </button>
                      </form>
                    )}

                    <form action={deleteSubmission.bind(null, selectedMessage.id)}>
                      <button
                        type="submit"
                        className="text-xs text-neutral-500 hover:text-red-400 px-2 py-1.5 rounded-lg border border-neutral-800 hover:border-red-500/30 transition"
                        title="Delete message"
                      >
                        🗑️
                      </button>
                    </form>
                  </div>
                </div>

                {/* PROMINENT DOCUMENT DOWNLOAD CARD */}
                {selectedMessage.documentUrl && (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-emerald-950/30">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center text-2xl font-mono shrink-0">
                        📄
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate max-w-sm">
                          {selectedMessage.documentName || "Client Document"}
                        </p>
                        <p className="text-xs text-emerald-400/80 mt-0.5 font-mono">
                          {selectedMessage.documentSize ? `${selectedMessage.documentSize} · ` : ""}
                          Client File Attachment
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <a
                        href={selectedMessage.documentUrl}
                        download={selectedMessage.documentName || "client_document"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-semibold text-xs rounded-lg transition shadow flex items-center gap-1.5"
                      >
                        <span>↓</span>
                        <span>Download Document</span>
                      </a>
                      <a
                        href={selectedMessage.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg transition border border-neutral-700"
                        title="Open document in new tab"
                      >
                        ↗ Open
                      </a>
                    </div>
                  </div>
                )}

                {/* Email Body Content */}
                <div className="rounded-xl bg-neutral-950/50 p-6 border border-neutral-800/80">
                  <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
                    Message Content
                  </p>
                  <div className="text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap break-words overflow-hidden max-h-[380px] overflow-y-auto pr-2">
                    {selectedMessage.message.replace(/^\[Subject:[^\]]+\]\s*/i, "") || "No text content provided."}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center py-20 text-neutral-500">
                <p className="text-sm">Select an email on the left to view the full message and download attachments.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}