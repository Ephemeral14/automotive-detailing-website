import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { pad } from "@/lib/utils";

const steps = [
  {
    title: "We confirm availability",
    body: "We reply to confirm your preferred date — or offer the nearest alternative — with an estimate shaped around your vehicle and what you’d like to achieve.",
  },
  {
    title: "Vehicle inspection",
    body: "On arrival we inspect the paint together under studio lighting, measure paint depth where correction is planned, and agree the scope before any work begins.",
  },
  {
    title: "Your session",
    body: "Your vehicle is detailed by hand, without hurry. At handover we walk you through the finish and leave you with simple aftercare guidance.",
  },
];

/** "What happens next" — closes the page before the footer. */
export function NextSteps() {
  return (
    <section aria-labelledby="next-steps-title" className="section-y-sm border-t border-hairline bg-graphite">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow flex items-center gap-4 text-champagne">
              <span aria-hidden="true" className="gold-rule w-8" />
              After you send
            </p>
            <h2
              id="next-steps-title"
              className="mt-6 font-display text-display-md text-balance text-ivory [&_em]:text-champagne [&_em]:italic"
            >
              What happens <em>next</em>.
            </h2>
          </div>

          <Reveal className="lg:col-span-8">
            <ol className="grid border-t border-hairline sm:grid-cols-3">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="border-b border-hairline py-8 sm:border-b-0 sm:border-l sm:px-7 sm:py-9 sm:first:border-l-0 sm:first:pl-0 lg:px-8"
                >
                  <span aria-hidden="true" className="font-display text-[2.5rem] leading-none text-champagne/90">
                    {pad(i + 1)}
                  </span>
                  <h3 className="mt-5 font-display text-2xl leading-tight text-ivory">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ash">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl text-ivory/90 italic">Prefer to see the work first?</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-2">
            <TextLink href="/gallery" className="py-3">
              View the gallery
            </TextLink>
            <TextLink href="/pricing" className="py-3">
              Compare packages
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
