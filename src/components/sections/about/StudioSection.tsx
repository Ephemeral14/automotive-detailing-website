import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { DemoNote } from "@/components/ui/DemoNote";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/data/images";
import { sectionIndex, studioFacts } from "./content";

export function StudioSection() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="border-t border-hairline bg-graphite">
      <figure className="grain relative h-[58vh] min-h-[20rem] overflow-hidden sm:min-h-[26rem] lg:h-[80vh] lg:max-h-[52rem] lg:min-h-[34rem]">
        <Image
          src={photos.aboutStudio.src}
          alt={photos.aboutStudio.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          quality={75}
          className="object-cover"
          style={{ objectPosition: "50% 55%" }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-graphite via-noir/10 to-noir/40" />
        <figcaption className="container-site absolute inset-x-0 bottom-0 flex items-baseline gap-4 pb-6 text-xs text-ivory/70 sm:pb-8">
          <span className="eyebrow shrink-0 text-champagne">Fig. 03</span>
          <span>The inspection bay — a single lift beneath a diffused overhead light.</span>
        </figcaption>
      </figure>

      <div className="container-site section-y-sm grid gap-12 lg:grid-cols-12 lg:gap-10 lg:pb-[clamp(5rem,3.5rem+6vw,10rem)]">
        <SectionHeading
          id="studio-title"
          index={sectionIndex("studio")}
          eyebrow="The studio"
          title={
            <>
              A private bay, <em>quietly</em> kept.
            </>
          }
          className="lg:col-span-5"
        />

        <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-12">
          <div className="space-y-5 text-base leading-relaxed text-pretty text-ash sm:text-[1.0625rem]">
            <p>
              The studio works by appointment only, so there is never a queue of cars and never a reason to
              hurry. One vehicle occupies the bay at a time — kept clean, dust-controlled and lit for
              inspection rather than for show.
            </p>
            <p>
              You are welcome to stay for the initial assessment, walk the car with us under the lights and
              talk through exactly what it needs. At collection we do the same again, panel by panel.
            </p>
          </div>

          <dl className="mt-10 border-t border-hairline">
            {studioFacts.map((fact) => (
              <div
                key={fact.term}
                className="flex flex-col gap-1 border-b border-hairline py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <dt className="eyebrow text-smoke">{fact.term}</dt>
                <dd className="font-display text-xl text-ivory sm:text-right">{fact.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <ButtonLink href="/contact" variant="outline" arrow>
              Plan a visit
            </ButtonLink>
            <DemoNote className="max-w-xs">
              A fictional studio — its location and contact details are placeholders.
            </DemoNote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
