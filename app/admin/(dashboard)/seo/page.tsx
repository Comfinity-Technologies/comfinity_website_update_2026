import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Search, CheckCircle2, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function SeoAdmin() {
  return (
    <AdminModuleScaffold
      title="SEO & Metadata"
      category="System"
      description="Manage search engine indexing, OpenGraph preview cards, sitemap generation, and JSON-LD structured schemas."
      icon={Search}
      liveUrl="/sitemap.xml"
      stats={[
        { label: "Sitemap Status", value: "Generated", subtext: "/sitemap.xml dynamic" },
        { label: "Indexed Pages", value: "32 routes", subtext: "Clean canonical tags" },
        { label: "OG Card Images", value: "1200 x 630", subtext: "Social share ready" },
        { label: "Schema Markup", value: "Organization & WebSite", subtext: "JSON-LD active" },
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Dynamic XML Sitemap</h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Live
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Auto-generates sitemap entries with canonical URLs and modification timestamps for Google Search Console.
          </p>
          <div className="pt-2 flex items-center gap-2">
            <Link
              href="/sitemap.xml"
              target="_blank"
              className="text-xs text-neutral-300 hover:text-white border border-neutral-700 rounded-lg px-3 py-1.5 transition"
            >
              Inspect sitemap.xml ↗
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Social Graph (OpenGraph & Twitter)</h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Valid
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Standardized fallback meta tags, Twitter card summaries, and branded preview images across LinkedIn and X.
          </p>
          <div className="pt-2">
            <button className="text-xs text-neutral-300 hover:text-white border border-neutral-700 rounded-lg px-3 py-1.5 transition">
              Test Social Preview
            </button>
          </div>
        </div>
      </div>
    </AdminModuleScaffold>
  );
}
