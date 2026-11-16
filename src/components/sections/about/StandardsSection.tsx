import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/data/images";
import { pad } from "@/lib/utils";
import { LightInspector } from "./LightInspector";
import { sectionIndex, standards } from "./content";

export function StandardsSection() {
  return (
    <section id="standards" aria-labelledby="standards-title" className="section-y bg-noir">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading
            id="standards-title"
            index={sectionIndex("standards")}
            eyebrow="Quality standards"
            title={
              <>
                Working rules, held <em>without</em> exception.
              </>
            }
            className="lg:col-span-7"
          />
          <p className="max-w-md text-base leading-relaxed text-pretty text-ash lg:col-span-4 lg:col-start-9 lg:pb-2">
            Not certificates on a wall — a short list of habits applied to every vehicle, whatever the
            booking. They are what make the difference you notice months later.
          </p>
        </div>

        <div className="mt-16 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <LightInspector photo={photos.aboutStandards} className="lg:sticky lg:top-28 lg:col-span-7 lg:self-start" />

          <Reveal className="lg:col-span-5">
            <ol className="border-t border-hairline">
              {standards.map((standard, i) => (
                <li key={standard.title} className="flex gap-5 border-b border-hairline py-7 first:pt-7 sm:gap-6">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center border border-champagne/40 text-champagne"
                  >
                    <Check strokeWidth={1.5} className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] leading-snug font-semibold text-balance text-ivory">
                      <span className="mr-3 text-[0.7rem] font-semibold tracking-[0.2em] text-smoke tabular-nums">
                        {pad(i + 1)}
                      </span>
                      {standard.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-ash">{standard.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
