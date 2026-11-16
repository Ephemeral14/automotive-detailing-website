import type { Service, ServiceCategory } from "@/types";
import { photos } from "@/data/images";

/**
 * Service catalogue. All durations and prices are fictional, illustrative
 * estimates for a portfolio project — not real offers.
 */
export const services: Service[] = [
  {
    slug: "exterior-detailing",
    name: "Exterior Detailing",
    kicker: "Exterior",
    categories: ["exterior"],
    summary: "A meticulous, swirl-safe wash and finish that restores depth, clarity and slickness to every exterior surface.",
    description:
      "Every exterior begins with a pH-neutral snow foam pre-soak to lift grit before a single mitt touches the paint. We then hand-wash using the two-bucket method, decontaminate wheels and arches, and finish with a protective sealant for a deep, glass-like sheen. Nothing is rushed and nothing is automated — the result is a finish that looks freshly delivered.",
    included: [
      "Snow foam pre-wash and contact-free rinse",
      "Two-bucket hand wash with plush microfiber mitts",
      "Wheel faces, barrels and arches deep-cleaned",
      "Iron and tar decontamination",
      "Filtered-air and microfiber drying",
      "Exterior glass polished streak-free",
      "Paint sealant and tyre dressing",
    ],
    duration: "3 – 4 hours",
    priceFrom: 149,
    image: photos.svcExterior,
    featured: true,
  },
  {
    slug: "interior-detailing",
    name: "Interior Detailing",
    kicker: "Interior",
    categories: ["interior"],
    summary: "A restorative treatment for leather, Alcantara and fine trims — clean, conditioned and quietly fresh.",
    description:
      "The cabin is where you spend your time, so we treat it with the care of a restoration workshop. Each surface is assessed before work begins: leather is cleaned with dedicated pH-balanced products and nourished, carpets and mats are extracted, and delicate trims, screens and piano-black panels are cleaned with soft brushes and lint-free cloths. The result is a cabin that feels — and smells — new.",
    included: [
      "Thorough vacuum including seat rails and vents",
      "Leather deep-clean and conditioning",
      "Alcantara and fabric gentle-agitation cleaning",
      "Carpet and mat hot-water extraction",
      "Dashboard, console and screens detailed",
      "Door shuts and jambs cleaned",
      "Odour neutralisation (fragrance-free option)",
    ],
    duration: "3 – 5 hours",
    priceFrom: 179,
    image: photos.svcInterior,
    featured: true,
  },
  {
    slug: "full-detailing",
    name: "Full Detailing",
    kicker: "Inside & out",
    categories: ["exterior", "interior"],
    summary: "Our complete inside-and-out treatment — the definitive reset for a vehicle you want to fall in love with again.",
    description:
      "Full Detailing combines our exterior and interior programmes into a single, unhurried session. Paint is washed, decontaminated and enhanced; wheels, glass and trims are refined; and the cabin is restored surface by surface. It is the ideal starting point before a sale, after a long winter, or simply when you want the car returned to its best.",
    included: [
      "Complete Exterior Detailing programme",
      "Complete Interior Detailing programme",
      "Clay bar paint decontamination",
      "Single-stage gloss enhancement polish",
      "Engine bay light refresh",
      "Six-month paint sealant",
      "Final inspection under studio lighting",
    ],
    duration: "1 full day",
    priceFrom: 349,
    image: photos.svcFull,
    featured: false,
  },
  {
    slug: "paint-correction",
    name: "Paint Correction",
    kicker: "Refinement",
    categories: ["paint-protection"],
    summary: "Precision machine polishing that removes swirls, haze and fine scratches to reveal true depth and clarity.",
    description:
      "Paint correction is the craft at the heart of the studio. We measure paint thickness panel by panel, then use a calibrated sequence of compounds, polishes and pads to level the clear coat and remove defects — never taking more than the paint can safely give. Inspection lights replicate harsh sunlight so that what you see in the studio is exactly what you'll see on the road.",
    included: [
      "Paint depth readings on every panel",
      "Multi-stage decontamination",
      "Test-spot to determine the safest process",
      "One- or multi-step machine correction",
      "Refining polish for maximum gloss",
      "IPA panel wipe and inspection",
      "Protective sealant or coating-ready finish",
    ],
    duration: "1 – 3 days",
    priceFrom: 590,
    image: photos.svcCorrection,
    featured: true,
  },
  {
    slug: "ceramic-coating",
    name: "Ceramic Coating",
    kicker: "Protection",
    categories: ["paint-protection"],
    summary: "A hard, hydrophobic layer that locks in gloss and makes every future wash faster, safer and more satisfying.",
    description:
      "A professional-grade ceramic coating bonds with your clear coat to form a durable, glass-like shield against UV, road grime, bird lime and chemical etching. Because a coating amplifies whatever is beneath it, every application begins with paint correction. Coatings are cured in a controlled environment, and we take you through aftercare before handover.",
    included: [
      "Full decontamination and paint correction",
      "Panel preparation with a dedicated prep spray",
      "Multi-layer coating on paint",
      "Wheels, glass and trims coated",
      "Infrared-assisted curing",
      "Aftercare guidance and maintenance kit",
      "Complimentary first maintenance check",
    ],
    duration: "2 – 3 days",
    priceFrom: 990,
    image: photos.svcCeramic,
    featured: true,
  },
  {
    slug: "paint-protection-film",
    name: "Paint Protection Film",
    kicker: "Protection",
    categories: ["paint-protection"],
    summary: "Optically clear, self-healing film that shields high-impact areas from chips, scratches and road debris.",
    description:
      "Paint protection film is the most effective defence against stone chips and abrasion. We install premium, self-healing urethane film with wrapped edges wherever possible for an invisible finish. Choose from a front-end package covering the most vulnerable panels, track-focused coverage, or full-body protection for complete peace of mind.",
    included: [
      "Paint inspection and preparation",
      "Precision-cut patterns, hand-finished",
      "Wrapped edges where the panel allows",
      "Self-healing, optically clear film",
      "Gloss or satin finish options",
      "48-hour post-installation check",
      "Care guide for the first weeks",
    ],
    duration: "2 – 4 days",
    priceFrom: 1800,
    image: photos.svcPpf,
    featured: true,
  },
  {
    slug: "engine-bay-detailing",
    name: "Engine Bay Detailing",
    kicker: "Mechanical",
    categories: ["care"],
    summary: "A careful, low-moisture clean of the engine bay — dressed to a factory-fresh, satin finish.",
    description:
      "A clean engine bay reflects how a car has been looked after. We protect sensitive electronics, use low-pressure steam and dedicated degreasers to lift grime, and finish plastics and hoses with a non-greasy satin dressing. It's a detail that rewards owners at service time and makes a strong impression at the point of sale.",
    included: [
      "Electrical components safely masked",
      "Low-pressure steam and degreaser clean",
      "Soft-brush agitation in tight areas",
      "Compressed-air drying",
      "Plastics and hoses dressed to a satin finish",
      "Bonnet underside and seals cleaned",
    ],
    duration: "1.5 – 2 hours",
    priceFrom: 119,
    image: photos.svcEngine,
    featured: false,
  },
  {
    slug: "maintenance-detailing",
    name: "Maintenance Detailing",
    kicker: "Ongoing care",
    categories: ["care"],
    summary: "Scheduled care that keeps a corrected or coated finish looking its best, week after week.",
    description:
      "Once your vehicle has been corrected or protected, the right maintenance keeps it that way. Our maintenance sessions use coating-safe products and gentle techniques to remove everyday contamination before it can bond, while a quick interior refresh keeps the cabin immaculate. Sessions can be scheduled fortnightly, monthly or seasonally.",
    included: [
      "Coating-safe foam and hand wash",
      "Wheels and tyres cleaned and dressed",
      "Coating topper or sealant refresh",
      "Interior vacuum and wipe-down",
      "Glass cleaned inside and out",
      "Condition report with photos",
    ],
    duration: "2 – 3 hours",
    priceFrom: 89,
    image: photos.svcMaintenance,
    featured: true,
  },
];

export const serviceCategories: { id: ServiceCategory | "all"; label: string }[] = [
  { id: "all", label: "All services" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "paint-protection", label: "Paint & protection" },
  { id: "care", label: "Care & maintenance" },
];

/** The six services shown on the home page, in the order specified by the brief. */
export const featuredServices = [
  "exterior-detailing",
  "interior-detailing",
  "paint-correction",
  "ceramic-coating",
  "paint-protection-film",
  "maintenance-detailing",
].map((slug) => {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown featured service: ${slug}`);
  return service;
});
