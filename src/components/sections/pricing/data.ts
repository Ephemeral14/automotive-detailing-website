/**
 * Pricing-page content. Every figure here is a fictional, illustrative
 * example for a portfolio project — not a real offer.
 */
import type { PricingPlan } from "@/types";

export type SizeClass = {
  id: "compact" | "saloon" | "suv";
  label: string;
  examples: string;
  /** Multiplier applied to the package price. */
  factor: number;
  adjustment: string;
};

export const sizeClasses: SizeClass[] = [
  {
    id: "compact",
    label: "Coupé & compact",
    examples: "Two-door coupés, roadsters, hatchbacks and small saloons.",
    factor: 1,
    adjustment: "Package price",
  },
  {
    id: "saloon",
    label: "Saloon & estate",
    examples: "Executive saloons, four-door coupés, estates and grand tourers.",
    factor: 1.15,
    adjustment: "+15%",
  },
  {
    id: "suv",
    label: "SUV & 7-seat",
    examples: "Large SUVs, full-size 4×4s, people carriers and seven-seaters.",
    factor: 1.25,
    adjustment: "+25%",
  },
];

/** The condition row of the size guide — never a fixed figure. */
export const conditionRow = {
  label: "Heavily soiled or pet hair",
  examples: "Embedded sand, mud, staining, smoke odour or pet hair throughout the cabin.",
  adjustment: "Quoted after inspection",
};

export function estimate(plan: PricingPlan, size: SizeClass) {
  return Math.round(plan.price * size.factor);
}

type Mark = boolean | string;

export type ComparisonGroup = {
  label: string;
  rows: { feature: string; detail?: string; marks: [Mark, Mark, Mark] }[];
};

/** Column order matches `pricingPlans`: Essential, Signature, Ultimate. */
export const comparisonGroups: ComparisonGroup[] = [
  {
    label: "Exterior",
    rows: [
      { feature: "Snow foam pre-wash & two-bucket hand wash", marks: [true, true, true] },
      { feature: "Wheel faces & arches cleaned", marks: [true, true, true] },
      { feature: "Exterior glass polished streak-free", marks: [true, true, true] },
      { feature: "Paint decontamination", detail: "Iron fallout & clay bar", marks: [false, true, true] },
      { feature: "Premium exterior finish", detail: "Hand-applied sealant", marks: [false, true, true] },
      { feature: "Tyre dressing", marks: [false, true, true] },
      { feature: "One-step paint enhancement", detail: "Machine polish for gloss", marks: [false, false, true] },
      { feature: "Premium paint protection", detail: "Longer-lasting protective layer", marks: [false, false, true] },
    ],
  },
  {
    label: "Interior",
    rows: [
      { feature: "Interior vacuum", marks: [true, true, true] },
      { feature: "Dashboard & console cleaning", marks: [true, true, true] },
      { feature: "Interior glass cleaned", marks: [true, true, true] },
      { feature: "Deep interior cleaning", detail: "Seats, carpets & mats", marks: [false, true, true] },
      { feature: "Detailed interior treatment", detail: "Leather & trim conditioned", marks: [false, false, true] },
    ],
  },
  {
    label: "Session",
    rows: [
      { feature: "Typical time at the studio", marks: ["2 – 3 hrs", "4 – 5 hrs", "1 day"] },
      { feature: "Final inspection under studio lighting", marks: [false, false, true] },
    ],
  },
];

export type AddOn = {
  name: string;
  description: string;
  priceFrom: number;
  duration: string;
  href?: `/${string}`;
};

export const addOns: AddOn[] = [
  {
    name: "Engine bay detail",
    description: "Low-moisture steam clean with electrics masked, plastics dressed to a satin finish.",
    priceFrom: 119,
    duration: "+ 1.5 hrs",
    href: "/services#engine-bay-detailing",
  },
  {
    name: "Ceramic glass coating",
    description: "A hydrophobic layer on the windscreen and side glass — rain clears at speed.",
    priceFrom: 89,
    duration: "+ 1 hr",
  },
  {
    name: "Leather protection",
    description: "Cleaned, then sealed against denim dye transfer, spills and everyday wear.",
    priceFrom: 129,
    duration: "+ 1.5 hrs",
  },
  {
    name: "Headlight restoration",
    description: "Oxidation and yellowing wet-sanded and polished away, then UV-sealed.",
    priceFrom: 109,
    duration: "+ 1 hr",
  },
  {
    name: "Odour treatment",
    description: "Source removal and ozone-free neutralisation — fragrance-free on request.",
    priceFrom: 69,
    duration: "+ 45 min",
  },
  {
    name: "Pet hair removal",
    description: "Woven-in hair lifted from carpets, boot liners and seat fabrics by hand.",
    priceFrom: 59,
    duration: "+ 1 hr",
  },
];
