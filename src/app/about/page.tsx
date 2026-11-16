import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { AboutIndex } from "@/components/sections/about/AboutIndex";
import { ApproachSection } from "@/components/sections/about/ApproachSection";
import { CraftSection } from "@/components/sections/about/CraftSection";
import { ManifestoBand } from "@/components/sections/about/ManifestoBand";
import { PhilosophySection } from "@/components/sections/about/PhilosophySection";
import { StandardsSection } from "@/components/sections/about/StandardsSection";
import { StudioSection } from "@/components/sections/about/StudioSection";
import { photos } from "@/data/images";

const title = "About the Studio";
const description =
  "The philosophy, method and standards behind Noir Auto Studio — a private, appointment-only detailing studio where every finish is measured, hand-finished and judged under honest light.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: `${title} — Noir Auto Studio`, description, url: "/about" },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Patience, under <em>honest</em> light.
          </>
        }
        description="A private studio for owners who notice the difference. We measure before we touch, finish by hand, and judge every surface under light that hides nothing."
        image={photos.aboutHero}
        imagePosition="50% 60%"
      >
        <AboutIndex />
      </PageHero>
      <PhilosophySection />
      <ApproachSection />
      <CraftSection />
      <ManifestoBand />
      <StandardsSection />
      <StudioSection />
      <CtaBanner />
    </>
  );
}
