import type { Metadata } from "next";
import PageHero from "@/app/_components/PageHero";
import TextReveal from "@/app/_components/anim/TextReveal";
import Reveal from "@/app/_components/anim/Reveal";
import CtaBand from "@/app/_components/CtaBand";

export const metadata: Metadata = {
  title: "Mission & Vision",
  description:
    "Comfinity's mission: to empower innovators to transform ideas into lasting impact through intelligent technology, research, and collaboration.",
};

const values = [
  {
    title: "Human-Centered Innovation",
    body: "Every product, solution, and research initiative begins with a human reality — not a technical problem. We ask who is affected before we ask what to build.",
  },
  {
    title: "Redefining What Is Possible",
    body: "We embrace ambitious ideas, challenge established assumptions, and pursue opportunities that can redefine industries. Meaningful progress is achieved by those with the courage to imagine what others have yet to see.",
  },
  {
    title: "Discipline in Execution",
    body: "Vision without execution is noise. We work with relentless focus, dedication, and determination. We do not celebrate the idea. We celebrate what was built.",
  },
  {
    title: "Integrity Without Compromise",
    body: "Integrity is the foundation of how we operate. We act with honesty, transparency, and accountability, honoring every commitment we make to our clients, partners, communities, and one another.",
  },
  {
    title: "Technology in Service of Dignity",
    body: "Every engineering decision, product innovation, and research initiative is guided by a commitment to respect, empower, and serve people. The true measure of innovation lies in its ability to uphold human dignity.",
  },
];

const beliefs = [
  "The world needs fewer software agencies and more technology groups that think on a civilizational scale.",
  "Dreamers who were told “no” often have the best ideas.",
  "Research and business are not opposites — they are two sides of the same ambition.",
  "Impact that cannot be measured is still real.",
  "A company's culture is determined not by what it says — but by who it protects.",
];

export default function MissionPage() {
  return (
    <main>
      <PageHero
        label="Mission, Vision & Values"
        title={
          <>
            Technology that{" "}
            <span className="font-serif-accent text-gradient">matters</span> —
            built in a way that honors the people it serves.
          </>
        }
        body="The strategic and philosophical foundation of Comfinity — the mission we execute, the vision we move toward, and the values we refuse to compromise."
      />

      {/* mission + vision */}
      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="glass rounded-3xl p-10 md:p-14">
            <p className="section-label mb-8">Mission</p>
            <TextReveal
              as="p"
              className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl"
            >
              To empower innovators, organizations, and communities to
              transform meaningful ideas into{" "}
              <span className="font-serif-accent text-gradient">lasting impact</span>{" "}
              through intelligent technology, research, and collaboration.
            </TextReveal>
          </Reveal>
          <Reveal delay={0.1} className="glass rounded-3xl p-10 md:p-14">
            <p className="section-label mb-8">Vision</p>
            <TextReveal
              as="p"
              className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl"
            >
              A world where technology is a force for{" "}
              <span className="font-serif-accent text-gradient">human elevation</span>{" "}
              — where every dreamer has access to the tools, knowledge, and
              community to build their future.
            </TextReveal>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted">
            Comfinity envisions a global technology and innovation ecosystem
            where the gap between a good idea and a working solution is closed
            — not by money or luck, but by the right combination of
            intelligence, community, and infrastructure.
          </p>
        </Reveal>
      </section>

      {/* values */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
          <p className="section-label mb-6">Core Values</p>
          <TextReveal
            as="h2"
            className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Values lived by the founders — not written by a{" "}
            <span className="font-serif-accent text-gradient">consultant.</span>
          </TextReveal>

          <div className="mt-16">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.04}>
                <div className="group grid gap-4 border-t border-line py-10 transition-colors hover:bg-wash md:grid-cols-[6rem_1fr_1.6fr] md:gap-10 md:px-4">
                  <span className="font-mono text-sm text-faint transition-colors group-hover:text-accent-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-tight">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* beliefs */}
      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
        <p className="section-label mb-6 text-center">What We Believe</p>
        <TextReveal
          as="h2"
          className="font-display mx-auto max-w-2xl text-center text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Convictions that shape every{" "}
          <span className="font-serif-accent text-gradient">decision.</span>
        </TextReveal>
        <Reveal stagger={0.08} className="mx-auto mt-16 max-w-3xl space-y-4">
          {beliefs.map((b) => (
            <div key={b} className="glass card-hover rounded-2xl px-8 py-6">
              <p className="text-base leading-relaxed text-foreground md:text-lg">
                {b}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <CtaBand />
    </main>
  );
}
