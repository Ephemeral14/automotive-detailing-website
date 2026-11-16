import Image from "next/image";
import { Check, Clock } from "lucide-react";
import type { Service } from "@/types";
import { ButtonLink } from "@/components/ui/Button";
import { serviceCategories } from "@/data/services";
import { bookingLink, type ServiceOption } from "@/lib/booking";
import { cn, formatPrice, pad } from "@/lib/utils";

type ServiceEntryProps = {
  service: Service;
  /** Position in the full catalogue (1-based) — stable across filters. */
  number: number;
  total: number;
  /** Mirror the layout (image on the right from `lg` up). */
  flipped: boolean;
};

const categoryLabel = (id: string) => serviceCategories.find((c) => c.id === id)?.label ?? id;

/**
 * One editorial catalogue entry: photograph + standfirst on top, then a
 * spec band with the "What's included" checklist, duration, price and CTA.
 * The `id` is the anchor target for /services#<slug> links.
 */
export function ServiceEntry({ service, number, total, flipped }: ServiceEntryProps) {
  const titleId = `${service.slug}-title`;
  return (
    <article id={service.slug} aria-labelledby={titleId} className="group/svc border-t border-hairline">
      <div className="container-site py-16 sm:py-20 lg:py-28">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-x-14 xl:gap-x-20">
          {/* Photograph */}
          <div
            className={cn(
              "relative aspect-[4/3] overflow-hidden bg-onyx lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]",
              flipped && "lg:order-last",
            )}
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(min-width: 1440px) 760px, (min-width: 1024px) 55vw, 100vw"
              placeholder="blur"
              quality={75}
              className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover/svc:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/55 via-transparent to-noir/10"
            />
            <p
              aria-hidden="true"
              className="absolute bottom-5 left-5 text-[0.65rem] font-semibold tracking-[0.24em] text-ivory/80 uppercase tabular-nums sm:bottom-6 sm:left-6"
            >
              {pad(number)} <span className="text-ivory/45">/ {pad(total)}</span>
            </p>
          </div>

          {/* Standfirst */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="flex items-center gap-4">
              <span className="font-display text-5xl leading-none text-champagne tabular-nums sm:text-6xl">
                {pad(number)}
              </span>
              <span aria-hidden="true" className="gold-rule w-8" />
              <span className="eyebrow text-champagne">{service.kicker}</span>
            </p>
            <h3
              id={titleId}
              className="mt-7 font-display text-display-lg text-balance text-ivory"
            >
              {service.name}
            </h3>
            <p className="mt-6 font-display text-[1.375rem] leading-snug text-pretty text-ivory/85 italic sm:text-2xl">
              {service.summary}
            </p>
            <p className="mt-6 leading-relaxed text-pretty text-ash">{service.description}</p>
            <p className="mt-7 text-[0.65rem] font-semibold tracking-[0.22em] text-smoke uppercase">
              <span className="sr-only">Categories: </span>
              {service.categories.map(categoryLabel).join("  ·  ")}
            </p>
          </div>
        </div>

        {/* Spec band */}
        <div className="mt-12 grid gap-10 border-t border-hairline pt-10 sm:mt-14 lg:mt-16 lg:grid-cols-12 lg:gap-x-14 lg:pt-12 xl:gap-x-20">
          <div className={cn("lg:col-span-7", flipped && "lg:order-last")}>
            <h4 className="eyebrow flex items-center gap-4 text-champagne">
              What&rsquo;s included
              <span className="text-smoke tabular-nums">{pad(service.included.length)}</span>
            </h4>
            <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {service.included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 border-b border-hairline py-3.5 text-[0.9375rem] leading-snug text-ivory/90"
                >
                  <Check aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-champagne" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-hairline bg-graphite">
              <dl className="grid grid-cols-2 divide-x divide-hairline">
                <div className="p-5 sm:p-7">
                  <dt className="flex items-center gap-2 text-[0.625rem] font-semibold tracking-[0.22em] text-ash uppercase">
                    <Clock aria-hidden="true" strokeWidth={1.5} className="size-3.5 shrink-0 text-champagne" />
                    Est. duration
                  </dt>
                  <dd className="mt-3 font-display text-[1.625rem] leading-tight text-ivory sm:text-3xl">
                    {service.duration}
                  </dd>
                </div>
                <div className="p-5 sm:p-7">
                  <dt className="text-[0.625rem] font-semibold tracking-[0.22em] text-ash uppercase">Starting price</dt>
                  <dd className="mt-3 font-display text-[1.625rem] leading-tight text-ivory sm:text-3xl">
                    <span className="text-lg text-ash italic">From </span>
                    {formatPrice(service.priceFrom)}
                    <span aria-hidden="true" className="text-champagne">
                      *
                    </span>
                    <span className="sr-only"> (illustrative estimate)</span>
                  </dd>
                </div>
              </dl>
              <div className="border-t border-hairline p-5 sm:p-7">
                <ButtonLink
                  href={bookingLink(service.name as ServiceOption)}
                  arrow
                  className="h-auto min-h-12 w-full py-3.5 text-center whitespace-normal sm:h-auto sm:min-h-[3.25rem]"
                >
                  Book {service.name}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
