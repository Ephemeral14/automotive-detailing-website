import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";
import { pad } from "@/lib/utils";

const signs = [
  {
    title: "Reflections that hold their shape",
    body: "Look along a panel at something straight — a strip light, a roofline. Properly levelled paint returns it crisp and undistorted, without the haze or holograms a hurried machine polish leaves behind.",
    service: { label: "Paint correction", href: "/services#paint-correction" },
  },
  {
    title: "Water that leaves, not lingers",
    body: "A healthy coating beads tightly and sheds most of the water as the car moves. Flat, sheeting patches usually point to contamination — or protection that has quietly run its course.",
    service: { label: "Ceramic coating", href: "/services#ceramic-coating" },
  },
  {
    title: "Leather with a soft, low sheen",
    body: "Clean, conditioned leather looks almost matte. A high gloss is usually residue — body oils or the wrong dressing — sitting on the surface rather than nourishing it.",
    service: { label: "Interior detailing", href: "/services#interior-detailing" },
  },
  {
    title: "Edges, badges and seams",
    body: "Panel gaps, emblem surrounds and stitching are where shortcuts show first. They take the longest to clean properly, which is exactly why they are the first place we look.",
    service: { label: "Exterior detailing", href: "/services#exterior-detailing" },
  },
] as const;

/** Editorial companion to the gallery: what a genuinely good finish looks like. */
export function FinishGuide() {
  return (
    <section aria-labelledby="finish-guide-title" className="border-t border-hairline bg-graphite">
      <div className="container-site section-y grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            <SectionHeading
              id="finish-guide-title"
              eyebrow="What to look for"
              title={
                <>
                  How to read a <em>finish</em>.
                </>
              }
              description="Photographs flatter. In person, these are the details that separate careful work from a quick shine — and the ones we check before any vehicle leaves the studio."
            />
          </Reveal>
        </div>

        <ol className="border-t border-hairline lg:col-span-6 lg:col-start-7">
          {signs.map((sign, i) => (
            <li
              key={sign.title}
              className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-hairline py-9 sm:grid-cols-[3.5rem_1fr] sm:py-11"
            >
              <span aria-hidden="true" className="pt-2 text-[0.7rem] font-semibold tracking-[0.2em] text-champagne tabular-nums">
                {pad(i + 1)}
              </span>
              <div>
                <h3 className="font-display text-display-sm text-balance text-ivory">{sign.title}</h3>
                <p className="mt-4 max-w-prose leading-relaxed text-pretty text-ash">{sign.body}</p>
                <TextLink href={sign.service.href} className="mt-6 min-h-11">
                  {sign.service.label}
                </TextLink>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
