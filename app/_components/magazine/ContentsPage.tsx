import Image from 'next/image'
import { Users, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MagazinePage } from './magazine-page'
import { EditorsNote } from './editors-note'
import { contents } from './who-we-are-content'

/** Shared elevation, identical to the Who We Are page cards. */
const CARD_SHADOW =
  'shadow-[0_1px_1px_rgba(30,39,97,0.05),0_10px_28px_-16px_rgba(30,39,97,0.22)]'

/**
 * Page 03 — "Contents". Right page of the opening spread.
 * All copy comes from the contents constant.
 */
export function ContentsPage() {
  const { section, heading, quote, gallery, entries, callout, editorsNote } = contents

  return (
    <MagazinePage
      sectionNumber={section.number}
      sectionTitle={section.title}
      pageNumber={3}
      side="right"
    >
      {/* Masthead title in a bordered plate matching Who We Are */}
      <div className={cn('mt-2 rounded-lg border border-border bg-surface px-6 py-6', CARD_SHADOW)}>
        <h1 className="font-serif text-[3.25rem] font-light leading-[0.95] tracking-[-0.02em] text-navy sm:text-[4.25rem]">
          {heading}<em className="font-medium italic text-cyan">.</em>
        </h1>
      </div>

      <p className="mt-4 border-l-2 border-cyan pl-4 font-serif text-[17px] sm:text-[19px] italic leading-relaxed text-navy font-serif">
        {`\u201C${quote}\u201D`}
      </p>

      {/* Gallery strip */}
      <div className={cn('mt-6 grid grid-cols-4 gap-px overflow-hidden rounded-lg border border-border bg-border', CARD_SHADOW)}>
        {gallery.map((img) => (
          <div key={img.src} className="relative aspect-square bg-surface">
            <Image
              src={img.src || "/placeholder.svg"}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 25vw, 120px"
            />
          </div>
        ))}
      </div>

      {/* Contents list */}
      <ol className="mt-6 flex flex-col">
        {entries.map((entry) => (
          <li
            key={entry.number}
            className="group flex items-center gap-5 border-b border-border/60 py-3 sm:py-3.5 last:border-b-0"
          >
            <span className="w-7 shrink-0 font-sans text-base sm:text-lg font-bold tabular-nums text-cyan tracking-tight">
              {entry.number}
            </span>
            <span className="flex-1 font-serif text-[19px] sm:text-xl leading-snug text-navy font-normal">{entry.title}</span>
          </li>
        ))}
      </ol>

      {/* Callout */}
      <div className={cn('mt-6 flex items-center gap-4 rounded-lg border border-border bg-ice/45 px-5 py-4', CARD_SHADOW)}>
        <span className="flex items-center -space-x-2 text-navy">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface bg-navy text-paper">
            <Users className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface bg-cyan text-navy">
            <Globe className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-base sm:text-lg lg:text-xl italic text-navy leading-snug">
            {`\u201C${callout.quote}\u201D`}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/50">
            {callout.site}
          </p>
        </div>
      </div>

      {/* Flexible spacer — absorbs leftover height so the note settles into the
          lower third instead of leaving one large gap above the footer. */}
      <div className="min-h-6 flex-1" />

      {/* PLACEHOLDER: editable Editor's Note copy — reusable space-balancing block */}
      <EditorsNote label={editorsNote.label} body={editorsNote.body} />
    </MagazinePage>
  )
}
