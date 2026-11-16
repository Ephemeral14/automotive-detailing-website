import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { photos } from "@/data/images";
import { bookingHref } from "@/lib/site";
import { formatPrice, pad } from "@/lib/utils";
import { addOns } from "./data";

export function AddOnsSection() {
  const photo = photos.galCorrection02;
  return (
    <section id="add-ons" aria-labelledby="add-ons-title" className="section-y border-y border-hairline bg-graphite">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="add-ons-title"
              index="04"
              eyebrow="Optional add-ons"
              size="md"
              title={
                <>
                  Small additions, <em>noticeable</em> results.
                </>
              }
              description="Booked alongside any package and completed in the same visit. We only suggest the ones your car will genuinely benefit from."
            />
            <Reveal as="figure" className="mt-12 hidden sm:block">
              <div className="group relative aspect-[4/3] overflow-hidden border border-hairline">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1440px) 520px, (min-width: 1024px) 38vw, 90vw"
                  placeholder="blur"
                  quality={75}
                  className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-noir/50 to-transparent" />
              </div>
              <figcaption className="mt-4 flex items-center gap-3 text-xs tracking-[0.08em] text-smoke">
                <span aria-hidden="true" className="h-px w-6 bg-hairline-strong" />
                Headlight restoration — machine-polished, then UV-sealed.
              </figcaption>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="border-t border-hairline">
            {addOns.map((item, i) => (
              <li
                key={item.name}
                className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-hairline py-7 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6 sm:py-8"
              >
                <span aria-hidden="true" className="pt-2 text-[0.7rem] font-semibold tracking-[0.2em] text-smoke tabular-nums">
                  {pad(i + 1)}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl leading-tight text-ivory sm:text-[1.75rem]">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="group/add inline-flex items-baseline gap-2 transition-colors duration-500 hover:text-champagne"
                      >
                        {item.name}
                        <ArrowUpRight
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="size-4 translate-y-px text-champagne transition-transform duration-500 ease-luxe group-hover/add:translate-x-0.5 group-hover/add:-translate-y-0.5"
                        />
                        <span className="sr-only">(service details)</span>
                      </Link>
                    ) : (
                      item.name
                    )}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-pretty text-ash">{item.description}</p>
                </div>
                <p className="col-start-2 mt-4 flex items-baseline gap-4 sm:col-start-3 sm:mt-0 sm:flex-col sm:items-end sm:gap-1.5 sm:pt-1.5 sm:text-right">
                  <span className="whitespace-nowrap">
                    <span className="mr-1.5 text-[0.65rem] tracking-[0.16em] text-ash uppercase">from</span>
                    <span className="font-display text-2xl text-champagne">{formatPrice(item.priceFrom)}</span>
                  </span>
                  <span className="text-xs whitespace-nowrap text-smoke">{item.duration}</span>
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-sm leading-relaxed text-smoke">
              Illustrative prices. Mention any add-ons in your booking request and we&rsquo;ll fold
              them into one quote.
            </p>
            <TextLink href={bookingHref} className="min-h-11 shrink-0">
              Request a quote
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
