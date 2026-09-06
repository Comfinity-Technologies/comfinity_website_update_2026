"use client"

import { useActionState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { saveProject } from "../_actions"
import { type Project } from "@/lib/worksData"

const CATEGORIES = [
  "AI & Automation",
  "Enterprise & Cloud",
  "IoT & Hardware",
  "HealthTech",
  "FinTech & E-Commerce",
  "Media & Streaming",
] as const

function Field({ label, name, defaultValue, type = "text", placeholder, required, textarea }: {
  label: string; name: string; defaultValue?: string; type?: string
  placeholder?: string; required?: boolean; textarea?: boolean
}) {
  const cls = "w-full rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition"
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-neutral-400">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      {textarea ? <textarea name={name} defaultValue={defaultValue} placeholder={placeholder} rows={4} required={required} className={cls} /> : <input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required={required} className={cls} />}
    </div>
  )
}

export default function ProjectEditPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const isNew = params.id === "new"
  const [state, action, pending] = useActionState(saveProject, undefined)

  useEffect(() => {
    if (isNew) { setLoading(false); return }
    fetch(`/api/admin/projects/${params.id}`).then(r => r.json()).then(data => { setProject(data); setLoading(false) }).catch(() => setLoading(false))
  }, [params.id, isNew])

  useEffect(() => { if (state?.success) router.push("/admin/projects") }, [state, router])

  if (loading) return <div className="p-8 text-sm text-neutral-500">Loading project...</div>

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">Admin / Projects</p>
        <h1 className="text-2xl font-semibold text-white">{isNew ? "New Project" : "Edit Project"}</h1>
      </div>
      <form action={action} className="space-y-5">
        <input type="hidden" name="id" value={isNew ? "" : project?.id ?? ""} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Title" name="title" defaultValue={project?.title} required />
          <Field label="Client" name="client" defaultValue={project?.client} required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Slug (URL)" name="slug" defaultValue={project?.slug} placeholder="my-project-slug" required />
          <div className="space-y-1">
            <label className="block text-xs font-medium text-neutral-400">Category <span className="text-red-400">*</span></label>
            <select name="category" defaultValue={project?.category} required className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-500 transition">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <Field label="Tagline" name="tagline" defaultValue={project?.tagline} placeholder="One-line pitch" required />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Field label="Metric" name="metric" defaultValue={project?.metric} placeholder="100K+" />
          <Field label="Metric Label" name="metricLabel" defaultValue={project?.metricLabel} placeholder="Active Users" />
          <Field label="Year" name="year" defaultValue={project?.year ?? String(new Date().getFullYear())} />
        </div>
        <Field label="Image Path" name="image" defaultValue={project?.image} placeholder="/works/project-name.png" />
        <Field label="Live URL" name="liveUrl" defaultValue={project?.liveUrl} placeholder="https://example.com" type="url" />
        <Field label="Summary" name="summary" defaultValue={project?.summary} textarea required />
        <Field label="Challenge" name="challenge" defaultValue={project?.challenge} textarea />
        <Field label="Solution" name="solution" defaultValue={project?.solution} textarea />
        <Field label="Results (one per line)" name="results" defaultValue={project?.results?.join("\n")} textarea />
        <Field label="Technologies (comma-separated)" name="technologies" defaultValue={project?.technologies?.join(", ")} placeholder="Next.js, Node.js, AWS" />
        <div className="flex items-center gap-3 pt-1">
          <input id="featured" name="featured" type="checkbox" defaultChecked={project?.featured} className="w-4 h-4 accent-white" />
          <label htmlFor="featured" className="text-sm text-neutral-300">Featured project (shown on homepage)</label>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
          <button type="submit" disabled={pending} className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition disabled:opacity-50">{pending ? "Saving..." : "Save Project"}</button>
          <button type="button" onClick={() => router.push("/admin/projects")} className="text-sm text-neutral-500 hover:text-white transition">Cancel</button>
        </div>
      </form>
    </div>
  )
}