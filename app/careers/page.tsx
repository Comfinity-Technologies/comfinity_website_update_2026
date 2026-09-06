import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/_components/PageHero";
import TextReveal from "@/app/_components/anim/TextReveal";
import Reveal from "@/app/_components/anim/Reveal";
import CtaBand from "@/app/_components/CtaBand";
import { readCareers } from "@/app/admin/(dashboard)/careers/_helpers";

export const metadata: Metadata = {
  title: "Careers — Join the Team Building the Future",
  description:
    "Join Comfinity — a Technology & Innovation Group where your work means something beyond output. Explore open roles and student programs.",
};

export default function CareersPage() {
  const { lookingFor, offers, studentPrograms } = readCareers();

  return (
    <main>
      <PageHero
        label="Careers & Internships"
        title={
          <>
            We are looking for people who believe in what{" "}
            <span className="font-serif-accent text-gradient">
              cannot yet be proven.
            </span>
          </>
        }
        body="Comfinity is not for everyone. It is for people who find conventional career paths too small — who want their work to mean something beyond output. We are building something that will matter. And we want to build it with people who understand why that matters."
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#students" className="btn-primary">
            Explore Internships
          </a>
        </div>
      </PageHero>

      {/* who + what we offer */}
      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="section-label mb-6">Who We Are Looking For</p>
            <TextReveal
              as="h2"
              className="font-display text-3xl font-semibold leading-snug tracking-tight md:text-4xl"
            >
              Curiosity first.{" "}
              <span className="font-serif-accent text-gradient">Always.</span>
            </TextReveal>
            <Reveal stagger={0.07} className="mt-10 space-y-3">
              {lookingFor.map((l) => (
                <div key={l} className="glass flex items-center gap-4 rounded-2xl px-6 py-5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <p className="text-sm text-foreground">{l}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <div>
            <p className="section-label mb-6">What We Offer</p>
            <TextReveal
              as="h2"
              className="font-display text-3xl font-semibold leading-snug tracking-tight md:text-4xl"
            >
              Work that{" "}
              <span className="font-serif-accent text-gradient">compounds.</span>
            </TextReveal>
            <Reveal stagger={0.06} className="mt-10 grid gap-3 sm:grid-cols-2">
              {offers.map((o) => (
                <div key={o.t} className="glass card-hover rounded-2xl p-6">
                  <h3 className="font-display text-base font-medium tracking-tight">
                    {o.t}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{o.d}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* student programs */}
      <section id="students" className="mx-auto max-w-[90rem] scroll-mt-24 border-t border-line px-6 py-28 md:px-10 md:py-36">
        <p className="section-label mb-6">Student Programs & Internships</p>
        <TextReveal
          as="h2"
          className="font-display max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          The best talent in the world is sitting in a{" "}
          <span className="font-serif-accent text-gradient">classroom right now.</span>
        </TextReveal>
        <Reveal>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            Our internship and student programs are designed to give students
            real work — not coffee runs and slide decks.
          </p>
        </Reveal>
        <Reveal stagger={0.07} className="mt-14 grid gap-6 md:grid-cols-2">
          {studentPrograms.map((p, i) => (
            <div key={p.t} className="glass card-hover rounded-3xl p-8 md:p-10">
              <p className="font-mono text-xs text-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-4 text-xl font-medium tracking-tight">
                {p.t}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.d}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-12">
          <Link href="/contact" className="btn-primary">
            Connect <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </section>

      {/* how to apply */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[90rem] px-6 py-28 text-center md:px-10 md:py-36">
          <p className="section-label mb-6">How to Apply</p>
          <TextReveal
            as="h2"
            className="font-display mx-auto max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Every application is read by a{" "}
            <span className="font-serif-accent text-gradient">human.</span>
          </TextReveal>
          <Reveal>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              We review applications carefully and personally. We do not use
              automated screening. Tell us about something you built, solved,
              or questioned — and share what you believe Comfinity is building,
              and why you want to be part of it.
            </p>
            <Link href="/contact" className="btn-primary mt-10">
              Apply Now <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
