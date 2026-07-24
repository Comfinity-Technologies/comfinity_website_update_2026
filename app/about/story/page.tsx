import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/_components/PageHero";
import TextReveal from "@/app/_components/anim/TextReveal";
import ScrubText from "@/app/_components/anim/ScrubText";
import Reveal from "@/app/_components/anim/Reveal";
import CtaBand from "@/app/_components/CtaBand";

export const metadata: Metadata = {
  title: "Our Story — Where It All Began",
  description:
    "Discover the journey of Comfinity and the values that continue to inspire our pursuit of intelligent technologies.",
};

const trustPoints = [
  "Founded by practitioners, not theorists",
  "20% social commitment — built into the founding DNA",
  "Multi-year relationship between co-founders — not a startup-of-convenience",
  "Restarted after adversity — resilience is in the company's origin",
];

export default function StoryPage() {
  return (
    <main>
      <PageHero
        label="Our Story"
        title={
          <>
            Every great transformation begins with a{" "}
            <span className="font-serif-accent text-gradient">question.</span>
          </>
        }
        body="Comfinity traces its origins to 2016, when a conversation between two students sparked a shared vision for technology that could create meaningful and lasting impact. What began as an exchange of ideas soon evolved into a long-term commitment to innovation, collaboration, and purposeful engineering."
      />

      {/* founding principle */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
          <p className="section-label mb-10 text-center">The Founding Principle</p>
          <ScrubText
            as="blockquote"
            className="font-display mx-auto max-w-4xl text-center text-3xl font-medium leading-snug tracking-tight md:text-5xl"
          >
            &ldquo;Comfinity is a place for{" "}
            <span className="font-serif-accent text-gradient">dreamers</span> who
            were wounded by others. We give them hope to dream again, and we
            help them elevate that dream into reality.&rdquo;
          </ScrubText>
        </div>
      </section>

      {/* founding team */}
      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
        <p className="section-label mb-6">The Founding Team</p>
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Two people. One{" "}
          <span className="font-serif-accent text-gradient">conviction.</span>
        </TextReveal>

        <Reveal stagger={0.12} className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="glass card-hover rounded-3xl p-10 md:p-12">
            <p className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
              FOUNDER &amp; CEO
            </p>
            <h3 className="font-display mt-4 text-2xl font-medium tracking-tight">
              Sooraj — visionary. Relationship architect.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The one who sees what is possible and makes others believe it.
              Sooraj is driven by a deep conviction that technology must serve
              human dignity — not just efficiency. From the beginning, his
              philosophy has been simple: build things that actually help
              people, and the business will follow. He leads Comfinity&rsquo;s
              vision, partnerships, and the relationships that hold it all
              together.
            </p>
          </div>
          <div className="glass card-hover rounded-3xl p-10 md:p-12">
            <p className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
              CHIEF TECHNOLOGY OFFICER
            </p>
            <h3 className="font-display mt-4 text-2xl font-medium tracking-tight">
              Ajay — conceptual engineer.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The bridge between vision and technical reality. Ajay brings the
              rare ability to understand both the dream and the architecture
              needed to build it. He translates ambition into engineering
              decisions that hold.
            </p>
          </div>
        </Reveal>
      </section>

      {/* what we're building toward */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="section-label mb-6">What We Are Building Toward</p>
            <TextReveal
              as="h2"
              className="font-display text-3xl font-semibold leading-snug tracking-tight md:text-4xl"
            >
              Success, for us, is not a number. It is a{" "}
              <span className="font-serif-accent text-gradient">state of being.</span>
            </TextReveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
                When Comfinity has become what it was always meant to be: a
                global Technology &amp; Innovation Group that is remembered not
                for its revenue, but for what it built, who it served, and how
                many dreams it helped bring to life.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                Our definition of legacy: to be remembered not as company
                founders, but as people who shaped the future.
              </p>
            </Reveal>
          </div>
          <Reveal stagger={0.08} className="space-y-3 self-center">
            {trustPoints.map((t) => (
              <div
                key={t}
                className="glass flex items-center gap-4 rounded-2xl px-6 py-5"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <p className="text-sm text-foreground">{t}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-20 flex flex-wrap gap-6">
          <Link href="/about/mission" className="link-sweep text-sm font-medium text-accent-soft">
            Learn about our mission and vision →
          </Link>
          <Link href="/about/leadership" className="link-sweep text-sm font-medium text-accent-soft">
            Meet the leadership team →
          </Link>
          <Link href="/about/divisions" className="link-sweep text-sm font-medium text-accent-soft">
            Read about our divisions →
          </Link>
        </Reveal>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
