import type { Metadata } from "next";
import PageHero from "@/app/_components/PageHero";
import Reveal from "@/app/_components/anim/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Comfinity Technologies is committed to protecting your data and privacy. Read our privacy policy.",
};

const rows = [
  {
    t: "Data Collected",
    d: "Name, email, contact details, usage analytics, form submissions.",
  },
  {
    t: "Purpose",
    d: "Service delivery, communication, product improvement, legal compliance.",
  },
  {
    t: "Retention",
    d: "Retained for the duration of the relationship and as required by law.",
  },
  {
    t: "Sharing",
    d: "Not sold. Shared only with authorized service providers under strict agreements.",
  },
  {
    t: "Your Rights",
    d: "Access, correction, deletion, and portability upon verified request.",
  },
  {
    t: "Contact",
    d: "connect@comfinityindia.com",
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        label="Legal"
        title={
          <>
            Privacy{" "}
            <span className="font-serif-accent text-gradient">policy.</span>
          </>
        }
        body="Comfinity Technologies is committed to protecting the privacy and data of every person who interacts with our platforms, products, and services. This policy explains what data we collect, how we use it, and the rights you hold as a user or visitor."
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
          This policy will be finalized in compliance with applicable data
          protection laws (PDPA, GDPR as applicable). Last updated July 2026.
        </p>
      </section>
    </main>
  );
}
