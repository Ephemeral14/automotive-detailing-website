"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  items: FaqItem[];
  /** Index of the item open on first render (none by default). */
  defaultOpen?: number;
  className?: string;
};

/**
 * Accessible accordion (WAI-ARIA disclosure pattern): each question is a
 * button with aria-expanded/aria-controls; answers animate height with the
 * CSS grid-rows technique, so no layout measuring is needed.
 */
export function FaqAccordion({ items, defaultOpen, className }: FaqAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen === undefined ? [] : [defaultOpen]));

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className={cn("border-t border-hairline", className)}>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.question} className="border-b border-hairline">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group/faq flex w-full items-start justify-between gap-6 py-6 text-left sm:py-7"
              >
                <span
                  className={cn(
                    "font-display text-xl leading-snug transition-colors duration-500 sm:text-2xl",
                    isOpen ? "text-champagne" : "text-ivory group-hover/faq:text-champagne",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 inline-flex size-8 shrink-0 items-center justify-center border transition-all duration-500 ease-luxe",
                    isOpen
                      ? "rotate-45 border-champagne text-champagne"
                      : "border-hairline-strong text-ash group-hover/faq:border-champagne group-hover/faq:text-champagne",
                  )}
                >
                  <Plus strokeWidth={1.5} className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-luxe",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pr-12 pb-7 text-[0.975rem] leading-relaxed text-ash">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
