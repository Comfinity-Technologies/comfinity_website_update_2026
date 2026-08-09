import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MagazineSpreadProps {
  left: ReactNode
  right: ReactNode
  className?: string
}

/**
 * Two-page book spread. Renders both pages side by side on desktop with a
 * subtle center gutter/spine, and stacks them on small screens.
 */
export function MagazineSpread({ left, right, className }: MagazineSpreadProps) {
  return (
    <div
      className={cn(
        'relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-lg border border-border bg-card',
        'grid-cols-1 lg:grid-cols-2',
        className,
      )}
    >
      {/* Left page */}
      <div className="relative border-b border-border lg:border-b-0 lg:border-r">{left}</div>

      {/* Right page */}
      <div className="relative">{right}</div>

      {/* Center gutter shadow — visible only on the two-page desktop layout */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-16 -translate-x-1/2 lg:block"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(30,39,97,0.06) 45%, rgba(30,39,97,0.10) 50%, rgba(30,39,97,0.06) 55%, transparent 100%)',
        }}
      />
    </div>
  )
}
