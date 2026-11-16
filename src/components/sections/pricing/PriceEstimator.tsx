"use client";

import { useId, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { DemoNote } from "@/components/ui/DemoNote";
import { pricingPlans } from "@/data/pricing";
import { bookingLink, type ServiceOption } from "@/lib/booking";
import { cn, formatPrice } from "@/lib/utils";
import type { PricingPlan } from "@/types";
import { estimate, sizeClasses, type SizeClass } from "./data";

const tileClass = cn(
  "group/tile relative flex min-h-[4.5rem] cursor-pointer flex-col justify-center gap-1 border border-hairline bg-noir/40 px-4 py-3.5",
  "transition-[border-color,background-color] duration-500 ease-luxe hover:border-hairline-strong",
  "has-[:checked]:border-champagne/70 has-[:checked]:bg-champagne/[0.06]",
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-champagne",
);

function Tile({
  name,
  value,
  checked,
  onChange,
  title,
  meta,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  meta: ReactNode;
}) {
  return (
    <label htmlFor={`${name}-${value}`} className={tileClass}>
      <input
        id={`${name}-${value}`}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="absolute top-3.5 right-3.5 size-1.5 rounded-full bg-hairline-strong transition-colors duration-500 peer-checked:bg-champagne"
      />
      <span className="pr-4 text-sm font-semibold text-ivory">{title}</span>
      <span className="text-xs tracking-[0.06em] text-ash">{meta}</span>
    </label>
  );
}

/**
 * Indicative price calculator: package × vehicle size, with an optional
 * condition flag that defers the surcharge to an in-person inspection.
 */
export function PriceEstimator() {
  const uid = useId();
  const [planId, setPlanId] = useState<PricingPlan["id"]>("signature");
  const [sizeId, setSizeId] = useState<SizeClass["id"]>("saloon");
  const [heavy, setHeavy] = useState(false);

  const plan = pricingPlans.find((p) => p.id === planId) ?? pricingPlans[0];
  const size = sizeClasses.find((s) => s.id === sizeId) ?? sizeClasses[0];
  const total = estimate(plan, size);
  const titleId = `${uid}-title`;

  return (
    <div
      role="group"
      aria-labelledby={titleId}
      className="grid border border-hairline bg-onyx/60 lg:grid-cols-12"
    >
      <div className="p-6 sm:p-10 lg:col-span-7 lg:p-12">
        <p className="eyebrow flex items-center gap-4 text-champagne">
          <span aria-hidden="true" className="gold-rule w-8" />
          Indicative estimate
        </p>
        <h3 id={titleId} className="mt-5 font-display text-display-sm text-ivory">
          Estimate your session
        </h3>

        <fieldset className="mt-9">
          <legend className="eyebrow text-ash">Package</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {pricingPlans.map((p) => (
              <Tile
                key={p.id}
                name={`${uid}-plan`}
                value={p.id}
                checked={planId === p.id}
                onChange={() => setPlanId(p.id)}
                title={p.name}
                meta={<>from {formatPrice(p.price)}</>}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="eyebrow text-ash">Vehicle size</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {sizeClasses.map((s) => (
              <Tile
                key={s.id}
                name={`${uid}-size`}
                value={s.id}
                checked={sizeId === s.id}
                onChange={() => setSizeId(s.id)}
                title={s.label}
                meta={s.adjustment}
              />
            ))}
          </div>
        </fieldset>

        <label
          htmlFor={`${uid}-heavy`}
          className="mt-7 inline-flex min-h-11 cursor-pointer items-center gap-4 text-sm text-ash transition-colors duration-500 hover:text-ivory"
        >
          <input
            id={`${uid}-heavy`}
            type="checkbox"
            checked={heavy}
            onChange={(event) => setHeavy(event.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex size-5 shrink-0 items-center justify-center border border-hairline-strong transition-colors duration-500",
              "peer-checked:border-champagne peer-checked:bg-champagne peer-checked:text-noir",
              "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-champagne",
            )}
          >
            <Check
              strokeWidth={2.25}
              className={cn("size-3.5 transition-opacity duration-300", heavy ? "opacity-100" : "opacity-0")}
            />
          </span>
          Heavily soiled, sandy or covered in pet hair
        </label>
      </div>

      <div className="flex flex-col border-t border-hairline bg-noir/50 p-6 sm:p-10 lg:col-span-5 lg:border-t-0 lg:border-l lg:p-12">
        <output aria-live="polite" aria-atomic="true" className="block">
          <span className="eyebrow block text-ash">
            {plan.name} <span aria-hidden="true">·</span> {size.label}
          </span>
          <span className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-xs tracking-[0.14em] text-ash uppercase">from</span>
            <span className="font-display text-[4rem] leading-none text-ivory tabular-nums sm:text-[5rem]">
              {formatPrice(total)}
            </span>
            <span className="sr-only">(illustrative)</span>
          </span>
          <span className="mt-5 block text-sm leading-relaxed text-pretty text-ash">
            {size.factor === 1
              ? `${plan.name} package at its listed price.`
              : `${formatPrice(plan.price)} package price, ${size.adjustment} for the ${size.label.toLowerCase()} class.`}{" "}
            {heavy ? (
              <span className="text-champagne-light">
                Plus a condition surcharge, quoted after a short inspection.
              </span>
            ) : (
              "Confirmed after a brief look at the car, before work begins."
            )}
          </span>
        </output>

        <div className="mt-10 lg:mt-auto lg:pt-10">
          <ButtonLink
            href={bookingLink(`${plan.name} Package` as ServiceOption)}
            arrow
            className="w-full"
          >
            Request {plan.name}
          </ButtonLink>
          <DemoNote className="mt-5">
            Fictional figures for a portfolio project — the booking form is a demonstration.
          </DemoNote>
        </div>
      </div>
    </div>
  );
}
