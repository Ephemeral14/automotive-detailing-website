import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BeforeAfterSection } from "@/components/sections/home/BeforeAfterSection";
import { FeaturedGallery } from "@/components/sections/home/FeaturedGallery";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { Intro } from "@/components/sections/home/Intro";
import { ServicesPreview } from "@/components/sections/home/ServicesPreview";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";
import { pageSocial } from "@/lib/seo";

const title = "Noir Auto Studio — Premium Automotive Detailing";
const description =
  "A private, appointment-only detailing studio: paint correction, ceramic coating, paint protection film and interior restoration, finished by hand — one vehicle at a time. (Fictional portfolio concept.)";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  ...pageSocial({ title, description, path: "/" }),
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Intro />
      <ServicesPreview />
      <WhyChooseUs />
      <BeforeAfterSection />
      <FeaturedGallery />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
