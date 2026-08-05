import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/_components/PageHero";
import MagazineBooklet from "@/app/_components/magazine/MagazineBooklet";
import CtaBand from "@/app/_components/CtaBand";

export const metadata: Metadata = {
  title: "Comfinity Chronicles — Official Company Magazine",
  description:
    "Explore Comfinity Chronicles Vol. 01 — an interactive 3D digital booklet showcasing our origins, engineering pillars, social commitment, and frontier labs.",
};

export default function MagazinePage() {
  return (
    <main className="min-h-screen">
      <PageHero
        label="Official Company Magazine — Vol. 01"
        title={
          <>
            Comfinity Chronicles: <span className="font-serif-accent text-gradient">Intention &amp; Impact</span>
          </>
        }
        body="Experience our journey, engineering divisions, and founding vision through an interactive 3D horizontal booklet. Flip pages to explore our story from 2016 to the frontier of intelligent technologies."
      />

      {/* 3D Booklet Section */}
      <section className="relative border-y border-line py-12 bg-surface-2/40">
        <div className="mx-auto max-w-[90rem] px-4 md:px-10">
          <MagazineBooklet />
        </div>
      </section>

      {/* Quick Links & PDF Download */}
      <section className="mx-auto max-w-[90rem] px-6 py-20 md:px-10">
        <div className="glass rounded-3xl p-8 sm:p-12 border border-line flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs text-accent uppercase tracking-widest">
              MAGAZINE ARCHIVE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Prefer a traditional About page experience?
            </h2>
            <p className="text-sm text-muted mt-2 max-w-xl">
              You can also read our individual chapters on dedicated pages or explore leadership profiles and division roadmaps.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Link href="/about/story" className="btn-ghost !text-xs">
              Read Our Story →
            </Link>
            <Link href="/about/divisions" className="btn-ghost !text-xs">
              Explore Divisions →
            </Link>
            <Link href="/about/leadership" className="btn-ghost !text-xs">
              Meet Leadership →
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
