import { AdminModuleScaffold } from "@/components/admin/AdminModuleScaffold";
import { Rocket, BookOpen, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getProductsCatalog } from "@/lib/products-store";
import { getMagazinePages } from "../magazine/_helpers";
import { ProductsClient } from "./ProductsClient";

export default function ProductsAdmin() {
  const products = getProductsCatalog();
  const magazinePages = getMagazinePages();

  return (
    <AdminModuleScaffold
      title="Products"
      category="Showcase"
      description="Manage Comfinity hardware, intelligent platforms, and product literature with real-time homepage sync."
      icon={Rocket}
      liveUrl="/#services"
      stats={[
        { label: "Listed Products", value: products.length },
        { label: "Production (Live)", value: `${products.filter((p) => p.status === "Live").length} Products`, subtext: "Homepage showcase" },
        { label: "Product Magazine", value: `${magazinePages.length} Pages`, subtext: "Interactive 2026 Edition" },
        { label: "Storage", value: "products.json", subtext: "Live atomic store" },
      ]}
    >
      <div className="space-y-8">
        {/* Featured Card for the 2026 Product Magazine */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded">
                Featured Edition
              </span>
              <span className="text-xs text-neutral-400">Comfinity 2026</span>
            </div>
            <h2 className="text-lg font-semibold text-white">Interactive Product Magazine</h2>
            <p className="text-xs text-neutral-400 max-w-xl">
              Launch the visual page-by-page editor to modify headlines, subtext, technology diagrams, and photography across all {magazinePages.length} magazine spreads.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/about/magazine"
              target="_blank"
              className="text-xs text-neutral-300 hover:text-white border border-neutral-700 bg-neutral-800/80 px-3.5 py-2.5 rounded-lg transition flex items-center gap-1.5"
            >
              <span>Preview Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/admin/magazine"
              className="text-xs font-medium bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 rounded-lg transition flex items-center gap-1.5 shadow-md shadow-amber-500/10"
            >
              <BookOpen className="w-4 h-4" />
              <span>Open Magazine Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Dynamic Products Catalog */}
        <ProductsClient initialProducts={products} />
      </div>
    </AdminModuleScaffold>
  );
}
