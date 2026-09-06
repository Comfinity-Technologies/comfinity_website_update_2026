import { NextResponse } from "next/server";
import { appendSubmission, type SubmissionCategory } from "@/app/admin/(dashboard)/contacts/_helpers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      category,
      documentUrl,
      documentName,
      documentSize,
      roleOrLink,
      organization,
      message,
      secret,
    } = body;

    // Optional secret verification if provided in request
    if (process.env.NOTIFY_WEBHOOK_SECRET && secret !== process.env.NOTIFY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized webhook" }, { status: 401 });
    }

    if (!name || !message) {
      return NextResponse.json({ error: "name and message are required" }, { status: 400 });
    }

    const saved = appendSubmission({
      name,
      email: email || "system-alert@comfinity",
      category: (category as SubmissionCategory) || (documentUrl ? "client_doc" : "general"),
      documentUrl,
      documentName,
      documentSize,
      roleOrLink,
      organization,
      message,
    });

    return NextResponse.json({ success: true, id: saved.id });
  } catch (error) {
    console.error("Notify webhook error:", error);
    return NextResponse.json({ error: "Failed to process notification" }, { status: 500 });
  }
}