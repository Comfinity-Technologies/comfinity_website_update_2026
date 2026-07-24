"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { onPreloaderDone } from "@/lib/preloader";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "lines" masked slide-up (default) or "chars" stagger */
  mode?: "lines" | "chars";
  delay?: number;
  /** play immediately instead of on scroll (for hero) */
  immediate?: boolean;
};

export default function TextReveal({
  children,
  as: Tag = "div",
  className = "",
  mode = "lines",
  delay = 0,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      let split: SplitText | undefined;

      // wait for the preloader curtain before revealing anything
      onPreloaderDone(() => {
        if (!el.isConnected) return;
        split = SplitText.create(el, {
          type: mode === "chars" ? "lines,chars" : "lines",
          linesClass: "line",
          autoSplit: true,
          onSplit: (self) => {
            const targets = mode === "chars" ? self.chars : self.lines;
            return gsap.from(targets, {
              yPercent: 110,
              duration: mode === "chars" ? 0.9 : 1.1,
              stagger: mode === "chars" ? 0.018 : 0.09,
              ease: "power4.out",
              delay,
              scrollTrigger: immediate
                ? undefined
                : { trigger: el, start: "top 85%", once: true },
            });
          },
        });
      });

      return () => split?.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={`split-parent ${className}`}>
      {children}
    </Tag>
  );
}
