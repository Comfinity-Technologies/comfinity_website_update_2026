import type { Metadata } from "next";
import PageHero from "@/app/_components/PageHero";
import ScrubText from "@/app/_components/anim/ScrubText";
import Reveal from "@/app/_components/anim/Reveal";
import CtaBand from "@/app/_components/CtaBand";

export const metadata: Metadata = {
  title: "Our Divisions — A Technology & Innovation Group",
  description:
    "Comfinity operates across six divisions: AI & Software, Electronics & Hardware, Research & Innovation Labs, Products, Community, and Foundation.",
};

const divisions = [
  {
    num: "01",
    audiences: "Enterprise leaders, startup founders, CTOs, product teams",
    name: "AI & Software",
    tagline: "Intelligence, Engineered",
    desc: "Designs, builds, and deploys intelligent systems for enterprises, startups, and government organisations. From custom AI agents and automation platforms to full-stack enterprise applications, we engineer software that thinks.",
    capabilities:
      "AI agents · LLM integration · Process automation · Enterprise platforms · SaaS products · API infrastructure · Mobile & web applications",
    diff: "We do not build generic software. We engineer domain-specific intelligence that integrates into how organizations actually work.",
  },
  {
    num: "02",
    audiences: "Industrial companies, hardware startups, research institutions, government",
    name: "Electronics & Hardware",
    tagline: "Where Intelligence Meets the Physical World",
    desc: "Bridges digital intelligence and physical systems. We design embedded solutions, smart devices, and IoT architectures for industrial, consumer, and research applications.",
    capabilities:
      "Embedded systems · IoT device development · Sensor integration · Hardware-software co-design · PCB design · Firmware engineering",
    diff: "One of the few technology groups in the region with genuine hardware engineering capability alongside AI and software — enabling end-to-end intelligent system design.",
  },
  {
    num: "03",
    audiences: "Researchers, university students, government grant bodies, academic institutions, innovation partners",
    name: "Research & Innovation — Comfinity Labs",
    tagline: "Where Ideas Become Impact",
    desc: "An open innovation ecosystem that connects researchers, students, developers, and entrepreneurs to work on frontier problems. It operates as both an internal R&D engine and an open platform for collaborative innovation.",
    capabilities:
      "Applied research · Technology validation · Prototype development · Research publications · Open innovation challenges · Fellowship programs",
    diff: "Comfinity Labs is designed to be a public innovation infrastructure — not a private research unit. It is built to attract collaboration, not control output.",
  },
  {
    num: "04",
    audiences: "SMEs, developers, enterprise teams, digital-first businesses",
    name: "Products",
    tagline: "Built for the Next Decade",
    desc: "Develops proprietary software products — tools, platforms, and applications — that generate recurring value for businesses and developers. Products are conceived inside Comfinity Labs and industrialized through AI & Software.",
    capabilities: "Product roadmap in development",
    diff: "Products built on real research and validated in real markets — not speculative features hunting for a problem.",
  },
  {
    num: "05",
    audiences: "University students, early-stage founders, developers, researchers, media",
    name: "Community",
    tagline: "A Place for Builders and Dreamers",
    desc: "Manages Comfinity's ecosystem of students, entrepreneurs, developers, and advocates. It includes the Student Ambassador Programme, Startup Community, Innovation Challenges, Events, and the Newsletter network.",
    capabilities:
      "Student Ambassador Program · Startup Network · Innovation Challenges · Events & Conferences · Knowledge Resources · Newsletter",
    diff: "Community is not a marketing channel at Comfinity. It is a division with its own mission: to create space where people who have been overlooked can find their people.",
  },
  {
    num: "06",
    audiences: "NGOs, government bodies, grant organizations, impact investors, media",
    name: "Foundation — Helping Hands",
    tagline: "Technology in Service of Those Who Need It Most",
    desc: "The formal vehicle for Comfinity's social commitment. It directs resources toward education access, community development, and technology equity programmes — particularly in underserved communities across Southeast Asia and India.",
    capabilities:
      "Education access · Community development · Technology equity · 20% of profits committed",
    diff: "Social impact is not an afterthought — it is built into the founding DNA of the group.",
  },
];

export default function DivisionsPage() {
  return (
    <main>
      <PageHero
        label="Our Divisions"
        title={
          <>
            Six divisions.{" "}
            <span className="font-serif-accent text-gradient">One vision.</span>
          </>
        }
        body="Comfinity operates as a technology & innovation group — not a single company with one product line, but a structured group of divisions, each advancing a different domain of the technology ecosystem. Together, they form a complete and self-reinforcing platform for innovation."
      />

      <section className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 md:py-28">
        <div className="space-y-6">
          {divisions.map((d, i) => (
            <Reveal key={d.num} delay={i * 0.03}>
              <article className="glass card-hover group grid gap-8 rounded-3xl p-8 md:grid-cols-[8rem_1fr] md:p-14">
                <div>
                  <p className="font-display text-5xl font-semibold text-ink-ghost transition-colors duration-500 group-hover:text-accent/40 md:text-6xl">
                    {d.num}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
                    {d.tagline.toUpperCase()}
                  </p>
                  <h2 className="font-display mt-3 text-2xl font-medium tracking-tight md:text-3xl">
                    {d.name}
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
                    {d.desc}
                  </p>
                  <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-line p-6">
                      <p className="section-label mb-3">Capabilities</p>
                      <p className="text-sm leading-relaxed text-muted">
                        {d.capabilities}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-line p-6">
                      <p className="section-label mb-3">Who It Serves</p>
                      <p className="text-sm leading-relaxed text-muted">
                        {d.audiences}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-line p-6">
                      <p className="section-label mb-3">Differentiator</p>
                      <p className="text-sm leading-relaxed text-muted">{d.diff}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[90rem] px-6 py-24 text-center md:px-10">
          <ScrubText
            className="font-display mx-auto max-w-3xl text-2xl font-medium leading-snug tracking-tight md:text-3xl"
          >
            Each division advances a different layer of the ecosystem — all
            working toward the{" "}
            <span className="font-serif-accent text-gradient">same future.</span>
          </ScrubText>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
