import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose class names and resolve Tailwind conflicts
 * (later classes win: `cn("px-4", "px-6")` → `"px-6"`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a whole-dollar amount, e.g. 1450 → "$1,450". */
export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Zero-padded index used in editorial numbering, e.g. 3 → "03". */
export function pad(index: number, length = 2) {
  return String(index).padStart(length, "0");
}
