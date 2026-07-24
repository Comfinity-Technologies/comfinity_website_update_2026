import type { Metadata } from "next";
import PageHero from "@/app/_components/PageHero";
import TextReveal from "@/app/_components/anim/TextReveal";
import Reveal from "@/app/_components/anim/Reveal";
import CtaBand from "@/app/_components/CtaBand";

export const metadata: Metadata = {
  title: "Leadership Team",
  description:
    "Meet the founding team of Comfinity — a group of visionaries, engineers, and builders committed to creating technology that shapes the future.",
};

export default function LeadershipPage() {
  return (
    <main>
      <PageHero
        label="Leadership"
        title={
          <>
            Leadership is a{" "}
            <span className="font-serif-accent text-gradient">responsibility</span>,
            not a title.
          </>
        }
        body="Comfinity is led by people who believe that leadership is a responsibility, not a title. Our leadership team is small, deliberate, and deeply invested in the mission — not just the business."
      />

      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
        <div className="space-y-6">
          {/* CEO */}
          <Reveal>
            <article className="glass card-hover grid gap-10 rounded-3xl p-8 md:grid-cols-[1fr_1.6fr] md:p-14">
              <div>
                <div
                  className="flex aspect-[4/5] items-end rounded-2xl border border-line p-6"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(79,124,255,0.18), rgba(167,139,250,0.08) 60%, transparent)",
                  }}
                >
                  <p className="font-mono text-[10px] tracking-[0.25em] text-muted">
                    PORTRAIT — COMING SOON
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
                  FOUNDER &amp; CHIEF EXECUTIVE OFFICER
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  Sooraj Sudevan
                </h2>
                <p className="font-serif-accent mt-2 text-lg text-muted">
                  Visionary. Builder. Believer in Dreamers.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                  The founding architect of Comfinity&rsquo;s vision. Driven by
                  a belief that technology must serve human dignity — and that
                  the world&rsquo;s best ideas often come from people who have
                  been told &ldquo;no.&rdquo; Before founding Comfinity, he
                  spent years experimenting with technology, building
                  relationships, and learning what it means to have your dreams
                  dismissed — and then keep going anyway. He oversees strategy,
                  vision, business development, and the human culture of the
                  company.
                </p>
                <blockquote className="mt-8 border-l-2 border-accent pl-6 text-base leading-relaxed text-foreground md:text-lg">
                  &ldquo;We did not build Comfinity to become successful. We
                  built it because the world needed this — and we were the ones
                  willing to try.&rdquo;
                </blockquote>
              </div>
            </article>
          </Reveal>

          {/* CTO */}
          <Reveal>
            <article className="glass card-hover grid gap-10 rounded-3xl p-8 md:grid-cols-[1fr_1.6fr] md:p-14">
              <div>
                <div
                  className="flex aspect-[4/5] items-end rounded-2xl border border-line p-6"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(167,139,250,0.16), rgba(79,124,255,0.08) 60%, transparent)",
                  }}
                >
                  <p className="font-mono text-[10px] tracking-[0.25em] text-muted">
                    PORTRAIT — COMING SOON
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
                  CO-FOUNDER &amp; CHIEF TECHNOLOGY OFFICER
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  Ajay Krishna
                </h2>
                <p className="font-serif-accent mt-2 text-lg text-muted">
                  The Engineer of Ideas. The Architect of Systems.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                  Ajay is the conceptual and technical backbone of Comfinity.
                  He translates the founder&rsquo;s vision into engineering
                  decisions — creating the bridge between what is imagined and
                  what can be built. A quiet, focused thinker with deep
                  technical capability and genuine belief in the
                  company&rsquo;s mission.
                </p>
                <blockquote className="mt-8 border-l-2 border-accent pl-6 text-base leading-relaxed text-foreground md:text-lg">
                  &ldquo;Technology is a language. What matters is what you
                  choose to say with it.&rdquo;
                </blockquote>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* advisory */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[90rem] px-6 py-28 text-center md:px-10 md:py-36">
          <p className="section-label mb-6">Advisory Board</p>
          <TextReveal
            as="h2"
            className="font-display mx-auto max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Building a board that opens{" "}
            <span className="font-serif-accent text-gradient">
              international doors.
            </span>
          </TextReveal>
          <Reveal>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              Comfinity is actively building an advisory board of recognized
              practitioners, researchers, and leaders across technology,
              policy, and innovation to guide strategic decisions and open
              international doors.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
