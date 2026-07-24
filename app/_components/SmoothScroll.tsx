"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger, ScrollSmoother, useGSAP } from "@/lib/gsap";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: wrapperRef.current!.firstElementChild as HTMLElement,
        smooth: 1.1,
        effects: true,
        normalizeScroll: false,
      });
    },
    { scope: wrapperRef }
  );

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    smoother?.scrollTo(0, false);
    window.scrollTo(0, 0);
    // let the new route paint, re-parse parallax effects, then re-measure
    const id = requestAnimationFrame(() => {
      smoother?.effects("[data-speed], [data-lag]");
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
