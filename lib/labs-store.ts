import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export interface LabInitiative {
  id: string;
  name: string;
  phase: string;
  status: string;
  category?: string;
  summary?: string;
  order?: number;
}

export interface LabProgram {
  id: string;
  title: string;
  desc: string;
  order?: number;
}

export interface LabsData {
  initiatives: LabInitiative[];
  programs: LabProgram[];
  domains: string[];
}

const LABS_FILE = "labs.json";

const DEFAULT_DATA: LabsData = {
  initiatives: [],
  programs: [],
  domains: [],
};

export function getLabsData(): LabsData {
  return readJSON<LabsData>(LABS_FILE, DEFAULT_DATA);
}

export function getLabInitiatives(): LabInitiative[] {
  const data = getLabsData();
  return (data.initiatives || []).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function saveLabInitiative(initiative: LabInitiative): void {
  const data = getLabsData();
  const list = data.initiatives || [];
  const idx = list.findIndex((i) => i.id === initiative.id);
  if (idx >= 0) {
    list[idx] = initiative;
  } else {
    list.push(initiative);
  }
  data.initiatives = list;
  writeJSON(LABS_FILE, data);
}

export function deleteLabInitiative(id: string): void {
  const data = getLabsData();
  data.initiatives = (data.initiatives || []).filter((i) => i.id !== id);
  writeJSON(LABS_FILE, data);
}

export function getLabPrograms(): LabProgram[] {
  const data = getLabsData();
  return (data.programs || []).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function saveLabProgram(prog: LabProgram): void {
  const data = getLabsData();
  const list = data.programs || [];
  const idx = list.findIndex((p) => p.id === prog.id);
  if (idx >= 0) {
    list[idx] = prog;
  } else {
    list.push(prog);
  }
  data.programs = list;
  writeJSON(LABS_FILE, data);
}

export function deleteLabProgram(id: string): void {
  const data = getLabsData();
  data.programs = (data.programs || []).filter((p) => p.id !== id);
  writeJSON(LABS_FILE, data);
}

export function getLabDomains(): string[] {
  const data = getLabsData();
  return data.domains || [];
}

export function saveLabDomains(domains: string[]): void {
  const data = getLabsData();
  data.domains = domains;
  writeJSON(LABS_FILE, data);
}
