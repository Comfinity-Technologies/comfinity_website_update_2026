import Link from "next/link";
import Image from "next/image";
import { getMagazinePages } from "./_helpers";
import { resetMagazinePagesAction } from "./_actions";

export default function MagazineAdminPage() {
  const pages = getMagazinePages();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-neutral-800 pb-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
            Admin / Magazine
          </p>
          <h1 className="text-2xl font-semibold text-white">Magazine Editor</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage all {pages.length} pages of the 2026 Product Magazine. Click any page to edit its text, headlines, and images.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <form action={resetMagazinePagesAction}>
            <button
              type="submit"
              className="text-xs text-neutral-500 hover:text-red-400 border border-neutral-800 hover:border-red-500/30 rounded-lg px-3 py-2 transition"
            >
              Reset to Defaults
            </button>
          </form>
          <Link
            href="/about/magazine"
            target="_blank"
            className="text-xs bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-neutral-200 transition flex items-center gap-1"
          >
            ↗ Preview Live Magazine
          </Link>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pages.map((page, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-4 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Thumbnail / Art Preview */}
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 mb-3">
                {page.image?.src ? (
                  <Image
                    src={page.image.src}
                    alt={page.image.alt || `Page ${idx + 1}`}
                    fill
                    unoptimized
                    className={
                      page.image.fit === "contain"
                        ? "object-contain"
                        : page.image.fit === "fill"
                        ? "object-fill"
                        : "object-cover"
                    }
                    style={{ objectPosition: page.image.position ?? "center" }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-2xl font-serif text-neutral-700 mb-1">
                      {page.folio ? `P.${page.folio}` : `#${idx + 1}`}
                    </span>
                    <span className="text-[10px] text-neutral-600 truncate max-w-full">
                      {page.section || page.variant}
                    </span>
                  </div>
                )}

                {/* Folio badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] font-mono text-neutral-300">
                  {page.folio !== null && page.folio !== undefined ? `Page ${page.folio}` : "Cover"}
                </div>

                {/* Variant badge */}
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-amber-500/30 backdrop-blur text-[9px] font-medium text-amber-300 uppercase">
                  {page.variant}
                </div>
              </div>

              {/* Title / Section */}
              <p className="text-xs font-semibold text-white truncate">
                {page.section || (page.folio ? `Editorial Page ${page.folio}` : `Page ${idx + 1}`)}
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {page.blocks.length} content block{page.blocks.length === 1 ? "" : "s"}
                {page.image?.src ? " · Has Art" : ""}
              </p>
            </div>

            {/* Edit button */}
            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-neutral-600">
                Index: {idx}
              </span>
              <Link
                href={`/admin/magazine/${idx}`}
                className="text-xs text-neutral-400 group-hover:text-white font-medium flex items-center gap-1 hover:underline"
              >
                Edit Page →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}