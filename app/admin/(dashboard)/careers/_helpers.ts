import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements?: string[];
  status: "Active" | "Draft" | "Closed";
  order?: number;
}

export interface CareersData {
  openings?: JobOpening[];
  lookingFor: string[];
  offers: { t: string; d: string }[];
  studentPrograms: { t: string; d: string }[];
}

export const CAREERS_DEFAULT: CareersData = {
  openings: [],
  lookingFor: [
    "People who are curious before they are skilled",
    "Builders who finish what they start",
    "Thinkers who challenge assumptions respectfully",
    "Humans who care about impact, not just output",
    "People who are honest — even when it is uncomfortable",
  ],
  offers: [
    { t: "Mission-Driven Work", d: "Every project you work on connects to a larger purpose" },
    { t: "Learning Infrastructure", d: "Access to research, courses, mentorship, and the Labs ecosystem" },
    { t: "Ownership", d: "Real ownership of your work — not tickets in a queue" },
    { t: "Diverse Domains", d: "Work across AI, hardware, research, community, and product" },
    { t: "Culture of Honesty", d: "A team that gives real feedback and receives it with grace" },
    { t: "Long-term Thinking", d: "We are building for decades — not the next funding round" },
  ],
  studentPrograms: [
    { t: "Technology Internship", d: "3-6 month program in AI, software, or hardware engineering" },
    { t: "Research Internship", d: "Participate in Labs research programs alongside experienced researchers" },
    { t: "Student Ambassador", d: "Represent Comfinity at your university — gain network, experience, and recognition" },
    { t: "Innovation Fellowship (Student Track)", d: "Dedicate focused time to a high-potential project within the Labs" },
  ],
};

const CAREERS_FILE = "careers.json";

export function readCareers(): CareersData {
  const data = readJSON<CareersData>(CAREERS_FILE, CAREERS_DEFAULT);
  if (!data.openings) data.openings = [];
  return data;
}

export function saveCareers(data: CareersData): void {
  writeJSON(CAREERS_FILE, data);
}

export function getJobOpenings(): JobOpening[] {
  const data = readCareers();
  return (data.openings || []).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function saveJobOpening(job: JobOpening): void {
  const data = readCareers();
  const list = data.openings || [];
  const idx = list.findIndex((j) => j.id === job.id);
  if (idx >= 0) {
    list[idx] = job;
  } else {
    list.push(job);
  }
  data.openings = list;
  saveCareers(data);
}

export function deleteJobOpening(id: string): void {
  const data = readCareers();
  data.openings = (data.openings || []).filter((j) => j.id !== id);
  saveCareers(data);
}