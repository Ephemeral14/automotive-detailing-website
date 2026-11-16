import { cn } from "@/lib/utils";

function SkeletonField({ className, tall = false, hint = false }: { className?: string; tall?: boolean; hint?: boolean }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="block h-[0.95rem] w-28 bg-ivory/[0.07]" />
      <span
        className={cn(
          "mt-3 block border border-hairline border-b-ivory/20 bg-graphite",
          tall ? "h-[11rem]" : "h-14",
        )}
      />
      {hint ? <span className="mt-3 block h-3 w-3/5 bg-ivory/[0.05]" /> : null}
    </div>
  );
}

function SkeletonLegend() {
  return (
    <div className="flex items-center gap-4 border-b border-hairline pb-5">
      <span className="block h-[0.95rem] w-6 bg-ivory/[0.07]" />
      <span className="gold-rule w-8 opacity-50" />
      <span className="block h-[0.95rem] w-32 bg-ivory/[0.07]" />
    </div>
  );
}

/**
 * Same footprint as <ContactForm> — shown while search params resolve, so
 * the booking section never jumps.
 */
export function ContactFormSkeleton() {
  return (
    <div aria-busy="true" className="space-y-14 motion-safe:animate-pulse">
      <p className="sr-only" role="status">
        Loading booking form…
      </p>
      <span className="block h-4 w-56 bg-ivory/[0.05]" />
      <div>
        <SkeletonLegend />
        <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2">
          <SkeletonField className="sm:col-span-2" />
          <SkeletonField />
          <SkeletonField hint />
        </div>
      </div>
      <div>
        <SkeletonLegend />
        <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2">
          <SkeletonField className="sm:col-span-2" hint />
          <SkeletonField hint />
          <SkeletonField hint />
          <SkeletonField className="sm:col-span-2" tall hint />
        </div>
      </div>
      <div className="flex flex-col gap-6 border-t border-hairline pt-8 sm:flex-row-reverse sm:items-center sm:justify-between">
        <span className="block h-12 w-full bg-champagne/25 sm:h-[3.25rem] sm:w-[15.5rem]" />
        <span className="block h-3 w-64 max-w-full bg-ivory/[0.05]" />
      </div>
    </div>
  );
}
