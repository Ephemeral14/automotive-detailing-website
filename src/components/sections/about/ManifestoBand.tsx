import { Reveal } from "@/components/ui/Reveal";

/** Centred serif statement used as a breathing space between sections. */
export function ManifestoBand() {
  return (
    <div className="section-y-sm grain relative overflow-hidden border-y border-hairline bg-graphite">
      <Reveal as="figure" className="container-site relative text-center">
        <span
          aria-hidden="true"
          className="mx-auto block font-display text-[5rem] leading-[0.6] text-champagne/70 sm:text-[6.5rem]"
        >
          &ldquo;
        </span>
        <blockquote className="mx-auto mt-6 max-w-5xl">
          <p className="font-display text-display-lg text-balance text-ivory [&_em]:text-champagne [&_em]:italic">
            A finish is only ever as good as the light you are <em>willing</em> to inspect it under.
          </p>
        </blockquote>
        <figcaption className="eyebrow mt-10 flex items-center justify-center gap-4 text-ash">
          <span aria-hidden="true" className="gold-rule w-8 rotate-180" />
          A studio principle
          <span aria-hidden="true" className="gold-rule w-8" />
        </figcaption>
      </Reveal>
    </div>
  );
}
