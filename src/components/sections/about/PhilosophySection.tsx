import Image from "next/image";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/data/images";
import { sectionIndex } from "./content";

export function PhilosophySection() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="section-y bg-noir">
      <div className="container-site grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:order-2 lg:col-span-6 lg:col-start-7">
          <SectionHeading
            id="philosophy-title"
            index={sectionIndex("philosophy")}
            eyebrow="Philosophy"
            title={
              <>
                We don&rsquo;t make cars look new. We return them to how they were <em>meant</em> to look.
              </>
            }
          />
          <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-pretty text-ash sm:text-[1.0625rem]">
            <p>
              Every car arrives with a history — wash marks, tired leather, a finish dulled by well-meant
              shortcuts. Our work begins by understanding that history rather than covering it up. Gloss
              built on fillers fades within weeks; a surface that has been genuinely refined stays clear.
            </p>
            <p>
              So we take our time. We would rather recommend less and do it properly than sell a programme a
              vehicle does not need. The aim is not to impress on the day of collection alone, but every time
              you walk back to the car.
            </p>
          </div>
          <TextLink href="/services" className="mt-10 min-h-11">
            Explore our services
          </TextLink>
        </Reveal>

        <figure className="relative lg:order-1 lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute -right-3 -bottom-3 hidden h-full w-full border border-hairline sm:block lg:-right-5 lg:-bottom-5"
          />
          <div className="relative aspect-[4/5] overflow-hidden bg-onyx lg:aspect-[3/4]">
            <Image
              src={photos.aboutPhilosophy.src}
              alt={photos.aboutPhilosophy.alt}
              fill
              sizes="(min-width: 1440px) 540px, (min-width: 1024px) 38vw, 92vw"
              placeholder="blur"
              className="object-cover"
              style={{ objectPosition: "62% 50%" }}
            />
          </div>
          <figcaption className="mt-8 flex items-baseline gap-4 text-xs leading-relaxed text-smoke lg:mt-10">
            <span className="eyebrow shrink-0 text-champagne">Fig. 01</span>
            <span>Light, read across a bonnet — the first thing we look at, and the last.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
