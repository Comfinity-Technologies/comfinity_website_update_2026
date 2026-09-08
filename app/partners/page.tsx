import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/_components/PageHero";
import TextReveal from "@/app/_components/anim/TextReveal";
import Reveal from "@/app/_components/anim/Reveal";
import CtaBand from "@/app/_components/CtaBand";
import LogoCarousel from "@/app/_components/LogoCarousel";
import { getPartnersData } from "@/lib/partners-store";

export const metadata: Metadata = {
  title: "Partner with Comfinity | Build the Future Together",
  description:
    "Comfinity welcomes strategic partnerships with research institutions, enterprises, government agencies, universities, and impact investors. Join the ecosystem.",
};

const whyPoints = [
  "Access to a Technology & Innovation Group with capabilities across AI, hardware, research, and product",
  "A team that thinks in decades, not quarters",
  "Genuine innovation infrastructure — not an agency",
  "ASEAN presence with global network ambitions",
  "A company built on integrity — 20% social commitment",
  "Early-stage partnership = long-term strategic relationship",
];

const fallbackTypes = [
  {
    t: "Research Collaboration",
    d: "Partner with Comfinity Labs to co-develop research programs, access a diverse innovation talent pool, and translate academic findings into applied technologies. Ideal for universities, research institutes, and government science bodies.",
    items: [
      "Joint research program design",
      "Faculty and student researcher access",
      "Co-authorship on publications",
      "Access to Labs infrastructure and ecosystem",
    ],
  },
  {
    t: "Enterprise Collaboration",
    d: "We partner with enterprises to deliver technology transformation — and to bring enterprise problems into the Labs ecosystem for collaborative solution design. Ideal for companies with complex transformation challenges or innovation mandates.",
    items: [
      "Multi-year technology partnership",
      "Innovation sprint access",
      "Joint product development",
      "Technology advisory and strategy",
    ],
  },
  {
    t: "Government Engagement",
    d: "Comfinity works with government agencies and public institutions to deliver citizen-serving technology, support national innovation programs, and contribute to digital transformation policy. We understand regulatory environments and public accountability.",
    items: [
      "Digital public services development",
      "Innovation policy advisory",
      "National capacity-building programs",
      "Smart city and digital infrastructure consulting",
    ],
  },
  {
    t: "Academic Partnership",
    d: "For universities that want to connect their students and faculty to real-world innovation challenges — and build pathways from research to commercial application.",
    items: [
      "Student Ambassador Program integration",
      "Research collaboration access",
      "Industry mentorship for students",
      "Joint curriculum development",
    ],
  },
];

const fallbackSponsorships = [
  { t: "Innovation Sponsor", d: "Fund a technology domain or research program" },
  { t: "Challenge Sponsor", d: "Fund a specific innovation challenge with defined outcomes" },
  { t: "Fellowship Sponsor", d: "Support researchers through an Innovation or Research Fellowship" },
  { t: "Event Sponsor", d: "Gain visibility at Comfinity-hosted events and conferences" },
];

const aseanPoints = [
  "ASEAN government partnerships for digital transformation initiatives",
  "Regional academic collaborations with SEA universities",
  "International grant applications aligned with ASEAN SDG priorities",
  "Representation at regional technology and innovation forums",
  "Global research network membership",
];

export default function PartnersPage() {
  const data = getPartnersData();
  const liveTypes =
    data.types && data.types.length > 0
      ? data.types.map((t) => ({ t: t.title, d: t.desc, items: t.items || [] }))
      : fallbackTypes;
  const liveSponsorships =
    data.sponsorships && data.sponsorships.length > 0
      ? data.sponsorships.map((s) => ({ t: s.title, d: s.desc }))
      : fallbackSponsorships;
  return (
    <main>
      <PageHero
        label="Partners & Collaboration"
        title={
          <>
            Build the future{" "}
            <span className="font-serif-accent text-gradient">with us.</span>
          </>
        }
        body="Comfinity does not collect partners. We build alliances — with organizations that share our conviction that technology must serve more than profit. If you are a research institution, enterprise, government body, investor, or mission-aligned organization, we want to work with you."
      >
        <div className="mt-10">
          <Link href="/contact" className="btn-primary">
            Start the Conversation
          </Link>
        </div>
      </PageHero>

      {/* why */}
      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
        <p className="section-label mb-6">Why Partner with Comfinity?</p>
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          An alliance, not a{" "}
          <span className="font-serif-accent text-gradient">vendor list.</span>
        </TextReveal>
        <Reveal stagger={0.06} className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((w) => (
            <div key={w} className="glass card-hover flex items-start gap-4 rounded-2xl p-7">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <p className="text-sm leading-relaxed text-foreground">{w}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* partner & sponsor logos */}
      <section className="border-t border-line py-16">
        <p className="section-label mb-10 text-center">
          Partners &amp; Sponsors
        </p>
        <LogoCarousel duration="32s" />
      </section>

      {/* partnership types */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
          <p className="section-label mb-6">Partnership Types</p>
          <TextReveal
            as="h2"
            className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Four ways to{" "}
            <span className="font-serif-accent text-gradient">work together.</span>
          </TextReveal>
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {liveTypes.map((ty, i) => (
              <Reveal key={ty.t} delay={(i % 2) * 0.08}>
                <article className="glass card-hover flex h-full flex-col rounded-3xl p-8 md:p-12">
                  <p className="font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-4 text-2xl font-medium tracking-tight md:text-3xl">
                    {ty.t}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{ty.d}</p>
                  <ul className="mt-8 space-y-3 border-t border-line pt-6">
                    {ty.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-soft" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex justify-end pt-8">
                    <Link href="/contact" className="btn-primary !px-6 !py-3 !text-sm">
                      Connect <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* sponsor */}
      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
        <p className="section-label mb-6">Sponsor Innovation</p>
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Fund innovation that{" "}
          <span className="font-serif-accent text-gradient">matters.</span>
        </TextReveal>
        <Reveal>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            Corporate sponsors of Comfinity Labs gain naming rights on research
            programs, visibility in the innovation ecosystem, and first-access
            to emerging technologies developed by the community.
          </p>
        </Reveal>
        <Reveal stagger={0.07} className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {liveSponsorships.map((s) => (
            <div key={s.t} className="group bg-background p-8 transition-colors duration-500 hover:bg-surface-2">
              <h3 className="font-display text-lg font-medium tracking-tight transition-colors group-hover:text-accent-soft">
                {s.t}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* investors + ASEAN */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[90rem] gap-16 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-2">
          <Reveal className="glass rounded-3xl p-10 md:p-14">
            <p className="section-label mb-6">Investor Relations</p>
            <h2 className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">
              Patient capital for a{" "}
              <span className="font-serif-accent text-gradient">
                technology group
              </span>{" "}
              — not a startup flip.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Comfinity is building for the long term. We are open to
              conversations with patient, mission-aligned investors who
              understand the value of building a technology group. Investment
              philosophy: long-term, mission-aligned, value-creating. Contact
              the founding team directly for investor conversations.
            </p>
            <Link href="/contact" className="link-sweep mt-8 inline-block text-sm font-medium text-accent-soft">
              Contact the founding team →
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="section-label mb-6">ASEAN & International Presence</p>
            <h2 className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">
              Headquartered in India, positioned for the{" "}
              <span className="font-serif-accent text-gradient">
                ASEAN ecosystem.
              </span>
            </h2>
            <ul className="mt-8 space-y-4">
              {aseanPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-soft" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-muted">
              Comfinity actively participates in ASEAN-level technology and
              innovation forums — and is building toward hosting Comfinity-led
              events that convene regional innovators, policymakers, and
              researchers.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
