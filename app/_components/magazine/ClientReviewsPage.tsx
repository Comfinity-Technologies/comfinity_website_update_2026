import React from 'react'
import { Star, ArrowRight, Quote } from 'lucide-react'
import { MagazinePage, SectionLabel } from './magazine-spread'

type Review = {
  name: string
  company: string
  quote: string
  avatar?: string
}

// Real testimonial content with Cloudinary images
const REVIEWS: Review[] = [
  {
    name: 'Ajay',
    company: 'REPZ Platform',
    quote:
      'Managing our gym used to be fragmented. REPZ brought everything into one platform, giving us complete visibility.',
    avatar: 'https://res.cloudinary.com/xnulqi5v/image/upload/v1786027076/WhatsApp_Image_2026-08-06_at_4.02.11_PM_p21bfa.jpg',
  },
  {
    name: 'Sreejith',
    company: 'Minute Bazaar',
    quote:
      'Going online was so easy! Order management and delivery run smoothly every day, and customers are happy.',
    avatar: 'https://res.cloudinary.com/xnulqi5v/image/upload/v1786027075/WhatsApp_Image_2026-08-06_at_4.18.10_PM_u8l7va.jpg',
  },
  {
    name: 'Vignesh',
    company: 'Fliqket OTT',
    quote:
      "What impressed us most was Fliqket's creator-first approach, secure streaming, and audience analytics.",
    avatar: 'https://res.cloudinary.com/xnulqi5v/image/upload/v1786027078/Gemini_Generated_Image_bay672bay672bay6_lp8sgz.png',
  },
  {
    name: 'Aravind',
    company: 'Retail Marketplace',
    quote:
      'Comfinity helped transform our grocery store into a digital marketplace. Everything is effortless now.',
    avatar: 'https://res.cloudinary.com/xnulqi5v/image/upload/v1786027076/WhatsApp_Image_2026-08-06_at_4.02.11_PM_p21bfa.jpg',
  },
  {
    name: 'Sujin',
    company: 'Medicharm Pharma',
    quote:
      'Managing inventory across branches used to be chaotic. Their system gave us complete real-time sync.',
    avatar: 'https://res.cloudinary.com/xnulqi5v/image/upload/v1786027872/Gemini_Generated_Image_jat3b3jat3b3jat3_mojez2.png',
  },
  {
    name: 'Arun',
    company: 'Reztos OS',
    quote:
      'Reztos made running our restaurant so much easier — QR ordering, billing, and multi-outlet management in one.',
    avatar: 'https://res.cloudinary.com/xnulqi5v/image/upload/v1786027076/Gemini_Generated_Image_rbbntzrbbntzrbbn_wfwyi5.png',
  },
]

const READ_ALL_LABEL = 'Read all client reviews'
const CTA_HEADLINE = 'Trusted across industries'

export function ClientReviewsPage() {
  return (
    <MagazinePage pageNumber={5} side="right">
      {/* Corner tab / section index marker */}
      <div className="mb-2 flex items-center justify-between">
        <span
          aria-hidden
          className="flex h-5 w-5 items-center justify-center rounded bg-brand-cyan text-[9px] font-bold tabular-nums text-white"
        >
          04
        </span>
        <SectionLabel index="04" title="Client Reviews" align="right" />
      </div>

      {/* 7 Equal Height Cards (6 Review Cards + 1 Bottom Callout Banner) */}
      <div className="grid grid-cols-1 grid-rows-7 gap-1.5 flex-1 w-full min-h-0">
        {REVIEWS.map((review, i) => (
          <ReviewCard key={review.name} review={review} featured={i === 0} />
        ))}

        {/* 7th Card: Bottom Banner Callout matching EXACT height of review cards */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-brand-navy p-2.5 sm:p-3 text-white shadow-xs min-h-0">
          <img
            src="https://res.cloudinary.com/xnulqi5v/image/upload/v1786007588/WhatsApp_Image_2026-08-06_at_2.00.13_PM_ya5hpr.jpg"
            alt="Comfinity client partnership in a modern office"
            className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none"
            crossOrigin="anonymous"
          />
          <div className="relative z-10 flex flex-col justify-center pt-0.5">
            <h3 className="font-serif text-sm sm:text-base font-bold text-white leading-none">
              {CTA_HEADLINE}
            </h3>
          </div>
          <a
            href="/works"
            className="relative z-10 flex items-center justify-between font-mono text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider text-brand-cyan hover:text-white transition-colors leading-none"
          >
            <span>{READ_ALL_LABEL}</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          </a>
        </div>
      </div>
    </MagazinePage>
  )
}

function ReviewCard({ review, featured }: { review: Review; featured?: boolean }) {
  const initials = review.name.slice(0, 1).toUpperCase()
  return (
    <article
      className={`relative flex flex-col justify-between overflow-hidden rounded-xl border border-brand-navy/10 bg-[#1c2452] p-2.5 sm:p-3 text-white shadow-xs min-h-0 ${
        featured ? 'ring-1 ring-brand-cyan/40' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {review.avatar ? (
            <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border border-brand-cyan/40">
              <img
                src={review.avatar}
                alt={review.name}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
          ) : (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cyan text-white text-[9px] font-bold">
              {initials}
            </span>
          )}
          <div className="flex items-center gap-0.5 text-brand-cyan text-[9px]">
            ★★★★★
          </div>
        </div>
        <Quote
          aria-hidden
          className="h-4 w-4 fill-brand-cyan/25 text-brand-cyan/25"
        />
      </div>

      <p className="font-serif text-[11.5px] sm:text-[12.5px] font-medium leading-tight text-white line-clamp-2">
        {review.quote}
      </p>

      <div className="flex items-center gap-1.5 font-serif text-[9.5px] sm:text-[10px] font-bold leading-none">
        <span className="text-white">{review.name}</span>
        <span className="text-brand-cyan uppercase tracking-wider font-mono text-[8px]">
          {review.company}
        </span>
      </div>
    </article>
  )
}
