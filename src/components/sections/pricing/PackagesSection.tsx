import Link from "next/link";
import { PricingCard } from "@/components/ui/PricingCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DemoBadge } from "@/components/ui/DemoNote";
import { pricingPlans } from "@/data/pricing";

export function PackagesSection() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="section-y bg-noir">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading
            id="packages-title"
            index="01"
            eyebrow="Studio packages"
            title={
              <>
                Three ways to <em>begin</em>.
              </>
            }
            className="lg:col-span-7"
          />
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-prose text-base leading-relaxed text-pretty text-ash sm:text-[1.0625rem]">
              Each package is a complete session, performed by hand. Most owners begin with{" "}
              <span className="text-ivory">Signature</span> — the deep reset a daily-driven car
              usually needs — and add individual treatments where they are genuinely worthwhile.
            </p>
          </div>
        </div>

        <Reveal className="mt-16 sm:mt-20 lg:mt-24">
          <ul
            role="list"
            className="mx-auto grid max-w-xl gap-10 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-6 lg:py-6 xl:gap-8"
          >
            {pricingPlans.map((plan) => (
              <li key={plan.id} className="flex">
                {/* h-auto lets the stretched flex item honour the featured card's lg:-my-6 overhang */}
                <PricingCard plan={plan} className="h-auto w-full" />
              </li>
            ))}
          </ul>
        </Reveal>

        <PriceNote />
      </div>
    </section>
  );
}

/** The honest disclaimer for the "from*" figures. */
function PriceNote() {
  return (
    <aside
      aria-labelledby="price-note-title"
      className="mt-16 grid gap-6 border-y border-hairline py-10 sm:mt-20 sm:grid-cols-[auto_1fr] sm:gap-10 sm:py-12 lg:mt-24 lg:grid-cols-12 lg:gap-10"
    >
      <p
        aria-hidden="true"
        className="font-display text-[5.5rem] leading-[0.6] text-champagne sm:text-[7rem] lg:col-span-1"
      >
        *
      </p>
      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <h3 id="price-note-title" className="font-display text-display-sm text-ivory">
            A note on these prices
          </h3>
          <DemoBadge>Portfolio example</DemoBadge>
        </div>
        <p className="mt-4 max-w-prose text-[0.975rem] leading-relaxed text-pretty text-ash">
          Noir Auto Studio is a fictional studio created for a design portfolio. Every figure on this
          page is an illustrative example rather than an offer — in a working studio, the final price
          would always depend on the size and condition of your vehicle.
        </p>
      </div>
      <dl className="space-y-5 text-[0.975rem] leading-relaxed text-ash sm:col-start-2 lg:col-span-5 lg:col-start-8">
        <div>
          <dt className="eyebrow text-champagne">“From*”</dt>
          <dd className="mt-2 text-pretty">
            The starting price for a coupé or compact in good condition. Larger vehicles follow the{" "}
            <Link
              href="#size-guide"
              className="text-ivory underline decoration-champagne/50 underline-offset-4 transition-colors duration-500 hover:text-champagne"
            >
              vehicle size guide
            </Link>
            .
          </dd>
        </div>
        <div>
          <dt className="eyebrow text-champagne">Confirmed first</dt>
          <dd className="mt-2 text-pretty">
            Heavy soiling, pet hair or paint that needs extra attention is quoted after a short
            inspection — and agreed with you before any work begins.
          </dd>
        </div>
      </dl>
    </aside>
  );
}
