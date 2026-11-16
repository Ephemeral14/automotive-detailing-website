import type { Testimonial } from "@/types";

/**
 * DEMONSTRATION TESTIMONIALS.
 * These are sample quotes written for a portfolio project to show how
 * reviews would be presented. They are not from real customers.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I've had the car professionally cleaned many times, but never like this. Under the studio lights the paint looked deeper than the day I collected it — and every step was explained before it happened.",
    persona: "Sample client persona",
    vehicle: "Grand tourer, black metallic",
    service: "Paint Correction & Ceramic Coating",
  },
  {
    id: "t2",
    quote:
      "The interior had years of wear in the leather. It came back clean, supple and genuinely fresh, with no perfume masking anything. The attention to the small trims was remarkable.",
    persona: "Sample client persona",
    vehicle: "Executive saloon, cognac leather",
    service: "Interior Detailing",
  },
  {
    id: "t3",
    quote:
      "Quiet, unhurried and precise. The front end is now protected with film you simply cannot see, and the maintenance visits keep everything exactly as it should be.",
    persona: "Sample client persona",
    vehicle: "Performance coupé, silver",
    service: "Paint Protection Film",
  },
];
