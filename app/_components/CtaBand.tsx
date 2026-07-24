import Link from "next/link";
import TextReveal from "./anim/TextReveal";
import Reveal from "./anim/Reveal";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      {/* glow */}
      <div
        aria-hidden
        data-speed="0.85"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[70rem] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, #4f7cff 0%, #a78bfa 45%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[90rem] px-6 py-32 text-center md:px-10 md:py-44">
        <TextReveal
          as="h2"
          className="font-display mx-auto max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Partner with us to shape{" "}
          <span className="font-serif-accent text-gradient">what&rsquo;s next.</span>
        </TextReveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Whether you&rsquo;re transforming an industry, accelerating
            innovation, or pioneering new research, Comfinity brings together
            the expertise, engineering, and innovation to help turn bold ideas
            into lasting impact.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Book a Free Consultation
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact the Team
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
