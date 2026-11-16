"use client";

import Image from "next/image";
import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { ChevronsLeftRight } from "lucide-react";
import { DemoBadge, DemoNote } from "@/components/ui/DemoNote";
import { photos } from "@/data/images";
import type { Photo } from "@/types";
import { cn, pad } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────
   Simulated "neglected" finishes — pure CSS over the same photograph.
   ────────────────────────────────────────────────────────────── */

function speckles(rgb: string, density: number, seed: number) {
  // fractal noise → hard threshold on the red channel = sparse specks
  const [r, g, b] = rgb.split(" ");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' seed='${seed}' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  ${density} 0 0 0 ${-(density * 0.6).toFixed(2)}'/></filter><rect width='100%' height='100%' filter='url(#f)'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

type Showcase = {
  id: "paint" | "wheel";
  tab: string;
  title: string;
  description: string;
  simulated: string;
  photo: Photo;
  /** CSS filter applied to the "before" copy of the photograph. */
  filter: string;
  /** Layers painted over the "before" copy (swirls, haze, dust). */
  overlays: CSSProperties[];
};

const showcases: Showcase[] = [
  {
    id: "paint",
    tab: "Paint finish",
    title: "Paint correction",
    description:
      "Machine polishing levels the clear coat to remove swirl marks, holograms and haze — restoring depth, colour and crisp, undistorted reflections.",
    simulated: "Swirls around highlights, oxidised haze and dulled colour",
    photo: photos.homeBaPaint,
    filter: "grayscale(0.4) saturate(0.55) contrast(0.7) brightness(0.9) sepia(0.12)",
    overlays: [
      {
        // Concentric "spider-web" swirls catching the light sources
        backgroundImage: [
          "repeating-radial-gradient(circle at 25% 80%, rgb(255 255 255 / 0.09) 0 1px, transparent 1px 6px)",
          "repeating-radial-gradient(circle at 62% 43%, rgb(255 255 255 / 0.07) 0 1px, transparent 1px 8px)",
          "repeating-radial-gradient(circle at 8% 42%, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 7px)",
        ].join(","),
        mixBlendMode: "screen",
        maskImage: "radial-gradient(ellipse 85% 85% at 40% 60%, #000 30%, transparent 85%)",
      },
      {
        // Water spotting / bonded contamination
        backgroundImage: speckles("1 1 1", 9, 7),
        backgroundSize: "260px 260px",
        opacity: 0.35,
        mixBlendMode: "screen",
      },
      {
        // Milky oxidised haze
        background: "linear-gradient(160deg, rgb(225 220 205 / 0.16), rgb(225 220 205 / 0.06) 55%, rgb(225 220 205 / 0.12))",
      },
    ],
  },
  {
    id: "wheel",
    tab: "Wheel finish",
    title: "Wheel detailing",
    description:
      "Faces, spokes and barrels are decontaminated by hand to lift bonded brake dust and iron fallout, then sealed so the finish stays cleaner for longer.",
    simulated: "Baked-on brake dust, iron fallout and a flat, clouded lip",
    photo: photos.homeBaWheel,
    filter: "saturate(0.45) sepia(0.45) brightness(0.62) contrast(0.82)",
    overlays: [
      {
        // Brake-dust speckle
        backgroundImage: speckles("0.36 0.24 0.13", 7, 3),
        backgroundSize: "200px 200px",
        opacity: 0.9,
      },
      {
        backgroundImage: speckles("0.2 0.13 0.07", 6, 11),
        backgroundSize: "320px 320px",
        opacity: 0.7,
      },
      {
        // Grime build-up towards the hub and lower rim
        background:
          "radial-gradient(ellipse 45% 40% at 52% 52%, rgb(70 48 25 / 0.45), transparent 70%), linear-gradient(180deg, transparent 45%, rgb(40 28 16 / 0.45))",
        mixBlendMode: "multiply",
      },
    ],
  },
];

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/* ──────────────────────────────────────────────────────────────
   Section body (tabs + comparison slider)
   ────────────────────────────────────────────────────────────── */

export function BeforeAfter({ intro }: { intro: ReactNode }) {
  const baseId = useId();
  const [activeId, setActiveId] = useState<Showcase["id"]>("paint");
  const [position, setPosition] = useState(50);
  const active = showcases.find((s) => s.id === activeId) ?? showcases[0];

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frameRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragging = useRef(false);

  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = `${baseId}-panel`;

  function select(index: number) {
    const next = showcases[(index + showcases.length) % showcases.length];
    setActiveId(next.id);
    setPosition(50);
    tabRefs.current[showcases.indexOf(next)]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: showcases.length - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key]);
    }
  }

  function moveTo(clientX: number) {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
    inputRef.current?.focus({ preventScroll: true });
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragging.current) moveTo(event.clientX);
  }

  function endDrag() {
    dragging.current = false;
  }

  function onSliderKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const step = event.shiftKey ? 10 : 2;
    const actions: Record<string, (p: number) => number> = {
      ArrowLeft: (p) => p - step,
      ArrowDown: (p) => p - step,
      ArrowRight: (p) => p + step,
      ArrowUp: (p) => p + step,
      PageDown: (p) => p - 10,
      PageUp: (p) => p + 10,
      Home: () => 0,
      End: () => 100,
    };
    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    setPosition((p) => clamp(action(p)));
  }

  const rounded = Math.round(position);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10">
      {/* Intro + tabs */}
      <div className="lg:col-span-4 lg:row-start-1">
        {intro}
        <div
          role="tablist"
          aria-label="Before and after showcases"
          className="mt-10 flex border-b border-hairline lg:mt-12"
        >
          {showcases.map((showcase, i) => {
            const selected = showcase.id === activeId;
            return (
              <button
                key={showcase.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={tabId(showcase.id)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={cn(
                  "relative -mb-px flex min-h-12 flex-1 items-center gap-3 border-b py-3 pr-4 text-left text-[0.68rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-500 sm:flex-none sm:pr-10",
                  selected ? "border-champagne text-ivory" : "border-transparent text-ash hover:text-ivory",
                )}
              >
                <span className={cn("tabular-nums", selected ? "text-champagne" : "text-smoke")}>{pad(i + 1)}</span>
                {showcase.tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison */}
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(active.id)}
        className="lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:self-end"
      >
        <figure>
          <div
            ref={frameRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
            className="relative aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden bg-onyx select-none sm:aspect-[3/2]"
          >
            {/* After — the photograph as it is */}
            <Image
              key={`after-${active.id}`}
              src={active.photo.src}
              alt={`After: ${active.photo.alt}`}
              fill
              sizes="(min-width: 1440px) 860px, (min-width: 1024px) 62vw, 100vw"
              placeholder="blur"
              draggable={false}
              className="pointer-events-none object-cover"
            />

            {/* Before — the same photograph with a simulated neglected finish */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                key={`before-${active.id}`}
                src={active.photo.src}
                alt=""
                fill
                sizes="(min-width: 1440px) 860px, (min-width: 1024px) 62vw, 100vw"
                placeholder="blur"
                draggable={false}
                className="object-cover"
                style={{ filter: active.filter }}
              />
              {active.overlays.map((style, i) => (
                <div key={`${active.id}-${i}`} className="absolute inset-0" style={style} />
              ))}
            </div>

            {/* Corner labels */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-4 left-4 flex flex-col gap-1 bg-noir/55 px-3 py-2 backdrop-blur-sm transition-opacity duration-500 sm:top-5 sm:left-5",
                position < 14 && "opacity-0",
              )}
            >
              <span className="text-[0.625rem] font-semibold tracking-[0.26em] text-ivory uppercase">Before</span>
              <span className="text-[0.56rem] tracking-[0.2em] text-champagne uppercase">Simulated</span>
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-4 right-4 bg-noir/55 px-3 py-2 text-[0.625rem] font-semibold tracking-[0.26em] text-ivory uppercase backdrop-blur-sm transition-opacity duration-500 sm:top-5 sm:right-5",
                position > 86 && "opacity-0",
              )}
            >
              After
            </span>

            {/* Keyboard / assistive-tech control */}
            <input
              ref={inputRef}
              type="range"
              min={0}
              max={100}
              step={1}
              value={rounded}
              onChange={(e) => setPosition(clamp(Number(e.target.value)))}
              onKeyDown={onSliderKeyDown}
              aria-label={`${active.title} comparison — move the divider to compare before and after`}
              aria-valuetext={`${rounded}% before (simulated), ${100 - rounded}% after`}
              className="peer sr-only"
            />

            {/* Divider + handle */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-ivory/80 shadow-[0_0_12px_rgb(0_0_0/0.6)]"
              style={{ left: `${position}%` }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 flex size-12 -translate-1/2 items-center justify-center border border-ivory/60 bg-noir/55 text-ivory backdrop-blur-md transition-colors duration-500 peer-focus-visible:border-champagne peer-focus-visible:text-champagne peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-champagne"
              style={{ left: `${position}%` }}
            >
              <ChevronsLeftRight strokeWidth={1.25} className="size-5" />
            </div>
          </div>

          <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-smoke">
            <span>Drag the divider, or focus it and use the arrow keys.</span>
            <span className="tracking-[0.08em]">
              Simulated before: <span className="text-ash">{active.simulated.toLowerCase()}</span>
            </span>
          </figcaption>
        </figure>
      </div>

      {/* Showcase detail + honesty note */}
      <div className="lg:col-span-4 lg:row-start-2 lg:self-end">
        <div aria-live="polite">
          <h3 className="font-display text-display-sm text-ivory">{active.title}</h3>
          <p className="mt-3 max-w-md text-[0.975rem] leading-relaxed text-pretty text-ash">{active.description}</p>
        </div>
        <div className="mt-8 border-t border-hairline pt-6">
          <DemoBadge>Illustrative simulation</DemoBadge>
          <DemoNote className="mt-4 max-w-md">
            The &ldquo;before&rdquo; view is the same photograph, digitally altered to suggest a neglected
            finish. It is not an actual before-and-after of a client vehicle.
          </DemoNote>
        </div>
      </div>
    </div>
  );
}
