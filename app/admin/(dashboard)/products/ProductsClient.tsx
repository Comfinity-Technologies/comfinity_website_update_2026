"use client";

import { useState } from "react";
import { Rocket, Plus, Trash2, Edit2, X, ExternalLink, Tag } from "lucide-react";
import { type Product, type ProductStatus } from "@/lib/products-store";
import { saveProductAction, deleteProductAction } from "./_actions";

export function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const getStatusBadge = (status: ProductStatus) => {
    switch (status) {
      case "Live":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Beta":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "MVP":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Prototype":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Research":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-neutral-800 text-neutral-400 border-neutral-700";
    }
  };

  const handleEdit = (item: Product) => {
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem({
      id: `prod-${Date.now()}`,
      name: "",
      slug: "",
      tag: "AI · Platform",
      category: "Enterprise Solution",
      status: "Live",
      desc: "",
      image: "/products/drishti.svg",
      featured: true,
      order: products.length + 1,
    });
    setIsCreating(true);
  };

  const handleClose = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Products Catalog</h2>
          <p className="text-xs text-neutral-400">
            {products.length} products listed · Synchronized with the live homepage showcase
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="text-xs bg-white hover:bg-neutral-200 text-black font-medium px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingItem && (
        <div className="rounded-2xl border border-amber-500/40 bg-neutral-900/90 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="text-sm font-semibold text-white">
              {isCreating ? "Add New Product" : `Edit Product: ${editingItem.name}`}
            </h3>
            <button type="button" onClick={handleClose} className="text-neutral-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form action={saveProductAction} className="space-y-4">
            <input type="hidden" name="id" value={editingItem.id} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingItem.name}
                  required
                  placeholder="e.g. Drishti, Nexzo"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Tag / Badge *</label>
                <input
                  type="text"
                  name="tag"
                  defaultValue={editingItem.tag}
                  required
                  placeholder="e.g. AI · Defence"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Product Status</label>
                <select
                  name="status"
                  defaultValue={editingItem.status}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Live">Live (Production)</option>
                  <option value="Beta">Beta</option>
                  <option value="MVP">MVP</option>
                  <option value="Prototype">Prototype</option>
                  <option value="Research">Research</option>
                  <option value="Idea">Idea</option>
                  <option value="Deprecated">Deprecated</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Category</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={editingItem.category}
                  placeholder="e.g. Enterprise SaaS"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Image / SVG Path</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={editingItem.image}
                  placeholder="/products/drishti.svg"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Display Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editingItem.order ?? 1}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Description *</label>
              <textarea
                name="desc"
                defaultValue={editingItem.desc}
                required
                rows={3}
                placeholder="Detailed capabilities and value proposition of the product..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={editingItem.featured}
                  className="rounded border-neutral-700 text-amber-500"
                />
                <span>Featured on Homepage</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-neutral-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-1.5 rounded-lg transition"
                >
                  Save Product
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Products Grid */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        <div className="divide-y divide-neutral-800/60">
          {products.map((p) => (
            <div key={p.id} className="p-5 hover:bg-neutral-800/20 transition space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 shrink-0">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">{p.name}</p>
                      <span className="text-xs text-neutral-400">· {p.tag}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                      Category: {p.category ?? "General"} · Order #{p.order ?? 99}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${getStatusBadge(p.status)}`}>
                    {p.status}
                  </span>

                  {p.featured && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Featured
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => handleEdit(p)}
                    className="text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded-md transition flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <form action={deleteProductAction.bind(null, p.id)}>
                    <button
                      type="submit"
                      className="text-xs text-neutral-500 hover:text-red-400 border border-neutral-800 hover:border-red-500/30 p-1.5 rounded-md transition"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>

              <p className="text-xs text-neutral-300 pl-13 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
