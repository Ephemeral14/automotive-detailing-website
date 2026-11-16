import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { photos } from "@/data/images";
import { bookingHref } from "@/lib/site";

type CtaBannerProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
};

/** Closing call-to-action used at the end of most pages. */
export function CtaBanner({
  eyebrow = "Private appointments",
  title = (
    <>
      Your vehicle <em>deserves</em> more.
    </>
  ),
  description = "Reserve a session at the studio. We'll assess your vehicle, recommend only what it needs, and confirm every detail before work begins.",
  ctaLabel = "Book your detailing session",
  ctaHref = bookingHref,
}: CtaBannerProps) {
  return (
    <section aria-labelledby="cta-title" className="grain relative isolate overflow-hidden">
      <Image
        src={photos.homeCta.src}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-20 object-cover opacity-70"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noir/60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(9,9,9,0.85)_75%)]"
      />

      <div className="container-site section-y text-center">
        <Reveal>
          <p className="eyebrow flex items-center justify-center gap-4 text-champagne">
            <span aria-hidden="true" className="gold-rule w-8 rotate-180" />
            {eyebrow}
            <span aria-hidden="true" className="gold-rule w-8" />
          </p>
          <h2
            id="cta-title"
            className="mx-auto mt-8 max-w-4xl font-display text-display-xl text-balance text-ivory uppercase [&_em]:text-champagne [&_em]:italic [&_em]:normal-case"
          >
            {title}
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-pretty text-ivory/70 sm:text-lg">
            {description}
          </p>
          <div className="mt-11 flex justify-center">
            <ButtonLink href={ctaHref} arrow>
              {ctaLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
