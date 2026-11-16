import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FinishGuide } from "@/components/gallery/FinishGuide";
import { ButtonLink } from "@/components/ui/Button";
import { DemoNote } from "@/components/ui/DemoNote";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/data/images";

const description =
  "A curated gallery of exterior, interior, ceramic coating and paint correction finishes — filter by discipline and view each frame full-screen. Illustrative photography.";

export const metadata: Metadata = {
  title: "Gallery",
  description,
  openGraph: {
    title: "Gallery — Noir Auto Studio",
    description,
    url: "/gallery",
  },
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Studies in <em>gloss</em> and shadow.
          </>
        }
        description={
          <p>
            A curated archive of the finishes we work towards — levelled paint, tightly beaded coatings,
            leather returned to a soft sheen. All imagery is illustrative photography, chosen to show a
            standard rather than a particular car.
          </p>
        }
        image={photos.pageGallery}
        imagePosition="62% 50%"
      >
        <ButtonLink href="#archive" variant="outline" arrow>
          View the archive
        </ButtonLink>
      </PageHero>

      <section id="archive" aria-labelledby="archive-title" className="section-y bg-noir">
        <div className="container-site">
          <Reveal className="grid gap-8 pb-12 sm:pb-14 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-16">
            <SectionHeading
              id="archive-title"
              eyebrow="The archive"
              title={
                <>
                  Every surface, <em>considered</em>.
                </>
              }
              className="lg:col-span-7"
            />
            <p className="max-w-md leading-relaxed text-pretty text-ash lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              Filter by discipline, then open any frame to see it full-screen. Use the arrow keys — or
              swipe — to move through a set.
            </p>
          </Reveal>

          <GalleryGrid />

          <DemoNote className="mt-12 max-w-2xl sm:mt-14">
            Photography is Unsplash-licensed illustrative imagery used for this portfolio concept — it
            does not show work by a real studio. Every photographer is credited on the{" "}
            <Link
              href="/credits"
              className="text-ash underline decoration-champagne/50 underline-offset-4 transition-colors duration-500 hover:text-ivory"
            >
              photo credits
            </Link>{" "}
            page.
          </DemoNote>
        </div>
      </section>

      <FinishGuide />

      <CtaBanner />
    </>
  );
}
