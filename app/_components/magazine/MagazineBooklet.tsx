"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

export interface MagazinePageData {
  id: number;
  title: string;
  category: string;
  subtitle?: string;
  content: React.ReactNode;
}

const COMPANY_URL = "https://comfinitytechnologies.com";
const COMPANY_DOMAIN_DISPLAY = "www.comfinitytechnologies.com";

export const MAGAZINE_PAGES: MagazinePageData[] = [
  // PAGE 1: FRONT COVER (PACKED TOP-TO-BOTTOM)
  {
    id: 1,
    title: "COMFINITY TECHNOLOGIES",
    subtitle: "OFFICIAL COMPANY PROFILE & MAGAZINE",
    category: "COVER",
    content: (
      <div className="relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-7 bg-gradient-to-br from-surface via-surface-2 to-background text-foreground border border-line rounded-l-2xl shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/magazine/cover.png"
            alt="Comfinity Technologies Cover"
            className="w-full h-full object-cover filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        </div>

        {/* Top Masthead */}
        <div className="relative z-10 border-b-2 border-accent/40 pb-2.5 flex justify-between items-end">
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-accent font-bold uppercase">
              SPECIAL ISSUE — VOL. 01
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-foreground mt-0.5 leading-none">
              COMFINITY<span className="text-accent">.</span>
            </h1>
          </div>
          <span className="font-mono text-[8px] text-faint border border-line px-2 py-0.5 rounded bg-background/80">
            2026 EDITION
          </span>
        </div>

        {/* Main Headline Body */}
        <div className="relative z-10 my-auto py-2">
          <div className="inline-block rounded-full bg-accent/20 backdrop-blur-md px-3 py-0.5 text-[9px] font-mono tracking-wider text-accent-soft border border-accent/40 mb-2">
            INNOVATION &amp; TECHNOLOGY PARTNER
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
            Transforming Complexity into <span className="text-gradient">Clarity.</span>
          </h2>
          <p className="font-serif-accent text-sm sm:text-base text-accent-soft mt-1">
            Ideas into Measurable Impact
          </p>

          <p className="mt-2 text-[10.5px] text-muted leading-relaxed">
            Helping organizations simplify challenges through intelligent, scalable technology and purposeful engineering across global markets.
          </p>
        </div>

        {/* Bottom Feature Grid & Footer Bar */}
        <div className="relative z-10 border-t border-line/80 pt-2.5 space-y-2">
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="glass p-1.5 rounded-lg border border-line/60">
              <p className="font-mono text-[7.5px] text-faint uppercase font-bold">PILLARS</p>
              <p className="text-[9px] font-bold text-accent mt-0.5">6 Core Values</p>
            </div>
            <div className="glass p-1.5 rounded-lg border border-line/60">
              <p className="font-mono text-[7.5px] text-faint uppercase font-bold">PRODUCTS</p>
              <p className="text-[9px] font-bold text-accent mt-0.5">6 Platforms</p>
            </div>
            <div className="glass p-1.5 rounded-lg border border-line/60">
              <p className="font-mono text-[7.5px] text-faint uppercase font-bold">R&amp;D LABS</p>
              <p className="text-[9px] font-bold text-accent mt-0.5">5 Live AI Models</p>
            </div>
          </div>

          <div className="flex justify-between items-center font-mono text-[9px] text-accent-soft border-t border-line/50 pt-2">
            <a href="/" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 font-bold">
              <span>🌐</span> <span>{COMPANY_DOMAIN_DISPLAY}</span>
            </a>
            <span className="text-faint">P. 01</span>
          </div>
        </div>
      </div>
    ),
  },

  // PAGE 2: ABOUT US (PACKED TOP-TO-BOTTOM)
  {
    id: 2,
    title: "About Us",
    subtitle: "OUR PURPOSE & PHILOSOPHY",
    category: "ABOUT US",
    content: (
      <div className="flex h-full flex-col justify-between p-6 sm:p-7 bg-surface text-foreground border border-line rounded-r-2xl">
        <div>
          <div className="flex justify-between items-center border-b border-line/60 pb-2">
            <span className="font-mono text-[9px] tracking-widest text-accent font-bold uppercase">
              PAGE 02 — ABOUT COMFINITY
            </span>
            <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[8px] text-accent hover:underline">
              {COMPANY_DOMAIN_DISPLAY}
            </a>
          </div>

          <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight mt-2 text-foreground">
            Innovation &amp; Technology Partner
          </h2>

          <div className="mt-2 space-y-2 text-[10.5px] text-muted leading-relaxed">
            <p>
              Comfinity Technologies is an Innovation &amp; Technology Partner dedicated to helping organizations transform complexity into clarity and ideas into measurable impact.
            </p>
            <p>
              We believe technology should solve real business challenges — not create new ones. Every solution we build begins with understanding our clients, their goals, and the challenges they face.
            </p>
          </div>

          {/* PORTRAIT POPUP CARD */}
          <div className="relative my-2.5 p-3 rounded-2xl glass border border-accent/40 bg-gradient-to-r from-accent/10 via-surface-2 to-surface shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-accent shadow-md">
                <img
                  src="/works/ecom-ai.png"
                  alt="Leadership Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-mono text-[8px] bg-accent/20 text-accent-soft px-2 py-0.5 rounded-full font-bold uppercase">
                  FOUNDERS STATEMENT
                </span>
                <p className="text-xs font-bold text-foreground mt-0.5">
                  &ldquo;Understand Before We Build.&rdquo;
                </p>
                <p className="text-[9.5px] text-muted leading-tight mt-0.5">
                  More than a provider, we become a long-term partner working alongside businesses to innovate, adapt, and grow together.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Filler Block: Strategic Operations */}
          <div className="grid grid-cols-2 gap-1.5 mt-2 text-[8.5px]">
            <div className="glass p-2 rounded-xl border border-line">
              <span className="font-bold text-foreground">🤝 Long-Term Focus</span>
              <p className="text-muted mt-0.5 leading-tight">Continuous evolution &amp; dedicated support.</p>
            </div>
            <div className="glass p-2 rounded-xl border border-line">
              <span className="font-bold text-foreground">🎯 ROI Driven</span>
              <p className="text-muted mt-0.5 leading-tight">Measurable business outcomes for every feature.</p>
            </div>
          </div>
        </div>

        <div className="font-mono text-[9px] text-faint border-t border-line pt-2 flex justify-between">
          <a href="/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1 font-bold text-accent-soft">
            <span>🌐</span> <span>{COMPANY_DOMAIN_DISPLAY}</span>
          </a>
          <span>PAGE 02</span>
        </div>
      </div>
    ),
  },

  // PAGE 3: MISSION & VISION (PACKED TOP-TO-BOTTOM)
  {
    id: 3,
    title: "Mission & Vision",
    subtitle: "STRATEGIC PURPOSE",
    category: "STRATEGY",
    content: (
      <div className="flex h-full flex-col justify-between p-6 sm:p-7 bg-surface text-foreground border border-line rounded-l-2xl">
        <div>
          <div className="flex justify-between items-center border-b border-line/60 pb-2">
            <span className="font-mono text-[9px] tracking-widest text-accent font-bold uppercase">
              PAGE 03 — STRATEGY
            </span>
            <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[8px] text-accent hover:underline">
              {COMPANY_DOMAIN_DISPLAY}
            </a>
          </div>

          <div className="mt-2 space-y-1.5">
            <p className="font-mono text-[9px] text-accent font-bold tracking-wider uppercase">OUR MISSION</p>
            {[
              { icon: "🎯", title: "Understand Before We Build", desc: "Begin every engagement by understanding clients' business, challenges & goals." },
              { icon: "🚀", title: "Drive Meaningful Innovation", desc: "Leverage intelligent automation to solve real business problems." },
              { icon: "🤝", title: "Build Long-Term Partnerships", desc: "Support organizations throughout continuous innovation and growth." },
            ].map((m, i) => (
              <div key={i} className="glass rounded-xl p-2 border border-line flex items-center gap-2.5">
                <span className="text-sm shrink-0">{m.icon}</span>
                <div>
                  <p className="text-[10.5px] font-bold text-foreground">{m.title}</p>
                  <p className="text-[8.5px] text-muted leading-tight">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2.5 space-y-1.5">
            <p className="font-mono text-[9px] text-accent-violet font-bold tracking-wider uppercase">OUR VISION</p>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { icon: "🌍", title: "Transform Challenges into Intelligence", desc: "Helping organizations simplify challenges through intelligent, scalable technology." },
                { icon: "💡", title: "Turn Ideas into Impact", desc: "Empowering businesses to transform bold ideas into meaningful, measurable outcomes." },
                { icon: "🌱", title: "Build the Future Together", desc: "Creating lasting partnerships that inspire innovation, sustainable growth, and shared success." },
              ].map((v, i) => (
                <div key={i} className="glass rounded-xl p-2 border border-accent/20 bg-accent/5 flex items-start gap-2">
                  <span className="text-sm shrink-0">{v.icon}</span>
                  <div>
                    <p className="text-[10px] font-bold text-foreground">{v.title}</p>
                    <p className="text-[8px] text-muted leading-tight mt-0.5">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="font-mono text-[9px] text-faint border-t border-line pt-2 flex justify-between mt-1">
          <a href="/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1 font-bold text-accent-soft">
            <span>🌐</span> <span>{COMPANY_DOMAIN_DISPLAY}</span>
          </a>
          <span>PAGE 03</span>
        </div>
      </div>
    ),
  },

  // PAGE 4: 6 CORE VALUES CARDS (PACKED TOP-TO-BOTTOM)
  {
    id: 4,
    title: "Core Values",
    subtitle: "HOW WE OPERATE",
    category: "CORE VALUES",
    content: (
      <div className="flex h-full flex-col justify-between p-6 sm:p-7 bg-surface text-foreground border border-line rounded-r-2xl">
        <div>
          <div className="flex justify-between items-center border-b border-line/60 pb-2">
            <span className="font-mono text-[9px] tracking-widest text-accent font-bold uppercase">
              PAGE 04 — WHY US
            </span>
            <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[8px] text-accent hover:underline">
              {COMPANY_DOMAIN_DISPLAY}
            </a>
          </div>

          <h2 className="font-display text-base sm:text-lg font-bold tracking-tight mt-1.5">
            Core Values That Reflect Comfinity
          </h2>

          <div className="mt-2 grid grid-cols-2 gap-2">
            {[
              { num: "01", name: "Business First", desc: "We understand the business before recommending technology." },
              { num: "02", name: "Innovation with Purpose", desc: "Designed to solve meaningful problems and deliver measurable value." },
              { num: "03", name: "Partnership & Trust", desc: "Built through transparency, collaboration, and shared success." },
              { num: "04", name: "Excellence in Execution", desc: "Reliable, scalable, and future-ready engineering." },
              { num: "05", name: "Continuous Learning", desc: "Embracing curiosity to stay ahead and help clients do the same." },
              { num: "06", name: "Integrity", desc: "Honest communication and acting in best interest of clients." },
            ].map((val) => (
              <div key={val.num} className="glass rounded-xl p-2.5 border border-line flex flex-col justify-between hover:border-accent/40 transition-colors">
                <span className="font-mono text-[10px] font-bold text-accent">{val.num}</span>
                <div className="mt-1">
                  <p className="text-[10.5px] font-bold text-foreground">{val.name}</p>
                  <p className="text-[8px] text-muted mt-0.5 leading-tight">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Ethics Banner */}
          <div className="mt-2 glass p-2 rounded-xl border border-accent/20 bg-accent/5 text-center">
            <p className="font-mono text-[8px] text-accent font-bold uppercase">ETHICS &amp; GOVERNANCE</p>
            <p className="text-[8.5px] text-muted mt-0.5">Strict data confidentiality, transparent milestone billing &amp; open communication.</p>
          </div>
        </div>

        <div className="font-mono text-[9px] text-faint border-t border-line pt-2 flex justify-between mt-1">
          <a href="/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1 font-bold text-accent-soft">
            <span>🌐</span> <span>{COMPANY_DOMAIN_DISPLAY}</span>
          </a>
          <span>PAGE 04</span>
        </div>
      </div>
    ),
  },

  // PAGE 5: CAPABILITIES & EXPERTISE (PACKED TOP-TO-BOTTOM)
  {
    id: 5,
    title: "Capabilities & Expertise",
    subtitle: "CORE COMPETENCIES",
    category: "EXPERTISE",
    content: (
      <div className="flex h-full flex-col justify-between p-6 sm:p-7 bg-surface text-foreground border border-line rounded-l-2xl">
        <div>
          <div className="flex justify-between items-center border-b border-line/60 pb-2">
            <span className="font-mono text-[9px] tracking-widest text-accent font-bold uppercase">
              PAGE 05 — CAPABILITIES
            </span>
            <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[8px] text-accent hover:underline">
              {COMPANY_DOMAIN_DISPLAY}
            </a>
          </div>

          <div className="relative my-2 h-20 w-full overflow-hidden rounded-xl border border-line">
            <img
              src="/works/ai-logistics.png"
              alt="AI Logistics Architecture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            <span className="absolute bottom-1.5 left-2 font-mono text-[8px] text-accent-soft bg-background/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-line">
              Intelligent Distributed Platform Architecture
            </span>
          </div>

          <div className="space-y-1.5">
            {[
              { icon: "🧭", title: "Business Strategy & Transformation", desc: "Roadmapping, architecture design & digital enablement." },
              { icon: "⚙️", title: "Digital Engineering & Product Dev", desc: "Fullstack platforms, mobile apps & scalable web engines." },
              { icon: "🧠", title: "AI, Automation & Intelligent Systems", desc: "Custom LLMs, workflow automation & predictive models." },
              { icon: "🌱", title: "Innovation, Research & Talent Dev", desc: "Applied R&D, student mentorship & open incubation." },
            ].map((exp, i) => (
              <div key={i} className="glass rounded-lg p-1.5 border border-line flex items-center gap-2">
                <span className="text-xs shrink-0">{exp.icon}</span>
                <div>
                  <p className="text-[10px] font-bold text-foreground">{exp.title}</p>
                  <p className="text-[8px] text-muted leading-none">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-2 text-center border-t border-line/40 pt-1.5">
            <span className="font-mono text-[8px] text-faint uppercase font-bold">TECH STACK: </span>
            <span className="font-mono text-[8px] text-accent-soft">Next.js • React • Node.js • Python • AWS • Docker • PyTorch</span>
          </div>
        </div>

        <div className="font-mono text-[9px] text-faint border-t border-line pt-2 flex justify-between mt-1">
          <a href="/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1 font-bold text-accent-soft">
            <span>🌐</span> <span>{COMPANY_DOMAIN_DISPLAY}</span>
          </a>
          <span>PAGE 05</span>
        </div>
      </div>
    ),
  },

  // PAGE 6: CLIENT REVIEWS & IMPACT (PACKED TOP-TO-BOTTOM)
  {
    id: 6,
    title: "Client Reviews & Impact",
    subtitle: "TESTIMONIALS & RESULTS",
    category: "REVIEWS",
    content: (
      <div className="flex h-full flex-col justify-between p-6 sm:p-7 bg-surface text-foreground border border-line rounded-r-2xl">
        <div>
          <div className="flex justify-between items-center border-b border-line/60 pb-2">
            <span className="font-mono text-[9px] tracking-widest text-accent font-bold uppercase">
              PAGE 06 — PROOF &amp; TRUST
            </span>
            <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[8px] text-accent hover:underline">
              {COMPANY_DOMAIN_DISPLAY}
            </a>
          </div>

          <div className="mt-2 p-2 rounded-xl glass border border-line">
            <div className="flex justify-between text-[9px] font-mono text-muted mb-1">
              <span>65% Case Studies &amp; Analytics</span>
              <span>35% Client Reviews</span>
            </div>
            <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden flex">
              <div className="h-full bg-accent w-[65%]" />
              <div className="h-full bg-accent-violet w-[35%]" />
            </div>
          </div>

          <div className="mt-2 space-y-1.5">
            {[
              { name: "Aravind R.", company: "Repz Platform", text: "Comfinity rebuilt our campaign workflows with automation. Execution speed improved 3x." },
              { name: "Vignesh G.", company: "Hyperlocal Partner", text: "Strategic, reliable, and deeply committed to solving our operational bottlenecks." },
              { name: "Minute Bazaar Team", company: "Retail Commerce", text: "Digitized our entire storefront network with real-time order management seamlessly." },
              { name: "Aswathy", company: "Medicharm Pharma", text: "The pharma management system gave us complete inventory visibility across branches." },
            ].map((rev, idx) => (
              <div key={idx} className="glass rounded-xl p-2 border border-line/80 bg-surface-2/40 text-xs">
                <div className="flex justify-between items-center border-b border-line/40 pb-1">
                  <span className="font-bold text-foreground text-[10px]">{rev.name}</span>
                  <span className="text-[8px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded">{rev.company}</span>
                </div>
                <p className="text-[8.5px] text-muted mt-1 italic">&ldquo;{rev.text}&rdquo;</p>
              </div>
            ))}
          </div>

          {/* Retention Stats */}
          <div className="mt-2 flex justify-between items-center glass p-1.5 rounded-xl border border-line text-[8.5px] font-mono">
            <span className="text-muted">Retention Rate: <strong className="text-accent">99.4%</strong></span>
            <span className="text-muted">Global Deployments: <strong className="text-accent-violet">50+</strong></span>
          </div>
        </div>

        <div className="font-mono text-[9px] text-faint border-t border-line pt-2 flex justify-between mt-1">
          <a href="/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1 font-bold text-accent-soft">
            <span>🌐</span> <span>{COMPANY_DOMAIN_DISPLAY}</span>
          </a>
          <span>PAGE 06</span>
        </div>
      </div>
    ),
  },

  // PAGE 7: FLAGSHIP PRODUCTS I (PACKED TOP-TO-BOTTOM)
  {
    id: 7,
    title: "Flagship Products I",
    subtitle: "MINUTE BAZAAR & FLIQKET",
    category: "PRODUCTS",
    content: (
      <div className="flex h-full flex-col justify-between p-5 sm:p-6 bg-surface text-foreground border border-line rounded-l-2xl">
        <div>
          <div className="flex justify-between items-center border-b border-line/60 pb-1.5">
            <span className="font-mono text-[9px] tracking-widest text-accent font-bold uppercase">
              PAGE 07 — FLAGSHIP APPS
            </span>
            <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[8px] text-accent hover:underline">
              {COMPANY_DOMAIN_DISPLAY}
            </a>
          </div>

          <div className="mt-2 space-y-2">
            <div className="glass rounded-xl overflow-hidden border border-line p-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-foreground">a) Minute Bazaar</h3>
                  <span className="text-[8px] font-mono text-accent font-semibold">Hyperlocal Quick-Commerce Platform</span>
                </div>
                <a
                  href="https://www.thegr8labs.com/products"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[8px] font-mono text-accent hover:underline glass px-2 py-0.5 rounded border border-accent/20"
                >
                  View Product →
                </a>
              </div>

              <div className="my-1.5 h-14 w-full relative rounded-lg overflow-hidden border border-line/60">
                <img
                  src="/magazine/minute_bazaar.png"
                  alt="Minute Bazaar Platform"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <span className="absolute top-1 right-2 text-[7px] text-yellow-400 font-bold bg-background/80 px-1 py-0.5 rounded">⭐⭐⭐⭐⭐ 5.0</span>
              </div>

              <p className="text-[8.5px] text-muted leading-tight">
                Empowers local retailers to digitize storefronts, manage live inventory, automate dispatch &amp; process 15-minute quick deliveries with integrated WhatsApp ordering.
              </p>
              
              <div className="mt-1.5 grid grid-cols-3 gap-1 text-[7px] font-mono text-faint border-t border-line/40 pt-1">
                <span>⚡ 15-Min Dispatch</span>
                <span>📦 WhatsApp Sync</span>
                <span>💳 Automated Payouts</span>
              </div>
            </div>

            <div className="glass rounded-xl overflow-hidden border border-line p-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-foreground">b) Fliqket</h3>
                  <span className="text-[8px] font-mono text-accent-violet font-semibold">Creator-First OTT Streaming Engine</span>
                </div>
                <a
                  href="https://www.thegr8labs.com/products"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[8px] font-mono text-accent hover:underline glass px-2 py-0.5 rounded border border-accent/20"
                >
                  View Product →
                </a>
              </div>

              <div className="my-1.5 h-14 w-full relative rounded-lg overflow-hidden border border-line/60">
                <img
                  src="/works/fliqket-ott.png"
                  alt="Fliqket OTT Platform"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <span className="absolute top-1 right-2 text-[7px] text-yellow-400 font-bold bg-background/80 px-1 py-0.5 rounded">⭐⭐⭐⭐⭐ 5.0</span>
              </div>

              <p className="text-[8.5px] text-muted leading-tight">
                Complete OTT architecture enabling independent creators to launch branded streaming apps with flexible SVOD subscriptions, TVOD pay-per-view rentals, AES-128 DRM &amp; real-time watch analytics.
              </p>

              <div className="mt-1.5 grid grid-cols-3 gap-1 text-[7px] font-mono text-faint border-t border-line/40 pt-1">
                <span>🎬 SVOD / TVOD / PPV</span>
                <span>🔒 AES-128 DRM</span>
                <span>📊 Live Watch Metrics</span>
              </div>
            </div>
          </div>
        </div>

        <div className="font-mono text-[9px] text-faint border-t border-line pt-2 flex justify-between mt-1">
          <a href="/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1 font-bold text-accent-soft">
            <span>🌐</span> <span>{COMPANY_DOMAIN_DISPLAY}</span>
          </a>
          <span>PAGE 07</span>
        </div>
      </div>
    ),
  },

  // PAGE 8: FLAGSHIP PRODUCTS II (PACKED TOP-TO-BOTTOM)
  {
    id: 8,
    title: "Flagship Products II",
    subtitle: "REPZ, REZTOS, DADCHICKO & MEDICHARM",
    category: "PRODUCTS",
    content: (
      <div className="flex h-full flex-col justify-between p-5 sm:p-6 bg-surface text-foreground border border-line rounded-r-2xl">
        <div>
          <div className="flex justify-between items-center border-b border-line/60 pb-1.5">
            <span className="font-mono text-[9px] tracking-widest text-accent font-bold uppercase">
              PAGE 08 — ENTERPRISE SYSTEMS
            </span>
            <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[8px] text-accent hover:underline">
              {COMPANY_DOMAIN_DISPLAY}
            </a>
          </div>

          <div className="relative my-1.5 h-16 w-full overflow-hidden rounded-xl border border-line">
            <img
              src="/magazine/reztos.png"
              alt="Reztos Restaurant Operating System"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            <span className="absolute bottom-1 left-2 font-mono text-[8px] text-foreground bg-background/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-line">
              Reztos — Intelligent Restaurant OS ⭐⭐⭐⭐⭐
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <div className="glass rounded-xl p-2 border border-line flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-[10px] font-bold text-foreground">c) REPZ</h3>
                  <span className="text-[7px] text-yellow-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-[7px] text-accent font-mono">Brand &amp; Creator Platform</p>
                <p className="text-[8px] text-muted mt-0.5 leading-tight">
                  Automated influencer discovery, escrow payouts &amp; campaign tracking.
                </p>
              </div>
              <span className="text-[7px] font-mono text-faint mt-1 border-t border-line/40 pt-0.5">3x Campaign Speed</span>
            </div>

            <div className="glass rounded-xl p-2 border border-line flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-[10px] font-bold text-foreground">d) REZTOS</h3>
                  <span className="text-[7px] text-yellow-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-[7px] text-accent font-mono">Restaurant Operating System</p>
                <p className="text-[8px] text-muted mt-0.5 leading-tight">
                  QR table ordering, Kitchen Display (KDS), inventory &amp; billing engine.
                </p>
              </div>
              <span className="text-[7px] font-mono text-faint mt-1 border-t border-line/40 pt-0.5">Zero Order Delay</span>
            </div>

            <div className="glass rounded-xl p-2 border border-line flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-bold text-foreground">e) Dadchicko</h3>
                <p className="text-[7px] text-accent font-mono">Vendor Quick-Commerce</p>
                <p className="text-[8px] text-muted mt-0.5 leading-tight">
                  Hyperlocal quick-fulfillment platform connecting merchants to riders.
                </p>
              </div>
              <span className="text-[7px] font-mono text-faint mt-1 border-t border-line/40 pt-0.5">Smart Dispatch</span>
            </div>

            <div className="glass rounded-xl p-2 border border-line flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-bold text-foreground">f) MEDICHARM</h3>
                <p className="text-[7px] text-accent font-mono">Pharmacy Operating System</p>
                <p className="text-[8px] text-muted mt-0.5 leading-tight">
                  Vynuk pharmacy OS with batch tracking, drug alerts &amp; multi-branch sync.
                </p>
              </div>
              <span className="text-[7px] font-mono text-faint mt-1 border-t border-line/40 pt-0.5">GST &amp; Batch Sync</span>
            </div>
          </div>

          <div className="mt-2 text-center">
            <a
              href="https://www.thegr8labs.com/products"
              target="_blank"
              rel="noreferrer"
              className="inline-block font-mono text-[9px] text-accent-soft hover:underline glass px-3 py-1 rounded-full border border-accent/30 bg-accent/5"
            >
              🔗 Explore Products Hub: www.thegr8labs.com/products →
            </a>
          </div>
        </div>

        <div className="font-mono text-[9px] text-faint border-t border-line pt-2 flex justify-between mt-1">
          <a href="/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1 font-bold text-accent-soft">
            <span>🌐</span> <span>{COMPANY_DOMAIN_DISPLAY}</span>
          </a>
          <span>PAGE 08</span>
        </div>
      </div>
    ),
  },

  // PAGE 9: LIVE INNOVATIONS (PACKED TOP-TO-BOTTOM)
  {
    id: 9,
    title: "Live Innovations",
    subtitle: "APPLIED R&D & MACHINE LEARNING",
    category: "INNOVATIONS",
    content: (
      <div className="flex h-full flex-col justify-between p-5 sm:p-6 bg-surface text-foreground border border-line rounded-l-2xl">
        <div>
          <div className="flex justify-between items-center border-b border-line/60 pb-1.5">
            <span className="font-mono text-[9px] tracking-widest text-accent font-bold uppercase">
              PAGE 09 — APPLIED R&amp;D
            </span>
            <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[8px] text-accent hover:underline">
              {COMPANY_DOMAIN_DISPLAY}
            </a>
          </div>

          <p className="text-[9.5px] text-muted mt-1 leading-snug">
            Our live machine learning &amp; distributed edge models deployed across active enterprise environments:
          </p>

          <div className="mt-1.5 space-y-1.5">
            {[
              { num: "01", name: "Mule Account Engine", tech: "Machine Learning", desc: "Graph neural networks & behavioral session analysis detecting suspicious mule accounts within 50ms." },
              { num: "02", name: "Drishti Analytics", tech: "Data Intelligence", desc: "High-throughput stream processing engine handling millions of events per second with visual heatmaps." },
              { num: "03", name: "MAI Assistant", tech: "Conversational AI", desc: "Autonomous LLM meeting assistant parsing live audio, generating minutes & extracting task action items." },
              { num: "04", name: "Shipmind Edge", tech: "Edge Computing", desc: "Low-latency IoT gateway running lightweight AI models directly on industrial hardware." },
              { num: "05", name: "Catchod PMS", tech: "Enterprise Ops", desc: "Next-gen project management system featuring automated resource allocation & sprint velocity analytics." },
            ].map((inn) => (
              <div key={inn.num} className="glass rounded-xl p-1.5 border border-line flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-accent font-bold">{inn.num}. {inn.name}</span>
                  <span className="font-mono text-[7px] bg-accent/15 text-accent px-1.5 py-0.5 rounded border border-accent/30">
                    {inn.tech}
                  </span>
                </div>
                <p className="text-[8px] text-muted mt-0.5 leading-tight">{inn.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-1.5 text-center border-t border-line/40 pt-1">
            <span className="font-mono text-[7.5px] text-faint">🔒 All models operate with zero data leakage &amp; local edge encryption.</span>
          </div>
        </div>

        <div className="font-mono text-[9px] text-faint border-t border-line pt-2 flex justify-between mt-1">
          <a href="/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1 font-bold text-accent-soft">
            <span>🌐</span> <span>{COMPANY_DOMAIN_DISPLAY}</span>
          </a>
          <span>PAGE 09</span>
        </div>
      </div>
    ),
  },

  // PAGE 10: R&D ROADMAP (PACKED TOP-TO-BOTTOM)
  {
    id: 10,
    title: "R&D & Innovation Roadmap",
    subtitle: "TRANSFORMING RESEARCH INTO PRODUCT",
    category: "RESEARCH",
    content: (
      <div className="flex h-full flex-col justify-between p-5 sm:p-6 bg-surface text-foreground border border-line rounded-r-2xl">
        <div>
          <div className="flex justify-between items-center border-b border-line/60 pb-1.5">
            <span className="font-mono text-[9px] tracking-widest text-accent font-bold uppercase">
              PAGE 10 — ROADMAP
            </span>
            <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[8px] text-accent hover:underline">
              {COMPANY_DOMAIN_DISPLAY}
            </a>
          </div>

          <div className="relative my-1.5 h-18 w-full overflow-hidden rounded-xl border border-line">
            <img
              src="/magazine/rd_lab.png"
              alt="Comfinity R&D Innovation Lab"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            <span className="absolute bottom-1 left-2 font-mono text-[8px] text-accent-soft bg-background/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-line">
              Comfinity Advanced R&amp;D Innovation Lab
            </span>
          </div>

          <h3 className="text-xs font-bold text-foreground">Industry R&amp;D Frontiers</h3>
          <p className="text-[8.5px] text-muted mt-0.5 leading-tight">
            We continuously conduct applied research to solve domain-specific enterprise bottlenecks:
          </p>

          <div className="mt-1.5 grid grid-cols-2 gap-1.5 text-[8px]">
            <div className="glass p-1.5 rounded-lg border border-line">
              <span className="font-bold text-accent">🏥 Healthcare</span>
              <p className="text-[7.5px] text-muted mt-0.5">Telemedicine &amp; AI diagnostic assistance.</p>
            </div>
            <div className="glass p-1.5 rounded-lg border border-line">
              <span className="font-bold text-accent">🛍️ Commerce</span>
              <p className="text-[7.5px] text-muted mt-0.5">Hyperlocal delivery &amp; micro-fulfillment.</p>
            </div>
            <div className="glass p-1.5 rounded-lg border border-line">
              <span className="font-bold text-accent">🏭 Logistics</span>
              <p className="text-[7.5px] text-muted mt-0.5">IoT fleet tracking &amp; predictive routing.</p>
            </div>
            <div className="glass p-1.5 rounded-lg border border-line">
              <span className="font-bold text-accent">💳 Fintech</span>
              <p className="text-[7.5px] text-muted mt-0.5">Fraud detection &amp; digital identity engines.</p>
            </div>
          </div>

          <div className="mt-1.5 glass p-2 rounded-xl border border-accent/20 bg-accent/5">
            <p className="font-mono text-[7.5px] font-bold text-accent uppercase">R&amp;D METHODOLOGY</p>
            <p className="text-[8px] text-muted mt-0.5 leading-tight">
              Applied Research → Proof of Concept → Scalable Prototype → Commercial Release.
            </p>
          </div>
        </div>

        <div className="font-mono text-[9px] text-faint border-t border-line pt-2 flex justify-between mt-1">
          <a href="/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1 font-bold text-accent-soft">
            <span>🌐</span> <span>{COMPANY_DOMAIN_DISPLAY}</span>
          </a>
          <span>PAGE 10</span>
        </div>
      </div>
    ),
  },

  // PAGE 11: STRATEGIC SUMMARY (PACKED TOP-TO-BOTTOM)
  {
    id: 11,
    title: "Looking Ahead",
    subtitle: "YOUR LONG-TERM TECHNOLOGY PARTNER",
    category: "PARTNERSHIP",
    content: (
      <div className="flex h-full flex-col justify-between p-5 sm:p-6 bg-surface text-foreground border border-line rounded-l-2xl">
        <div>
          <div className="flex justify-between items-center border-b border-line/60 pb-1.5">
            <span className="font-mono text-[9px] tracking-widest text-accent font-bold uppercase">
              PAGE 11 — PARTNERSHIP
            </span>
            <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[8px] text-accent hover:underline">
              {COMPANY_DOMAIN_DISPLAY}
            </a>
          </div>

          <h2 className="font-display text-base sm:text-lg font-bold tracking-tight mt-1 text-foreground">
            Why Organizations Partner With Us
          </h2>

          <div className="mt-1.5 space-y-1.5">
            {[
              { icon: "🚀", title: "Speed to Market", desc: "Agile squads delivering production-grade platforms in weeks." },
              { icon: "🛡️", title: "Enterprise Security", desc: "ISO-compliant security, end-to-end encryption & data privacy." },
              { icon: "📈", title: "Scalability Built-In", desc: "Distributed microservices architecture ready for high concurrency." },
              { icon: "🤝", title: "Dedicated Pods", desc: "Long-term engineering support, monitoring & continuous evolution." },
            ].map((p, idx) => (
              <div key={idx} className="glass p-1.5 rounded-xl border border-line flex items-center gap-2">
                <span className="text-xs shrink-0">{p.icon}</span>
                <div>
                  <p className="text-[10px] font-bold text-foreground">{p.title}</p>
                  <p className="text-[8px] text-muted leading-tight">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 glass rounded-xl p-2 border border-accent/30 bg-accent/5 text-center">
            <p className="font-serif-accent text-[11px] text-gradient font-bold">
              &ldquo;Understand Before We Build. Turn Ideas into Impact.&rdquo;
            </p>
          </div>
        </div>

        <div className="font-mono text-[9px] text-faint border-t border-line pt-2 flex justify-between mt-1">
          <a href="/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1 font-bold text-accent-soft">
            <span>🌐</span> <span>{COMPANY_DOMAIN_DISPLAY}</span>
          </a>
          <span>PAGE 11</span>
        </div>
      </div>
    ),
  },

  // PAGE 12: BACK COVER (PACKED TOP-TO-BOTTOM)
  {
    id: 12,
    title: "Back Cover",
    subtitle: "COMFINITY TECHNOLOGIES",
    category: "BACK COVER",
    content: (
      <div className="relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-7 bg-gradient-to-tr from-surface-2 via-surface to-background text-foreground border border-line rounded-r-2xl shadow-2xl">
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative z-10 border-b border-line pb-2 flex justify-between items-center">
          <span className="font-display text-sm font-bold tracking-tight">
            comfinity<span className="text-accent">.</span>
          </span>
          <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[8px] text-accent hover:underline">
            {COMPANY_DOMAIN_DISPLAY}
          </a>
        </div>

        <div className="relative z-10 my-auto text-center py-2">
          <span className="font-mono text-[8px] bg-accent/20 text-accent-soft px-2 py-0.5 rounded-full font-bold uppercase">
            LET&rsquo;S COLLABORATE
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-foreground mt-1">
            Ready to Build the Future?
          </h2>
          <p className="text-[10.5px] text-muted max-w-xs mx-auto mt-1">
            Partner with Comfinity Technologies to transform bold ideas into measurable outcomes.
          </p>

          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <Link
              href="/contact"
              className="btn-primary !px-3.5 !py-1.5 !text-[10px]"
            >
              Get in Touch
            </Link>
            <Link
              href="/solutions"
              className="btn-ghost !px-3.5 !py-1.5 !text-[10px]"
            >
              Explore Solutions
            </Link>
          </div>
        </div>

        {/* Global Hubs & Footer */}
        <div className="relative z-10 border-t border-line pt-2 text-center space-y-1">
          <div className="flex justify-center gap-3 font-mono text-[8px] text-muted">
            <span>📍 Bengaluru, India</span>
            <span>•</span>
            <span>🌐 Global Operations</span>
          </div>
          <p className="text-[8.5px] text-faint">
            &copy; {new Date().getFullYear()} Comfinity Technologies. All rights reserved.
          </p>
          <a href="/" target="_blank" rel="noreferrer" className="font-mono text-[9px] text-accent hover:underline font-bold inline-block">
            🌐 {COMPANY_DOMAIN_DISPLAY}
          </a>
        </div>
      </div>
    ),
  },
];

function playPaperSound(audioEnabled: boolean) {
  if (!audioEnabled || typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.12);
    filter.Q.value = 1.8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // ignore audio context restrictions
  }
}

export default function MagazineBooklet() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showToc, setShowToc] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = MAGAZINE_PAGES.length;
  const maxSpreadIndex = Math.floor((totalPages - 1) / 2);
  const currentSpreadIndex = Math.floor(currentPageIndex / 2);

  const flipNext = useCallback(() => {
    if (isFlipping || currentSpreadIndex >= maxSpreadIndex) return;
    setIsFlipping(true);
    setFlipDirection("next");
    playPaperSound(audioEnabled);
    setTimeout(() => {
      setCurrentPageIndex((prev) => Math.min(totalPages - 1, prev + 2));
      setIsFlipping(false);
    }, 500);
  }, [isFlipping, currentSpreadIndex, maxSpreadIndex, totalPages, audioEnabled]);

  const flipPrev = useCallback(() => {
    if (isFlipping || currentSpreadIndex <= 0) return;
    setIsFlipping(true);
    setFlipDirection("prev");
    playPaperSound(audioEnabled);
    setTimeout(() => {
      setCurrentPageIndex((prev) => Math.max(0, prev - 2));
      setIsFlipping(false);
    }, 500);
  }, [isFlipping, currentSpreadIndex, audioEnabled]);

  const jumpToPage = (pageIdx: number) => {
    if (isFlipping) return;
    playPaperSound(audioEnabled);
    setCurrentPageIndex(pageIdx % 2 === 0 ? pageIdx : pageIdx - 1);
    setShowToc(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        flipNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        flipPrev();
      } else if (e.key === "Escape") {
        setShowToc(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flipNext, flipPrev]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const leftPage = MAGAZINE_PAGES[currentSpreadIndex * 2];
  const rightPage = MAGAZINE_PAGES[currentSpreadIndex * 2 + 1];

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-between select-none transition-all ${
        isFullscreen ? "bg-background p-4 h-screen" : "py-4 px-2 sm:px-6 min-h-[680px]"
      }`}
    >
      {/* Booklet Top Control Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between px-4 py-2 bg-surface/80 backdrop-blur-md rounded-2xl border border-line mb-4 shadow-md z-20">
        <div className="flex items-center gap-3">
          <span className="font-display font-semibold text-xs tracking-tight text-foreground">
            COMFINITY<span className="text-accent">.</span> PROFILE
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-faint">|</span>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block font-mono text-[10px] text-accent hover:underline font-bold"
          >
            🌐 {COMPANY_DOMAIN_DISPLAY}
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAudioEnabled((v) => !v)}
            title={audioEnabled ? "Paper Sound On" : "Mute Sound"}
            className={`p-1.5 px-2.5 rounded-xl border text-xs transition-colors ${
              audioEnabled ? "border-accent/40 bg-accent/10 text-accent" : "border-line text-muted hover:text-foreground"
            }`}
          >
            {audioEnabled ? "🔊 Sound" : "🔇 Muted"}
          </button>

          <button
            onClick={() => setShowToc((v) => !v)}
            className="p-1.5 px-3 rounded-xl border border-line text-xs text-muted hover:text-foreground hover:bg-surface-2 transition-colors flex items-center gap-1"
          >
            <span>📖 Index</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 px-3 rounded-xl border border-line text-xs text-muted hover:text-foreground hover:bg-surface-2 transition-colors"
          >
            {isFullscreen ? "↙ Exit" : "⛶ Fullscreen"}
          </button>
        </div>
      </div>

      {/* 3D Magazine Booklet Stage */}
      <div className="relative w-full max-w-5xl h-[540px] sm:h-[600px] my-auto flex items-center justify-center perspective-[2200px] z-10">
        <div className="relative w-full h-full max-w-4xl flex rounded-2xl overflow-hidden bg-surface-2 shadow-2xl border border-line/70">
          
          {/* LEFT PAGE */}
          <div className="w-1/2 h-full relative border-r border-line/50 bg-surface">
            {leftPage ? (
              <div className="w-full h-full p-2 sm:p-3">
                {leftPage.content}
              </div>
            ) : (
              <div className="w-full h-full bg-surface-2 opacity-50" />
            )}
            <div className="absolute top-0 right-0 bottom-0 w-10 pointer-events-none bg-gradient-to-l from-black/35 via-black/10 to-transparent" />
          </div>

          {/* RIGHT PAGE */}
          <div className="w-1/2 h-full relative bg-surface">
            {rightPage ? (
              <div className="w-full h-full p-2 sm:p-3">
                {rightPage.content}
              </div>
            ) : (
              <div className="w-full h-full bg-surface-2 opacity-50" />
            )}
            <div className="absolute top-0 left-0 bottom-0 w-10 pointer-events-none bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
          </div>

          {/* 3D PAGE TURN FLIP ANIMATION */}
          {isFlipping && (
            <div
              className={`absolute top-0 bottom-0 w-1/2 h-full z-30 transition-transform duration-500 ease-in-out pointer-events-none ${
                flipDirection === "next"
                  ? "right-0 origin-left"
                  : "left-0 origin-right"
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: flipDirection === "next" ? "rotateY(-180deg)" : "rotateY(180deg)",
              }}
            >
              <div
                className="absolute inset-0 bg-surface border border-line shadow-2xl p-2 sm:p-3"
                style={{ backfaceVisibility: "hidden" }}
              >
                {flipDirection === "next" && rightPage ? rightPage.content : leftPage?.content}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
              </div>

              <div
                className="absolute inset-0 bg-surface border border-line shadow-2xl p-2 sm:p-3"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {flipDirection === "next" && MAGAZINE_PAGES[currentSpreadIndex * 2 + 2]
                  ? MAGAZINE_PAGES[currentSpreadIndex * 2 + 2].content
                  : MAGAZINE_PAGES[currentSpreadIndex * 2 - 1]?.content}
                <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-black/20" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {currentSpreadIndex > 0 && (
          <button
            onClick={flipPrev}
            disabled={isFlipping}
            className="absolute left-2 sm:left-4 z-40 h-12 w-12 rounded-full bg-surface/90 border border-line shadow-2xl flex items-center justify-center text-foreground hover:bg-accent hover:text-white transition-all transform hover:scale-110 active:scale-95"
            title="Turn Previous Page"
          >
            ←
          </button>
        )}

        {currentSpreadIndex < maxSpreadIndex && (
          <button
            onClick={flipNext}
            disabled={isFlipping}
            className="absolute right-2 sm:right-4 z-40 h-12 w-12 rounded-full bg-surface/90 border border-line shadow-2xl flex items-center justify-center text-foreground hover:bg-accent hover:text-white transition-all transform hover:scale-110 active:scale-95"
            title="Turn Next Page"
          >
            →
          </button>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2.5 bg-surface/80 backdrop-blur-md rounded-2xl border border-line mt-4 shadow-md z-20">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-muted">Spread</span>
          <span className="font-mono font-bold text-accent">
            {currentSpreadIndex + 1} / {maxSpreadIndex + 1}
          </span>
          <span className="font-mono text-faint text-[11px]">
            (Pages {currentSpreadIndex * 2 + 1}-{Math.min(totalPages, currentSpreadIndex * 2 + 2)})
          </span>
        </div>

        <div className="flex items-center gap-1.5 max-w-md overflow-x-auto no-scrollbar py-1">
          {Array.from({ length: maxSpreadIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpToPage(idx * 2)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentSpreadIndex
                  ? "w-8 bg-accent"
                  : "w-2.5 bg-line hover:bg-muted"
              }`}
              title={`Jump to spread ${idx + 1}`}
            />
          ))}
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] text-accent hover:underline flex items-center gap-1 font-bold"
        >
          🌐 {COMPANY_DOMAIN_DISPLAY}
        </a>
      </div>

      {/* Table of Contents Drawer Modal */}
      {showToc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl p-4">
          <div className="w-full max-w-2xl bg-surface border border-line rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <div>
                <span className="font-mono text-xs text-accent uppercase tracking-widest">COMPANY PROFILE</span>
                <h3 className="font-display text-2xl font-bold text-foreground">Table of Contents</h3>
              </div>
              <button
                onClick={() => setShowToc(false)}
                className="h-10 w-10 rounded-full border border-line text-foreground flex items-center justify-center hover:bg-surface-2 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {MAGAZINE_PAGES.map((page, idx) => (
                <button
                  key={page.id}
                  onClick={() => jumpToPage(idx)}
                  className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all ${
                    idx === currentSpreadIndex * 2 || idx === currentSpreadIndex * 2 + 1
                      ? "border-accent bg-accent/10"
                      : "border-line glass hover:border-line-strong hover:bg-surface-2"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-accent tracking-wider">{page.category}</span>
                    <span className="font-mono text-xs text-faint">P. {String(page.id).padStart(2, "0")}</span>
                  </div>
                  <h4 className="font-display text-xs font-semibold text-foreground mt-1">{page.title}</h4>
                  {page.subtitle && <p className="text-[10px] text-muted mt-0.5 truncate">{page.subtitle}</p>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
