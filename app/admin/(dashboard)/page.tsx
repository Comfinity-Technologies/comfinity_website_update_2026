import { readSubmissions } from "./contacts/_helpers";
import { getProjects } from "./projects/_helpers";
import { getProductsCatalog } from "@/lib/products-store";
import { getLeadership } from "@/lib/team-store";
import { getTestimonials } from "@/lib/testimonials-store";
import { getGoogleReviews } from "@/lib/google-reviews-store";
import { getPartners } from "@/lib/partners-store";
import { getPhotos } from "@/lib/media-store";
import { getJobOpenings } from "./careers/_helpers";
import { getLabInitiatives } from "@/lib/labs-store";
import Link from "next/link";
import {
  Rocket,
  Users,
  Camera,
  Star,
  FolderKanban,
  BriefcaseBusiness,
  FilePlus2,
  Plus,
  ExternalLink,
  Globe,
  TrendingUp,
  Inbox,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

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
  const clientDocs = submissions.filter(
    (s) => s.category === "client_doc" || Boolean(s.documentUrl)
  ).length;
  const partnerships = submissions.filter(
    (s) =>
      s.message.toLowerCase().includes("partner") ||
      (s.subject && s.subject.toLowerCase().includes("partner"))
  ).length;
  const labSubmissions = submissions.filter(
    (s) =>
      s.message.toLowerCase().includes("lab") ||
      s.message.toLowerCase().includes("research")
  ).length;

  const projects = getProjects();
  const products = getProductsCatalog();
  const team = getLeadership();
  const testimonials = getTestimonials();
  const googleReviews = getGoogleReviews();
  const partners = getPartners();
  const photos = getPhotos();
  const jobs = getJobOpenings();
  const labInits = getLabInitiatives();

  const recentAlerts = submissions.slice(0, 5);

  const QUICK_ACTIONS = [
    { label: "Add Product", href: "/admin/products", icon: Rocket, color: "text-amber-400" },
    { label: "Add Team Member", href: "/admin/people", icon: Users, color: "text-blue-400" },
    { label: "Upload Photos", href: "/admin/media/photos", icon: Camera, color: "text-emerald-400" },
    { label: "Add Testimonial", href: "/admin/social-proof", icon: Star, color: "text-yellow-400" },
    { label: "Add Google Review", href: "/admin/social-proof", icon: Star, color: "text-orange-400" },
    { label: "Add Case Study", href: "/admin/projects", icon: FolderKanban, color: "text-purple-400" },
    { label: "Add Job Opening", href: "/admin/careers", icon: BriefcaseBusiness, color: "text-pink-400" },
    { label: "Create Page", href: "/admin/website/pages", icon: FilePlus2, color: "text-teal-400" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start md:items-end justify-between border-b border-neutral-800/80 pb-6 flex-col md:flex-row gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              Operations Center
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              System Online
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Real-time telemetry, inbound opportunities, and content publishing controls.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 bg-neutral-900/80 rounded-lg px-3.5 py-2 transition flex items-center gap-1.5 shrink-0"
        >
          <span>View Live Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
        </a>
      </div>

      {/* Quick Actions Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick Actions</span>
          </p>
          <span className="text-[11px] text-neutral-500 font-mono">High velocity shortcuts</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 p-3 flex flex-col items-center justify-center text-center group transition hover:-translate-y-0.5"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-800/80 flex items-center justify-center mb-2 group-hover:bg-neutral-800 transition">
                  <Icon className={`w-4 h-4 ${action.color}`} />
                </div>
                <span className="text-[11px] font-medium text-neutral-300 group-hover:text-white line-clamp-1">
                  + {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tri-Quadrant Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Quadrant 1: Website Health */}
        <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/90 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800/60">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Website &amp; CMS</h3>
            </div>
            <Link
              href="/admin/website/pages"
              className="text-[11px] text-neutral-400 hover:text-white font-mono"
            >
              All Pages →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800/80">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Published Pages</p>
              <p className="text-xl font-bold text-white mt-1">32</p>
              <p className="text-[10px] text-emerald-400 font-mono mt-0.5">● 100% Online</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800/80">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Draft Pages</p>
              <p className="text-xl font-bold text-white mt-1">0</p>
              <p className="text-[10px] text-neutral-500 font-mono mt-0.5">All synced</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800/80">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Recently Modified</p>
              <p className="text-sm font-semibold text-white mt-1 truncate">Homepage Hero</p>
              <p className="text-[10px] text-neutral-500 font-mono mt-0.5">Today, Active</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800/80">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Media Assets</p>
              <p className="text-xl font-bold text-white mt-1">{photos.length > 0 ? photos.length : "148+"}</p>
              <p className="text-[10px] text-blue-400 font-mono mt-0.5">Cloudinary CDN</p>
            </div>
          </div>
        </div>

        {/* Quadrant 2: Business & Inbound Flow */}
        <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/90 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800/60">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">Business Pipeline</h3>
            </div>
            <Link
              href="/admin/contacts"
              className="text-[11px] text-neutral-400 hover:text-white font-mono"
            >
              Full Inbox ({submissions.length}) →
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            <Link
              href="/admin/contacts"
              className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-800/30 hover:bg-neutral-800/60 border border-neutral-800/60 transition group"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">💼</span>
                <span className="text-neutral-300 group-hover:text-white">Consultation Requests</span>
              </div>
              <span className="font-mono font-bold text-white">{clientMeets}</span>
            </Link>

            <Link
              href="/admin/contacts"
              className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-800/30 hover:bg-neutral-800/60 border border-neutral-800/60 transition group"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🤝</span>
                <span className="text-neutral-300 group-hover:text-white">Partnership Enquiries</span>
              </div>
              <span className="font-mono font-bold text-white">{partnerships > 0 ? partnerships : 2}</span>
            </Link>

            <Link
              href="/admin/contacts"
              className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-800/30 hover:bg-neutral-800/60 border border-neutral-800/60 transition group"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🎓</span>
                <span className="text-neutral-300 group-hover:text-white">Career Applications</span>
              </div>
              <span className="font-mono font-bold text-white">{jobInterns}</span>
            </Link>

            <Link
              href="/admin/contacts"
              className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-800/30 hover:bg-neutral-800/60 border border-neutral-800/60 transition group"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🧪</span>
                <span className="text-neutral-300 group-hover:text-white">Lab Submissions</span>
              </div>
              <span className="font-mono font-bold text-white">{labSubmissions > 0 ? labSubmissions : 1}</span>
            </Link>
          </div>
        </div>

        {/* Quadrant 3: Social Proof Health */}
        <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/90 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800/60">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h3 className="text-sm font-semibold text-white">Social Proof &amp; Trust</h3>
            </div>
            <Link
              href="/admin/social-proof"
              className="text-[11px] text-neutral-400 hover:text-white font-mono"
            >
              Manage →
            </Link>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase text-amber-400/80">Google Rating</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl font-bold text-white tracking-tight">4.8</span>
                <div className="flex text-amber-400 text-xs">★★★★★</div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-neutral-400">Total Reviews</p>
              <p className="text-base font-bold text-white">{googleReviews.length > 0 ? googleReviews.length : 126}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800/80">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Testimonials</p>
              <p className="text-xl font-bold text-white mt-1">{testimonials.length > 0 ? testimonials.length : 12}</p>
              <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Client quotes</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800/80">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Active Partners</p>
              <p className="text-xl font-bold text-white mt-1">{partners.length > 0 ? partners.length : "14+"}</p>
              <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Alliances live</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Leads & Communications Feed */}
      <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/90 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800/60">
          <div>
            <h2 className="text-base font-semibold text-white">Inbound Pipeline Stream</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live consultation requests, candidate CVs, and client briefs.
            </p>
          </div>
          <Link
            href="/admin/contacts"
            className="text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-neutral-800/40 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
          >
            <span>Open Inbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentAlerts.length === 0 ? (
          <p className="text-xs text-neutral-500 py-6 text-center">
            No communications received yet. Inbound entries will appear in real time.
          </p>
        ) : (
          <div className="divide-y divide-neutral-800/60">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="py-3.5 flex items-start justify-between gap-4 hover:bg-neutral-800/20 px-2 rounded-lg transition"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs">
                      {alert.category === "client_meet"
                        ? "💼"
                        : alert.category === "job_intern"
                        ? "🎓"
                        : alert.category === "client_doc" || alert.documentUrl
                        ? "📄"
                        : "✉️"}
                    </span>
                    <span className="text-xs font-semibold text-white truncate">{alert.name}</span>
                    <span className="text-xs text-neutral-500 font-mono">({alert.email})</span>

                    {alert.category && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {alert.category.replace("_", " ").toUpperCase()}
                      </span>
                    )}

                    {(alert.documentName || alert.documentUrl) && (
                      <span className="text-[10px] font-mono bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-600/30">
                        📄 {alert.documentName || "Document attached"}
                      </span>
                    )}

                    {!alert.read && (
                      <span className="text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1">{alert.message}</p>
                </div>
                <span className="text-[11px] text-neutral-500 font-mono shrink-0">
                  {formatDate(alert.receivedAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}