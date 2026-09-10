import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/_components/PageHero";
import CtaBand from "@/app/_components/CtaBand";
import ProductsExplorer from "./ProductsExplorer";
import { getProductsCatalog, getRoadmapItems } from "@/lib/products-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products & Intelligent Platforms | Comfinity",
  description:
    "Explore Comfinity's suite of proprietary software products, defence platforms, OTT streaming ecosystems, and operational suites built for the future.",
};

export default function ProductsPage() {
  const products = getProductsCatalog();
  const roadmap = getRoadmapItems();

  return (
    <main>
      <PageHero
        label="Proprietary Technology"
        title={
          <>
            Products built for the{" "}
            <span className="font-serif-accent text-gradient">next decade.</span>
          </>
        }
        body="Comfinity engineers and deploys intelligent, production-grade products designed for mission-critical operations — from AI digital defence and creator streaming to omnichannel commerce and hospitality."
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/contact" className="btn-primary">
            Schedule a Demo
          </Link>
          <Link href="/about/magazine" className="btn-ghost">
            Read Product Magazine 📖
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 md:py-32">
        <ProductsExplorer products={products} roadmap={roadmap} />
      </section>

      <CtaBand />
    </main>
  );
}
