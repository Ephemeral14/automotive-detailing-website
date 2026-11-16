import { z } from "zod";

export const serviceOptions = [
  "Exterior Detailing",
  "Interior Detailing",
  "Full Detailing",
  "Paint Correction",
  "Ceramic Coating",
  "Paint Protection Film",
  "Engine Bay Detailing",
  "Maintenance Detailing",
  "Essential Package",
  "Signature Package",
  "Ultimate Package",
  "Not sure yet — please advise",
] as const;

/** Local calendar date as YYYY-MM-DD (not UTC, so "today" matches the user's clock). */
export function toLocalISODate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const phonePattern = /^\+?[0-9\s().-]{7,20}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z.string().trim().min(1, "Please enter your email address.").pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number.")
    .regex(phonePattern, "Please enter a valid phone number (digits, spaces, + ( ) - only)."),
  vehicle: z
    .string()
    .trim()
    .min(2, "Please tell us the make and model.")
    .max(80, "Please keep this under 80 characters."),
  service: z.enum(serviceOptions, "Please choose a service."),
  date: z
    .string()
    .min(1, "Please choose a preferred date.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a valid date.")
    // Evaluated at submit time on the client — compares calendar dates as strings.
    .refine((value) => value >= toLocalISODate(new Date()), "Please choose today or a future date."),
  message: z.string().trim().max(1000, "Please keep your message under 1,000 characters.").optional(),
});

export type ContactFormValues = z.input<typeof contactSchema>;
export type ContactFormData = z.output<typeof contactSchema>;
