import type { ReactNode } from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ExternalButtonLink } from "@/components/ui/Button";
import { DemoBadge, DemoNote } from "@/components/ui/DemoNote";
import { contactInfo, openingHours } from "@/lib/site";
import { StudioMap } from "./StudioMap";

function ChannelLink({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      className="group/ch flex min-h-16 items-center gap-4 border-b border-hairline py-3 transition-colors duration-500"
    >
      <span
        aria-hidden="true"
        className="inline-flex size-10 shrink-0 items-center justify-center border border-hairline-strong text-champagne transition-colors duration-500 group-hover/ch:border-champagne"
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.625rem] font-semibold tracking-[0.22em] text-smoke uppercase">{label}</span>
        <span className="mt-1 block text-sm [overflow-wrap:anywhere] text-ivory sm:text-[0.95rem] transition-colors duration-500 group-hover/ch:text-champagne">
          {value}
        </span>
      </span>
      <span className="sr-only">(placeholder demo detail)</span>
      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-4 shrink-0 text-smoke transition-[color,transform] duration-500 ease-luxe group-hover/ch:translate-x-0.5 group-hover/ch:-translate-y-0.5 group-hover/ch:text-champagne"
      />
    </a>
  );
}

/** Direct contact channels, demonstration hours and the studio map placeholder. */
export function ContactSidebar() {
  return (
    <aside aria-label="Contact details" className="border border-hairline bg-graphite">
      {/* Direct lines */}
      <div className="p-6 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow text-champagne">Direct lines</p>
          <DemoBadge>Placeholder details</DemoBadge>
        </div>
        <h3 className="mt-6 font-display text-display-sm text-ivory [&_em]:text-champagne [&_em]:italic">
          Prefer to talk <em>first</em>?
        </h3>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-ash">
          Message or call the studio with a quick question. We’ll happily advise on what your vehicle actually
          needs — and what it doesn’t.
        </p>

        <ExternalButtonLink
          href={contactInfo.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className="mt-8 w-full"
        >
          <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-4 text-champagne" />
          Message on WhatsApp
          <span className="sr-only">(opens in a new tab)</span>
          <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
        </ExternalButtonLink>

        <div className="mt-6 border-t border-hairline">
          <ChannelLink
            href={contactInfo.phoneHref}
            icon={<Phone strokeWidth={1.5} className="size-4" />}
            label="Telephone"
            value={contactInfo.phoneDisplay}
          />
          <ChannelLink
            href={contactInfo.emailHref}
            icon={<Mail strokeWidth={1.5} className="size-4" />}
            label="Email"
            value={contactInfo.email}
          />
        </div>

        <DemoNote className="mt-5">
          Placeholder contact details for a fictional studio — the number sits in a range reserved for fiction and
          the email uses a reserved <span className="text-ash">.example</span> domain.
        </DemoNote>
      </div>

      {/* Hours */}
      <div className="border-t border-hairline p-6 sm:p-9">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="eyebrow text-champagne">Opening hours</h3>
          <p className="text-[0.6875rem] tracking-[0.14em] text-smoke uppercase">Demonstration hours</p>
        </div>
        <dl className="mt-6">
          {openingHours.map((h) => (
            <div key={h.days} className="flex items-baseline justify-between gap-6 border-b border-hairline py-3.5 last:border-b-0">
              <dt className="text-sm text-ash">{h.days}</dt>
              <dd className="text-right text-sm text-ivory tabular-nums">
                {h.hours}
                {h.note ? <span className="block text-xs text-smoke">{h.note}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Studio */}
      <div className="border-t border-hairline p-6 sm:p-9">
        <h3 className="eyebrow text-champagne">The studio</h3>
        <address className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-ash not-italic">
          <MapPin aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-champagne" />
          <span>
            {contactInfo.addressLines.map((line, i) => (
              <span key={line} className={i === 0 ? "block text-ivory" : "block text-smoke"}>
                {line}
              </span>
            ))}
          </span>
        </address>
        <StudioMap className="mt-6" />
      </div>
    </aside>
  );
}
