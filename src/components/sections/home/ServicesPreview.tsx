import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { featuredServices } from "@/data/services";

/** 02 — Six featured services in an editorial card grid. */
export function ServicesPreview() {
  return (
    <section aria-labelledby="services-title" className="section-y border-y border-hairline bg-graphite">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading
            id="services-title"
            index="02"
            eyebrow="Services"
            title={
              <>
                Considered care, <em>inside</em> and out.
              </>
            }
            description="Six disciplines, one standard. From a meticulous maintenance wash to multi-day correction and protection, every service is performed with the same patience."
          />
          <TextLink href="/services" className="shrink-0 self-start lg:mb-2 lg:self-auto">
            View all services
          </TextLink>
        </div>

        <Reveal y={36}>
          <ul className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {featuredServices.map((service, i) => (
              <li key={service.slug} className="flex">
                <ServiceCard service={service} index={i + 1} className="w-full" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
