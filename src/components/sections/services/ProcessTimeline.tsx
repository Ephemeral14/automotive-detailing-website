import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { pad } from "@/lib/utils";

const steps = [
  {
    title: "Consultation",
    when: "Before you book",
    body: "A short conversation about the car, how it is used and what you would like to change. We recommend only what it genuinely needs — and tell you when something can wait.",
  },
  {
    title: "Inspection",
    when: "On arrival",
    body: "Under studio lighting we map defects, take paint depth readings and assess leather and trim. Your quote and timings are confirmed in writing before any work begins.",
  },
  {
    title: "Detailing",
    when: "In the studio",
    body: "Work is carried out by hand in a closed bay, one vehicle at a time. Multi-day treatments include a progress update with photographs at the end of each day.",
  },
  {
    title: "Handover",
    when: "On collection",
    body: "We walk you round the finished car under inspection lights, explain aftercare in plain terms and, if it suits, arrange your first maintenance visit.",
  },
];

/** Four-step studio process — horizontal timeline on desktop, vertical on mobile. */
export function ProcessTimeline() {
  return (
    <section aria-labelledby="process-title" className="border-t border-hairline bg-graphite">
      <div className="container-site section-y">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-14">
          <SectionHeading
            id="process-title"
            eyebrow="The process"
            title={
              <>
                From first conversation to <em>final</em> handover.
              </>
            }
            className="lg:col-span-7"
          />
          <p className="max-w-md leading-relaxed text-pretty text-ash lg:col-span-5 lg:justify-self-end">
            Every service follows the same four quiet steps, whether it takes two hours or four days. No
            surprises, no work you haven&rsquo;t agreed to.
          </p>
        </div>

        <Reveal>
          <ol className="relative mt-16 grid gap-12 sm:mt-20 lg:grid-cols-4 lg:gap-10 xl:gap-14">
            {/* Vertical rail (mobile / tablet) */}
            <span
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[1.375rem] w-px bg-gradient-to-b from-champagne/70 via-hairline-strong to-hairline lg:hidden"
            />
            {/* Horizontal rail (desktop) */}
            <span
              aria-hidden="true"
              className="absolute top-[1.375rem] right-0 left-0 hidden h-px bg-gradient-to-r from-champagne/70 via-hairline-strong to-hairline lg:block"
            />
            {steps.map((step, i) => (
              <li key={step.title} className="relative pl-[4.5rem] lg:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 inline-flex size-11 items-center justify-center border border-champagne/50 bg-graphite font-display text-lg text-champagne tabular-nums lg:relative"
                >
                  {pad(i + 1)}
                </span>
                <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-smoke uppercase lg:mt-9">
                  <span className="sr-only">Step {i + 1}, </span>
                  {step.when}
                </p>
                <h3 className="mt-3 font-display text-display-sm text-ivory">{step.title}</h3>
                <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-pretty text-ash">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
