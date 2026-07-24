import type { Metadata } from "next";
import PageHero from "@/app/_components/PageHero";
import TextReveal from "@/app/_components/anim/TextReveal";
import Reveal from "@/app/_components/anim/Reveal";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Let's Build Something Together",
  description:
    "Reach out to Comfinity Technologies for business solutions, research collaboration, partnerships, investment, press, or community enquiries.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Contact & Consultation"
        title={
          <>
            Let&rsquo;s build something{" "}
            <span className="font-serif-accent text-gradient">together.</span>
          </>
        }
        body="Whether you are a startup, enterprise, university, government agency, investor, or simply someone with an idea you can't stop thinking about — we want to hear from you."
      />

      {/* consultation + contacts */}
      <section className="mx-auto max-w-[90rem] px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="section-label mb-6">Book a Free Consultation</p>
            <TextReveal
              as="h2"
              className="font-display text-3xl font-semibold leading-snug tracking-tight md:text-4xl"
            >
              No intake forms. No sales reps. A{" "}
              <span className="font-serif-accent text-gradient">
                real conversation.
              </span>
            </TextReveal>
            <Reveal>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
                Our founding team meets directly with potential partners,
                clients, and collaborators. A real conversation about what you
                are trying to build and how we might help. Use the form to book
                a 30-minute discovery session.
              </p>

              <ContactForm />
            </Reveal>
          </div>

          <div>
            <p className="section-label mb-6">General Queries</p>
            <Reveal stagger={0.05} className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
              <a
                href="mailto:connect@comfinityindia.com"
                className="group flex flex-col gap-1 bg-background px-6 py-5 transition-colors hover:bg-surface-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm text-foreground">Email</span>
                <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent-soft">
                  connect@comfinityindia.com
                </span>
              </a>
              <a
                href="tel:+917356201710"
                className="group flex flex-col gap-1 bg-background px-6 py-5 transition-colors hover:bg-surface-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm text-foreground">Phone</span>
                <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent-soft">
                  +91 73562 01710
                </span>
              </a>
            </Reveal>

            <Reveal className="glass mt-8 rounded-2xl p-7">
              <p className="font-mono text-[10px] tracking-[0.25em] text-accent-soft">
                AI RECEPTIONIST · 24/7
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Comfinity&rsquo;s AI Receptionist is available around the clock
                to answer questions about our services, divisions, Labs,
                community programs, and partnership opportunities — and to
                route you to the right team. Coming soon, built on
                Comfinity&rsquo;s own AI platform.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
