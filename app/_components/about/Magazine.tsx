"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import {
  Target,
  Layers,
  Boxes,
  Globe2,
  Briefcase,
  Lightbulb,
  Handshake,
  Rocket,
  LineChart,
  Code2,
  Cpu,
  FlaskConical,
  Bot,
  MonitorSmartphone,
  Cloud,
  Wrench,
  Building2,
  Factory,
  Landmark,
  ShieldCheck,
  Brain,
  Users,
  Globe,
  type LucideIcon,
} from "lucide-react";
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
const PAGE_H = 720;
const FLIP_DURATION = 1.05;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/* monogram for review cards that have no portrait on file */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

/* copy fields accept a single paragraph or several */
const toParas = (body?: string | string[]) =>
  body === undefined ? [] : Array.isArray(body) ? body : [body];

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
              <h2
                key={i}
                className={`mag-title${b.boxed ? " mag-title--boxed" : ""}`}
              >
                {b.text}
                {b.accent && (
                  <>
                    {" "}
                    <span className="mag-title__accent">{b.accent}</span>
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
              <blockquote
                key={i}
                className={`mag-quote${b.align === "center" ? " mag-quote--center" : ""
                  }${b.size === "sm" ? " mag-quote--sm" : ""}`}
              >
                &ldquo;{b.text}&rdquo;
                {b.by && <cite className="mag-quote__by">{b.by}</cite>}
              </blockquote>
            );

          case "stairs":
            return (
              <ol key={i} className="mag-stairs">
                {b.items.map((it, idx) => (
                  <li
                    key={it.n}
                    style={{ "--step": idx } as React.CSSProperties}
                  >
                    <span className="mag-stairs__block">
                      <span className="mag-stairs__n">{it.n}</span>
                      {it.icon && (
                        <span className="mag-stairs__icon" aria-hidden>
                          {it.icon}
                        </span>
                      )}
                    </span>
                    <div className="mag-stairs__text">
                      <h3 className="mag-stairs__title">{it.title}</h3>
                      {it.body && (
                        <p className="mag-stairs__body">{it.body}</p>
                      )}
                      {it.bullets && (
                        <ul className="mag-stairs__bullets">
                          {it.bullets.map((bItem, bIdx) => (
                            <li key={bIdx}>{bItem}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            );

          case "points":
            return (
              <ol key={i} className="mag-points">
                {b.items.map((it) => (
                  <li key={it.n}>
                    <span className="mag-points__n">{it.n}</span>
                    <span className="mag-points__label">{it.label}</span>
                  </li>
                ))}
              </ol>
            );

          case "calloutCard":
            return (
              <div
                key={i}
                className={`mag-callout${b.size === "sm" ? " mag-callout--sm" : ""
                  }`}
              >
                <div className="mag-callout__icons" aria-hidden>
                  {b.icons.map((ic) => (
                    <span key={ic}>{ic}</span>
                  ))}
                </div>
                <div className="mag-callout__body">
                  <p className="mag-callout__text">
                    &ldquo;{b.text}&rdquo;
                  </p>
                  {b.note && <span className="mag-callout__note">{b.note}</span>}
                </div>
              </div>
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
              <ol
                key={i}
                className={`mag-numbered${b.columns === 2 ? " mag-numbered--2col" : ""
                  }${b.art ? " mag-numbered--art" : ""}${b.art === "side" ? " mag-numbered--side" : ""
                  }`}
              >
                {b.items.map((it) => (
                  <li key={it.n}>
                    <span className="mag-numbered__n">{it.n}</span>
                    <div>
                      <h3 className="mag-numbered__title">{it.title}</h3>
                      <p className="mag-numbered__body">{it.body}</p>
                    </div>
                    {b.art && (
                      <div className="mag-numbered__art">
                        {it.image ? (
                          <Image
                            src={it.image.src}
                            alt={it.image.alt}
                            fill
                            sizes="180px"
                            unoptimized={isSvg(it.image.src)}
                            className={
                              it.image.fit === "contain"
                                ? "object-contain"
                                : "object-cover"
                            }
                            style={{ objectPosition: it.image.position ?? "center" }}
                          />
                        ) : (
                          <span className="mag-numbered__slot">Image to come</span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            );

          case "profiles":
            return (
              <div key={i} className="mag-profiles">
                {b.items.map((it, idx) => (
                  <article
                    key={idx}
                    /* the first row puts the portrait on the right, and every
                       other row after it mirrors — the pair reads as a cross */
                    className={`mag-profile${idx % 2 === 0 ? " mag-profile--right" : ""
                      }`}
                  >
                    <div
                      className={`mag-profile__art${it.image ? "" : " is-empty"
                        }`}
                    >
                      {it.image ? (
                        <Image
                          src={it.image.src}
                          alt={it.image.alt}
                          fill
                          sizes="160px"
                          unoptimized={isSvg(it.image.src)}
                          className={
                            it.image.fit === "contain"
                              ? "object-contain"
                              : "object-cover"
                          }
                          style={{
                            objectPosition: it.image.position ?? "center top",
                          }}
                        />
                      ) : (
                        <span className="mag-profile__slot">Photo</span>
                      )}
                    </div>
                    <div className="mag-profile__text">
                      {it.role && (
                        <span className="mag-profile__role">{it.role}</span>
                      )}
                      <h3 className="mag-profile__name">{it.name}</h3>
                      {it.tagline && (
                        <p className="mag-profile__tagline">{it.tagline}</p>
                      )}
                      {it.body && (
                        <p className="mag-profile__body">{it.body}</p>
                      )}
                      {it.quote && (
                        <blockquote className="mag-profile__quote">
                          &ldquo;{it.quote}&rdquo;
                        </blockquote>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            );

          case "logos":
            return (
              <ul key={i} className="mag-logos">
                {b.items.map((it, idx) => (
                  <li
                    key={idx}
                    className={`mag-logo${it.src ? "" : " is-empty"}`}
                  >
                    {it.src ? (
                      <Image
                        src={it.src}
                        alt={it.alt ?? it.name ?? ""}
                        fill
                        sizes="90px"
                        unoptimized={isSvg(it.src)}
                        className="object-contain"
                      />
                    ) : (
                      <span className="mag-logo__slot">Logo</span>
                    )}
                  </li>
                ))}
              </ul>
            );

          case "iconList":
            return (
              <ul
                key={i}
                className={`mag-iconlist${b.size === "sm" ? " mag-iconlist--sm" : ""
                  }`}
              >
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

          case "split":
            return (
              <div key={i} className="mag-split">
                <div className="mag-split__art">
                  <Image
                    src={b.image.src}
                    alt={b.image.alt}
                    fill
                    sizes="220px"
                    unoptimized={isSvg(b.image.src)}
                    className={
                      b.image.fit === "contain"
                        ? "object-contain"
                        : "object-cover"
                    }
                    style={{ objectPosition: b.image.position ?? "center" }}
                  />
                </div>
                <div className="mag-split__panel">
                  <Blocks blocks={b.blocks} />
                </div>
              </div>
            );

          case "figure":
            return (
              <figure
                key={i}
                className={`mag-figure${b.fill ? " mag-figure--fill" : ""}${b.bare ? " mag-figure--bare" : ""
                  }`}
              >
                <div
                  className="mag-figure__frame"
                  style={b.fill ? undefined : { aspectRatio: b.ratio ?? "16/9" }}
                >
                  <Image
                    src={b.image.src}
                    alt={b.image.alt}
                    fill
                    sizes={IMG_SIZES}
                    unoptimized={isSvg(b.image.src)}
                    className={
                      b.image.fit === "contain"
                        ? "object-contain"
                        : "object-cover"
                    }
                    style={{ objectPosition: b.image.position ?? "center" }}
                  />
                </div>
                {b.caption && (
                  <figcaption className="mag-figure__caption">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "deviceCluster":
            return (
              <div key={i} className="mag-cluster">
                <div className="mag-cluster__screen mag-cluster__screen--center">
                  <Image
                    src={b.center.src}
                    alt={b.center.alt}
                    fill
                    sizes="180px"
                    unoptimized={isSvg(b.center.src)}
                    className={
                      b.center.fit === "contain"
                        ? "object-contain"
                        : "object-cover"
                    }
                    style={{ objectPosition: b.center.position ?? "center top" }}
                  />
                </div>
                {b.around.map((img) => (
                  <div key={img.src} className="mag-cluster__screen">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="120px"
                      unoptimized={isSvg(img.src)}
                      className={
                        img.fit === "contain"
                          ? "object-contain"
                          : "object-cover"
                      }
                      style={{ objectPosition: img.position ?? "center top" }}
                    />
                  </div>
                ))}
              </div>
            );

          case "duo":
            return (
              <div key={i} className="mag-duo">
                <div className="mag-duo__panel">
                  <h3 className="mag-duo__title">{b.left.title}</h3>
                  {toParas(b.left.body).map((para) => (
                    <p key={para} className="mag-duo__body">
                      {para}
                    </p>
                  ))}
                  {b.left.bullets && (
                    <ul className="mag-duo__bullets">
                      {b.left.bullets.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mag-duo__panel">
                  <h3 className="mag-duo__title">{b.right.title}</h3>
                  {toParas(b.right.body).map((para) => (
                    <p key={para} className="mag-duo__body">
                      {para}
                    </p>
                  ))}
                  <div className="mag-duo__art">
                    {b.right.image ? (
                      <Image
                        src={b.right.image.src}
                        alt={b.right.image.alt}
                        fill
                        sizes="220px"
                        unoptimized={isSvg(b.right.image.src)}
                        className={
                          b.right.image.fit === "contain"
                            ? "object-contain"
                            : "object-cover"
                        }
                        style={{
                          objectPosition: b.right.image.position ?? "center",
                        }}
                      />
                    ) : (
                      <span className="mag-duo__slot">Image to come</span>
                    )}
                  </div>
                  {b.right.caption && (
                    <p className="mag-duo__caption">{b.right.caption}</p>
                  )}
                </div>
              </div>
            );

          case "iconCards":
            return (
              <div
                key={i}
                className={`mag-iconcards${b.columns === 1 ? " mag-iconcards--row" : " mag-iconcards--col"
                  }`}
                style={{
                  gridTemplateColumns: `repeat(${b.columns ?? 3}, 1fr)`,
                }}
              >
                {b.items.map((it) => (
                  <div key={it.title} className="mag-iconcard">
                    {it.image ? (
                      <div className="mag-iconcard__avatar">
                        <img
                          src={it.image}
                          alt={it.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      it.icon && (
                        <span className="mag-iconcard__icon" aria-hidden>
                          {it.icon}
                        </span>
                      )
                    )}
                    <h3 className="mag-iconcard__title">{it.title}</h3>
                    {it.body && <p className="mag-iconcard__body">{it.body}</p>}
                  </div>
                ))}
              </div>
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

          case "sites":
            return (
              <div
                key={i}
                className={`mag-sites${b.layout === "rows" ? " mag-sites--rows" : ""
                  }`}
              >
                {b.items.map((it, idx) => (
                  <article
                    key={idx}
                    /* a row with no art is copy alone — no waiting frame */
                    className={`mag-sitecard${b.layout === "rows" && !it.image
                      ? " mag-sitecard--text"
                      : ""
                      }`}
                  >
                    {it.images ? (
                      <div className="mag-sitecard__shots">
                        {it.images.map((img, k) => (
                          <div key={k} className="mag-sitecard__shot">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              sizes="180px"
                              unoptimized={isSvg(img.src)}
                              className={
                                img.fit === "contain"
                                  ? "object-contain"
                                  : "object-cover"
                              }
                              style={{
                                objectPosition: img.position ?? "center top",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (it.image || b.layout !== "rows") ? (
                      <div
                        className={`mag-sitecard__shot${it.image ? "" : " is-empty"
                          }`}
                      >
                        {it.image ? (
                          <Image
                            src={it.image.src}
                            alt={it.image.alt}
                            fill
                            sizes="340px"
                            unoptimized={isSvg(it.image.src)}
                            className={
                              it.image.fit === "contain"
                                ? "object-contain"
                                : "object-cover"
                            }
                            style={{
                              objectPosition: it.image.position ?? "center top",
                            }}
                          />
                        ) : (
                          <span className="mag-sitecard__slot">
                            Image to come
                          </span>
                        )}
                      </div>
                    ) : null}
                    {it.name || it.url || it.body ? (
                      <div className="mag-sitecard__text">
                        {it.name && (
                          <h3 className="mag-sitecard__name">{it.name}</h3>
                        )}
                        {it.url && (
                          <span className="mag-sitecard__url">{it.url}</span>
                        )}
                        {it.body && (
                          <p className="mag-sitecard__body">{it.body}</p>
                        )}
                      </div>
                    ) : b.layout === "rows" ? (
                      /* a row is art beside copy — hold the second column so the
                         card doesn't read as half-built while copy is pending */
                      <div className="mag-sitecard__text">
                        <span className="mag-sitecard__slot">
                          Description to come
                        </span>
                      </div>
                    ) : null}
                    {/* in the grid form a card with no copy is art on its own,
                        so no empty caption strip is printed under it */}
                  </article>
                ))}
              </div>
            );

          case "stats":
            return (
              <div
                key={i}
                className={`mag-stats${b.columns === 4 ? " mag-stats--strip" : ""
                  }`}
              >
                {b.items.map((it) => (
                  <div key={it.label} className="mag-stat">
                    <span
                      className={`mag-stat__value${it.pending ? " is-pending" : ""
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
              <div key={i} className="mag-reviews">
                {b.items.map((it, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={it.name}
                      className={`mag-review${it.pending ? " is-pending" : ""} ${isEven
                        ? "flex-row text-left self-start"
                        : "flex-row-reverse text-right self-end"
                        }`}
                    >
                      {/* Avatar & Client Info */}
                      <div className="shrink-0 flex flex-col items-center justify-center w-12 text-center">
                        <div className="mag-review__avatar">
                          {it.avatar ? (
                            <img
                              src={it.avatar}
                              alt={it.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span aria-hidden>{initials(it.name)}</span>
                          )}
                        </div>
                        <span className="mag-review__name">{it.name}</span>
                        <span className="mag-review__org">{it.org}</span>
                      </div>

                      {/* Stars & Quote */}
                      <div
                        className={`flex-1 min-w-0 flex flex-col justify-center ${isEven ? "items-start" : "items-end"
                          }`}
                      >
                        {!it.pending && (
                          <div className="flex items-center gap-0.5 mb-0.5">
                            <span className="mag-review__stars">★★★★★</span>
                          </div>
                        )}
                        <p
                          className={`mag-review__quote${it.pending ? " is-pending" : ""
                            }`}
                        >
                          {it.pending
                            ? "Quote pending client sign-off"
                            : `“${it.quote}”`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );

          case "quoteCards":
            return (
              <div
                key={i}
                className={`mag-quotecards${b.size === "sm" ? " mag-quotecards--sm" : ""
                  }`}
              >
                {b.items.map((it, idx) => (
                  <figure key={idx} className="mag-quotecard">
                    <span className="mag-quotecard__mark" aria-hidden>
                      &ldquo;
                    </span>
                    <blockquote
                      className={`mag-quotecard__text${it.text ? "" : " is-pending"
                        }`}
                    >
                      {it.text ?? "Quote to come"}
                    </blockquote>
                    <figcaption className="mag-quotecard__by">
                      <span
                        className={`mag-quotecard__avatar${it.avatar ? "" : " is-empty"
                          }`}
                      >
                        {it.avatar && (
                          <Image
                            src={it.avatar.src}
                            alt={it.avatar.alt}
                            fill
                            sizes="60px"
                            unoptimized={isSvg(it.avatar.src)}
                            className="object-cover"
                            style={{
                              objectPosition: it.avatar.position ?? "center top",
                            }}
                          />
                        )}
                      </span>
                      <span className="mag-quotecard__names">
                        <span
                          className={`mag-quotecard__name${it.by ? "" : " is-pending"
                            }`}
                        >
                          {it.by ?? "Name to come"}
                        </span>
                        {it.role && (
                          <span className="mag-quotecard__role">{it.role}</span>
                        )}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            );

          case "imageStrip":
            return (
              <div key={i} className="mag-imagestrip">
                {b.images.map((img, idx) => (
                  <div key={idx} className="mag-imagestrip__item">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            );

          case "people":
            return (
              <div
                key={i}
                className={`mag-people${b.columns === 2 ? " mag-people--pair" : ""
                  }`}
                style={{
                  gridTemplateColumns: `repeat(${b.columns ?? 4}, 1fr)`,
                }}
              >
                {b.items.map((it, idx) => (
                  <figure key={idx} className="mag-person">
                    <div
                      className={`mag-person__frame${it.image ? "" : " is-empty"
                        }`}
                    >
                      {it.image ? (
                        <Image
                          src={it.image.src}
                          alt={it.image.alt}
                          fill
                          sizes="110px"
                          unoptimized={isSvg(it.image.src)}
                          className={
                            it.image.fit === "contain"
                              ? "object-contain"
                              : "object-cover"
                          }
                          style={{
                            objectPosition: it.image.position ?? "center top",
                          }}
                        />
                      ) : (
                        <span className="mag-person__slot">Photo</span>
                      )}
                    </div>
                    {(it.name || it.role || it.body) && (
                      <figcaption className="mag-person__cap">
                        {it.name && (
                          <span className="mag-person__name">{it.name}</span>
                        )}
                        {it.role && (
                          <span className="mag-person__role">{it.role}</span>
                        )}
                        {it.body && (
                          <p className="mag-person__body">{it.body}</p>
                        )}
                      </figcaption>
                    )}
                  </figure>
                ))}
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
        className={
          art.fit === "fill"
            ? "object-fill"
            : art.fit === "contain"
            ? "object-contain"
            : "object-cover"
        }
        style={{
          objectPosition: art.position ?? "center",
          ...(art.zoom ? { transform: `scale(${art.zoom})` } : null),
        }}
      />
      <div className="mag-scrim" aria-hidden />
    </div>
  );
}

function WhoWeAreCustomPage() {
  const missionItems = [
    { icon: ShieldCheck, text: "Understand Before We Build", badgeClass: "bg-[#1c2452] text-white" },
    { icon: Rocket, text: "Drive Meaningful Innovation", badgeClass: "bg-brand-cyan text-brand-navy" },
    { icon: Handshake, text: "Build Long-Term Partnerships", badgeClass: "border border-[var(--paper-line)] bg-brand-ice/50 text-brand-navy" },
  ];

  const visionItems = [
    {
      icon: Brain,
      text: "TRANSFORM CHALLENGES INTO INTELLIGENCE",
      badgeClass: "bg-[#1c2452] text-white",
      ringClass: "border-brand-navy/20",
    },
    {
      icon: Lightbulb,
      text: "TURN IDEAS INTO IMPACT",
      badgeClass: "bg-brand-cyan text-brand-navy",
      ringClass: "border-brand-cyan/40",
    },
    {
      icon: Users,
      text: "BUILD THE FUTURE TOGETHER",
      badgeClass: "border border-brand-navy/20 bg-brand-ice/60 text-brand-navy",
      ringClass: "border-brand-navy/20",
    },
  ];

  return (
    <div className="flex flex-col gap-2 h-full justify-between pb-7">
      {/* Header Index Marker */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-widest text-brand-cyan font-bold">
          <span>01</span>
          <span className="text-[var(--ink-faint)]">—</span>
          <span className="text-[var(--ink)]">WHO WE ARE</span>
        </div>
        <span
          aria-hidden
          className="flex h-5 w-5 items-center justify-center rounded bg-brand-navy text-[9.5px] font-bold tabular-nums text-brand-cream"
        >
          01
        </span>
      </div>

      {/* Title */}
      <div className="mt-1 rounded-xl border border-[var(--paper-line)] bg-[var(--paper-2)] px-5 py-3 shadow-xs">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-none tracking-tight text-[var(--ink)]">
          Who We <em className="font-medium italic text-brand-cyan">Are.</em>
        </h1>
      </div>

      {/* About Us Split: 50/50 equal grid split, vertically tall */}
      <div className="grid grid-cols-2 gap-3 items-stretch">
        <div className="relative aspect-[3/4] min-h-[140px] overflow-hidden rounded-xl border border-[var(--paper-line)] shadow-xs">
          <Image
            src="https://res.cloudinary.com/xnulqi5v/image/upload/v1786005301/WhatsApp_Image_2026-08-06_at_1.21.56_PM_bqdwi2.jpg"
            alt="Comfinity leadership"
            fill
            sizes="(max-width: 640px) 50vw, 200px"
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 50%, rgba(30,39,97,0.3) 100%)" }}
          />
        </div>
        <div className="flex flex-col justify-center rounded-xl border border-[var(--paper-line)] bg-[var(--paper-2)] p-3.5 shadow-xs">
          <p className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-cyan">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-brand-cyan" />
            ABOUT US
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-[var(--ink-soft)] font-serif">
            We are a team of technology enthusiasts and industry experts, committed to helping organizations turn complexity into clarity and ideas into measurable impact.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-cyan mb-1">
          OUR MISSION
        </p>
        <div className="flex flex-col gap-1.5">
          {missionItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                className="flex items-center gap-2.5 rounded-xl border border-[var(--paper-line)] bg-[var(--paper-2)] px-2.5 py-1.5 shadow-xs"
              >
                <span
                  className={`flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full ${item.badgeClass}`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                <span className="flex-1 font-serif text-sm sm:text-base font-normal text-[var(--ink)]">
                  {item.text}
                </span>
                <span className="font-sans text-[10px] font-bold tabular-nums text-brand-cyan">
                  0{i + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Our Vision */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-cyan mb-1">
          OUR VISION
        </p>
        <div className="grid grid-cols-3 gap-2">
          {visionItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-[var(--paper-line)] bg-[var(--paper-2)] p-2 text-center shadow-xs"
              >
                <div className={`relative flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full border ${item.ringClass} ${item.badgeClass}`}>
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <span className="text-xs sm:text-sm font-serif font-medium leading-tight tracking-normal text-[var(--ink)]">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ContentsCustomPage() {
  const galleryImages = [
    {
      src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007588/WhatsApp_Image_2026-08-06_at_2.00.13_PM_ya5hpr.jpg",
      alt: "Comfinity operations",
    },
    {
      src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007589/WhatsApp_Image_2026-08-06_at_2.00.13_PM_2_qpltah.jpg",
      alt: "Comfinity team collaboration",
    },
    {
      src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007630/WhatsApp_Image_2026-08-06_at_2.01.21_PM_sn0rp4.jpg",
      alt: "Comfinity technology development",
    },
    {
      src: "https://res.cloudinary.com/xnulqi5v/image/upload/v1786007631/WhatsApp_Image_2026-08-06_at_2.00.13_PM_1_yyhosz.jpg",
      alt: "Comfinity executive presentation",
    },
  ];

  const entries = [
    { number: "01", title: "Business First" },
    { number: "02", title: "Innovation with Purpose" },
    { number: "03", title: "Partnership & Trust" },
    { number: "04", title: "Excellence in Execution" },
    { number: "05", title: "Continuous Learning" },
    { number: "06", title: "Integrity" },
  ];

  return (
    <div className="flex flex-col gap-2 h-full justify-between pb-7">
      {/* Header index */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-widest text-[var(--ink-faint)] font-bold">
          CONTENTS
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-widest text-brand-cyan font-bold">
          <span>CONTENTS</span>
          <span className="text-[var(--ink-faint)]">—</span>
          <span>02</span>
        </div>
      </div>

      {/* Title Plate (Matching Who We Are) */}
      <div className="mt-1 rounded-xl border border-[var(--paper-line)] bg-[var(--paper-2)] px-5 py-3 shadow-xs">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-none tracking-tight text-[var(--ink)]">
          Contents<em className="font-medium italic text-brand-cyan">.</em>
        </h1>
      </div>

      {/* Quote */}
      <p className="border-l-2 border-brand-cyan pl-3 font-serif text-base sm:text-lg italic leading-relaxed text-[var(--ink)]">
        &ldquo;From complexity to clarity. From ideas to impact.&rdquo;
      </p>

      {/* Gallery Strip */}
      <div className="grid grid-cols-4 gap-1 rounded-xl overflow-hidden border border-[var(--paper-line)] bg-[var(--paper-2)] p-1 shadow-xs">
        {galleryImages.map((img, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-[var(--paper-2)]">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Contents List */}
      <div className="flex-1 min-h-0 flex flex-col justify-center">
        <ul className="flex flex-col gap-1 my-0.5">
          {entries.map((entry) => (
            <li key={entry.number} className="flex items-center gap-4 py-2 border-b border-[var(--paper-line)]/50 last:border-b-0">
              <span className="font-sans text-sm sm:text-base font-bold text-brand-cyan w-6 shrink-0 tracking-tight">{entry.number}</span>
              <span className="font-serif text-base sm:text-lg font-normal text-[var(--ink)] flex-1">{entry.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quote Callout Card (Bottom) */}
      <div className="flex items-center gap-3.5 rounded-xl border border-[var(--paper-line)] bg-[var(--paper-2)] p-3 shadow-xs">
        <span className="flex items-center -space-x-1.5 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1c2452] text-white text-xs">
            <Users className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cyan text-brand-navy text-xs">
            <Globe className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-sm sm:text-base lg:text-lg italic text-[var(--ink)] leading-snug">
            &ldquo;Things get interesting when you flip it.&rdquo;
          </p>
          <p className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-brand-cyan">
            COMFINITYINDIA.COM
          </p>
        </div>
      </div>
    </div>
  );
}

type WhyUsItemData = {
  label: string;
  icon: LucideIcon;
};

type WhyUsCardData = {
  number: string;
  title: string;
  icon: LucideIcon;
  items: WhyUsItemData[];
};

const MAGAZINE_WHY_US_CARDS: WhyUsCardData[] = [
  {
    number: "01",
    title: "The Comfinity Difference",
    icon: Target,
    items: [
      { label: "Business-First Thinking", icon: Briefcase },
      { label: "Innovation with Purpose", icon: Lightbulb },
      { label: "End-to-End Technology Partnership", icon: Handshake },
      { label: "Building the Future Together", icon: Rocket },
    ],
  },
  {
    number: "02",
    title: "Our Expertise (Capabilities)",
    icon: Layers,
    items: [
      { label: "Business Strategy & Transformation", icon: LineChart },
      { label: "Digital Engineering & Product Development", icon: Code2 },
      { label: "AI, Automation & Intelligent Systems", icon: Cpu },
      { label: "Innovation, Research & Talent Development", icon: FlaskConical },
    ],
  },
  {
    number: "03",
    title: "Solutions We Deliver (Services)",
    icon: Boxes,
    items: [
      { label: "AI & Intelligent Automation", icon: Bot },
      { label: "Custom Software & Digital Platforms", icon: MonitorSmartphone },
      { label: "Digital Transformation & Cloud Solutions", icon: Cloud },
      { label: "Product Engineering & Technology Consulting", icon: Wrench },
    ],
  },
  {
    number: "04",
    title: "Industries We Empower (Who You Serve)",
    icon: Globe2,
    items: [
      { label: "Startups & Scale-ups", icon: Rocket },
      { label: "Enterprises", icon: Building2 },
      { label: "Industry Verticals", icon: Factory },
      { label: "Government & Innovation Ecosystems", icon: Landmark },
    ],
  },
];

function WhyUsCustomPage() {
  return (
    <div className="flex flex-col gap-2 h-full w-full justify-between overflow-hidden pb-1">
      {/* Corner tab / section index marker */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-brand-cyan font-bold">
          <span>03</span>
          <span className="text-[var(--ink-faint)]">—</span>
          <span className="text-[var(--ink)]">WHY US</span>
        </div>
        <span
          aria-hidden
          className="flex h-5 w-5 items-center justify-center rounded bg-brand-navy text-[9px] font-bold tabular-nums text-brand-cream"
        >
          03
        </span>
      </div>

      {/* Photo header with diagonal navy color-block bleed */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[var(--paper-line)] shrink-0 shadow-xs">
        <img
          src="/images/why-us-team.png"
          alt="Comfinity technology team collaborating in a modern office"
          className="h-24 sm:h-28 lg:h-30 w-full object-cover"
          crossOrigin="anonymous"
        />
        <div
          className="absolute inset-0 flex flex-col justify-end p-3 sm:p-3.5"
          style={{
            background:
              "linear-gradient(115deg, rgba(30,39,97,0.92) 42%, rgba(30,39,97,0.55) 62%, rgba(30,39,97,0) 88%)",
          }}
        >
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
            THE COMFINITY EDGE
          </p>
          <h2 className="mt-0.5 font-serif text-2xl sm:text-3xl lg:text-4xl font-light leading-none tracking-tight text-white">
            Why <span className="font-medium italic text-brand-cyan">us.</span>
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 w-full shrink-0">
        {MAGAZINE_WHY_US_CARDS.map((card, i) => {
          const Icon = card.icon;
          const filled = i % 2 === 0;
          return (
            <article
              key={card.number}
              className="flex w-full gap-2.5 rounded-xl border border-[var(--paper-line)] bg-[var(--paper-2)] p-2 sm:p-2.5 shadow-xs"
            >
              <div className="flex shrink-0 flex-col items-center gap-1 pt-0.5">
                <span
                  className={`font-serif text-base font-bold leading-none tabular-nums ${filled ? "text-brand-navy dark:text-brand-cyan" : "text-brand-cyan"
                    }`}
                >
                  {card.number}
                </span>
                <span
                  className={`flex h-5.5 w-5.5 items-center justify-center rounded-md ${filled
                    ? "bg-brand-navy text-brand-cream"
                    : "border border-brand-cyan/40 bg-brand-ice/40 text-brand-cyan"
                    }`}
                >
                  <Icon className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-xs sm:text-[13.5px] font-bold leading-tight text-[var(--ink)]">
                  {card.title}
                </h3>
                <ul className="mt-1 flex flex-col gap-1">
                  {card.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <li
                        key={item.label}
                        className="flex items-center gap-1.5 font-serif text-[11.5px] sm:text-[12.5px] font-medium text-[var(--ink)] leading-snug"
                      >
                        <span
                          aria-hidden
                          className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-brand-ice/50 text-brand-navy"
                        >
                          <ItemIcon className="h-2 w-2" strokeWidth={2} />
                        </span>
                        <span>{item.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

const MAGAZINE_CLIENT_REVIEWS = [
  {
    initial: "A",
    name: "Ajay",
    org: "REPZ PLATFORM",
    quote:
      "Managing our gym used to be fragmented. REPZ brought everything into one platform, giving us complete visibility.",
  },
  {
    initial: "S",
    name: "Sreejith",
    org: "MINUTE BAZAAR",
    quote:
      "Going online was so easy! Order management and delivery run smoothly every day, and customers are happy.",
  },
  {
    initial: "V",
    name: "Vignesh",
    org: "FLIQKET OTT",
    quote:
      "What impressed us most was Fliqket's creator-first approach, secure streaming, and audience analytics.",
  },
  {
    initial: "A",
    name: "Aravind",
    org: "RETAIL MARKETPLACE",
    quote:
      "Comfinity helped transform our grocery store into a digital marketplace. Everything is effortless now.",
  },
  {
    initial: "S",
    name: "Sujin",
    org: "MEDICHARM PHARMA",
    quote:
      "Managing inventory across branches used to be chaotic. Their system gave us complete real-time sync.",
  },
  {
    initial: "A",
    name: "Arun",
    org: "REZTOS OS",
    quote:
      "Reztos made running our restaurant so much easier — QR ordering, billing, and multi-outlet management in one.",
  },
];

function ClientReviewsCustomPage() {
  return (
    <div className="flex flex-col gap-1.5 h-full w-full justify-between overflow-hidden pb-1">
      {/* Corner tab / section index marker */}
      <div className="flex items-center justify-between">
        <span
          aria-hidden
          className="flex h-5 w-5 items-center justify-center rounded bg-brand-cyan text-[9px] font-bold tabular-nums text-white"
        >
          04
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-brand-cyan font-bold">
          <span>04</span>
          <span className="text-[var(--ink-faint)]">—</span>
          <span className="text-[var(--ink)]">CLIENT REVIEWS</span>
        </div>
      </div>

      {/* 7 Equal Height Cards (6 Review Cards + 1 Bottom Callout Banner) */}
      <div className="grid grid-cols-1 grid-rows-7 gap-1.5 flex-1 w-full min-h-0">
        {MAGAZINE_CLIENT_REVIEWS.map((rev) => (
          <article
            key={rev.name + rev.org}
            className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#1c2452] p-2.5 sm:p-3 text-white shadow-xs min-h-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cyan text-white text-[9px] font-bold">
                  {rev.initial}
                </span>
                <div className="flex items-center gap-0.5 text-brand-cyan text-[9px]">
                  ★★★★★
                </div>
              </div>
              <span className="text-brand-cyan/40 font-serif text-lg font-bold leading-none">
                &rdquo;
              </span>
            </div>

            <p className="font-serif text-[11.5px] sm:text-[12.5px] font-medium leading-tight text-white line-clamp-2">
              {rev.quote}
            </p>

            <div className="flex items-center gap-1.5 font-serif text-[9.5px] sm:text-[10px] font-bold leading-none">
              <span className="text-white">{rev.name}</span>
              <span className="text-brand-cyan uppercase tracking-wider font-mono text-[8px]">
                {rev.org}
              </span>
            </div>
          </article>
        ))}

        {/* 7th Card: Bottom Banner Callout matching EXACT height of review cards */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--paper-line)] bg-brand-navy p-2.5 sm:p-3 text-white shadow-xs min-h-0">
          <img
            src="/images/why-us-team.png"
            alt="Trusted across industries"
            className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none"
          />
          <div className="relative z-10 flex flex-col justify-center pt-0.5">
            <h3 className="font-serif text-sm sm:text-base font-bold text-white leading-none">
              Trusted across industries
            </h3>
          </div>
          <Link
            href="/works"
            className="relative z-10 flex items-center justify-between font-mono text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider text-brand-cyan hover:text-white transition-colors leading-none"
          >
            <span>READ ALL CLIENT REVIEWS</span>
            <span aria-hidden className="text-xs">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function PageFace({ page }: { page: MagazinePage }) {
  return (
    <div
      className={`mag-page mag-page--${page.variant}${page.image ? " mag-page--art" : ""
        }`}
    >
      {page.image && <PageArt art={page.image} />}
      {page.logo && (
        <div className="mag-coverlogo">
          <Image
            src={page.logo.src}
            alt={page.logo.alt}
            fill
            sizes="120px"
            className="object-contain"
          />
        </div>
      )}
      {page.variant === "editorial" && page.section && page.folio !== 2 && page.folio !== 3 && page.folio !== 4 && page.folio !== 5 && (
        <span className="mag-runhead">{page.section}</span>
      )}
      <div className="mag-page__inner">
        {page.folio === 2 ? (
          <WhoWeAreCustomPage />
        ) : page.folio === 3 ? (
          <ContentsCustomPage />
        ) : page.folio === 4 ? (
          <WhyUsCustomPage />
        ) : page.folio === 5 ? (
          <ClientReviewsCustomPage />
        ) : (
          <Blocks blocks={page.blocks} />
        )}
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
      const byHeight = (window.innerHeight * 0.86) / PAGE_H;
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
