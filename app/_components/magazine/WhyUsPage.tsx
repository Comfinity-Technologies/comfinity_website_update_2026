import {
  Target,
  Layers,
  Boxes,
  Globe2,
  Briefcase,
  Lightbulb,
  Handshake,
  Rocket,
  LineChart,
  Code2,
  Cpu,
  FlaskConical,
  Bot,
  MonitorSmartphone,
  Cloud,
  Wrench,
  Building2,
  Factory,
  Landmark,
  type LucideIcon,
} from 'lucide-react'
import { MagazinePage, SectionLabel } from './magazine-spread'

type WhyUsItem = {
  label: string
  icon: LucideIcon
}

type WhyUsCard = {
  number: string
  title: string
  icon: LucideIcon
  items: WhyUsItem[]
}

const CARDS: WhyUsCard[] = [
  {
    number: '01',
    title: 'The Comfinity Difference',
    icon: Target,
    items: [
      { label: 'Business-First Thinking', icon: Briefcase },
      { label: 'Innovation with Purpose', icon: Lightbulb },
      { label: 'End-to-End Technology Partnership', icon: Handshake },
      { label: 'Building the Future Together', icon: Rocket },
    ],
  },
  {
    number: '02',
    title: 'Our Expertise (Capabilities)',
    icon: Layers,
    items: [
      { label: 'Business Strategy & Transformation', icon: LineChart },
      { label: 'Digital Engineering & Product Development', icon: Code2 },
      { label: 'AI, Automation & Intelligent Systems', icon: Cpu },
      { label: 'Innovation, Research & Talent Development', icon: FlaskConical },
    ],
  },
  {
    number: '03',
    title: 'Solutions We Deliver (Services)',
    icon: Boxes,
    items: [
      { label: 'AI & Intelligent Automation', icon: Bot },
      { label: 'Custom Software & Digital Platforms', icon: MonitorSmartphone },
      { label: 'Digital Transformation & Cloud Solutions', icon: Cloud },
      { label: 'Product Engineering & Technology Consulting', icon: Wrench },
    ],
  },
  {
    number: '04',
    title: 'Industries We Empower (Who You Serve)',
    icon: Globe2,
    items: [
      { label: 'Startups & Scale-ups', icon: Rocket },
      { label: 'Enterprises', icon: Building2 },
      { label: 'Industry Verticals', icon: Factory },
      { label: 'Government & Innovation Ecosystems', icon: Landmark },
    ],
  },
]

const HEADLINE_KICKER = 'The Comfinity edge'

export function WhyUsPage() {
  return (
    <MagazinePage pageNumber={4} side="left">
      {/* Corner tab / section index marker */}
      <div className="mb-5 flex items-center justify-between">
        <SectionLabel index="03" title="Why Us" />
        <span
          aria-hidden
          className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-brand-navy text-[10px] font-bold tabular-nums text-brand-cream"
        >
          03
        </span>
      </div>

      {/* Photo header with diagonal navy color-block bleed */}
      <div className="relative w-full overflow-hidden rounded-lg border border-border">
        {/* PLACEHOLDER: stock office/team photo — swap for real Comfinity photography later */}
        <img
          src="/images/why-us-team.png"
          alt="PLACEHOLDER: Comfinity technology team collaborating in a modern office"
          className="h-28 w-full object-cover sm:h-32 lg:h-34"
          crossOrigin="anonymous"
        />
        {/* Diagonal navy panel carrying the headline */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-3 sm:p-3.5"
          style={{
            background:
              'linear-gradient(115deg, rgba(30,39,97,0.92) 42%, rgba(30,39,97,0.55) 62%, rgba(30,39,97,0) 88%)',
          }}
        >
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
            {HEADLINE_KICKER}
          </p>
          <h2 className="mt-0.5 font-serif text-2xl sm:text-3xl lg:text-4xl font-light leading-none tracking-tight text-white">
            Why <span className="font-medium italic text-brand-cyan">us.</span>
          </h2>
        </div>
      </div>

      {/* Cards matching exact header width */}
      <div className="mt-2 w-full flex flex-col gap-2 shrink-0">
        {CARDS.map((card, i) => (
          <WhyUsCardItem key={card.number} card={card} filled={i % 2 === 0} />
        ))}
      </div>
    </MagazinePage>
  )
}

function WhyUsCardItem({ card, filled }: { card: WhyUsCard; filled: boolean }) {
  const Icon = card.icon
  return (
    <article className="group flex w-full gap-2.5 rounded-xl border border-border bg-card p-2 sm:p-2.5 shadow-xs transition-colors">
      {/* Number + icon badge — brand navy/cyan only, filled vs outline varies per card */}
      <div className="flex shrink-0 flex-col items-center gap-1 pt-0.5">
        <span
          className={`font-serif text-base font-bold leading-none tabular-nums ${filled ? 'text-brand-navy' : 'text-brand-cyan'
            }`}
        >
          {card.number}
        </span>
        <span
          className={`flex h-5.5 w-5.5 items-center justify-center rounded-md ${filled
            ? 'bg-brand-navy text-brand-cream'
            : 'border border-brand-cyan/40 bg-brand-ice/40 text-brand-cyan'
            }`}
        >
          <Icon className="h-3 w-3" strokeWidth={1.75} aria-hidden />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-xs sm:text-[13.5px] font-bold leading-tight text-foreground">
          {card.title}
        </h3>
        <ul className="mt-1 flex flex-col gap-1">
          {card.items.map((item) => {
            const ItemIcon = item.icon
            return (
              <li
                key={item.label}
                className="flex items-center gap-1.5 font-serif text-[11.5px] sm:text-[12.5px] font-medium leading-snug text-foreground/90"
              >
                <span
                  aria-hidden
                  className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-brand-ice/50 text-brand-navy"
                >
                  <ItemIcon className="h-2 w-2" strokeWidth={2} />
                </span>
                <span>{item.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}
