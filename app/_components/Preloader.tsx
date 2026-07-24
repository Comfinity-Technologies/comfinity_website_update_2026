"use client";

import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { markPreloaderDone } from "@/lib/preloader";

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        markPreloaderDone();
        setHidden(true);
        return;
      }

      document.documentElement.style.overflow = "hidden";
      const finish = () => {
        document.documentElement.style.overflow = "";
        setHidden(true);
      };

      const counter = { n: 0 };
      const counterEl = el.querySelector("[data-count]");
      const split = SplitText.create("[data-loader-logo]", { type: "chars" });

      const tl = gsap.timeline({ onComplete: finish });

      tl.from(split.chars, {
        yPercent: 115,
        duration: 0.9,
        stagger: 0.045,
        ease: "power4.out",
        delay: 0.15,
      })
        .from(
          "[data-loader-tag], [data-count-wrap]",
          { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.1 },
          "-=0.5"
        )
        .to(
          counter,
          {
            n: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterEl)
                counterEl.textContent = String(Math.round(counter.n)).padStart(3, "0");
            },
          },
          0.35
        )
        .to(
          "[data-loader-bar]",
          { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
          0.35
        )
        // brief hold, then the content slips up and the curtain lifts
        .to(
          "[data-loader-inner], [data-loader-tag], [data-count-wrap]",
          { yPercent: -60, autoAlpha: 0, duration: 0.5, ease: "power2.in" },
          "+=0.2"
        )
        .add(() => markPreloaderDone(), "-=0.05")
        .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.2")
        .to(
          "[data-loader-glow]",
          { opacity: 0, duration: 0.4, ease: "none" },
          "<+=0.3"
        );

      return () => {
        split.revert();
        document.documentElement.style.overflow = "";
      };
    },
    { scope: ref }
  );

  if (hidden) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-background px-6 py-8 md:px-10 md:py-10"
    >
      {/* soft glow behind the wordmark */}
      <div
        data-loader-glow
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, #4f7cff 0%, #a78bfa 60%, transparent 100%)",
        }}
      />

      <div aria-hidden />

      <div data-loader-inner className="relative mx-auto w-full max-w-xl text-center">
        <p
          data-loader-logo
          className="font-display overflow-clip pb-1 text-5xl font-semibold tracking-tight md:text-7xl"
        >
          comfinity<span className="text-accent">.</span>
        </p>
        <div className="mx-auto mt-8 h-px w-full max-w-sm overflow-hidden bg-line">
          <div
            data-loader-bar
            className="h-full origin-left scale-x-0"
            style={{
              background: "linear-gradient(90deg, #8ad8ff, #4f7cff 50%, #a78bfa)",
            }}
          />
        </div>
      </div>

      <div className="relative flex items-end justify-between">
        <p data-count-wrap className="font-mono text-sm text-muted">
          <span data-count className="font-display text-2xl font-semibold text-foreground md:text-3xl">
            000
          </span>
          <span className="ml-1 text-xs text-faint">/ 100</span>
        </p>
        <p
          data-loader-tag
          className="font-mono text-[10px] tracking-[0.3em] text-muted"
        >
          TECHNOLOGY · INNOVATION · IMPACT
        </p>
      </div>
    </div>
  );
}
