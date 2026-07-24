import Link from "next/link";
import TextReveal from "../anim/TextReveal";
import Reveal from "../anim/Reveal";

const divisions = [
  "AI & Software",
  "Electronics & Hardware",
  "Research & Innovation",
  "Products",
  "Community",
  "Foundation",
];

function DashboardVisual() {
  return (
    <div data-speed="1.06" className="glass relative rounded-3xl p-6">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="font-mono text-[10px] tracking-[0.25em] text-muted">
          COMFINITY · INTELLIGENCE CONSOLE
        </p>
        <div className="flex gap-1.5">
          {["bg-red-400/60", "bg-amber-400/60", "bg-emerald-400/60"].map((c) => (
            <span key={c} className={`h-2 w-2 rounded-full ${c}`} />
          ))}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {[
          { k: "Processes automated", v: "1,284" },
          { k: "Manual time saved", v: "−70%" },
          { k: "Decisions assisted", v: "24/7" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl border border-line bg-background/50 p-4">
            <p className="font-display text-xl font-semibold text-accent-soft md:text-2xl">
              {s.v}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-muted">{s.k}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-3 rounded-xl border border-line bg-background/50 p-4">
        {[
          { w: "82%", label: "Agent · invoice triage" },
          { w: "64%", label: "Agent · demand forecast" },
          { w: "93%", label: "Agent · anomaly watch" },
        ].map((row) => (
          <div key={row.label}>
            <div className="flex justify-between text-[11px] text-muted">
              <span>{row.label}</span>
              <span className="text-accent-soft">{row.w}</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-wash">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                style={{ width: row.w }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* glow node */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #4f7cff, transparent)" }}
      />
    </div>
  );
}

function DivisionsVisual() {
  return (
    <div data-speed="1.06" className="relative grid grid-cols-2 gap-4">
      {divisions.map((d, i) => (
        <div
          key={d}
          data-lag={(0.05 + (i % 3) * 0.06).toFixed(2)}
          className="glass card-hover flex aspect-[4/3] flex-col justify-between rounded-2xl p-5"
        >
          <span className="font-mono text-[10px] text-faint">
            DIV / {String(i + 1).padStart(2, "0")}
          </span>
          <p className="font-display text-base font-medium leading-tight md:text-lg">
            {d}
          </p>
        </div>
      ))}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #a78bfa, transparent)" }}
      />
    </div>
  );
}

export default function FeatureSplits() {
  return (
    <section className="mx-auto max-w-[90rem] space-y-32 px-6 py-28 md:space-y-44 md:px-10 md:py-40">
      {/* split 1 */}
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="section-label mb-6">Our Approach</p>
          <TextReveal
            as="h2"
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Engineering intelligent solutions for a{" "}
            <span className="font-serif-accent text-gradient">better tomorrow.</span>
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              At Comfinity, we go beyond delivering software — we engineer
              intelligent systems that solve real-world challenges and create
              measurable business outcomes. By combining advanced AI research,
              precision engineering, and deep domain expertise, we design
              technologies that transform how organizations operate, innovate,
              and grow.
            </p>
            <Link
              href="/solutions"
              className="link-sweep mt-8 inline-block text-sm font-medium text-accent-soft"
            >
              See Our Approach →
            </Link>
          </Reveal>
        </div>
        <Reveal y={64}>
          <DashboardVisual />
        </Reveal>
      </div>

      {/* split 2 */}
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal y={64} className="order-2 lg:order-1">
          <DivisionsVisual />
        </Reveal>
        <div className="order-1 lg:order-2">
          <p className="section-label mb-6">The Group</p>
          <TextReveal
            as="h2"
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Six divisions.{" "}
            <span className="font-serif-accent text-gradient">One vision.</span>
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              Comfinity operates across six interconnected divisions — AI &amp;
              Software, Electronics &amp; Hardware, Research &amp; Innovation,
              Products, Community, and Foundation — each advancing a different
              layer of the technology ecosystem, all working toward the same
              future.
            </p>
            <Link
              href="/about/divisions"
              className="link-sweep mt-8 inline-block text-sm font-medium text-accent-soft"
            >
              Explore Our Divisions →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
