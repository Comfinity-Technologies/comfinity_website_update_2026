import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/_components/PageHero";
import TextReveal from "@/app/_components/anim/TextReveal";
import Reveal from "@/app/_components/anim/Reveal";
import CtaBand from "@/app/_components/CtaBand";
import OfferingsExplorer from "@/app/_components/solutions/OfferingsExplorer";

export const metadata: Metadata = {
  title: "Business Solutions — AI, Software & Innovation",
  description:
    "Comfinity delivers AI-powered enterprise solutions, digital transformation, product engineering, and technology consulting across Southeast Asia.",
};

const offerings = [
  {
    id: "ai",
    title: "AI & Intelligent Automation",
    desc: "We build custom AI systems that transform repetitive, complex, or data-intensive processes into autonomous, reliable operations. From intelligent document processing to autonomous decision systems, we engineer AI that works in the real world.",
    items: [
      "Custom AI agents and multi-agent systems",
      "Large language model integration and fine-tuning",
      "Intelligent process automation (IPA)",
      "AI-powered analytics and decision support",
      "Natural language interfaces and conversational AI",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise Digital Transformation",
    desc: "We partner with established organizations to modernize their technology infrastructure — migrating legacy systems, rebuilding core platforms, and embedding intelligence at every layer of their operations.",
    items: [
      "Legacy system modernization and migration",
      "Cloud architecture and infrastructure design",
      "Enterprise platform development (ERP, CRM, custom)",
      "API strategy and integration architecture",
      "Digital transformation roadmapping",
    ],
  },
  {
    id: "product",
    title: "Product Engineering",
    desc: "For companies with a product idea that needs to become a real, scalable, market-ready software product — we provide end-to-end product engineering, from UX strategy to production deployment.",
    items: [
      "Product architecture and technical strategy",
      "Full-stack web and mobile development",
      "UX/UI design and product thinking",
      "SaaS platform development",
      "MVP development and iteration cycles",
    ],
  },
  {
    id: "rnd",
    title: "Research & Development Partnerships",
    desc: "We partner with universities, research institutions, and innovation-driven enterprises to design and execute applied R&D programs — translating frontier research into practical technology.",
    items: [
      "Joint research program design",
      "Technology feasibility studies",
      "Prototype and proof-of-concept development",
      "Research-to-product pipeline consulting",
      "Innovation lab setup and operation",
    ],
  },
  {
    id: "hardware",
    title: "Electronics & Embedded Systems",
    desc: "Hardware is not an afterthought — it is a strategic layer. We design and engineer embedded systems, smart devices, and IoT architectures for industrial, consumer, and research applications.",
    items: [
      "IoT architecture design and deployment",
      "Embedded firmware and systems engineering",
      "Hardware-software integration",
      "Sensor networks and real-time data systems",
      "Smart device prototyping and production preparation",
    ],
  },
  {
    id: "data",
    title: "Data Intelligence & Analytics",
    desc: "Data is not a byproduct. It is the raw material of competitive advantage. We help organizations build the infrastructure, pipelines, and intelligence layers that turn data into decisions.",
    items: [
      "Data architecture and pipeline engineering",
      "Business intelligence and executive dashboards",
      "Predictive modeling and forecasting",
      "Data governance and quality frameworks",
      "Real-time analytics infrastructure",
    ],
  },
];

const steps = [
  { n: "01", t: "Discovery", d: "We begin by understanding your reality, not pitching our services." },
  { n: "02", t: "Strategy", d: "We define the right approach, technology stack, and scope — aligned with your long-term goals." },
  { n: "03", t: "Design", d: "Architecture and UX design before a single line of production code is written." },
  { n: "04", t: "Build", d: "Iterative, validated engineering with regular checkpoints." },
  { n: "05", t: "Deploy", d: "Production deployment with rigorous QA, performance testing, and documentation." },
  { n: "06", t: "Evolve", d: "We remain your technology partner — supporting, improving, and growing the system as your needs change." },
];

const industries = [
  { t: "Financial Services & Fintech", d: "Compliance-aware automation, intelligent banking systems, payment infrastructure" },
  { t: "Healthcare & Life Sciences", d: "Clinical decision support, health data platforms, patient experience systems" },
  { t: "Education & EdTech", d: "Learning platforms, AI tutoring systems, institutional digital transformation" },
  { t: "Government & Public Sector", d: "Citizen-facing platforms, administrative automation, digital governance tools" },
  { t: "Manufacturing & Industrial", d: "Smart factory systems, IoT integration, predictive maintenance platforms" },
  { t: "Logistics & Supply Chain", d: "Real-time tracking, demand forecasting, warehouse automation" },
  { t: "Retail & E-Commerce", d: "Personalization engines, inventory intelligence, customer analytics" },
  { t: "Research & Academia", d: "Collaboration platforms, data infrastructure, publication and knowledge systems" },
];

const why = [
  "We think group, not project",
  "We own the outcome",
  "We bring research-grade rigor",
  "We build for the next 10 years",
  "We are transparent",
];

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        label="Business Solutions"
        title={
          <>
            Technology built for the complexity of the{" "}
            <span className="font-serif-accent text-gradient">real world.</span>
          </>
        }
        body="We do not offer package solutions. We design and engineer technology that matches the specific ambition, constraints, and future of each organization we work with — whether you are a startup, an enterprise, or a government body."
      >
        <div className="mt-10">
          <Link href="/contact" className="btn-primary">
            Book a Free Consultation
          </Link>
        </div>
      </PageHero>

      {/* offerings */}
      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
        <p className="section-label mb-6">Core Offerings</p>
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Six ways we create{" "}
          <span className="font-serif-accent text-gradient">leverage.</span>
        </TextReveal>

        <OfferingsExplorer offerings={offerings} />
      </section>

      {/* process */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
          <p className="section-label mb-6">How We Work</p>
          <TextReveal
            as="h2"
            className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
          >
            A process with{" "}
            <span className="font-serif-accent text-gradient">discipline</span>{" "}
            built in.
          </TextReveal>
          <Reveal
            stagger={0.07}
            className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
          >
            {steps.map((s) => (
              <div key={s.n} className="group bg-background p-8 transition-colors duration-500 hover:bg-surface-2">
                <p className="font-display text-4xl font-semibold text-ink-ghost transition-colors group-hover:text-accent/40">
                  {s.n}
                </p>
                <h3 className="font-display mt-6 text-xl font-medium tracking-tight">
                  {s.t}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* industries */}
      <section id="industries" className="mx-auto max-w-[90rem] scroll-mt-24 px-6 py-28 md:px-10 md:py-36">
        <p className="section-label mb-6">Industries</p>
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Deep context, not{" "}
          <span className="font-serif-accent text-gradient">generic playbooks.</span>
        </TextReveal>
        <div className="mt-16">
          {industries.map((ind, i) => (
            <Reveal key={ind.t} delay={i * 0.02}>
              <div className="group grid gap-2 border-t border-line py-7 transition-colors hover:bg-wash md:grid-cols-[1fr_1.4fr] md:gap-10 md:px-4">
                <h3 className="font-display text-lg font-medium tracking-tight transition-colors group-hover:text-accent-soft md:text-xl">
                  {ind.t}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{ind.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* why */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
          <p className="section-label mb-6 text-center">Why Comfinity</p>
          <Reveal stagger={0.07} className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {why.map((w) => (
              <span
                key={w}
                className="glass card-hover rounded-full px-7 py-4 text-sm font-medium md:text-base"
              >
                {w}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
