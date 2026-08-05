import Image from "next/image";
import TextReveal from "../anim/TextReveal";
import Reveal from "../anim/Reveal";

const products = [
  {
    name: "Drishti",
    tag: "AI · Defence",
    desc: "AI Digital Intelligence Platform — real-time disinformation detection, deepfake identification, and threat intelligence briefing at one click.",
    image: "/products/drishti.svg",
    alt: "Drishti intelligence console with disinformation signal timeline and threat radar",
  },
  {
    name: "AppGenie",
    tag: "Commerce · SaaS",
    desc: "Multi-vendor e-commerce platform that automates order routing, inventory sync, GST billing, and delivery — from WhatsApp chaos to one dashboard.",
    image: "/products/appgenie.svg",
    alt: "AppGenie vendor dashboard with revenue chart and order routing",
  },
  {
    name: "Nexzo",
    tag: "F&B · Operations",
    desc: "Restaurant management suite — live sales, expense analytics, staff payroll, attendance, and multi-outlet performance from a single platform.",
    image: "/products/nexzo.svg",
    alt: "Nexzo restaurant operations dashboard with live sales and outlet performance",
  },
  {
    name: "FliQket OTT",
    tag: "Media · Streaming",
    desc: "Next-gen OTT video streaming & creator studio platform — adaptive playback, 20% watch-time gating, PPV rentals, and cross-platform Flutter apps.",
    image: "/works/fliqket-ott.png",
    alt: "FliQket OTT streaming platform dashboard and mobile app interface",
  },
];

const solutions = [
  {
    title: "AI & Intelligent Systems",
    icon: "🤖",
    tag: "AI-Native",
    desc: "Custom LLM agents, ML pipelines, and intelligent automation layers that learn from your data and operate autonomously at scale.",
  },
  {
    title: "Data Analytics & BI",
    icon: "📊",
    tag: "Decision Science",
    desc: "Real-time dashboards, predictive forecasting, and decision intelligence systems that turn raw data into clear business action.",
  },
  {
    title: "ERP & CRM Development",
    icon: "🏗️",
    tag: "Enterprise",
    desc: "Enterprise systems purpose-built for your industry — not generic software adapted with compromises. Fully owned, fully custom.",
  },
  {
    title: "Workflow Automation",
    icon: "⚡",
    tag: "Operational AI",
    desc: "End-to-end process automation eliminating manual bottlenecks across CRM, accounting, fulfilment, and support — running 24/7.",
  },
  {
    title: "Custom Software Development",
    icon: "🔧",
    tag: "Custom Build",
    desc: "Bespoke digital systems built around your exact workflows. Full-stack, scalable, and designed to evolve with your business.",
  },
  {
    title: "Digital Transformation",
    icon: "🚀",
    tag: "Strategy",
    desc: "Strategic consulting that maps your operations, identifies AI leverage points, and delivers a phased modernisation roadmap — not a slide deck.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
      <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="section-label mb-6">What We Build</p>
          <TextReveal
            as="h2"
            className="font-display max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Products we ship.{" "}
            <span className="font-serif-accent text-gradient">
              Solutions we craft.
            </span>
          </TextReveal>
        </div>
        <Reveal>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            We build and own products — and we build custom systems for
            businesses that need something the market doesn&rsquo;t offer.
          </p>
        </Reveal>
      </div>

      {/* our products */}
      <Reveal className="mb-10 flex items-center gap-6">
        <p className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
          01 — OUR PRODUCTS
        </p>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </Reveal>

      <Reveal
        stagger={0.08}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {products.map((p) => (
          <article
            key={p.name}
            className="glass card-hover group flex flex-col overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-video overflow-hidden border-b border-line">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                unoptimized={p.image.endsWith(".svg")}
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {p.name}
                </h3>
                <span className="font-mono text-[9px] tracking-[0.2em] text-accent-soft">
                  {p.tag.toUpperCase()}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-muted">{p.desc}</p>
            </div>
          </article>
        ))}
      </Reveal>

      {/* custom solutions */}
      <Reveal className="mb-10 mt-24 flex items-center gap-6">
        <p className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
          02 — CUSTOM SOLUTIONS
        </p>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </Reveal>

      <Reveal
        stagger={0.06}
        className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {solutions.map((s) => (
          <div
            key={s.title}
            className="group relative flex min-h-64 flex-col justify-between bg-background p-7 transition-colors duration-500 hover:bg-surface-2"
          >
            <div className="flex items-center justify-between">
              <span aria-hidden className="text-xl">
                {s.icon}
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-faint transition-colors group-hover:text-accent-soft">
                {s.tag.toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-medium leading-snug tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {s.desc}
              </p>
            </div>
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent to-accent-soft transition-all duration-500 group-hover:w-full"
            />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
