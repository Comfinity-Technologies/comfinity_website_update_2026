import Link from "next/link";
import { FolderKanban, Plus, ExternalLink, Star } from "lucide-react";
import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { getProjects } from "./_helpers";
import { deleteProject } from "./_actions";

export default function ProjectsPage() {
  const projects = getProjects();
  const featured = projects.filter((p) => p.featured).length;

  return (
    <AdminModuleScaffold
      title="Projects & Case Studies"
      category="Showcase"
      description="Manage customer case studies, client portfolio items, architecture breakdowns, and featured tech stacks."
      icon={FolderKanban}
      liveUrl="/works"
      stats={[
        { label: "Total Case Studies", value: projects.length },
        { label: "Featured Work", value: featured, subtext: "Homepage showcase" },
        { label: "Storage", value: "projects.json", subtext: "Live atomic store" },
        { label: "Public Status", value: "Live on /works", subtext: "Instant revalidation" },
      ]}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Case Studies Portfolio</h3>
            <p className="text-xs text-neutral-500">
              Live case studies rendered with interactive filtering on /works
            </p>
          </div>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Case Study
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-xl bg-neutral-900/60 border border-neutral-800 p-4 hover:border-neutral-700 transition-colors"
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white truncate">{p.title}</h4>
                  {p.featured && (
                    <span className="flex items-center gap-1 text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded px-1.5 py-0.5">
                      <Star className="w-2.5 h-2.5 fill-amber-400" /> Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                  <span className="text-neutral-300">{p.client}</span>
                  <span className="text-neutral-700">·</span>
                  <span className="font-mono text-[11px] text-blue-400">{p.category}</span>
                  <span className="text-neutral-700">·</span>
                  <span className="text-neutral-500">{p.year}</span>
                </div>
                {p.tagline && (
                  <p className="text-xs text-neutral-500 truncate mt-1">{p.tagline}</p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-neutral-500 hover:text-white rounded hover:bg-neutral-800 transition"
                    title="Visit live project"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <Link
                  href={`/admin/projects/${p.id}`}
                  className="text-xs text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-lg px-3 py-1.5 transition"
                >
                  Edit
                </Link>
                <form action={deleteProject.bind(null, p.id)}>
                  <button
                    type="submit"
                    className="text-xs text-red-400 hover:text-red-300 border border-neutral-800 hover:border-red-500/30 rounded-lg px-3 py-1.5 transition"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminModuleScaffold>
  );
}