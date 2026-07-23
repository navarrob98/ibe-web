"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { IconArrowUpRight, IconCheck } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

const services = [
  "Mantenimiento preventivo y correctivo",
  "Calibración y verificación",
  "Gestión de tecnología biomédica",
  "Consultoría y equipamiento",
  "Capacitación clínica",
  "Otro / no estoy seguro",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMessage, setServerMessage] = useState("");

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const consent = data.get("consent");

    if (name.length < 2) next.name = "Indica tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Indica un correo válido.";
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
    if (Object.keys(validationErrors).length > 0) return;

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
        setServerMessage(body.message ?? "No pudimos enviar tu mensaje. Intenta de nuevo.");
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
      <div className="flex flex-col items-start rounded-[6px] border border-line bg-white p-8 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal">
          <IconCheck width={26} height={26} />
        </span>
        <h3 className="mt-5 text-xl font-bold text-navy-ink">Mensaje recibido</h3>
        <p className="mt-2 max-w-sm text-slate">
          Gracias por escribirnos. Un especialista de IBEX Biomedical Solutions te contactará dentro del siguiente día
          hábil.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-ghost mt-6"
        >
          Enviar otro mensaje
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
      {/* honeypot anti-spam (oculto) */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>
          No llenar este campo
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre completo" error={errors.name} htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            className={inputClass(errors.name)}
          />
        </Field>

        <Field label="Organización" htmlFor="organization" optional>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            placeholder="Hospital, clínica o empresa"
            className={inputClass()}
          />
        </Field>

        <Field label="Correo electrónico" error={errors.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.com"
            className={inputClass(errors.email)}
          />
        </Field>

        <Field label="Teléfono" htmlFor="phone" optional>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="55 0000 0000"
            className={inputClass()}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="¿En qué te podemos ayudar?" htmlFor="service">
          <select id="service" name="service" defaultValue="" className={`${inputClass()} appearance-none`}>
            <option value="" disabled>
              Selecciona un servicio
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Mensaje" error={errors.message} htmlFor="message">
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Cuéntanos sobre tu equipo, tu institución o el reto que enfrentas."
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
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-teal)]"
          />
          <span>
            Autorizo a {""}
            <span className="font-medium text-navy-ink">IBEX Biomedical Solutions</span> a contactarme
            y acepto la{" "}
            <Link href="/privacidad" className="link-underline font-medium text-navy">
              Política de Privacidad
            </Link>
            .
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-sm text-[#c0392b]">{errors.consent}</p>}
      </div>

      {status === "error" && (
        <p className="mt-5 rounded border border-[#e0b4ae] bg-[#fbeeec] px-4 py-3 text-sm text-[#9c2f22]">
          {serverMessage}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn btn-primary mt-7 w-full sm:w-auto">
        {status === "submitting" ? "Enviando…" : "Enviar mensaje"}
        {status !== "submitting" && <IconArrowUpRight width={16} height={16} />}
      </button>
    </form>
  );
}

function inputClass(error?: string) {
  return [
    "w-full rounded border bg-white px-3.5 py-2.5 text-[0.95rem] text-navy-ink",
    "placeholder:text-slate-light transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal",
    error ? "border-[#d98b81]" : "border-line",
  ].join(" ");
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-2 text-sm font-medium text-navy-ink">
        {label}
        {optional && <span className="text-xs font-normal text-slate-light">(opcional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-[#c0392b]">{error}</p>}
    </div>
  );
}
