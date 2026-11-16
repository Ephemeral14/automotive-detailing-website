import { serviceOptions } from "@/lib/validations";

export type ServiceOption = (typeof serviceOptions)[number];

/**
 * Link to the booking form, optionally preselecting a service.
 * The contact page reads `?service=` and pre-fills the "Desired service" field.
 */
export function bookingLink(service?: ServiceOption) {
  return service ? `/contact?service=${encodeURIComponent(service)}#booking` : "/contact#booking";
}

export function isServiceOption(value: string | null | undefined): value is ServiceOption {
  return !!value && (serviceOptions as readonly string[]).includes(value);
}
