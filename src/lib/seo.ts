import type { Metadata } from "next";
import { alt, contentType, size } from "@/app/opengraph-image";
import { siteConfig } from "@/lib/site";

/**
 * Page-level `openGraph` replaces the layout's `openGraph` wholesale (Next.js
 * merges metadata shallowly), which also drops the file-convention
 * `opengraph-image`. This helper re-states the shared fields and the existing
 * site-wide share card so every page ships complete Open Graph + Twitter tags.
 * Relative URLs resolve against `metadataBase` (see `siteConfig.url`).
 */
export function pageSocial({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}`;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const image = { url: "/opengraph-image", width: size.width, height: size.height, alt, type: contentType };
  return {
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt }] },
  };
}
