import type { Metadata } from "next";
import Hero from "./_components/home/Hero";
import TrustBar from "./_components/home/TrustBar";
import ExploreGrid from "./_components/home/ExploreGrid";
import FeatureSplits from "./_components/home/FeatureSplits";
import CapabilitiesTabs from "./_components/home/CapabilitiesTabs";
import ServicesGrid from "./_components/home/ServicesGrid";
import CaseStudies from "./_components/home/CaseStudies";
import LabsPreview from "./_components/home/LabsPreview";
import Stats from "./_components/home/Stats";
import TeamCulture from "./_components/home/TeamCulture";
import Testimonials from "./_components/home/Testimonials";
import CtaBand from "./_components/CtaBand";

export const metadata: Metadata = {
  title: "Comfinity Technologies | Technology & Innovation Group",
  description:
    "Comfinity is a global technology & innovation group engineering intelligent products, enterprise solutions, research ecosystems, and communities that create real-world impact across Southeast Asia and beyond.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <ExploreGrid />
      <FeatureSplits />
      <CapabilitiesTabs />
      <ServicesGrid />
      <CaseStudies />
      <LabsPreview />
      <Stats />
      <TeamCulture />
      <Testimonials />
      <CtaBand />
    </main>
  );
}
