"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import {
  magazinePages,
  folioToIndex,
  MAGAZINE_EDITION,
  MAGAZINE_SITE,
  type Block,
  type MagazinePage,
  type PageImage,
} from "@/lib/magazineData";

/* a page renders at 440 design px, scaled up to 1.25x at most */
const IMG_SIZES = "(min-width: 900px) 560px, 92vw";
const isSvg = (src: string) => src.endsWith(".svg");

/* Pages are authored at a fixed size and the whole book is scaled to fit.
   Keeps dense editorial layouts pixel-stable at every viewport. */
const PAGE_W = 440;
const PAGE_H = 580;
const FLIP_DURATION = 1.05;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

type Leaf = { front: MagazinePage | null; back: MagazinePage | null };

/* ------------------------------------------------------------------ blocks */

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "eyebrow":
            return (
              <p key={i} className="mag-eyebrow">
                {b.text}
              </p>
            );

          case "title":
            return (
              <h2 key={i} className="mag-title">
                {b.text}
                {b.accent && (
                  <>
                    {" "}
                    <span className="font-serif-accent text-gradient">
                      {b.accent}
                    </span>
                  </>
                )}
              </h2>
            );

          case "lede":
            return (
              <p key={i} className="mag-lede">
                {b.text}
              </p>
            );

          case "para":
            return (
              <p key={i} className="mag-para">
                {b.text}
              </p>
            );

          case "quote":
            return (
              <blockquote key={i} className="mag-quote">
                &ldquo;{b.text}&rdquo;
                {b.by && <cite className="mag-quote__by">{b.by}</cite>}
              </blockquote>
            );

          case "rule":
            return <hr key={i} className="mag-rule" />;

          case "rating":
            return (
              <p
                key={i}
                className="mag-rating"
                aria-label={`${b.stars} out of 5`}
              >
                {"★".repeat(b.stars)}
              </p>
            );

          case "link":
            return (
              <Link
                key={i}
                href={b.href}
                className="mag-link"
                target={b.href.startsWith("http") ? "_blank" : undefined}
                rel={b.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {b.label} <span aria-hidden>→</span>
              </Link>
            );

          case "bullets":
            return (
              <ul key={i} className="mag-bullets">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );

          case "tags":
            return (
              <ul key={i} className="mag-tags">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );

          case "numbered":
            return (
              <ol key={i} className="mag-numbered">
                {b.items.map((it) => (
                  <li key={it.n}>
                    <span className="mag-numbered__n">{it.n}</span>
                    <div>
                      <h3 className="mag-numbered__title">{it.title}</h3>
                      <p className="mag-numbered__body">{it.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            );

          case "iconList":
            return (
              <ul key={i} className="mag-iconlist">
                {b.items.map((it) => (
                  <li key={it.title}>
                    <span className="mag-iconlist__icon" aria-hidden>
                      {it.icon}
                    </span>
                    <div>
                      <h3 className="mag-iconlist__title">{it.title}</h3>
                      <p className="mag-iconlist__body">{it.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            );

          case "cards":
            return (
              <div key={i} className="mag-cards">
                {b.items.map((it) => (
                  <div key={it.title} className="mag-card">
                    {it.thumb && (
                      <div className="mag-card__thumb">
                        <Image
                          src={it.thumb.src}
                          alt={it.thumb.alt}
                          fill
                          sizes="240px"
                          unoptimized={isSvg(it.thumb.src)}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3 className="mag-card__title">{it.title}</h3>
                    <p className="mag-card__body">{it.body}</p>
                  </div>
                ))}
              </div>
            );

          case "stats":
            return (
              <div key={i} className="mag-stats">
                {b.items.map((it) => (
                  <div key={it.label} className="mag-stat">
                    <span
                      className={`mag-stat__value${
                        it.pending ? " is-pending" : ""
                      }`}
                    >
                      {it.value}
                    </span>
                    <span className="mag-stat__label">{it.label}</span>
                  </div>
                ))}
              </div>
            );

          case "reviews":
            return (
              <div key={i} className="mag-reviews space-y-2 mt-2">
                {b.items.map((it, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={it.name}
                      className={`glass rounded-2xl p-2 border border-line/80 bg-surface-2/60 shadow-md flex items-center gap-2.5 ${
                        isEven ? "flex-row text-left" : "flex-row-reverse text-right"
                      }`}
                    >
                      {/* Avatar & Client Info */}
                      <div className="shrink-0 flex flex-col items-center justify-center w-14 text-center">
                        <div className="h-9 w-9 rounded-xl overflow-hidden border border-accent/40 shadow">
                          <img
                            src={it.avatar || "/magazine/aravind_avatar.png"}
                            alt={it.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-[8.5px] text-foreground mt-0.5 leading-none">
                          {it.name}
                        </span>
                        <span className="font-mono text-[6.5px] text-accent font-semibold leading-tight">
                          {it.org}
                        </span>
                      </div>

                      {/* Stars & Quote */}
                      <div className="flex-1">
                        <div className={`flex items-center gap-0.5 mb-0.5 ${isEven ? "justify-start" : "justify-end"}`}>
                          <span className="text-[8px] text-yellow-400 font-bold">⭐⭐⭐⭐⭐</span>
                        </div>
                        <p className="text-[8px] text-muted leading-tight italic font-serif-accent">
                          &ldquo;{it.quote}&rdquo;
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );

          case "contents":
            return (
              <ol key={i} className="mag-contents">
                {b.items.map((it) => (
                  <li key={it.n} data-folio={it.page}>
                    <span className="mag-contents__n">{it.n}</span>
                    <span className="mag-contents__label">{it.label}</span>
                    <span className="mag-contents__dots" aria-hidden />
                    <span className="mag-contents__page">{it.page}</span>
                  </li>
                ))}
              </ol>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

/* ------------------------------------------------------------------- page */

function PageArt({ art }: { art: PageImage }) {
  return (
    <div className="mag-art">
      <Image
        src={art.src}
        alt={art.alt}
        fill
        sizes={IMG_SIZES}
        unoptimized={isSvg(art.src)}
        className={art.fit === "contain" ? "object-contain" : "object-cover"}
        style={{
          objectPosition: art.position ?? "center",
          ...(art.zoom ? { transform: `scale(${art.zoom})` } : null),
        }}
      />
      <div className="mag-scrim" aria-hidden />
    </div>
  );
}

function PageFace({ page }: { page: MagazinePage }) {
  return (
    <div
      className={`mag-page mag-page--${page.variant}${
        page.image ? " mag-page--art" : ""
      }`}
    >
      {page.image && <PageArt art={page.image} />}
      {page.variant === "editorial" && page.section && (
        <span className="mag-runhead">{page.section}</span>
      )}
      <div className="mag-page__inner">
        <Blocks blocks={page.blocks} />
      </div>
      {/* running foot — plain text, not a link, so it can't fight the
          click-to-turn handler on the book */}
      <span className="mag-site">{MAGAZINE_SITE}</span>
      {page.folio !== null && <span className="mag-folio">{page.folio}</span>}
    </div>
  );
}

/* --------------------------------------------------------------- magazine */

export default function Magazine() {
  const [spread, setSpread] = useState(true);
  const [current, setCurrent] = useState(0); // number of leaves turned
  const [scale, setScale] = useState(1);

  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const leafRefs = useRef<(HTMLDivElement | null)[]>([]);
  const busy = useRef(false);
  const reduced = useRef(false);

  /* leaves ------------------------------------------------------------- */
  const leaves: Leaf[] = spread
    ? Array.from({ length: Math.ceil(magazinePages.length / 2) }, (_, i) => ({
        front: magazinePages[i * 2] ?? null,
        back: magazinePages[i * 2 + 1] ?? null,
      }))
    : magazinePages.map((p) => ({ front: p, back: null }));

  const leafCount = leaves.length;
  const maxCurrent = spread ? leafCount : leafCount - 1;

  const bookW = spread ? PAGE_W * 2 : PAGE_W;

  /* viewport mode ------------------------------------------------------ */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const sync = () => setSpread(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = rm.matches;
    const rmSync = () => (reduced.current = rm.matches);
    rm.addEventListener("change", rmSync);

    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", rmSync);
    };
  }, []);

  /* preserve reading position across a spread <-> single layout switch.
     Kept out of the setSpread updater — updaters must stay pure, or
     StrictMode's double-invoke doubles the conversion. */
  const prevSpread = useRef<boolean | null>(null);
  useEffect(() => {
    const was = prevSpread.current;
    prevSpread.current = spread;
    if (was === null || was === spread) return;
    setCurrent((c) =>
      clamp(
        spread ? Math.ceil(c / 2) : c * 2,
        0,
        spread
          ? Math.ceil(magazinePages.length / 2)
          : magazinePages.length - 1
      )
    );
  }, [spread]);

  /* fit-to-container scaling ------------------------------------------- */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const fit = () => {
      const avail = stage.clientWidth;
      const byWidth = avail / bookW;
      const byHeight = (window.innerHeight * 0.78) / PAGE_H;
      setScale(clamp(Math.min(byWidth, byHeight), 0.3, 1.25));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [bookW]);

  /* shading ------------------------------------------------------------ */
  const applyShade = useCallback((el: HTMLElement) => {
    const deg = Math.abs(Number(gsap.getProperty(el, "rotationY")) || 0);
    const t = clamp(deg / 180, 0, 1);
    const front = el.querySelector<HTMLElement>(".mag-shade--front");
    const back = el.querySelector<HTMLElement>(".mag-shade--back");
    if (front) front.style.opacity = String(clamp(t * 1.15, 0, 0.6));
    if (back) back.style.opacity = String(clamp((1 - t) * 1.15, 0, 0.6));
  }, []);

  /* keep DOM rotations in sync with state ------------------------------ */
  useEffect(() => {
    leafRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { rotationY: i < current ? -180 : 0 });
      el.style.zIndex = String(i < current ? i : leafCount - i);
      applyShade(el);
    });
  }, [current, leafCount, spread, applyShade]);

  /* turning ------------------------------------------------------------ */
  const settle = useCallback(
    (el: HTMLElement, toDeg: number, onDone: () => void) => {
      gsap.to(el, {
        rotationY: toDeg,
        duration: reduced.current ? 0.01 : FLIP_DURATION,
        ease: "power2.inOut",
        onUpdate: () => applyShade(el),
        onComplete: () => {
          el.style.removeProperty("z-index");
          onDone();
        },
      });
    },
    [applyShade]
  );

  const turn = useCallback(
    (dir: 1 | -1) => {
      if (busy.current) return;
      const target = current + dir;
      if (target < 0 || target > maxCurrent) return;
      const leafIdx = dir === 1 ? current : target;
      const el = leafRefs.current[leafIdx];
      if (!el) return;
      busy.current = true;
      el.style.zIndex = String(leafCount + 5);
      settle(el, dir === 1 ? -180 : 0, () => {
        busy.current = false;
        setCurrent(target);
      });
    },
    [current, maxCurrent, leafCount, settle]
  );

  const jumpToFolio = useCallback(
    (folio: number) => {
      if (busy.current) return;
      const pi = folioToIndex(folio);
      if (pi < 0) return;
      const target = clamp(
        spread ? Math.ceil(pi / 2) : pi,
        0,
        maxCurrent
      );
      setCurrent(target);
      const book = bookRef.current;
      if (book && !reduced.current) {
        gsap.fromTo(
          book,
          { opacity: 0.35 },
          { opacity: 1, duration: 0.45, ease: "power2.out" }
        );
      }
    },
    [spread, maxCurrent]
  );

  /* drag-to-peel -------------------------------------------------------- */
  const drag = useRef({
    active: false,
    startX: 0,
    dir: 0 as 0 | 1 | -1,
    el: null as HTMLElement | null,
    w: 1,
  });

  const onPointerDown = (e: React.PointerEvent) => {
    if (busy.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      dir: 0,
      el: null,
      w: PAGE_W * scale,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;

    if (d.dir === 0) {
      if (Math.abs(dx) < 10) return;
      const dir: 1 | -1 = dx < 0 ? 1 : -1;
      const target = current + dir;
      if (target < 0 || target > maxCurrent) {
        d.active = false;
        return;
      }
      const leafIdx = dir === 1 ? current : target;
      const el = leafRefs.current[leafIdx];
      if (!el) {
        d.active = false;
        return;
      }
      d.dir = dir;
      d.el = el;
      el.style.zIndex = String(leafCount + 5);
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    }

    if (!d.el) return;
    const p = clamp(Math.abs(dx) / d.w, 0, 1);
    gsap.set(d.el, { rotationY: d.dir === 1 ? -180 * p : -180 * (1 - p) });
    applyShade(d.el);
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;

    // no meaningful drag → treat as a click on the left/right half
    if (d.dir === 0 || !d.el) {
      const book = bookRef.current;
      if (!book) return;
      const rect = book.getBoundingClientRect();
      const hitLeft = e.clientX < rect.left + rect.width / 2;
      turn(spread && hitLeft ? -1 : 1);
      return;
    }

    const dx = e.clientX - d.startX;
    const p = clamp(Math.abs(dx) / d.w, 0, 1);
    const commit = p > 0.35;
    const el = d.el;
    const dir = d.dir;
    busy.current = true;

    if (commit) {
      settle(el, dir === 1 ? -180 : 0, () => {
        busy.current = false;
        setCurrent((c) => clamp(c + dir, 0, maxCurrent));
      });
    } else {
      settle(el, dir === 1 ? 0 : -180, () => {
        busy.current = false;
      });
    }
    d.el = null;
    d.dir = 0;
  };

  /* keyboard ------------------------------------------------------------ */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      turn(1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      turn(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setCurrent(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setCurrent(maxCurrent);
    }
  };

  /* contents jump ------------------------------------------------------- */
  const onContentsClick = (e: React.MouseEvent) => {
    const li = (e.target as HTMLElement).closest("li[data-folio]");
    if (!li) return;
    e.stopPropagation();
    const folio = Number(li.getAttribute("data-folio"));
    if (Number.isFinite(folio)) jumpToFolio(folio);
  };

  const state = current === 0 ? "closed" : current >= leafCount ? "end" : "open";
  const currentFolio = spread
    ? magazinePages[Math.min(current * 2, magazinePages.length - 1)]?.folio
    : magazinePages[current]?.folio;

  return (
    <div className="mag-root">
      <div
        ref={stageRef}
        className="mag-stage"
        style={{ height: PAGE_H * scale }}
      >
        <div
          className="mag-scaler"
          style={{
            width: bookW,
            height: PAGE_H,
            transform: `scale(${scale})`,
          }}
        >
          <div
            ref={bookRef}
            className="mag-book"
            data-mode={spread ? "spread" : "single"}
            data-state={state}
            style={
              {
                width: bookW,
                height: PAGE_H,
                "--page-w": `${PAGE_W}px`,
              } as React.CSSProperties
            }
            tabIndex={0}
            role="group"
            aria-roledescription="magazine"
            aria-label={`${MAGAZINE_EDITION}. Use arrow keys to turn pages.`}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onContentsClick}
          >
            <div className="mag-shadow" aria-hidden />

            {leaves.map((leaf, i) => (
              <div
                key={i}
                ref={(el) => {
                  leafRefs.current[i] = el;
                }}
                className="mag-leaf"
              >
                <div className="mag-face mag-face--front">
                  {leaf.front && <PageFace page={leaf.front} />}
                  <div className="mag-gutter" aria-hidden />
                  <div className="mag-shade mag-shade--front" aria-hidden />
                </div>
                <div className="mag-face mag-face--back">
                  {leaf.back ? (
                    <PageFace page={leaf.back} />
                  ) : (
                    <div className="mag-page mag-page--blank" />
                  )}
                  <div className="mag-gutter mag-gutter--back" aria-hidden />
                  <div className="mag-shade mag-shade--back" aria-hidden />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* controls */}
      <div className="mag-controls">
        <button
          type="button"
          className="mag-btn"
          onClick={() => turn(-1)}
          disabled={current === 0}
          aria-label="Previous page"
        >
          <span aria-hidden>←</span>
        </button>

        <div className="mag-progress" aria-hidden>
          <div
            className="mag-progress__bar"
            style={{
              transform: `scaleX(${maxCurrent ? current / maxCurrent : 0})`,
            }}
          />
        </div>

        <span className="mag-counter">
          {currentFolio ? `Page ${currentFolio}` : state === "closed" ? "Cover" : "Back"}
          <span className="mag-counter__total">
            {" "}
            / {magazinePages.length}
          </span>
        </span>

        <button
          type="button"
          className="mag-btn"
          onClick={() => turn(1)}
          disabled={current >= maxCurrent}
          aria-label="Next page"
        >
          <span aria-hidden>→</span>
        </button>
      </div>

      <p className="mag-hint">
        Drag a page, click either side, or use ← → to turn.
      </p>
    </div>
  );
}
