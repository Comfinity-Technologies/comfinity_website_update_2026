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

import VisionSection from "./_components/home/VisionSection";
import { getTestimonials } from "@/lib/testimonials-store";
import { getHomepageSections } from "@/lib/homepage-store";
import { getProjects } from "@/app/admin/(dashboard)/projects/_helpers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Comfinity Technologies | Technology & Innovation Group",
  description:
    "Comfinity is a global technology & innovation group engineering intelligent products, enterprise solutions, research ecosystems, and communities that create real-world impact across Southeast Asia and beyond.",
};

export default function Home() {
  const testimonials = getTestimonials();
  const sections = getHomepageSections();
  const projects = getProjects();

  return (
    <main>
      <Hero initialSections={sections} />
      <TrustBar />
      <VisionSection />
      <ExploreGrid />
      <FeatureSplits />
      <CapabilitiesTabs />
      <ServicesGrid />
      <CaseStudies initialProjects={projects} />
      <LabsPreview />
      <Stats />
      <TeamCulture />
      <Testimonials initialReviews={testimonials} />
      <CtaBand />
    </main>
  );
}
