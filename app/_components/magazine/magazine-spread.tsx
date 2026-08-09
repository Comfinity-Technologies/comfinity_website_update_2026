import type { ReactNode } from 'react'

const SITE = 'comfinityindia.com'

type SectionLabelProps = {
  index: string
  title: string
  align?: 'left' | 'right'
}

/**
 * Shared section label used across all magazine pages:
 * "03 — WHY US" in brand cyan, small caps, wide tracking.
 */
export function SectionLabel({ index, title, align = 'left' }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-cyan ${
        align === 'right' ? 'justify-end' : 'justify-start'
      }`}
    >
      <span className="tabular-nums">{index}</span>
      <span aria-hidden className="text-brand-cyan/50">
        —
      </span>
      <span className="text-brand-navy/70">{title}</span>
    </div>
  )
}

type MagazinePageProps = {
  pageNumber: number
  children: ReactNode
  /** page number sits on the outer edge of an open spread */
  side?: 'left' | 'right'
}

/**
 * A single magazine page: consistent margins + footer
 * (page number on the outer edge, site URL on the inner edge).
 */
export function MagazinePage({ pageNumber, children, side = 'left' }: MagazinePageProps) {
  return (
    <div className="flex min-h-full flex-col bg-card px-8 py-10 sm:px-10 sm:py-12 lg:px-12">
      <div className="flex-1">{children}</div>

      <footer
        className={`mt-10 flex items-center justify-between border-t border-border pt-4 text-[11px] tracking-wide text-muted-foreground ${
          side === 'right' ? 'flex-row-reverse' : ''
        }`}
      >
        <span className="tabular-nums font-medium text-brand-navy/60">{pageNumber}</span>
        <span className="uppercase tracking-[0.18em]">{SITE}</span>
      </footer>
    </div>
  )
}

/**
 * Open-book wrapper that lays two MagazinePage children side by side
 * with a center gutter. All future spreads plug into this shell.
 */
export function MagazineSpread({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-brand-cream px-4 py-10 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-24px_rgba(30,39,97,0.35)]">
        <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
          {children}
        </div>
      </div>
    </main>
  )
}
