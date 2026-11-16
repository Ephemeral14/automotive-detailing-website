import { ButtonLink } from "@/components/ui/Button";
import { bookingLink } from "@/lib/booking";

/** Compact "Not sure which service?" prompt — routes to packages or a recommendation request. */
export function ServiceAdvice() {
  return (
    <section aria-labelledby="advice-title" className="border-t border-hairline bg-noir">
      <div className="container-site section-y-sm">
        <div className="grid gap-10 border border-hairline px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-14 lg:py-14">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-4 text-champagne">
              <span aria-hidden="true" className="gold-rule w-8" />
              Guidance
            </p>
            <h2
              id="advice-title"
              className="mt-6 font-display text-display-md text-balance text-ivory [&_em]:text-champagne [&_em]:italic"
            >
              Not sure <em>which</em> service?
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-pretty text-ash">
              Tell us the make, the mileage and what bothers you about the finish. We&rsquo;ll suggest the
              right treatment — or one of our packages, which combine the essentials at a set starting price.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-stretch xl:flex-row xl:justify-end">
            <ButtonLink href={bookingLink("Not sure yet — please advise")} arrow>
              Ask for advice
            </ButtonLink>
            <ButtonLink href="/pricing" variant="outline">
              Compare packages
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
