import type { FaqItem, PricingPlan } from "@/types";

/** Fictional portfolio pricing — not a real offer. */
export const pricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    price: 99,
    tagline: "A careful refresh, inside and out.",
    idealFor: "Well-kept vehicles that need a meticulous clean.",
    duration: "≈ 2 – 3 hours",
    features: [
      "Exterior hand wash",
      "Wheel cleaning",
      "Interior vacuum",
      "Dashboard cleaning",
      "Window cleaning",
    ],
    recommended: false,
  },
  {
    id: "signature",
    name: "Signature",
    price: 199,
    tagline: "Our most-requested detail.",
    idealFor: "Daily-driven vehicles ready for a deep reset.",
    duration: "≈ 4 – 5 hours",
    features: [
      "Everything in Essential",
      "Deep interior cleaning",
      "Paint decontamination",
      "Premium exterior finish",
      "Tire dressing",
    ],
    recommended: true,
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: 399,
    tagline: "The complete studio treatment.",
    idealFor: "Prized vehicles and owners who expect perfection.",
    duration: "≈ 1 full day",
    features: [
      "Everything in Signature",
      "One-step paint enhancement",
      "Premium paint protection",
      "Detailed interior treatment",
      "Final inspection",
    ],
    recommended: false,
  },
];

export const pricingFaq: FaqItem[] = [
  {
    question: "Why does the final price depend on my vehicle?",
    answer:
      "Package prices are a starting point for a mid-size vehicle in good condition. Larger vehicles, heavy soiling, pet hair, or paint that needs extra attention take more time and product, so we confirm an exact quote after a short inspection — before any work begins.",
  },
  {
    question: "How long will my car be at the studio?",
    answer:
      "Essential sessions typically take two to three hours, Signature four to five, and Ultimate a full day. Multi-day services such as paint correction or ceramic coating are scheduled with a clear drop-off and collection time.",
  },
  {
    question: "Do you use automated or brush car washes?",
    answer:
      "Never. Every vehicle is washed by hand using the two-bucket method, plush microfiber and pH-balanced products, to avoid the swirl marks that automated washes create.",
  },
  {
    question: "Can I upgrade or add individual services?",
    answer:
      "Yes. Any package can be combined with services such as engine bay detailing, paint correction or ceramic coating. We'll recommend only what your vehicle genuinely needs.",
  },
  {
    question: "What is the difference between a sealant and a ceramic coating?",
    answer:
      "A sealant is a protective layer that typically lasts several months. A ceramic coating forms a much harder, longer-lasting bond with the clear coat, offering stronger chemical resistance and easier maintenance over years rather than months.",
  },
  {
    question: "How do I reserve an appointment?",
    answer:
      "Send a request through the booking form on the contact page with your vehicle details and preferred date. On this portfolio website the form is a demonstration — it validates your entry but does not send a message to a real business.",
  },
];
