import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { photos } from "@/data/images";
import { DemoNote } from "@/components/ui/DemoNote";
import { pageSocial } from "@/lib/seo";

const description =
  "Credits for the Unsplash photography, typefaces and icons used on the Noir Auto Studio portfolio website.";

export const metadata: Metadata = {
  title: "Photo Credits",
  description,
  alternates: { canonical: "/credits" },
  ...pageSocial({ title: "Photo Credits — Noir Auto Studio", description, path: "/credits" }),
};

const uniquePhotos = Object.values(photos).filter(
  (photo, index, all) => all.findIndex((p) => p.credit.url === photo.credit.url) === index,
);

const resources = [
  { name: "Instrument Serif", detail: "Display typeface · SIL Open Font License", href: "https://fonts.google.com/specimen/Instrument+Serif" },
  { name: "Manrope", detail: "Text typeface · SIL Open Font License", href: "https://fonts.google.com/specimen/Manrope" },
  { name: "Lucide", detail: "Icon set · ISC License", href: "https://lucide.dev" },
];

export default function CreditsPage() {
  return (
    <>
      <section aria-labelledby="credits-title" className="border-b border-hairline">
        <div className="container-site pt-40 pb-16 sm:pt-48 sm:pb-20">
          <p className="eyebrow flex items-center gap-4 text-champagne">
            <span aria-hidden="true" className="gold-rule w-10" />
            Credits
          </p>
          <h1 id="credits-title" className="mt-7 max-w-3xl font-display text-display-lg text-balance">
            With thanks to the <em className="text-champagne italic">photographers</em>.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ash sm:text-lg">
            Noir Auto Studio is a fictional brand created for a web-development portfolio. All photography is
            used under the{" "}
            <a
              href="https://unsplash.com/license"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ivory underline decoration-champagne decoration-1 underline-offset-4 hover:text-champagne"
            >
              Unsplash License<span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            and is illustrative — it does not depict work carried out by a real studio.
          </p>
        </div>
      </section>

      <section aria-labelledby="photo-list" className="section-y-sm">
        <div className="container-site">
          <h2 id="photo-list" className="eyebrow text-champagne">
            Photography · {uniquePhotos.length} images
          </h2>
          <ul className="mt-8 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {uniquePhotos.map((photo) => (
              <li key={photo.credit.url} className="flex gap-5 bg-noir p-5">
                <div className="relative size-20 shrink-0 overflow-hidden bg-onyx">
                  <Image src={photo.src} alt="" fill sizes="80px" quality={60} className="object-cover" />
                </div>
                <div className="min-w-0 text-sm">
                  <p className="line-clamp-2 leading-snug text-ash">{photo.alt}</p>
                  <a
                    href={photo.credit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 py-1 text-ivory transition-colors hover:text-champagne"
                  >
                    {photo.credit.photographer}
                    <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
                    <span className="sr-only"> on Unsplash (opens in a new tab)</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="mt-20 eyebrow text-champagne">Typefaces &amp; icons</h2>
          <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
            {resources.map((r) => (
              <li key={r.name} className="flex flex-wrap items-baseline justify-between gap-3 py-5">
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-2xl text-ivory transition-colors hover:text-champagne"
                >
                  {r.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <span className="text-sm text-ash">{r.detail}</span>
              </li>
            ))}
          </ul>

          <DemoNote className="mt-10">
            Brand names visible on photographed vehicles belong to their respective owners and do not imply any
            affiliation with this fictional studio.
          </DemoNote>
        </div>
      </section>
    </>
  );
}
