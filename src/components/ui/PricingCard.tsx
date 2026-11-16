import { Check, Clock } from "lucide-react";
import type { PricingPlan } from "@/types";
import { ButtonLink } from "@/components/ui/Button";
import { bookingLink, type ServiceOption } from "@/lib/booking";
import { cn, formatPrice } from "@/lib/utils";

/** Pricing package card. The recommended plan is visually elevated. */
export function PricingCard({ plan, className }: { plan: PricingPlan; className?: string }) {
  const featured = plan.recommended;
  const titleId = `plan-${plan.id}`;
  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "relative flex h-full flex-col border p-8 transition-colors duration-700 sm:p-10",
        featured
          ? "border-champagne/60 bg-gradient-to-b from-onyx to-graphite shadow-[0_40px_80px_-40px_rgba(198,167,107,0.35)] lg:-my-6 lg:py-14"
          : "border-hairline bg-graphite hover:border-hairline-strong",
        className,
      )}
    >
      {featured ? (
        <p className="absolute -top-3.5 left-8 bg-champagne px-3 py-1.5 text-[0.6rem] font-bold tracking-[0.26em] text-noir uppercase sm:left-10">
          Recommended
        </p>
      ) : null}

      <header>
        <h3 id={titleId} className="eyebrow text-champagne">
          {plan.name}
        </h3>
        <p className="mt-6 flex items-baseline gap-2">
          <span className="font-display text-[3.75rem] leading-none text-ivory sm:text-[4.25rem]">
            {formatPrice(plan.price)}
          </span>
          <span className="text-xs tracking-[0.14em] text-ash uppercase">from*</span>
        </p>
        <p className="mt-5 font-display text-xl text-ivory/90 italic">{plan.tagline}</p>
        <p className="mt-2 text-sm leading-relaxed text-ash">{plan.idealFor}</p>
        <p className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.12em] text-ash">
          <Clock aria-hidden="true" strokeWidth={1.5} className="size-3.5 text-champagne" />
          {plan.duration}
        </p>
      </header>

      <ul className="mt-8 flex-1 space-y-3.5 border-t border-hairline pt-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3.5 text-sm text-ivory/90">
            <Check aria-hidden="true" strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-champagne" />
            <span className={cn(feature.startsWith("Everything in") && "text-ash italic")}>{feature}</span>
          </li>
        ))}
      </ul>

      <ButtonLink
        href={bookingLink(`${plan.name} Package` as ServiceOption)}
        variant={featured ? "primary" : "outline"}
        arrow
        className="mt-10 w-full"
      >
        Book {plan.name}
      </ButtonLink>
    </article>
  );
}
