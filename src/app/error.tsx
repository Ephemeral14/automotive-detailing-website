"use client";

import { RotateCcw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";

/** Route-level error boundary with a retry action. */
export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <section className="flex min-h-[80dvh] items-center">
      <div className="container-site pt-32 pb-24">
        <p className="eyebrow text-champagne">Something went wrong</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg text-balance">
          We couldn&rsquo;t load this page.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ash">
          A temporary problem interrupted the page. Please try again — if it persists, return to the home page.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button onClick={() => retry()}>
            <RotateCcw aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
            Try again
          </Button>
          <ButtonLink href="/" variant="outline">
            Return home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
