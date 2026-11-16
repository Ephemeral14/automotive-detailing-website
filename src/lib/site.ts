/**
 * Central site configuration.
 *
 * NOIR AUTO STUDIO is a fictional business created for a web-development
 * portfolio. Every contact detail below is a clearly-marked placeholder:
 *  - the phone number uses the 555-01xx range reserved for fiction,
 *  - the e-mail and site domains use the reserved `.example` TLD.
 */

export const siteConfig = {
  name: "Noir Auto Studio",
  wordmark: "NOIR",
  tagline: "Perfection in every detail.",
  description:
    "Noir Auto Studio is a premium automotive detailing studio — paint correction, ceramic coating, paint protection film and meticulous interior care for discerning owners. (Fictional portfolio concept.)",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://noir-auto-studio.example",
  /** Displayed in the footer. Fixed at build time to keep pages fully static. */
  copyrightYear: 2026,
} as const;

export type NavItem = { label: string; href: `/${string}` };

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Placeholder contact details — not a real business. */
export const contactInfo = {
  phoneDisplay: "+1 (555) 010-0199",
  phoneHref: "tel:+15550100199",
  email: "hello@noirautostudio.example",
  emailHref: "mailto:hello@noirautostudio.example",
  whatsappDisplay: "+1 (555) 010-0199",
  whatsappHref:
    "https://wa.me/15550100199?text=" +
    encodeURIComponent("Hello Noir Auto Studio — I'd like to ask about a detailing appointment."),
  addressLines: ["Studio location shared on booking", "Demonstration address — fictional"],
  instagramHandle: "@noir.autostudio (demo)",
} as const;

export type OpeningHours = { days: string; hours: string; note?: string };

/** Demonstration opening hours. */
export const openingHours: OpeningHours[] = [
  { days: "Monday – Friday", hours: "08:00 – 19:00" },
  { days: "Saturday", hours: "09:00 – 17:00" },
  { days: "Sunday", hours: "By appointment", note: "Private sessions" },
];

export const bookingHref = "/contact#booking" as const;
