import Image from 'next/image'
import { cn } from '@/lib/utils'
import { MagazinePage } from './magazine-page'
import { whoWeAre } from './who-we-are-content'

/** Soft, unified elevation used across every card on the spread. */
const CARD_SHADOW =
  'shadow-[0_1px_1px_rgba(30,39,97,0.05),0_10px_28px_-16px_rgba(30,39,97,0.22)]'

/**
 * Distinct mission-icon treatments — each intentionally different (filled navy
 * disc, cyan disc, ice ring) so the row never reads as a uniform icon set.
 */
const MISSION_BADGES = [
  { container: 'rounded-full bg-navy text-paper', stroke: 1.75 },
  { container: 'rounded-full bg-cyan text-navy', stroke: 2 },
  { container: 'rounded-[10px] border border-navy/15 bg-ice text-navy', stroke: 1.6 },
] as const

/** Per-card vision accents so the inner emblem disc differs on each card. */
const VISION_ACCENTS = [
  { disc: 'bg-navy text-paper', ring: 'border-navy/15' },
  { disc: 'bg-cyan text-navy', ring: 'border-cyan/30' },
  { disc: 'border border-navy/15 bg-surface text-navy', ring: 'border-navy/15' },
] as const

/**
 * Page 02 — "Who We Are". Left page of the opening spread.
 * All copy comes from the whoWeAre constant.
 */
export function WhoWeArePage() {
  const { section, heading, about, mission, vision, portrait } = whoWeAre

  return (
    <MagazinePage
      sectionNumber={section.number}
      sectionTitle={section.title}
      pageNumber={2}
      side="left"
    >
      {/* Masthead title in a bordered plate */}
      <div className={cn('mt-2 rounded-lg border border-border bg-surface px-6 py-6', CARD_SHADOW)}>
        <h1 className="font-serif text-[3.25rem] font-light leading-[0.95] tracking-[-0.02em] text-navy sm:text-[4.25rem]">
          {heading.pre}{' '}
          <em className="font-medium italic text-cyan">{heading.emphasis}</em>
        </h1>
      </div>

      {/* About row: portrait + copy card (50/50 equal split) */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 items-stretch">
        <div className={cn('relative aspect-[3/4] overflow-hidden rounded-lg border border-border', CARD_SHADOW)}>
          <Image
            src={portrait.src || "/placeholder.svg"}
            alt={portrait.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 280px"
          />
          {/* gentle editorial darkening at the base */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(30,39,97,0.28) 100%)' }}
          />
        </div>

        <div className={cn('flex flex-col justify-center rounded-lg border border-border bg-surface p-5 sm:p-6', CARD_SHADOW)}>
          <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-cyan" />
            {about.label}
          </p>
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-navy/85 font-serif">{about.body}</p>
        </div>
      </div>

      {/* Mission */}
      <div className="mt-7">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan">
          {mission.label}
        </p>
        <ul className="flex flex-col gap-3">
          {mission.items.map((item, i) => {
            const Icon = item.icon
            const badge = MISSION_BADGES[i % MISSION_BADGES.length]
            return (
              <li
                key={item.text}
                className={cn(
                  'group flex items-center gap-4 rounded-lg border border-border bg-surface px-5 py-3.5',
                  CARD_SHADOW,
                )}
              >
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center',
                    badge.container,
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={badge.stroke} />
                </span>
                <span className="flex-1 font-serif text-[17px] text-navy font-normal">{item.text}</span>
                <span aria-hidden className="font-sans text-sm font-bold tabular-nums text-cyan">
                  {`0${i + 1}`}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Vision */}
      <div className="mt-7">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan">
          {vision.label}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {vision.items.map((item, i) => {
            const Icon = item.icon
            const accent = VISION_ACCENTS[i % VISION_ACCENTS.length]
            return (
              <div
                key={item.text}
                className={cn(
                  'flex flex-col items-center gap-3 rounded-lg border border-border bg-surface px-3 py-5 text-center',
                  CARD_SHADOW,
                )}
              >
                {/* Emblem: textured outer ring + inset accent disc */}
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full">
                  {/* dotted texture ring */}
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full opacity-70 [background:radial-gradient(circle_at_center,transparent_58%,var(--ice)_58%),repeating-conic-gradient(var(--navy)_0deg_6deg,transparent_6deg_12deg)]"
                    style={{ WebkitMaskImage: 'radial-gradient(circle, transparent 60%, #000 61%, #000 100%)', maskImage: 'radial-gradient(circle, transparent 60%, #000 61%, #000 100%)' }}
                  />
                  {/* outer ring border */}
                  <span aria-hidden className={cn('absolute inset-0 rounded-full border', accent.ring)} />
                  {/* inner accent disc */}
                  <span
                    className={cn(
                      'relative flex h-10 w-10 items-center justify-center rounded-full',
                      accent.disc,
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </span>
                </span>
                <span className="font-serif text-[13px] sm:text-[14px] font-medium leading-tight text-navy/85">
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </MagazinePage>
  )
}
