import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SectionLabel } from './section-label'

const SITE = 'comfinityindia.com'

interface MagazinePageProps {
  /** Section number, e.g. "01" */
  sectionNumber: string
  /** Section name, e.g. "WHO WE ARE" */
  sectionTitle: string
  /** Printed page number */
  pageNumber: number
  /** Which edge this page sits on within a spread */
  side?: 'left' | 'right'
  children: ReactNode
  className?: string
}

/**
 * Shared page shell: consistent margins, top running head (section label +
 * short "kicker"), and the footer with page number + comfinityindia.com.
 * Every magazine page plugs into this instead of rebuilding the shell.
 */
export function MagazinePage({
  sectionNumber,
  sectionTitle,
  pageNumber,
  side = 'left',
  children,
  className,
}: MagazinePageProps) {
  const isLeft = side === 'left'

  return (
    <div
      className={cn(
        'relative flex h-full flex-col bg-card px-8 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-12',
        className,
      )}
    >
      {/* Soft paper vignette — warms the surface so it never reads flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.55) 0%, transparent 55%), radial-gradient(120% 80% at 50% 100%, rgba(30,39,97,0.035) 0%, transparent 50%)',
        }}
      />

      {/* Running head */}
      <header
        className={cn(
          'mb-5 sm:mb-6 flex items-center',
          isLeft ? 'justify-between' : 'flex-row-reverse justify-between',
        )}
      >
        <SectionLabel number={sectionNumber} title={sectionTitle} align={isLeft ? 'left' : 'right'} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-navy/35">
          {sectionTitle}
        </span>
      </header>

      {/* Page body — flex column so pages can drop in a `flex-1` spacer to
          balance leftover vertical space (see EditorsNote usage). */}
      <div className="flex flex-1 flex-col">{children}</div>

      {/* Footer */}
      <footer
        className={cn(
          'mt-8 flex items-center border-t border-border pt-4 text-[11px] tracking-wide text-navy/45',
          isLeft ? 'justify-between' : 'flex-row-reverse justify-between',
        )}
      >
        <span className="font-serif text-sm text-navy/60">{pageNumber}</span>
        <span className="uppercase tracking-[0.2em]">{SITE}</span>
      </footer>
    </div>
  )
}
