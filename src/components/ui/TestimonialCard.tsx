import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

/** Quote card. Always rendered with a visible "Demo testimonial" label. */
export function TestimonialCard({ testimonial, className }: { testimonial: Testimonial; className?: string }) {
  return (
    <figure
      className={cn(
        "group/t relative flex h-full flex-col border border-hairline bg-graphite p-8 transition-colors duration-700 hover:border-champagne/30 sm:p-10",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span aria-hidden="true" className="font-display text-6xl leading-none text-champagne/80">
          &ldquo;
        </span>
        <span className="border border-hairline-strong px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.22em] text-ash uppercase">
          Demo testimonial
        </span>
      </div>
      <blockquote className="mt-4 flex-1">
        <p className="font-display text-[1.375rem] leading-snug text-pretty text-ivory/90 sm:text-2xl">
          {testimonial.quote}
        </p>
      </blockquote>
      <figcaption className="mt-8 border-t border-hairline pt-6 text-sm">
        <p className="font-semibold text-ivory">{testimonial.persona}</p>
        <p className="mt-1 text-ash">{testimonial.vehicle}</p>
        <p className="mt-3 eyebrow text-champagne">{testimonial.service}</p>
      </figcaption>
    </figure>
  );
}
