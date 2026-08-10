"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { IconArrowUpRight, IconCheck } from "./Icons";
import { contactServiceOptions, contactIntentOptions, contactEquipmentRangeOptions } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
type FieldKey = "name" | "organization" | "email" | "phone" | "city" | "message" | "consent";
type Errors = Partial<Record<FieldKey, string>>;

const VALIDATION_ORDER: FieldKey[] = ["name", "organization", "email", "phone", "city", "message", "consent"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMessage, setServerMessage] = useState("");

  const timestampRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Marca de tiempo de renderizado: defensa antispam local (ver /api/contact).
    if (timestampRef.current) timestampRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const organization = String(data.get("organization") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const consent = data.get("consent");

    if (name.length < 2) next.name = "Indica tu nombre completo.";
    if (organization.length < 2) next.organization = "Indica el nombre de tu institución.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Indica un correo válido.";
    if (phone && !/^[0-9+()\-\s]{7,20}$/.test(phone)) next.phone = "Revisa el formato del teléfono.";
    if (city.length < 2) next.city = "Indica tu ciudad.";
    if (message.length < 10) next.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
    if (!consent) next.consent = "Necesitamos tu autorización para contactarte.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      const firstInvalid = VALIDATION_ORDER.find((key) => validationErrors[key]);
      const el = firstInvalid ? form.elements.namedItem(firstInvalid) : null;
      if (el instanceof HTMLElement) el.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setServerMessage(body.message ?? "No pudimos registrar tu solicitud. Intenta de nuevo.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setServerMessage("Hubo un problema de conexión. Intenta nuevamente.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start rounded-[6px] border border-line bg-white p-8 sm:p-10"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal">
          <IconCheck width={26} height={26} />
        </span>
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-5 text-xl font-bold text-navy-ink focus:outline-none"
        >
          Interés registrado
        </h3>
        <p className="mt-2 max-w-sm text-slate">
          Gracias por registrar tu interés. IBEX revisará la información y se pondrá en contacto
          contigo por los medios proporcionados.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-6">
          Registrar otra institución
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[6px] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-9"
    >
      {/* honeypot anti-spam (oculto para personas, visible para bots) */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>
          No llenar este campo
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {/* marca de tiempo de render, usada por el servidor como señal antispam */}
      <input ref={timestampRef} type="hidden" name="form_rendered_at" defaultValue="" />

      <p className="mb-6 text-xs text-slate-light">
        Los campos marcados con <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> son obligatorios.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre completo" error={errors.name} htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            maxLength={100}
            required
            aria-required="true"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(errors.name)}
          />
        </Field>

        <Field label="Institución" error={errors.organization} htmlFor="organization" required>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            placeholder="Hospital, clínica o empresa"
            maxLength={150}
            required
            aria-required="true"
            aria-invalid={errors.organization ? "true" : undefined}
            aria-describedby={errors.organization ? "organization-error" : undefined}
            className={inputClass(errors.organization)}
          />
        </Field>

        <Field label="Correo electrónico" error={errors.email} htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.com"
            maxLength={200}
            required
            aria-required="true"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(errors.email)}
          />
        </Field>

        <Field label="Teléfono" htmlFor="phone" error={errors.phone} optional>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="664 000 0000"
            maxLength={30}
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass(errors.phone)}
          />
        </Field>

        <Field label="Ciudad" error={errors.city} htmlFor="city" required>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder="Tijuana"
            maxLength={100}
            required
            aria-required="true"
            aria-invalid={errors.city ? "true" : undefined}
            aria-describedby={errors.city ? "city-error" : undefined}
            className={inputClass(errors.city)}
          />
        </Field>

        <Field label="Número aproximado de equipos" htmlFor="equipmentRange" optional>
          <select
            id="equipmentRange"
            name="equipmentRange"
            defaultValue="No lo sé todavía"
            className={`${inputClass()} appearance-none`}
          >
            {contactEquipmentRangeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Servicio de interés" htmlFor="service" optional>
          <select id="service" name="service" defaultValue="" className={`${inputClass()} appearance-none`}>
            <option value="" disabled>
              Selecciona un servicio
            </option>
            {contactServiceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="¿Qué te gustaría hacer?" htmlFor="intent" optional>
          <select
            id="intent"
            name="intent"
            defaultValue={contactIntentOptions[0]}
            className={`${inputClass()} appearance-none`}
          >
            {contactIntentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Mensaje" error={errors.message} htmlFor="message" required>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Cuéntanos sobre tu equipo, tu institución o el reto que enfrentas."
            maxLength={2000}
            required
            aria-required="true"
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${inputClass(errors.message)} resize-y`}
          />
        </Field>
      </div>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate">
          <input
            name="consent"
            type="checkbox"
            value="yes"
            required
            aria-required="true"
            aria-invalid={errors.consent ? "true" : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-teal)]"
          />
          <span>
            Autorizo a <span className="font-medium text-navy-ink">IBEX Biomedical Solutions</span> a
            contactarme y acepto la{" "}
            <Link href="/privacidad" className="link-underline font-medium text-navy">
              Política de Privacidad
            </Link>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-1.5 text-sm text-[#c0392b]">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 rounded border border-[#e0b4ae] bg-[#fbeeec] px-4 py-3 text-sm text-[#9c2f22]">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="btn btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Enviando…" : "Registrar mi institución"}
        {status !== "submitting" && <IconArrowUpRight width={16} height={16} />}
      </button>
    </form>
  );
}

function inputClass(error?: string) {
  return [
    "w-full rounded border bg-white px-3.5 py-2.5 text-[0.95rem] text-navy-ink",
    "min-h-[44px] placeholder:text-slate-light transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal",
    error ? "border-[#d98b81]" : "border-line",
  ].join(" ");
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-2 text-sm font-medium text-navy-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-[#c0392b]">
            *
          </span>
        )}
        {optional && <span className="text-xs font-normal text-slate-light">(opcional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-sm text-[#c0392b]">
          {error}
        </p>
      )}
    </div>
  );
}
