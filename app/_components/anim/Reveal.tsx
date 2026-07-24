"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onPreloaderDone } from "@/lib/preloader";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** stagger direct children instead of animating the wrapper */
  stagger?: number;
  once?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 48,
  stagger,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger !== undefined ? Array.from(el.children) : el;

      let tween: gsap.core.Tween | undefined;
      // hold back until the preloader curtain lifts
      onPreloaderDone(() => {
        if (!el.isConnected) return;
        tween = gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: 1.1,
          delay,
          stagger: stagger ?? 0,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 86%", once },
        });
      });

      return () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
