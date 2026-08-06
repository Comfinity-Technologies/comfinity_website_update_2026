"use client";

import React from "react";
import TextReveal from "../anim/TextReveal";
import Reveal from "../anim/Reveal";

const visionPillars = [
  {
    title: "Transform Challenges into Intelligence",
    desc: "Helping organizations simplify complex challenges through intelligent, scalable technology and purposeful engineering.",
    image: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007324/Gemini_Generated_Image_y8tbq3y8tbq3y8tb_zlbff1.png",
  },
  {
    title: "Turn Ideas into Impact",
    desc: "Empowering businesses to transform bold ideas into meaningful, measurable, and lasting real-world outcomes.",
    image: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007320/Gemini_Generated_Image_e8ycmze8ycmze8yc_uwzp36.png",
  },
  {
    title: "Build the Future Together",
    desc: "Creating lasting partnerships that inspire continuous innovation, sustainable growth, and shared success.",
    image: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007321/Gemini_Generated_Image_13wnzh13wnzh13wn_txvozv.png",
  },
];

export default function VisionSection() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-24 md:px-10 md:py-32">
      <Reveal className="text-center max-w-3xl mx-auto mb-16">
        <p className="section-label mb-3">Our Vision</p>
        <TextReveal
          as="h2"
          className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Transforming bold ideas into{" "}
          <span className="font-serif-accent text-gradient">future reality.</span>
        </TextReveal>
        <p className="text-muted text-base mt-4 leading-relaxed">
          The strategic purpose driving every initiative, partnership, and engineering milestone at Comfinity.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {visionPillars.map((pillar, idx) => (
          <Reveal key={pillar.title} delay={idx * 0.1}>
            <div className="group glass card-hover rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center h-full justify-between border border-line hover:border-accent/40 transition-all shadow-xl bg-surface/60 backdrop-blur-md">
              <div className="flex flex-col items-center w-full">
                {/* Circular image container with matching background ring */}
                <div className="relative h-40 w-40 sm:h-48 sm:w-48 rounded-full overflow-hidden border-4 border-surface-2 shadow-2xl ring-2 ring-accent/30 bg-surface-2 flex items-center justify-center group-hover:scale-105 group-hover:ring-accent/70 transition-all duration-300">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-40" />
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl tracking-wider uppercase text-foreground mt-8 leading-snug group-hover:text-accent transition-colors">
                  {pillar.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-muted mt-4 max-w-xs">
                {pillar.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
