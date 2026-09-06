import { readSubmissions } from "./contacts/_helpers";
import { getProjects } from "./projects/_helpers";
import Link from "next/link";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function AdminDashboard() {
  const submissions = readSubmissions();
  const unread = submissions.filter((s) => !s.read).length;
  const clientMeets = submissions.filter((s) => s.category === "client_meet").length;
  const jobInterns = submissions.filter((s) => s.category === "job_intern").length;
  const clientDocs = submissions.filter((s) => s.category === "client_doc" || Boolean(s.documentUrl)).length;
  const projects = getProjects();

  const recentAlerts = submissions.slice(0, 4);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Welcome header */}
      <div className="flex items-end justify-between border-b border-neutral-800 pb-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
            Overview
          </p>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Welcome to the Comfinity management hub.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded-lg px-3.5 py-2 transition"
        >
          ↗ View Live Website
        </a>
      </div>

      {/* Real-time stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/admin/contacts"
          className="rounded-xl bg-neutral-900 border border-neutral-800 p-5 flex flex-col justify-between hover:border-neutral-700 transition group"
        >
          <p className="text-xs text-neutral-500 uppercase font-mono tracking-wider">Total Alerts</p>
          <div className="my-2">
            <p className="text-3xl font-bold text-white">{submissions.length}</p>
            <p className={`text-xs mt-1 ${unread > 0 ? "text-amber-400 font-semibold" : "text-neutral-500"}`}>
              {unread > 0 ? `● ${unread} unread` : "All read"}
            </p>
          </div>
          <span className="text-[11px] text-neutral-500 group-hover:text-white transition">View inbox →</span>
        </Link>

        <Link
          href="/admin/contacts"
          className="rounded-xl bg-neutral-900 border border-neutral-800 p-5 flex flex-col justify-between hover:border-blue-500/40 transition group"
        >
          <p className="text-xs text-blue-400 uppercase font-mono tracking-wider">💼 Client Meets</p>
          <div className="my-2">
            <p className="text-3xl font-bold text-white">{clientMeets}</p>
            <p className="text-xs text-neutral-500 mt-1">Consultation requests</p>
          </div>
          <span className="text-[11px] text-neutral-500 group-hover:text-blue-400 transition">Filter meets →</span>
        </Link>

        <Link
          href="/admin/contacts"
          className="rounded-xl bg-neutral-900 border border-neutral-800 p-5 flex flex-col justify-between hover:border-purple-500/40 transition group"
        >
          <p className="text-xs text-purple-400 uppercase font-mono tracking-wider">🎓 Job / Interns</p>
          <div className="my-2">
            <p className="text-3xl font-bold text-white">{jobInterns}</p>
            <p className="text-xs text-neutral-500 mt-1">Candidate applications</p>
          </div>
          <span className="text-[11px] text-neutral-500 group-hover:text-purple-400 transition">Filter careers →</span>
        </Link>

        <Link
          href="/admin/contacts"
          className="rounded-xl bg-neutral-900 border border-neutral-800 p-5 flex flex-col justify-between hover:border-emerald-500/40 transition group"
        >
          <p className="text-xs text-emerald-400 uppercase font-mono tracking-wider">📄 Client Documents</p>
          <div className="my-2">
            <p className="text-3xl font-bold text-white">{clientDocs}</p>
            <p className="text-xs text-neutral-500 mt-1">Briefs, RFPs &amp; specs</p>
          </div>
          <span className="text-[11px] text-neutral-500 group-hover:text-emerald-400 transition">View documents →</span>
        </Link>
      </div>

      {/* Recent Alerts Feed */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Recent Communications &amp; Alerts</h2>
          <Link href="/admin/contacts" className="text-xs text-neutral-400 hover:text-white underline">
            View All Inbox →
          </Link>
        </div>

        {recentAlerts.length === 0 ? (
          <p className="text-xs text-neutral-500 py-4">No communications received yet.</p>
        ) : (
          <div className="divide-y divide-neutral-800">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="py-3 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs">
                      {alert.category === "client_meet"
                        ? "💼"
                        : alert.category === "job_intern"
                        ? "🎓"
                        : alert.category === "client_doc" || alert.documentUrl
                        ? "📄"
                        : "✉️"}
                    </span>
                    <span className="text-xs font-medium text-white truncate">{alert.name}</span>
                    {(alert.documentName || alert.documentUrl) && (
                      <span className="text-[10px] font-mono bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-600/30">
                        📄 {alert.documentName || "Document attached"}
                      </span>
                    )}
                    {!alert.read && (
                      <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">NEW</span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1">{alert.message}</p>
                </div>
                <span className="text-[10px] text-neutral-600 font-mono shrink-0">
                  {formatDate(alert.receivedAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Access Sections */}
      <div>
        <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-500 mb-4">Management Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "Portfolio Projects", count: `${projects.length} case studies`, href: "/admin/projects", desc: "Add, edit, or delete portfolio works" },
            { label: "Product Magazine", count: "20 Folio Pages", href: "/admin/magazine", desc: "Full text and image editor" },
            { label: "Careers & Student Tracks", count: "3 Core Sections", href: "/admin/careers", desc: "Edit job requirements & internships" },
            { label: "Settings & Cloudinary", count: "CDN & Security", href: "/admin/settings", desc: "Credentials, passwords, and Cloudinary" },
          ].map((sec) => (
            <Link
              key={sec.href}
              href={sec.href}
              className="rounded-xl bg-neutral-900 border border-neutral-800 p-4 hover:border-neutral-700 transition flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-white">{sec.label}</p>
                <p className="text-[11px] text-neutral-400 mt-1">{sec.desc}</p>
              </div>
              <p className="text-[10px] font-mono text-neutral-500 mt-3 pt-2 border-t border-neutral-800/80">{sec.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}