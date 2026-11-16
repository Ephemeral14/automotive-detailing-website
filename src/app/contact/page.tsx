import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { BookingSection } from "@/components/sections/contact/BookingSection";
import { NextSteps } from "@/components/sections/contact/NextSteps";
import { ButtonLink } from "@/components/ui/Button";
import { photos } from "@/data/images";

const title = "Contact & Booking";
const description =
  "Request a private detailing appointment at Noir Auto Studio — share your vehicle and preferred date, or message the studio directly. (Fictional portfolio concept; the booking form is a demonstration.)";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: `${title} — Noir Auto Studio`, description, url: "/contact" },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Reserve your <em>session</em>.
          </>
        }
        description="Tell us about your vehicle and what you’d like to achieve. We’ll confirm availability, recommend only what it needs and agree every detail before work begins."
        image={photos.pageContact}
        imagePosition="50% 62%"
        className="min-h-[32rem] sm:min-h-[36rem] lg:min-h-[40rem]"
      >
        <ButtonLink href="#booking" arrow>
          Request an appointment
        </ButtonLink>
      </PageHero>
      <BookingSection />
      <NextSteps />
    </>
  );
}
