"use client";

import { useActionState } from "react";
import {
  sendDiscoveryRequest,
  type ContactFormState,
} from "@/app/actions/contact";

const initialState: ContactFormState = { status: "idle", message: "" };

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-5 py-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent/60";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendDiscoveryRequest,
    initialState
  );

  if (state.status === "success") {
    return (
      <div className="glass mt-10 max-w-xl rounded-2xl p-8">
        <p className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
          REQUEST RECEIVED
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-10 max-w-xl space-y-4">
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
        placeholder="Organization (optional)"
        className={inputClass}
      />
      <textarea
        rows={5}
        name="message"
        required
        placeholder="What are you trying to build?"
        className={`${inputClass} resize-none`}
      />
      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
        {pending ? "Sending…" : "Book a Discovery Session"}{" "}
        <span aria-hidden>→</span>
      </button>
      {state.status === "error" && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}
    </form>
  );
}
