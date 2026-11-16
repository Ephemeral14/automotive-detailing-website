import { galleryCategories } from "@/data/gallery";
import type { GalleryCategory } from "@/types";

export const categoryLabels = Object.fromEntries(
  galleryCategories.map((category) => [category.id, category.label]),
) as Record<GalleryCategory, string>;
