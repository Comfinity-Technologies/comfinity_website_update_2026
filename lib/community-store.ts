import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export interface CommunityProgram {
  id: string;
  title: string;
  desc: string;
  items?: string[];
  order?: number;
}

export interface CommunityData {
  programs: CommunityProgram[];
  values: string[];
}

const COMMUNITY_FILE = "community.json";

const DEFAULT_DATA: CommunityData = {
  programs: [],
  values: [],
};

export function getCommunityData(): CommunityData {
  return readJSON<CommunityData>(COMMUNITY_FILE, DEFAULT_DATA);
}

export function getCommunityPrograms(): CommunityProgram[] {
  const data = getCommunityData();
  return (data.programs || []).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function saveCommunityProgram(prog: CommunityProgram): void {
  const data = getCommunityData();
  const list = data.programs || [];
  const idx = list.findIndex((p) => p.id === prog.id);
  if (idx >= 0) {
    list[idx] = prog;
  } else {
    list.push(prog);
  }
  data.programs = list;
  writeJSON(COMMUNITY_FILE, data);
}

export function deleteCommunityProgram(id: string): void {
  const data = getCommunityData();
  data.programs = (data.programs || []).filter((p) => p.id !== id);
  writeJSON(COMMUNITY_FILE, data);
}

export function getCommunityValues(): string[] {
  const data = getCommunityData();
  return data.values || [];
}

export function saveCommunityValues(values: string[]): void {
  const data = getCommunityData();
  data.values = values;
  writeJSON(COMMUNITY_FILE, data);
}
