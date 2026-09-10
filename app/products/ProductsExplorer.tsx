"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Sparkles, Layers } from "lucide-react";
import Reveal from "@/app/_components/anim/Reveal";
import type { Product, RoadmapItem } from "@/lib/products-store";

interface ProductsExplorerProps {
  products: Product[];
  roadmap: RoadmapItem[];
}

export default function ProductsExplorer({ products, roadmap }: ProductsExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"catalog" | "roadmap">("catalog");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean) as string[]))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Top Toggle: Catalog vs Roadmap */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-surface border border-line">
          <button
            type="button"
            onClick={() => setActiveTab("catalog")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === "catalog"
                ? "bg-accent text-white shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Products Catalog ({products.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("roadmap")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === "roadmap"
                ? "bg-accent text-white shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Product Roadmap ({roadmap.length})</span>
          </button>
        </div>

        {activeTab === "catalog" && categories.length > 2 && (
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-accent/15 text-accent-soft border border-accent/30"
                    : "bg-surface text-muted border border-line hover:border-line-strong hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Catalog View */}
      {activeTab === "catalog" && (
        <Reveal stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p) => (
            <article
              key={p.id}
              className="glass card-hover group flex flex-col overflow-hidden rounded-3xl border border-line"
            >
              <div className="relative aspect-video overflow-hidden border-b border-line bg-surface">
                <Image
                  src={p.image || "/products/drishti.svg"}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  unoptimized={p.image?.endsWith(".svg")}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-line text-accent-soft font-semibold">
                    {p.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent-soft uppercase">
                    {p.tag}
                  </span>
                  {p.category && (
                    <span className="text-[11px] text-muted font-mono">
                      {p.category}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {p.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted flex-1">
                  {p.desc}
                </p>

                <div className="mt-6 pt-5 border-t border-line flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="text-xs font-mono tracking-wider text-accent-soft hover:text-accent transition flex items-center gap-1.5"
                  >
                    <span>Request Demo</span>
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/about/magazine"
                    className="text-xs text-muted hover:text-foreground transition flex items-center gap-1"
                  >
                    <span>In Magazine</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      )}

      {/* Roadmap View */}
      {activeTab === "roadmap" && (
        <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((item) => (
            <div
              key={item.id}
              className="glass card-hover rounded-2xl border border-line p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-accent-soft px-2.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                  {item.quarter}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface border border-line text-muted">
                  {item.status}
                </span>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase text-muted tracking-wider">
                  {item.product}
                </p>
                <h4 className="font-display text-lg font-semibold text-foreground mt-1">
                  {item.feature}
                </h4>
              </div>

              <p className="text-xs leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </Reveal>
      )}
    </div>
  );
}
