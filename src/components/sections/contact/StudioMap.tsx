import { cn } from "@/lib/utils";

const minor = "rgb(255 255 255 / 0.065)";
const major = "rgb(255 255 255 / 0.14)";

/**
 * Stylised, fully static map placeholder (inline SVG — no external map
 * embed, tiles or requests). The location is fictional.
 */
export function StudioMap({ className }: { className?: string }) {
  return (
    <figure className={cn("relative isolate aspect-[4/3] overflow-hidden border border-hairline bg-[#0c0c0c]", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 480 360"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 -z-10 size-full"
        fill="none"
      >
        {/* Park and city blocks */}
        <path d="M300 34 L420 22 L436 118 L318 132 Z" fill="rgb(255 255 255 / 0.028)" />
        <path d="M40 236 L150 226 L158 300 L46 312 Z" fill="rgb(255 255 255 / 0.02)" />

        {/* River */}
        <path
          d="M-20 300 C 70 270, 120 330, 210 312 S 360 250, 500 286"
          stroke="rgb(255 255 255 / 0.045)"
          strokeWidth="26"
          strokeLinecap="round"
        />

        {/* Minor street grid, slightly rotated for character */}
        <g transform="rotate(-9 240 180)" stroke={minor} strokeWidth="1">
          {[-40, 10, 58, 104, 150, 198, 246, 292, 338, 386, 432, 480, 526].map((x) => (
            <line key={`v${x}`} x1={x} y1="-60" x2={x} y2="420" />
          ))}
          {[-20, 26, 70, 118, 164, 212, 258, 306, 352, 398].map((y) => (
            <line key={`h${y}`} x1="-60" y1={y} x2="540" y2={y} />
          ))}
        </g>

        {/* Major roads */}
        <g stroke={major} strokeWidth="2.25" strokeLinecap="round">
          <path d="M-20 92 L 500 214" />
          <path d="M168 -20 C 190 110, 200 220, 176 380" />
          <path d="M360 -20 C 340 90, 380 210, 420 380" />
        </g>
        <path d="M-20 196 C 120 168, 300 150, 500 120" stroke="rgb(255 255 255 / 0.1)" strokeWidth="1.5" />

        {/* Route to the studio */}
        <path
          d="M176 380 C 184 300, 214 236, 250 172"
          stroke="var(--color-champagne)"
          strokeOpacity="0.55"
          strokeWidth="1.25"
          strokeDasharray="3 5"
        />
      </svg>

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_52%_47%,transparent_0%,transparent_35%,rgba(9,9,9,0.85)_100%)]"
      />

      {/* North marker */}
      <div aria-hidden="true" className="absolute top-4 right-4 flex flex-col items-center gap-1 text-[0.6rem] font-semibold tracking-[0.2em] text-ash">
        <span>N</span>
        <span className="block h-5 w-px bg-gradient-to-b from-ash to-transparent" />
      </div>

      {/* Pin */}
      <div aria-hidden="true" className="absolute top-[47%] left-[52%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute -inset-3 rounded-full border border-champagne/40 motion-safe:animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <span className="relative block size-3 rounded-full bg-champagne shadow-[0_0_0_5px_rgba(198,167,107,0.18)]" />
        <span className="absolute top-1/2 left-6 -translate-y-1/2 border border-hairline-strong bg-noir/85 px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.2em] whitespace-nowrap text-ivory uppercase backdrop-blur-sm">
          Noir Studio
        </span>
      </div>

      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir/90 to-transparent px-4 pt-10 pb-4 text-[0.6875rem] font-semibold tracking-[0.18em] text-ash uppercase">
        Map placeholder — fictional location
      </figcaption>
    </figure>
  );
}
