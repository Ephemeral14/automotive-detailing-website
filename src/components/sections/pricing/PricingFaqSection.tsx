import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";
import { pricingFaq } from "@/data/pricing";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function PricingFaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-noir">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="faq-title"
              index="05"
              eyebrow="Questions"
              size="md"
              title={
                <>
                  Before you <em>book</em>.
                </>
              }
              description="The questions owners ask most about pricing, timing and what happens on the day."
            />
            <TextLink href="/contact" className="mt-10 min-h-11">
              Ask us anything else
            </TextLink>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FaqAccordion items={pricingFaq} />
        </div>
      </div>
    </section>
  );
}
