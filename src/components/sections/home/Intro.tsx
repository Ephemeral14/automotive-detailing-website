import Image from "next/image";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/data/images";
import { pad } from "@/lib/utils";

const principles = [
  {
    title: "By appointment",
    body: "Private sessions, scheduled around your vehicle — never a queue.",
  },
  {
    title: "One vehicle at a time",
    body: "The studio is given over entirely to the car in front of us.",
  },
  {
    title: "Finished by hand",
    body: "Every surface is completed and inspected by hand under studio light.",
  },
];

/** 01 — Brand introduction: the studio's philosophy beside a portrait photograph. */
export function Intro() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="section-y bg-noir">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <SectionHeading
            id="intro-title"
            index="01"
            eyebrow="The studio"
            title={
              <>
                Cars that are <em>cherished</em>, not merely cleaned.
              </>
            }
          />
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-pretty text-ash sm:text-[1.0625rem]">
            <p>
              Noir Auto Studio is a private detailing studio — the quiet alternative to the
              drive-through wash. We work by appointment, with a single vehicle in the studio at a time,
              so the car in front of us has our complete, unhurried attention.
            </p>
            <p>
              Each surface is assessed under controlled light and each process chosen for that paint,
              that leather, that finish. Then everything is completed by hand and inspected once more
              before the keys are returned to you.
            </p>
          </div>

          <ol className="mt-12 grid border-t border-hairline sm:grid-cols-3">
            {principles.map((item, i) => (
              <li
                key={item.title}
                className="border-b border-hairline py-6 sm:border-b-0 sm:py-7 sm:pr-6 sm:not-first:border-l sm:not-first:pl-6"
              >
                <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-smoke tabular-nums">{pad(i + 1)}</p>
                <h3 className="mt-3 font-display text-xl leading-tight text-ivory">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{item.body}</p>
              </li>
            ))}
          </ol>

          <TextLink href="/about" className="mt-10">
            About the studio
          </TextLink>
        </div>

        <Reveal as="figure" className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <div className="relative aspect-[4/5] overflow-hidden bg-onyx">
            <Image
              src={photos.homeIntro.src}
              alt={photos.homeIntro.alt}
              fill
              sizes="(min-width: 1440px) 560px, (min-width: 1024px) 38vw, 92vw"
              placeholder="blur"
              className="object-cover object-[50%_28%]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-noir/40 via-transparent to-transparent" />
          </div>
          <figcaption className="mt-4 flex items-center gap-4 text-xs tracking-[0.08em] text-smoke">
            <span aria-hidden="true" className="h-px w-8 bg-hairline-strong" />
            Studio light shows every flaw — and every correction.
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
