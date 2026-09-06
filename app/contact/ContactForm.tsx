"use client";

import { useActionState, useState } from "react";
import {
  sendDiscoveryRequest,
  type ContactFormState,
} from "@/app/actions/contact";

const initialState: ContactFormState = { status: "idle", message: "" };

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-5 py-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent/60 text-foreground";

const CATEGORIES = [
  { id: "client_meet", label: "💼 Client Consultation", desc: "Project scoping & discovery meet" },
  { id: "client_doc", label: "📄 Send Project Document", desc: "Share RFP, brief, or specs" },
  { id: "job_intern", label: "🎓 Career / Internship", desc: "Student programs & job roles" },
  { id: "general", label: "✉️ General Inquiry", desc: "Partnerships & questions" },
] as const;

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendDiscoveryRequest,
    initialState
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("client_meet");
  const [fileName, setFileName] = useState<string>("");

  if (state.status === "success") {
    return (
      <div className="glass mt-10 max-w-xl rounded-2xl p-8 border border-green-500/30 bg-green-950/20">
        <p className="font-mono text-[10px] tracking-[0.25em] text-green-400">
          RECEIVED IN OUR ADMIN PANEL
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-10 max-w-xl space-y-4">
      {/* Category selector */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
          What are you contacting us for?
        </label>
        <input type="hidden" name="category" value={selectedCategory} />
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-left p-3 rounded-xl border transition-all text-xs ${
                selectedCategory === cat.id
                  ? "border-accent/80 bg-accent/10 text-foreground font-medium"
                  : "border-line bg-surface/60 text-muted hover:border-accent/40"
              }`}
            >
              <p className="font-medium text-foreground">{cat.label}</p>
              <p className="text-[11px] text-muted mt-0.5">{cat.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className={inputClass}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email address"
          className={inputClass}
        />
      </div>

      <input
        type="text"
        name="organization"
        placeholder="Company / University / Organization (optional)"
        className={inputClass}
      />

      {/* Target role field for job/intern */}
      {selectedCategory === "job_intern" && (
        <input
          type="text"
          name="roleOrLink"
          placeholder="Target Role / Portfolio / LinkedIn URL"
          className={inputClass}
        />
      )}

      {/* Document attachment field */}
      <div className="rounded-xl border border-line bg-surface/80 p-4">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-medium text-foreground flex items-center gap-1.5">
            <span>📎</span>
            <span>
              {selectedCategory === "client_doc"
                ? "Attach Project Document / RFP (Required or Recommended)"
                : selectedCategory === "job_intern"
                ? "Attach Resume / Portfolio (PDF or DOCX)"
                : "Attach Project Brief or File (Optional)"}
            </span>
          </label>
          {fileName && (
            <button
              type="button"
              onClick={() => setFileName("")}
              className="text-[11px] text-muted hover:text-red-400"
            >
              Remove
            </button>
          )}
        </div>

        <input
          type="file"
          name="document"
          accept=".pdf,.doc,.docx,.pptx,.xlsx,.csv,.zip,.png,.jpg,.jpeg,.svg"
          onChange={(e) => {
            const f = e.target.files?.[0];
            setFileName(f ? f.name : "");
          }}
          className="block w-full text-xs text-muted file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-surface file:text-foreground file:border-line file:border hover:file:border-accent/60 cursor-pointer"
        />
        <p className="text-[10px] text-muted mt-1.5">
          Supports PDF, Word, Excel, PowerPoint, ZIP, or Image files.
        </p>
      </div>

      <textarea
        rows={4}
        name="message"
        required
        placeholder={
          selectedCategory === "client_doc"
            ? "Briefly tell us about this document, project scope, deadlines, or technical requirements..."
            : selectedCategory === "client_meet"
            ? "What are you trying to build? Describe your product concept or preferred consultation time."
            : selectedCategory === "job_intern"
            ? "Tell us about your background, what you have built, and why you want to join Comfinity."
            : "How can we help you?"
        }
        className={`${inputClass} resize-none`}
      />

      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
        {pending
          ? "Sending…"
          : selectedCategory === "client_doc"
          ? "Send Document & Inquire"
          : selectedCategory === "client_meet"
          ? "Book Consultation Session"
          : selectedCategory === "job_intern"
          ? "Submit Application"
          : "Send Inquiry"}{" "}
        <span aria-hidden>→</span>
      </button>

      {state.status === "error" && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}
    </form>
  );
}