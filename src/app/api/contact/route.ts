import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactServiceOptions, contactIntentOptions, contactEquipmentRangeOptions } from "@/lib/site";

/**
 * Recepción del formulario de contacto (registro de prospectos de prelanzamiento).
 *
 * Valida en el servidor y envía el mensaje por correo usando SMTP (pensado
 * para una cuenta de correo de cPanel). Configura las variables de entorno
 * en el archivo `.env` (ver `.env.example`).
 *
 * No se guarda ningún prospecto en archivos locales ni en consola: el único
 * destino de la información es el correo configurado por SMTP.
 */

export const runtime = "nodejs"; // nodemailer requiere Node, no Edge.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{7,30}$/;

// Límite de tamaño del cuerpo de la solicitud (defensa básica contra abuso).
const MAX_BODY_BYTES = 20_000;

// El formulario no debe poder enviarse antes de que un humano haya tenido
// tiempo de leerlo y llenarlo. Los envíos automatizados suelen ocurrir en
// milisegundos tras cargar la página.
const MIN_FILL_TIME_MS = 1500;

type Payload = {
  name?: string;
  organization?: string;
  email?: string;
  phone?: string;
  city?: string;
  service?: string;
  intent?: string;
  equipmentRange?: string;
  message?: string;
  consent?: string;
  company_website?: string; // honeypot
  form_rendered_at?: string; // marca de tiempo antispam
};

function noStore(body: unknown, init?: number | ResponseInit) {
  const res = NextResponse.json(body as object, typeof init === "number" ? { status: init } : init);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Quita saltos de línea para evitar inyección en encabezados/asunto del correo. */
function sanitizeLine(value: string, max: number) {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

function normalizeEmail(value: string) {
  return sanitizeLine(value, 200).toLowerCase();
}

function normalizePhone(value: string) {
  return value.replace(/[^0-9+()\-\s]/g, "").trim().slice(0, 30);
}

function pickAllowed(value: string, allowed: readonly string[]) {
  const clean = sanitizeLine(value, 120);
  return allowed.includes(clean) ? clean : "";
}

/**
 * Límite de solicitudes en memoria por IP.
 *
 * LIMITACIÓN CONOCIDA: este contador vive en la memoria del proceso de
 * Node. Es una defensa razonable mientras la app corra como un único
 * proceso (el caso típico de una app de Node en cPanel/Passenger), pero
 * NO es confiable si el hosting llega a ejecutar varias instancias del
 * proceso en paralelo (cada una tendría su propio contador) o si el
 * proceso se reinicia con frecuencia (el contador se pierde). Para ese
 * escenario se necesitaría un almacén compartido (Redis, base de datos).
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  // Evita que el mapa crezca sin límite si llegan muchas IPs distintas.
  if (requestLog.size > 5000) requestLog.clear();
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return noStore({ ok: false, message: "Demasiadas solicitudes. Intenta de nuevo más tarde." }, 429);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength && contentLength > MAX_BODY_BYTES) {
    return noStore({ ok: false, message: "La solicitud es demasiado grande." }, 413);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return noStore({ ok: false, message: "La solicitud es demasiado grande." }, 413);
  }

  let data: Payload;
  try {
    data = JSON.parse(raw) as Payload;
  } catch {
    return noStore({ ok: false, message: "Solicitud inválida." }, 400);
  }

  // Honeypot: si está lleno, es un bot. Respondemos OK sin procesar ni enviar.
  if (data.company_website && data.company_website.trim() !== "") {
    return noStore({ ok: true });
  }

  // Defensa antispam por tiempo de llenado: si el envío llega antes de
  // MIN_FILL_TIME_MS desde que se mostró el formulario, se trata como
  // automatizado y se descarta silenciosamente (misma respuesta que un
  // envío válido, para no revelar la defensa a quien la dispara).
  const renderedAt = Number(data.form_rendered_at ?? NaN);
  if (!Number.isFinite(renderedAt) || Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return noStore({ ok: true });
  }

  const name = sanitizeLine(String(data.name ?? ""), 100);
  const organization = sanitizeLine(String(data.organization ?? ""), 150);
  const email = normalizeEmail(String(data.email ?? ""));
  const phoneRaw = normalizePhone(String(data.phone ?? ""));
  const city = sanitizeLine(String(data.city ?? ""), 100);
  const message = String(data.message ?? "").trim().slice(0, 2000);
  const service = pickAllowed(String(data.service ?? ""), contactServiceOptions);
  const intent = pickAllowed(String(data.intent ?? ""), contactIntentOptions);
  const equipmentRange = pickAllowed(String(data.equipmentRange ?? ""), contactEquipmentRangeOptions);

  const errors: string[] = [];
  if (name.length < 2 || name.length > 100) errors.push("nombre");
  if (organization.length < 2 || organization.length > 150) errors.push("institución");
  if (!EMAIL_RE.test(email) || email.length > 200) errors.push("correo");
  if (phoneRaw && !PHONE_RE.test(phoneRaw)) errors.push("teléfono");
  if (city.length < 2 || city.length > 100) errors.push("ciudad");
  if (message.length < 10 || message.length > 2000) errors.push("mensaje");
  if (data.consent !== "yes") errors.push("consentimiento");

  if (errors.length > 0) {
    return noStore(
      { ok: false, message: `Revisa los campos: ${errors.join(", ")}.`, fields: errors },
      422
    );
  }

  const submission = {
    name,
    organization,
    email,
    phone: phoneRaw || "—",
    city,
    service: service || "—",
    intent: intent || "—",
    equipmentRange: equipmentRange || "—",
    message,
    receivedAt: new Date().toLocaleString("es-MX", { timeZone: "America/Tijuana" }),
  };

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  const inbox = process.env.CONTACT_INBOX || SMTP_USER;
  const from = process.env.CONTACT_FROM || SMTP_USER;
  const smtpConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

  if (!smtpConfigured) {
    if (process.env.NODE_ENV === "production") {
      // Nunca se simula un envío exitoso en producción: sin SMTP no hay
      // forma de hacer llegar la solicitud, así que se reporta como error.
      console.error("[contacto] SMTP no configurado en producción. Solicitud descartada.");
      return noStore(
        { ok: false, message: "No pudimos registrar tu solicitud en este momento. Intenta más tarde." },
        503
      );
    }
    // En desarrollo, sin datos personales en el diagnóstico.
    console.info("[contacto] SMTP no configurado (modo desarrollo). Solicitud no enviada por correo.");
    return noStore({ ok: true, message: "Registro recibido (modo desarrollo, sin envío de correo)." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 465),
      secure: (SMTP_SECURE ?? "true") === "true", // 465 = SSL; 587 = false (STARTTLS)
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const lines = [
      `Nombre:        ${submission.name}`,
      `Institución:   ${submission.organization}`,
      `Correo:        ${submission.email}`,
      `Teléfono:      ${submission.phone}`,
      `Ciudad:        ${submission.city}`,
      `Servicio:      ${submission.service}`,
      `Motivo:        ${submission.intent}`,
      `Núm. equipos:  ${submission.equipmentRange}`,
      `Recibido:      ${submission.receivedAt}`,
      ``,
      `Mensaje:`,
      submission.message,
    ];

    await transporter.sendMail({
      from: `IBEX Biomedical Solutions <${from}>`,
      to: inbox,
      replyTo: `${submission.name} <${submission.email}>`,
      subject: sanitizeLine(`Nuevo registro de interés — ${submission.name}`, 150),
      text: lines.join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#0f2d4a;max-width:560px">
          <h2 style="color:#0f2d4a;margin:0 0 16px">Nuevo registro de interés</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px">
            ${[
              ["Nombre", submission.name],
              ["Institución", submission.organization],
              ["Correo", submission.email],
              ["Teléfono", submission.phone],
              ["Ciudad", submission.city],
              ["Servicio de interés", submission.service],
              ["Motivo", submission.intent],
              ["Núm. aprox. de equipos", submission.equipmentRange],
              ["Recibido", submission.receivedAt],
            ]
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:6px 12px 6px 0;color:#46586b">${k}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(
                    String(v)
                  )}</td></tr>`
              )
              .join("")}
          </table>
          <p style="margin:18px 0 6px;color:#46586b;font-size:14px">Mensaje:</p>
          <p style="white-space:pre-wrap;border-left:3px solid #4fb7b6;padding-left:12px;margin:0;font-size:15px">${escapeHtml(
            submission.message
          )}</p>
        </div>`,
    });

    return noStore({ ok: true });
  } catch (error) {
    // No se registran datos personales del remitente, solo el hecho del error.
    console.error(
      "[contacto] Error al enviar el correo:",
      error instanceof Error ? error.message : "error desconocido"
    );
    return noStore(
      { ok: false, message: "No pudimos registrar tu solicitud en este momento. Intenta más tarde." },
      502
    );
  }
}
