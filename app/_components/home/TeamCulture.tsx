import TextReveal from "../anim/TextReveal";
import Reveal from "../anim/Reveal";
import { getLeadership } from "@/lib/team-store";

const gradients = [
  "linear-gradient(135deg, rgba(79,124,255,0.9), rgba(138,216,255,0.55))",
  "linear-gradient(135deg, rgba(167,139,250,0.9), rgba(79,124,255,0.55))",
  "linear-gradient(135deg, rgba(138,216,255,0.85), rgba(167,139,250,0.55))",
];

const team = [
  {
    name: "Archana G",
    role: "AI & Data Science Engineer",
    bio: "Strong analytical skills, machine learning expertise, and the ability to translate structured inputs into practical solutions.",
    tags: ["Machine Learning", "AI", "Analytics"],
    avatar: "AG",
  },
  {
    name: "Sudheesh R",
    role: "Foundational Software Engineer",
    bio: "Deep expertise as a MERN Stack Developer building robust, high-performance web applications and seamless frontend experiences.",
    tags: ["MERN Stack", "Full-Stack", "Frontend"],
    avatar: "SR",
  },
  {
    name: "Aman M B",
    role: "Data & Systems Engineer — AI Operations",
    bio: "Understands the code but can also lead initiatives, manage relationships, and coordinate technical teams toward delivery.",
    tags: ["AI Ops", "Systems", "Leadership"],
    avatar: "AM",
  },
  {
    name: "Binil B",
    role: "Foundational Software Engineer",
    bio: "Bridges the gap between technical strategy, product design, and high-fidelity execution — from concept to production.",
    tags: ["Product", "Engineering", "Strategy"],
    avatar: "BB",
  },
  {
    name: "Razaan R",
    role: "Principal AI & Data Architect",
    bio: "Designing complex machine learning pipelines, big data systems, and predictive models that power intelligence at scale.",
    tags: ["ML Pipelines", "Big Data", "Architecture"],
    avatar: "RR",
  },
  {
    name: "Jeevagan S",
    role: "Founding Infrastructure Architect",
    bio: "Designing highly available, secure, and scalable multi-cloud and Kubernetes architectures that never sleep.",
    tags: ["Cloud", "Kubernetes", "Infrastructure"],
    avatar: "JS",
  },
];

export default function TeamCulture() {
  const leaders = getLeadership();
  const displayTeam =
    leaders.length > 0
      ? [
          ...leaders.map((l) => ({
            name: l.name,
            role: l.role,
            bio: l.bio,
            tags: [l.tagline || "Leadership", "Executive"],
            avatar: l.name.split(" ").map((n) => n[0]).join("").slice(0, 2),
          })),
          ...team,
        ].slice(0, 6)
      : team;
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-40">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="section-label mb-6">The People</p>
            <TextReveal
              as="h2"
              className="font-display max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl"
            >
              Builders. Researchers.{" "}
              <span className="font-serif-accent text-gradient">
                Engineers. Architects.
              </span>
            </TextReveal>
          </div>
          <Reveal>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              We don&rsquo;t have employees — we have people who care deeply
              about what they make.
            </p>
          </Reveal>
        </div>

        <Reveal
          stagger={0.07}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayTeam.map((m, i) => (
            <article
              key={m.name}
              className="glass card-hover flex flex-col rounded-3xl p-8"
            >
              <div className="mb-6 flex items-center gap-4">
                <span
                  aria-hidden
                  className="font-display flex size-14 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white"
                  style={{ background: gradients[i % gradients.length] }}
                >
                  {m.avatar}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {m.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-accent-soft">
                    {m.role.toUpperCase()}
                  </p>
                </div>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted">
                {m.bio}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {m.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-wide text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
