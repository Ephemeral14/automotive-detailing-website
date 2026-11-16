import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Optional editorial index shown before the eyebrow, e.g. "01". */
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  as?: HeadingLevel;
  align?: "left" | "center";
  size?: "lg" | "md";
  className?: string;
  id?: string;
};

/**
 * Editorial section header: gold eyebrow, serif display title, muted lede.
 * Use `<em>` inside `title` for the champagne italic accent.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  size = "lg",
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow flex items-center gap-4 text-champagne",
            centered && "justify-center",
          )}
        >
          {index ? <span className="text-ash tabular-nums">{index}</span> : null}
          <span aria-hidden="true" className="gold-rule w-8" />
          <span>{eyebrow}</span>
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "mt-6 font-display text-balance text-ivory [&_em]:text-champagne [&_em]:italic",
          size === "lg" ? "text-display-lg" : "text-display-md",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <div
          className={cn(
            "mt-6 max-w-prose text-base leading-relaxed text-pretty text-ash sm:text-[1.0625rem]",
            centered && "mx-auto",
          )}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
}
