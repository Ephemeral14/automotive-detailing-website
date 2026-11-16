import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfter } from "@/components/sections/home/BeforeAfter";

/** 04 — Before & after: an illustrative comparison slider across two showcases. */
export function BeforeAfterSection() {
  return (
    <section aria-labelledby="before-after-title" className="section-y border-y border-hairline bg-graphite">
      <div className="container-site">
        <Reveal y={32}>
          <BeforeAfter
            intro={
              <SectionHeading
                id="before-after-title"
                index="04"
                eyebrow="Before & after"
                size="md"
                title={
                  <>
                    The <em>difference</em>, revealed.
                  </>
                }
                description="Correction is about clarity: reflections that are sharp, colour that is deep, metal that shines rather than glows. Draw the divider across to compare."
              />
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
