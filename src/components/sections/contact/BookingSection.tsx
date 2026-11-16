import { Suspense } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactFormSkeleton } from "@/components/forms/ContactFormSkeleton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DemoNote } from "@/components/ui/DemoNote";
import { ContactSidebar } from "./ContactSidebar";

/** Booking request form + direct contact sidebar. Anchor target for every "Book" CTA. */
export function BookingSection() {
  return (
    <section id="booking" aria-labelledby="booking-title" className="section-y bg-noir">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <div className="min-w-0 lg:col-span-7">
          <SectionHeading
            id="booking-title"
            eyebrow="Booking request"
            title={
              <>
                Tell us about your <em>vehicle</em>.
              </>
            }
            description="Share a few details and your preferred date. Every request is read personally, and we’ll reply to confirm availability and a considered estimate before anything is booked."
          />
          <DemoNote className="mt-6 max-w-prose">
            Portfolio demonstration: the form validates and simulates sending, but nothing reaches a real business
            and no data is stored.
          </DemoNote>

          <div className="mt-14 sm:mt-16">
            <Suspense fallback={<ContactFormSkeleton />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5 xl:col-span-4 xl:col-start-9">
          <ContactSidebar />
        </div>
      </div>
    </section>
  );
}
