import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/data/images";
import { craftNotes, sectionIndex } from "./content";

export function CraftSection() {
  return (
    <section id="craftsmanship" aria-labelledby="craftsmanship-title" className="section-y bg-noir">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:self-center">
          <SectionHeading
            id="craftsmanship-title"
            index={sectionIndex("craftsmanship")}
            eyebrow="Craftsmanship"
            title={
              <>
                Finished by hand, <em>one panel</em> at a time.
              </>
            }
            description={
              <p>
                Machines have their place — a calibrated polisher levels clear coat more evenly than any arm
                could. But everything that touches the finish last is done by hand: the refining wipe, the
                coating levelled panel by panel, the brush worked around a badge or along a tyre wall.
              </p>
            }
          />

          <dl className="mt-12 border-t border-hairline">
            {craftNotes.map((note) => (
              <div
                key={note.term}
                className="grid gap-2 border-b border-hairline py-6 sm:grid-cols-[11rem_1fr] sm:gap-8 lg:grid-cols-1 lg:gap-2 xl:grid-cols-[10rem_1fr] xl:gap-8"
              >
                <dt className="eyebrow pt-1 text-ivory">{note.term}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-pretty text-ash">{note.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Reveal as="figure" className="lg:col-span-6 lg:col-start-7">
          <div className="group/craft relative aspect-[4/5] overflow-hidden bg-onyx">
            <Image
              src={photos.aboutCraft.src}
              alt={photos.aboutCraft.alt}
              fill
              sizes="(min-width: 1440px) 640px, (min-width: 1024px) 46vw, 92vw"
              placeholder="blur"
              className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover/craft:scale-[1.03]"
              style={{ objectPosition: "50% 38%" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-noir/70 to-transparent"
            />
          </div>
          <figcaption className="mt-6 flex items-baseline gap-4 text-xs leading-relaxed text-smoke">
            <span className="eyebrow shrink-0 text-champagne">Fig. 02</span>
            <span>A soft-bristle brush, worked by hand along the tyre wall before dressing.</span>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
