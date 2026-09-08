import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export interface Leader {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  quote: string;
  portraitUrl?: string;
  linkedin?: string;
  email?: string;
  order?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio?: string;
  photoUrl?: string;
  order?: number;
}

export interface TeamData {
  leadership: Leader[];
  advisors: any[];
  team: TeamMember[];
}

const FILE = "team.json";

export function getTeamData(): TeamData {
  return readJSON<TeamData>(FILE, {
    leadership: [],
    advisors: [],
    team: [],
  });
}

export function getLeadership(): Leader[] {
  const data = getTeamData();
  return data.leadership.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function saveLeader(leader: Leader): void {
  const data = getTeamData();
  const idx = data.leadership.findIndex((l) => l.id === leader.id);
  if (idx >= 0) {
    data.leadership[idx] = leader;
  } else {
    data.leadership.push(leader);
  }
  writeJSON(FILE, data);
}

export function deleteLeader(id: string): void {
  const data = getTeamData();
  data.leadership = data.leadership.filter((l) => l.id !== id);
  writeJSON(FILE, data);
}
