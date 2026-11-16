import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pad } from "@/lib/utils";
import { principles, sectionIndex } from "./content";

export function ApproachSection() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="section-y border-y border-hairline bg-graphite"
    >
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading
            id="approach-title"
            index={sectionIndex("approach")}
            eyebrow="Approach"
            title={
              <>
                Four principles behind <em>every</em> session.
              </>
            }
            className="lg:col-span-7"
          />
          <p className="max-w-md text-base leading-relaxed text-pretty text-ash lg:col-span-4 lg:col-start-9 lg:pb-2">
            Whether the booking is a maintenance wash or a multi-day correction, the order of thinking never
            changes. These are the rules we hold ourselves to before a single product is opened.
          </p>
        </div>

        <Reveal>
          <ol className="mt-16 grid gap-px border border-hairline bg-hairline sm:mt-20 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((principle, i) => (
              <li
                key={principle.title}
                className="flex flex-col bg-graphite px-6 py-10 sm:px-8 md:py-12 xl:min-h-[30rem]"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[3.5rem] leading-none text-champagne italic sm:text-[4rem]"
                >
                  {pad(i + 1)}
                </span>
                <h3 className="mt-10 font-display text-display-sm text-balance text-ivory xl:mt-auto xl:pt-16">
                  <span className="sr-only">Principle {i + 1}: </span>
                  {principle.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-pretty text-ash">{principle.body}</p>
                <p className="mt-8 border-t border-hairline pt-5 text-sm leading-relaxed text-ivory/80">
                  <span className="eyebrow mb-1.5 block text-smoke">In practice</span>
                  {principle.inPractice}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
