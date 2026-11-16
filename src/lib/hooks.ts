"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

/**
 * Lock page scroll while `active` is true. Uses a counter so that
 * nested overlays (e.g. menu + lightbox) don't release each other's lock.
 * The lock lives on <html data-scroll-locked>, styled in globals.css.
 */
let lockCount = 0;

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    lockCount += 1;
    root.dataset.scrollLocked = "";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    return () => {
      lockCount -= 1;
      if (lockCount <= 0) {
        lockCount = 0;
        delete root.dataset.scrollLocked;
        root.style.paddingRight = "";
      }
    };
  }, [active]);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keep keyboard focus inside `containerRef` while `active`,
 * close on Escape, and restore focus to the previously-focused
 * element when deactivated.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  onEscape: () => void,
) {
  const onEscapeRef = useRef(onEscape);
  useLayoutEffect(() => {
    onEscapeRef.current = onEscape;
  });

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    // Move focus inside on open.
    const initial = container.querySelector<HTMLElement>("[data-autofocus]") ?? focusables()[0];
    initial?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [active, containerRef]);
}
