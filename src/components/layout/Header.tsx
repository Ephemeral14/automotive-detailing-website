"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { bookingHref, contactInfo, mainNav, openingHours } from "@/lib/site";
import { useFocusTrap, useScrollLock } from "@/lib/hooks";
import { cn, pad } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  // Menu "belongs" to the path it was opened on — any navigation closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const closeMenu = () => setMenuPath(null);

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      // Tuck the bar away when scrolling down, reveal on the way up.
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 480);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // The trap spans the header bar (close button) and the menu panel.
  const trapRef = useRef<HTMLDivElement>(null);
  useScrollLock(menuOpen);
  useFocusTrap(trapRef, menuOpen, closeMenu);

  return (
    <div
      ref={trapRef}
      // While open, the bar + panel together form the modal dialog so the
      // close button in the bar stays reachable for assistive tech.
      {...(menuOpen ? { role: "dialog", "aria-modal": true, "aria-label": "Site menu" } : {})}
    >
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-700 ease-luxe",
          "border-b",
          scrolled || menuOpen
            ? "border-hairline bg-noir/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-gradient-to-b from-noir/70 to-transparent",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div className="container-site flex h-20 items-center justify-between gap-6 lg:h-24">
          <Logo onNavigate={closeMenu} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-10 xl:gap-12">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group/nav relative py-2 text-[0.7rem] font-semibold uppercase tracking-[0.26em] transition-colors duration-500",
                        active ? "text-ivory" : "text-ash hover:text-ivory",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 mx-auto h-px bg-champagne transition-all duration-700 ease-luxe",
                          active ? "w-full opacity-100" : "w-0 opacity-0 group-hover/nav:w-full group-hover/nav:opacity-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href={contactInfo.phoneHref}
              className="hidden items-center gap-2 py-3 text-xs tracking-[0.12em] text-ash transition-colors hover:text-champagne xl:inline-flex"
            >
              <Phone aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
              <span>{contactInfo.phoneDisplay}</span>
              <span className="sr-only">(placeholder demo number)</span>
            </a>
            <ButtonLink href={bookingHref} size="sm" className="hidden sm:inline-flex">
              Book now
            </ButtonLink>
            <button
              type="button"
              onClick={() => (menuOpen ? closeMenu() : setMenuPath(pathname))}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-autofocus
              className="relative -mr-2 inline-flex size-11 items-center justify-center text-ivory transition-colors hover:text-champagne lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" strokeWidth={1.25} className="size-6" />
              ) : (
                <Menu aria-hidden="true" strokeWidth={1.25} className="size-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-noir/97 pt-20 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <nav aria-label="Mobile" className="container-site flex-1 py-10">
              <ul className="border-t border-hairline">
                {[{ label: "Home", href: "/" as const }, ...mainNav].map((item, i) => {
                  const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      className="border-b border-hairline"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease, delay: 0.06 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className="group/m flex items-baseline gap-5 py-5"
                      >
                        <span className="w-6 text-[0.65rem] font-semibold tracking-[0.2em] text-ash tabular-nums">
                          {pad(i + 1)}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[2.35rem] leading-none transition-colors duration-500 sm:text-5xl",
                            active ? "text-champagne italic" : "text-ivory group-hover/m:text-champagne",
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                className="mt-10 grid gap-8 sm:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="space-y-2 text-sm text-ash">
                  <p className="eyebrow text-champagne">Contact (demo)</p>
                  <a className="block py-1 hover:text-ivory" href={contactInfo.phoneHref}>
                    {contactInfo.phoneDisplay}
                  </a>
                  <a className="block py-1 break-all hover:text-ivory" href={contactInfo.emailHref}>
                    {contactInfo.email}
                  </a>
                </div>
                <div className="space-y-2 text-sm text-ash">
                  <p className="eyebrow text-champagne">Hours (demo)</p>
                  {openingHours.map((h) => (
                    <p key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="text-ivory/80">{h.hours}</span>
                    </p>
                  ))}
                </div>
              </motion.div>
            </nav>

            <div className="container-site pb-[max(2rem,env(safe-area-inset-bottom))]">
              <ButtonLink href={bookingHref} onClick={closeMenu} arrow className="w-full">
                Book an appointment
              </ButtonLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
