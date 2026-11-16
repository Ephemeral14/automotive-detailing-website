import Link from "next/link";
import { Check, Minus, MoveHorizontal } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingPlans } from "@/data/pricing";
import { bookingLink, type ServiceOption } from "@/lib/booking";
import { cn, formatPrice } from "@/lib/utils";
import { comparisonGroups } from "./data";

/** Subtle tint marking the recommended plan's column. */
const featuredCol = "bg-champagne/[0.045]";

function Mark({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm whitespace-nowrap text-ivory/90">{value}</span>;
  }
  return value ? (
    <>
      <Check aria-hidden="true" strokeWidth={1.75} className="mx-auto size-4 text-champagne" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus aria-hidden="true" strokeWidth={1.5} className="mx-auto size-4 text-smoke/60" />
      <span className="sr-only">Not included</span>
    </>
  );
}

export function ComparisonSection() {
  return (
    <section id="compare" aria-labelledby="compare-title" className="section-y bg-noir">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading
            id="compare-title"
            index="03"
            eyebrow="Compare packages"
            title={
              <>
                Every step, <em>side by side</em>.
              </>
            }
            className="lg:col-span-7"
          />
          <p className="max-w-prose text-base leading-relaxed text-pretty text-ash sm:text-[1.0625rem] lg:col-span-4 lg:col-start-9">
            Each package builds on the one before it. Nothing is hidden in the small print — what
            you see here is what happens to your car.
          </p>
        </div>

        <p className="mt-12 flex items-center gap-3 text-xs tracking-[0.12em] text-smoke uppercase md:hidden">
          <MoveHorizontal aria-hidden="true" strokeWidth={1.5} className="size-4 text-champagne" />
          Swipe the table to compare
        </p>

        <div
          role="region"
          aria-labelledby="compare-caption"
          tabIndex={0}
          // `relative` makes this scroller the containing block for the absolutely
          // positioned sr-only labels in the cells, so they are clipped with the table.
          className="relative mt-4 overflow-x-auto border-y border-hairline md:mt-16 lg:mt-20"
        >
          <table className="w-full min-w-[40rem] border-separate border-spacing-0 text-left">
            <caption id="compare-caption" className="sr-only">
              Feature comparison of the Essential, Signature and Ultimate packages
            </caption>
            <colgroup>
              <col className="w-[44%] sm:w-[40%]" />
              {pricingPlans.map((plan) => (
                <col key={plan.id} className={plan.recommended ? featuredCol : undefined} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="sticky left-0 z-10 border-b border-hairline bg-noir py-6 pr-4 text-left align-bottom font-normal">
                  <span className="eyebrow text-smoke">Package</span>
                </th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={cn(
                      "relative border-b border-hairline px-3 py-6 text-center align-bottom font-normal",
                      plan.recommended && "border-t-2 border-t-champagne",
                    )}
                  >
                    {plan.recommended ? (
                      <span className="mb-2 block text-[0.6rem] font-bold tracking-[0.24em] text-champagne uppercase">
                        Recommended
                      </span>
                    ) : null}
                    <span className="block font-display text-2xl text-ivory sm:text-[1.75rem]">{plan.name}</span>
                    <span className="mt-1.5 block text-xs tracking-[0.1em] text-ash">
                      from {formatPrice(plan.price)}*
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {comparisonGroups.map((group) => (
              <tbody key={group.label}>
                <tr>
                  <th
                    scope="rowgroup"
                    colSpan={4}
                    className="border-b border-hairline pt-10 pb-4 text-left font-normal"
                  >
                    <span className="sticky left-0 flex items-center gap-4">
                      <span aria-hidden="true" className="gold-rule w-6" />
                      <span className="eyebrow text-champagne">{group.label}</span>
                    </span>
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.feature} className="group/row">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 border-b border-hairline bg-noir py-4 pr-4 text-left align-middle font-normal transition-colors duration-500 group-hover/row:bg-graphite"
                    >
                      <span className="block text-sm leading-snug text-ivory/90">{row.feature}</span>
                      {row.detail ? (
                        <span className="mt-1 block text-xs leading-snug text-smoke">{row.detail}</span>
                      ) : null}
                    </th>
                    {row.marks.map((mark, i) => (
                      <td
                        key={pricingPlans[i].id}
                        className="border-b border-hairline px-3 py-4 text-center align-middle transition-colors duration-500 group-hover/row:bg-white/[0.02]"
                      >
                        <Mark value={mark} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}

            <tfoot>
              <tr>
                <th scope="row" className="sticky left-0 z-10 bg-noir py-7 pr-4 text-left align-middle font-normal">
                  <span className="text-xs leading-relaxed text-smoke">
                    * Coupé &amp; compact.{" "}
                    <Link
                      href="#size-guide"
                      className="text-ash underline decoration-hairline-strong underline-offset-4 transition-colors duration-500 hover:text-champagne"
                    >
                      Size guide
                    </Link>
                  </span>
                </th>
                {pricingPlans.map((plan) => (
                  <td key={plan.id} className="px-3 py-7 text-center align-middle">
                    <Link
                      href={bookingLink(`${plan.name} Package` as ServiceOption)}
                      aria-label={`Book the ${plan.name} package`}
                      className="group/book inline-flex min-h-11 items-center justify-center gap-2 px-2 text-[0.65rem] font-semibold tracking-[0.22em] text-ivory uppercase transition-colors duration-500 hover:text-champagne"
                    >
                      <span className="relative pb-1">
                        Book
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-50 bg-champagne transition-transform duration-700 ease-luxe group-hover/book:scale-x-100"
                        />
                      </span>
                    </Link>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
