import Link from "next/link";
import { ArrowUp, Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { services } from "@/data/services";
import { contactInfo, mainNav, openingHours, siteConfig } from "@/lib/site";

const linkClass =
  "inline-block py-1.5 text-sm text-ash transition-colors duration-500 hover:text-ivory focus-visible:text-ivory";

export function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-graphite">
      <div className="container-site grid gap-14 pt-20 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:pt-28">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-ash">
            A private detailing studio for owners who notice the difference. Paint correction, ceramic
            protection and interior restoration — performed by hand, one vehicle at a time.
          </p>
          <p className="mt-6 max-w-sm text-xs leading-relaxed text-smoke">
            Noir Auto Studio is a fictional brand created for a web-development portfolio. Prices,
            testimonials and contact details on this site are demonstration content.
          </p>
        </div>

        <nav aria-labelledby="footer-explore" className="lg:col-span-2 lg:col-start-6">
          <h2 id="footer-explore" className="eyebrow text-champagne">
            Explore
          </h2>
          <ul className="mt-6">
            <li>
              <Link href="/" className={linkClass}>
                Home
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/credits" className={linkClass}>
                Credits
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-services" className="lg:col-span-2">
          <h2 id="footer-services" className="eyebrow text-champagne">
            Services
          </h2>
          <ul className="mt-6">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services#${service.slug}`} className={linkClass}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow text-champagne">Visit &amp; contact</h2>
          <p className="mt-2 text-[0.65rem] tracking-[0.18em] text-smoke uppercase">Placeholder details</p>
          <ul className="mt-5 space-y-1">
            <li>
              <a href={contactInfo.phoneHref} className={`${linkClass} inline-flex items-center gap-3`}>
                <Phone aria-hidden="true" strokeWidth={1.5} className="size-4 text-champagne" />
                {contactInfo.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contactInfo.emailHref} className={`${linkClass} inline-flex items-center gap-3 break-all`}>
                <Mail aria-hidden="true" strokeWidth={1.5} className="size-4 shrink-0 text-champagne" />
                {contactInfo.email}
              </a>
            </li>
            <li>
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-3`}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-4 text-champagne" />
                WhatsApp
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
          <dl className="mt-7 space-y-2 border-t border-hairline pt-6 text-sm">
            {openingHours.map((h) => (
              <div key={h.days} className="flex justify-between gap-6">
                <dt className="text-ash">{h.days}</dt>
                <dd className="text-ivory/85">{h.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-site flex flex-col gap-5 py-8 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. Fictional portfolio concept — not a real business.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/credits" className="py-2 transition-colors hover:text-ivory">
              Photo credits
            </Link>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 py-2 uppercase tracking-[0.2em] transition-colors hover:text-champagne"
            >
              Back to top
              <ArrowUp
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
