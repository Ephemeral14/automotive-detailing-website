import type { ReactNode } from "react";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared styling for text inputs, selects and textareas on the dark UI. */
export function controlClasses(invalid: boolean, className?: string) {
  return cn(
    "block w-full min-h-14 rounded-none border border-hairline-strong border-b-ivory/45 bg-graphite px-4 text-[0.95rem] text-ivory",
    "placeholder:text-smoke transition-[border-color,background-color] duration-500 ease-luxe",
    "hover:border-b-ivory/70 hover:bg-onyx focus:border-b-champagne focus:bg-onyx",
    invalid && "border-danger/45 border-b-danger hover:border-b-danger focus:border-b-danger",
    className,
  );
}

/** Builds the `aria-describedby` list for a field. */
export function describedBy(id: string, { hint, error, extra }: { hint?: boolean; error?: boolean; extra?: string }) {
  const ids = [error ? `${id}-error` : hint ? `${id}-hint` : null, extra ?? null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  /** Rendered at the right of the label row (e.g. a character count). */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * Label + control + hint/error. Labels are always visible; the hint is
 * replaced by the error message when the field is invalid. The error uses
 * role="alert" so it is announced the moment it appears.
 */
export function FormField({ id, label, required, hint, error, aside, className, children }: FormFieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.6875rem] font-semibold tracking-[0.2em] text-ivory/90 uppercase">
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-1.5 text-champagne">
              *
            </span>
          ) : (
            <span className="ml-2 font-normal tracking-[0.08em] text-smoke normal-case">(optional)</span>
          )}
        </label>
        {aside}
      </div>
      <div className="relative mt-3">{children}</div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2.5 flex items-start gap-2 text-[0.8125rem] leading-relaxed text-danger">
          <CircleX aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2.5 text-[0.8125rem] leading-relaxed text-smoke">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Editorial fieldset legend: index, gold rule and label. */
export function Legend({ index, children }: { index: string; children: ReactNode }) {
  return (
    <legend className="eyebrow flex w-full items-center gap-4 border-b border-hairline pb-5 text-champagne">
      <span className="text-ash tabular-nums">{index}</span>
      <span aria-hidden="true" className="gold-rule w-8" />
      <span>{children}</span>
    </legend>
  );
}
