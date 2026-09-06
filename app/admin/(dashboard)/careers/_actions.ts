"use server"

import { revalidatePath } from "next/cache"
import { writeJSON } from "@/lib/data-store"

export async function saveCareersData(formData: FormData) {
  const lookingFor = String(formData.get("lookingFor") ?? "")
    .split("\n").map((s: string) => s.trim()).filter(Boolean)

  const offersRaw = String(formData.get("offers") ?? "")
  const offers = offersRaw.split("\n").map((line: string) => {
    const [t, ...rest] = line.split("|")
    return { t: t?.trim() ?? "", d: rest.join("|").trim() }
  }).filter((o: { t: string; d: string }) => o.t)

  const programsRaw = String(formData.get("studentPrograms") ?? "")
  const studentPrograms = programsRaw.split("\n").map((line: string) => {
    const [t, ...rest] = line.split("|")
    return { t: t?.trim() ?? "", d: rest.join("|").trim() }
  }).filter((o: { t: string; d: string }) => o.t)

  writeJSON("careers.json", { lookingFor, offers, studentPrograms })
  revalidatePath("/admin/careers")
  revalidatePath("/careers")
}