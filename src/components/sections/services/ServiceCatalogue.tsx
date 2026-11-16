"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Service, ServiceCategory } from "@/types";
import { serviceCategories, services } from "@/data/services";
import { cn, pad } from "@/lib/utils";
import { ServiceEntry } from "./ServiceEntry";

type FilterId = ServiceCategory | "all";

const ease = [0.22, 1, 0.36, 1] as const;
const total = services.length;

const matches = (service: Service, filter: FilterId) =>
  filter === "all" || service.categories.includes(filter);

const counts = Object.fromEntries(
  serviceCategories.map((c) => [c.id, services.filter((s) => matches(s, c.id)).length]),
) as Record<FilterId, number>;

/**
 * Category filter + contents index + the full editorial catalogue.
 * Filtering cross-fades the list; every visible service keeps its stable
 * catalogue number, and image sides alternate by visible position.
 *
 * Anchor links (/services#<slug>) always land: if the target is hidden by
 * the current filter, the filter resets to "All" and the page scrolls to it
 * once the full list has mounted.
 */
export function ServiceCatalogue({ intro }: { intro: ReactNode }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const filterRef = useRef<FilterId>(filter);
  const pendingScroll = useRef<string | null>(null);

  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  // A filter is a view setting for this visit only. Reset it when the route
  // is hidden (Activity) so arriving later via /services#slug always finds
  // its target.
  useLayoutEffect(
    () => () => {
      pendingScroll.current = null;
      setFilter("all");
    },
    [],
  );

  // Same-page hash links (footer, contents) or back/forward to a hidden service.
  useEffect(() => {
    const reveal = (slug: string) => {
      const service = services.find((s) => s.slug === slug);
      if (!service || matches(service, filterRef.current)) return;
      pendingScroll.current = slug;
      setFilter("all");
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      reveal(decodeURIComponent(url.hash.slice(1)));
    };
    const onHistory = () => {
      if (window.location.hash) reveal(decodeURIComponent(window.location.hash.slice(1)));
    };

    // Capture phase: runs before Next's <Link> handler performs its scroll.
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHistory);
    window.addEventListener("popstate", onHistory);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHistory);
      window.removeEventListener("popstate", onHistory);
    };
  }, []);

  const scrollToPending = () => {
    const slug = pendingScroll.current;
    if (!slug) return;
    pendingScroll.current = null;
    requestAnimationFrame(() => document.getElementById(slug)?.scrollIntoView({ block: "start" }));
  };

  const visible = services.filter((s) => matches(s, filter));
  const activeLabel = serviceCategories.find((c) => c.id === filter)?.label ?? "";

  return (
    <>
      <div className="container-site section-y-sm">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-14 xl:gap-x-20">
          <div className="lg:col-span-5">{intro}</div>

          <div className="lg:col-span-7 lg:pt-2 xl:col-span-6 xl:col-start-7">
            <p id="service-filter-label" className="eyebrow text-ash">
              Filter by category
            </p>
            <div
              role="group"
              aria-labelledby="service-filter-label"
              className="mt-5 flex flex-wrap gap-2"
            >
              {serviceCategories.map((category) => {
                const active = category.id === filter;
                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={active}
                    aria-controls="service-list service-contents"
                    onClick={() => setFilter(category.id)}
                    className={cn(
                      "inline-flex h-11 items-center gap-2.5 border px-4 text-[0.68rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ease-luxe",
                      active
                        ? "border-champagne bg-champagne/10 text-ivory"
                        : "border-hairline-strong text-ash hover:border-ivory/40 hover:text-ivory",
                    )}
                  >
                    {category.label}
                    <span
                      aria-hidden="true"
                      className={cn("tabular-nums", active ? "text-champagne" : "text-smoke")}
                    >
                      {pad(counts[category.id])}
                    </span>
                    <span className="sr-only">({counts[category.id]} services)</span>
                  </button>
                );
              })}
            </div>

            <p role="status" aria-live="polite" className="mt-6 text-sm text-smoke">
              Showing <span className="text-ivory tabular-nums">{visible.length}</span>{" "}
              {visible.length === 1 ? "service" : "services"}
              {filter === "all" ? "" : ` in ${activeLabel}`}
            </p>

            <nav aria-label="Services on this page" className="mt-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.ol
                  key={filter}
                  id="service-contents"
                  className="border-t border-hairline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.45, ease } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {visible.map((service, i) => (
                    <motion.li
                      key={service.slug}
                      className="border-b border-hairline"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease, delay: i * 0.04 } }}
                    >
                      <Link
                        href={`#${service.slug}`}
                        className="group/toc flex min-h-14 items-center gap-5 py-3 sm:gap-6"
                      >
                        <span className="w-6 shrink-0 text-[0.65rem] font-semibold tracking-[0.2em] text-smoke tabular-nums">
                          {pad(services.indexOf(service) + 1)}
                        </span>
                        <span className="flex-1 font-display text-xl leading-tight text-ivory transition-colors duration-500 group-hover/toc:text-champagne sm:text-[1.375rem]">
                          {service.name}
                        </span>
                        <span className="hidden text-[0.62rem] font-semibold tracking-[0.22em] text-smoke uppercase sm:inline">
                          {service.kicker}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-px w-5 shrink-0 bg-hairline-strong transition-all duration-700 ease-luxe group-hover/toc:w-9 group-hover/toc:bg-champagne"
                        />
                      </Link>
                    </motion.li>
                  ))}
                </motion.ol>
              </AnimatePresence>
            </nav>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <CatalogueList key={filter} items={visible} onMounted={scrollToPending} />
      </AnimatePresence>
    </>
  );
}

function CatalogueList({ items, onMounted }: { items: Service[]; onMounted: () => void }) {
  const onMountedRef = useRef(onMounted);
  useLayoutEffect(() => {
    onMountedRef.current = onMounted;
  });
  useEffect(() => {
    onMountedRef.current();
  }, []);

  return (
    <motion.ol
      id="service-list"
      aria-label="Service catalogue"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6, ease } }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      {items.map((service, i) => (
        <motion.li
          key={service.slug}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: Math.min(i, 2) * 0.1 } }}
        >
          <ServiceEntry
            service={service}
            number={services.indexOf(service) + 1}
            total={total}
            flipped={i % 2 === 1}
          />
        </motion.li>
      ))}
    </motion.ol>
  );
}
