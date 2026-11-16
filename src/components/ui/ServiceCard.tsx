import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import { cn, pad } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  index: number;
  className?: string;
  /** Responsive `sizes` hint for the image. */
  sizes?: string;
};

/**
 * Editorial service card: tall photograph, index, name, summary and a
 * "Learn more" link whose hit-area covers the whole card.
 */
export function ServiceCard({
  service,
  index,
  className,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw",
}: ServiceCardProps) {
  return (
    <article className={cn("group/card relative isolate flex flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-onyx">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover/card:scale-[1.045]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/10 to-transparent transition-opacity duration-700 group-hover/card:opacity-80"
        />
        <span className="absolute top-5 left-5 text-[0.65rem] font-semibold tracking-[0.24em] text-ivory/80 tabular-nums">
          {pad(index)}
        </span>
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 inline-flex size-10 items-center justify-center border border-ivory/20 text-ivory/80 backdrop-blur-sm transition-all duration-700 ease-luxe group-hover/card:border-champagne group-hover/card:bg-champagne group-hover/card:text-noir"
        >
          <ArrowUpRight strokeWidth={1.5} className="size-4" />
        </span>
        <p className="eyebrow absolute bottom-5 left-5 text-champagne">{service.kicker}</p>
      </div>

      <div className="flex flex-1 flex-col border-x border-b border-hairline bg-graphite/60 p-6 transition-colors duration-700 group-hover/card:border-champagne/30 sm:p-7">
        <h3 className="font-display text-display-sm text-ivory">{service.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">{service.summary}</p>
        <Link
          href={`/services#${service.slug}`}
          className="mt-6 inline-flex items-center gap-2 self-start text-[0.68rem] font-semibold tracking-[0.24em] text-ivory uppercase transition-colors duration-500 after:absolute after:inset-0 after:content-[''] group-hover/card:text-champagne"
        >
          Learn more<span className="sr-only"> about {service.name}</span>
          <span aria-hidden="true" className="h-px w-6 bg-champagne transition-all duration-700 ease-luxe group-hover/card:w-10" />
        </Link>
      </div>
    </article>
  );
}
