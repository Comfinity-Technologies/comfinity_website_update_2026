import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/_components/PageHero";
import TextReveal from "@/app/_components/anim/TextReveal";
import Reveal from "@/app/_components/anim/Reveal";
import Marquee from "@/app/_components/anim/Marquee";
import SkewMarquee from "@/app/_components/anim/SkewMarquee";
import CtaBand from "@/app/_components/CtaBand";
import { getLabsData } from "@/lib/labs-store";

export const metadata: Metadata = {
  title: "Comfinity Labs | Where Ideas Become Impact",
  description:
    "Comfinity Labs is an open innovation ecosystem connecting researchers, developers, students, and entrepreneurs to work on frontier problems together.",
};

const journey = [
  { t: "Idea", d: "A person submits a problem or concept to the ecosystem" },
  { t: "Validation", d: "The community and research team assess feasibility and relevance" },
  { t: "Collaboration", d: "Contributors with relevant expertise join the project" },
  { t: "Experiment", d: "Rapid prototyping and testing in a structured research environment" },
  { t: "Research", d: "Deeper inquiry: literature review, technical analysis, academic rigor" },
  { t: "Prototype", d: "A working model tested against real-world conditions" },
  { t: "Funding", d: "Grant applications, corporate sponsorship, or internal allocation" },
  { t: "Product", d: "A validated solution ready for commercialization or open release" },
  { t: "Startup", d: "Where applicable, the project becomes an independent venture" },
  { t: "Impact", d: "The measurable change created in the world" },
];

const fallbackDomains = [
  "AI & Autonomous Agents",
  "Electronics & Embedded Systems",
  "Internet of Things",
  "Space Technology",
  "Cybersecurity",
  "Healthcare Technology",
  "Climate Technology",
  "Education Technology",
  "Productivity Systems",
  "Human-Computer Interaction",
  "Future Interfaces",
];

const fallbackPrograms = [
  {
    t: "Innovation Fellowship",
    d: "A structured program for individuals who want dedicated time and resources to pursue a high-potential research or innovation project within the Comfinity ecosystem.",
  },
  {
    t: "Research Fellowship",
    d: "For researchers from universities and institutions who want to work on applied problems in partnership with Comfinity Labs.",
  },
  {
    t: "Student Ambassador Program",
    d: "University students who represent Comfinity on their campuses — organizing events, recruiting participants for innovation challenges, and acting as bridges between academia and industry.",
  },
  {
    t: "Founder Incubator",
    d: "For teams within the Labs ecosystem that have validated a product idea and are ready to build a company around it. Comfinity provides mentorship, infrastructure, and network access.",
  },
];

const growthPath = [
  { t: "Visitor", d: "Explore the Labs, attend open events, see what is being built." },
  { t: "Apply", d: "Bring your idea — or yourself — and apply to join a program." },
  { t: "Member", d: "Join the community with access to spaces, tools, and peers." },
  { t: "Contributor", d: "Work on live projects and challenges alongside the team." },
  { t: "Researcher", d: "Go deeper — lead investigations inside a research program." },
  { t: "Project Lead", d: "Own a project end to end: scope, team, and outcomes." },
  { t: "Founder", d: "Spin your validated idea out into a venture, with Labs behind you." },
  { t: "Mentor", d: "Give back — guide the next generation coming up the path." },
];

const partnerTypes = [
  { t: "Research Partners", d: "Universities and academic institutions" },
  { t: "Industry Partners", d: "Companies bringing real problems to the ecosystem" },
  { t: "Technology Partners", d: "Platform and tool providers" },
  { t: "Funding Partners", d: "Grants, foundations, and impact investors" },
  { t: "Academic Partners", d: "Faculty, research labs, and knowledge institutions" },
  { t: "Government Partners", d: "Agencies funding national innovation priorities" },
];

export default function LabsPage() {
  const data = getLabsData();
  const liveDomains = data.domains && data.domains.length > 0 ? data.domains : fallbackDomains;
  const livePrograms =
    data.programs && data.programs.length > 0
      ? data.programs.map((p) => ({ t: p.title, d: p.desc }))
      : fallbackPrograms;
  return (
    <main>
      <PageHero
        label="Research · Experimentation · Impact"
        title={
          <>
            Where ideas become{" "}
            <span className="font-serif-accent text-gradient">impact.</span>
          </>
        }
        body="Comfinity Labs is an open innovation ecosystem connecting researchers, developers, students, and entrepreneurs to work on frontier problems — together. Submit an idea. Join a project. Build something that matters."
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/contact" className="btn-primary">
            Join the Ecosystem
          </Link>
          <Link href="/contact" className="btn-ghost">
            Submit Your Idea
          </Link>
          <Link href="/partners" className="btn-ghost">
            Become a Partner
          </Link>
        </div>
      </PageHero>

      {/* what is */}
      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="section-label mb-6">What Is Comfinity Labs?</p>
            <TextReveal
              as="h2"
              className="font-display text-3xl font-semibold leading-snug tracking-tight md:text-4xl"
            >
              The world&rsquo;s most meaningful problems deserve more than a{" "}
              <span className="font-serif-accent text-gradient">product launch.</span>
            </TextReveal>
          </div>
          <Reveal className="self-center">
            <p className="text-base leading-relaxed text-muted">
              Comfinity Labs is the research and innovation engine of the
              Comfinity Group. It operates on a simple belief: that the
              world&rsquo;s most meaningful problems deserve a dedicated,
              collaborative, long-term research effort.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The Labs brings together diverse minds — across disciplines,
              geographies, and experience levels — and provides them with the
              infrastructure, community, and resources needed to move from
              idea to validated solution.
            </p>
          </Reveal>
        </div>
      </section>

      {/* domains marquee */}
      <section id="domains" className="scroll-mt-24 border-y border-line bg-surface py-16">
        <p className="section-label mb-10 text-center">Technology Domains</p>
        <SkewMarquee>
          <Marquee duration="44s">
            {liveDomains.map((d) => (
              <span key={d} className="flex items-center">
                <span className="font-display px-8 text-2xl font-medium tracking-tight text-faint md:text-4xl">
                  {d}
                </span>
                <span aria-hidden className="text-accent/50">✦</span>
              </span>
            ))}
          </Marquee>
        </SkewMarquee>
      </section>

      {/* journey */}
      <section id="journey" className="mx-auto max-w-[90rem] scroll-mt-24 px-6 py-28 md:px-10 md:py-36">
        <p className="section-label mb-6">The Innovation Journey</p>
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          From idea to impact in{" "}
          <span className="font-serif-accent text-gradient">ten movements.</span>
        </TextReveal>
        <Reveal
          stagger={0.05}
          className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5"
        >
          {journey.map((j, i) => (
            <div
              key={j.t}
              className="group bg-background p-6 transition-colors duration-500 hover:bg-surface-2"
            >
              <p className="font-mono text-xs text-faint transition-colors group-hover:text-accent-soft">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-5 text-lg font-medium tracking-tight">
                {j.t}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{j.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* programs */}
      <section id="programs" className="scroll-mt-24 border-y border-line bg-surface">
        <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
          <p className="section-label mb-6">Programs</p>
          <TextReveal
            as="h2"
            className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Structured paths for{" "}
            <span className="font-serif-accent text-gradient">serious builders.</span>
          </TextReveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {livePrograms.map((p, i) => (
              <Reveal key={p.t} delay={(i % 2) * 0.08}>
                <div className="glass card-hover h-full rounded-3xl p-8 md:p-10">
                  <p className="font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-4 text-2xl font-medium tracking-tight">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* growth path */}
          <div className="mt-24">
            <p className="section-label mb-6">Growth Path</p>
            <TextReveal
              as="h3"
              className="font-display max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl"
            >
              Eight stages, one direction —{" "}
              <span className="font-serif-accent text-gradient">upward.</span>
            </TextReveal>
            <Reveal
              stagger={0.06}
              className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {growthPath.map((g, i) => (
                <div
                  key={g.t}
                  className="glass card-hover group relative overflow-hidden rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-faint transition-colors group-hover:text-accent-soft">
                      STAGE {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < growthPath.length - 1 && (
                      <span
                        aria-hidden
                        className="text-sm text-faint transition-all group-hover:translate-x-1 group-hover:text-accent-soft"
                      >
                        →
                      </span>
                    )}
                  </div>
                  <h4 className="font-display mt-4 text-lg font-medium tracking-tight">
                    {g.t}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {g.d}
                  </p>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px bg-line"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent to-accent-soft transition-all duration-500"
                    style={{ width: `${((i + 1) / growthPath.length) * 100}%` }}
                  />
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* impact metrics */}
      <section className="mx-auto max-w-[90rem] px-6 pt-28 md:px-10 md:pt-36">
        <p className="section-label mb-6">Community Impact</p>
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          An ecosystem measured in{" "}
          <span className="font-serif-accent text-gradient">people.</span>
        </TextReveal>
        <Reveal
          stagger={0.06}
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5"
        >
          {[
            { t: "Members", d: "Growing ecosystem of researchers, students, and builders" },
            { t: "Active Projects", d: "Across 12+ technology domains" },
            { t: "Countries", d: "ASEAN focus with global reach" },
            { t: "Research Publications", d: "Building toward first submission" },
            { t: "Startups Launched", d: "Target: 3 in Year 1" },
          ].map((m) => (
            <div key={m.t} className="bg-background p-8">
              <p className="font-display text-lg font-medium tracking-tight text-gradient">
                {m.t}
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-muted">{m.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* partnership types */}
      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
        <p className="section-label mb-6">Partnership Types</p>
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Built to attract collaboration, not{" "}
          <span className="font-serif-accent text-gradient">control output.</span>
        </TextReveal>
        <Reveal
          stagger={0.06}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {partnerTypes.map((p) => (
            <div key={p.t} className="glass card-hover rounded-3xl p-8">
              <h3 className="font-display text-xl font-medium tracking-tight">
                {p.t}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <CtaBand />
    </main>
  );
}
