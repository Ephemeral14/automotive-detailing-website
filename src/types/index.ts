import type { StaticImageData } from "next/image";

/** A locally-stored, Unsplash-licensed photograph with its credit. */
export type Photo = {
  src: StaticImageData;
  alt: string;
  credit: {
    photographer: string;
    url: string;
  };
};

export type ServiceCategory = "exterior" | "interior" | "paint-protection" | "care";

export type Service = {
  slug: string;
  name: string;
  /** Short label for numbering / overlines, e.g. "Exterior". */
  kicker: string;
  categories: ServiceCategory[];
  /** One-line summary used on cards. */
  summary: string;
  /** Longer editorial description used on the services page. */
  description: string;
  included: string[];
  /** Fictional, illustrative estimate, e.g. "3 – 4 hours". */
  duration: string;
  /** Fictional, illustrative starting price in USD. */
  priceFrom: number;
  image: Photo;
  /** Shown on the home page services preview. */
  featured: boolean;
};

export type PricingPlan = {
  id: "essential" | "signature" | "ultimate";
  name: string;
  price: number;
  tagline: string;
  idealFor: string;
  duration: string;
  features: string[];
  recommended: boolean;
};

export type GalleryCategory =
  | "exterior"
  | "interior"
  | "ceramic-coating"
  | "paint-correction"
  | "luxury-vehicles";

export type GalleryItem = Photo & {
  id: string;
  title: string;
  category: GalleryCategory;
  orientation: "landscape" | "portrait";
};

export type Testimonial = {
  id: string;
  quote: string;
  /** Fictional persona — clearly presented as demonstration content. */
  persona: string;
  vehicle: string;
  service: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
