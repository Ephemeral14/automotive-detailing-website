import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { PackagesSection } from "@/components/sections/pricing/PackagesSection";
import { SizeGuideSection } from "@/components/sections/pricing/SizeGuideSection";
import { ComparisonSection } from "@/components/sections/pricing/ComparisonSection";
import { AddOnsSection } from "@/components/sections/pricing/AddOnsSection";
import { PricingFaqSection } from "@/components/sections/pricing/PricingFaqSection";
import { photos } from "@/data/images";
import { bookingHref } from "@/lib/site";
import { pageSocial } from "@/lib/seo";

const title = "Pricing & Packages";
const description =
  "Essential, Signature and Ultimate detailing packages, a transparent vehicle size guide, a full feature comparison and optional add-ons. Illustrative prices for a fictional studio.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSocial({ title: `${title} — Noir Auto Studio`, description, path: "/pricing" }),
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Clear pricing. <em>Considered</em> care.
          </>
        }
        description="Three studio packages, one transparent size guide and a short menu of add-ons — so you know exactly where you stand before the car arrives."
        image={photos.pagePricing}
        imagePosition="24% 42%"
        contentAlign="right"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <ButtonLink href="#packages">View packages</ButtonLink>
          <ButtonLink href={bookingHref} variant="outline" arrow>
            Request a quote
          </ButtonLink>
        </div>
      </PageHero>

      <PackagesSection />
      <SizeGuideSection />
      <ComparisonSection />
      <AddOnsSection />
      <PricingFaqSection />
      <CtaBanner />
    </>
  );
}
