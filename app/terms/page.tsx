import type { Metadata } from "next";
import PageHero from "@/app/_components/PageHero";
import Reveal from "@/app/_components/anim/Reveal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing your use of Comfinity Technologies' website, platforms, and services.",
};

const rows = [
  {
    t: "Intellectual Property",
    d: "All content, code, designs, and trademarks are owned by Comfinity Technologies unless explicitly stated otherwise.",
  },
  {
    t: "Permitted Use",
    d: "Personal, non-commercial access to public content. Commercial use requires written agreement.",
  },
  {
    t: "Prohibited Actions",
    d: "Scraping, unauthorized access, misrepresentation, and IP infringement.",
  },
  {
    t: "Liability Limitation",
    d: "Comfinity provides services “as is” within the limits of applicable law.",
  },
  {
    t: "Governing Law",
    d: "India.",
  },
];

export default function TermsPage() {
  return (
    <main>
      <PageHero
        label="Legal"
        title={
          <>
            Terms of{" "}
            <span className="font-serif-accent text-gradient">service.</span>
          </>
        }
        body="By accessing Comfinity's website, platforms, or services, you agree to the following terms. These terms govern your use of all Comfinity-operated digital properties."
      />
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-10">
        <Reveal stagger={0.05} className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
          {rows.map((r) => (
            <div
              key={r.t}
              className="grid gap-2 bg-background px-8 py-7 md:grid-cols-[12rem_1fr] md:gap-8"
            >
              <p className="font-display font-medium tracking-tight">{r.t}</p>
              <p className="text-sm leading-relaxed text-muted">{r.d}</p>
            </div>
          ))}
        </Reveal>
        <p className="mt-10 text-xs leading-relaxed text-faint">
          Full Terms of Service to be finalized by legal counsel. Last updated
          July 2026.
        </p>
      </section>
    </main>
  );
}
