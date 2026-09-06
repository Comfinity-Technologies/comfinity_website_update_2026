import "server-only"
import { readJSON } from "@/lib/data-store"
import { projectsData, type Project } from "@/lib/worksData"

const FILE = "projects.json"

export function getProjects(): Project[] {
  const overrides = readJSON<Project[]>(FILE, [])
  if (overrides.length > 0) return overrides
  return projectsData
}