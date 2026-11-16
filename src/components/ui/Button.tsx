import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 whitespace-nowrap font-semibold uppercase " +
  "tracking-[0.22em] transition-[background-color,border-color,color,box-shadow] duration-500 ease-luxe " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-champagne text-noir hover:bg-champagne-light hover:shadow-[0_0_0_1px_rgba(198,167,107,0.35),0_18px_40px_-18px_rgba(198,167,107,0.55)]",
  outline:
    "border border-ivory/25 text-ivory hover:border-champagne hover:text-champagne bg-noir/10 backdrop-blur-[2px]",
  ghost: "text-ivory hover:text-champagne px-0! h-auto!",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-5 text-[0.6875rem]",
  md: "h-12 px-7 text-[0.7rem] sm:h-[3.25rem] sm:px-8",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-3.5 shrink-0 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
      strokeWidth={1.75}
    />
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Append an animated arrow icon. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonLinkProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">;

/** Navigational call-to-action rendered as a Next.js `<Link>`. */
export function ButtonLink({
  variant,
  size,
  arrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

type ExternalButtonLinkProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;

/** CTA for `tel:`, `mailto:` and external URLs. */
export function ExternalButtonLink({
  variant,
  size,
  arrow = false,
  className,
  children,
  ...props
}: ExternalButtonLinkProps) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...props}>
      <span className="inline-flex items-center gap-3">{children}</span>
      {arrow ? <Arrow /> : null}
    </a>
  );
}

type ButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

/** Action button (forms, toggles). */
export function Button({
  variant,
  size,
  arrow = false,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
      <span className="inline-flex items-center gap-3">{children}</span>
      {arrow ? <Arrow /> : null}
    </button>
  );
}

/** Understated inline text link with an animated underline. */
export function TextLink({
  className,
  children,
  arrow = true,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof Link>, "children"> & {
  children: ReactNode;
  arrow?: boolean;
}) {
  return (
    <Link
      className={cn(
        "group/link inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ivory",
        "transition-colors duration-500 ease-luxe hover:text-champagne",
        className,
      )}
      {...props}
    >
      <span className="relative pb-1">
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-[0.35] bg-champagne transition-transform duration-700 ease-luxe group-hover/link:scale-x-100"
        />
      </span>
      {arrow ? (
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="size-3.5 -translate-y-0.5 transition-transform duration-500 ease-luxe group-hover/link:translate-x-1"
        />
      ) : null}
    </Link>
  );
}
