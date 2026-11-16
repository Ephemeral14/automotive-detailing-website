"use client";

import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Plus } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type UIEvent } from "react";
import { galleryCategories, galleryItems } from "@/data/gallery";
import { cn, pad } from "@/lib/utils";
import type { GalleryCategory } from "@/types";
import { categoryLabels } from "./labels";
import { Lightbox } from "./Lightbox";
import { computeMasonry } from "./masonry";
import { useColumnCount } from "./useColumnCount";

type Filter = "all" | GalleryCategory;

const filters: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "All", count: galleryItems.length },
  ...galleryCategories.map((category) => ({
    id: category.id,
    label: category.label,
    count: galleryItems.filter((item) => item.category === category.id).length,
  })),
];

const ease = [0.22, 1, 0.36, 1] as const;

const gridVariants: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.3, ease } },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease, delay: Math.min(i, 8) * 0.055 },
  }),
};

const tileSizes = "(min-width: 90rem) 440px, (min-width: 64rem) 31vw, (min-width: 40rem) 48vw, 100vw";

/** Filterable masonry gallery with a full-screen viewer. */
export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [viewer, setViewer] = useState<{ index: number; direction: 1 | -1 } | null>(null);
  const columns = useColumnCount();

  const visible = useMemo(
    () => (filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  );
  const placements = useMemo(() => (columns > 0 ? computeMasonry(visible, columns) : null), [visible, columns]);

  // Tiles by id, so focus can return to whichever frame was last viewed.
  const tiles = useRef(new Map<string, HTMLButtonElement>());
  const returnFocusTo = useRef<string | null>(null);

  function openAt(index: number) {
    setViewer({ index, direction: 1 });
  }

  function navigate(step: 1 | -1) {
    setViewer((current) =>
      current
        ? { index: (current.index + step + visible.length) % visible.length, direction: step }
        : current,
    );
  }

  function close() {
    if (viewer) returnFocusTo.current = visible[viewer.index]?.id ?? null;
    setViewer(null);
  }

  useEffect(() => {
    if (viewer !== null || !returnFocusTo.current) return;
    const tile = tiles.current.get(returnFocusTo.current);
    returnFocusTo.current = null;
    if (!tile) return;
    tile.focus({ preventScroll: true });
    tile.scrollIntoView({ block: "nearest" });
  }, [viewer]);

  // The route stays mounted (hidden) after navigating away — never come back to an open viewer.
  useLayoutEffect(() => {
    return () => {
      returnFocusTo.current = null;
      setViewer(null);
    };
  }, []);

  // Fade the filter bar's edges only where there is more to scroll to.
  const [edges, setEdges] = useState({ start: false, end: false });
  const scroller = useRef<HTMLDivElement>(null);
  function measureEdges(el: HTMLElement) {
    const max = el.scrollWidth - el.clientWidth;
    const next = { start: el.scrollLeft > 4, end: el.scrollLeft < max - 4 };
    setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
  }
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const observer = new ResizeObserver(() => measureEdges(el));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mask =
    edges.start && edges.end
      ? "[mask-image:linear-gradient(to_right,transparent,black_2.5rem,black_calc(100%-2.5rem),transparent)]"
      : edges.end
        ? "[mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)]"
        : edges.start
          ? "[mask-image:linear-gradient(to_right,transparent,black_3rem)]"
          : "";

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col border-y border-hairline md:flex-row md:items-center md:justify-between md:gap-10">
        <div
          ref={scroller}
          role="group"
          aria-label="Filter gallery by category"
          onScroll={(event: UIEvent<HTMLDivElement>) => measureEdges(event.currentTarget)}
          className={cn("no-scrollbar -mb-px flex min-w-0 overflow-x-auto", mask)}
        >
          {filters.map((option) => {
            const active = option.id === filter;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                aria-controls="gallery-grid"
                onClick={() => setFilter(option.id)}
                className={cn(
                  "group/filter flex h-14 shrink-0 items-center px-4 text-[0.68rem] font-semibold tracking-[0.22em] whitespace-nowrap uppercase transition-colors duration-500 ease-luxe first:pl-0 sm:px-5 sm:first:pl-0",
                  active ? "text-ivory" : "text-ash hover:text-ivory",
                )}
              >
                <span className="relative flex h-full items-center gap-2">
                  <span>{option.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "-translate-y-1.5 text-[0.58rem] tracking-[0.08em] tabular-nums transition-colors duration-500",
                      active ? "text-champagne" : "text-smoke group-hover/filter:text-ash",
                    )}
                  >
                    {pad(option.count)}
                  </span>
                  <span className="sr-only">({option.count} images)</span>
                  {active ? (
                    <motion.span
                      layoutId="gallery-filter-indicator"
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px bg-champagne"
                      transition={{ duration: 0.6, ease }}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          aria-atomic="true"
          className="shrink-0 border-t border-hairline py-4 text-[0.68rem] font-semibold tracking-[0.22em] text-smoke uppercase md:border-t-0 md:py-0"
        >
          Showing <span className="text-ivory tabular-nums">{visible.length}</span> images
        </p>
      </div>

      {/* Grid */}
      <div className="@container mt-8 sm:mt-10 lg:mt-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={filter}
            id="gallery-grid"
            variants={gridVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className={cn(
              "relative grid grid-flow-dense gap-(--gap)",
              "[--cols:1] [--gap:0.75rem] sm:[--cols:2] sm:[--gap:1rem] lg:[--cols:3] lg:[--gap:1.25rem]",
              "grid-cols-[repeat(var(--cols),minmax(0,1fr))]",
              "auto-rows-[calc((100cqw_-_(var(--cols)_-_1)_*_var(--gap))_/_var(--cols)_/_3)]",
            )}
          >
            {visible.map((item, i) => {
              const place = placements?.[i];
              return (
                <motion.li
                  key={item.id}
                  custom={i}
                  variants={tileVariants}
                  className={item.orientation === "portrait" ? "row-span-4" : "row-span-2"}
                  style={
                    place
                      ? { gridColumn: place.column + 1, gridRow: `${place.row + 1} / span ${place.span}` }
                      : undefined
                  }
                >
                  <button
                    ref={(el) => {
                      if (!el) return;
                      tiles.current.set(item.id, el);
                      return () => {
                        tiles.current.delete(item.id);
                      };
                    }}
                    type="button"
                    // Includes the visible caption text (WCAG 2.5.3 label in name).
                    aria-label={`Open ${pad(i + 1)} / ${categoryLabels[item.category]} ${item.title}`}
                    aria-haspopup="dialog"
                    onClick={() => openAt(i)}
                    className="group/tile relative block size-full scroll-my-28 overflow-hidden bg-onyx text-left"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes={tileSizes}
                      quality={75}
                      placeholder="blur"
                      className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover/tile:scale-[1.04] group-focus-visible/tile:scale-[1.04]"
                    />
                    {/* Legibility veil — always on for touch, revealed on hover/focus for fine pointers */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-noir/85 via-noir/15 via-45% to-transparent transition-opacity duration-700 ease-luxe pointer-fine:opacity-0 group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100"
                    />
                    {/* Champagne hairline frame */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-3 border border-champagne/0 transition-[border-color,inset] duration-1000 ease-luxe group-hover/tile:inset-4 group-hover/tile:border-champagne/45 group-focus-visible/tile:border-champagne/45 sm:inset-4 sm:group-hover/tile:inset-5"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 transition-[opacity,translate] duration-700 ease-luxe pointer-fine:translate-y-2 pointer-fine:opacity-0 group-hover/tile:translate-y-0 group-hover/tile:opacity-100 group-focus-visible/tile:translate-y-0 group-focus-visible/tile:opacity-100 sm:p-7"
                    >
                      <span className="min-w-0">
                        <span className="eyebrow block text-champagne">
                          <span className="tabular-nums">{pad(i + 1)}</span>{" "}
                          <span className="mx-1 text-champagne/50">/</span>{" "}
                          {categoryLabels[item.category]}
                        </span>{" "}
                        <span className="mt-2.5 block font-display text-[1.375rem] leading-[1.15] text-balance text-ivory sm:text-2xl">
                          {item.title}
                        </span>
                      </span>
                      <span className="grid size-10 shrink-0 place-items-center border border-ivory/25 text-ivory backdrop-blur-[2px]">
                        <Plus strokeWidth={1.25} className="size-4" />
                      </span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {viewer ? (
          <Lightbox
            key="lightbox"
            items={visible}
            index={viewer.index}
            direction={viewer.direction}
            onNavigate={navigate}
            onClose={close}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
