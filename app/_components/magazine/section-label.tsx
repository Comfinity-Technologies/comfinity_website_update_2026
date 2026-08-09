type SectionLabelProps = {
  number: string
  title: string
  align?: 'left' | 'right'
}

/**
 * Shared section label used across magazine pages:
 * "01 — WHO WE ARE" in brand cyan & navy, small caps, wide tracking.
 */
export function SectionLabel({ number, title, align = 'left' }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan ${
        align === 'right' ? 'justify-end' : 'justify-start'
      }`}
    >
      <span className="tabular-nums text-navy">{number}</span>
      <span aria-hidden className="text-cyan/50">
        —
      </span>
      <span className="text-navy/70">{title}</span>
    </div>
  )
}
