import React from 'react'

export function EditorsNote({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 text-[12px] leading-relaxed text-navy/80 shadow-xs">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
        {label}
      </p>
      <p>{body}</p>
    </div>
  )
}
