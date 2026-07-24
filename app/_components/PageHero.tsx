import type { ReactNode } from "react";
import TextReveal from "./anim/TextReveal";
import Reveal from "./anim/Reveal";

type Props = {
  label: string;
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
};

export default function PageHero({ label, title, body, children }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-16">
      <div
        aria-hidden
        data-speed="0.8"
        className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full opacity-15 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, #4f7cff 0%, #a78bfa 60%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[90rem] px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-36">
        <Reveal y={20}>
          <p className="section-label mb-8">{label}</p>
        </Reveal>
        <TextReveal
          as="h1"
          immediate
          delay={0.2}
          className="font-display max-w-5xl text-balance text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-7xl"
        >
          {title}
        </TextReveal>
        {body && (
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
              {body}
            </p>
          </Reveal>
        )}
        {children && <Reveal delay={0.55}>{children}</Reveal>}
      </div>
    </section>
  );
}
