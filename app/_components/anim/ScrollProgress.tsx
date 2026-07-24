"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Thin gradient bar at the very top that fills as you scroll the page. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[110] h-[2px] origin-left scale-x-0"
      style={{
        background: "linear-gradient(90deg, #8ad8ff, #4f7cff 50%, #a78bfa)",
      }}
    />
  );
}
