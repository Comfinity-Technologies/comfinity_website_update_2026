import Link from "next/link";
import TextReveal from "../anim/TextReveal";
import Reveal from "../anim/Reveal";

const cards = [
  {
    title: "Products",
    desc: "Intelligent software products built for the future",
    href: "/about/divisions",
    num: "01",
  },
  {
    title: "Business Solutions",
    desc: "AI-powered enterprise transformation services",
    href: "/solutions",
    num: "02",
  },
  {
    title: "Innovation & Research",
    desc: "Labs, experiments, and frontier technologies",
    href: "/labs",
    num: "03",
  },
  {
    title: "Partnerships",
    desc: "Strategic alliances with global organizations",
    href: "/partners",
    num: "04",
  },
  {
    title: "Careers & Internships",
    desc: "Join a team building what comes next",
    href: "/careers",
    num: "05",
  },
  {
    title: "Community",
    desc: "A global ecosystem of dreamers and builders",
    href: "/community",
    num: "06",
  },
];

export default function ExploreGrid() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
      <p className="section-label mb-6">Explore Comfinity</p>
      <TextReveal
        as="h2"
        className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
      >
        One group. Every layer of the{" "}
        <span className="font-serif-accent text-gradient">ecosystem.</span>
      </TextReveal>

      <Reveal stagger={0.08} className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.num}
            href={c.href}
            className="group relative flex min-h-64 flex-col justify-between bg-background p-8 transition-colors duration-500 hover:bg-surface-2"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs text-faint">{c.num}</span>
              <span
                aria-hidden
                className="text-lg text-faint transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-soft"
              >
                ↗
              </span>
            </div>
            <div>
              <h3 className="font-display text-2xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent-soft">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.desc}</p>
            </div>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
