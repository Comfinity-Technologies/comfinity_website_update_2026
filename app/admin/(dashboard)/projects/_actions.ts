"use server"

import { revalidatePath } from "next/cache"
import { readJSON, writeJSON } from "@/lib/data-store"
import { projectsData, type Project } from "@/lib/worksData"
import { getProjects } from "./_helpers"

const FILE = "projects.json"

export async function saveProject(_prev: unknown, formData: FormData) {
  const id = String(formData.get("id") ?? "").trim()
  const isNew = !id

  const project: Project = {
    id: id || `proj_${Date.now()}`,
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    client: String(formData.get("client") ?? "").trim(),
    category: String(formData.get("category") ?? "") as Project["category"],
    tagline: String(formData.get("tagline") ?? "").trim(),
    metric: String(formData.get("metric") ?? "").trim(),
    metricLabel: String(formData.get("metricLabel") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    challenge: String(formData.get("challenge") ?? "").trim(),
    solution: String(formData.get("solution") ?? "").trim(),
    results: String(formData.get("results") ?? "")
      .split("\n").map((r: string) => r.trim()).filter(Boolean),
    technologies: String(formData.get("technologies") ?? "")
      .split(",").map((t: string) => t.trim()).filter(Boolean),
    year: String(formData.get("year") ?? new Date().getFullYear()),
    featured: formData.get("featured") === "on",
    liveUrl: String(formData.get("liveUrl") ?? "").trim() || undefined,
  }

  const projects = getProjects()
  if (isNew) {
    writeJSON(FILE, [project, ...projects])
  } else {
    const idx = projects.findIndex((p: Project) => p.id === id)
    if (idx >= 0) {
      const updated = [...projects]
      updated[idx] = project
      writeJSON(FILE, updated)
    } else {
      writeJSON(FILE, [project, ...projects])
    }
  }

  revalidatePath("/")
  revalidatePath("/admin/projects")
  revalidatePath("/works")
  return { success: true }
}

export async function deleteProject(id: string) {
  const projects = getProjects()
  writeJSON(FILE, projects.filter((p: Project) => p.id !== id))
  revalidatePath("/")
  revalidatePath("/admin/projects")
  revalidatePath("/works")
}