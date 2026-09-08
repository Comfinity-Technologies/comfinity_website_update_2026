"use server";

import { revalidatePath } from "next/cache";
import {
  readCareers,
  saveCareers,
  saveJobOpening,
  deleteJobOpening,
  JobOpening,
} from "./_helpers";

export async function saveCareersData(formData: FormData) {
  const current = readCareers();

  const lookingFor = String(formData.get("lookingFor") ?? "")
    .split("\n")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const offersRaw = String(formData.get("offers") ?? "");
  const offers = offersRaw
    .split("\n")
    .map((line: string) => {
      const [t, ...rest] = line.split("|");
      return { t: t?.trim() ?? "", d: rest.join("|").trim() };
    })
    .filter((o: { t: string; d: string }) => o.t);

  const programsRaw = String(formData.get("studentPrograms") ?? "");
  const studentPrograms = programsRaw
    .split("\n")
    .map((line: string) => {
      const [t, ...rest] = line.split("|");
      return { t: t?.trim() ?? "", d: rest.join("|").trim() };
    })
    .filter((o: { t: string; d: string }) => o.t);

  saveCareers({
    openings: current.openings || [],
    lookingFor,
    offers,
    studentPrograms,
  });

  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  return { success: true };
}

export async function saveJobOpeningAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim() || `job-${Date.now()}`;
  const title = (formData.get("title") as string)?.trim() || "New Role";
  const department = (formData.get("department") as string)?.trim() || "Engineering";
  const location = (formData.get("location") as string)?.trim() || "Remote";
  const type = (formData.get("type") as string)?.trim() || "Full-time";
  const experience = (formData.get("experience") as string)?.trim() || "Entry";
  const description = (formData.get("description") as string)?.trim() || "";
  const reqsRaw = (formData.get("requirements") as string) || "";
  const requirements = reqsRaw
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);
  const status = (formData.get("status") as "Active" | "Draft" | "Closed") || "Active";
  const order = parseInt(formData.get("order") as string, 10) || 1;

  const job: JobOpening = {
    id,
    title,
    department,
    location,
    type,
    experience,
    description,
    requirements,
    status,
    order,
  };

  saveJobOpening(job);
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  return { success: true };
}

export async function deleteJobOpeningAction(id: string) {
  deleteJobOpening(id);
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  return { success: true };
}