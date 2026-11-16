"use client";

import Image, { getImageProps } from "next/image";
import { AnimatePresence, motion, useIsPresent, type Variants } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, type PointerEvent } from "react";
import { useFocusTrap, useScrollLock } from "@/lib/hooks";
import { pad } from "@/lib/utils";
import type { GalleryItem } from "@/types";
import { categoryLabels } from "./labels";

type Step = 1 | -1;

type LightboxProps = {
  /** The currently filtered set — navigation stays within it. */
  items: GalleryItem[];
  index: number;
  /** Direction of the last move, used to drift the crossfade. */
  direction: Step;
  onNavigate: (step: Step) => void;
  onClose: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;
const SWIPE_DISTANCE = 48;

const frame: Variants = {
  enter: (dir: Step) => ({ opacity: 0, x: dir * 36, scale: 0.985 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.75, ease } },
  exit: (dir: Step) => ({ opacity: 0, x: dir * -36, scale: 0.985, transition: { duration: 0.5, ease } }),
};

const navButton =
  "inline-flex size-12 items-center justify-center border border-hairline-strong text-ivory transition-colors duration-500 ease-luxe hover:border-champagne hover:text-champagne disabled:pointer-events-none disabled:opacity-40";

/**
 * Full-screen viewer for the gallery. Mounted only while open (inside
 * <AnimatePresence>), so the focus trap and scroll lock follow presence.
 */
export function Lightbox({ items, index, direction, onNavigate, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const isPresent = useIsPresent();
  useScrollLock(isPresent);
  useFocusTrap(dialogRef, isPresent, onClose);

  const total = items.length;
  const item = items[index];
  const single = total < 2;

  // ← → navigation while the viewer is open.
  const navigateRef = useRef(onNavigate);
  useLayoutEffect(() => {
    navigateRef.current = onNavigate;
  });
  useEffect(() => {
    if (!isPresent) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateRef.current(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateRef.current(-1);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isPresent]);

  // Warm the cache for both neighbours so moving through a set feels instant.
  useEffect(() => {
    if (total < 2) return;
    const neighbours = [items[(index + 1) % total], items[(index - 1 + total) % total]];
    for (const neighbour of neighbours) {
      const { props } = getImageProps({
        src: neighbour.src,
        alt: "",
        fill: true,
        sizes: "100vw",
        quality: 85,
      });
      const preload = new window.Image();
      preload.decoding = "async";
      preload.sizes = "100vw";
      if (props.srcSet) preload.srcset = props.srcSet;
      preload.src = props.src;
    }
  }, [items, index, total]);

  // Horizontal swipe (touch, pen or mouse drag).
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }
  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.id !== event.pointerId || single) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.2) {
      onNavigate(dx < 0 ? 1 : -1);
    }
  }

  if (!item) return null;
  const category = categoryLabels[item.category];

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      aria-describedby={titleId}
      className="fixed inset-0 z-[80] flex flex-col bg-noir/[0.97] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.45, ease } }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease } }}
    >
      {/* Top bar — counter and close */}
      <div className="flex h-16 shrink-0 items-center justify-between gap-6 border-b border-hairline px-4 sm:h-20 sm:px-8 lg:px-12">
        <p className="flex items-baseline gap-2 text-[0.72rem] font-semibold tracking-[0.24em] text-smoke tabular-nums">
          <span aria-hidden="true" className="text-ivory">
            {pad(index + 1)}
          </span>
          <span aria-hidden="true" className="h-px w-6 translate-y-[-0.3em] self-center bg-hairline-strong" />
          <span aria-hidden="true">{pad(total)}</span>
          <span className="sr-only">
            Image {index + 1} of {total}
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          aria-label="Close viewer"
          className="group/close -mr-2 inline-flex h-11 items-center gap-3 px-2 text-[0.68rem] font-semibold tracking-[0.24em] text-ash uppercase transition-colors duration-500 hover:text-ivory"
        >
          <span aria-hidden="true" className="hidden sm:inline">
            Close
          </span>
          <X
            aria-hidden="true"
            strokeWidth={1.25}
            className="size-6 transition-transform duration-700 ease-luxe group-hover/close:rotate-90"
          />
        </button>
      </div>

      {/* Stage */}
      <div
        className="relative min-h-0 flex-1 touch-pan-y overflow-hidden select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          gesture.current = null;
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.figure
            key={item.id}
            custom={direction}
            variants={frame}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 m-0 p-3 sm:p-8 lg:px-12 lg:py-10"
          >
            <div className="relative size-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                quality={85}
                placeholder="blur"
                loading="eager"
                draggable={false}
                className="object-contain"
              />
            </div>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Caption and controls */}
      <div className="flex shrink-0 items-end justify-between gap-5 border-t border-hairline px-4 py-5 sm:px-8 sm:py-6 lg:px-12">
        <div className="min-w-0">
          <p className="eyebrow flex items-center gap-3 text-champagne">
            <span aria-hidden="true" className="gold-rule w-6" />
            {category}
          </p>
          <h2
            id={titleId}
            className="mt-2.5 font-display text-[1.45rem] leading-tight text-balance text-ivory sm:text-[1.9rem]"
          >
            {item.title}
          </h2>
          <p className="mt-2 text-xs text-smoke">
            Photograph by{" "}
            <a
              href={item.credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 py-1 text-ash underline decoration-hairline-strong underline-offset-4 transition-colors duration-500 hover:text-champagne hover:decoration-champagne"
            >
              {item.credit.photographer} on Unsplash
              <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-3" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-5">
          <p aria-hidden="true" className="hidden text-[0.65rem] tracking-[0.2em] text-smoke uppercase lg:block">
            Use ← → keys
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              disabled={single}
              aria-label="Previous image"
              className={navButton}
            >
              <ArrowLeft aria-hidden="true" strokeWidth={1.25} className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              disabled={single}
              aria-label="Next image"
              className={navButton}
            >
              <ArrowRight aria-hidden="true" strokeWidth={1.25} className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Announce each move to assistive technology. */}
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {`Image ${index + 1} of ${total}: ${item.title}, ${category}`}
      </p>
    </motion.div>
  );
}
