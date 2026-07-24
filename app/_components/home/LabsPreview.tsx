import Link from "next/link";
import TextReveal from "../anim/TextReveal";
import Reveal from "../anim/Reveal";

const domains = [
  "AI & Agents",
  "Electronics & IoT",
  "Space Technology",
  "Cybersecurity",
  "Healthcare Tech",
  "Climate Tech",
  "EdTech",
  "Future Interfaces",
];

export default function LabsPreview() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[36rem] w-[36rem] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(closest-side, #4f7cff, transparent)" }}
      />
      <div className="relative mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="section-label mb-6">Comfinity Innovation Lab</p>
            <TextReveal
              as="h2"
              className="font-display text-5xl font-semibold tracking-tight md:text-6xl"
            >
              Where ideas become{" "}
              <span className="font-serif-accent text-gradient">impact.</span>
            </TextReveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
                Comfinity Labs is an open innovation ecosystem where
                researchers, developers, students, and entrepreneurs
                collaborate to solve frontier problems. Submit an idea. Join a
                project. Build something that matters.
              </p>
              <Link href="/labs" className="btn-primary mt-10">
                Explore the Labs <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>

          <Reveal stagger={0.06} className="grid grid-cols-2 gap-3">
            {domains.map((d, i) => (
              <div
                key={d}
                data-lag={(0.04 + (i % 4) * 0.05).toFixed(2)}
                className="glass card-hover rounded-2xl p-5"
              >
                <span className="font-mono text-[10px] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display mt-3 text-base font-medium tracking-tight">
                  {d}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
