import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  body: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

export interface AnnouncementSection {
  enabled: boolean;
  label: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HomepageSections {
  hero: HeroSlide[];
  stats: StatItem[];
  announcement: AnnouncementSection;
}

const FILE = "homepage-sections.json";

export function getHomepageSections(): HomepageSections {
  return readJSON<HomepageSections>(FILE, {
    hero: [],
    stats: [],
    announcement: {
      enabled: true,
      label: "",
      heading: "",
      description: "",
      ctaLabel: "",
      ctaHref: "",
    },
  });
}

export function saveHomepageSections(data: HomepageSections): void {
  writeJSON(FILE, data);
}
