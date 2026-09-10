"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { onPreloaderDone } from "@/lib/preloader";
import Magnetic from "../anim/Magnetic";

const SLIDE_DWELL = 6; // seconds each slide stays before auto-advancing

type Slide = {
  id: string;
  badge: string;
  title: ReactNode;
  body: string;
  ctas: { label: string; href: string; primary?: boolean }[];
};

const slides: Slide[] = [
  {
    id: "comfinity",
    badge: "TECHNOLOGY · INNOVATION · IMPACT",
    title: (
      <>
        Building the <span className="font-serif-accent">future</span> through
        technology &amp; <span className="text-gradient">innovation</span>
      </>
    ),
    body: "Comfinity is a technology & innovation group engineering intelligent products, enterprise solutions, and research ecosystems that create measurable, lasting impact.",
    ctas: [
      { label: "Explore Comfinity", href: "/about/divisions", primary: true },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
  },
  {
    id: "asean-summit",
    badge: "ASEAN SUMMIT · 2026",
    title: (
      <>
        Representing <span className="font-serif-accent">innovation</span> at
        the <span className="text-gradient">ASEAN Summit</span>
      </>
    ),
    body: "Comfinity joins regional leaders, policymakers, and researchers at the ASEAN Summit — showcasing technology built in Southeast Asia, for the world.",
    ctas: [
      { label: "Meet Us There", href: "/contact", primary: true },
      { label: "Our Community", href: "/community" },
    ],
  },
  {
    id: "partners",
    badge: "PARTNERS · COLLABORATIONS",
    title: (
      <>
        Alliances that build the future,{" "}
        <span className="font-serif-accent text-gradient">together</span>
      </>
    ),
    body: "From research institutions to enterprises and governments — we build long-term alliances that turn shared ambition into real-world impact.",
    ctas: [
      { label: "Partner with Us", href: "/partners", primary: true },
      { label: "View Collaborations", href: "/partners" },
    ],
  },
];

import { type HomepageSections } from "@/lib/homepage-store";

export default function Hero({ initialSections }: { initialSections?: HomepageSections }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const goToRef = useRef<(i: number) => void>(null);

  const effectiveSlides: Slide[] =
    initialSections?.hero && initialSections.hero.length > 0
      ? initialSections.hero.map((s, idx) => {
          let titleNode: ReactNode = s.title;
          const low = s.title.toLowerCase();
          if (s.id === "comfinity" && low.includes("future")) {
            titleNode = (
              <>
                Building the <span className="font-serif-accent">future</span> through
                technology &amp; <span className="text-gradient">innovation</span>
              </>
            );
          } else if (s.id === "asean-summit" && low.includes("asean")) {
            titleNode = (
              <>
                Representing <span className="font-serif-accent">innovation</span> at
                the <span className="text-gradient">ASEAN Summit</span>
              </>
            );
          } else if (s.id === "partners" && low.includes("together")) {
            titleNode = (
              <>
                Alliances that build the future,{" "}
                <span className="font-serif-accent text-gradient">together</span>
              </>
            );
          } else {
            const words = s.title.split(" ");
            if (words.length > 2) {
              const main = words.slice(0, -1).join(" ");
              const last = words[words.length - 1];
              titleNode = (
                <>
                  {main} <span className="font-serif-accent text-gradient">{last}</span>
                </>
              );
            }
          }

          const ctas = [];
          if (s.ctaPrimaryLabel) {
            ctas.push({ label: s.ctaPrimaryLabel, href: s.ctaPrimaryHref || "/about/divisions", primary: true });
          }
          if (s.ctaSecondaryLabel) {
            ctas.push({ label: s.ctaSecondaryLabel, href: s.ctaSecondaryHref || "/contact", primary: false });
          }

          return {
            id: s.id,
            badge: s.badge,
            title: titleNode,
            body: s.body,
            ctas: ctas.length > 0 ? ctas : (slides[idx]?.ctas || []),
          };
        })
      : slides;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const slideEls = gsap.utils.toArray<HTMLElement>("[data-hero-slide]");
      gsap.set(slideEls.slice(1), { autoAlpha: 0 });

      /* ----- carousel: right-to-left, infinite ----- */
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      let current = 0;
      let cycle: gsap.core.Tween | null = null;

      const schedule = () => {
        cycle?.kill();
        if (!reduced) cycle = gsap.delayedCall(SLIDE_DWELL, () => goTo(current + 1));
      };

      const goTo = (i: number) => {
        const next = ((i % slideEls.length) + slideEls.length) % slideEls.length;
        if (next === current) return;
        const out = slideEls[current];
        const inn = slideEls[next];
        gsap
          .timeline()
          .to(out, { x: -90, autoAlpha: 0, duration: 0.75, ease: "power2.in" })
          .fromTo(
            inn,
            { x: 90, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.95, ease: "power3.out" },
            "-=0.2"
          )
          .set(out, { x: 0 });
        current = next;
        setActive(next);
        schedule();
      };
      goToRef.current = goTo;

      /* ----- intro (first slide only, gated behind preloader) ----- */
      const first = slideEls[0];
      const tl = gsap.timeline({ paused: true, delay: 0.1 });
      onPreloaderDone(() => {
        tl.play();
        schedule();
      });

      tl.from(first.querySelector("[data-hero-badge]"), {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
      });

      const split = SplitText.create(first.querySelector("[data-hero-title]"), {
        type: "lines,words",
        linesClass: "line",
      });
      tl.from(
        split.words,
        {
          yPercent: 118,
          duration: 1.25,
          stagger: 0.05,
          ease: "power4.out",
        },
        "-=0.4"
      );

      tl.from(
        [
          ...first.querySelectorAll("[data-hero-sub], [data-hero-cta]"),
          el.querySelector("[data-hero-dots]"),
          el.querySelector("[data-hero-sponsors]"),
        ],
        { y: 32, autoAlpha: 0, duration: 1, stagger: 0.12 },
        "-=0.7"
      );

      tl.from("[data-hero-scroll]", { autoAlpha: 0, duration: 1 }, "-=0.5");

      // slow drift on the orbs
      gsap.to("[data-orb-1]", {
        xPercent: 12,
        yPercent: -8,
        duration: 14,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to("[data-orb-2]", {
        xPercent: -10,
        yPercent: 10,
        duration: 18,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // hero content fades slightly as you scroll away
      gsap.to("[data-hero-inner]", {
        autoAlpha: 0.15,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom 40%",
          scrub: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-16"
    >
      {/* background field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          data-orb-1
          className="absolute -top-[15%] left-1/2 h-[42rem] w-[42rem] -translate-x-[70%] rounded-full opacity-25 blur-[130px]"
          style={{ background: "radial-gradient(closest-side, #4f7cff, transparent)" }}
        />
        <div
          data-orb-2
          className="absolute right-[-10%] top-[30%] h-[36rem] w-[36rem] rounded-full opacity-20 blur-[130px]"
          style={{ background: "radial-gradient(closest-side, #a78bfa, transparent)" }}
        />
        {/* grid lines */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* carousel content */}
      <div
        data-hero-inner
        className="relative z-20 mx-auto w-full max-w-6xl px-6 text-center"
      >
        <div className="grid">
          {effectiveSlides.map((s, i) => (
            <div
              key={s.id}
              data-hero-slide
              aria-hidden={active !== i}
              className="col-start-1 row-start-1 flex flex-col items-center justify-center"
            >
              <div
                data-hero-badge
                className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-line px-4 py-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[11px] tracking-[0.28em] text-muted">
                  {s.badge}
                </span>
              </div>

              {i === 0 ? (
                <h1
                  data-hero-title
                  className="split-parent font-display mx-auto max-w-5xl text-balance text-[2.75rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl lg:leading-[1.04]"
                >
                  {s.title}
                </h1>
              ) : (
                <p
                  data-hero-title
                  className="font-display mx-auto max-w-5xl text-balance text-[2.75rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl lg:leading-[1.04]"
                >
                  {s.title}
                </p>
              )}

              <p
                data-hero-sub
                className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg"
              >
                {s.body}
              </p>

              <div
                data-hero-cta
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                {s.ctas.map((cta) => (
                  <Magnetic key={cta.label}>
                    <Link
                      href={cta.href}
                      tabIndex={active === i ? undefined : -1}
                      className={cta.primary ? "btn-primary" : "btn-ghost"}
                    >
                      {cta.label}
                      {cta.primary && <span aria-hidden>→</span>}
                    </Link>
                  </Magnetic>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* slide indicators */}
        <div
          data-hero-dots
          className="mt-12 flex items-center justify-center gap-2.5"
        >
          {effectiveSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active === i}
              onClick={() => goToRef.current?.(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                active === i
                  ? "w-8 bg-accent"
                  : "w-3 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* sponsors & technology partner */}
        <div
          data-hero-sponsors
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          <span className="font-mono text-[10px] tracking-[0.28em] text-muted">
            SPONSORS
          </span>
          <Image
            src="/sponsors/gates-dark.png"
            alt="GATES logo"
            width={700}
            height={156}
            className="logo-dark h-7 w-auto md:h-8"
          />
          <Image
            src="/sponsors/gates.png"
            alt="GATES logo"
            width={700}
            height={156}
            className="logo-light h-7 w-auto md:h-8"
          />
          <span className="flex items-center gap-2.5">
            <Image
              src="/sponsors/iitm.png"
              alt="IIT Madras logo"
              width={317}
              height={316}
              className="h-8 w-auto md:h-9"
            />
            <span className="font-display whitespace-nowrap text-base font-semibold tracking-tight text-foreground/90">
              IIT Madras
            </span>
          </span>
          <span aria-hidden className="hidden h-5 w-px bg-foreground/15 sm:block" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-muted">
            TECHNOLOGY PARTNER
          </span>
          <a
            href="https://thegr8labs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display whitespace-nowrap text-base font-semibold tracking-tight text-foreground/90 transition-colors duration-300 hover:text-foreground"
          >
            thegr8labs
          </a>
        </div>
      </div>

      {/* announce strip */}
      {(!initialSections?.announcement || initialSections.announcement.enabled) && (
        <div
          data-hero-scroll
          className="absolute inset-x-0 bottom-0 z-20 border-t border-line bg-background/50 backdrop-blur-md"
        >
          <Link
            href={initialSections?.announcement?.ctaHref || "/labs"}
            className="group mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-6 py-4 md:px-10"
          >
            <p className="text-sm text-muted">
              <span className="mr-3 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-accent-soft">
                {initialSections?.announcement?.label || "NEW"}
              </span>
              {initialSections?.announcement?.heading ? (
                <>
                  <strong className="text-foreground font-medium">{initialSections.announcement.heading}</strong>
                  {initialSections.announcement.description && ` — ${initialSections.announcement.description}`}
                </>
              ) : (
                initialSections?.announcement?.description || "Comfinity Innovation Labs is now open — submit your idea and join the ecosystem."
              )}
            </p>
            <span className="shrink-0 text-sm text-accent-soft transition-transform group-hover:translate-x-1">
              {initialSections?.announcement?.ctaLabel ? `${initialSections.announcement.ctaLabel} →` : "Learn more →"}
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
