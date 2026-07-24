"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Skews its children with scroll velocity — marquees feel physically dragged. */
export default function SkewMarquee({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const setSkew = gsap.quickTo(el, "skewX", {
        duration: 0.6,
        ease: "power3.out",
      });

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          setSkew(gsap.utils.clamp(-8, 8, self.getVelocity() / -350));
        },
      });

      const settle = () => setSkew(0);
      ScrollTrigger.addEventListener("scrollEnd", settle);

      return () => {
        st.kill();
        ScrollTrigger.removeEventListener("scrollEnd", settle);
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
