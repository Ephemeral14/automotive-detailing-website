import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { pad } from "@/lib/utils";
import { conditionRow, sizeClasses } from "./data";
import { PriceEstimator } from "./PriceEstimator";

export function SizeGuideSection() {
  const rows = [...sizeClasses, { id: "condition", ...conditionRow }];
  return (
    <section
      id="size-guide"
      aria-labelledby="size-guide-title"
      className="section-y border-y border-hairline bg-graphite"
    >
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHeading
              id="size-guide-title"
              index="02"
              eyebrow="Vehicle size guide"
              size="md"
              title={
                <>
                  Priced to the <em>car</em>, not the clock.
                </>
              }
              description="Larger vehicles simply take longer to do properly. Package prices are set for a coupé or compact; everything else follows one transparent adjustment."
            />
            <p className="mt-8 text-xs leading-relaxed text-smoke">
              Illustrative guide for a fictional studio — percentages are examples only.
            </p>
          </div>

          <dl className="border-t border-hairline lg:col-span-7 lg:col-start-6">
            {rows.map((row, i) => (
              <div
                key={row.id}
                className="grid gap-y-3 border-b border-hairline py-7 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-10 sm:py-8"
              >
                <dt className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-4 sm:grid-cols-[3rem_1fr] sm:gap-x-6">
                  <span aria-hidden="true" className="text-[0.7rem] font-semibold tracking-[0.2em] text-smoke tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <span className="font-display text-2xl leading-tight text-ivory sm:text-[1.75rem]">{row.label}</span>
                  <span className="col-start-2 mt-2 block max-w-md text-sm leading-relaxed text-ash">{row.examples}</span>
                </dt>
                <dd
                  className={
                    row.id === "condition"
                      ? "pl-[3.25rem] text-sm text-champagne italic sm:pl-0 sm:text-right"
                      : "pl-[3.25rem] font-display text-2xl text-champagne sm:pl-0 sm:text-right sm:text-[1.75rem]"
                  }
                >
                  {row.adjustment}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Reveal className="mt-20 lg:mt-28">
          <PriceEstimator />
        </Reveal>
      </div>
    </section>
  );
}
