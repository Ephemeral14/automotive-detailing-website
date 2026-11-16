import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { DemoNote } from "@/components/ui/DemoNote";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredGallery, galleryCategories } from "@/data/gallery";
import { cn } from "@/lib/utils";

/**
 * Mosaic placement per tile, in featuredGallery order:
 * luxury-01 (L), correction-01 (P), interior-01 (P), ceramic-03 (L), exterior-02 (P), luxury-05 (L).
 * Small screens: a two-column grid. From lg: a 12-column, 7-row asymmetric mosaic whose
 * slots follow reading order (top-left → bottom-right) so focus order matches the layout.
 */
const tiles = [
  {
    className: "col-span-2 row-span-2 lg:col-span-8 lg:col-start-1 lg:row-span-3 lg:row-start-1",
    sizes: "(min-width: 1440px) 870px, (min-width: 1024px) 62vw, 100vw",
    position: "50% 55%",
  },
  {
    className: "row-span-3 lg:col-span-4 lg:col-start-9 lg:row-span-4 lg:row-start-1",
    sizes: "(min-width: 1440px) 430px, (min-width: 1024px) 31vw, 50vw",
    position: "50% 50%",
  },
  {
    className: "row-span-3 lg:col-span-4 lg:col-start-1 lg:row-span-4 lg:row-start-4",
    sizes: "(min-width: 1440px) 430px, (min-width: 1024px) 31vw, 50vw",
    position: "50% 55%",
  },
  {
    className: "col-span-2 row-span-2 lg:col-span-4 lg:col-start-5 lg:row-span-2 lg:row-start-4",
    sizes: "(min-width: 1440px) 430px, (min-width: 1024px) 31vw, 100vw",
    position: "50% 50%",
  },
  {
    className: "row-span-2 lg:col-span-4 lg:col-start-9 lg:row-span-3 lg:row-start-5",
    sizes: "(min-width: 1440px) 430px, (min-width: 1024px) 31vw, 50vw",
    position: "50% 60%",
  },
  {
    className: "row-span-2 lg:col-span-4 lg:col-start-5 lg:row-span-2 lg:row-start-6",
    sizes: "(min-width: 1440px) 430px, (min-width: 1024px) 31vw, 50vw",
    position: "45% 50%",
  },
];

const categoryLabel = (id: string) => galleryCategories.find((c) => c.id === id)?.label ?? "";

/** 05 — Featured work: asymmetric mosaic of six frames, each leading to the full gallery. */
export function FeaturedGallery() {
  return (
    <section aria-labelledby="gallery-title" className="section-y bg-noir">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading
            id="gallery-title"
            index="05"
            eyebrow="Selected work"
            title={
              <>
                Light, line and <em>reflection</em>.
              </>
            }
            description="A glimpse of the finishes we chase — deep gloss, tight beading, cabins brought back to quiet perfection."
          />
          <ButtonLink href="/gallery" variant="outline" arrow className="self-start lg:mb-1 lg:self-auto">
            Explore the gallery
          </ButtonLink>
        </div>

        <Reveal y={36}>
          <ul className="mt-14 grid auto-rows-[clamp(6.5rem,24vw,11rem)] grid-cols-2 gap-2.5 sm:gap-4 lg:mt-20 lg:auto-rows-[clamp(7.5rem,9.5vw,9.25rem)] lg:grid-cols-12 lg:gap-4">
            {featuredGallery.map((item, i) => {
              const tile = tiles[i];
              return (
                <li key={item.id} className={cn("group/tile relative overflow-hidden bg-onyx", tile.className)}>
                  <Link
                    href="/gallery"
                    className="absolute inset-0 block focus-visible:-outline-offset-4"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes={tile.sizes}
                      placeholder="blur"
                      className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover/tile:scale-[1.045]"
                      style={{ objectPosition: tile.position }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-noir/85 via-noir/10 to-transparent transition-opacity duration-700 ease-luxe [@media(hover:hover)]:opacity-50 [@media(hover:hover)]:group-hover/tile:opacity-100 [@media(hover:hover)]:group-focus-visible/tile:opacity-100"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 hidden size-10 items-center justify-center border border-ivory/25 text-ivory opacity-0 backdrop-blur-sm transition-all duration-700 ease-luxe group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100 sm:inline-flex lg:top-4 lg:right-4"
                    >
                      <ArrowUpRight strokeWidth={1.5} className="size-4" />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 flex flex-col p-3.5 transition-all duration-700 ease-luxe sm:p-5 lg:p-6 [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/tile:translate-y-0 [@media(hover:hover)]:group-hover/tile:opacity-100 [@media(hover:hover)]:group-focus-visible/tile:translate-y-0 [@media(hover:hover)]:group-focus-visible/tile:opacity-100">
                      <span className="eyebrow hidden text-champagne sm:block">{categoryLabel(item.category)}</span>
                      <span className="font-display text-base leading-snug text-ivory sm:mt-2 sm:text-xl lg:text-2xl">
                        {item.title}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <DemoNote className="mt-8">
          Photography is illustrative, licensed from Unsplash, and does not depict work by a real studio.
        </DemoNote>
      </div>
    </section>
  );
}
