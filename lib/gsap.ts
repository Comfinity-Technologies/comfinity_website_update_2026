"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Draggable,
  InertiaPlugin,
  useGSAP
);

gsap.defaults({ ease: "power3.out", duration: 1 });

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Draggable,
  InertiaPlugin,
  useGSAP,
};
