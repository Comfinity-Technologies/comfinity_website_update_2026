import "server-only";
import { readJSON, writeJSON } from "@/lib/data-store";

export type SubmissionCategory = "client_meet" | "job_intern" | "client_doc" | "general";

export interface ContactSubmission {
  id: string;
  category: SubmissionCategory;
  name: string;
  email: string;
  organization?: string;
  subject?: string;
  documentUrl?: string;    // URL to client document (PDF, Word, Zip, Image)
  documentName?: string;   // Original filename (e.g. Project_Brief.pdf)
  documentSize?: string;   // Formatted file size (e.g. 2.4 MB)
  roleOrLink?: string;     // Candidate role / portfolio link
  message: string;
  receivedAt: string;
  read: boolean;
  externalMessageId?: string;
  source?: "website" | "gmail_imap" | "manual";
}

const FILE = "contact-submissions.json";

export function detectCategory(text: string, hasDoc = false): SubmissionCategory {
  if (hasDoc) return "client_doc";
  const lower = text.toLowerCase();
  if (
    lower.includes("doc") ||
    lower.includes("pdf") ||
    lower.includes("brief") ||
    lower.includes("rfp") ||
    lower.includes("spec") ||
    lower.includes("proposal") ||
    lower.includes("scope") ||
    lower.includes("blueprint") ||
    lower.includes("requirements")
  ) {
    return "client_doc";
  }
  if (
    lower.includes("intern") ||
    lower.includes("career") ||
    lower.includes("job") ||
    lower.includes("resume") ||
    lower.includes("cv") ||
    lower.includes("hiring") ||
    lower.includes("apply") ||
    lower.includes("fellowship") ||
    lower.includes("ambassador")
  ) {
    return "job_intern";
  }
  if (
    lower.includes("meet") ||
    lower.includes("consult") ||
    lower.includes("discovery") ||
    lower.includes("schedule") ||
    lower.includes("client") ||
    lower.includes("project") ||
    lower.includes("build") ||
    lower.includes("partnership") ||
    lower.includes("quote")
  ) {
    return "client_meet";
  }
  return "general";
}

export function appendSubmission(
  data: Omit<ContactSubmission, "id" | "receivedAt" | "read" | "category"> & {
    category?: SubmissionCategory;
  }
): ContactSubmission {
  const submissions = readJSON<ContactSubmission[]>(FILE, []);

  const hasDoc = Boolean(data.documentUrl);
  const fullText = `${data.name} ${data.organization || ""} ${data.subject || ""} ${data.message} ${data.documentName || ""} ${data.roleOrLink || ""}`;
  const category = data.category || detectCategory(fullText, hasDoc);

  const newEntry: ContactSubmission = {
    ...data,
    category,
    id: `sub_${Date.now()}`,
    receivedAt: new Date().toISOString(),
    read: false,
  };

  submissions.unshift(newEntry);
  writeJSON(FILE, submissions);
  return newEntry;
}

export function readSubmissions(): ContactSubmission[] {
  const raw = readJSON<ContactSubmission[]>(FILE, []);
  return raw.map((s) => ({
    ...s,
    category: s.category || detectCategory(`${s.name} ${s.organization || ""} ${s.message}`, Boolean(s.documentUrl)),
  }));
}