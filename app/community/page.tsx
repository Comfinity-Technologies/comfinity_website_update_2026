import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/_components/PageHero";
import TextReveal from "@/app/_components/anim/TextReveal";
import Reveal from "@/app/_components/anim/Reveal";
import CtaBand from "@/app/_components/CtaBand";
import { getCommunityData } from "@/lib/community-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Community — A Place for Builders and Dreamers",
  description:
    "Join the Comfinity Community — a global ecosystem of students, researchers, startup founders, and changemakers building with purpose.",
};

const fallbackPrograms = [
  {
    id: "ambassador",
    t: "Student Ambassador Program",
    d: "University students who carry the Comfinity mission to their campuses. Ambassadors organize events, run innovation challenges, and create bridges between student ideas and professional execution.",
    items: [
      "Exclusive training and mentorship from the Comfinity team",
      "Access to the Labs ecosystem and innovation network",
      "Recognition as a Comfinity representative at your institution",
      "Priority access to internships and research opportunities",
    ],
  },
  {
    id: "startup",
    t: "Startup Community",
    d: "A curated network for early-stage founders who are building with purpose. Members share challenges, collaborate on problems, access mentorship, and find early users in each other.",
  },
  {
    id: "challenges",
    t: "Innovation Challenges",
    d: "Periodic public challenges that invite the community to solve real problems — with prizes, recognition, and the possibility of joining a funded Labs project.",
  },
  {
    id: "events",
    t: "Events",
    d: "Comfinity hosts and participates in events designed to convene builders, thinkers, researchers, and decision-makers. From campus workshops to ASEAN-level conferences.",
  },
  {
    id: "newsletter",
    t: "The Comfinity Dispatch",
    d: "A curated newsletter covering technology trends, innovation ecosystem updates, research highlights, and community stories. Written by the team for people who want signal, not noise.",
  },
  {
    id: "helping-hands",
    t: "Helping Hands",
    d: "The community arm of the Foundation — where members can volunteer, contribute, and engage with Comfinity's social commitment programs. Every member has the opportunity to participate in our mission.",
  },
];

const fallbackValues = [
  "We build each other up — not over each other",
  "We share knowledge freely",
  "We welcome the overlooked and the underestimated",
  "We celebrate attempts, not just successes",
  "We hold each other accountable to the mission",
];

export default function CommunityPage() {
  const data = getCommunityData();
  const livePrograms =
    data.programs && data.programs.length > 0
      ? data.programs.map((p) => ({ id: p.id, t: p.title, d: p.desc, items: p.items }))
      : fallbackPrograms;
  const liveValues = data.values && data.values.length > 0 ? data.values : fallbackValues;
  return (
    <main>
      <PageHero
        label="Community"
        title={
          <>
            A community built by builders,{" "}
            <span className="font-serif-accent text-gradient">for builders.</span>
          </>
        }
        body="The Comfinity Community is not a mailing list or a Discord server. It is a living ecosystem of students, founders, researchers, developers, and changemakers who believe that technology can — and should — do more good than harm."
      >
        <div className="mt-10">
          <Link href="/contact" className="btn-primary">
            Join the Community
          </Link>
        </div>
      </PageHero>

      {/* programs */}
      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
        <p className="section-label mb-6">Community Programs</p>
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Six ways{" "}
          <span className="font-serif-accent text-gradient">in.</span>
        </TextReveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {livePrograms.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <article
                id={p.id}
                className="glass card-hover h-full scroll-mt-24 rounded-3xl p-8 md:p-12"
              >
                <p className="font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-4 text-2xl font-medium tracking-tight">
                  {p.t}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{p.d}</p>
                {p.items && (
                  <ul className="mt-8 space-y-3 border-t border-line pt-6">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-soft" />
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* values */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
          <p className="section-label mb-6 text-center">Community Values</p>
          <TextReveal
            as="h2"
            className="font-display mx-auto max-w-2xl text-center text-4xl font-semibold tracking-tight md:text-5xl"
          >
            How we treat{" "}
            <span className="font-serif-accent text-gradient">each other.</span>
          </TextReveal>
          <Reveal stagger={0.08} className="mx-auto mt-16 max-w-3xl space-y-4">
            {liveValues.map((v) => (
              <div key={v} className="glass card-hover rounded-2xl px-8 py-6">
                <p className="text-base leading-relaxed text-foreground md:text-lg">
                  {v}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
