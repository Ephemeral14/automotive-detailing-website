import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small, honest disclaimer used wherever content is illustrative
 * (prices, testimonials, before/after imagery, contact details).
 */
export function DemoNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-start gap-2.5 text-xs leading-relaxed text-smoke", className)}>
      <Info aria-hidden="true" strokeWidth={1.5} className="mt-px size-3.5 shrink-0 text-champagne/80" />
      <span>{children}</span>
    </p>
  );
}

/** Compact pill label, e.g. "Demo content". */
export function DemoBadge({ children = "Demo content", className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-champagne/30 bg-champagne/5 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-champagne",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1 rounded-full bg-champagne" />
      {children}
    </span>
  );
}
