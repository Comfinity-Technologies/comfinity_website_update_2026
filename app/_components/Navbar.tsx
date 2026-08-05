"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onPreloaderDone } from "@/lib/preloader";
import Magnetic from "./anim/Magnetic";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/about/magazine", label: "Magazine 📖" },
  { href: "/about/story", label: "About" },
  { href: "/solutions", label: "Services" },
  { href: "/labs", label: "Labs" },
  { href: "/partners", label: "Partners" },
  { href: "/community", label: "Community" },
  { href: "/careers", label: "Careers" },
];

const services = [
  {
    href: "/solutions#ai",
    title: "AI & Intelligent Automation",
    desc: "Custom AI agents, LLM integration, and autonomous operations.",
  },
  {
    href: "/solutions#enterprise",
    title: "Enterprise Digital Transformation",
    desc: "Legacy modernization, cloud architecture, and platform rebuilds.",
  },
  {
    href: "/solutions#product",
    title: "Product Engineering",
    desc: "From concept to shipped product — web, mobile, and SaaS.",
  },
  {
    href: "/solutions#rnd",
    title: "Research & Development",
    desc: "Applied R&D programs that turn frontier research into product.",
  },
  {
    href: "/solutions#hardware",
    title: "Electronics & Embedded Systems",
    desc: "IoT architecture, firmware, and hardware-software integration.",
  },
  {
    href: "/solutions#data",
    title: "Data Intelligence & Analytics",
    desc: "Pipelines, dashboards, and predictive models that drive decisions.",
  },
];

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/about/magazine", label: "Company Magazine 📖" },
  { href: "/about/story", label: "Our Story" },
  { href: "/about/mission", label: "Mission & Values" },
  { href: "/about/divisions", label: "Divisions" },
  { href: "/about/leadership", label: "Leadership" },
  { href: "/solutions", label: "Solutions" },
  { href: "/labs", label: "Innovation Labs" },
  { href: "/partners", label: "Partners" },
  { href: "/community", label: "Community" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const intro = gsap.from(nav, {
        y: -80,
        autoAlpha: 0,
        duration: 1,
        delay: 0.2,
        paused: true,
      });
      onPreloaderDone(() => intro.play());

      // hide on scroll down, reveal on scroll up
      const show = gsap
        .from(nav, { yPercent: -110, duration: 0.4, ease: "power2.out", paused: true })
        .progress(1);

      ScrollTrigger.create({
        start: "top top-=120",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === -1) show.play();
          else show.reverse();
        },
      });
    },
    { scope: navRef }
  );

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      if (open) {
        gsap.set(overlay, { display: "flex" });
        gsap.fromTo(
          overlay,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power4.inOut" }
        );
        gsap.fromTo(
          overlay.querySelectorAll("[data-menu-item]"),
          { y: 60, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.045, duration: 0.7, delay: 0.25, ease: "power3.out" }
        );
      } else {
        gsap.to(overlay, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "power4.inOut",
          onComplete: () => gsap.set(overlay, { display: "none" }),
        });
      }
    },
    { dependencies: [open], scope: overlayRef }
  );

  return (
    <>
      <header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-[100] border-b border-line bg-background/60 backdrop-blur-xl"
      >
        <nav className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight"
            onClick={() => setOpen(false)}
          >
            comfinity<span className="text-accent">.</span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) =>
              l.href === "/solutions" ? (
                <li key={l.href} className="group/services flex h-16 items-center">
                  <Link
                    href={l.href}
                    className={`link-sweep flex items-center gap-1.5 text-sm transition-colors ${pathname.startsWith(l.href) ? "text-foreground" : "text-muted hover:text-foreground"
                      }`}
                  >
                    {l.label}
                    <svg
                      aria-hidden
                      viewBox="0 0 10 6"
                      className="h-1.5 w-2.5 fill-none stroke-current transition-transform duration-300 group-hover/services:rotate-180"
                    >
                      <path d="M1 1l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </Link>

                  {/* services mega menu */}
                  <div className="pointer-events-none invisible absolute inset-x-0 top-full translate-y-2 opacity-0 transition-all duration-300 group-focus-within/services:pointer-events-auto group-focus-within/services:visible group-focus-within/services:translate-y-0 group-focus-within/services:opacity-100 group-hover/services:pointer-events-auto group-hover/services:visible group-hover/services:translate-y-0 group-hover/services:opacity-100">
                    <div className="border-b border-line bg-background shadow-2xl shadow-black/20">
                      <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1fr_2.2fr]">
                        <div>
                          <p className="section-label mb-4">Services</p>
                          <p className="font-display text-xl font-medium leading-snug tracking-tight">
                            Technology built for the complexity of the real
                            world.
                          </p>
                          <Link
                            href="/solutions"
                            className="link-sweep mt-5 inline-block text-sm font-medium text-accent-soft"
                          >
                            View all solutions →
                          </Link>
                        </div>
                        <div className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
                          {services.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="group/item rounded-xl px-4 py-3.5 transition-colors hover:bg-surface-2"
                            >
                              <p className="font-display text-sm font-medium tracking-tight transition-colors group-hover/item:text-accent-soft">
                                {s.title}
                              </p>
                              <p className="mt-1 text-xs leading-relaxed text-muted">
                                {s.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`link-sweep text-sm transition-colors ${pathname.startsWith(l.href) ? "text-foreground" : "text-muted hover:text-foreground"
                      }`}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Magnetic className="hidden lg:inline-block">
              <Link
                href="/contact"
                className="btn-primary !px-5 !py-2.5 !text-sm"
              >
                Book a Consultation
              </Link>
            </Magnetic>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line-strong lg:hidden"
            >
              <span
                className={`block h-px w-4 bg-foreground transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-4 bg-foreground transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] hidden flex-col justify-end bg-background/95 px-6 pb-16 pt-24 backdrop-blur-2xl"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <ul className="space-y-1">
          {menuLinks.map((l, i) => (
            <li key={l.href} data-menu-item>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 py-1"
              >
                <span className="font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-4xl font-medium tracking-tight text-muted transition-colors group-hover:text-foreground">
                  {l.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
