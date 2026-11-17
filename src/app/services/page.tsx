import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ServiceCatalogue } from "@/components/sections/services/ServiceCatalogue";
import { ProcessTimeline } from "@/components/sections/services/ProcessTimeline";
import { ServiceAdvice } from "@/components/sections/services/ServiceAdvice";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DemoNote } from "@/components/ui/DemoNote";
import { photos } from "@/data/images";
import { pageSocial } from "@/lib/seo";

const title = "Detailing Services";
const description =
  "Exterior and interior detailing, paint correction, ceramic coating, paint protection film and maintenance care — each service explained in full, with estimated durations and starting prices.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSocial({ title: `${title} — Noir Auto Studio`, description, path: "/services" }),
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Craft, applied to <em>every</em> surface.
          </>
        }
        description="Eight services, from a swirl-safe wash to multi-day correction and protection. Each one performed by hand, explained before it begins, and finished under inspection light."
        image={photos.pageServices}
        imagePosition="50% 66%"
      />

      <section id="catalogue" aria-labelledby="catalogue-title" className="bg-noir">
        <ServiceCatalogue
          intro={
            <SectionHeading
              id="catalogue-title"
              eyebrow="The catalogue"
              title={
                <>
                  Choose by <em>need</em>, not by name.
                </>
              }
              description="Filter by the part of the car you care about most, or jump straight to a service. Many owners combine two — correction followed by a coating is the classic pairing."
            />
          }
        />

        <div className="border-t border-hairline">
          <div className="container-site py-10 sm:py-12">
            <DemoNote className="max-w-3xl text-[0.8125rem]">
              <span className="text-ash">* Illustrative estimates.</span> All durations and prices on this page are
              fictional examples created for a portfolio concept, not real offers. A final quote always depends on the
              size and condition of the vehicle and is confirmed after inspection.
            </DemoNote>
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <ServiceAdvice />
      <CtaBanner />
    </>
  );
}
