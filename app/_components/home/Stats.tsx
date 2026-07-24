import Counter from "../anim/Counter";
import Reveal from "../anim/Reveal";
import TextReveal from "../anim/TextReveal";

const stats = [
  { value: 6, suffix: "", label: "Active divisions", sub: "across technology and innovation" },
  { value: 12, suffix: "+", label: "Technology domains", sub: "from AI to space technology" },
  { value: 3, suffix: "", label: "Community programs", sub: "ambassadors, startups, fellowships" },
  { value: 20, suffix: "%", label: "Social commitment", sub: "of profits to Helping Hands Foundation" },
  { value: 2024, suffix: "", label: "Year founded", sub: "November 2024 — built for decades" },
];

export default function Stats() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
        <TextReveal
          as="h2"
          className="font-display mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight md:text-4xl"
        >
          These numbers represent our commitment,{" "}
          <span className="font-serif-accent text-gradient">not our volume.</span>
        </TextReveal>
        <Reveal>
          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-muted">
            Every number is a real person, a real problem solved, a real future
            shaped. Founded November 2024.
          </p>
        </Reveal>

        <Reveal stagger={0.1} className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-8 text-center">
              <p className="font-display text-4xl font-semibold text-gradient md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-4 font-medium">{s.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{s.sub}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
