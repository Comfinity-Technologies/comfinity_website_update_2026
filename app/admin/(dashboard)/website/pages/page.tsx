import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

const SITE_PAGES = [
  { path: "/", name: "Homepage", template: "Standard", status: "Published", updated: "Recently" },
  { path: "/products", name: "Products Showcase", template: "Catalog & Roadmap", status: "Published", updated: "Recently" },
  { path: "/about", name: "About Us", template: "Corporate", status: "Published", updated: "Recently" },
  { path: "/about/divisions", name: "Divisions", template: "Directory", status: "Published", updated: "Recently" },
  { path: "/about/leadership", name: "Leadership", template: "Team Grid", status: "Published", updated: "Recently" },
  { path: "/about/mission", name: "Mission & Values", template: "Manifesto", status: "Published", updated: "Recently" },
  { path: "/solutions", name: "Solutions", template: "Product Grid", status: "Published", updated: "Recently" },
  { path: "/works", name: "Case Studies / Works", template: "Portfolio", status: "Published", updated: "Recently" },
  { path: "/labs", name: "Comfinity Labs", template: "Research", status: "Published", updated: "Recently" },
  { path: "/community", name: "Community Hub", template: "Social", status: "Published", updated: "Recently" },
  { path: "/careers", name: "Careers & Openings", template: "Listings", status: "Published", updated: "Recently" },
  { path: "/partners", name: "Partners", template: "Network", status: "Published", updated: "Recently" },
  { path: "/contact", name: "Contact & Inquiries", template: "Form", status: "Published", updated: "Recently" },
];

export default function WebsitePagesAdmin() {
  return (
    <AdminModuleScaffold
      title="Pages"
      category="Website"
      description="Manage and inspect public pages across the Comfinity web architecture."
      icon={FileText}
      liveUrl="/"
      stats={[
        { label: "Total Pages", value: SITE_PAGES.length },
        { label: "Indexable Pages", value: SITE_PAGES.length, subtext: "All sitemap included" },
        { label: "Drafts", value: 0, subtext: "Live on CDN" },
        { label: "Framework", value: "Next.js 16", subtext: "App Router" },
      ]}
    >
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Registered Website Routes</h3>
          <span className="text-xs text-neutral-500 font-mono">{SITE_PAGES.length} routes active</span>
        </div>
        <div className="divide-y divide-neutral-800/60">
          {SITE_PAGES.map((page) => (
            <div key={page.path} className="px-5 py-3.5 flex items-center justify-between hover:bg-neutral-800/30 transition">
              <div>
                <p className="text-sm font-medium text-white">{page.name}</p>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">{page.path}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {page.status}
                </span>
                <Link
                  href={page.path}
                  target="_blank"
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminModuleScaffold>
  );
}
