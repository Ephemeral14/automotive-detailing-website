"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { DemoNote } from "@/components/ui/DemoNote";
import { cn } from "@/lib/utils";
import type { Photo } from "@/types";

type LightMode = {
  id: "warm" | "neutral" | "daylight";
  label: string;
  kelvin: string;
  note: string;
  /** CSS filter applied to the photograph. */
  filter: string;
  /** Colour-blend tint laid over the photograph (null = none). */
  tint: string | null;
};

const modes: LightMode[] = [
  {
    id: "warm",
    label: "Warm",
    kelvin: "approx. 3,000 K",
    note: "Warm light flatters — useful for judging depth, but it softens haze and fine marring.",
    filter: "sepia(0.3) saturate(1.2) brightness(0.96)",
    tint: "#d9893c",
  },
  {
    id: "neutral",
    label: "Neutral",
    kelvin: "approx. 4,500 K",
    note: "Neutral white shows true colour and flake, and is where most correction work is judged.",
    filter: "none",
    tint: null,
  },
  {
    id: "daylight",
    label: "Daylight",
    kelvin: "approx. 6,500 K",
    note: "Cool, daylight-balanced light is the least forgiving — swirls and holograms have nowhere to hide.",
    filter: "brightness(1.2) contrast(1.12) saturate(0.8)",
    tint: "#7ea4e0",
  },
];

/**
 * Interactive illustration for the "inspection under multiple colour
 * temperatures" standard: toggles re-light the photograph.
 * The photo is passed in from the server so the registry stays out of the client bundle.
 */
export function LightInspector({ photo, className }: { photo: Photo; className?: string }) {
  const [modeId, setModeId] = useState<LightMode["id"]>("neutral");
  const mode = modes.find((m) => m.id === modeId) ?? modes[1];
  const groupLabelId = useId();
  const statusId = useId();

  return (
    <div className={cn("relative", className)}>
      <figure className="relative aspect-[3/2] overflow-hidden bg-onyx">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1440px) 740px, (min-width: 1024px) 52vw, 92vw"
          placeholder="blur"
          className="object-cover transition-[filter] duration-[1200ms] ease-luxe"
          style={{ filter: mode.filter, objectPosition: "45% 45%" }}
        />
        {modes.map((m) =>
          m.tint ? (
            <div
              key={m.id}
              aria-hidden="true"
              className={cn(
                "absolute inset-0 mix-blend-color transition-opacity duration-[1200ms] ease-luxe",
                m.id === modeId ? "opacity-40" : "opacity-0",
              )}
              style={{ backgroundColor: m.tint }}
            />
          ) : null,
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />
        <figcaption className="absolute bottom-4 left-4 text-[0.65rem] font-semibold tracking-[0.24em] text-ivory/85 uppercase tabular-nums sm:bottom-5 sm:left-5">
          <span className="sr-only">Photograph shown under </span>
          {mode.label} light · {mode.kelvin.replace("approx. ", "")}
        </figcaption>
      </figure>

      <div className="mt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p id={groupLabelId} className="eyebrow text-champagne">
            Inspection light
          </p>
          <div role="group" aria-labelledby={groupLabelId} aria-describedby={statusId} className="grid grid-cols-3 border border-hairline">
            {modes.map((m, i) => {
              const active = m.id === modeId;
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setModeId(m.id)}
                  className={cn(
                    "inline-flex min-h-11 items-center justify-center gap-2 px-4 text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ease-luxe sm:px-5",
                    i > 0 && "border-l border-hairline",
                    active ? "bg-champagne text-noir" : "text-ash hover:bg-carbon hover:text-ivory",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: m.tint ?? "#f5f5f5", opacity: active ? 0.9 : 0.7 }}
                  />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
        <p id={statusId} aria-live="polite" className="mt-5 min-h-[3lh] text-sm leading-relaxed text-pretty text-ash sm:min-h-[2lh]">
          <span className="text-ivory">{mode.label}, {mode.kelvin}.</span> {mode.note}
        </p>
        <DemoNote className="mt-4">
          Illustrative simulation — the photograph is re-tinted to show how each light source changes what
          you see.
        </DemoNote>
      </div>
    </div>
  );
}
