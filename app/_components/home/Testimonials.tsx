import Reveal from "../anim/Reveal";
import TextReveal from "../anim/TextReveal";

const quotes = [
  {
    quote:
      "Comfinity did not just build us a system. They helped us understand our own future.",
    who: "Enterprise Partner",
  },
  {
    quote:
      "The team brought a level of strategic thinking we had not experienced from a technology partner before.",
    who: "Startup Founder",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
      <p className="section-label mb-6 text-center">Customer Stories</p>
      <TextReveal
        as="h2"
        className="font-display mx-auto max-w-2xl text-center text-4xl font-semibold tracking-tight md:text-5xl"
      >
        In their <span className="font-serif-accent text-gradient">words.</span>
      </TextReveal>

      <Reveal stagger={0.12} className="mt-16 grid gap-6 md:grid-cols-2">
        {quotes.map((q) => (
          <figure
            key={q.who}
            className="glass card-hover flex flex-col justify-between rounded-3xl p-10 md:p-12"
          >
            <span aria-hidden className="font-serif-accent text-6xl leading-none text-accent/60">
              &ldquo;
            </span>
            <blockquote className="mt-4 text-xl leading-relaxed text-foreground md:text-2xl">
              {q.quote}
            </blockquote>
            <figcaption className="mt-8 font-mono text-[11px] tracking-[0.2em] text-muted">
              — {q.who.toUpperCase()}
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
