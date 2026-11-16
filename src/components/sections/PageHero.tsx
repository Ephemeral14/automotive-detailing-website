import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/types";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image: Photo;
  /** CSS object-position for the background photo, e.g. "50% 60%". */
  imagePosition?: string;
  /**
   * Which side the copy sits on from `lg` up. Use "right" when the photo's
   * subject fills the left of the frame. (Mobile is always left-aligned.)
   */
  contentAlign?: "left" | "right";
  children?: ReactNode;
  className?: string;
};

/**
 * Cinematic header for interior pages. The photo is the LCP element,
 * so it loads eagerly at high fetch priority (recommended over `preload`).
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imagePosition = "50% 50%",
  contentAlign = "left",
  children,
  className,
}: PageHeroProps) {
  const right = contentAlign === "right";
  return (
    <section
      className={cn(
        "grain relative isolate flex min-h-[34rem] items-end overflow-hidden border-b border-hairline sm:min-h-[38rem] lg:min-h-[44rem]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        placeholder="blur"
        quality={75}
        className="-z-20 object-cover"
        style={{ objectPosition: imagePosition }}
      />
      {/* Legibility veils */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-noir via-noir/55 to-noir/30" />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 from-noir/85 via-noir/30 to-transparent",
          right ? "bg-gradient-to-r lg:bg-gradient-to-l" : "bg-gradient-to-r",
        )}
      />

      <div
        className={cn(
          "container-site w-full pt-36 pb-16 sm:pb-20 lg:pb-24",
          right && "lg:flex lg:justify-end",
        )}
      >
        <div className={cn(right && "lg:w-1/2 lg:pl-8")}>
        <p className="eyebrow flex items-center gap-4 text-champagne">
          <span aria-hidden="true" className="gold-rule w-10" />
          {eyebrow}
        </p>
        <h1 className="mt-7 max-w-4xl font-display text-display-xl text-balance text-ivory [&_em]:text-champagne [&_em]:italic">
          {title}
        </h1>
        {description ? (
          <div className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-ivory/75 sm:text-lg">
            {description}
          </div>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
