import type { GalleryCategory, GalleryItem } from "@/types";
import { photos, type PhotoKey } from "@/data/images";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "ceramic-coating", label: "Ceramic Coating" },
  { id: "paint-correction", label: "Paint Correction" },
  { id: "luxury-vehicles", label: "Luxury Vehicles" },
];

type Entry = [key: PhotoKey, title: string, category: GalleryCategory];

/**
 * Curated gallery. Photography is illustrative (Unsplash-licensed) and does
 * not depict work performed by a real studio.
 * Order is the "All" view order — categories are interleaved for rhythm.
 */
const entries: Entry[] = [
  ["galLuxury01", "Grand tourer after a night detail", "luxury-vehicles"],
  ["galExterior02", "Rear quarter, gloss black", "exterior"],
  ["galCeramic03", "Hydrophobic beading on a coated bonnet", "ceramic-coating"],
  ["galInterior01", "Quilted leather cabin, restored", "interior"],
  ["galCorrection02", "Refining around the headlight", "paint-correction"],
  ["galExterior01", "Mirror finish on a classic fender", "exterior"],
  ["galLuxury02", "Mid-engine coupé, underground garage", "luxury-vehicles"],
  ["galInterior02", "Cognac leather, cleaned and nourished", "interior"],
  ["galCeramic02", "Rain beading on a vintage hood", "ceramic-coating"],
  ["galCorrection01", "Machine polishing, final stage", "paint-correction"],
  ["galLuxury03", "Hypercar under studio light", "luxury-vehicles"],
  ["galExterior04", "Machined alloy wheels", "exterior"],
  ["galInterior03", "Diamond quilting, copper stitching", "interior"],
  ["galCeramic01", "Coated paint, tight water beads", "ceramic-coating"],
  ["galLuxury04", "Carbon widebody at night", "luxury-vehicles"],
  ["galCorrection03", "Compounding with masked edges", "paint-correction"],
  ["galExterior03", "Freshly washed door detail", "exterior"],
  ["galInterior04", "Steering wheel and vents", "interior"],
  ["galLuxury05", "Classic saloon, amber glow", "luxury-vehicles"],
  ["galCeramic04", "Beading across glass and door", "ceramic-coating"],
  ["galExterior05", "Projector headlight in deep gloss", "exterior"],
  ["galInterior05", "Sport seat bolster, conditioned", "interior"],
  ["galLuxury06", "Executive saloon in the studio", "luxury-vehicles"],
];

export const galleryItems: GalleryItem[] = entries.map(([key, title, category]) => {
  const photo = photos[key];
  return {
    ...photo,
    id: key,
    title,
    category,
    orientation: photo.src.height > photo.src.width ? "portrait" : "landscape",
  };
});

/** Six strong frames for the home page "featured work" mosaic. */
export const featuredGallery: GalleryItem[] = [
  "galLuxury01",
  "galCorrection03",
  "galInterior01",
  "galCeramic03",
  "galExterior02",
  "galLuxury05",
].map((id) => {
  const item = galleryItems.find((g) => g.id === id);
  if (!item) throw new Error(`Unknown featured gallery item: ${id}`);
  return item;
});
