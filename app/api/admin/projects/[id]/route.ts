import { NextResponse } from "next/server"
import { getProjects } from "@/app/admin/(dashboard)/projects/_helpers"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const projects = getProjects()
  const project = projects.find(p => p.id === id)
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(project)
}