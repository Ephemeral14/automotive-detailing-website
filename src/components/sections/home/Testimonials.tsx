import { DemoNote } from "@/components/ui/DemoNote";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

/** 06 — Testimonials (demonstration content, clearly labelled). */
export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="section-y border-t border-hairline bg-graphite">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading
            id="testimonials-title"
            index="06"
            eyebrow="Client notes"
            title={
              <>
                In their <em>words</em>.
              </>
            }
            description="What owners notice first is rarely the shine. It is the care taken over the parts they never mentioned."
          />
          <DemoNote className="max-w-xs lg:mb-2">
            These are demonstration testimonials written for this portfolio concept — not genuine customer
            reviews.
          </DemoNote>
        </div>

        <Reveal y={36}>
          <ul className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:items-start lg:gap-8">
            {testimonials.map((testimonial, i) => (
              <li key={testimonial.id} className={cn("h-full", i === 1 && "lg:mt-16")}>
                <TestimonialCard testimonial={testimonial} className="bg-onyx" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
