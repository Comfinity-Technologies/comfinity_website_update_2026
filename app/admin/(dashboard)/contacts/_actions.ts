"use server";

import { revalidatePath } from "next/cache";
import { readJSON, writeJSON } from "@/lib/data-store";
import { readSubmissions, appendSubmission, type SubmissionCategory } from "./_helpers";
import { syncImapInbox, purgeSpamSubmissions, type ImapSyncResult } from "@/lib/imap-sync";

const FILE = "contact-submissions.json";

export async function markRead(id: string) {
  const submissions = readSubmissions();
  const updated = submissions.map((s) => (s.id === id ? { ...s, read: true } : s));
  writeJSON(FILE, updated);
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function markUnread(id: string) {
  const submissions = readSubmissions();
  const updated = submissions.map((s) => (s.id === id ? { ...s, read: false } : s));
  writeJSON(FILE, updated);
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function deleteSubmission(id: string) {
  const submissions = readSubmissions();
  writeJSON(FILE, submissions.filter((s) => s.id !== id));
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function logManualNotificationAction(formData: FormData) {
  const category = (formData.get("category") as SubmissionCategory) || "client_doc";
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim() || undefined;
  const documentName = String(formData.get("documentName") ?? "").trim() || undefined;
  const documentUrl = String(formData.get("documentUrl") ?? "").trim() || undefined;
  const roleOrLink = String(formData.get("roleOrLink") ?? "").trim() || undefined;
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !message) {
    throw new Error("Name and message are required.");
  }

  appendSubmission({
    category,
    name,
    email: email || "client-file@internal",
    organization,
    documentName,
    documentUrl,
    roleOrLink,
    message,
  });

  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function syncRealMailboxAction(): Promise<ImapSyncResult> {
  const result = await syncImapInbox();
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
  return result;
}

export async function purgeSpamAction() {
  const res = purgeSpamSubmissions();
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
  return res;
}