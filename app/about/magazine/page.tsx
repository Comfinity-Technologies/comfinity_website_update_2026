import type { Metadata } from "next";
import PageHero from "@/app/_components/PageHero";
import CtaBand from "@/app/_components/CtaBand";
import Magazine from "@/app/_components/about/Magazine";
import { MAGAZINE_EDITION } from "@/lib/magazineData";

export const metadata: Metadata = {
  title: "Company Magazine — 2026 Edition",
  description:
    "The Comfinity Technologies product magazine: who we are, what we believe, the platforms we have built, and the research driving what comes next.",
};

export default function MagazinePage() {
  return (
    <main>
      <PageHero
        label="Company Magazine"
        title={
          <>
            The 2026{" "}
            <span className="font-serif-accent text-gradient">edition.</span>
          </>
        }
        body="Our company profile and product portfolio, published as a magazine you can page through — from what we stand for to every platform we have shipped."
      />

      <section className="border-b border-line">
        <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 md:py-28">
          <p className="section-label mb-12 text-center">{MAGAZINE_EDITION}</p>
          <Magazine />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
