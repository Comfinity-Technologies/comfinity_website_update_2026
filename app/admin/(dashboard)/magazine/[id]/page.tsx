"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { saveMagazinePageAction } from "../_actions";
import type { MagazinePage, Block } from "@/lib/magazineData";

const VARIANTS = ["cover", "editorial", "contents", "divider", "product", "backCover"] as const;
const POSITIONS = ["center", "center top", "center bottom", "left center", "right center"] as const;
const FITS = ["cover", "contain", "fill"] as const;

export default function MagazinePageEditor({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const pageIndex = Number(resolvedParams.id);

  const [page, setPage] = useState<MagazinePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state
  const [folio, setFolio] = useState<string>("");
  const [variant, setVariant] = useState<string>("editorial");
  const [section, setSection] = useState<string>("");

  // Background Image state
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageAlt, setImageAlt] = useState<string>("");
  const [imagePos, setImagePos] = useState<string>("center");
  const [imageFit, setImageFit] = useState<string>("cover");
  const [imageZoom, setImageZoom] = useState<string>("1");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Logo state
  const [logoSrc, setLogoSrc] = useState<string>("");
  const [logoAlt, setLogoAlt] = useState<string>("");
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Blocks state
  const [blocksJson, setBlocksJson] = useState<string>("[]");
  const [jsonError, setJsonError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/magazine/${pageIndex}`)
      .then((r) => r.json())
      .then((data: MagazinePage) => {
        setPage(data);
        setFolio(data.folio !== null && data.folio !== undefined ? String(data.folio) : "");
        setVariant(data.variant || "editorial");
        setSection(data.section || "");

        if (data.image) {
          setImageSrc(data.image.src || "");
          setImageAlt(data.image.alt || "");
          setImagePos(data.image.position || "center");
          setImageFit(data.image.fit || "cover");
          setImageZoom(data.image.zoom ? String(data.image.zoom) : "1");
        }

        if (data.logo) {
          setLogoSrc(data.logo.src || "");
          setLogoAlt(data.logo.alt || "");
        }

        setBlocksJson(JSON.stringify(data.blocks || [], null, 2));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load page:", err);
        setLoading(false);
      });
  }, [pageIndex]);

  async function handleFileUpload(file: File, type: "image" | "logo") {
    const isImage = type === "image";
    if (isImage) setUploadingImage(true);
    else setUploadingLogo(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        if (isImage) {
          setImageSrc(data.url);
          if (!imageAlt) setImageAlt(file.name.replace(/\.[^/.]+$/, ""));
        } else {
          setLogoSrc(data.url);
          if (!logoAlt) setLogoAlt("Logo");
        }
      }
    } catch (e) {
      console.error("Upload failed:", e);
    } finally {
      if (isImage) setUploadingImage(false);
      else setUploadingLogo(false);
    }
  }

  function handleInsertBlock(newBlock: Record<string, unknown>) {
    try {
      const current = JSON.parse(blocksJson);
      if (Array.isArray(current)) {
        current.push(newBlock);
        setBlocksJson(JSON.stringify(current, null, 2));
        setJsonError(null);
      }
    } catch {
      setJsonError("Fix JSON syntax before appending blocks");
    }
  }

  function handleFormatJson() {
    try {
      const parsed = JSON.parse(blocksJson);
      setBlocksJson(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (e: unknown) {
      setJsonError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      JSON.parse(blocksJson);
    } catch {
      setJsonError("Cannot save: Invalid blocks JSON syntax.");
      return;
    }

    setSaving(true);
    setSaveSuccess(false);

    const formData = new FormData();
    formData.append("pageIndex", String(pageIndex));
    formData.append("folio", folio);
    formData.append("variant", variant);
    formData.append("section", section);
    formData.append("imageSrc", imageSrc);
    formData.append("imageAlt", imageAlt);
    formData.append("imagePosition", imagePos);
    formData.append("imageFit", imageFit);
    formData.append("imageZoom", imageZoom);
    formData.append("logoSrc", logoSrc);
    formData.append("logoAlt", logoAlt);
    formData.append("blocksJson", blocksJson);

    try {
      await saveMagazinePageAction(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-8 text-neutral-400">Loading magazine page {pageIndex + 1}...</div>;
  }

  if (!page) {
    return <div className="p-8 text-red-400">Page not found.</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 pb-20">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/magazine"
            className="text-xs text-neutral-500 hover:text-white transition flex items-center gap-1 mb-2"
          >
            ← Back to All Pages
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-white">
              Edit Page {pageIndex + 1}
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-mono">
              {page.folio ? `Folio ${page.folio}` : "Cover / No folio"}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
              {variant}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/about/magazine"
            target="_blank"
            className="text-xs text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-lg px-3 py-2 transition"
          >
            ↗ Preview Live Magazine
          </Link>
        </div>
      </div>

      {saveSuccess && (
        <div className="rounded-xl bg-green-950/60 border border-green-600/40 p-4 text-green-300 text-sm flex items-center justify-between">
          <span>✓ Page {pageIndex + 1} saved successfully! Live magazine updated.</span>
          <Link href="/about/magazine" target="_blank" className="underline text-xs">View Live</Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Page Metadata */}
        <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            1. Page Metadata & Layout
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Folio (Printed Page Number)
              </label>
              <input
                type="number"
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
                placeholder="Leave blank for cover"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
              />
              <p className="text-[11px] text-neutral-500 mt-1">Leave empty for Cover or Divider pages</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Page Variant
              </label>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
              >
                {VARIANTS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Running Section Header
              </label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="e.g. Who We Are, Enterprise Solutions"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Background / Cover Artwork Image */}
        <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              2. Background / Cover Artwork Image
            </h2>
            {imageSrc && (
              <button
                type="button"
                onClick={() => setImageSrc("")}
                className="text-xs text-red-400 hover:underline"
              >
                Remove Image
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Upload Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileUpload(f, "image");
                  }}
                  className="block w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-neutral-200 cursor-pointer"
                />
                {uploadingImage && <p className="text-xs text-amber-400 mt-1">Uploading image...</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Or Paste Image URL
                </label>
                <input
                  type="text"
                  value={imageSrc}
                  onChange={(e) => setImageSrc(e.target.value)}
                  placeholder="https://res.cloudinary.com/... or /uploads/..."
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Image Alt Description
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Alt text for screen readers"
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Position
                  </label>
                  <select
                    value={imagePos}
                    onChange={(e) => setImagePos(e.target.value)}
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
                  >
                    {POSITIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Object Fit
                  </label>
                  <select
                    value={imageFit}
                    onChange={(e) => setImageFit(e.target.value)}
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
                  >
                    {FITS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Zoom
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={imageZoom}
                    onChange={(e) => setImageZoom(e.target.value)}
                    placeholder="1"
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>
            </div>

            {/* Live Image Preview */}
            <div className="border border-neutral-800 rounded-xl bg-neutral-950 p-3">
              <p className="text-xs text-neutral-500 mb-2 font-mono">Image Preview</p>
              {imageSrc ? (
                <div className="relative aspect-[3/4] w-full max-h-64 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
                  <Image
                    src={imageSrc}
                    alt={imageAlt || "Preview"}
                    fill
                    unoptimized
                    className={imageFit === "contain" ? "object-contain" : imageFit === "fill" ? "object-fill" : "object-cover"}
                    style={{ objectPosition: imagePos }}
                  />
                </div>
              ) : (
                <div className="aspect-[3/4] max-h-64 rounded-lg border border-dashed border-neutral-800 flex items-center justify-center text-neutral-600 text-xs">
                  No image selected for this page
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Corner Logo Image */}
        <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              3. Corner Logo (Optional)
            </h2>
            {logoSrc && (
              <button
                type="button"
                onClick={() => setLogoSrc("")}
                className="text-xs text-red-400 hover:underline"
              >
                Remove Logo
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Upload Logo File
              </label>
              <input
                type="file"
                accept="image/*"
                disabled={uploadingLogo}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFileUpload(f, "logo");
                }}
                className="block w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-neutral-200 cursor-pointer"
              />
              {uploadingLogo && <p className="text-xs text-amber-400 mt-1">Uploading logo...</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Or Logo URL
              </label>
              <input
                type="text"
                value={logoSrc}
                onChange={(e) => setLogoSrc(e.target.value)}
                placeholder="/uploads/logo.svg"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* 4. Content Blocks Deep Editor */}
        <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                4. Content Blocks (Headlines, Text, Figures, Cards)
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Add and configure headlines, paragraphs, quote callouts, and figures.
              </p>
            </div>
            <button
              type="button"
              onClick={handleFormatJson}
              className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg border border-neutral-700 transition"
            >
              Format JSON
            </button>
          </div>

          {/* Quick Insert Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800">
            <span className="text-xs text-neutral-500 py-1 mr-1">Quick Add:</span>
            <button
              type="button"
              onClick={() => handleInsertBlock({ type: "eyebrow", text: "New Section Tag" })}
              className="text-xs bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1 rounded border border-neutral-700"
            >
              + Eyebrow
            </button>
            <button
              type="button"
              onClick={() => handleInsertBlock({ type: "title", text: "Headline Title", accent: "Accent text" })}
              className="text-xs bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1 rounded border border-neutral-700"
            >
              + Title
            </button>
            <button
              type="button"
              onClick={() => handleInsertBlock({ type: "para", text: "New paragraph body copy describing the product or company." })}
              className="text-xs bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1 rounded border border-neutral-700"
            >
              + Paragraph
            </button>
            <button
              type="button"
              onClick={() => handleInsertBlock({ type: "quote", text: "Meaningful statement quote goes here.", by: "Author Name" })}
              className="text-xs bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1 rounded border border-neutral-700"
            >
              + Quote
            </button>
            <button
              type="button"
              onClick={() => handleInsertBlock({ type: "figure", image: { src: "/uploads/image.png", alt: "Figure" }, caption: "Figure caption" })}
              className="text-xs bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1 rounded border border-neutral-700"
            >
              + Figure Image
            </button>
            <button
              type="button"
              onClick={() => handleInsertBlock({ type: "bullets", items: ["Point one", "Point two", "Point three"] })}
              className="text-xs bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1 rounded border border-neutral-700"
            >
              + Bullet List
            </button>
          </div>

          {jsonError && (
            <div className="rounded-lg bg-red-950/50 border border-red-800 px-3 py-2 text-xs text-red-400">
              {jsonError}
            </div>
          )}

          <textarea
            value={blocksJson}
            onChange={(e) => {
              setBlocksJson(e.target.value);
              setJsonError(null);
            }}
            rows={14}
            className="w-full rounded-lg bg-neutral-950 border border-neutral-800 px-4 py-3 font-mono text-xs text-green-400 focus:outline-none focus:border-neutral-600 transition leading-relaxed"
          />
        </div>

        {/* Submit Bottom Bar */}
        <div className="sticky bottom-4 rounded-xl bg-neutral-900/90 backdrop-blur border border-neutral-800 p-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/magazine"
              className="text-xs text-neutral-400 hover:text-white px-3 py-2"
            >
              Cancel
            </Link>
            {saveSuccess && (
              <span className="text-xs text-green-400">Saved successfully!</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-white text-black text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-neutral-200 transition disabled:opacity-50"
            >
              {saving ? "Saving Page..." : "Save Page Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}