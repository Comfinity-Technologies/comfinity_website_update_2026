"use server";

import { Resend } from "resend";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const NOTIFY_EMAIL = "comfinityindia@gmail.com";

export async function sendDiscoveryRequest(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email, and what you are trying to build.",
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — discovery request not sent.");
    return {
      status: "error",
      message:
        "We couldn't send your request right now. Please email us directly at connect@comfinityindia.com.",
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Comfinity Website <onboarding@resend.dev>",
    to: [NOTIFY_EMAIL],
    replyTo: email,
    subject: `New discovery session request — ${name}`,
    text: [
      "New discovery session request from the Comfinity website.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization: ${organization || "—"}`,
      "",
      "What they are trying to build:",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      status: "error",
      message:
        "We couldn't send your request right now. Please email us directly at connect@comfinityindia.com.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you — your request is in. The founding team will reach out to schedule your session.",
  };
}
