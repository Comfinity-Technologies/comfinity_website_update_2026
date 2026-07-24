"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export default function Counter({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.n)}${suffix}`;
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
