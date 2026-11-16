"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before the animation starts — use for subtle staggering. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  as?: "div" | "li" | "article" | "section" | "figure";
} & Omit<HTMLMotionProps<"div">, "children" | "className" | "initial" | "whileInView">;

/**
 * Fades content up into view once as it enters the viewport.
 * Transform motion is disabled automatically for users who prefer
 * reduced motion (see <MotionConfig reducedMotion="user"> in Providers).
 */
export function Reveal({ children, className, delay = 0, y = 28, as = "div", ...rest }: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
