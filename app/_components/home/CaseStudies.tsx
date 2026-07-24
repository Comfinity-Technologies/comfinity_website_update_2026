"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { horizontalLoop, type LoopTimeline } from "@/lib/horizontalLoop";
import TextReveal from "../anim/TextReveal";

const studies = [
  {
    tag: "AI Automation",
    title: "AI Automation for SME Operations",
    result: "Reduced manual processing time by 70% for a mid-size logistics firm.",
    metric: "−70%",
    metricLabel: "manual processing",
  },
  {
    tag: "Enterprise",
    title: "Enterprise ERP Modernization",
    result: "Migrated a 5-year-old legacy system to AI-native architecture.",
    metric: "AI-native",
    metricLabel: "architecture",
  },
  {
    tag: "Research",
    title: "Research Lab Platform",
    result: "Built collaborative research infrastructure for an innovation ecosystem.",
    metric: "12+",
    metricLabel: "domains connected",
  },
  {
    tag: "IoT",
    title: "IoT Fleet Management",
    result: "Connected hardware solution for real-time asset tracking.",
    metric: "Real-time",
    metricLabel: "asset telemetry",
  },
  {
    tag: "Community",
    title: "Student Ambassador Network",
    result: "Launched a 3-country university community program in 4 months.",
    metric: "3",
    metricLabel: "countries in 4 months",
  },
  {
    tag: "Government",
    title: "Government Digital Initiative",
    result: "Delivered a citizen-facing digital platform for a local authority.",
    metric: "Public",
    metricLabel: "digital service",
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let loop: LoopTimeline | undefined;

        const build = () => {
          loop?.draggable?.kill();
          loop?.kill();
          const cards = gsap.utils.toArray<HTMLElement>(track.children);
          gsap.set(cards, { clearProps: "x,xPercent" });
          loop = horizontalLoop(cards, {
            repeat: -1,
            speed: 0.55,
            draggable: true,
            paddingRight: 24, // matches the track's gap-6
          });
        };
        build();

        let timer: ReturnType<typeof setTimeout>;
        const onResize = () => {
          clearTimeout(timer);
          timer = setTimeout(build, 200);
        };
        window.addEventListener("resize", onResize);

        return () => {
          clearTimeout(timer);
          window.removeEventListener("resize", onResize);
          loop?.draggable?.kill();
          loop?.kill();
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-y border-line bg-surface py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-10">
        <p className="section-label mb-6">Selected Work</p>
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Outcomes, not{" "}
          <span className="font-serif-accent text-gradient">deliverables.</span>
        </TextReveal>
      </div>

      <div className="mt-16 overflow-hidden mask-fade-x">
        <div
          ref={trackRef}
          className="flex w-max cursor-grab select-none items-stretch gap-6 pl-6 active:cursor-grabbing motion-reduce:w-auto motion-reduce:overflow-x-auto"
        >
          {[...studies, ...studies].map((s, i) => (
            <article
              key={`${s.title}-${i}`}
              aria-hidden={i >= studies.length || undefined}
              className="glass card-hover group relative flex h-[24rem] w-[19rem] shrink-0 flex-col justify-between rounded-3xl p-8 md:w-[24rem] lg:h-[26rem] lg:w-[26rem]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-muted">
                  {s.tag.toUpperCase()}
                </span>
                <span className="font-mono text-xs text-faint">
                  {String((i % studies.length) + 1).padStart(2, "0")} / 06
                </span>
              </div>
              <div className="mt-10">
                <p className="font-display text-4xl font-semibold text-gradient">
                  {s.metric}
                </p>
                <p className="mt-1 font-mono text-[11px] tracking-[0.15em] text-faint">
                  {s.metricLabel.toUpperCase()}
                </p>
              </div>
              <div className="mt-10">
                <h3 className="font-display text-xl font-medium tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.result}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
