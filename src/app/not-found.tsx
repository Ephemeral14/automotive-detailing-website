import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80dvh] items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,rgba(198,167,107,0.12),transparent_60%)]"
      />
      <div className="container-site pt-32 pb-24">
        <p className="eyebrow text-champagne">Error 404</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-xl text-balance">
          This road leads <em className="text-champagne italic">nowhere</em>.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ash">
          The page you were looking for has moved or never existed. Let us take you somewhere better.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/" arrow>
            Return home
          </ButtonLink>
          <ButtonLink href="/services" variant="outline">
            View services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
