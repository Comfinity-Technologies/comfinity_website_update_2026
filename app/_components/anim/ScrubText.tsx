"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Word-by-word highlight tied to scroll position — the text "fills in"
 * as it moves through the viewport, and reverses when scrolling back.
 */
export default function ScrubText({
  children,
  as: Tag = "p",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const split = SplitText.create(el, {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            opacity: 0.12,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 45%",
              scrub: true,
            },
          }),
      });

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
