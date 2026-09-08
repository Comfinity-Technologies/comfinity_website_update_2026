import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export interface GlobalSettings {
  announcement: {
    enabled: boolean;
    badge: string;
    text: string;
    link: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    consultationLink: string;
  };
  social: {
    linkedin: string;
    twitter: string;
    github: string;
    youtube: string;
    instagram: string;
  };
  branding: {
    companyName: string;
    tagline: string;
    copyrightText: string;
  };
}

const GLOBAL_FILE = "global-settings.json";

const DEFAULT_SETTINGS: GlobalSettings = {
  announcement: {
    enabled: true,
    badge: "Summit 2026",
    text: "Join Comfinity at the ASEAN Innovation Summit in Singapore — Oct 2026",
    link: "/partners",
  },
  contact: {
    email: "contact@comfinity.co",
    phone: "+91 (0) 80 0000 0000",
    address: "Comfinity Technologies Private Limited, Bengaluru / ASEAN Hub",
    consultationLink: "/contact",
  },
  social: {
    linkedin: "https://linkedin.com/company/comfinity",
    twitter: "https://x.com/comfinity",
    github: "https://github.com/Comfinity-Technologies",
    youtube: "https://youtube.com/@comfinity",
    instagram: "https://instagram.com/comfinity",
  },
  branding: {
    companyName: "Comfinity Technologies",
    tagline: "Technology & Innovation Group — Building the Future Through Technology, Research, and Community.",
    copyrightText: "Comfinity Technologies Private Limited. All rights reserved.",
  },
};

export function getGlobalSettings(): GlobalSettings {
  return readJSON<GlobalSettings>(GLOBAL_FILE, DEFAULT_SETTINGS);
}

export function saveGlobalSettings(settings: GlobalSettings): void {
  writeJSON(GLOBAL_FILE, settings);
}
