import Link from "next/link"
import { getProjects } from "./_helpers"
import { deleteProject } from "./_actions"

export default function ProjectsPage() {
  const projects = getProjects()

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">Admin / Projects</p>
          <h1 className="text-2xl font-semibold text-white">Portfolio Projects</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {projects.length} projects · {projects.filter((p) => p.featured).length} featured
          </p>
        </div>
        <Link href="/admin/projects/new" className="text-sm bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-neutral-100 transition">+ Add Project</Link>
      </div>

      <div className="space-y-2">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-xl bg-neutral-900 border border-neutral-800 px-5 py-4 hover:border-neutral-700 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-white truncate">{p.title}</p>
                {p.featured && <span className="text-[10px] bg-amber-500/20 text-amber-400 rounded px-1.5 py-0.5">Featured</span>}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <p className="text-xs text-neutral-500">{p.client}</p>
                <span className="text-neutral-700">·</span>
                <p className="text-xs text-neutral-500">{p.category}</p>
                <span className="text-neutral-700">·</span>
                <p className="text-xs text-neutral-500">{p.year}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-600 hover:text-blue-400 transition">↗</a>}
              <Link href={`/admin/projects/${p.id}`} className="text-xs text-neutral-500 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-lg px-3 py-1.5 transition">Edit</Link>
              <form action={deleteProject.bind(null, p.id)}>
                <button type="submit" className="text-xs text-neutral-600 hover:text-red-400 border border-neutral-800 hover:border-red-500/30 rounded-lg px-3 py-1.5 transition">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}