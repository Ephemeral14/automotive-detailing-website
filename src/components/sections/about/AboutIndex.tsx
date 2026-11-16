import { pad } from "@/lib/utils";
import { aboutSections } from "./content";

/** Numbered "on this page" index shown beneath the hero copy. */
export function AboutIndex() {
  return (
    <nav aria-label="On this page" className="max-w-3xl border-t border-ivory/15 pt-4">
      <ol className="flex flex-wrap gap-x-7 gap-y-0 sm:gap-x-9">
        {aboutSections.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="group/idx inline-flex min-h-11 items-center gap-2.5 text-[0.66rem] font-semibold tracking-[0.24em] text-ivory/75 uppercase transition-colors duration-500 ease-luxe hover:text-ivory"
            >
              <span className="text-champagne tabular-nums">{pad(i + 1)}</span>
              <span className="relative pb-0.5">
                {section.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-luxe group-hover/idx:scale-x-100"
                />
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
