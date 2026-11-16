"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type BaseSyntheticEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { ChevronDown, CircleCheck, LoaderCircle, RotateCcw, WifiOff } from "lucide-react";
import { Button, TextLink } from "@/components/ui/Button";
import { isServiceOption, type ServiceOption } from "@/lib/booking";
import {
  contactSchema,
  serviceOptions,
  toLocalISODate,
  type ContactFormData,
  type ContactFormValues,
} from "@/lib/validations";
import { cn } from "@/lib/utils";
import { FormField, Legend, controlClasses, describedBy } from "./FormField";

const MESSAGE_MAX = 1000;
const SIMULATED_LATENCY_MS = 1200;

/** DOM order — used to focus the first invalid field on submit. */
const FIELD_ORDER = ["name", "email", "phone", "vehicle", "service", "date", "message"] as const;

const serviceGroups = [
  { label: "Individual services", options: serviceOptions.slice(0, 8) },
  { label: "Packages", options: serviceOptions.slice(8, 11) },
  { label: "Other", options: serviceOptions.slice(11) },
];

type Status = "idle" | "error" | "success";

type Summary = { label: string; value: string }[];

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatChosenDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return dateFormatter.format(new Date(y, m - 1, d));
}

function buildSummary(data: ContactFormData): Summary {
  const rows: Summary = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    { label: "Vehicle", value: data.vehicle },
    { label: "Service", value: data.service },
    { label: "Preferred date", value: formatChosenDate(data.date) },
  ];
  if (data.message) rows.push({ label: "Message", value: data.message });
  return rows;
}

/**
 * Booking request form (portfolio demo). Validates with the shared zod
 * schema, simulates a network request and shows an honest confirmation.
 * Nothing is transmitted or stored.
 */
export function ContactForm() {
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const presetService = isServiceOption(serviceParam) ? serviceParam : undefined;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setFocus,
    setValue,
    getValues,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ContactFormValues, unknown, ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    shouldFocusError: false,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicle: "",
      // Empty until chosen — the schema reports "Please choose a service."
      service: (presetService ?? "") as ServiceOption,
      date: "",
      message: "",
    },
  });

  const [status, setStatus] = useState<Status>("idle");
  const [summary, setSummary] = useState<Summary | null>(null);
  const shouldReset = useRef(false);
  const focusNameNext = useRef(false);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const confirmationHeadingRef = useRef<HTMLHeadingElement>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const message = useWatch({ control, name: "message" }) ?? "";
  const service = useWatch({ control, name: "service" });
  const date = useWatch({ control, name: "date" });

  // If the page is revisited with a different ?service= (e.g. from a pricing
  // card while this route was kept alive by <Activity>), follow the URL.
  useEffect(() => {
    if (isServiceOption(serviceParam) && getValues("service") !== serviceParam) {
      setValue("service", serviceParam, { shouldDirty: true });
    }
  }, [serviceParam, getValues, setValue]);

  // Earliest selectable date = today on the visitor's clock. Set after mount
  // (and whenever the form re-mounts) so render stays deterministic.
  useEffect(() => {
    if (status === "success") return;
    if (dateInputRef.current) dateInputRef.current.min = toLocalISODate(new Date());
  }, [status]);

  // Move focus to the confirmation, or back to the first field after "Make another request".
  useEffect(() => {
    if (status === "success") {
      confirmationRef.current?.scrollIntoView({ block: "start" });
      confirmationHeadingRef.current?.focus({ preventScroll: true });
    } else if (status === "idle" && focusNameNext.current) {
      focusNameNext.current = false;
      setFocus("name");
    }
  }, [status, setFocus]);

  // Transient results must not survive the route being hidden by <Activity>.
  useLayoutEffect(() => {
    return () => {
      if (shouldReset.current) {
        shouldReset.current = false;
        reset();
        setSummary(null);
      }
      setStatus("idle");
    };
  }, [reset]);

  const onValid = async (data: ContactFormData) => {
    setStatus("idle");
    const offlineAtSubmit = !navigator.onLine;
    // Simulated request — a portfolio demo has no backend.
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
    if (offlineAtSubmit || !navigator.onLine) {
      setStatus("error");
      return;
    }
    setSummary(buildSummary(data));
    shouldReset.current = true;
    setStatus("success");
  };

  const onInvalid = (fieldErrors: FieldErrors<ContactFormValues>) => {
    setStatus("idle");
    const first = FIELD_ORDER.find((name) => fieldErrors[name]);
    if (first) setFocus(first);
  };

  // Built per call (not during render) — the handlers touch refs.
  const submit = (event?: BaseSyntheticEvent) => handleSubmit(onValid, onInvalid)(event);

  const startOver = () => {
    shouldReset.current = false;
    focusNameNext.current = true;
    reset();
    setSummary(null);
    setStatus("idle");
  };

  if (status === "success" && summary) {
    const firstName = summary[0].value.split(/\s+/)[0];
    return (
      <motion.div
        ref={confirmationRef}
        id={fid("confirmation")}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="border border-hairline bg-graphite"
      >
        <div className="border-b border-hairline p-6 sm:p-10 lg:p-12">
          <p className="eyebrow flex items-center gap-3 text-success">
            <CircleCheck aria-hidden="true" strokeWidth={1.5} className="size-4" />
            Request received — demo
          </p>
          <h3
            ref={confirmationHeadingRef}
            tabIndex={-1}
            className="mt-6 font-display text-display-md text-balance text-ivory outline-none [&_em]:text-champagne [&_em]:italic"
          >
            Thank you, <em>{firstName}</em>.
          </h3>
          <p className="mt-5 max-w-xl leading-relaxed text-ash">
            In a working studio, this is where we would reply to confirm availability for your preferred date and
            share a tailored estimate.
          </p>
          <p className="mt-6 max-w-xl border-l border-champagne/60 pl-4 text-sm leading-relaxed text-ivory/80">
            This is a portfolio demonstration. Nothing was sent to a real business and no data was stored — your
            details exist only in this browser tab.
          </p>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <h4 className="eyebrow text-champagne">Your request</h4>
          <dl className="mt-6 grid border-t border-hairline sm:grid-cols-2 sm:gap-x-10">
            {summary.map((row) => (
              <div
                key={row.label}
                className={cn("border-b border-hairline py-4", row.label === "Message" && "sm:col-span-2")}
              >
                <dt className="text-[0.6875rem] font-semibold tracking-[0.18em] text-smoke uppercase">{row.label}</dt>
                <dd className="mt-1.5 text-[0.95rem] break-words whitespace-pre-line text-ivory">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <Button variant="outline" onClick={startOver}>
              <RotateCcw aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
              Make another request
            </Button>
            <TextLink href="/services" className="self-start py-3 sm:self-auto">
              Explore our services
            </TextLink>
          </div>
        </div>
      </motion.div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const dateReg = register("date");
  const messageLength = message.length;
  const remaining = MESSAGE_MAX - messageLength;

  return (
    <form noValidate onSubmit={submit} aria-label="Booking request" className="space-y-14">
      <p className="text-[0.8125rem] text-smoke">
        Fields marked <span className="text-champagne">*</span> are required.
      </p>

      <fieldset className="min-w-0">
        <Legend index="01">About you</Legend>
        <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2">
          <FormField id={fid("name")} label="Full name" required error={errors.name?.message} className="sm:col-span-2">
            <input
              id={fid("name")}
              type="text"
              autoComplete="name"
              aria-required="true"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy(fid("name"), { error: !!errors.name })}
              className={controlClasses(!!errors.name)}
              {...register("name")}
            />
          </FormField>

          <FormField id={fid("email")} label="Email" required error={errors.email?.message}>
            <input
              id={fid("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              aria-required="true"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy(fid("email"), { error: !!errors.email })}
              className={controlClasses(!!errors.email)}
              {...register("email")}
            />
          </FormField>

          <FormField
            id={fid("phone")}
            label="Phone"
            required
            hint="Used only to confirm your appointment."
            error={errors.phone?.message}
          >
            <input
              id={fid("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-required="true"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy(fid("phone"), { hint: true, error: !!errors.phone })}
              className={controlClasses(!!errors.phone)}
              {...register("phone")}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <Legend index="02">Your vehicle &amp; visit</Legend>
        <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2">
          <FormField
            id={fid("vehicle")}
            label="Vehicle make and model"
            required
            hint="Year and colour help us prepare, e.g. Porsche 911 Carrera S, 2021, Jet Black."
            error={errors.vehicle?.message}
            className="sm:col-span-2"
          >
            <input
              id={fid("vehicle")}
              type="text"
              autoComplete="off"
              aria-required="true"
              aria-invalid={errors.vehicle ? true : undefined}
              aria-describedby={describedBy(fid("vehicle"), { hint: true, error: !!errors.vehicle })}
              className={controlClasses(!!errors.vehicle)}
              {...register("vehicle")}
            />
          </FormField>

          <FormField
            id={fid("service")}
            label="Desired service"
            required
            hint="Unsure? Choose “Not sure yet” and we’ll advise."
            error={errors.service?.message}
          >
            <select
              id={fid("service")}
              aria-required="true"
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={describedBy(fid("service"), { hint: true, error: !!errors.service })}
              className={controlClasses(!!errors.service, cn("cursor-pointer appearance-none pr-12", !service && "text-smoke"))}
              {...register("service")}
            >
              <option value="" disabled className="bg-onyx text-smoke">
                Select a service
              </option>
              {serviceGroups.map((group) => (
                <optgroup key={group.label} label={group.label} className="bg-onyx text-ash">
                  {group.options.map((option) => (
                    <option key={option} value={option} className="bg-onyx text-ivory">
                      {option}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              strokeWidth={1.5}
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-champagne"
            />
          </FormField>

          <FormField
            id={fid("date")}
            label="Preferred date"
            required
            hint="We’ll confirm the exact time with you."
            error={errors.date?.message}
          >
            <input
              id={fid("date")}
              type="date"
              aria-required="true"
              aria-invalid={errors.date ? true : undefined}
              aria-describedby={describedBy(fid("date"), { hint: true, error: !!errors.date })}
              className={controlClasses(!!errors.date, cn("pr-3", !date && "text-smoke"))}
              {...dateReg}
              ref={(el) => {
                dateReg.ref(el);
                dateInputRef.current = el;
              }}
            />
          </FormField>

          <FormField
            id={fid("message")}
            label="Additional message"
            hint="Condition, concerns or anything we should know before your visit."
            error={errors.message?.message}
            className="sm:col-span-2"
            aside={
              <p
                id={fid("message-count")}
                className={cn(
                  "text-[0.75rem] tabular-nums transition-colors duration-500",
                  remaining < 0 ? "text-danger" : remaining <= 100 ? "text-champagne" : "text-smoke",
                )}
              >
                <span className="sr-only">Characters used: </span>
                {messageLength.toLocaleString("en-US")} / {MESSAGE_MAX.toLocaleString("en-US")}
              </p>
            }
          >
            <textarea
              id={fid("message")}
              rows={6}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy(fid("message"), {
                hint: true,
                error: !!errors.message,
                extra: fid("message-count"),
              })}
              className={controlClasses(!!errors.message, "min-h-44 resize-y py-4 leading-relaxed")}
              {...register("message")}
            />
            <p aria-live="polite" className="sr-only">
              {remaining < 0
                ? `${Math.abs(remaining)} characters over the limit`
                : remaining <= 50
                  ? `${remaining} characters remaining`
                  : ""}
            </p>
          </FormField>
        </div>
      </fieldset>

      {status === "error" ? (
        <div role="alert" className="flex flex-col gap-5 border border-danger/40 bg-danger/[0.06] p-5 sm:flex-row sm:items-start sm:p-6">
          <WifiOff aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-danger" />
          <div className="flex-1">
            <p className="font-semibold text-ivory">We couldn’t send your request.</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ash">
              Your device appears to be offline. Everything you entered is still here — reconnect and try again.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => void submit()} disabled={isSubmitting} className="self-start">
            <RotateCcw aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
            Try again
          </Button>
        </div>
      ) : null}

      <div className="flex flex-col gap-6 border-t border-hairline pt-8 sm:flex-row-reverse sm:items-center sm:justify-between">
        <Button
          type="submit"
          arrow={!isSubmitting}
          disabled={isSubmitting}
          aria-busy={isSubmitting || undefined}
          className="w-full disabled:opacity-80 sm:w-auto sm:min-w-[15.5rem]"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden="true" strokeWidth={1.75} className="size-4 motion-safe:animate-spin" />
              Sending…
            </>
          ) : (
            "Send request"
          )}
        </Button>
        <div className="text-[0.8125rem] leading-relaxed">
          {submitCount > 0 && errorCount > 0 ? (
            <p className="text-danger">
              Please review the {errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`}.
            </p>
          ) : (
            <p className="text-smoke">Demonstration form — nothing is sent or stored.</p>
          )}
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {isSubmitting ? "Sending your request…" : ""}
      </p>
    </form>
  );
}
