import type { Metadata } from "next";
import PageHero from "@/app/_components/PageHero";
import TextReveal from "@/app/_components/anim/TextReveal";
import Reveal from "@/app/_components/anim/Reveal";
import CtaBand from "@/app/_components/CtaBand";
import { getLeadership } from "@/lib/team-store";

export const metadata: Metadata = {
  title: "Leadership Team",
  description:
    "Meet the founding team of Comfinity — a group of visionaries, engineers, and builders committed to creating technology that shapes the future.",
};

export default function LeadershipPage() {
  const leaders = getLeadership();

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
          {leaders.map((leader) => (
            <Reveal key={leader.id}>
              <article className="glass card-hover grid gap-10 rounded-3xl p-8 md:grid-cols-[1fr_1.6fr] md:p-14">
                <div>
                  <div
                    className="relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl border border-line p-6"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(79,124,255,0.18), rgba(167,139,250,0.08) 60%, transparent)",
                    }}
                  >
                    {leader.portraitUrl ? (
                      <img
                        src={leader.portraitUrl}
                        alt={leader.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <p className="font-mono text-[10px] tracking-[0.25em] text-muted">
                        PORTRAIT — COMING SOON
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
                    {leader.role}
                  </p>
                  <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                    {leader.name}
                  </h2>
                  {leader.tagline && (
                    <p className="font-serif-accent mt-2 text-lg text-muted">
                      {leader.tagline}
                    </p>
                  )}
                  <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                    {leader.bio}
                  </p>
                  {leader.quote && (
                    <blockquote className="mt-8 border-l-2 border-accent pl-6 text-base leading-relaxed text-foreground md:text-lg">
                      &ldquo;{leader.quote}&rdquo;
                    </blockquote>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
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
