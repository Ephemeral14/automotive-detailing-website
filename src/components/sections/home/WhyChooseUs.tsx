import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { FlaskConical, HandHeart, ScanSearch, Crosshair } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/data/images";
import { pad } from "@/lib/utils";

const pillars: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Attention to detail",
    body: "Every panel is inspected under daylight-balanced lamps before and after we work. Badges, seams, shut lines and wheel barrels receive the same care as the bonnet — the places most people never look are where we spend our time.",
    icon: ScanSearch,
  },
  {
    title: "Premium products",
    body: "pH-balanced shampoos, dedicated leather care and professional-grade coatings, selected for your paint and materials. Nothing harsh, nothing generic, and nothing applied simply because it happens to be on the shelf.",
    icon: FlaskConical,
  },
  {
    title: "Experienced specialists",
    body: "Your vehicle is handled by detailers who specialise in correction, coatings and film — not a rotating wash crew. Paint is measured before it is polished, and every process is proven on a test section first.",
    icon: Crosshair,
  },
  {
    title: "Personalised service",
    body: "We begin with a conversation and an inspection, then recommend only what your vehicle genuinely needs. You'll know the plan, the timing and the price before work begins, with aftercare guidance at handover.",
    icon: HandHeart,
  },
];

/**
 * The registry photo for this slot is a lit LED headlight at night; the
 * registry alt text currently describes a different frame, so the accurate
 * description is supplied here (see sharedChangeRequests).
 */
const whyAlt =
  "Front corner of a dark car at night, its LED headlight blazing and an amber fog lamp glowing beneath the shadowed bonnet";

/** 03 — Why choose us: sticky portrait beside a hairline-divided numbered list. */
export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="section-y bg-noir">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <SectionHeading
            id="why-title"
            index="03"
            eyebrow="Why Noir"
            title={
              <>
                Standards you can <em>see</em> — and feel.
              </>
            }
            description="Detailing is judged in the details. These are the principles every vehicle is held to, whatever the service."
          />
        </div>

        <figure className="lg:sticky lg:top-28 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start">
          <div className="relative aspect-[4/3] overflow-hidden bg-onyx sm:aspect-[16/10] lg:aspect-[4/5]">
            <Image
              src={photos.homeWhy.src}
              alt={whyAlt}
              fill
              sizes="(min-width: 1440px) 560px, (min-width: 1024px) 38vw, 92vw"
              placeholder="blur"
              className="object-cover object-[60%_45%]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-noir/70 via-transparent to-noir/20" />
            <p className="eyebrow absolute bottom-6 left-6 flex items-center gap-4 text-ivory/85">
              <span aria-hidden="true" className="gold-rule w-8" />
              Held to one standard
            </p>
          </div>
        </figure>

        <Reveal className="lg:col-span-6 lg:col-start-7 lg:row-start-2">
          <ol className="border-t border-hairline">
            {pillars.map(({ title, body, icon: Icon }, i) => (
              <li
                key={title}
                className="group/pillar grid grid-cols-[auto_1fr] gap-x-6 border-b border-hairline py-9 sm:gap-x-10 sm:py-11"
              >
                <div className="flex flex-col items-start gap-5">
                  <span className="text-[0.65rem] font-semibold tracking-[0.24em] text-smoke tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 items-center justify-center border border-hairline-strong text-champagne transition-colors duration-700 ease-luxe group-hover/pillar:border-champagne/60"
                  >
                    <Icon strokeWidth={1.25} className="size-[1.15rem]" />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-display-sm text-ivory">{title}</h3>
                  <p className="mt-3 max-w-lg text-[0.975rem] leading-relaxed text-pretty text-ash">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
