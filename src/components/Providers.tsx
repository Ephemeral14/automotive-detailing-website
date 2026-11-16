"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Global client providers. Motion respects the OS "reduce motion" setting. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
