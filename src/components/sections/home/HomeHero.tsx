"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { photos } from "@/data/images";
import { bookingLink } from "@/lib/booking";

const ease = [0.22, 1, 0.36, 1] as const;

/** Headline words — revealed one by one from behind a mask. */
const headline: { text: string; accent?: boolean }[] = [
  { text: "Perfection" },
  { text: "in" },
  { text: "every", accent: true },
  { text: "detail." },
];

const disciplines = [
  { label: "Paint correction", href: "/services#paint-correction" },
  { label: "Ceramic coating", href: "/services#ceramic-coating" },
  { label: "Paint protection film", href: "/services#paint-protection-film" },
  { label: "Interior restoration", href: "/services#interior-detailing" },
] as const;

/** Fade-up entrance shared by the supporting copy. */
function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, ease, delay },
  };
}

/**
 * Full-viewport home hero.
 * Below `lg` the photograph sits in the flow as a cinematic band between the
 * headline and the calls to action, so the car is never covered by type.
 * From `lg` it becomes a full-bleed backdrop: headline in the near-black sky
 * above the car, actions on the studio floor beneath it.
 */
export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-noir"
    >
      {/* ── Photograph ─────────────────────────────────────────── */}
      <motion.div
        className="relative order-2 -mt-4 aspect-[4/3] w-full sm:-mt-10 sm:aspect-[16/10] lg:absolute lg:inset-0 lg:-z-10 lg:order-none lg:mt-0 lg:aspect-auto"
        initial={{ scale: 1.07 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.8, ease }}
      >
        <Image
          src={photos.homeHero.src}
          alt={photos.homeHero.alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          quality={75}
          className="object-cover object-[56%_50%] lg:object-[50%_62%]"
        />
        {/* Band edges melt into the page (small screens) */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-noir to-transparent lg:hidden" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-noir to-transparent lg:hidden" />
        {/* Legibility veils (large screens) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 hidden h-[48%] bg-linear-to-b from-noir/90 via-noir/45 to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-[34%] bg-linear-to-t from-noir via-noir/75 to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-1/3 bg-linear-to-r from-noir/50 to-transparent lg:block"
        />
      </motion.div>

      {/* ── Headline ───────────────────────────────────────────── */}
      {/* z-10: keeps the headline above the photo band's top veil, which overlaps it on small screens */}
      <div className="container-site relative z-10 order-1 pt-28 sm:pt-36 lg:pt-[clamp(8.5rem,17svh,11rem)]">
        <motion.p {...rise(0.15)} className="eyebrow flex items-center gap-4 text-champagne">
          <span aria-hidden="true" className="gold-rule w-10" />
          Noir Auto Studio
        </motion.p>
        <h1
          id="hero-title"
          className="mt-6 max-w-[13ch] font-display text-[clamp(3.1rem,1.4rem+6.4vw,6.75rem)] leading-[0.94] tracking-[-0.02em] text-balance text-ivory uppercase sm:mt-8 lg:max-w-[16ch] lg:text-[clamp(4.25rem,1.6rem+4.6vw,7.25rem)]"
        >
          {headline.map((word, i) => (
            <span key={word.text}>
              <span className="-mb-[0.12em] inline-block overflow-hidden pr-[0.06em] pb-[0.12em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "108%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.25, ease, delay: 0.3 + i * 0.11 }}
                >
                  {word.accent ? (
                    <em className="text-champagne normal-case italic">{word.text}</em>
                  ) : (
                    word.text
                  )}
                </motion.span>
              </span>
              {i < headline.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
      </div>

      {/* ── Supporting copy, actions and discipline index ──────── */}
      <div className="container-site order-3 mt-auto pt-2 pb-5 lg:pt-0 lg:pb-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <motion.p
            {...rise(0.85)}
            className="max-w-sm text-base leading-relaxed text-pretty text-ivory/75 sm:text-lg lg:max-w-md"
          >
            Premium automotive detailing. Precision care. Exceptional finishes.
          </motion.p>
          <motion.div {...rise(1)} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/services" arrow className="w-full sm:w-auto">
              Explore our services
            </ButtonLink>
            <ButtonLink href={bookingLink()} variant="outline" className="w-full sm:w-auto">
              Book an appointment
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: 1.3 }}
          className="mt-8 flex items-center justify-between gap-6 border-t border-hairline pt-2 lg:mt-12"
        >
          <a
            href="#intro"
            aria-label="Scroll to the studio introduction"
            className="group/cue -ml-1 inline-flex min-h-12 items-center gap-4 px-1 text-ash transition-colors duration-500 hover:text-champagne"
          >
            <span aria-hidden="true" className="relative block h-9 w-px overflow-hidden bg-ivory/15">
              <span className="absolute inset-x-0 top-0 block h-1/2 bg-champagne motion-safe:animate-scroll-cue" />
            </span>
            <span aria-hidden="true" className="text-[0.625rem] font-semibold tracking-[0.32em] uppercase">
              Scroll
            </span>
          </a>

          <ul aria-label="Disciplines" className="hidden items-center md:flex">
            {disciplines.map((item, i) => (
              <li key={item.href} className="flex items-center">
                {i > 0 ? <span aria-hidden="true" className="mx-4 size-1 rounded-full bg-champagne/50 xl:mx-6" /> : null}
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-[0.625rem] font-semibold tracking-[0.26em] text-ash uppercase transition-colors duration-500 hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-[0.625rem] font-semibold tracking-[0.26em] text-ash uppercase md:hidden">
            By appointment only
          </p>
        </motion.div>
      </div>
    </section>
  );
}
