"use client";

import { gsap, Draggable } from "./gsap";

export type HorizontalLoopConfig = {
  repeat?: number;
  paused?: boolean;
  /** 1 ≈ 100px/second */
  speed?: number;
  snap?: number | false;
  /** gap (px) between the last item and the wrap-around */
  paddingRight?: number;
  reversed?: boolean;
  /** make the strip drag/swipe-able; autoplay resumes after release */
  draggable?: boolean;
};

export type LoopTimeline = gsap.core.Timeline & { draggable?: Draggable };

/**
 * Seamless horizontal marquee loop (adapted from the official GSAP helper).
 * Items translate individually with xPercent so each one wraps around to
 * the other side with no visible seam. With `draggable: true` the user can
 * grab/swipe the strip; the auto-scroll resumes once the throw settles.
 */
export function horizontalLoop(
  els: HTMLElement[],
  config: HorizontalLoopConfig = {}
): LoopTimeline {
  const items = gsap.utils.toArray<HTMLElement>(els);
  const tl: LoopTimeline = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    },
  });
  const length = items.length;
  const startX = items[0].offsetLeft;
  const widths: number[] = [];
  const xPercents: number[] = [];
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap =
    config.snap === false
      ? (v: number) => v
      : gsap.utils.snap(config.snap || 1);

  gsap.set(items, {
    // convert any "x" to xPercent so the loop stays responsive
    xPercent: (i, el) => {
      const w = (widths[i] = parseFloat(
        gsap.getProperty(el, "width", "px") as string
      ));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
          (gsap.getProperty(el, "xPercent") as number)
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });

  const last = items[length - 1];
  const totalWidth =
    last.offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    last.offsetWidth * (gsap.getProperty(last, "scaleX") as number) +
    (config.paddingRight || 0);

  for (let i = 0; i < length; i++) {
    const item = items[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop =
      distanceToStart +
      widths[i] * (gsap.getProperty(item, "scaleX") as number);
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    ).fromTo(
      item,
      {
        xPercent: snap(
          ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
        ),
      },
      {
        xPercent: xPercents[i],
        duration: (totalWidth - distanceToLoop) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );
  }

  tl.progress(1, true).progress(0, true); // pre-render
  if (config.reversed) {
    tl.vars.onReverseComplete?.();
    tl.reverse();
  }

  if (config.draggable) {
    const proxy = document.createElement("div");
    const wrap = gsap.utils.wrap(0, 1);
    let startProgress = 0;
    let ratio = 1 / totalWidth;
    const align = () =>
      tl.progress(
        wrap(startProgress + (draggable.startX - draggable.x) * ratio)
      );
    const resume = () => {
      if (!config.paused) tl.play();
    };
    const draggable = Draggable.create(proxy, {
      trigger: items[0].parentNode as HTMLElement,
      type: "x",
      inertia: true,
      onPressInit() {
        gsap.killTweensOf(tl);
        tl.pause();
        startProgress = tl.progress();
        ratio = 1 / totalWidth;
        gsap.set(proxy, { x: startProgress / -ratio });
      },
      onDrag: align,
      onThrowUpdate: align,
      onRelease() {
        if (!this.isThrowing) resume();
      },
      onThrowComplete: resume,
    })[0];
    tl.draggable = draggable;
  }

  return tl;
}
