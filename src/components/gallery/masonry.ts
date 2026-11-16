import type { GalleryItem } from "@/types";

/**
 * Gapless masonry placement for the gallery grid.
 *
 * The grid's row unit is one third of a column's width, so a landscape frame
 * spans 2 units (≈ 3:2) and a portrait frame 4 units (≈ 3:4). Items are
 * dealt, in reading order, to the shortest column; the columns are then
 * evened out by stretching or trimming a few frames within tasteful crop
 * limits so every filtered set ends on a clean, level bottom edge.
 */

export type Placement = { column: number; row: number; span: number };

type Orientation = GalleryItem["orientation"];

const NATURAL: Record<Orientation, number> = { landscape: 2, portrait: 4 };
/** Allowed spans — landscape from 3:2 to square, portrait from square to 3:5. */
const LIMITS: Record<Orientation, [min: number, max: number]> = {
  landscape: [2, 3],
  portrait: [3, 5],
};

export function computeMasonry(items: Pick<GalleryItem, "orientation">[], columns: number): Placement[] {
  const cols = Math.max(1, Math.floor(columns));
  const stacks: number[][] = Array.from({ length: cols }, () => []);
  const heights = new Array<number>(cols).fill(0);
  const spans = items.map((item) => NATURAL[item.orientation]);

  // 1. Deal items to the shortest column (leftmost on ties) — keeps reading order row-wise.
  items.forEach((_, i) => {
    let target = 0;
    for (let c = 1; c < cols; c++) if (heights[c] < heights[target]) target = c;
    stacks[target].push(i);
    heights[target] += spans[i];
  });

  // 2. Level the columns if a common height is reachable within the crop limits.
  if (cols > 1 && stacks.every((stack) => stack.length > 0)) {
    const ranges = stacks.map((stack) =>
      stack.reduce(
        ([lo, hi], i) => [lo + LIMITS[items[i].orientation][0], hi + LIMITS[items[i].orientation][1]],
        [0, 0],
      ),
    );
    const low = Math.max(...ranges.map(([lo]) => lo));
    const high = Math.min(...ranges.map(([, hi]) => hi));
    if (low <= high) {
      const mean = heights.reduce((sum, h) => sum + h, 0) / cols;
      const level = Math.min(high, Math.max(low, Math.round(mean)));
      stacks.forEach((stack, c) => {
        let delta = level - heights[c];
        // Spread the adjustment from the bottom of the column upwards.
        while (delta !== 0) {
          let changed = false;
          for (let k = stack.length - 1; k >= 0 && delta !== 0; k--) {
            const i = stack[k];
            const [min, max] = LIMITS[items[i].orientation];
            if (delta > 0 && spans[i] < max) {
              spans[i] += 1;
              delta -= 1;
              changed = true;
            } else if (delta < 0 && spans[i] > min) {
              spans[i] -= 1;
              delta += 1;
              changed = true;
            }
          }
          if (!changed) break;
        }
      });
    }
  }

  // 3. Stack each column from the top.
  const placements = new Array<Placement>(items.length);
  stacks.forEach((stack, column) => {
    let row = 0;
    for (const i of stack) {
      placements[i] = { column, row, span: spans[i] };
      row += spans[i];
    }
  });
  return placements;
}
