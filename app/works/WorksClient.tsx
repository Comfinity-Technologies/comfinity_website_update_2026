"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData, projectCategories, type Project } from "@/lib/worksData";
import PageHero from "../_components/PageHero";
import CtaBand from "../_components/CtaBand";

export default function WorksClient({ initialProjects }: { initialProjects?: Project[] } = {}) {
  const allProjects = initialProjects ?? projectsData;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Filter projects based on category and search query
  const filteredProjects = allProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeModalProject]);

  return (
    <main className="min-h-screen pt-24">
      {/* Page Hero */}
      <PageHero
        label="SELECTED PORTFOLIO & CASE STUDIES"
        title="Engineering outcomes that shape industries."
        body="Explore our proven track record delivering OTT streaming platforms, AI solutions, cloud architectures, IoT hardware, and digital products for forward-thinking global clients."
      />

      {/* Metric Highlights Stats Bar */}
      <section className="border-y border-line bg-surface/50 py-10">
        <div className="mx-auto grid max-w-[90rem] grid-cols-2 gap-8 px-6 md:px-10 lg:grid-cols-4">
          <div className="border-l-2 border-accent pl-5">
            <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl text-gradient">
              50+
            </p>
            <p className="mt-1 font-mono text-xs text-muted tracking-wider uppercase">
              Projects Shipped
            </p>
          </div>
          <div className="border-l-2 border-accent pl-5">
            <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl text-gradient">
              100K+
            </p>
            <p className="mt-1 font-mono text-xs text-muted tracking-wider uppercase">
              Live Active Streamers
            </p>
          </div>
          <div className="border-l-2 border-accent pl-5">
            <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl text-gradient">
              99.9%
            </p>
            <p className="mt-1 font-mono text-xs text-muted tracking-wider uppercase">
              SLA Uptime Delivered
            </p>
          </div>
          <div className="border-l-2 border-accent pl-5">
            <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl text-gradient">
              4+
            </p>
            <p className="mt-1 font-mono text-xs text-muted tracking-wider uppercase">
              Global Operating Markets
            </p>
          </div>
        </div>
      </section>

      {/* Filter Navigation & Search Section */}
      <section className="mx-auto max-w-[90rem] px-6 py-12 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Categories Pill Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            {projectCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-5 py-2.5 font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                    isSelected
                      ? "bg-accent text-background font-semibold shadow-lg shadow-accent/20"
                      : "border border-line bg-surface text-muted hover:border-line-strong hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              placeholder="Search Flutter, Next.js, client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-line bg-surface px-5 py-2.5 text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex items-center justify-between border-b border-line pb-4 text-xs font-mono text-muted">
          <span>
            Showing <strong className="text-foreground">{filteredProjects.length}</strong> project{filteredProjects.length === 1 ? "" : "s"}
          </span>
          {selectedCategory !== "All" && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-accent hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10">
        {filteredProjects.length === 0 ? (
          <div className="rounded-3xl border border-line bg-surface/50 p-16 text-center">
            <p className="font-display text-2xl font-medium">No matching projects found</p>
            <p className="mt-2 text-sm text-muted">
              Try adjusting your category selection or search terms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="btn-primary mt-6 !px-6 !py-2.5 !text-xs"
            >
              Show All Works
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="glass group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface/60 transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-2xl hover:shadow-accent/5"
              >
                <div>
                  {/* Visual Image Preview Header */}
                  <div className="relative h-60 w-full overflow-hidden bg-background">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-90" />
                    
                    {/* Top Badges */}
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-background/80 px-3 py-1 font-mono text-[10px] tracking-wider text-accent-soft backdrop-blur-md border border-line">
                        {project.category.toUpperCase()}
                      </span>
                    </div>

                    <div className="absolute right-4 top-4 flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 rounded-full bg-accent/90 hover:bg-accent px-3 py-1 font-mono text-[10px] font-semibold text-background backdrop-blur-md transition-all shadow-md"
                        >
                          <span>Live Site</span>
                          <span>↗</span>
                        </a>
                      )}
                      <span className="rounded-full bg-background/80 px-2.5 py-1 font-mono text-[10px] text-muted backdrop-blur-md border border-line">
                        {project.year}
                      </span>
                    </div>

                    {/* Prominent Impact Metric Overlay */}
                    <div className="absolute bottom-4 left-6 right-6">
                      <p className="font-display text-3xl font-semibold text-foreground tracking-tight">
                        {project.metric}
                      </p>
                      <p className="font-mono text-[10px] tracking-widest text-accent-soft uppercase">
                        {project.metricLabel}
                      </p>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <p className="font-mono text-xs text-muted">
                        Client: <span className="text-foreground font-medium">{project.client}</span>
                      </p>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] text-accent-soft hover:underline flex items-center gap-1"
                        >
                          {project.liveUrl.replace(/^https?:\/\//, "")} ↗
                        </a>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-accent-soft transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-[10px] text-faint"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="border-t border-line p-6 bg-surface/30 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="group/btn flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-accent-soft hover:text-foreground transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 fill-none stroke-current transition-transform duration-300 group-hover/btn:translate-x-1"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-muted hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      <span>Visit Site</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Featured Client Quote Highlight */}
      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            FEATURED CLIENT TESTIMONIAL
          </span>
          <blockquote className="mt-6 font-display text-2xl font-medium tracking-tight md:text-3xl text-foreground leading-snug">
            &ldquo;Comfinity built FliQket from concept to a high-scale OTT platform. The video playback performance, Flutter cross-platform architecture, and creator studio analytics are exceptional.&rdquo;
          </blockquote>
          <div className="mt-8">
            <p className="font-display font-semibold text-foreground">FliQket Media Team</p>
            <p className="font-mono text-xs text-muted">fliqket.com &bull; Next-Gen OTT Platform</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaBand />

      {/* Comprehensive Case Study Drawer Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-background/80 p-4 md:p-10 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-black/80"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface/90 px-6 py-5 backdrop-blur-md md:px-8">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-accent/10 border border-accent/20 px-3 py-1 font-mono text-[10px] text-accent uppercase">
                  {activeModalProject.category}
                </span>
                <span className="font-mono text-xs text-muted">
                  Year: {activeModalProject.year}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !px-4 !py-1.5 !text-xs"
                  >
                    <span>Visit Live Site</span>
                    <span>↗</span>
                  </a>
                )}
                <button
                  onClick={() => setActiveModalProject(null)}
                  aria-label="Close modal"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line hover:border-foreground hover:bg-surface-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 md:p-10 space-y-8">
              {/* Visual Banner */}
              <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-line">
                <Image
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-accent-soft uppercase tracking-wider mb-1">
                      Client: {activeModalProject.client}
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                      {activeModalProject.title}
                    </h2>
                  </div>

                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent/20 px-4 py-2 font-mono text-xs text-accent-soft hover:bg-accent hover:text-background transition-all"
                    >
                      <span>{activeModalProject.liveUrl}</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Key Impact Metric Box */}
              <div className="rounded-2xl border border-line bg-surface-2 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="font-mono text-xs text-muted uppercase tracking-wider">Key Impact Highlight</p>
                  <p className="font-display text-4xl font-bold text-gradient mt-1">
                    {activeModalProject.metric}
                  </p>
                  <p className="font-mono text-xs text-faint">{activeModalProject.metricLabel}</p>
                </div>
                <div className="flex flex-wrap gap-2 md:max-w-xs">
                  {activeModalProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-line bg-background px-3 py-1 font-mono text-xs text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary / Challenge / Solution Breakdown */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    The Challenge
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {activeModalProject.challenge}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Our Solution
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {activeModalProject.solution}
                  </p>
                </div>
              </div>

              {/* Key Measurable Outcomes */}
              <div className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Measurable Outcomes & Results
                </h3>
                <ul className="grid gap-3 sm:grid-cols-1">
                  {activeModalProject.results.map((res, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-line bg-surface-2/60 p-4 text-xs md:text-sm text-foreground"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 font-mono text-xs font-semibold text-accent">
                        ✓
                      </span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial inside Modal if available */}
              {activeModalProject.testimonial && (
                <div className="rounded-2xl border border-line bg-background p-6 space-y-3">
                  <p className="font-mono text-[10px] text-accent uppercase tracking-wider">
                    CLIENT TESTIMONIAL
                  </p>
                  <p className="font-display text-base italic text-foreground leading-relaxed">
                    &ldquo;{activeModalProject.testimonial.quote}&rdquo;
                  </p>
                  <p className="text-xs font-mono text-muted">
                    — {activeModalProject.testimonial.author},{" "}
                    <span className="text-foreground">{activeModalProject.testimonial.role}</span>, {activeModalProject.testimonial.company}
                  </p>
                </div>
              )}

              {/* Footer CTA */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line">
                <div>
                  <p className="font-display text-base font-semibold text-foreground">
                    Have a similar project vision?
                  </p>
                  <p className="text-xs text-muted">
                    Let our team help you design, build, and scale your technology.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost shrink-0 !px-5 !py-2.5 !text-xs"
                    >
                      Visit fliqket.com ↗
                    </a>
                  )}
                  <Link
                    href="/contact"
                    onClick={() => setActiveModalProject(null)}
                    className="btn-primary shrink-0 !px-6 !py-2.5 !text-xs text-center"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
