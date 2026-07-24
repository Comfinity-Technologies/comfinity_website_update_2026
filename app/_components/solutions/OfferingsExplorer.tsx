"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, ScrollSmoother, useGSAP } from "@/lib/gsap";

export type Offering = {
  id: string;
  title: string;
  desc: string;
  items: string[];
};

/**
 * Guided navigation for the service categories: pinned side nav with
 * scrollspy on desktop, pinned horizontal tab bar on tablet/mobile.
 * (Pinning via ScrollTrigger — position:sticky doesn't survive inside
 * the ScrollSmoother-transformed content.)
 */
export default function OfferingsExplorer({
  offerings,
}: {
  offerings: Offering[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(offerings[0]?.id);

  // keep the active pill visible in the mobile tab strip
  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = window.matchMedia("(min-width: 1024px)").matches ? 120 : 136;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(el, true, `top ${offset}px`);
    } else {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  };

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const list = root.querySelector<HTMLElement>("[data-offerings-list]");
      const sideNav = root.querySelector<HTMLElement>("[data-offerings-nav]");
      const tabBar = root.querySelector<HTMLElement>("[data-offerings-tabs]");
      if (!list) return;

      // scrollspy — highlight the category in view
      gsap.utils
        .toArray<HTMLElement>("[data-offering-section]", root)
        .forEach((sec) => {
          ScrollTrigger.create({
            trigger: sec,
            start: "top 45%",
            end: "bottom 45%",
            onToggle: (self) => self.isActive && setActive(sec.id),
          });
        });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!sideNav) return;
        ScrollTrigger.create({
          trigger: list,
          start: "top 120px",
          end: () => `bottom ${140 + sideNav.offsetHeight}px`,
          pin: sideNav,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      mm.add("(max-width: 1023px)", () => {
        if (!tabBar) return;
        ScrollTrigger.create({
          trigger: tabBar,
          start: "top 64px",
          endTrigger: list,
          end: () => `bottom ${180 + tabBar.offsetHeight}px`,
          pin: tabBar,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="mt-16">
      {/* tablet / mobile: pinned tab bar */}
      <div
        data-offerings-tabs
        className="z-30 -mx-6 mb-10 bg-background/85 backdrop-blur-md md:-mx-10 lg:hidden"
      >
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-line px-6 py-3 md:px-10">
          {offerings.map((o, i) => (
            <button
              key={o.id}
              type="button"
              ref={(el) => {
                tabRefs.current[o.id] = el;
              }}
              onClick={() => scrollToSection(o.id)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[11px] tracking-wider transition-colors duration-300 ${
                active === o.id
                  ? "border-accent/60 bg-accent/15 text-accent-soft"
                  : "border-line text-muted hover:text-foreground"
              }`}
            >
              {String(i + 1).padStart(2, "0")} · {o.title}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-14">
        {/* desktop: pinned side nav with scrollspy */}
        <div className="hidden lg:block">
          <nav
            data-offerings-nav
            aria-label="Service categories"
            className="w-[280px]"
          >
            <p className="section-label mb-5 px-4">Categories</p>
            <div className="space-y-1">
              {offerings.map((o, i) => {
                const isActive = active === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => scrollToSection(o.id)}
                    aria-current={isActive}
                    className={`group flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-colors duration-300 ${
                      isActive
                        ? "bg-wash text-foreground"
                        : "text-muted hover:bg-wash/60 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`h-5 w-0.5 shrink-0 rounded-full transition-colors duration-300 ${
                        isActive ? "bg-accent" : "bg-line-strong"
                      }`}
                    />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium leading-snug">
                      {o.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* category sections */}
        <div data-offerings-list className="space-y-6">
          {offerings.map((o, i) => (
            <article
              key={o.id}
              id={o.id}
              data-offering-section
              className="glass card-hover rounded-3xl p-8 md:p-12"
            >
              <p className="font-mono text-xs text-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-4 text-2xl font-medium tracking-tight md:text-3xl">
                {o.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                {o.desc}
              </p>
              <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-line pt-6 sm:grid-cols-2">
                {o.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-3 text-sm text-muted"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-soft" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
