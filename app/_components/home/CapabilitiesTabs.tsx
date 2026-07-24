"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import TextReveal from "../anim/TextReveal";
import Reveal from "../anim/Reveal";

const tabs = [
  {
    id: "ai",
    label: "AI & Software",
    desc: "Intelligent automation, custom AI agents, and enterprise platforms engineered to think with your organization.",
    points: ["Custom AI agents", "Enterprise platforms", "Process automation"],
  },
  {
    id: "hardware",
    label: "Electronics & Hardware",
    desc: "Smart device engineering, embedded systems, and IoT solutions that bridge intelligence and the physical world.",
    points: ["Embedded systems", "IoT architecture", "Smart devices"],
  },
  {
    id: "labs",
    label: "Research & Innovation",
    desc: "Frontier technology research, rapid prototyping, and open experiments inside the Comfinity Labs ecosystem.",
    points: ["Applied research", "Prototyping", "Open innovation"],
  },
  {
    id: "products",
    label: "Products",
    desc: "Purpose-built software products for businesses and developers — conceived in the Labs, industrialized by engineering.",
    points: ["SaaS platforms", "Developer tools", "Business apps"],
  },
  {
    id: "community",
    label: "Community",
    desc: "Student ambassadors, a startup network, and a knowledge ecosystem for people building what comes next.",
    points: ["Student ambassadors", "Startup network", "Knowledge hub"],
  },
  {
    id: "foundation",
    label: "Foundation",
    desc: "Social programs, education access, and community impact — 20% of profits dedicated to Helping Hands.",
    points: ["Education access", "Tech equity", "Community impact"],
  },
];

export default function CapabilitiesTabs() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!panelRef.current) return;
      gsap.fromTo(
        panelRef.current.children,
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }
      );
    },
    { dependencies: [active], scope: panelRef }
  );

  const tab = tabs[active];

  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
        <p className="section-label mb-6">Platform Capabilities</p>
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Every layer of intelligent technology,{" "}
          <span className="font-serif-accent text-gradient">under one roof.</span>
        </TextReveal>

        <Reveal className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <ul className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-0">
            {tabs.map((t, i) => (
              <li key={t.id}>
                <button
                  onClick={() => setActive(i)}
                  className={`group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors lg:py-4 ${
                    i === active
                      ? "bg-wash text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <span
                    className={`hidden h-px w-6 transition-all lg:block ${
                      i === active ? "bg-accent-soft" : "bg-line-strong group-hover:w-8"
                    }`}
                  />
                  <span className="font-display text-lg font-medium tracking-tight md:text-xl">
                    {t.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div
            ref={panelRef}
            className="glass flex min-h-72 flex-col justify-between rounded-3xl p-8 md:p-12"
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
                {String(active + 1).padStart(2, "0")} / {tab.label.toUpperCase()}
              </p>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-foreground md:text-xl">
                {tab.desc}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {tab.points.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-line px-4 py-1.5 text-xs text-muted"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
