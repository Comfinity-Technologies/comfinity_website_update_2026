import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export interface PartnerItem {
  id: string;
  name: string;
  role: string;
  tier: string;
  href?: string;
  logoUrl?: string;
  logoDarkUrl?: string;
  status: "active" | "draft";
  order?: number;
}

export interface PartnershipType {
  id: string;
  title: string;
  desc: string;
  items: string[];
  order?: number;
}

export interface SponsorshipItem {
  id: string;
  title: string;
  desc: string;
  order?: number;
}

export interface PartnersData {
  partners: PartnerItem[];
  types: PartnershipType[];
  sponsorships: SponsorshipItem[];
}

const PARTNERS_FILE = "partners.json";

const DEFAULT_DATA: PartnersData = {
  partners: [],
  types: [],
  sponsorships: [],
};

export function getPartnersData(): PartnersData {
  return readJSON<PartnersData>(PARTNERS_FILE, DEFAULT_DATA);
}

export function getPartners(): PartnerItem[] {
  const data = getPartnersData();
  return (data.partners || []).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function savePartner(partner: PartnerItem): void {
  const data = getPartnersData();
  const list = data.partners || [];
  const idx = list.findIndex((p) => p.id === partner.id);
  if (idx >= 0) {
    list[idx] = partner;
  } else {
    list.push(partner);
  }
  data.partners = list;
  writeJSON(PARTNERS_FILE, data);
}

export function deletePartner(id: string): void {
  const data = getPartnersData();
  data.partners = (data.partners || []).filter((p) => p.id !== id);
  writeJSON(PARTNERS_FILE, data);
}

export function getPartnershipTypes(): PartnershipType[] {
  const data = getPartnersData();
  return (data.types || []).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function savePartnershipType(item: PartnershipType): void {
  const data = getPartnersData();
  const list = data.types || [];
  const idx = list.findIndex((t) => t.id === item.id);
  if (idx >= 0) {
    list[idx] = item;
  } else {
    list.push(item);
  }
  data.types = list;
  writeJSON(PARTNERS_FILE, data);
}

export function deletePartnershipType(id: string): void {
  const data = getPartnersData();
  data.types = (data.types || []).filter((t) => t.id !== id);
  writeJSON(PARTNERS_FILE, data);
}

export function getSponsorships(): SponsorshipItem[] {
  const data = getPartnersData();
  return (data.sponsorships || []).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function saveSponsorship(item: SponsorshipItem): void {
  const data = getPartnersData();
  const list = data.sponsorships || [];
  const idx = list.findIndex((s) => s.id === item.id);
  if (idx >= 0) {
    list[idx] = item;
  } else {
    list.push(item);
  }
  data.sponsorships = list;
  writeJSON(PARTNERS_FILE, data);
}

export function deleteSponsorship(id: string): void {
  const data = getPartnersData();
  data.sponsorships = (data.sponsorships || []).filter((s) => s.id !== id);
  writeJSON(PARTNERS_FILE, data);
}
