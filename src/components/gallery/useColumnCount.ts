"use client";

import { useSyncExternalStore } from "react";

/** Mirrors the grid's Tailwind breakpoints: 1 column, 2 from `sm`, 3 from `lg`. */
const LG = "(min-width: 64rem)";
const SM = "(min-width: 40rem)";

function subscribe(onChange: () => void) {
  const lists = [window.matchMedia(LG), window.matchMedia(SM)];
  lists.forEach((list) => list.addEventListener("change", onChange));
  return () => lists.forEach((list) => list.removeEventListener("change", onChange));
}

function getSnapshot() {
  if (window.matchMedia(LG).matches) return 3;
  if (window.matchMedia(SM).matches) return 2;
  return 1;
}

/** Unknown on the server — the grid falls back to CSS auto-placement. */
function getServerSnapshot() {
  return 0;
}

export function useColumnCount() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
