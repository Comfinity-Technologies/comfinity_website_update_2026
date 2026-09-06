"use server";

import { Resend } from "resend";
import { appendSubmission, type SubmissionCategory } from "@/app/admin/(dashboard)/contacts/_helpers";
import fs from "fs";
import path from "path";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const NOTIFY_EMAIL = "comfinityindia@gmail.com";

const CATEGORY_LABELS: Record<SubmissionCategory, string> = {
  client_meet: "Client Consultation / Meet",
  job_intern: "Career / Internship Application",
  client_doc: "Client Document / Project Brief",
  general: "General Inquiry",
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function sendDiscoveryRequest(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  let category = (formData.get("category") as SubmissionCategory) || undefined;
  const roleOrLink = String(formData.get("roleOrLink") ?? "").trim() || undefined;

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email, and message details.",
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }

  // Handle Client Document Attachment (PDF, DOCX, ZIP, Image, etc.)
  let documentUrl: string | undefined = undefined;
  let documentName: string | undefined = undefined;
  let documentSize: string | undefined = undefined;

  const file = formData.get("document") as File | null;
  if (file && file.size > 0 && file.name) {
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
      const uniqueName = `${Date.now()}_${cleanName}`;

      const docsDir = path.join(process.cwd(), "public", "uploads", "docs");
      if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir, { recursive: true });
      }

      fs.writeFileSync(path.join(docsDir, uniqueName), buffer);

      documentUrl = `/uploads/docs/${uniqueName}`;
      documentName = file.name;
      documentSize = formatFileSize(file.size);

      // If document was attached and no category set, mark as client_doc
      if (!category) {
        category = "client_doc";
      }
    } catch (uploadErr) {
      console.error("Could not save attached client document:", uploadErr);
    }
  }

  const categoryLabel = category ? CATEGORY_LABELS[category] : "Client Inquiry";
  const emailSubject = documentName
    ? `[${categoryLabel}] New document from ${name} (${documentName})`
    : `[${categoryLabel}] New inquiry — ${name}`;

  // Persist submission to admin panel inbox
  try {
    appendSubmission({
      category,
      name,
      email,
      organization: organization || undefined,
      documentUrl,
      documentName,
      documentSize,
      roleOrLink,
      message,
    });
  } catch (e) {
    console.error("Could not save submission to disk:", e);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set — submission saved to admin panel inbox.");
    return {
      status: "success",
      message: documentName
        ? `Thank you! Your document "${documentName}" and message have been received by the team.`
        : "Thank you — your inquiry has been received! Our team will review it and reach out shortly.",
    };
  }

  const resend = new Resend(apiKey);
  const emailLines = [
    `New submission received on Comfinity website (${categoryLabel})`,
    "",
    `Category: ${categoryLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization || "—"}`,
  ];

  if (documentName && documentUrl) {
    emailLines.push(
      `Attached Document: ${documentName} (${documentSize || ""})`,
      `File URL: ${documentUrl}`
    );
  }
  if (roleOrLink) emailLines.push(`Role / Portfolio Link: ${roleOrLink}`);

  emailLines.push("", "Message:", message);

  try {
    await resend.emails.send({
      from: "Comfinity Website <onboarding@resend.dev>",
      to: [NOTIFY_EMAIL],
      replyTo: email,
      subject: emailSubject,
      text: emailLines.join("\n"),
    });
  } catch (err) {
    console.error("Resend error:", err);
  }

  return {
    status: "success",
    message: documentName
      ? `Thank you! Your document "${documentName}" and message have been received by the team.`
      : "Thank you — your inquiry has been received! Our team will review it and reach out shortly.",
  };
}