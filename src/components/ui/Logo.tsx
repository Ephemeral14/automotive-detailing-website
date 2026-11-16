import Link from "next/link";
import { cn } from "@/lib/utils";

/** Monogram mark — a fine champagne frame around a serif "N". */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-9", className)}>
      <rect x="0.75" y="0.75" width="38.5" height="38.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M12 29V11l16 18V11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

/** Wordmark: NOIR / AUTO STUDIO. Links home. */
export function Logo({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn("group/logo inline-flex items-center gap-3.5 text-ivory", className)}
    >
      <LogoMark className="text-champagne transition-colors duration-500 group-hover/logo:text-champagne-light" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.05rem] font-semibold tracking-[0.42em]">NOIR</span>{" "}
        <span className="mt-1.5 text-[0.56rem] font-medium tracking-[0.46em] text-ash">AUTO STUDIO</span>
        <span className="sr-only"> — home</span>
      </span>
    </Link>
  );
}
